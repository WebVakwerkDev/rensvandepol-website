import { Scissors } from "lucide-react";


interface Service {
  name: string;
  description: string;
}

const services: Service[] = [
  {
    name: "Knippen",
    description: "Klassiek geknipt met schaar en tondeuse. Inclusief wassen en stylen.",
  },
  {
    name: "Opscheren",
    description: "Zijkanten strak opgeschoren voor een cleane look.",
  },
  {
    name: "Fade",
    description: "Vloeiende overgangen van kort naar lang. Modern vakwerk.",
  },
  {
    name: "Beardtrim",
    description: "Baard netjes bijgewerkt en in vorm gebracht.",
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
              Diensten & Prijzen
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Wat we voor je doen
          </h2>
          
          <div className="gold-line w-20 mx-auto mb-6" />
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            Geen fratsen, geen toeters en bellen. Gewoon goed vakwerk tegen eerlijke prijzen.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card/50 border border-border hover:border-primary/40 p-6 md:p-8 transition-all duration-300"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                {service.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground/70 mt-10 text-sm">
          Prijzen zijn indicatief. Combinaties en speciale wensen? Bespreek het gerust.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
