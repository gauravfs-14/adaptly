"use client";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { UIAdaptation, LLMConfig, UIComponent } from "./types";
import { adaptlyLogger } from "./logger";

// Core LLM Service class for managing AI interactions
export class CoreLLMService {
  private model: unknown;
  private isInitialized: boolean = false;
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
    this.initializeModel();
  }

  private async initializeModel() {
    try {
      adaptlyLogger.info(
        "Initializing LLM with API key:",
        this.config.apiKey ? "***" + this.config.apiKey.slice(-4) : "MISSING"
      );

      // Set the API key in the environment for the Google AI SDK
      if (this.config.apiKey) {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = this.config.apiKey;
      }

      this.model = google("gemini-2.0-flash-exp");
      this.isInitialized = true;
      adaptlyLogger.info(
        "Core LLM Service initialized with",
        this.config.model
      );
    } catch (error) {
      adaptlyLogger.error("Failed to initialize Core LLM service:", error);
      this.isInitialized = false;
    }
  }

  async processUserRequest(
    userInput: string,
    currentAdaptation: UIAdaptation,
    availableSpace: { width: number; height: number },
    availableComponents?: string[],
    adaptlyConfig?: unknown
  ): Promise<{
    success: boolean;
    newAdaptation?: Partial<UIAdaptation>;
    reasoning?: string;
    error?: string;
  }> {
    if (!this.isInitialized) {
      return {
        success: false,
        error: "LLM service not initialized. Please check your API key.",
      };
    }

    try {
      // Get available components for context - REQUIRED from adaptly.json
      if (!availableComponents || availableComponents.length === 0) {
        adaptlyLogger.error("No components available for LLM processing");
        return {
          success: false,
          error: "No components defined in adaptly.json configuration",
        };
      }

      const componentList = availableComponents;

      // Build component descriptions from adaptly.json - REQUIRED
      if (
        !adaptlyConfig ||
        !(adaptlyConfig as Record<string, unknown>).components ||
        Object.keys(
          (adaptlyConfig as Record<string, unknown>).components as Record<
            string,
            unknown
          >
        ).length === 0
      ) {
        adaptlyLogger.error("No component definitions found in adaptly.json");
        return {
          success: false,
          error: "No component definitions found in adaptly.json configuration",
        };
      }

      let componentDescriptions = "";

      if (
        adaptlyConfig &&
        (adaptlyConfig as Record<string, unknown>).components
      ) {
        const components = (adaptlyConfig as Record<string, unknown>)
          .components as Record<string, unknown>;
        const descriptions = Object.entries(components)
          .filter(([name]) => componentList.includes(name))
          .map(([name, config]: [string, unknown]) => {
            const configObj = config as Record<string, unknown>;
            const props = Object.entries(
              (configObj.props as Record<string, unknown>) || {}
            )
              .map(([propName, propConfig]: [string, unknown]) => {
                const required = (propConfig as Record<string, unknown>)
                  .required
                  ? " (required)"
                  : " (optional)";
                const allowed = (propConfig as Record<string, unknown>).allowed
                  ? ` (allowed: ${(
                      (propConfig as Record<string, unknown>)
                        .allowed as unknown[]
                    ).join(", ")})`
                  : "";
                return `${propName}${required}${allowed}`;
              })
              .join(", ");

            const useCases = (configObj.useCases as string[])
              ? `\n  Use cases: ${(configObj.useCases as string[]).join(", ")}`
              : "";

            const space = configObj.space
              ? `\n  Space: min ${
                  (
                    (configObj.space as Record<string, unknown>).min as number[]
                  )[0]
                }x${
                  (
                    (configObj.space as Record<string, unknown>).min as number[]
                  )[1]
                }, max ${
                  (
                    (configObj.space as Record<string, unknown>).max as number[]
                  )[0]
                }x${
                  (
                    (configObj.space as Record<string, unknown>).max as number[]
                  )[1]
                }, preferred ${
                  (
                    (configObj.space as Record<string, unknown>)
                      .preferred as number[]
                  )[0]
                }x${
                  (
                    (configObj.space as Record<string, unknown>)
                      .preferred as number[]
                  )[1]
                }`
              : "";

            return `- ${name}: ${
              configObj.description as string
            }. Props: ${props}${useCases}${space}`;
          });

        if (descriptions.length > 0) {
          componentDescriptions = descriptions.join("\n");
        }
      }

      const result = await generateText({
        model: this.model as unknown as string, // AI model type
        prompt: `You are an AI assistant that creates COMPLETE dynamic UI layouts based on user descriptions. You will generate a full UI layout that replaces any existing content.

AVAILABLE COMPONENTS:
${componentList.map((comp) => `- ${comp}`).join("\n")}

COMPONENT DESCRIPTIONS:
${componentDescriptions}

CURRENT LAYOUT STATE:
- Components: ${currentAdaptation.components.length}
- Layout type: ${currentAdaptation.layout}
- Grid columns: ${currentAdaptation.columns}
- Available space: ${availableSpace.width}x${availableSpace.height}

USER REQUEST: "${userInput}"

INSTRUCTIONS:
1. Generate a COMPLETE UI layout that replaces all existing content
2. Select appropriate components from the available list
3. If no specific component matches the request, use the first available component as a fallback
4. Focus on DATA and LAYOUT configuration, not UI structure
5. Generate realistic data props (titles, values, descriptions, metrics)
6. Arrange components in a logical, visually appealing grid layout
7. Consider the available space and create a balanced layout
8. For fallback components: Use when the request is unclear, too vague, or doesn't match any specific component

IMPORTANT PROPS GUIDELINES:
- Use STRING values for: title, description, value, change
- Use NUMERIC values for: progress, columns, spacing
- Use BOOLEAN values for: visible
- AVOID complex objects like {label, onClick} - keep props simple
- Focus on data display, not interactive elements
- DO NOT specify icons - components will choose their own icons

RESPOND WITH JSON:
{
  "action": "add",
  "components": [
    {
      "id": "unique-id",
      "type": "ComponentName",
      "props": { /* realistic, beautiful props using examples from adaptly.json */ },
      "position": { "x": 0, "y": 0, "w": 2, "h": 1 },
      "visible": true
    }
  ],
  "layout": {
    "type": "grid",
    "spacing": 6,
    "columns": 6
  },
  "reasoning": "Explanation of your UI design decisions"
}

IMPORTANT: Always use "action": "add" to generate a complete new UI layout. Focus on DATA and METRICS, not interactive elements.

GOOD PROPS EXAMPLES:
- Component with metrics: {title: "Key Metric", value: "$45,231", change: "+20.1%", changeType: "positive", progress: 75}
- Fallback component: {title: "Data Analysis", description: "View detailed metrics and trends"}

AVOID THESE PROPS:
- Complex objects: {label: "Click me", onClick: "navigate()"}
- Interactive elements: buttons, forms, navigation
- UI structure: layouts, styling, behavior

EXAMPLES OF WHEN TO USE FALLBACK COMPONENTS:
- User says "I don't know what I want" → Use first available component with "Choose what to create"
- User says "Show me something" → Use first available component with "Describe what you'd like to see"
- User says "Add a placeholder" → Use first available component with appropriate placeholder content
- User says "Create a custom widget" → Use first available component with "Custom widget placeholder"
- User says "I want something different" → Use first available component with "Describe your vision"`,
      });

      adaptlyLogger.debug("LLM Response:", result.text);

      try {
        // Try to parse the JSON response
        const responseMatch = result.text.match(/\{[\s\S]*\}/);
        if (responseMatch) {
          const parsedResponse = JSON.parse(responseMatch[0]);

          // Debug: Log what we're getting from the LLM
          if (process.env.NODE_ENV === "development") {
            console.log("LLM parsed response:", parsedResponse);
            console.log("LLM reasoning field:", parsedResponse.reasoning);
            console.log("LLM reasoning type:", typeof parsedResponse.reasoning);
            console.log("LLM components:", parsedResponse.components);

            // Check for problematic objects in components
            if (parsedResponse.components) {
              parsedResponse.components.forEach(
                (comp: unknown, index: number) => {
                  const compObj = comp as Record<string, unknown>;
                  console.log(`Component ${index} (${compObj.type}):`, comp);
                  if (compObj.props) {
                    Object.entries(
                      compObj.props as Record<string, unknown>
                    ).forEach(([key, value]) => {
                      if (
                        typeof value === "object" &&
                        value !== null &&
                        !Array.isArray(value)
                      ) {
                        console.warn(
                          `Component ${index} prop "${key}" is object:`,
                          value
                        );
                      }
                    });
                  }
                }
              );
            }
          }

          return {
            success: true,
            newAdaptation: this.processLLMResponse(
              parsedResponse,
              currentAdaptation
            ),
            reasoning:
              typeof (parsedResponse.reasoning || result.text) === "string"
                ? parsedResponse.reasoning || result.text
                : JSON.stringify(parsedResponse.reasoning || result.text),
          };
        }
      } catch (parseError) {
        adaptlyLogger.warn("Failed to parse LLM JSON response:", parseError);
      }

      return {
        success: true,
        reasoning:
          typeof result.text === "string"
            ? result.text
            : JSON.stringify(result.text),
      };
    } catch (error) {
      adaptlyLogger.error("Error processing user request:", error);
      return {
        success: false,
        error: `Failed to process request: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  private processLLMResponse(
    response: unknown,
    currentAdaptation: UIAdaptation
  ): Partial<UIAdaptation> {
    const updates: Partial<UIAdaptation> = {};

    const responseObj = response as Record<string, unknown>;
    if (responseObj.action === "add" && responseObj.components) {
      // For dynamic UI generation, replace all components with new ones
      updates.components = responseObj.components as UIComponent[];
    } else if (responseObj.action === "remove" && responseObj.components) {
      const componentIds = (responseObj.components as unknown[]).map(
        (c: unknown) => (c as Record<string, unknown>).id
      );
      updates.components = currentAdaptation.components.filter(
        (c) => !componentIds.includes(c.id)
      );
    } else if (responseObj.action === "update" && responseObj.components) {
      const updatedComponents = [...currentAdaptation.components];
      (responseObj.components as unknown[]).forEach((newComponent: unknown) => {
        const newCompObj = newComponent as Record<string, unknown>;
        const index = updatedComponents.findIndex(
          (c) => c.id === newCompObj.id
        );
        if (index >= 0) {
          updatedComponents[index] = {
            ...updatedComponents[index],
            ...newCompObj,
          } as UIComponent;
        }
      });
      updates.components = updatedComponents;
    } else if (responseObj.action === "reorganize" && responseObj.components) {
      updates.components = responseObj.components as UIComponent[];
    } else if (responseObj.action === "reset") {
      updates.components = [];
    }

    if (responseObj.layout) {
      const layoutObj = responseObj.layout as Record<string, unknown>;
      updates.layout = layoutObj.type as "grid" | "flex" | "absolute";
      if (layoutObj.spacing !== undefined)
        updates.spacing = layoutObj.spacing as number;
      if (layoutObj.columns !== undefined)
        updates.columns = layoutObj.columns as number;
    }

    return updates;
  }

  async getComponentSuggestions() {
    if (!this.isInitialized) {
      return { success: false, error: "LLM service not initialized" };
    }
  }

  async analyzeLayout(currentLayout: UIAdaptation, userGoals: string) {
    if (!this.isInitialized) {
      return { success: false, error: "LLM service not initialized" };
    }

    try {
      const result = await generateText({
        model: this.model as unknown as string, // AI model type
        prompt: `Analyze the current layout and provide optimization suggestions based on user goals: "${userGoals}"

Current layout:
- Components: ${currentLayout.components.length}
- Layout type: ${currentLayout.layout}
- Grid columns: ${currentLayout.columns}
- Spacing: ${currentLayout.spacing}

Provide suggestions for improvement.`,
      });

      return {
        success: true,
        analysis: {
          efficiency: "good",
          suggestions: [
            "Consider grouping related components together",
            "Optimize grid space utilization",
            "Ensure responsive design principles",
          ],
          recommendations: [
            "Add more visual hierarchy",
            "Improve component spacing",
            "Consider different layout types",
          ],
          llmResponse: result.text,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to analyze layout: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }
}
