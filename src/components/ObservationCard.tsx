import { AlertCircle, Check } from "lucide-react";

interface ObservationCardProps {
  items: string[];
}

const ObservationCard = ({ items }: ObservationCardProps) => {
  return (
    <div className="relative bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-primary/20 overflow-hidden group hover:shadow-2xl transition-all duration-500">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent-foreground to-secondary" />
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-primary/10 ring-1 ring-primary/15 shadow-sm">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h2 className="text-base sm:text-xl font-bold text-card-foreground tracking-tight">
            Observações Importantes
          </h2>
          
        </div>
        
        <ul className="space-y-3 sm:space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 sm:gap-3 group/item p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:bg-muted/30 transition-all duration-300">
              <div className="mt-0.5 p-0.5 sm:p-1 rounded-full bg-primary/10 ring-1 ring-primary/10 group-hover/item:bg-primary/20 transition-colors shadow-sm flex-shrink-0">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </div>
              <span 
                className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ObservationCard;