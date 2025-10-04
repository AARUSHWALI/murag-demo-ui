import { useState } from "react";
import { FileText, FileType, Image, Mic, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "docx" | "image" | "audio";
  size: string;
  status: "processing" | "completed";
  uploadedAt?: Date;
}

const demoFiles: UploadedFile[] = [
  {
    id: "demo-1",
    name: "National_Security_Brief.pdf",
    type: "pdf",
    size: "2.4 MB",
    status: "completed",
    uploadedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "demo-2",
    name: "Satellite_Map.png",
    type: "image",
    size: "1.8 MB",
    status: "completed",
    uploadedAt: new Date(Date.now() - 2400000),
  },
  {
    id: "demo-3",
    name: "Intercepted_Call.mp3",
    type: "audio",
    size: "3.2 MB",
    status: "completed",
    uploadedAt: new Date(Date.now() - 1800000),
  },
];

const getFileIcon = (type: UploadedFile["type"]) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-destructive" />;
    case "docx":
      return <FileType className="w-5 h-5 text-primary" />;
    case "image":
      return <Image className="w-5 h-5 text-secondary" />;
    case "audio":
      return <Mic className="w-5 h-5 text-accent" />;
  }
};

export function FileUploadPanel() {
  const [files, setFiles] = useState<UploadedFile[]>(demoFiles);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    toast.success("File upload simulation - feature coming soon!");
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.info("File removed");
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border shadow-lg">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Document Library
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload and manage your files
        </p>
      </div>

      {/* Upload Area */}
      <div className="p-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5 scale-105"
              : "border-border hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-primary animate-float" />
          <p className="text-sm font-medium mb-1">Drop files here</p>
          <p className="text-xs text-muted-foreground">
            PDF, DOCX, Images, Audio supported
          </p>
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-200 group"
            >
              <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span
                    className={
                      file.status === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {file.status === "completed" ? "✓ Indexed" : "Processing..."}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(file.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
