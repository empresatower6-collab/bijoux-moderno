import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
import backgroundImage from "@/assets/background.jpg";
import DateBadge from "@/components/DateBadge";
import ScheduleCard from "@/components/ScheduleCard";
import ObservationCard from "@/components/ObservationCard";
import Footer from "@/components/Footer";
import { CalendarDays, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { defaultSchedule, type ScheduleData } from "@/lib/escala";

const Index = () => {
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);

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
        <Header month={schedule.month} year={schedule.year} />


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

          {/* 25/07 - Sábado - Culto de Mulheres */}
          <div className="space-y-4">
            <DateBadge date="25/07" day="Sábado" label="Culto de Mulheres" />

            <div className="grid md:grid-cols-2 gap-4">
              <ScheduleCard type="abertura" members={abertura25} orientadora="Estefany" midia="Bia" showArrivalNote />
              <ScheduleCard type="fechamento" members={fechamento25} orientadora="Presb. Cibele" />
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
