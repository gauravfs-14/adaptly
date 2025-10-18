import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Bell, User, LogOut, RefreshCw } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

interface DashboardHeaderProps {
  title?: string;
  notifications?: Notification[];
  isDarkMode?: boolean;
  onDarkModeToggle?: () => void;
  isLoading?: boolean;
  onRefresh?: () => void;
  onUserAction?: (action: string) => void;
  searchPlaceholder?: string;
  searchSuggestions?: string[];
}

export function DashboardHeader({
  title = "Dashboard",
  notifications = [],
  isDarkMode = false,
  onDarkModeToggle,
  isLoading = false,
  onRefresh,
  onUserAction,
  searchPlaceholder = "Search...",
  searchSuggestions = ["Analytics", "Users", "Orders"],
}: DashboardHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Refresh */}
          <Button variant="outline" size="icon" onClick={onRefresh}>
            {isLoading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <Separator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex-col items-start p-3"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {notification.message}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUserAction?.("profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserAction?.("settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUserAction?.("logout")}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
