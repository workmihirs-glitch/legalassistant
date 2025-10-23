import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Landmark, FileText, Scale, TrendingUp, LogOut } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import { Session } from "@supabase/supabase-js";

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  const getUserInitial = () => {
    if (!session?.user?.email) return "U";
    return session.user.email.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground italic">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <div className="relative z-10">
        {/* Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 glass rounded-full px-6 py-2 hover:glass-strong transition-all"
              >
                <Landmark className="w-5 h-5 text-accent" />
                <span className="text-foreground font-medium italic">Wardiere Inc.</span>
              </button>
              
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 glass">
                  <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                    {getUserInitial()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-foreground italic hidden sm:block">{session?.user?.email}</span>
                <Button variant="glass" size="icon" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 italic">
                Welcome to Your Dashboard
              </h1>
              <p className="text-muted-foreground italic">
                Manage your legal cases and access AI-powered legal analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="glass hover:glass-strong transition-all cursor-pointer" onClick={() => navigate('/legal-agent')}>
                <CardHeader>
                  <FileText className="w-12 h-12 text-accent mb-4" />
                  <CardTitle className="italic">Legal AI Agent</CardTitle>
                  <CardDescription className="italic">
                    Analyze cases with AI-powered prosecution and defense attorneys
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass hover:glass-strong transition-all">
                <CardHeader>
                  <Scale className="w-12 h-12 text-accent mb-4" />
                  <CardTitle className="italic">Case History</CardTitle>
                  <CardDescription className="italic">
                    View your previously analyzed cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">Coming soon...</p>
                </CardContent>
              </Card>

              <Card className="glass hover:glass-strong transition-all">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-accent mb-4" />
                  <CardTitle className="italic">Statistics</CardTitle>
                  <CardDescription className="italic">
                    Track your case analysis trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">Coming soon...</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="italic">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button variant="glass" onClick={() => navigate('/legal-agent')}>
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="italic">Analyze New Case</span>
                </Button>
                <Button variant="glass" onClick={() => navigate('/')}>
                  <Landmark className="w-4 h-4 mr-2" />
                  <span className="italic">Back to Home</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
