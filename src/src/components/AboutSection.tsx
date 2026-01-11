import { Scissors } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="over-ons" className="py-24 px-6 texture-overlay">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
                alt="Barber Dolly interieur"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gold accent corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/40 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/40 -z-10" />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="text-primary uppercase tracking-widest text-sm font-medium">
                Over Ons
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Waar vakmanschap nog telt
            </h2>
            
            <div className="gold-line w-20 mb-8" />
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Bij Barber Dolly draait het om meer dan alleen knippen. Het gaat om rust, 
                aandacht en een stijl die bij jou past. Geen haast, geen drukte. 
                Gewoon goed vakwerk.
              </p>
              <p>
                Met meer dan 15 jaar ervaring in het vak weten we precies wat werkt. 
                Of je nou komt voor een klassieke fade, een strakke baard of gewoon 
                even bijknippen — je zit altijd goed.
              </p>
              <p className="text-foreground font-medium">
                Kom langs. Neem een kop koffie. En loop eruit zoals je eruit wilt zien.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
