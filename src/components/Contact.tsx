import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="py-20 bg-darker-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-playfair text-6xl font-bold leading-tight">
            <span className="text-foreground">Get in Touch</span>
            <br />
            <span className="text-accent italic">with Our Team</span>
          </h2>
          
          <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Ready to discuss your legal needs? Contact Wardiere Inc. today for a consultation. We're here to provide the expert legal support you deserve.
          </p>
          
          <div className="flex gap-4 justify-center items-center">
            <div className="text-left space-y-2">
              <p className="text-accent font-medium">Email:</p>
              <p className="text-foreground">contact@wardiereinc.com</p>
            </div>
            <div className="w-px h-12 bg-accent" />
            <div className="text-left space-y-2">
              <p className="text-accent font-medium">Phone:</p>
              <p className="text-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-12"
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
