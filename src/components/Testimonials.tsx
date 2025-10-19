import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation(0.2);
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
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`border border-accent rounded-lg p-8 bg-background transition-all duration-700 ${
                testimonialVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <p className="text-foreground/90 text-lg italic mb-6">"{testimonial.quote}"</p>
              <p className="text-accent font-medium">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
