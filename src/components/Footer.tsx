import { Heart, Flower2, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent-foreground p-8 md:p-10 text-primary-foreground shadow-2xl text-center">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-foreground/5 rounded-full translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ser Mulher
        </h2>
        <p className="text-lg opacity-90 mb-6 flex items-center justify-center gap-2">
          Que Deus Abençoe! <Heart className="w-5 h-5 fill-current" />
        </p>
        
        <div className="flex justify-center items-center gap-4">
          <Heart className="w-5 h-5 fill-current opacity-80" />
          <Flower2 className="w-6 h-6 animate-pulse opacity-90" />
          <Sparkles className="w-5 h-5 opacity-80" />
          <Flower2 className="w-6 h-6 animate-pulse opacity-90" />
          <Heart className="w-5 h-5 fill-current opacity-80" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
