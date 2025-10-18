import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  color: string;
}

interface SystemMetricsProps {
  metrics?: SystemMetric[];
  title?: string;
  description?: string;
}

const defaultMetrics: SystemMetric[] = [
  { name: "CPU Usage", value: 75, max: 100, color: "bg-blue-500" },
  { name: "Memory", value: 60, max: 100, color: "bg-green-500" },
  { name: "Storage", value: 45, max: 100, color: "bg-yellow-500" },
  { name: "Network", value: 85, max: 100, color: "bg-red-500" },
];

export function SystemMetrics({
  metrics = defaultMetrics,
  title = "System Performance",
  description = "Real-time system metrics",
}: SystemMetricsProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid gap-4 md:grid-cols-2 h-full">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.name}</span>
                <span>{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
