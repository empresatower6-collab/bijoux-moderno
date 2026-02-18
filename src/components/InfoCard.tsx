import { DoorOpen, Lock, Clock, CheckCircle2, UserCheck } from "lucide-react";

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
    <div className="bg-card rounded-2xl p-6 shadow-lg border-l-4 border-primary hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${isAbertura ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
          {isAbertura ? <DoorOpen className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        </div>
        <h3 className="font-semibold text-lg text-card-foreground">
          {isAbertura ? "Abertura" : "Fechamento"}
        </h3>
      </div>
      
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      
      <p className="text-sm font-medium text-foreground flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-primary" />
        Orientadora: {orientadora}
      </p>
      
      {arrivalNote && (
        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
          <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-xs text-primary font-medium">{arrivalNote}</p>
            {additionalNote && (
              <p className="text-xs text-primary font-medium">{additionalNote}</p>
            )}
          </div>
        </div>
      )}

      {tasks && tasks.length > 0 && (
        <div className="mt-4 space-y-2 p-3 rounded-xl bg-secondary/5 border border-secondary/20">
          <p className="text-xs font-semibold text-secondary mb-2">Tarefas {isAbertura ? "da Abertura" : "do Fechamento"}:</p>
          {tasks.map((task, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-secondary">{task}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoCard;
