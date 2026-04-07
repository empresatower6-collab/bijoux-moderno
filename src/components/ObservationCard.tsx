import { AlertCircle, Check } from "lucide-react";

interface ObservationCardProps {
  items: string[];
}

const ObservationCard = ({ items }: ObservationCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border-2 border-primary/30 hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <AlertCircle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-card-foreground">
          Observações Importantes
        </h2>
      </div>
      
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <div className="mt-0.5 p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
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
  );
};

export default ObservationCard;
