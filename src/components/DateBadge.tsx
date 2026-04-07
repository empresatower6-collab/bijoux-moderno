import { Calendar } from "lucide-react";

interface DateBadgeProps {
  date: string;
  day: string;
  label?: string;
}

const DateBadge = ({ date, day, label }: DateBadgeProps) => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-accent-foreground rounded-2xl p-4 md:p-5 text-primary-foreground shadow-lg overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-primary-foreground/30" />
        <div className="absolute bottom-2 left-4 w-8 h-8 rounded-full border border-primary-foreground/20" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5" />
          <span className="font-bold text-lg">{date}</span>
          <span className="text-primary-foreground/80">-</span>
          <span className="font-medium">{day}</span>
        </div>
        
        {label && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-foreground/20 text-sm font-medium backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default DateBadge;
