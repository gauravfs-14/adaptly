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
      const storage = new StorageService({
        enabled: config.storage.enabled,
        key: config.storage.key || "adaptly-ui",
        version: config.storage.version || "1.0.0",
      });
      setStorageService(storage);

      // Try to load saved adaptation on initialization
      const savedAdaptation = storage.loadAdaptation();
      if (savedAdaptation) {
        setAdaptation(savedAdaptation);
        adaptlyLogger.info("Loaded saved UI adaptation from storage");
      }
    }
  }, [config?.storage]);

  // Configure logger
  useEffect(() => {
    if (config?.logging) {
      adaptlyLogger.setConfig(config.logging);
    }
  }, [config?.logging, config]);

  const updateAdaptation = useCallback(
    (updates: Partial<UIAdaptation>) => {
      setAdaptation((prev) => {
        const newAdaptation = { ...prev, ...updates };
        // Auto-save to storage if enabled
        if (storageService && config?.storage?.enabled) {
          storageService.saveAdaptation(newAdaptation);
        }
        return newAdaptation;
      });
    },
    [storageService, config?.storage?.enabled]
  );

  const addComponent = useCallback((component: UIComponent) => {
    setAdaptation((prev) => ({
      ...prev,
      components: [...prev.components, component],
    }));
  }, []);

  const removeComponent = useCallback((id: string) => {
    setAdaptation((prev) => ({
      ...prev,
      components: prev.components.filter((comp) => comp.id !== id),
    }));
  }, []);

  const updateComponent = useCallback(
    (id: string, updates: Partial<UIComponent>) => {
      setAdaptation((prev) => ({
        ...prev,
        components: prev.components.map((comp) =>
          comp.id === id ? { ...comp, ...updates } : comp
        ),
      }));
    },
    []
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
          setAdaptation((prev) => ({
            ...prev,
            ...result.newAdaptation,
            // Ensure components array is completely replaced, not merged
            components: result.newAdaptation?.components || [],
          }));
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
        setAdaptation(savedAdaptation);
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
