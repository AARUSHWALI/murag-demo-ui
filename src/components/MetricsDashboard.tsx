import { Shield, CheckCircle, Zap } from "lucide-react";

const metrics = [
  {
    icon: Shield,
    title: "Security",
    value: "Air-Gapped",
    description: "Complete data isolation",
    color: "text-primary",
  },
  {
    icon: CheckCircle,
    title: "Trust",
    value: "98.5%",
    description: "Citation accuracy",
    color: "text-green-500",
  },
  {
    icon: Zap,
    title: "Scalability",
    value: "10M+",
    description: "Documents processed",
    color: "text-secondary",
  },
];

export function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-card rounded-lg border border-border p-6 shadow-lg hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg bg-background border border-border group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300 ${metric.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
