import { Scissors, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-primary rotate-45" />
            <span className="text-xl font-bold">
              <span className="text-primary">Barber</span> Dolly
            </span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground text-sm">
            Strak. Klassiek. Zoals het hoort.
          </p>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/barberdolly"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="gold-line mt-8 mb-6" />
        
        <p className="text-center text-muted-foreground/60 text-sm">
          © {currentYear} Barber Dolly. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
