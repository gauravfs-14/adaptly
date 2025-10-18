"use client";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { UIComponent, UIAdaptation, LLMConfig } from "./types";
import { adaptlyLogger } from "./logger";

// Core LLM Service class for managing AI interactions
export class CoreLLMService {
  private model: any;
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
    availableComponents?: string[]
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
      // Get available components for context
      const componentList = availableComponents || [
        "EmptyCard", // Always available as fallback
      ];

      const result = await generateText({
        model: this.model,
        prompt: `You are an AI assistant that creates COMPLETE dynamic UI layouts based on user descriptions. You will generate a full UI layout that replaces any existing content.

AVAILABLE COMPONENTS:
${componentList.map((comp) => `- ${comp}`).join("\n")}

COMPONENT DESCRIPTIONS:
- EmptyCard: A placeholder card for empty states or when no specific component matches. Props: title, description, icon, action

CURRENT LAYOUT STATE:
- Components: ${currentAdaptation.components.length}
- Layout type: ${currentAdaptation.layout}
- Grid columns: ${currentAdaptation.columns}
- Available space: ${availableSpace.width}x${availableSpace.height}

USER REQUEST: "${userInput}"

INSTRUCTIONS:
1. Generate a COMPLETE UI layout that replaces all existing content
2. Select appropriate components from the available list
3. If no specific component matches the request, use EmptyCard as a fallback
4. Generate realistic, beautiful props for each component using the examples provided
5. Arrange components in a logical, visually appealing grid layout
6. Consider the available space and create a balanced layout
7. For EmptyCard: Use when the request is unclear, too vague, or doesn't match any specific component

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

IMPORTANT: Always use "action": "add" to generate a complete new UI layout. Generate beautiful, realistic props that make the UI look professional and polished. Use the examples and descriptions from adaptly.json to create appropriate props.

EXAMPLES OF WHEN TO USE EmptyCard:
- User says "I don't know what I want" → EmptyCard with "Choose what to create"
- User says "Show me something" → EmptyCard with "Describe what you'd like to see"
- User says "Add a placeholder" → EmptyCard with appropriate placeholder content
- User says "Create a custom widget" → EmptyCard with "Custom widget placeholder"
- User says "I want something different" → EmptyCard with "Describe your vision"`,
      });

      adaptlyLogger.debug("LLM Response:", result.text);

      try {
        // Try to parse the JSON response
        const responseMatch = result.text.match(/\{[\s\S]*\}/);
        if (responseMatch) {
          const parsedResponse = JSON.parse(responseMatch[0]);
          return {
            success: true,
            newAdaptation: this.processLLMResponse(
              parsedResponse,
              currentAdaptation
            ),
            reasoning: parsedResponse.reasoning || result.text,
          };
        }
      } catch (parseError) {
        adaptlyLogger.warn("Failed to parse LLM JSON response:", parseError);
      }

      return {
        success: true,
        reasoning: result.text,
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
    response: any,
    currentAdaptation: UIAdaptation
  ): Partial<UIAdaptation> {
    const updates: Partial<UIAdaptation> = {};

    if (response.action === "add" && response.components) {
      // For dynamic UI generation, replace all components with new ones
      updates.components = response.components;
    } else if (response.action === "remove" && response.components) {
      const componentIds = response.components.map((c: any) => c.id);
      updates.components = currentAdaptation.components.filter(
        (c) => !componentIds.includes(c.id)
      );
    } else if (response.action === "update" && response.components) {
      const updatedComponents = [...currentAdaptation.components];
      response.components.forEach((newComponent: any) => {
        const index = updatedComponents.findIndex(
          (c) => c.id === newComponent.id
        );
        if (index >= 0) {
          updatedComponents[index] = {
            ...updatedComponents[index],
            ...newComponent,
          };
        }
      });
      updates.components = updatedComponents;
    } else if (response.action === "reorganize" && response.components) {
      updates.components = response.components;
    } else if (response.action === "reset") {
      updates.components = [];
    }

    if (response.layout) {
      updates.layout = response.layout.type;
      if (response.layout.spacing !== undefined)
        updates.spacing = response.layout.spacing;
      if (response.layout.columns !== undefined)
        updates.columns = response.layout.columns;
    }

    return updates;
  }

  async getComponentSuggestions(
    userRequest: string,
    availableSpace: { width: number; height: number },
    screenSize: "mobile" | "tablet" | "desktop" = "desktop"
  ) {
    if (!this.isInitialized) {
      return { success: false, error: "LLM service not initialized" };
    }

    try {
      const result = await generateText({
        model: this.model,
        prompt: `Based on the user request "${userRequest}" and available space ${availableSpace.width}x${availableSpace.height}, suggest appropriate components.`,
      });

      return {
        success: true,
        suggestions: [],
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to get suggestions: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  async analyzeLayout(currentLayout: UIAdaptation, userGoals: string) {
    if (!this.isInitialized) {
      return { success: false, error: "LLM service not initialized" };
    }

    try {
      const result = await generateText({
        model: this.model,
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
