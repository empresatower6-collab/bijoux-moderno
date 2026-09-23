import { useEffect, useState } from "react";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import backgroundImage from "@/assets/background.jpg";
import DateBadge from "@/components/DateBadge";
import ScheduleCard from "@/components/ScheduleCard";
import ObservationCard from "@/components/ObservationCard";
import Footer from "@/components/Footer";
import { CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { defaultSchedule, siteContent, type ScheduleData } from "@/lib/escala";

const Index = () => {
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);

  // textos da página: vêm do banco (editáveis em /painel.html),
  // com fallback para os padrões quando o campo ainda não existe.
  const site = siteContent(schedule.site);

  useEffect(() => {
    let active = true;
    supabase
      .from("escala")
      .select("data")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data?.data) setSchedule(data.data as unknown as ScheduleData);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="min-h-screen py-8 px-4 md:px-6 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <Header
          month={schedule.month}
          year={schedule.year}
          titulo={site.titulo}
          subtitulo={site.subtitulo}
        />

        {/* Informações Gerais */}
        <section className="grid md:grid-cols-2 gap-4">
          <InfoCard
            type="abertura"
            description={site.aberturaDescricao}
            orientadora={site.aberturaOrientadora}
            arrivalNote={site.aberturaChegada}
            additionalNote={site.aberturaNota}
          />
          <InfoCard
            type="fechamento"
            description={site.fechamentoDescricao}
            orientadora={site.fechamentoOrientadora}
            tasks={site.fechamentoTarefas}
          />
        </section>

        {/* Plantões */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" /> Plantões
          </h2>

          {schedule.entries.map((entry) => (
            <div key={entry.id} className="space-y-4">
              <DateBadge date={entry.date} day={entry.day} label={entry.label} />

              <div className="grid md:grid-cols-2 gap-4">
                <ScheduleCard
                  type="abertura"
                  members={entry.abertura.map((name) => ({ name }))}
                  orientadora={entry.orientadoraAbertura}
                  midia={entry.midia}
                  showArrivalNote
                />
                <ScheduleCard
                  type="fechamento"
                  members={entry.fechamento.map((name) => ({ name }))}
                  orientadora={entry.orientadoraFechamento}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Observações */}
        <ObservationCard items={schedule.observations} />

        {/* Footer */}
        <Footer titulo={site.rodapeTitulo} frase={site.rodapeFrase} />
      </div>
    </div>
  );
};

export default Index;
