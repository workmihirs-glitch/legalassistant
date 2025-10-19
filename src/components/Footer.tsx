import { Landmark } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-accent py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-accent" />
            <span className="text-foreground font-semibold">Wardiere Inc.</span>
          </div>
          
          <p className="text-foreground/60 text-sm">
            © 2025 Wardiere Inc. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-accent hover:text-accent/80 transition-colors">Privacy Policy</a>
            <a href="#" className="text-accent hover:text-accent/80 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
