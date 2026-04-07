import { Calendar, ChevronRight } from "lucide-react";

interface DateBadgeProps {
  date: string;
  day: string;
  label?: string;
}

const DateBadge = ({ date, day, label }: DateBadgeProps) => {
  return (
    <div className="relative bg-gradient-to-r from-primary via-primary/90 to-accent-foreground rounded-xl sm:rounded-2xl p-4 sm:p-5 text-primary-foreground shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1 right-4 w-14 sm:w-20 h-14 sm:h-20 rounded-full border-2 border-primary-foreground/30 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-2 left-8 w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-primary-foreground/20 group-hover:scale-125 transition-transform duration-700" />
      </div>
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary-foreground/15 backdrop-blur-sm">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight">{date}</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-50" />
            <span className="font-medium text-sm sm:text-base text-primary-foreground/90">{day}</span>
          </div>
        </div>
        
        {label && (
          <span className="inline-flex items-center self-start sm:self-auto px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary-foreground/20 text-xs sm:text-sm font-semibold backdrop-blur-md border border-primary-foreground/10 shadow-sm">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default DateBadge;