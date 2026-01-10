import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, MessageCircle, Calendar, Instagram } from "lucide-react";

const ContactSection = () => {
  const handleBooking = () => {
    window.open("https://calendar.app.google/oWaY5yGife9qiLbB9", "_blank");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/31612345678?text=Hoi! Ik wil graag een afspraak maken bij Barber Dolly.", "_blank");
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
            Reserveer direct online of stuur een berichtje via WhatsApp. 
            Liever even bellen? Kan ook.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Booking CTAs */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Direct boeken</h3>
            
            <Button 
              onClick={handleBooking}
              size="lg" 
              className="w-full gold-gradient text-primary-foreground font-semibold py-6 text-lg hover:opacity-90 transition-opacity"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Plan je afspraak online
            </Button>
            
            <Button 
              onClick={handleWhatsApp}
              variant="outline" 
              size="lg"
              className="w-full border-green-600/50 text-green-500 hover:bg-green-600/10 hover:text-green-400 py-6 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Stuur een WhatsApp
            </Button>

            {/* Phone */}
            <div className="flex items-center gap-4 pt-4">
              <div className="p-3 bg-secondary rounded-full">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bel direct</p>
                <a href="tel:+31612345678" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  +31 6 12 34 56 78
                </a>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="p-3 bg-secondary rounded-full h-fit">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Adres</h4>
                <p className="text-muted-foreground">
                  Voorbeeldstraat 123<br />
                  1234 AB Amsterdam
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="p-3 bg-secondary rounded-full h-fit">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Openingstijden</h4>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between gap-8">
                    <span>Maandag</span>
                    <span className="text-foreground/60">Gesloten</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Dinsdag - Vrijdag</span>
                    <span className="text-foreground">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Zaterdag</span>
                    <span className="text-foreground">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Zondag</span>
                    <span className="text-foreground/60">Gesloten</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex gap-4">
              <div className="p-3 bg-secondary rounded-full h-fit">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Volg ons</h4>
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
