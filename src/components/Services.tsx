import servicesImage from "@/assets/services-image.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  const { ref: serviceRef, isVisible: serviceVisible } = useScrollAnimation(0.2);
  const services = [
    { title: "Corporate Law", description: "Business formation, compliance, contracts" },
    { title: "Civil Litigation", description: "Dispute resolution, claims" },
    { title: "Family Law", description: "Divorce, custody, estate planning" },
    { title: "Real Estate Law", description: "Property disputes, transactions" },
  ];

  return (
    <section id="services" className="min-h-screen py-20 relative">
      <div className="absolute top-20 right-20 w-16 h-1 bg-accent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 items-start">
          <div 
            ref={serviceRef}
            className={`space-y-8 sticky top-32 transition-all duration-1000 ${
              serviceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <div className="border border-accent rounded-lg px-6 py-3 inline-block mb-6">
                <span className="text-accent font-medium">Our Services</span>
              </div>
              
              <h2 className="font-playfair text-6xl font-bold leading-tight">
                <span className="text-accent">Comprehensive</span>
                <br />
                <span className="text-foreground italic">Legal Support</span>
              </h2>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden border-2 border-accent">
              <img 
                src={servicesImage} 
                alt="Professional legal services" 
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="space-y-2">
                  <div className="border-b border-accent pb-3">
                    <h3 className="text-accent font-semibold text-lg">{service.title}</h3>
                  </div>
                  <p className="text-foreground/70 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
