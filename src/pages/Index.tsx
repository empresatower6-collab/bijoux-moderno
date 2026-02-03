import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import DateBadge from "@/components/DateBadge";
import ScheduleCard from "@/components/ScheduleCard";
import ObservationCard from "@/components/ObservationCard";
import Footer from "@/components/Footer";

const Index = () => {
  // Equipes do dia 25/02
  const abertura25 = [
    { name: "Balbina" },
    { name: "Jordana" },
    { name: "Ana Beatriz" },
  ];

  const fechamento25 = [
    { name: "Daniela" },
    { name: "Presbitera Cibele" },
  ];

  // Equipes do dia 24/01
  const abertura24 = [
    { name: "Estefany" },
    { name: "Balbina" },
    { name: "Jordana" },
  ];

  const fechamento24 = [
    { name: "Cris" },
    { name: "Daniela" },
  ];

  const observations = [
    "<strong>Dia 25/02:</strong> Abertura com Balbina, Jordana e Ana Beatriz | Fechamento com Daniela e Presbitera Cibele",
    "<strong>Dia 24/01:</strong> Abertura com Estefany, Balbina e Jordana | Fechamento com Cris e Daniela",
    "<strong>Orientadoras 25/02:</strong> Estefany Mayara (abertura) e Presb. Cibele (fechamento)",
    "<strong>Orientadoras 24/01:</strong> Rosemeire (abertura) e Estefany (fechamento)",
    "<strong>Chegada Antecipada:</strong> Toda a equipe de abertura deve chegar <strong>1 hora antes</strong> do horário de culto para organizar a mesa das bijus",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <Header month="Fevereiro" year="2026" />

        {/* Informações Gerais */}
        <section className="grid md:grid-cols-2 gap-4">
          <InfoCard
            type="abertura"
            description="3 pessoas responsáveis por receber e acolher"
            orientadora="Varia conforme a data"
            arrivalNote="Chegar 1 hora antes do horário de culto para organizar a mesa das bijus"
          />
          <InfoCard
            type="fechamento"
            description="2 pessoas responsáveis por encerrar e organizar"
            orientadora="Varia conforme a data"
          />
        </section>

        {/* Plantões */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="text-2xl">📅</span> Plantões
          </h2>

          {/* 25/02 - Quarta-feira */}
          <div className="space-y-4">
            <DateBadge 
              date="25/02" 
              day="Quarta-feira" 
              label="Semana"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <ScheduleCard
                type="abertura"
                members={abertura25}
                orientadora="Estefany Mayara"
                showArrivalNote
              />
              <ScheduleCard
                type="fechamento"
                members={fechamento25}
                orientadora="Presb. Cibele"
              />
            </div>
          </div>

          {/* 24/01 - Sábado */}
          <div className="space-y-4">
            <DateBadge 
              date="24/01" 
              day="Sábado" 
              label="Fim de Semana"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <ScheduleCard
                type="abertura"
                members={abertura24}
                orientadora="Rosemeire"
                showArrivalNote
              />
              <ScheduleCard
                type="fechamento"
                members={fechamento24}
                orientadora="Estefany"
              />
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
