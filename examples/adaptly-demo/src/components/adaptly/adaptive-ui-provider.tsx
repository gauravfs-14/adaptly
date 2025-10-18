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
  const [llmService, setLlmService] = useState<CoreLLMService | null>(null);

  // Initialize LLM service if enabled
  useEffect(() => {
    if (config?.enableLLM && config?.llm) {
      const service = new CoreLLMService(config!.llm);
      setLlmService(service);
    }
  }, [config?.enableLLM, config?.llm]);

  // Configure logger
  useEffect(() => {
    if (config?.logging) {
      adaptlyLogger.setConfig(config.logging);
    }
  }, [config?.logging]);

  const updateAdaptation = useCallback((updates: Partial<UIAdaptation>) => {
    setAdaptation((prev) => ({ ...prev, ...updates }));
  }, []);

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
        const availableComponents = [
          "EmptyCard", // Always available as fallback
        ];

        const result = await llmService.processUserRequest(
          input,
          adaptation,
          availableSpace,
          availableComponents
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
          setLastLLMResponse(result.reasoning);
          adaptlyLogger.debug("LLM reasoning:", result.reasoning);
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
    [adaptation, llmService, parseUserInput]
  );

  const resetToDefault = useCallback(() => {
    const resetLayout = config?.defaultLayout
      ? { ...defaultAdaptation, ...config.defaultLayout }
      : defaultAdaptation;
    setAdaptation(resetLayout);
    setLastLLMResponse(undefined);
  }, [config?.defaultLayout]);

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
