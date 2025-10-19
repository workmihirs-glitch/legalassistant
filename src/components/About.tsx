import teamPhoto from "@/assets/team-photo.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full">
        <div className="absolute top-20 right-20 w-16 h-1 bg-accent" />
        <div className="absolute top-20 right-20 w-1 h-16 bg-accent" />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div 
            ref={titleRef}
            className={`space-y-8 transition-all duration-1000 ${
              titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div>
              <h2 className="font-playfair text-6xl font-bold leading-tight mb-4">
                <span className="text-foreground italic">Experienced</span>
                <br />
                <span className="text-accent">& Trusted Legal</span>
                <br />
                <span className="text-accent">Experts</span>
              </h2>
            </div>
            
            <p className="text-foreground/80 text-base leading-relaxed max-w-lg">
              Our firm is committed to delivering top-tier legal services with integrity and expertise. With years of experience across multiple legal disciplines, we advocate for our clients with passion and precision.
            </p>
          </div>
          
          <div 
            ref={imageRef}
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="rounded-2xl overflow-hidden border-2 border-accent">
              <img 
                src={teamPhoto} 
                alt="Our experienced legal team" 
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-accent rounded-lg p-6 bg-background">
                <h3 className="text-accent font-semibold text-lg mb-2">Over 20 Years of Experience</h3>
              </div>
              <div className="border border-accent rounded-lg p-6 bg-background">
                <h3 className="text-accent font-semibold text-lg mb-2">Wide Range of Legal Services</h3>
              </div>
              <div className="border border-accent rounded-lg p-6 bg-background col-span-2">
                <h3 className="text-accent font-semibold text-lg mb-2">Certified Legal Practitioners</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
