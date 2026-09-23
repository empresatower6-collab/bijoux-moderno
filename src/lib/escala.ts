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

export interface ScheduleData {
  month: string;
  year: string;
  entries: ScheduleEntry[];
  observations: string[];
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
