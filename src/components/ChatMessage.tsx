import { Badge } from "@/components/ui/badge";
import { FileText, FileType, Image, Mic } from "lucide-react";
import { useState } from "react";
import { CitationModal } from "./CitationModal";

interface Citation {
  id: string;
  source: string;
  type: "pdf" | "docx" | "image" | "audio";
  page?: number;
  timestamp?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
}

const getFileIcon = (type: Citation["type"]) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-3 h-3" />;
    case "docx":
      return <FileType className="w-3 h-3" />;
    case "image":
      return <Image className="w-3 h-3" />;
    case "audio":
      return <Mic className="w-3 h-3" />;
  }
};

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
    setIsModalOpen(true);
  };

  return (
    <>
      <CitationModal
        citation={selectedCitation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} slide-in-up`}>
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            isUser
              ? "bg-primary/10 border border-primary/20"
              : "bg-card border border-border"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

          {message.citations && message.citations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Sources:</p>
              <div className="flex flex-wrap gap-2">
                {message.citations.map((citation) => (
                  <Badge
                    key={citation.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/20 hover:border-primary hover:scale-105 transition-all duration-200 text-xs"
                    onClick={() => handleCitationClick(citation)}
                  >
                    <span className="mr-1">{getFileIcon(citation.type)}</span>
                    <span className="truncate max-w-[150px]">{citation.source}</span>
                    {citation.page && <span className="ml-1">p.{citation.page}</span>}
                    {citation.timestamp && (
                      <span className="ml-1">{citation.timestamp}</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
