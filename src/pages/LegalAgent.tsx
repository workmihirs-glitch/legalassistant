import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Scale, Gavel, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ParticleBackground from "@/components/ParticleBackground";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LegalAgent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prosecutionAnalysis, setProsecutionAnalysis] = useState("");
  const [defenseAnalysis, setDefenseAnalysis] = useState("");
  const [verdict, setVerdict] = useState("");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: uploadRef, isVisible: uploadVisible } = useScrollAnimation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;
      
      if (fileType === "application/pdf" || fileType.startsWith("image/")) {
        setFile(selectedFile);
        setProsecutionAnalysis("");
        setDefenseAnalysis("");
        setVerdict("");
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file",
          variant: "destructive",
        });
      }
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
          // Process in chunks to avoid stack overflow
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < typedarray.length; i += chunkSize) {
            const chunk = typedarray.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, Array.from(chunk));
          }
          const base64 = btoa(binary);
          resolve(`data:application/pdf;base64,${base64}`);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeCase = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a case document",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProsecutionAnalysis("");
    setDefenseAnalysis("");
    setVerdict("");

    try {
      let payload: { caseText?: string; imageBase64?: string } = {};

      if (file.type === "application/pdf") {
        const pdfBase64 = await extractTextFromPDF(file);
        payload.imageBase64 = pdfBase64;
      } else if (file.type.startsWith("image/")) {
        const imageBase64 = await fileToBase64(file);
        payload.imageBase64 = imageBase64;
      }

      const { data, error } = await supabase.functions.invoke('legal-analysis', {
        body: payload
      });

      if (error) throw error;

      setProsecutionAnalysis(data.prosecution);
      setDefenseAnalysis(data.defense);
      setVerdict(data.verdict);

      toast({
        title: "Analysis Complete",
        description: "Legal analysis has been generated successfully",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze case",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parseVerdict = (verdictText: string) => {
    const lines = verdictText.split('\n');
    const verdictLine = lines.find(l => l.includes('VERDICT:'));
    const prosLine = lines.find(l => l.includes('PROSECUTION WIN PROBABILITY:'));
    const defLine = lines.find(l => l.includes('DEFENSE WIN PROBABILITY:'));
    const reasoningStart = lines.findIndex(l => l.includes('REASONING:'));
    
    return {
      verdict: verdictLine?.split('VERDICT:')[1]?.trim() || verdictText,
      prosecutionProb: prosLine?.match(/\d+/)?.[0] || '50',
      defenseProb: defLine?.match(/\d+/)?.[0] || '50',
      reasoning: reasoningStart >= 0 ? lines.slice(reasoningStart).join('\n') : ''
    };
  };

  const parsedVerdict = verdict ? parseVerdict(verdict) : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 pt-24 pb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-8 text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
          >
            ← Back to Home
          </button>

          <div
            ref={headerRef}
            className={`text-center transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Scale className="w-12 h-12 text-accent" />
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Legal Case Analyzer
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered prosecution and defense analysis based on Indian law
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="container mx-auto px-6 py-12">
          <div
            ref={uploadRef}
            className={`transition-all duration-1000 delay-200 ${
              uploadVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
          <Card className="glass backdrop-blur-md border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-6 h-6 text-accent" />
                Upload Case Document
              </CardTitle>
              <CardDescription>
                Upload a PDF or image file containing the case details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="flex-1 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:glass file:text-foreground hover:file:glass-strong"
                  />
                  <Button
                    onClick={analyzeCase}
                    disabled={!file || isAnalyzing}
                    variant="glass"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Gavel className="w-4 h-4 mr-2" />
                        Analyze Case
                      </>
                    )}
                  </Button>
                </div>
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-500">
                    This AI assistant only responds to legal questions and analyzes cases based on Indian law system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Analysis Results */}
        {(prosecutionAnalysis || defenseAnalysis || verdict) && (
          <div className="container mx-auto px-6 pb-12 space-y-8">
            {/* Prosecution Analysis */}
            {prosecutionAnalysis && (
              <Card className="glass backdrop-blur-md border-red-500/20 shadow-lg animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <Gavel className="w-6 h-6" />
                    Prosecution Attorney Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {prosecutionAnalysis}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Defense Analysis */}
            {defenseAnalysis && (
              <Card className="glass backdrop-blur-md border-blue-500/20 shadow-lg animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-500">
                    <Scale className="w-6 h-6" />
                    Defense Attorney Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {defenseAnalysis}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verdict */}
            {verdict && parsedVerdict && (
              <Card className="glass backdrop-blur-md border-accent/30 shadow-lg animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Gavel className="w-6 h-6" />
                    Final Verdict & Probability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-500">Prosecution Win Probability</span>
                        <span className="text-2xl font-bold text-red-500">{parsedVerdict.prosecutionProb}%</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 transition-all duration-1000"
                          style={{ width: `${parsedVerdict.prosecutionProb}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-500">Defense Win Probability</span>
                        <span className="text-2xl font-bold text-blue-500">{parsedVerdict.defenseProb}%</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-1000"
                          style={{ width: `${parsedVerdict.defenseProb}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {verdict}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalAgent;