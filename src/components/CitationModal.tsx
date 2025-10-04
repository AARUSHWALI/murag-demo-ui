import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Image, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface Citation {
  id: string;
  source: string;
  type: "pdf" | "docx" | "image" | "audio";
  page?: number;
  timestamp?: string;
}

interface CitationModalProps {
  citation: Citation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CitationModal({ citation, isOpen, onClose }: CitationModalProps) {
  const [audioTime, setAudioTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (citation?.type === "audio" && citation.timestamp && audioRef.current) {
      const [minutes, seconds] = citation.timestamp.split(":").slice(1).map(Number);
      const timeInSeconds = minutes * 60 + seconds;
      audioRef.current.currentTime = timeInSeconds;
    }
  }, [citation, isOpen]);

  if (!citation) return null;

  const renderContent = () => {
    switch (citation.type) {
      case "pdf":
      case "docx":
        return (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6 min-h-[400px]">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">
                    {citation.source} {citation.page && `- Page ${citation.page}`}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Document Extract</p>
                </div>
              </div>
              <div className="bg-background/50 rounded p-4 border border-primary/20">
                <p className="text-sm leading-relaxed">
                  {citation.page === 12 && (
                    <span className="bg-primary/20 px-1">
                      "Cross-border infiltration statistics show a marked increase in Sector
                      Alpha, with 47 documented incidents in Q4. Analysis indicates coordinated
                      patterns suggesting organized activity rather than random occurrences.
                      Restricted zone perimeter breaches have increased by 40%, requiring
                      immediate attention and enhanced surveillance protocols."
                    </span>
                  )}
                  {citation.page === 10 && (
                    <span className="bg-primary/20 px-1">
                      "Executive Summary: The current threat landscape has evolved significantly
                      over the monitoring period. Infiltration risks have increased by 35% across
                      all monitored zones, with particular concentration in Sectors Alpha and
                      Delta. This report outlines key findings and recommended countermeasures."
                    </span>
                  )}
                  {citation.page === 14 && (
                    <span className="bg-primary/20 px-1">
                      "Coordination patterns detected through signal intelligence indicate
                      sophisticated communication methods. Cross-border activities show evidence of
                      pre-planning and resource allocation, suggesting well-organized operations
                      rather than opportunistic incidents."
                    </span>
                  )}
                  {citation.page === 8 && (
                    <span className="bg-primary/20 px-1">
                      "Sector monitoring data reveals consistent patterns of unauthorized movement
                      during low-visibility conditions. Night-time incidents account for 73% of
                      detected breaches, with peak activity between 2200-0300 hours."
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-3 mb-4">
                <Image className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{citation.source}</h4>
                  <p className="text-sm text-muted-foreground mt-1">Satellite Imagery Analysis</p>
                </div>
              </div>
              <div className="relative bg-slate-900 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="relative z-10 text-center p-8">
                  <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/40 rounded text-primary text-sm font-mono">
                    CLASSIFIED - SECTOR ALPHA
                  </div>
                  <div className="border-2 border-primary/50 rounded-lg p-8 inline-block bg-background/10 backdrop-blur">
                    <p className="text-primary font-mono text-lg mb-2">
                      📍 Coordinates: 34.2847°N, 74.3912°E
                    </p>
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded">
                      <p className="text-red-400 font-semibold">⚠️ RESTRICTED ZONE PERIMETER</p>
                      <p className="text-sm text-red-300 mt-2">Sector Alpha - High Security Area</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-6 font-mono">
                    OCR Extracted: "Sector Alpha – restricted zone perimeter"
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "audio":
        return (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Mic className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{citation.source}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Audio Transcript {citation.timestamp && `- ${citation.timestamp}`}
                  </p>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-6 border border-primary/20">
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => audioRef.current?.play()}
                      className="bg-primary/10 border-primary/30"
                    >
                      ▶ Play
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => audioRef.current?.pause()}
                    >
                      ⏸ Pause
                    </Button>
                    <span className="text-xs text-muted-foreground font-mono">
                      {audioTime.toFixed(1)}s / 180s
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-100"
                      style={{ width: `${(audioTime / 180) * 100}%` }}
                    />
                  </div>
                  <audio
                    ref={audioRef}
                    onTimeUpdate={(e) => setAudioTime(e.currentTarget.currentTime)}
                    className="hidden"
                  >
                    <source src="" type="audio/mpeg" />
                  </audio>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-mono">TRANSCRIPT:</p>
                  <p className="text-sm leading-relaxed">
                    <span className="text-muted-foreground">[00:02:20]</span>{" "}
                    <span className="opacity-70">
                      "...confirm the location for the exchange..."
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="text-muted-foreground">[00:02:35]</span>{" "}
                    <span className="bg-primary/20 px-1 font-medium">
                      "Meeting scheduled at 2300 hours near checkpoint Bravo."
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="text-muted-foreground">[00:02:48]</span>{" "}
                    <span className="opacity-70">
                      "...bring the package as discussed. Confirm receipt..."
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Source Preview</DialogTitle>
          <DialogDescription>View extracted content from {citation.source}</DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
