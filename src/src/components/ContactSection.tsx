import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Calendar, Instagram } from "lucide-react";

const ContactSection = () => {
  const handleBooking = () => {
    window.open("https://wa.me/31628293223?text=Ik wil een afspraak maken, wanneer heb je tijd", "_blank");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/31628293223?text=Ik wil een afspraak maken, wanneer heb je tijd", "_blank");
  };

  return (
    <section id="contact" className="py-24 px-6 texture-overlay">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-primary uppercase tracking-widest text-sm font-medium">
              Contact & Boeken
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Maak een afspraak
          </h2>
          
          <div className="gold-line w-20 mx-auto mb-6" />
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stuur een berichtje via WhatsApp of bel direct voor een afspraak.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Booking CTAs */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 text-center">Direct contact</h3>

            <Button
              onClick={handleBooking}
              size="lg"
              className="w-full gold-gradient text-primary-foreground font-semibold py-6 text-lg hover:opacity-90 transition-opacity"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Plan je afspraak via WhatsApp
            </Button>

            <Button
              onClick={handleWhatsApp}
              variant="outline"
              size="lg"
              className="w-full border-green-600/50 text-green-500 hover:bg-green-600/10 hover:text-green-400 py-6 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Stuur een WhatsApp bericht
            </Button>

            {/* Phone */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="p-3 bg-secondary rounded-full">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Of bel direct</p>
                <a href="tel:+31628293223" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  +31 6 28 29 32 23
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center justify-center gap-4 pt-8 border-t border-border mt-8">
              <div className="p-3 bg-secondary rounded-full">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Volg ons op Instagram</h4>
                <a
                  href="https://instagram.com/barberdolly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @barberdolly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
