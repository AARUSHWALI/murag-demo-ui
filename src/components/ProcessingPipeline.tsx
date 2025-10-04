import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  { id: 1, name: "OCR", description: "Extract text from images" },
  { id: 2, name: "STT", description: "Speech to text conversion" },
  { id: 3, name: "Embedding", description: "Generate vector embeddings" },
  { id: 4, name: "Retrieval", description: "Semantic search" },
  { id: 5, name: "Answer", description: "Generate response" },
];

export function ProcessingPipeline() {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Processing Pipeline
      </h3>
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-border">
          <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent processing-bar" />
          </div>
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isComplete = index < 3;
            const isActive = index === 3;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isComplete
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                      : isActive
                      ? "bg-secondary text-secondary-foreground shadow-[0_0_15px_hsl(var(--secondary)/0.5)] animate-pulse"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </div>
                <div className="text-center max-w-[80px]">
                  <p className="text-xs font-medium mb-0.5">{step.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
