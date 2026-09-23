import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, LogOut, ShieldCheck } from "lucide-react";
import EscalaChat from "@/components/EscalaChat";
import ScheduleCard from "@/components/ScheduleCard";
import DateBadge from "@/components/DateBadge";
import { defaultSchedule, type ScheduleData } from "@/lib/escala";

const Admin = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ScheduleData>(defaultSchedule);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/entrar", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sessionData.session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");

      const { data: row } = await supabase
        .from("escala")
        .select("id, data")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!active) return;
      setIsAdmin(admin);
      if (row) {
        setRowId(row.id);
        setSchedule(row.data as unknown as ScheduleData);
      }
      setReady(true);
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  const saveSchedule = async (next: ScheduleData) => {
    setSchedule(next);
    if (!rowId) return;
    const { error } = await supabase
      .from("escala")
      .update({ data: next as never, updated_at: new Date().toISOString() })
      .eq("id", rowId);
    if (error) {
      toast.error("Não consegui salvar a escala.");
      return;
    }
    toast.success("Escala atualizada para todo mundo.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/entrar", { replace: true });
  };

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Painel da Escala</h1>
            <p className="text-sm text-muted-foreground">
              {schedule.month} / {schedule.year}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" /> Ver escala
            </Button>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4" /> Sair
            </Button>
          </div>
        </header>

        {!isAdmin && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
            <ShieldCheck className="w-4 h-4 mt-0.5 text-destructive" />
            <p>
              Sua conta não tem permissão de administradora, então as alterações não serão salvas.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <EscalaChat schedule={schedule} onScheduleChange={saveSchedule} />

          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            {schedule.entries.map((entry) => (
              <div key={entry.id} className="space-y-3">
                <DateBadge date={entry.date} day={entry.day} label={entry.label} />
                <div className="grid gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
