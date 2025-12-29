import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import DateBadge from "@/components/DateBadge";
import ScheduleCard from "@/components/ScheduleCard";
import ObservationCard from "@/components/ObservationCard";
import Footer from "@/components/Footer";

const Index = () => {
  const aberturaTeam = [
    { name: "Balbina" },
    { name: "Jordana" },
    { name: "Kel" },
  ];

  const fechamentoTeam = [
    { name: "Cris" },
    { name: "Daniela" },
  ];

  const observations = [
    "<strong>Abertura:</strong> 3 pessoas em horário de cultos + orientadora Estefany Mayara",
    "<strong>Fechamento:</strong> 2 pessoas (Cris e Daniela) + orientadora Presb. Cibele",
    "<strong>Orientadora na Abertura:</strong> Estefany Mayara responsável por orientar e organizar",
    "<strong>Orientadora no Fechamento:</strong> Presb. Cibele responsável por orientar",
    "<strong>Chegada Antecipada:</strong> Toda a equipe de abertura deve chegar <strong>1 hora antes</strong> do horário de culto para organizar a mesa das bijus",
    "<strong>Mesma equipe:</strong> Balbina, Jordana e Kel continuam em ambos os turnos",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <Header month="Janeiro" year="2025" />

        {/* Informações Gerais */}
        <section className="grid md:grid-cols-2 gap-4">
          <InfoCard
            type="abertura"
            description="3 pessoas responsáveis por receber e acolher"
            orientadora="Estefany Mayara"
            arrivalNote="Chegar 1 hora antes do horário de culto para organizar a mesa das bijus"
          />
          <InfoCard
            type="fechamento"
            description="2 pessoas responsáveis por encerrar e organizar"
            orientadora="Presb. Cibele"
          />
        </section>

        {/* Plantões */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span className="text-2xl">📅</span> Plantões
          </h2>

          {/* 14/01 - Terça */}
          <div className="space-y-4">
            <DateBadge 
              date="14/01" 
              day="Terça-feira" 
              label="Semana"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <ScheduleCard
                type="abertura"
                members={aberturaTeam}
                orientadora="Estefany Mayara"
                showArrivalNote
              />
              <ScheduleCard
                type="fechamento"
                members={fechamentoTeam}
                orientadora="Presb. Cibele"
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
