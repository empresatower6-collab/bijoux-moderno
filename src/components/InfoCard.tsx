import { DoorOpen, Lock, Clock, CheckCircle2, UserCheck, Sparkles } from "lucide-react";

interface InfoCardProps {
  type: "abertura" | "fechamento";
  description: string;
  orientadora: string;
  arrivalNote?: string;
  additionalNote?: string;
  tasks?: string[];
}

const InfoCard = ({ type, description, orientadora, arrivalNote, additionalNote, tasks }: InfoCardProps) => {
  const isAbertura = type === "abertura";
  
  return (
    <div className="relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:-translate-y-1">
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${isAbertura ? 'from-primary via-primary/80 to-accent-foreground' : 'from-secondary via-secondary/80 to-primary/40'}`} />
      
      {/* Decorative glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 ${isAbertura ? 'bg-primary' : 'bg-secondary'}`} />

      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl shadow-sm ${isAbertura ? 'bg-primary/10 text-primary ring-1 ring-primary/20' : 'bg-secondary/10 text-secondary ring-1 ring-secondary/20'}`}>
              {isAbertura ? <DoorOpen className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <h3 className="font-bold text-lg text-card-foreground tracking-tight">
              {isAbertura ? "Abertura" : "Fechamento"}
            </h3>
          </div>
          <Sparkles className={`w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${isAbertura ? 'text-primary' : 'text-secondary'}`} />
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        
        <div className={`p-3 rounded-xl mb-4 ${isAbertura ? 'bg-primary/5 ring-1 ring-primary/10' : 'bg-secondary/5 ring-1 ring-secondary/10'}`}>
          <p className={`text-sm font-semibold flex items-center gap-2.5 ${isAbertura ? 'text-primary' : 'text-secondary'}`}>
            <UserCheck className="w-4 h-4" />
            Orientadora: {orientadora}
          </p>
        </div>
        
        {arrivalNote && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-primary/5 border border-primary/15">
            <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-1.5">
              <p className="text-xs text-primary font-medium leading-relaxed">{arrivalNote}</p>
              {additionalNote && (
                <p className="text-xs text-primary/80 font-medium leading-relaxed">{additionalNote}</p>
              )}
            </div>
          </div>
        )}

        {tasks && tasks.length > 0 && (
          <div className="mt-4 space-y-2.5 p-4 rounded-xl bg-secondary/5 border border-secondary/15">
            <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
              Tarefas {isAbertura ? "da Abertura" : "do Fechamento"}
            </p>
            {tasks.map((task, index) => (
              <div key={index} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary/5 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-secondary leading-relaxed">{task}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;