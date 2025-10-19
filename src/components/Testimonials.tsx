import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { use3DTilt } from "@/hooks/use3DTilt";

const Testimonials = () => {
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation(0.2);
  const tilt1 = use3DTilt();
  const tilt2 = use3DTilt();
  const tilt3 = use3DTilt();
  
  const testimonials = [
    { quote: "Professional and attentive— highly recommend.", author: "Brigitte Schwartz" },
    { quote: "They handled my case with great care and expertise.", author: "Matt Zhang" },
    { quote: "Outstanding service and clear communication.", author: "Yael Amari" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="font-playfair text-5xl font-bold text-accent mb-12">Client Testimonials</h2>
        
        <div 
          ref={testimonialRef}
          className="grid grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => {
            const tiltProps = index === 0 ? tilt1 : index === 1 ? tilt2 : tilt3;
            return (
              <div 
                key={index} 
                {...tiltProps}
                className={`border border-accent rounded-lg p-8 bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-xl transition-all duration-700 cursor-pointer ${
                  testimonialVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transition: 'transform 0.1s ease-out, opacity 0.7s, scale 0.7s',
                }}
              >
                <p className="text-foreground/90 text-lg italic mb-6">"{testimonial.quote}"</p>
                <p className="text-accent font-medium">- {testimonial.author}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
