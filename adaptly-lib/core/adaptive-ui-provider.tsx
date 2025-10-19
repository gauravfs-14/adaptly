"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { UIComponent, UIAdaptation, AdaptlyConfig } from "./types";

// Export types for external use
export type { UIComponent, UIAdaptation };
import { CoreLLMService } from "./llm-service";
import { EnhancedLLMService } from "./enhanced-llm-service";
import { StorageService } from "./storage-service";
import { LoadingOverlay } from "./loading-overlay";
import { adaptlyLogger } from "./logger";

interface AdaptiveUIContextType {
  adaptation: UIAdaptation;
  updateAdaptation: (adaptation: Partial<UIAdaptation>) => void;
  addComponent: (component: UIComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<UIComponent>) => void;
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing: boolean;
  lastLLMResponse?: string;
  config?: AdaptlyConfig;
  // Storage methods
  saveToStorage: () => boolean;
  loadFromStorage: () => UIAdaptation | null;
  clearStorage: () => boolean;
  hasStoredData: () => boolean;
  // LLM provider info
  currentLLMProvider?: string;
}

const AdaptiveUIContext = createContext<AdaptiveUIContextType | undefined>(
  undefined
);

// Default adaptation
const defaultAdaptation: UIAdaptation = {
  components: [],
  layout: "grid",
  spacing: 6,
  columns: 6,
};

