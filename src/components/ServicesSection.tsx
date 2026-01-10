import { Scissors } from "lucide-react";

interface Service {
  name: string;
  description: string;
  price: string;
  duration: string;
}

const services: Service[] = [
  {
    name: "Knippen",
    description: "Klassiek geknipt met schaar en tondeuse. Inclusief wassen en stylen.",
    price: "€25",
    duration: "30 min",
  },
  {
    name: "Knippen + Baard",
    description: "Complete behandeling. Haar én baard op punt. De volledige ervaring.",
    price: "€38",
    duration: "45 min",
  },
  {
    name: "Baard trimmen",
    description: "Strakke lijnen, verzorgd met warme handdoek en balsem.",
    price: "€18",
    duration: "20 min",
  },
  {
    name: "Scheren",
    description: "Old-school straight razor shave. Warm kompres, precies zoals vroeger.",
    price: "€25",
    duration: "30 min",
  },
  {
    name: "Fade / Skin Fade",
    description: "Van kort naar lang, vloeiende overgangen. Modern vakwerk.",
    price: "€28",
    duration: "35 min",
  },
  {
    name: "Kids (t/m 12 jaar)",
    description: "Relaxte knipbeurt voor de kleine man. Geduld inbegrepen.",
    price: "€18",
    duration: "20 min",
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
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {service.duration}
                  </span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {service.price}
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
          Prijzen zijn indicatief. Combinaties en speciale wensen? Bespreek het gerust.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
