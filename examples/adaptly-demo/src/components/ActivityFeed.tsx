import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Activity,
  User,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "user" | "sale" | "system" | "alert" | "success";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  value?: string;
  status?: "completed" | "pending" | "failed";
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
  title?: string;
  description?: string;
  maxItems?: number;
  showAvatars?: boolean;
  className?: string;
}

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "user",
    title: "New user registered",
    description: "Sarah Johnson joined the platform",
    timestamp: "2 minutes ago",
    user: { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg" },
    status: "completed",
  },
  {
    id: "2",
    type: "sale",
    title: "Order completed",
    description: "Order #1234 has been processed",
    timestamp: "5 minutes ago",
    value: "$299.99",
    status: "completed",
  },
  {
    id: "3",
    type: "system",
    title: "System update",
    description: "Database maintenance completed successfully",
    timestamp: "1 hour ago",
    status: "completed",
  },
  {
    id: "4",
    type: "alert",
    title: "High traffic detected",
    description: "Server load is above normal thresholds",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: "5",
    type: "success",
    title: "Backup completed",
    description: "Daily backup process finished successfully",
    timestamp: "3 hours ago",
    status: "completed",
  },
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "user":
      return User;
    case "sale":
      return ShoppingCart;
    case "system":
      return Activity;
    case "alert":
      return AlertCircle;
    case "success":
      return CheckCircle;
    default:
      return Clock;
  }
};

const getActivityColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "user":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "sale":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "system":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "alert":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "success":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
  }
};

const getStatusIcon = (status?: string) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "pending":
      return Clock;
    case "failed":
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "failed":
      return "text-red-600";
    default:
      return "text-slate-600";
  }
};

export function ActivityFeed({
  activities = [],
  title = "Recent Activity",
  description = "Latest system and user activities",
  maxItems = 5,
  showAvatars = true,
  className = "",
}: ActivityFeedProps) {
  // Generate sample data if none provided
  const activityData = activities.length > 0 ? activities : defaultActivities;
  const displayActivities = activityData.slice(0, maxItems);

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {displayActivities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            const StatusIcon = getStatusIcon(activity.status);

            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Activity Icon */}
                <div
                  className={`p-2 rounded-full ${getActivityColor(
                    activity.type
                  )} flex-shrink-0`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                    </div>

                    {/* Status and Value */}
                    <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                      {activity.value && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.value}
                        </Badge>
                      )}
                      <StatusIcon
                        className={`h-4 w-4 ${getStatusColor(activity.status)}`}
                      />
                    </div>
                  </div>

                  {/* User and Timestamp */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {showAvatars && activity.user && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="text-xs">
                            {activity.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      {activity.user && (
                        <span className="text-xs text-muted-foreground">
                          {activity.user.name}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
