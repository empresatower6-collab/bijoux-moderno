import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { MessagesSquare } from "lucide-react";
import { toast } from "sonner";
import type { ScheduleData } from "@/lib/escala";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface EscalaChatProps {
  schedule: ScheduleData;
  onScheduleChange: (next: ScheduleData) => Promise<void>;
}

const EscalaChat = ({ schedule, onScheduleChange }: EscalaChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const history = [...messages, { id: crypto.randomUUID(), role: "user" as const, content: text }];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("escala-chat", {
        body: {
          schedule,
          messages: history.map(({ role, content }) => ({ role, content })),
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply as string },
      ]);

      if (data?.schedule && JSON.stringify(data.schedule) !== JSON.stringify(schedule)) {
        await onScheduleChange(data.schedule as ScheduleData);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não consegui responder agora.";
      toast.error(message);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: `Erro: ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-card border border-border/60 rounded-2xl overflow-hidden shadow-lg">
      <Conversation className="flex-1">
        <ConversationContent className="gap-4">
          {messages.length === 0 && (
            <ConversationEmptyState
              icon={<MessagesSquare className="w-6 h-6 text-primary" />}
              title="Converse para mudar a escala"
              description='Exemplos: "troque Cris por Anita no fechamento do dia 25/07" ou "crie o dia 02/08, sábado, com Balbina e Elaine na abertura".'
            />
          )}
          {messages.map((m) => (
            <Message from={m.role} key={m.id}>
              <MessageContent>
                <MessageResponse>{m.content}</MessageResponse>
              </MessageContent>
            </Message>
          ))}
          {loading && (
            <div className="px-1">
              <Shimmer>Atualizando a escala...</Shimmer>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border/60 p-3">
        <PromptInput
          onSubmit={(_, event) => {
            event.preventDefault();
            void send();
          }}
        >
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva a alteração que deseja fazer na escala..."
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit
              status={loading ? "submitted" : undefined}
              disabled={loading || !input.trim()}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};

export default EscalaChat;
