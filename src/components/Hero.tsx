import heroGavel from "@/assets/hero-gavel.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation(0.3);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.3);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative">
          <img 
            src={heroGavel} 
            alt="Professional legal services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
        </div>
        <div className="bg-background" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 w-1 bg-accent h-full transform -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div 
            ref={textRef}
            className={`flex items-center justify-center transition-all duration-1000 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="border border-accent rounded-lg p-8 bg-background/80 backdrop-blur-sm">
              <p className="text-accent text-lg leading-relaxed">
                Providing expert legal<br />
                solutions with<br />
                professionalism and<br />
                dedication.
              </p>
            </div>
          </div>
          
          <div 
            ref={titleRef}
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div>
              <h1 className="font-playfair text-8xl font-bold leading-tight">
                <span className="text-foreground">Law</span>
                <br />
                <span className="text-accent italic">Firm</span>
              </h1>
            </div>
            <p className="text-foreground text-sm">2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
