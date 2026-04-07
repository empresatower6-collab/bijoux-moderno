import { Calendar, ChevronRight } from "lucide-react";

interface DateBadgeProps {
  date: string;
  day: string;
  label?: string;
}

const DateBadge = ({ date, day, label }: DateBadgeProps) => {
  return (
    <div className="relative bg-gradient-to-r from-primary via-primary/90 to-accent-foreground rounded-2xl p-5 text-primary-foreground shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1 right-4 w-20 h-20 rounded-full border-2 border-primary-foreground/30 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-2 left-8 w-10 h-10 rounded-full border border-primary-foreground/20 group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-primary-foreground/10" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-foreground/15 backdrop-blur-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight">{date}</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="font-medium text-primary-foreground/90">{day}</span>
          </div>
        </div>
        
        {label && (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-foreground/20 text-sm font-semibold backdrop-blur-md border border-primary-foreground/10 shadow-sm">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default DateBadge;