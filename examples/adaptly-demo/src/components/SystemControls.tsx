import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface SystemControlsProps {
  title?: string;
  description?: string;
  darkMode?: boolean;
  onDarkModeChange?: (enabled: boolean) => void;
  notifications?: boolean;
  onNotificationsChange?: (enabled: boolean) => void;
  autoRefresh?: boolean;
  onAutoRefreshChange?: (enabled: boolean) => void;
  refreshRate?: number[];
  onRefreshRateChange?: (rate: number[]) => void;
  showRefreshRate?: boolean;
}

export function SystemControls({
  title = "System Controls",
  description = "Manage system settings",
  darkMode = false,
  onDarkModeChange,
  notifications = true,
  onNotificationsChange,
  autoRefresh = false,
  onAutoRefreshChange,
  refreshRate = [50],
  onRefreshRateChange,
  showRefreshRate = true,
}: SystemControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={onDarkModeChange} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Notifications</span>
            <Switch
              checked={notifications}
              onCheckedChange={onNotificationsChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Auto Refresh</span>
            <Switch
              checked={autoRefresh}
              onCheckedChange={onAutoRefreshChange}
            />
          </div>
        </div>

        {showRefreshRate && (
          <>
            <Separator />
            <div className="space-y-2">
              <label className="text-sm font-medium">Refresh Rate</label>
              <Slider
                value={refreshRate}
                onValueChange={onRefreshRateChange}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {refreshRate[0]} seconds
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
