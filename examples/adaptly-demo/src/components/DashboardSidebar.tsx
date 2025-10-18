import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Home,
  Users,
  ShoppingCart,
  Database,
  Server,
  Shield,
  Settings,
  Activity,
  Bell,
  Cloud,
} from "lucide-react";

interface SidebarSection {
  label: string;
  items: {
    id: string;
    label: string;
    icon: any;
    onClick?: () => void;
  }[];
}

interface DashboardSidebarProps {
  title?: string;
  sections?: SidebarSection[];
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onSectionClick?: (sectionId: string, itemId: string) => void;
}

const defaultSections: SidebarSection[] = [
  {
    label: "Dashboard",
    items: [
      { id: "overview", label: "Overview", icon: Home },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "users", label: "Users", icon: Users },
      { id: "orders", label: "Orders", icon: ShoppingCart },
    ],
  },
  {
    label: "Tools",
    items: [
      { id: "database", label: "Database", icon: Database },
      { id: "server", label: "Server", icon: Server },
      { id: "security", label: "Security", icon: Shield },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { id: "performance", label: "Performance", icon: Activity },
      { id: "alerts", label: "Alerts", icon: Bell },
      { id: "cloud", label: "Cloud", icon: Cloud },
    ],
  },
];

const defaultUser = {
  name: "John Doe",
  role: "Admin",
  avatar: "/avatars/user.jpg",
};

export function DashboardSidebar({
  title = "Adaptly",
  sections = defaultSections,
  user = defaultUser,
  onSectionClick,
}: DashboardSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <span className="font-bold">{title}</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {sections.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionClick?.(section.label, item.id)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
