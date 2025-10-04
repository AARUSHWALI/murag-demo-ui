import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { FileUploadPanel } from "@/components/FileUploadPanel";
import { ProcessingPipeline } from "@/components/ProcessingPipeline";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              🚀 Air-Gapped AI System
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-glow-pulse">
              Multimodal Retrieval-Augmented Generation
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload PDFs, documents, images, and audio. Ask questions in natural
            language. Get AI-powered answers with verifiable citations. All in a
            secure, offline-ready environment.
          </p>
          <Button 
            variant="glow" 
            size="lg"
            onClick={() => {
              document.getElementById('chat-section')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
              });
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Query Your Data
          </Button>
        </div>

        {/* Metrics Dashboard */}
        <MetricsDashboard />
      </section>

      {/* Processing Pipeline */}
      <section className="container mx-auto px-4 py-8">
        <ProcessingPipeline />
      </section>

      {/* Main Interface */}
      <section id="chat-section" className="container mx-auto px-4 py-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload Panel */}
          <div className="lg:col-span-1 h-[600px]">
            <FileUploadPanel />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 h-[600px]">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "OCR Processing",
              description: "Extract text from scanned documents and images",
            },
            {
              title: "Speech-to-Text",
              description: "Convert audio recordings to searchable text",
            },
            {
              title: "Vector Search",
              description: "Semantic retrieval across all document types",
            },
            {
              title: "Citation Tracking",
              description: "Every answer includes verifiable sources",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            MuRAG - Built for secure, confidential, and reliable AI-powered
            document analysis
          </p>
          <p className="mt-2">Demo Mode Active - No backend processing</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
