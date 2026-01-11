import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Instagram } from "lucide-react";

const ContactSection = () => {
  const handleBooking = () => {
    window.open("https://calendar.app.google/oWaY5yGife9qiLbB9", "_blank");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/31612345678?text=Hoi! Ik wil graag een afspraak maken bij Barber Dolly.", "_blank");
  };

  return (
    <section id="contact" className="py-24 px-6 texture-overlay">
      <div className="max-w-4xl mx-auto">
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
          </p>
        </div>

        {/* Booking CTAs */}
        <div className="max-w-md mx-auto space-y-6">
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

          {/* Instagram */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <Instagram className="w-5 h-5 text-primary" />
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
    </section>
  );
};

export default ContactSection;
