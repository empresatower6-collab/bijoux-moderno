export interface ScheduleEntry {
  id: string;
  date: string;
  day: string;
  label?: string;
  abertura: string[];
  orientadoraAbertura: string;
  midia?: string;
  fechamento: string[];
  orientadoraFechamento: string;
}

/**
 * Textos da página que antes ficavam fixos no código.
 * Agora vêm do banco (campo `site` dentro de escala.data) e podem ser
 * editados pelo painel em /painel.html.
 */
export interface SiteContent {
  titulo: string;
  subtitulo: string;
  aberturaDescricao: string;
  aberturaOrientadora: string;
  aberturaChegada: string;
  aberturaNota: string;
  fechamentoDescricao: string;
  fechamentoOrientadora: string;
  fechamentoTarefas: string[];
  rodapeTitulo: string;
  rodapeFrase: string;
}

export interface ScheduleData {
  month: string;
  year: string;
  entries: ScheduleEntry[];
  observations: string[];
  /** Opcional: escalas antigas (sem este campo) usam os textos padrão. */
  site?: Partial<SiteContent>;
}

export const defaultSite: SiteContent = {
  titulo: "Escala da BIJU",
  subtitulo: "Ser Mulher",
  aberturaDescricao: "3 pessoas responsáveis por receber e acolher",
  aberturaOrientadora: "Estefany",
  aberturaChegada: "Chegar 1 hora antes do horário de culto para organizar a mesa das bijus",
  aberturaNota:
    "A orientadora vai pegar os materiais com a Pastora (maquininha de cartão, chave da ceia, etc.)",
  fechamentoDescricao: "2 pessoas responsáveis por encerrar e organizar",
  fechamentoOrientadora: "Presbítera Cibele",
  fechamentoTarefas: [
    "Pegar a chave da sala da ceia",
    "Verificar se o canto da Biju está organizado na sala",
    "Mandar foto para a Pastora Edinolia mostrando como ficou",
  ],
  rodapeTitulo: "Ser Mulher",
  rodapeFrase: "Que Deus Abençoe!",
};

/** Junta o que veio do banco com os padrões, campo a campo. */
export function siteContent(site?: Partial<SiteContent>): SiteContent {
  return { ...defaultSite, ...(site ?? {}) };
}

export const defaultSchedule: ScheduleData = {
  month: "Julho",
  year: "2026",
  entries: [
    {
      id: "e1",
      date: "25/07",
      day: "Sábado",
      label: "Culto de Mulheres",
      abertura: ["Balbina", "Elaine"],
      orientadoraAbertura: "Estefany",
      midia: "Bia",
      fechamento: ["Cris", "Anita"],
      orientadoraFechamento: "Presb. Cibele",
    },
  ],
  observations: [
    "<strong>Dia 25/07 (Culto de Mulheres):</strong> Abertura com Balbina e Elaine | Fechamento com Cris e Anita",
    "<strong>Orientadoras:</strong> Estefany (abertura) e Presb. Cibele (fechamento)",
    "<strong>Chegada Antecipada:</strong> Toda a equipe de abertura deve chegar <strong>1 hora antes</strong> do horário de culto para organizar a mesa das bijus",
  ],
};
