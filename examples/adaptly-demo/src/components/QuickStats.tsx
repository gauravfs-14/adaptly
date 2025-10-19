import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Zap,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  progress?: number;
  target?: number;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

interface QuickStatsProps {
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  showProgress?: boolean;
  showTargets?: boolean;
  className?: string;
  // Filtering parameters that LLM can pass
  category?: string;
  timeRange?: "7d" | "30d" | "90d" | "1y";
  sortBy?: "value" | "change" | "progress" | "label";
  sortOrder?: "asc" | "desc";
  limit?: number;
}

const defaultStats: StatItem[] = [
  {
    id: "1",
    label: "Total Revenue",
    value: "$45,231",
    change: 12.5,
    changeType: "positive",
    progress: 75,
    target: 60000,
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: "2",
    label: "Active Users",
    value: "2,341",
    change: -2.1,
    changeType: "negative",
    progress: 68,
    target: 3500,
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: "3",
    label: "Conversion Rate",
    value: "3.2%",
    change: 0,
    changeType: "neutral",
    progress: 45,
    target: 5,
    icon: Target,
    color: "text-purple-600",
  },
  {
    id: "4",
    label: "Performance Score",
    value: "87",
    change: 5.2,
    changeType: "positive",
    progress: 87,
    target: 100,
    icon: Activity,
    color: "text-orange-600",
  },
];

const getTrendIcon = (changeType?: string) => {
  switch (changeType) {
    case "positive":
      return TrendingUp;
    case "negative":
      return TrendingDown;
    default:
      return Minus;
  }
};

const getTrendColor = (changeType?: string) => {
  switch (changeType) {
    case "positive":
      return "text-green-600";
    case "negative":
      return "text-red-600";
    default:
      return "text-slate-600";
  }
};

const getProgressColor = (progress?: number) => {
  if (!progress) return "bg-slate-200";
  if (progress >= 80) return "bg-green-500";
  if (progress >= 60) return "bg-blue-500";
  if (progress >= 40) return "bg-yellow-500";
  return "bg-red-500";
};

export function QuickStats({
  title = "Quick Stats",
  description = "Key performance indicators at a glance",
  columns = 2,
  showProgress = true,
  showTargets = true,
  className = "",
  category,
  timeRange = "30d",
  sortBy = "value",
  sortOrder = "desc",
  limit = 6,
}: QuickStatsProps) {
  // Simulate data fetching based on filtering parameters
  const generateData = () => {
    let filteredData = [...defaultStats];

    // Filter by category if specified
    if (category) {
      filteredData = filteredData.filter((stat) =>
        stat.label.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Sort data
    filteredData.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "value":
          aVal =
            typeof a.value === "string"
              ? parseFloat(a.value.replace(/[^0-9.-]/g, ""))
              : a.value;
          bVal =
            typeof b.value === "string"
              ? parseFloat(b.value.replace(/[^0-9.-]/g, ""))
              : b.value;
          break;
        case "change":
          aVal = a.change || 0;
          bVal = b.change || 0;
          break;
        case "progress":
          aVal = a.progress || 0;
          bVal = b.progress || 0;
          break;
        case "label":
          aVal = a.label;
          bVal = b.label;
          break;
        default:
          aVal = a.value;
          bVal = b.value;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        const aNum = typeof aVal === "number" ? aVal : 0;
        const bNum = typeof bVal === "number" ? bVal : 0;
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }
    });

    // Apply limit
    return filteredData.slice(0, limit);
  };

  const statsData = generateData();
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className={`grid ${gridCols[columns]} gap-4`}>
          {statsData.map((stat) => {
            const TrendIcon = getTrendIcon(stat.changeType);
            const IconComponent = stat.icon || Activity;

            return (
              <div key={stat.id} className="p-4 bg-muted/30 rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent
                      className={`h-4 w-4 ${stat.color || "text-slate-600"}`}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  {stat.change !== undefined && stat.change !== 0 && (
                    <div
                      className={`flex items-center space-x-1 ${getTrendColor(
                        stat.changeType
                      )}`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="text-2xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>

                {/* Progress Bar */}
                {showProgress && stat.progress !== undefined && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                )}

                {/* Target */}
                {showTargets && stat.target && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Target</span>
                    <Badge variant="outline" className="text-xs">
                      {typeof stat.target === "number" && stat.target > 100
                        ? `$${stat.target.toLocaleString()}`
                        : stat.target}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
