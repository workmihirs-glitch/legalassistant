import aboutImage from "@/assets/about-image.jpg";

const Mission = () => {
  return (
    <section className="min-h-screen py-20 relative">
      <div className="absolute top-20 left-20 w-1 h-32 bg-accent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="border border-accent rounded-lg p-4 inline-block">
                <p className="text-accent">Advocating for Client Rights</p>
              </div>
              <div className="border border-accent rounded-lg p-4 inline-block ml-8">
                <p className="text-accent">Ensuring Justice</p>
              </div>
              <div className="border border-accent rounded-lg p-4 inline-block">
                <p className="text-accent">Upholding Integrity</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="font-playfair text-6xl font-bold leading-tight">
              <span className="text-accent italic">Our Commitment</span>
              <br />
              <span className="text-foreground">to Justice</span>
            </h2>
            
            <div className="rounded-2xl overflow-hidden border-2 border-accent">
              <img 
                src={aboutImage} 
                alt="Our commitment to justice" 
                className="w-full h-80 object-cover"
              />
            </div>
            
            <p className="text-foreground/80 text-base leading-relaxed">
              Our mission is to provide our clients with clear, effective, and strategic legal solutions. We envision a world where justice is accessible, transparent, and fair for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
