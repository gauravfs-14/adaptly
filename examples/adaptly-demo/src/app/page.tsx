"use client";

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardHeader, DashboardSidebar } from "@/components";
import { AdaptlyProvider, useAdaptiveUI } from "adaptly";
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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Enhanced loader component with full-page overlay and cool animations
const CustomLoader = EnhancedLoader;

// Content that goes inside the AdaptlyProvider
function AdaptiveContent() {
  const { currentLLMProvider } = useAdaptiveUI();

  return null;
}

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

  // LLM Configuration - Test different providers with persistence
  const [selectedProvider, setSelectedProvider] = useState<
    "google" | "openai" | "anthropic"
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adaptly-demo-provider");
      return (saved as "google" | "openai" | "anthropic") || "google";
    }
    return "google";
  });

  const apiKey = (() => {
    switch (selectedProvider) {
      case "google":
        return process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY || "";
      case "openai":
        return process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
      case "anthropic":
        return process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";
      default:
        return "";
    }
  })();

  const hasApiKey = apiKey.length > 0;

  const model = (() => {
    switch (selectedProvider) {
      case "google":
        return "gemini-2.0-flash-exp";
      case "openai":
        return "gpt-4";
      case "anthropic":
        return "claude-3-5-sonnet-20241022";
      default:
        return "gemini-2.0-flash-exp";
    }
  })();

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

  // Save provider selection to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("adaptly-demo-provider", selectedProvider);
    }
  }, [selectedProvider]);

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
            <div className="space-y-6 h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">Adaptive Dashboard</h2>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedProvider}
                      onValueChange={(
                        value: "google" | "openai" | "anthropic"
                      ) => setSelectedProvider(value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select LLM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Gemini</SelectItem>
                        <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                        <SelectItem value="anthropic">
                          Anthropic Claude
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Press{" "}
                  <kbd className="bg-muted px-2 py-1 rounded text-sm">⌘K</kbd>{" "}
                  to describe how you want the UI to look. Using{" "}
                  {selectedProvider === "google"
                    ? "Gemini 2.0 Flash"
                    : selectedProvider === "openai"
                    ? "GPT-4"
                    : "Claude 3.5 Sonnet"}{" "}
                  with persistent storage.
                </p>
                {!hasApiKey && (
                  <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      ⚠️ <strong>API Key Required:</strong> Set your{" "}
                      {selectedProvider.toUpperCase()} API key in environment
                      variables to use AI features.
                      <br />
                      <code className="text-xs mt-1 block">
                        NEXT_PUBLIC_{selectedProvider.toUpperCase()}
                        _API_KEY=your-key-here
                      </code>
                    </p>
                  </div>
                )}
              </div>

              {/* AdaptlyProvider with integrated content */}
              <AdaptlyProvider
                apiKey={apiKey}
                provider={selectedProvider}
                model={model}
                components={{
                  MetricCard,
                  SalesChart,
                  TeamMembers,
                  DataTable: OrdersTable,
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
                adaptlyConfig={adaptlyConfig}
                enableStorage={true}
                storageKey="adaptly-demo-ui"
                storageVersion="2.0.0"
                className="h-full"
              >
                <AdaptiveContent />
              </AdaptlyProvider>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
