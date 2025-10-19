import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Settings,
  Filter,
} from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  category?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  title?: string;
  description?: string;
  maxItems?: number;
  showFilters?: boolean;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
  className?: string;
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Payment Processed",
    message: "Your payment of $299.99 has been successfully processed.",
    timestamp: "2 minutes ago",
    read: false,
    priority: "high",
    category: "payments",
  },
  {
    id: "2",
    type: "warning",
    title: "Server Maintenance",
    message: "Scheduled maintenance will begin at 2:00 AM UTC.",
    timestamp: "1 hour ago",
    read: false,
    priority: "medium",
    category: "system",
  },
  {
    id: "3",
    type: "info",
    title: "New Feature Available",
    message: "Check out our new dashboard analytics feature.",
    timestamp: "3 hours ago",
    read: true,
    priority: "low",
    category: "product",
  },
  {
    id: "4",
    type: "error",
    title: "API Rate Limit",
    message: "API rate limit exceeded. Please try again in 15 minutes.",
    timestamp: "5 hours ago",
    read: true,
    priority: "high",
    category: "system",
  },
  {
    id: "5",
    type: "success",
    title: "Backup Completed",
    message: "Daily backup process completed successfully.",
    timestamp: "1 day ago",
    read: true,
    priority: "low",
    category: "system",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return Info;
    case "warning":
      return AlertTriangle;
    case "success":
      return CheckCircle;
    case "error":
      return AlertTriangle;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "success":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "error":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
  }
};

const getPriorityColor = (priority: Notification["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
  }
};

export function NotificationCenter({
  notifications = defaultNotifications,
  title = "Notifications",
  description = "Stay updated with the latest activities",
  maxItems = 8,
  showFilters = true,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  className = "",
}: NotificationCenterProps) {
  // LLM should only filter, not pass data - always use default data
  const safeNotifications = defaultNotifications;
  const unreadCount = safeNotifications.filter((n) => !n.read).length;
  const displayNotifications = safeNotifications.slice(0, maxItems);

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <CardTitle>{title}</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {showFilters && (
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {onMarkAllAsRead && unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
            {onClearAll && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                className="text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {displayNotifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);

            return (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  notification.read
                    ? "bg-muted/30 border-muted"
                    : "bg-background border-border shadow-sm"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Notification Icon */}
                  <div
                    className={`p-2 rounded-full ${getNotificationColor(
                      notification.type
                    )} flex-shrink-0`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4
                            className={`text-sm font-medium ${
                              notification.read
                                ? "text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                      </div>

                      {/* Priority and Actions */}
                      <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {notification.priority}
                        </Badge>
                        {onMarkAsRead && !notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Timestamp and Category */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {notification.category && (
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                      )}
                    </div>
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
