import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  progress?: number;
  description?: string;
  iconRegistry?: Record<string, LucideIcon>;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  progress,
  description,
  iconRegistry,
}: MetricCardProps) {
  // Component determines its own icon based on title/content
  const getIconForTitle = (title: string): LucideIcon => {
    const titleLower = title.toLowerCase();
    if (
      titleLower.includes("revenue") ||
      titleLower.includes("sales") ||
      titleLower.includes("money")
    ) {
      return require("lucide-react").DollarSign;
    } else if (
      titleLower.includes("users") ||
      titleLower.includes("customers") ||
      titleLower.includes("people")
    ) {
      return require("lucide-react").Users;
    } else if (
      titleLower.includes("orders") ||
      titleLower.includes("shopping") ||
      titleLower.includes("cart")
    ) {
      return require("lucide-react").ShoppingCart;
    } else if (
      titleLower.includes("activity") ||
      titleLower.includes("performance") ||
      titleLower.includes("growth")
    ) {
      return require("lucide-react").Activity;
    } else if (
      titleLower.includes("trend") ||
      titleLower.includes("chart") ||
      titleLower.includes("analytics")
    ) {
      return require("lucide-react").TrendingUp;
    } else {
      return require("lucide-react").BarChart3; // Default icon
    }
  };

  const IconComponent = getIconForTitle(title);
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && (
          <IconComponent className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            <span className={getChangeColor()}>{change}</span>
            {description && ` ${description}`}
          </p>
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="mt-2" />
        )}
      </CardContent>
    </Card>
  );
}
