import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

interface QuickActionsProps {
  actions?: QuickAction[];
  title?: string;
  description?: string;
  columns?: number;
}

const defaultActions: QuickAction[] = [
  {
    id: "export",
    label: "Export Data",
    icon: require("lucide-react").Download,
    variant: "outline",
  },
  {
    id: "settings",
    label: "Settings",
    icon: require("lucide-react").Settings,
    variant: "outline",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: require("lucide-react").Bell,
    variant: "outline",
  },
  {
    id: "profile",
    label: "Profile",
    icon: require("lucide-react").User,
    variant: "outline",
  },
];

export function QuickActions({
  actions = defaultActions,
  title = "Quick Actions",
  description = "Common dashboard actions",
  columns = 2,
}: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`grid grid-cols-${columns} gap-4`}>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant || "outline"}
                className="h-20 flex-col"
                onClick={action.onClick}
              >
                <Icon className="h-6 w-6 mb-2" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
