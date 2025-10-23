import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const Navbar = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getUserInitial = () => {
    if (!session?.user?.email) return "U";
    return session.user.email.charAt(0).toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 border border-accent rounded-full px-6 py-2 hover:bg-accent/10 transition-colors"
          >
            <Landmark className="w-5 h-5 text-accent" />
            <span className="text-foreground font-medium">Wardiere Inc.</span>
          </button>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Service
            </button>
            <Button 
              variant="glass"
              onClick={() => navigate('/legal-agent')}
            >
              Try Agent
            </Button>
            {session ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 glass rounded-full px-4 py-2 hover:glass-strong transition-all"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground font-bold text-sm">
                    {getUserInitial()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground text-sm hidden sm:block">{session.user.email}</span>
              </button>
            ) : (
              <Button 
                variant="glass"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
