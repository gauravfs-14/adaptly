import React from "react";
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
 * Validate adaptly.json configuration - REQUIRED
 * Framework will not work without proper configuration
 */
function validateAdaptlyConfig(config: AdaptlyJsonConfig): AdaptlyJsonConfig {
  if (!config?.components || Object.keys(config.components).length === 0) {
    throw new Error(
      "adaptly.json must define at least one component in the 'components' section"
    );
  }

  // Validate each component has required fields
  Object.entries(config.components).forEach(([name, component]) => {
    if (!component.description) {
      throw new Error(`Component '${name}' must have a description`);
    }
    if (!component.props) {
      throw new Error(`Component '${name}' must have props defined`);
    }
    if (!component.useCases || !Array.isArray(component.useCases)) {
      throw new Error(`Component '${name}' must have useCases array`);
    }
    if (
      !component.space ||
      !component.space.min ||
      !component.space.max ||
      !component.space.preferred
    ) {
      throw new Error(
        `Component '${name}' must have space requirements (min, max, preferred)`
      );
    }
  });

  adaptlyLogger.info("Successfully validated adaptly.json configuration");
  return config;
}

/**
 * AdaptlyProvider - The main component for NPM package usage
 * Developers must provide their adaptly.json configuration
 */
export function AdaptlyProvider({
  apiKey,
  components,
  icons,
  model = "gemini-2.0-flash-exp",
  provider = "google",
  defaultLayout,
  className = "",
  style = {},
  // Command bar customization options
  aiSuggestions,
  showAISuggestions = true,
  showUtilityCommands = true,
  // Custom loader option
  customLoader,
  // Storage options
  enableStorage = true,
  storageKey = "adaptly-ui",
  storageVersion = "1.0.0",
  // REQUIRED: adaptly.json configuration
  adaptlyConfig,
  // Children support
  children,
}: {
  apiKey: string;
  components: Record<string, React.ComponentType<any>>;
  icons?: Record<string, React.ComponentType<any>>;
  model?: string;
  provider?: "google" | "openai" | "anthropic";
  defaultLayout?: Partial<UIAdaptation>;
  className?: string;
  style?: React.CSSProperties;
  // Command bar customization options
  aiSuggestions?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<unknown>;
    description?: string;
  }>;
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
  // Custom loader option
  customLoader?: CustomLoaderComponent;
  // Storage options
  enableStorage?: boolean;
  storageKey?: string;
  storageVersion?: string;
  // REQUIRED: adaptly.json configuration
  adaptlyConfig: AdaptlyJsonConfig;
  // Children support
  children?: React.ReactNode;
}) {
  // Validate the provided configuration
  const validatedConfig = validateAdaptlyConfig(adaptlyConfig);

  // Create the adaptly configuration
  const adaptlyConfigObj: AdaptlyConfig = {
    enableLLM: true,
    llm: {
      provider,
      apiKey,
      model,
      maxTokens: 1000,
      temperature: 0.7,
    },
    defaultLayout,
    adaptlyJson: validatedConfig, // REQUIRED - no fallback
    storage: {
      enabled: enableStorage,
      key: storageKey,
      version: storageVersion,
    },
    loadingOverlay: {
      enabled: true,
      message: "AI is generating your layout...",
      subMessage: "Creating components and arranging them for you",
      customLoader,
    },
    logging: { enabled: true, level: "info" },
  };

  return (
    <AdaptiveUIProvider config={adaptlyConfigObj}>
      <div className={`adaptly-container ${className}`} style={style}>
        <AdaptiveLayout componentRegistry={components} iconRegistry={icons} />
        <AdaptiveCommandWrapper
          aiSuggestions={aiSuggestions}
          showAISuggestions={showAISuggestions}
          showUtilityCommands={showUtilityCommands}
        />
        {children}
      </div>
    </AdaptiveUIProvider>
  );
}

/**
 * Developer usage example for NPM package:
 *
 * ```tsx
 * import { AdaptlyProvider } from '@adaptly/framework';
 * import { MyComponent, AnotherComponent } from './components';
 * import adaptlyConfig from './adaptly.json';
 *
 * function MyApp() {
 *   return (
 *     <AdaptlyProvider
 *       apiKey="your-api-key"
 *       provider="openai" // or "anthropic" or "google"
 *       model="gpt-4" // or "claude-3-sonnet" or "gemini-2.0-flash-exp"
 *       components={{ MyComponent, AnotherComponent }}
 *       adaptlyConfig={adaptlyConfig} // REQUIRED
 *       enableStorage={true} // Enable persistent storage
 *       storageKey="my-app-ui" // Custom storage key
 *       className="h-full"
 *     />
 *   );
 * }
 * ```
 */
