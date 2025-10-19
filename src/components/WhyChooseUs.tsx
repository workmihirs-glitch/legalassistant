const WhyChooseUs = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h2 className="font-playfair text-5xl font-bold leading-tight mb-8">
            <span className="text-foreground">Proven Expertise</span>
            <br />
            <span className="text-accent">& Client Commitment</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-accent text-2xl font-semibold mb-3">Experienced Legal Team</h3>
              <p className="text-foreground/80 text-base leading-relaxed">
                We prioritize client success through personalized service and a results-driven approach.
              </p>
            </div>
            
            <div className="border-l-2 border-accent pl-6 space-y-3">
              <h3 className="text-accent text-xl font-semibold">Why Choose Us</h3>
              <ul className="space-y-2">
                <li className="text-foreground/80">• Transparent Communication</li>
                <li className="text-foreground/80">• Proven Track Record</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
