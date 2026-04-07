import { Flower2 } from "lucide-react";
import bijuDecor from "@/assets/biju-decor.jpg";

interface HeaderProps {
  month: string;
  year: string;
}

const Header = ({ month, year }: HeaderProps) => {
  return (
    <header className="relative overflow-hidden rounded-3xl shadow-2xl">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={bijuDecor} alt="Decoração Biju" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-accent-foreground/80" />
      </div>

      <div className="relative z-10 p-8 md:p-12 text-primary-foreground text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/10">
          <span className="text-sm font-medium tracking-wide">
            {month}/{year}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">Escala da BIJU</h1>
        <p className="text-lg md:text-xl font-light opacity-90 mb-2">— Ser Mulher</p>

        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="h-px w-12 bg-primary-foreground/30" />
          <Flower2 className="w-5 h-5 opacity-70" />
          <div className="h-px w-12 bg-primary-foreground/30" />
        </div>
      </div>
    </header>
  );
};

export default Header;
