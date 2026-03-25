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

  // Equipes do Dia do Acarajé (data a definir)
  const aberturaAcaraje = [{ name: "Balbina" }, { name: "Daniela" }, { name: "Anita" }];
  const fechamentoAcaraje = [{ name: "Presbitera Cibele" }, { name: "Elaine" }];

  const observations = [
    "<strong>Dia 28/02:</strong> Abertura com Balbina, Elaine e Sayonara | Fechamento com Presb. Cibele e Cris",
    "<strong>Dia do Acarajé:</strong> Abertura com Balbina, Daniela e Anita | Fechamento com Presb. Cibele e Elaine",
    "<strong>Orientadoras 28/02:</strong> Estefany (abertura) e Presb. Cibele (fechamento)",
    "<strong>Chegada Antecipada:</strong> Toda a equipe de abertura deve chegar <strong>1 hora antes</strong> do horário de culto para organizar a mesa das bijus",
  ];

  return (
    <div
      className="min-h-screen py-8 px-4 md:px-6 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <Header month="Março" year="2026" />

        {/* Informações Gerais */}
        <section className="grid md:grid-cols-2 gap-4">
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
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" /> Plantões
          </h2>

          {/* 28/02 - Sábado */}
          <div className="space-y-4">
            <DateBadge date="28/03" day="Sábado" label="Fim de Semana" />

            <div className="grid md:grid-cols-2 gap-4">
              <ScheduleCard type="abertura" members={abertura28} orientadora="Estefany" midia="Bia" showArrivalNote />
              <ScheduleCard type="fechamento" members={fechamento28} orientadora="Presb. Cibele" />
            </div>
          </div>

          {/* Dia do Acarajé */}
          <div className="space-y-4">
            <DateBadge date="A definir" day="Dia do Acarajé" label="Evento Especial" />

            <div className="grid md:grid-cols-2 gap-4">
              <ScheduleCard type="abertura" members={aberturaAcaraje} orientadora="Estefany" midia="Bia" showArrivalNote />
              <ScheduleCard type="fechamento" members={fechamentoAcaraje} orientadora="Presb. Cibele" />
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
