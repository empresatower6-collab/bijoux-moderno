import { AlertCircle, Check, Sparkles } from "lucide-react";

interface ObservationCardProps {
  items: string[];
}

const ObservationCard = ({ items }: ObservationCardProps) => {
  return (
    <div className="relative bg-card rounded-2xl p-6 md:p-8 shadow-xl border border-primary/20 overflow-hidden group hover:shadow-2xl transition-all duration-500">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent-foreground to-secondary" />
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-primary/10 ring-1 ring-primary/15 shadow-sm">
            <AlertCircle className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-card-foreground tracking-tight">
            Observações Importantes
          </h2>
          <Sparkles className="w-4 h-4 text-primary/40 ml-auto" />
        </div>
        
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 group/item p-3 rounded-xl hover:bg-muted/30 transition-all duration-300">
              <div className="mt-0.5 p-1 rounded-full bg-primary/10 ring-1 ring-primary/10 group-hover/item:bg-primary/20 transition-colors shadow-sm flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span 
                className="text-muted-foreground text-sm leading-relaxed"
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