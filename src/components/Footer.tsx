import { Heart, Flower2 } from "lucide-react";

interface FooterProps {
  titulo: string;
  frase: string;
}

const Footer = ({ titulo, frase }: FooterProps) => {
  return (
    <footer className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent-foreground p-8 md:p-10 text-primary-foreground shadow-2xl text-center">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-foreground/5 rounded-full translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {titulo}
        </h2>
        <p className="text-lg opacity-90 mb-5 flex items-center justify-center gap-2">
          {frase} <Heart className="w-5 h-5 fill-current" />
        </p>

        <div className="flex justify-center items-center gap-2">
          <div className="h-px w-10 bg-primary-foreground/30" />
          <Flower2 className="w-5 h-5 opacity-70" />
          <div className="h-px w-10 bg-primary-foreground/30" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
