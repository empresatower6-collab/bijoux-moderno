import { Users, DoorOpen, Lock, Clock } from "lucide-react";

interface TeamMember {
  name: string;
}

interface ScheduleCardProps {
  type: "abertura" | "fechamento";
  members: TeamMember[];
  orientadora: string;
  showArrivalNote?: boolean;
}

const ScheduleCard = ({ type, members, orientadora, showArrivalNote }: ScheduleCardProps) => {
  const isAbertura = type === "abertura";
  
  return (
    <div className="group relative bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 overflow-hidden">
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${isAbertura ? 'from-primary to-primary/60' : 'from-secondary to-secondary/60'}`} />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-3 rounded-xl ${isAbertura ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
          {isAbertura ? <DoorOpen className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        </div>
        <h3 className="font-semibold text-lg text-card-foreground">
          {isAbertura ? "Abertura" : "Fechamento"}
        </h3>
      </div>
      
      {/* Team members */}
      <div className="space-y-2 mb-5">
        {members.map((member, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span className="text-foreground font-medium">{member.name}</span>
          </div>
        ))}
      </div>
      
      {/* Orientadora */}
      <div className={`p-4 rounded-xl ${isAbertura ? 'bg-primary/5 border border-primary/20' : 'bg-secondary/5 border border-secondary/20'}`}>
        <p className={`text-sm font-medium ${isAbertura ? 'text-primary' : 'text-secondary'}`}>
          👩‍🏫 Orientadora: {orientadora}
        </p>
        {showArrivalNote && (
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Chegar 1h antes do culto</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
