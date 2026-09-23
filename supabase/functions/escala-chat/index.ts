const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, schedule } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Chave de IA não configurada." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const system = `Você é a assistente da escala da mesa de bijuterias do grupo "Ser Mulher" de uma igreja cristã.
Você recebe a escala atual em JSON e o pedido da usuária em português, e devolve a escala ATUALIZADA.

Formato do JSON da escala:
{
  "month": "Julho",
  "year": "2026",
  "entries": [
    {
      "id": "string único",
      "date": "25/07",
      "day": "Sábado",
      "label": "Culto de Mulheres",
      "abertura": ["Nome1", "Nome2"],
      "orientadoraAbertura": "Estefany",
      "midia": "Bia",
      "fechamento": ["Nome3"],
      "orientadoraFechamento": "Presb. Cibele"
    }
  ],
  "observations": ["texto com <strong>negrito</strong> permitido"]
}

Regras:
- Estefany orienta a abertura e a Presb. Cibele orienta o fechamento, salvo pedido contrário.
- Sempre mantenha as observações coerentes com os nomes e datas das escalas.
- Nunca use emojis.
- Se o pedido não pedir alteração (apenas pergunta), devolva a escala sem mudanças.

Responda SEMPRE apenas com um JSON válido, sem markdown, no formato:
{"reply": "resposta curta em português explicando o que foi alterado", "schedule": { ...escala completa atualizada... }}`;

    const chatMessages = [
      { role: "system", content: system },
      { role: "user", content: `Escala atual:\n${JSON.stringify(schedule)}` },
      ...(messages ?? []).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        reasoning_effort: "low",
        response_format: { type: "json_object" },
        messages: chatMessages,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("AI gateway error", res.status, text);
      let message = "Não consegui falar com a IA agora. Tente novamente.";
      if (res.status === 429) message = "Muitos pedidos seguidos. Espere um instante e tente de novo.";
      if (res.status === 402) message = "Os créditos de IA acabaram. Adicione créditos para continuar.";
      return new Response(JSON.stringify({ error: message }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: { reply?: string; schedule?: unknown };
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { reply: String(raw), schedule: undefined };
    }

    return new Response(
      JSON.stringify({ reply: parsed.reply ?? "Pronto.", schedule: parsed.schedule ?? schedule }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Erro inesperado." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
