import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface ResourceMetric {
  id: string;
  name: string;
  value: number;
  max: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  icon: React.ComponentType<{ className?: string }>;
}

interface ResourceMonitorProps {
  metrics?: ResourceMetric[];
  title?: string;
  description?: string;
  showTrends?: boolean;
  showStatus?: boolean;
  className?: string;
}

const defaultMetrics: ResourceMetric[] = [
  {
    id: "cpu",
    name: "CPU Usage",
    value: 45,
    max: 100,
    unit: "%",
    status: "healthy",
    trend: "stable",
    icon: Cpu,
  },
  {
    id: "memory",
    name: "Memory",
    value: 78,
    max: 100,
    unit: "%",
    status: "warning",
    trend: "up",
    icon: MemoryStick,
  },
  {
    id: "disk",
    name: "Disk Space",
    value: 62,
    max: 100,
    unit: "%",
    status: "healthy",
    trend: "stable",
    icon: HardDrive,
  },
  {
    id: "network",
    name: "Network",
    value: 23,
    max: 100,
    unit: "%",
    status: "healthy",
    trend: "down",
    icon: Wifi,
  },
  {
    id: "server",
    name: "Server Load",
    value: 89,
    max: 100,
    unit: "%",
    status: "critical",
    trend: "up",
    icon: Server,
  },
];

const getStatusIcon = (status: ResourceMetric["status"]) => {
  switch (status) {
    case "healthy":
      return CheckCircle;
    case "warning":
      return AlertTriangle;
    case "critical":
      return AlertTriangle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: ResourceMetric["status"]) => {
  switch (status) {
    case "healthy":
      return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200";
    case "warning":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
    case "critical":
      return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200";
    default:
      return "text-slate-600 bg-slate-100 dark:bg-slate-900 dark:text-slate-200";
  }
};

const getProgressColor = (status: ResourceMetric["status"]) => {
  switch (status) {
    case "healthy":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "critical":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
};

const getTrendColor = (trend?: ResourceMetric["trend"]) => {
  switch (trend) {
    case "up":
      return "text-red-600";
    case "down":
      return "text-green-600";
    case "stable":
      return "text-slate-600";
    default:
      return "text-slate-600";
  }
};

export function ResourceMonitor({
  metrics = defaultMetrics,
  title = "Resource Monitor",
  description = "System resource utilization and performance metrics",
  showTrends = true,
  showStatus = true,
  className = "",
}: ResourceMonitorProps) {
  const criticalCount = metrics.filter((m) => m.status === "critical").length;
  const warningCount = metrics.filter((m) => m.status === "warning").length;

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <CardTitle>{title}</CardTitle>
            {(criticalCount > 0 || warningCount > 0) && (
              <div className="flex items-center space-x-1">
                {criticalCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {criticalCount} critical
                  </Badge>
                )}
                {warningCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {warningCount} warning
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          {metrics.map((metric) => {
            const StatusIcon = getStatusIcon(metric.status);
            const IconComponent = metric.icon;

            return (
              <div key={metric.id} className="p-4 bg-muted/30 rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {showStatus && (
                      <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(
                          metric.status
                        )}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{metric.status}</span>
                      </div>
                    )}
                    {showTrends && metric.trend && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${getTrendColor(metric.trend)}`}
                      >
                        {metric.trend}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Value and Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {metric.value}
                      {metric.unit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      of {metric.max}
                      {metric.unit}
                    </span>
                  </div>

                  <Progress value={metric.value} className="h-2" />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>0{metric.unit}</span>
                    <span>
                      {metric.max}
                      {metric.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {metrics.filter((m) => m.status === "healthy").length}
              </div>
              <div className="text-xs text-muted-foreground">Healthy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {metrics.filter((m) => m.status === "warning").length}
              </div>
              <div className="text-xs text-muted-foreground">Warning</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {metrics.filter((m) => m.status === "critical").length}
              </div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
