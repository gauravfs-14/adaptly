import React, { useEffect, useState } from "react";
import { AdaptiveUIProvider } from "./adaptive-ui-provider";
import { AdaptiveLayout } from "./adaptive-grid";
import { AdaptiveCommandWrapper } from "./adaptive-command";
import { adaptlyLogger } from "./logger";
import {
  AdaptlyConfig,
  AdaptlyJsonConfig,
  UIAdaptation,
  CustomLoaderComponent,
} from "./types";

/**
 * Load adaptly.json configuration
 */
async function loadAdaptlyConfig(): Promise<AdaptlyJsonConfig | null> {
  try {
    adaptlyLogger.info("Loading adaptly.json configuration...");

    // Return a minimal default configuration
    // In a real implementation, this would load from the project root
    const defaultConfig: AdaptlyJsonConfig = {
      version: "1.0.0",
      description: "Default Adaptly configuration",
      components: {},
      layout: {
        grid: {
          columns: 6,
          spacing: 6,
          responsive: {
            mobile: {
              columns: 1,
            },
            tablet: {
              columns: 2,
            },
            desktop: {
              columns: 6,
            },
          },
        },
      },
    };

    return defaultConfig;
  } catch (error) {
    adaptlyLogger.error("Error loading adaptly.json:", error);
    return null;
  }
}

/**
 * Adaptly component that automatically loads configuration from adaptly.json
 * This is the main component developers will use
 */
export function AdaptlyFromConfig({
  apiKey,
  components,
  icons,
  model = "gemini-2.0-flash-exp",
  defaultLayout,
  className = "",
  style = {},
  // Command bar customization options
  aiSuggestions,
  showAISuggestions = true,
  showUtilityCommands = true,
  // Custom loader option
  customLoader,
}: {
  apiKey: string;
  components: Record<string, React.ComponentType<any>>;
  icons?: Record<string, React.ComponentType<any>>;
  model?: string;
  defaultLayout?: Partial<UIAdaptation>;
  className?: string;
  style?: React.CSSProperties;
  // Command bar customization options
  aiSuggestions?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<any>;
    description?: string;
  }>;
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
  // Custom loader option
  customLoader?: CustomLoaderComponent;
}) {
  const [adaptlyJsonConfig, setAdaptlyJsonConfig] =
    useState<AdaptlyJsonConfig | null>(null);
  const [componentRegistry, setComponentRegistry] = useState<
    Record<string, any>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const adaptlyConfig = await loadAdaptlyConfig();
        if (adaptlyConfig) {
          setAdaptlyJsonConfig(adaptlyConfig);
          setComponentRegistry(adaptlyConfig.components || {});
        }
      } catch (error) {
        adaptlyLogger.error("Error loading configuration:", error);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading Adaptly...</p>
        </div>
      </div>
    );
  }

  // Create the adaptly configuration
  const adaptlyConfig: AdaptlyConfig = {
    enableLLM: true,
    llm: { apiKey, model, maxTokens: 1000, temperature: 0.7 },
    defaultLayout,
    loadingOverlay: {
      enabled: true,
      message: "AI is generating your layout...",
      subMessage: "Creating components and arranging them for you",
      customLoader,
    },
    logging: { enabled: true, level: "info" },
  };

  return (
    <AdaptiveUIProvider config={adaptlyConfig}>
      <div className={`adaptly-container ${className}`} style={style}>
        <AdaptiveLayout componentRegistry={components} iconRegistry={icons} />
        <AdaptiveCommandWrapper
          aiSuggestions={aiSuggestions}
          showAISuggestions={showAISuggestions}
          showUtilityCommands={showUtilityCommands}
        />
      </div>
    </AdaptiveUIProvider>
  );
}

/**
 * Developer usage example:
 *
 * ```tsx
 * import { AdaptlyFromConfig } from '@/components/adaptly';
 * import { MyComponent, AnotherComponent } from './components';
 * import { CustomIcon, AnotherIcon } from 'lucide-react';
 *
 * function MyApp() {
 *   return (
 *     <AdaptlyFromConfig
 *       apiKey="your-api-key"
 *       components={{ MyComponent, AnotherComponent }}
 *       icons={{ CustomIcon, AnotherIcon }} // Optional: custom icons
 *       defaultLayout={myLayout} // Optional: initial layout
 *       className="h-full"
 *     />
 *   );
 * }
 * ```
 */
