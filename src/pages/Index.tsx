import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import backgroundImage from "@/assets/background.jpg";
import DateBadge from "@/components/DateBadge";
import ScheduleCard from "@/components/ScheduleCard";
import ObservationCard from "@/components/ObservationCard";
import Footer from "@/components/Footer";
import { CalendarDays } from "lucide-react";

const Index = () => {
  // Equipes do dia 28/02
  const abertura28 = [{ name: "Anita" }, { name: "Balbina" }, { name: "Elaine" }, { name: "Ana" }];
  const fechamento28 = [{ name: "Raquel" }, { name: "Dani" }, { name: "Cris" }, { name: "Estefany" }];

  // Equipes do dia 08/04 - Troca de Mentoria
  const aberturaMentoria = [{ name: "Anita" }, { name: "Balbina" }, { name: "Elaine" }];
  const fechamentoMentoria = [{ name: "Presb. Cibele" }, { name: "Raquel" }];

  const observations = [
    "<strong>Dia 28/03:</strong> Abertura com Anita, Balbina, Elaine e Ana | Fechamento com Raquel, Dani, Cris e Estefany",
    "<strong>Dia 08/04 — Troca de Mentoria:</strong> Abertura com Anita, Balbina e Elaine | Fechamento com Presb. Cibele e Raquel",
    "<strong>Orientadoras 28/03:</strong> Estefany (abertura) e Presb. Cibele (fechamento)",
    "<strong>Chegada Antecipada:</strong> Toda a equipe de abertura deve chegar <strong>1 hora antes</strong> do horário de culto para organizar a mesa das bijus",
  ];

  return (
    <div
      className="min-h-screen py-4 px-3 sm:py-8 sm:px-4 md:px-6 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-8">
        {/* Header */}
        <Header month="Março" year="2026" />

        {/* Informações Gerais */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <InfoCard
            type="abertura"
            description="3 pessoas responsáveis por receber e acolher"
            orientadora="Estefany"
            arrivalNote="Chegar 1 hora antes do horário de culto para organizar a mesa das bijus"
            additionalNote="A orientadora vai pegar os materiais com a Pastora (maquininha de cartão, chave da ceia, etc.)"
          />
          <InfoCard
            type="fechamento"
            description="2 pessoas responsáveis por encerrar e organizar"
            orientadora="Presbítera Cibele"
            tasks={[
              "Pegar a chave da sala da ceia",
              "Verificar se o canto da Biju está organizado na sala",
              "Mandar foto para a Pastora Edinolia mostrando como ficou"
            ]}
          />
        </section>

        {/* Plantões */}
        <section className="space-y-5 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" /> Plantões
          </h2>

          {/* 28/02 - Sábado */}
          <div className="space-y-3 sm:space-y-4">
            <DateBadge date="28/03" day="Sábado" label="Fim de Semana" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <ScheduleCard type="abertura" members={abertura28} orientadora="Estefany" midia="Bia" showArrivalNote />
              <ScheduleCard type="fechamento" members={fechamento28} orientadora="Presb. Cibele" />
            </div>
          </div>

          {/* 08/04 - Troca de Mentoria */}
          <div className="space-y-3 sm:space-y-4">
            <DateBadge date="08/04" day="Terça-feira" label="Troca de Mentoria" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <ScheduleCard type="abertura" members={aberturaMentoria} orientadora="Estefany" midia="Bia" showArrivalNote />
              <ScheduleCard type="fechamento" members={fechamentoMentoria} orientadora="Presb. Cibele" />
            </div>
          </div>
        </section>

        {/* Observações */}
        <ObservationCard items={observations} />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
