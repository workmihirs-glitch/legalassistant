import heroGavel from "@/assets/hero-gavel.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img 
          src={heroGavel} 
          alt="Professional legal services" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div 
            ref={titleRef}
            className={`glass-strong rounded-3xl p-16 transition-all duration-1000 ${
              titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <h1 className="font-playfair text-9xl font-bold leading-tight mb-8">
              <span className="text-foreground">Law</span>
              <br />
              <span className="text-accent italic">Firm</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Providing expert legal solutions with professionalism and dedication
            </p>
            <p className="text-muted-foreground/60 text-sm mt-6">2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
