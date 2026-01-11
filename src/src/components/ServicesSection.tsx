import { Scissors } from "lucide-react";

interface Service {
  name: string;
  description: string;
  duration: string;
}

const services: Service[] = [
  {
    name: "Knippen",
    description: "Klassiek geknipt met schaar en tondeuse. Inclusief wassen en stylen.",
    duration: "30 min",
  },
  {
    name: "Knippen + Baard",
    description: "Complete behandeling. Haar én baard op punt. De volledige ervaring.",
    duration: "45 min",
  },
  {
    name: "Baard trimmen",
    description: "Strakke lijnen, verzorgd met warme handdoek en balsem.",
    duration: "20 min",
  },
  {
    name: "Scheren",
    description: "Old-school straight razor shave. Warm kompres, precies zoals vroeger.",
    duration: "30 min",
  },
  {
    name: "Fade / Skin Fade",
    description: "Van kort naar lang, vloeiende overgangen. Modern vakwerk.",
    duration: "35 min",
  },
];

const ServicesSection = () => {
  return (
    <section id="diensten" className="py-24 px-6 bg-secondary/30 texture-overlay">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scissors className="w-5 h-5 text-primary" />
            <span className="text-primary uppercase tracking-widest text-sm font-medium">
              Onze Diensten
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Wat we voor je doen
          </h2>
          
          <div className="gold-line w-20 mx-auto mb-6" />
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            Geen fratsen, geen toeters en bellen. Gewoon goed vakwerk.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card/50 border border-border hover:border-primary/40 p-6 md:p-8 transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {service.name}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {service.duration}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground/70 mt-10 text-sm">
          Vragen over prijzen of combinaties? Neem gerust contact op.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
