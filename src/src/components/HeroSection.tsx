import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
const HeroSection = () => {
  const handleBooking = () => {
    window.open("https://calendar.app.google/oWaY5yGife9qiLbB9", "_blank");
  };
  const scrollToServices = () => {
    document.getElementById("diensten")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center texture-overlay overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `linear-gradient(to bottom, hsl(20 14% 8% / 0.7), hsl(20 14% 8% / 0.9)), url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop')`
    }} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 border border-primary/30 rounded-full">
            <Scissors className="w-8 h-8 text-primary rotate-45" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <span className="text-primary">Barber</span>{" "}
          <span className="text-foreground">Dolly</span>
        </h1>

        {/* Decorative line */}
        <div className="gold-line w-32 mx-auto mb-6" />

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide mb-4">Express</p>

        

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleBooking} size="lg" className="gold-gradient text-primary-foreground font-semibold px-8 py-6 text-lg hover:opacity-90 transition-opacity">
            Maak een afspraak
          </Button>
          <Button onClick={scrollToServices} variant="outline" size="lg" className="border-primary/40 text-foreground hover:bg-primary/10 hover:text-foreground px-8 py-6 text-lg">
            Bekijk onze diensten
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary/60 rounded-full" />
        </div>
      </div>
    </section>;
};
export default HeroSection;