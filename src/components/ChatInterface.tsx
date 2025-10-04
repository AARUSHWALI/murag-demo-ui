import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Array<{
    id: string;
    source: string;
    type: "pdf" | "docx" | "image" | "audio";
    page?: number;
    timestamp?: string;
  }>;
}

const demoMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What are the security threats in Sector Alpha?",
  },
  {
    id: "2",
    role: "assistant",
    content: "The main threats in Sector Alpha include unauthorized crossings and restricted zone breaches. Analysis shows a 40% increase in perimeter violations over the past quarter, with most incidents occurring during low-visibility conditions.",
    citations: [
      { id: "c1", source: "National_Security_Brief.pdf", type: "pdf", page: 12 },
      { id: "c2", source: "Satellite_Map.png", type: "image" },
    ],
  },
  {
    id: "3",
    role: "user",
    content: "When is the planned meeting?",
  },
  {
    id: "4",
    role: "assistant",
    content: "The planned meeting is scheduled at 2300 hours near checkpoint Bravo, as confirmed in the intercepted communications.",
    citations: [
      { id: "c3", source: "Intercepted_Call.mp3", type: "audio", timestamp: "00:02:35" },
    ],
  },
  {
    id: "5",
    role: "user",
    content: "Summarize the report highlights.",
  },
  {
    id: "6",
    role: "assistant",
    content: "The report highlights several critical areas:\n\n• Infiltration risks have increased by 35% in monitored zones\n• Perimeter breaches show coordinated patterns suggesting organized activity\n• Cross-border coordination has evolved with more sophisticated communication methods\n• Recommended enhanced surveillance in Sectors Alpha and Delta",
    citations: [
      { id: "c4", source: "National_Security_Brief.pdf", type: "pdf", page: 10 },
      { id: "c5", source: "National_Security_Brief.pdf", type: "pdf", page: 12 },
      { id: "c6", source: "National_Security_Brief.pdf", type: "pdf", page: 14 },
    ],
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've analyzed your query across all uploaded documents. Based on the available intelligence data, I found relevant information in the National Security Brief and supporting evidence from satellite imagery and audio transcripts.",
        citations: [
          { id: "demo1", source: "National_Security_Brief.pdf", type: "pdf", page: 8 },
          { id: "demo2", source: "Satellite_Map.png", type: "image" },
        ],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border shadow-lg">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          MuRAG Chat Interface
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ask questions about your uploaded documents
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing your query...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about your documents..."
            className="flex-1 bg-background border-border focus:border-primary"
          />
          <Button
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
            variant="glow"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