export function AdaptiveUIProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: AdaptlyConfig;
}) {
  const [adaptation, setAdaptation] = useState<UIAdaptation>(
    config?.defaultLayout
      ? { ...defaultAdaptation, ...config.defaultLayout }
      : defaultAdaptation
  );
  const [isLLMProcessing, setIsLLMProcessing] = useState(false);
  const [lastLLMResponse, setLastLLMResponse] = useState<string | undefined>();
  const [llmService, setLlmService] = useState<
    CoreLLMService | EnhancedLLMService | null
  >(null);
  const [storageService, setStorageService] = useState<StorageService | null>(
    null
  );

  // Initialize LLM service if enabled
  useEffect(() => {
    if (config?.enableLLM && config?.llm) {
      // Use enhanced LLM service for new providers, fallback to core for google
      if (config.llm.provider === "google") {
        const service = new CoreLLMService(config.llm);
        setLlmService(service);
      } else {
        const service = new EnhancedLLMService(config.llm);
        setLlmService(service);
      }
    }
  }, [config?.enableLLM, config?.llm, config]);

  // Initialize storage service if enabled
  useEffect(() => {
    if (config?.storage?.enabled) {
      adaptlyLogger.debug(
        "Initializing storage service with config:",
        config.storage
      );
      const storage = new StorageService({
        enabled: config.storage.enabled,
        key: config.storage.key || "adaptly-ui",
        version: config.storage.version || "1.0.0",
      });
      setStorageService(storage);

      // Try to load saved adaptation on initialization
      const savedAdaptation = storage.loadAdaptation();
      if (savedAdaptation) {
        adaptlyLogger.info("Loaded saved UI adaptation from storage");
        setAdaptation(savedAdaptation);
      } else {
        adaptlyLogger.debug("No saved adaptation found");
      }
    } else {
      adaptlyLogger.debug("Storage disabled in config");
    }
  }, [config?.storage]);

  // Configure logger
  useEffect(() => {
    if (config?.logging) {
      adaptlyLogger.setConfig(config.logging);
    }
  }, [config?.logging, config]);

  // Validate and filter components to remove invalid ones
  const validateComponents = useCallback(
    (components: UIComponent[]): UIComponent[] => {
      return components.filter((component) => {
        // Check if component has required fields
        if (!component.id || !component.type) {
          adaptlyLogger.warn(
            "Filtering out component with missing id or type:",
            component
          );
          return false;
        }

        // Check if component type is valid (exists in registry)
        if (
          config?.adaptlyJson?.components &&
          !config.adaptlyJson.components[component.type]
        ) {
          adaptlyLogger.warn(
            "Filtering out component with invalid type:",
            component.type
          );
          return false;
        }

        // Validate component props against adaptly.json schema
        const componentSchema =
          config?.adaptlyJson?.components?.[component.type];
        if (componentSchema) {
          const props = component.props || {};
          const schemaProps = componentSchema.props || {};

          // Check required props
          for (const [propName, propConfig] of Object.entries(schemaProps)) {
            const prop = propConfig as any;
            if (prop.required && !props[propName]) {
              adaptlyLogger.warn(
                `Filtering out component missing required prop '${propName}':`,
                component
              );
              return false;
            }
          }

          // Validate prop types and allowed values
          for (const [propName, propValue] of Object.entries(props)) {
            const propConfig = schemaProps[propName] as any;
            if (propConfig) {
              // Type validation
              if (
                propConfig.type === "string" &&
                typeof propValue !== "string"
              ) {
                adaptlyLogger.warn(
                  `Filtering out component with invalid prop type for '${propName}':`,
                  component
                );
                return false;
              }
              if (
                propConfig.type === "number" &&
                typeof propValue !== "number"
              ) {
                adaptlyLogger.warn(
                  `Filtering out component with invalid prop type for '${propName}':`,
                  component
                );
                return false;
              }
              if (
                propConfig.type === "boolean" &&
                typeof propValue !== "boolean"
              ) {
                adaptlyLogger.warn(
                  `Filtering out component with invalid prop type for '${propName}':`,
                  component
                );
                return false;
              }
              if (propConfig.type === "array" && !Array.isArray(propValue)) {
                adaptlyLogger.warn(
                  `Filtering out component with invalid prop type for '${propName}':`,
                  component
                );
                return false;
              }
              if (
                propConfig.type === "object" &&
                (typeof propValue !== "object" || Array.isArray(propValue))
              ) {
                adaptlyLogger.warn(
                  `Filtering out component with invalid prop type for '${propName}':`,
                  component
                );
                return false;
              }

              // Allowed values validation
              if (
                propConfig.allowed &&
                !propConfig.allowed.includes(propValue)
              ) {
                adaptlyLogger.warn(
                  `Filtering out component with invalid prop value for '${propName}':`,
                  component
                );
                return false;
              }
            }
          }
        }

        // Check for empty or invalid props that would render empty cards
        if (component.type === "EmptyCard" || component.type === "MetricCard") {
          const props = component.props || {};

          // Filter out components with empty or meaningless content
          if (component.type === "EmptyCard") {
            const title = (props.title as string) || "";
            const description = (props.description as string) || "";

            // Filter out empty cards with generic or empty content
            if (
              !title.trim() ||
              title.toLowerCase().includes("key metrics") ||
              title.toLowerCase().includes("summary") ||
              title.toLowerCase().includes("overview") ||
              description.toLowerCase().includes("summary of") ||
              description.toLowerCase().includes("performance indicators")
            ) {
              adaptlyLogger.warn(
                "Filtering out empty card with generic content:",
                component
              );
              return false;
            }
          }

          // Filter out MetricCard with empty or invalid data
          if (component.type === "MetricCard") {
            const value = (props.value as string) || "";
            const title = (props.title as string) || "";

            if (
              !value.trim() ||
              !title.trim() ||
              value === "$0" ||
              value === "0" ||
              value === "N/A" ||
              title.toLowerCase().includes("key metrics") ||
              title.toLowerCase().includes("summary")
            ) {
              adaptlyLogger.warn(
                "Filtering out metric card with empty or invalid data:",
                component
              );
              return false;
            }
          }
        }

        return true;
      });
    },
    [config?.adaptlyJson?.components]
  );

  const updateAdaptation = useCallback(
    (updates: Partial<UIAdaptation>) => {
      setAdaptation((prev) => {
        const newAdaptation = { ...prev, ...updates };
        // Auto-save to storage if enabled
        if (storageService && config?.storage?.enabled) {
          adaptlyLogger.debug("Saving adaptation to storage:", newAdaptation);
          storageService.saveAdaptation(newAdaptation);
        } else {
          adaptlyLogger.debug("Storage not available or disabled");
        }
        return newAdaptation;
      });
    },
    [storageService, config?.storage?.enabled]
  );

  const addComponent = useCallback(
    (component: UIComponent) => {
      // Validate component before adding
      const validatedComponents = validateComponents([component]);
      if (validatedComponents.length === 0) {
        adaptlyLogger.warn(
          "Component failed validation and was not added:",
          component
        );
        return;
      }

      setAdaptation((prev) => {
        const newAdaptation = {
          ...prev,
          components: [...prev.components, ...validatedComponents],
        };
        // Auto-save to storage if enabled
        if (storageService && config?.storage?.enabled) {
          adaptlyLogger.debug(
            "Saving adaptation after adding component:",
            newAdaptation
          );
          storageService.saveAdaptation(newAdaptation);
        }
        return newAdaptation;
      });
    },
    [storageService, config?.storage?.enabled, validateComponents]
  );

  const removeComponent = useCallback(
    (id: string) => {
      setAdaptation((prev) => {
        const newAdaptation = {
          ...prev,
          components: prev.components.filter((comp) => comp.id !== id),
        };
        // Auto-save to storage if enabled
        if (storageService && config?.storage?.enabled) {
          adaptlyLogger.debug(
            "Saving adaptation after removing component:",
            newAdaptation
          );
          storageService.saveAdaptation(newAdaptation);
        }
        return newAdaptation;
      });
    },
    [storageService, config?.storage?.enabled]
  );

  const updateComponent = useCallback(
    (id: string, updates: Partial<UIComponent>) => {
      setAdaptation((prev) => {
        const updatedComponents = prev.components.map((comp) =>
          comp.id === id ? { ...comp, ...updates } : comp
        );

        // Validate all components after update
        const validatedComponents = validateComponents(updatedComponents);

        const newAdaptation = {
          ...prev,
          components: validatedComponents,
        };
        // Auto-save to storage if enabled
        if (storageService && config?.storage?.enabled) {
          adaptlyLogger.debug(
            "Saving adaptation after updating component:",
            newAdaptation
          );
          storageService.saveAdaptation(newAdaptation);
        }
        return newAdaptation;
      });
    },
    [storageService, config?.storage?.enabled, validateComponents]
  );

  // Basic parsing without LLM (fallback)
  const parseUserInput = useCallback(
    (input: string) => {
      const lowerInput = input.toLowerCase();
      adaptlyLogger.debug("Processing command (fallback):", input);

      // Basic command handling
      if (lowerInput.includes("reset") || lowerInput.includes("default")) {
        setAdaptation(defaultAdaptation);
      }

      if (lowerInput.includes("grid layout") || lowerInput.includes("grid")) {
        updateAdaptation({ layout: "grid" });
      }

      if (lowerInput.includes("flex layout") || lowerInput.includes("flex")) {
        updateAdaptation({ layout: "flex" });
      }
    },
    [updateAdaptation]
  );

  // LLM-powered parsing
  const parseUserInputWithLLM = useCallback(
    async (input: string) => {
      if (!llmService) {
        adaptlyLogger.warn(
          "LLM service not available, falling back to basic parsing"
        );
        parseUserInput(input);
        return;
      }

      setIsLLMProcessing(true);
      setLastLLMResponse(undefined);

      try {
        adaptlyLogger.info("Processing user input with LLM:", input);

        const availableSpace = { width: adaptation.columns, height: 6 };
        // Get available components from adaptly.json configuration - REQUIRED
        if (
          !config?.adaptlyJson?.components ||
          Object.keys(config.adaptlyJson.components).length === 0
        ) {
          adaptlyLogger.error(
            "No components defined in adaptly.json configuration"
          );
          setLastLLMResponse(
            "Error: No components defined in adaptly.json. Please configure your components."
          );
          return;
        }

        const availableComponents = Object.keys(config.adaptlyJson.components);

        const result = await llmService.processUserRequest(
          input,
          adaptation,
          availableSpace,
          availableComponents,
          config?.adaptlyJson
        );

        if (result.success && result.newAdaptation) {
          adaptlyLogger.debug(
            "LLM suggested adaptation:",
            result.newAdaptation
          );
          // Replace the entire adaptation with LLM-generated content
          setAdaptation((prev) => {
            const rawComponents = result.newAdaptation?.components || [];
            const validatedComponents = validateComponents(rawComponents);

            adaptlyLogger.debug(
              `LLM generated ${rawComponents.length} components, ${validatedComponents.length} passed validation`
            );

            const newAdaptation = {
              ...prev,
              ...result.newAdaptation,
              // Use validated components instead of raw ones
              components: validatedComponents,
            };
            // Auto-save to storage if enabled
            if (storageService && config?.storage?.enabled) {
              adaptlyLogger.debug(
                "Saving adaptation after LLM processing:",
                newAdaptation
              );
              storageService.saveAdaptation(newAdaptation);
            }
            return newAdaptation;
          });
        }

        if (result.reasoning) {
          // Ensure reasoning is always a string
          let reasoningText;
          if (typeof result.reasoning === "string") {
            reasoningText = result.reasoning;
          } else if (
            typeof result.reasoning === "object" &&
            result.reasoning !== null
          ) {
            // Handle objects that might have label/onClick properties
            if (
              (result.reasoning as Record<string, unknown>).label &&
              typeof (result.reasoning as Record<string, unknown>).label ===
                "string"
            ) {
              reasoningText = (result.reasoning as Record<string, unknown>)
                .label as string;
            } else {
              reasoningText = JSON.stringify(result.reasoning);
            }
          } else {
            reasoningText = String(result.reasoning);
          }

          setLastLLMResponse(reasoningText);
          adaptlyLogger.debug("LLM reasoning:", reasoningText);

          // Debug: Log the original reasoning to see what we're getting
          if (process.env.NODE_ENV === "development") {
            console.log("Original LLM reasoning:", result.reasoning);
            console.log("Type of reasoning:", typeof result.reasoning);
            console.log("Processed reasoning:", reasoningText);
          }
        }

        if (result.error) {
          adaptlyLogger.error("LLM processing error:", result.error);
          setLastLLMResponse(`Error: ${result.error}`);
        }
      } catch (error) {
        adaptlyLogger.error("Error in LLM processing:", error);
        setLastLLMResponse(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setIsLLMProcessing(false);
      }
    },
    [adaptation, llmService, parseUserInput, config]
  );

  const resetToDefault = useCallback(() => {
    const resetLayout = config?.defaultLayout
      ? { ...defaultAdaptation, ...config.defaultLayout }
      : defaultAdaptation;
    setAdaptation(resetLayout);
    setLastLLMResponse(undefined);
    // Clear storage when resetting
    if (storageService) {
      storageService.clearStorage();
    }
  }, [config?.defaultLayout, storageService]);

  // Storage methods
  const saveToStorage = useCallback(() => {
    if (storageService) {
      return storageService.saveAdaptation(adaptation);
    }
    return false;
  }, [storageService, adaptation]);

  const loadFromStorage = useCallback(() => {
    if (storageService) {
      const savedAdaptation = storageService.loadAdaptation();
      if (savedAdaptation) {
        // Don't trigger storage save when loading from storage
        setAdaptation(savedAdaptation);
        adaptlyLogger.debug("Loaded adaptation from storage:", savedAdaptation);
      }
      return savedAdaptation;
    }
    return null;
  }, [storageService]);

  const clearStorage = useCallback(() => {
    if (storageService) {
      return storageService.clearStorage();
    }
    return false;
  }, [storageService]);

  const hasStoredData = useCallback(() => {
    if (storageService) {
      return storageService.hasStoredAdaptation();
    }
    return false;
  }, [storageService]);

  // Get current LLM provider
  const getCurrentLLMProvider = useCallback(() => {
    if (llmService instanceof EnhancedLLMService) {
      return llmService.getProvider();
    } else if (llmService instanceof CoreLLMService) {
      return "google";
    }
    return undefined;
  }, [llmService]);

  const value: AdaptiveUIContextType = {
    adaptation,
    updateAdaptation,
    addComponent,
    removeComponent,
    updateComponent,
    parseUserInput,
    parseUserInputWithLLM,
    resetToDefault,
    isLLMProcessing,
    lastLLMResponse,
    config,
    // Storage methods
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
    // LLM provider info
    currentLLMProvider: getCurrentLLMProvider(),
  };

  return (
    <AdaptiveUIContext.Provider value={value}>
      {children}
      {config?.loadingOverlay?.enabled !== false && (
        <>
          {config?.loadingOverlay?.customLoader ? (
            <config.loadingOverlay.customLoader
              isVisible={isLLMProcessing}
              message={
                config?.loadingOverlay?.message ||
                "AI is generating your layout..."
              }
              subMessage={
                config?.loadingOverlay?.subMessage ||
                "Creating components and arranging them for you"
              }
            />
          ) : (
            <LoadingOverlay
              isVisible={isLLMProcessing}
              message={
                config?.loadingOverlay?.message ||
                "AI is generating your layout..."
              }
              subMessage={
                config?.loadingOverlay?.subMessage ||
                "Creating components and arranging them for you"
              }
            />
          )}
        </>
      )}
    </AdaptiveUIContext.Provider>
  );
}

export function useAdaptiveUI() {
  const context = useContext(AdaptiveUIContext);
  if (context === undefined) {
    throw new Error("useAdaptiveUI must be used within an AdaptiveUIProvider");
  }
  return context;
}
