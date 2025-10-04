import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-primary-foreground shadow-lg">
              Mu
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MuRAG
              </h1>
              <p className="text-xs text-muted-foreground">
                Multimodal AI Platform
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Languages className="w-4 h-4 mr-2" />
            EN / हि
          </Button>
        </div>
      </div>
    </header>
  );
}
