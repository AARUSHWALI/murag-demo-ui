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
    content: "What are the key findings from the uploaded research papers?",
  },
  {
    id: "2",
    role: "assistant",
    content: "Based on the uploaded documents, I've identified three key findings:\n\n1. The neural network architecture shows 94% accuracy in multimodal classification tasks[1].\n\n2. Processing latency for real-time inference averages 120ms across all modalities[2].\n\n3. The retrieval-augmented generation approach significantly reduces hallucination rates compared to baseline models[3].",
    citations: [
      { id: "c1", source: "research_paper.pdf", type: "pdf", page: 15 },
      { id: "c2", source: "performance_metrics.docx", type: "docx", page: 8 },
      { id: "c3", source: "benchmark_results.pdf", type: "pdf", page: 22 },
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
        content: "I've analyzed your query across all uploaded documents. Here's what I found based on the available information...",
        citations: [
          { id: "demo", source: "uploaded_file.pdf", type: "pdf", page: 5 },
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
