import { Sparkles } from "lucide-react";

interface HeaderProps {
  month: string;
  year: string;
}

const Header = ({ month, year }: HeaderProps) => {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent-foreground p-8 md:p-12 text-primary-foreground shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Floating sparkles */}
      <div className="absolute top-6 left-6 opacity-40">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      <div className="absolute top-10 right-12 opacity-30">
        <Sparkles className="w-4 h-4 animate-pulse delay-150" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-40">
        <Sparkles className="w-5 h-5 animate-pulse delay-300" />
      </div>
      
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
          <span className="text-sm font-medium">{month}/{year}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          Escala da BIJU
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-90 mb-6">
          Ser Mulher
        </p>
        
        <div className="flex justify-center items-center gap-3 text-2xl">
          <span className="animate-pulse">✨</span>
          <span>🌸</span>
          <span className="animate-pulse delay-200">✨</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
