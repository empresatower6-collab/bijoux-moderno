import { Users, DoorOpen, Lock, Clock, Monitor } from "lucide-react";

interface TeamMember {
  name: string;
}

interface ScheduleCardProps {
  type: "abertura" | "fechamento";
  members: TeamMember[];
  orientadora: string;
  midia?: string;
  showArrivalNote?: boolean;
}

const ScheduleCard = ({ type, members, orientadora, midia, showArrivalNote }: ScheduleCardProps) => {
  const isAbertura = type === "abertura";
  
  return (
    <div className="group relative bg-card rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/40 overflow-hidden hover:-translate-y-1">
      {/* Top gradient bar */}
      <div className={`h-1 sm:h-1.5 w-full bg-gradient-to-r ${isAbertura ? 'from-primary via-primary/80 to-accent-foreground' : 'from-secondary via-secondary/80 to-primary/40'}`} />
      
      {/* Decorative corner glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${isAbertura ? 'bg-primary' : 'bg-secondary'}`} />
      
      <div className="p-4 sm:p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm ${isAbertura ? 'bg-primary/10 text-primary ring-1 ring-primary/20' : 'bg-secondary/10 text-secondary ring-1 ring-secondary/20'}`}>
              {isAbertura ? <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5" /> : <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-card-foreground tracking-tight">
                {isAbertura ? "Abertura" : "Fechamento"}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{members.length} membros</p>
            </div>
          </div>
          
        </div>
        
        {/* Team members */}
        <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
          {members.map((member, index) => (
            <div 
              key={index}
              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-muted/30 hover:bg-muted/60 transition-all duration-300"
            >
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-sm flex-shrink-0 ${isAbertura ? 'bg-primary/15 text-primary ring-1 ring-primary/10' : 'bg-secondary/15 text-secondary ring-1 ring-secondary/10'}`}>
                {member.name.charAt(0)}
              </div>
              <span className="text-foreground font-medium text-sm">{member.name}</span>
            </div>
          ))}
        </div>
        
        {/* Mídia */}
        {midia && (
          <div className="p-3 sm:p-3.5 rounded-lg sm:rounded-xl mb-3 bg-accent/40 border border-accent-foreground/10 backdrop-blur-sm">
            <p className="text-xs sm:text-sm font-semibold flex items-center gap-2 sm:gap-2.5 text-accent-foreground">
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Mídia: {midia}
            </p>
          </div>
        )}

        {/* Orientadora */}
        <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border backdrop-blur-sm ${isAbertura ? 'bg-primary/5 border-primary/15' : 'bg-secondary/5 border-secondary/15'}`}>
          <p className={`text-xs sm:text-sm font-semibold flex items-center gap-2 sm:gap-2.5 ${isAbertura ? 'text-primary' : 'text-secondary'}`}>
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Orientadora: {orientadora}
          </p>
          {showArrivalNote && (
            <div className="flex items-center gap-2 mt-2 sm:mt-2.5 text-[10px] sm:text-xs text-muted-foreground bg-muted/30 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
              <span>Chegar 1h antes do culto</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;