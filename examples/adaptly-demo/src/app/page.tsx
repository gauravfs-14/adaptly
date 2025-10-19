"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHeader, DashboardSidebar } from "@/components";
import { AdaptlyProvider } from "adaptly";
import adaptlyConfig from "../../adaptly.json";
import { MetricCard } from "@/components/MetricCard";
import { SalesChart } from "@/components/SalesChart";
import { TeamMembers } from "@/components/TeamMembers";
import { OrdersTable } from "@/components/OrdersTable";
import { EmptyCard } from "@/components/EmptyCard";
import { EnhancedLoader } from "@/components/EnhancedLoader";
import { ActivityFeed } from "@/components/ActivityFeed";
import { NotificationCenter } from "@/components/NotificationCenter";
import { WeatherWidget } from "@/components/WeatherWidget";
import { QuickStats } from "@/components/QuickStats";
import { ResourceMonitor } from "@/components/ResourceMonitor";
import {
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  Sparkles,
  Loader2,
} from "lucide-react";

// Enhanced loader component with full-page overlay and cool animations
const CustomLoader = EnhancedLoader;

// Sample data
const notificationsData = [
  {
    id: 1,
    title: "New order received",
    message: "Order #1234 has been placed",
    time: "2 minutes ago",
    type: "success",
  },
  {
    id: 2,
    title: "System maintenance",
    message: "Scheduled maintenance at 2 AM",
    time: "1 hour ago",
    type: "warning",
  },
  {
    id: 3,
    title: "Payment processed",
    message: "Payment of $1,299 has been processed",
    time: "3 hours ago",
    type: "info",
  },
];

export default function Dashboard() {
  // Theme is now managed by next-themes
  const [notifications, setNotifications] = useState(notificationsData);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isLoading, setIsLoading] = useState(false);

  // Simple Adaptly configuration
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    "";

  // Default layout with some initial components
  const defaultLayout = {
    components: [
      {
        id: "welcome-card",
        type: "EmptyCard",
        props: {
          title: "Welcome to Adaptly!",
          description:
            "Press ⌘K to describe how you want your dashboard to look. Try saying 'Create a sales dashboard' or 'Add some metrics'.",
        },
        position: { x: 0, y: 0, w: 6, h: 2 },
        visible: true,
      },
      {
        id: "sample-metric",
        type: "MetricCard",
        props: {
          title: "Total Revenue",
          value: "$45,231",
          change: "+20.1%",
          changeType: "positive",
          progress: 75,
          description: "from last month",
        },
        position: { x: 0, y: 2, w: 3, h: 1 },
        visible: true,
      },
      {
        id: "sample-users",
        type: "MetricCard",
        props: {
          title: "Active Users",
          value: "1,234",
          change: "+5.2%",
          changeType: "positive",
          progress: 60,
          description: "this week",
        },
        position: { x: 3, y: 2, w: 3, h: 1 },
        visible: true,
      },
    ],
    layout: "grid" as const,
    spacing: 6,
    columns: 6,
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Dark mode toggle is now handled by next-themes

  const handleUserAction = (action: string) => {
    console.log("User action:", action);
  };

  const handleSectionClick = (section: string, item: string) => {
    console.log("Section clicked:", section, item);
  };

  const handleOrderAction = (orderId: string, action: string) => {
    console.log("Order action:", orderId, action);
  };

  const handleExport = () => {
    console.log("Export data");
  };

  const handleFilter = () => {
    console.log("Filter orders");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <DashboardSidebar onSectionClick={handleSectionClick} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader
            notifications={notifications}
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onUserAction={handleUserAction}
          />

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto p-6">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Left Panel - Adaptive Grid */}
              <ResizablePanel defaultSize={70} minSize={50}>
                <div className="space-y-6 overflow-auto h-full">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">
                      Adaptive Dashboard
                    </h2>
                    <p className="text-muted-foreground">
                      Press{" "}
                      <kbd className="bg-muted px-2 py-1 rounded text-sm">
                        ⌘K
                      </kbd>{" "}
                      to describe how you want the UI to look
                    </p>
                  </div>

                  {/* AdaptlyProvider - NPM package approach with explicit config */}
                  <AdaptlyProvider
                    apiKey={apiKey}
                    components={{
                      MetricCard,
                      SalesChart,
                      TeamMembers,
                      DataTable: OrdersTable, // Using OrdersTable as DataTable
                      EmptyCard,
                      ActivityFeed,
                      NotificationCenter,
                      WeatherWidget,
                      QuickStats,
                      ResourceMonitor,
                    }}
                    icons={{
                      DollarSign,
                      Users,
                      ShoppingCart,
                      Activity,
                      Sparkles,
                    }}
                    defaultLayout={defaultLayout}
                    customLoader={CustomLoader}
                    adaptlyConfig={adaptlyConfig} // REQUIRED - explicit config
                    className="h-full"
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle />

              {/* Right Panel - Static Components */}
              <ResizablePanel defaultSize={30} minSize={20}>
                <div className="space-y-6 mx-4 overflow-auto h-full">
                  {/* Alerts */}
                  <Alert>
                    <Activity className="h-4 w-4" />
                    <AlertDescription>
                      Your dashboard is performing well. All systems are
                      operational and running smoothly.
                    </AlertDescription>
                  </Alert>

                  {/* Instructions */}
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-2">AI-Powered Commands:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • "Create a sales dashboard" - AI will suggest
                        components
                      </li>
                      <li>
                        • "Add a revenue chart" - AI will add appropriate charts
                      </li>
                      <li>
                        • "Show team performance" - AI will add team metrics
                      </li>
                      <li>• "Create a data table" - AI will add data tables</li>
                      <li>
                        • "Make it more compact" - AI will optimize layout
                      </li>
                      <li>• "Add more visual elements" - AI will enhance UI</li>
                      <li>• "Reset to default" - Start over</li>
                    </ul>
                    <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                      <strong>Powered by Gemini 2.0 Flash</strong> - The AI
                      understands natural language and will suggest the best
                      components for your needs.
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
