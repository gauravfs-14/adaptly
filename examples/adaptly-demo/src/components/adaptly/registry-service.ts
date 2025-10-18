// Framework-style registry service for component management
import {
  ComponentMetadata,
  ComponentSuggestion,
  RegistryConfig,
} from "./types";

export class RegistryService {
  private config: RegistryConfig;
  private cache: Map<string, ComponentMetadata[]> = new Map();

  constructor(config: RegistryConfig) {
    this.config = config;
  }

  // Get all available components
  getAllComponents(): ComponentMetadata[] {
    return this.config.components;
  }

  // Get component by ID
  getComponent(id: string): ComponentMetadata | undefined {
    return this.config.components.find((comp) => comp.id === id);
  }

  // Get components by category
  getComponentsByCategory(category: string): ComponentMetadata[] {
    return this.config.components.filter((comp) => comp.category === category);
  }

  // Get components by tags
  getComponentsByTags(tags: string[]): ComponentMetadata[] {
    return this.config.components.filter((comp) =>
      tags.some((tag) => comp.tags.includes(tag))
    );
  }

  // Get components suitable for a specific position
  getComponentsForPosition(
    availableWidth: number,
    availableHeight: number,
    screenSize: "mobile" | "tablet" | "desktop" = "desktop"
  ): ComponentMetadata[] {
    const cacheKey = `${availableWidth}x${availableHeight}-${screenSize}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const requirements = this.config.components.filter((comp) => {
      const req = comp.gridRequirements.responsive[screenSize];
      return (
        availableWidth >= req.minWidth &&
        availableWidth <= req.maxWidth &&
        availableHeight >= req.minHeight &&
        availableHeight <= req.maxHeight
      );
    });

    if (this.config.enableCaching) {
      this.cache.set(cacheKey, requirements);
    }

    return requirements;
  }

  // Get component suggestions based on user input
  getSuggestions(
    userInput: string,
    availableSpace: { width: number; height: number },
    screenSize: "mobile" | "tablet" | "desktop" = "desktop"
  ): ComponentSuggestion[] {
    const suitableComponents = this.getComponentsForPosition(
      availableSpace.width,
      availableSpace.height,
      screenSize
    );

    return suitableComponents.map((component) => ({
      component,
      confidence: this.calculateConfidence(component, userInput),
      reasoning: this.generateReasoning(component, userInput, availableSpace),
      suggestedProps: this.suggestProps(component, userInput),
      suggestedPosition: {
        x: 0,
        y: 0,
        w: component.gridRequirements.responsive[screenSize].preferredWidth,
        h: component.gridRequirements.responsive[screenSize].preferredHeight,
      },
    }));
  }

  // Calculate confidence score for component matching
  private calculateConfidence(
    component: ComponentMetadata,
    userInput: string
  ): number {
    const contextLower = userInput.toLowerCase();
    let confidence = 0;

    // Check if component name matches
    if (contextLower.includes(component.name.toLowerCase())) {
      confidence += 0.4;
    }

    // Check if component description matches
    if (contextLower.includes(component.description.toLowerCase())) {
      confidence += 0.3;
    }

    // Check if tags match
    if (component.tags.some((tag) => contextLower.includes(tag))) {
      confidence += 0.2;
    }

    // Check if category matches
    if (contextLower.includes(component.category)) {
      confidence += 0.1;
    }

    return Math.min(confidence, 1);
  }

  // Generate reasoning for component suggestion
  private generateReasoning(
    component: ComponentMetadata,
    userInput: string,
    availableSpace: { width: number; height: number }
  ): string {
    return `Component "${component.name}" matches your request "${userInput}" and fits the available space ${availableSpace.width}x${availableSpace.height}`;
  }

  // Suggest props for component
  private suggestProps(
    component: ComponentMetadata,
    userInput: string
  ): Record<string, any> {
    const props: Record<string, any> = {};

    // Add required props with defaults
    component.props.required.forEach((prop) => {
      if (prop === "title") {
        props[prop] = "Generated Component";
      } else if (prop === "description") {
        props[prop] = "Auto-generated description";
      } else {
        props[prop] = "Generated value";
      }
    });

    // Add default values for optional props
    Object.entries(component.props.defaults).forEach(([key, value]) => {
      props[key] = value;
    });

    return props;
  }

  // Get categories
  getCategories(): Record<string, any> {
    return this.config.categories;
  }

  // Get component count by category
  getComponentCountByCategory(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.config.components.forEach((comp) => {
      counts[comp.category] = (counts[comp.category] || 0) + 1;
    });
    return counts;
  }

  // Search components
  searchComponents(query: string): ComponentMetadata[] {
    const queryLower = query.toLowerCase();
    return this.config.components.filter(
      (comp) =>
        comp.name.toLowerCase().includes(queryLower) ||
        comp.description.toLowerCase().includes(queryLower) ||
        comp.tags.some((tag) => tag.toLowerCase().includes(queryLower))
    );
  }
}

// Framework-style default configuration
export const DEFAULT_REGISTRY_CONFIG: RegistryConfig = {
  components: [
    {
      id: "empty-card",
      name: "Empty Card",
      description:
        "A placeholder card for empty states or when no specific component matches",
      category: "utility",
      tags: ["placeholder", "empty", "fallback"],
      icon: "HelpCircle",
      props: {
        required: ["title", "description"],
        optional: ["icon", "action"],
        defaults: {},
        validation: {},
        definitions: [],
      },
      examples: [],
      priority: "high",
      gridRequirements: {
        minWidth: 1,
        maxWidth: 6,
        minHeight: 1,
        maxHeight: 3,
        preferredWidth: 3,
        preferredHeight: 2,
        aspectRatio: 1.5,
        responsive: {
          mobile: {
            minWidth: 1,
            minHeight: 1,
            maxWidth: 2,
            maxHeight: 2,
            preferredWidth: 2,
            preferredHeight: 2,
            aspectRatio: 1,
          },
          tablet: {
            minWidth: 1,
            minHeight: 1,
            maxWidth: 4,
            maxHeight: 2,
            preferredWidth: 3,
            preferredHeight: 2,
            aspectRatio: 1.5,
          },
          desktop: {
            minWidth: 1,
            minHeight: 1,
            maxWidth: 6,
            maxHeight: 3,
            preferredWidth: 3,
            preferredHeight: 2,
            aspectRatio: 1.5,
          },
        },
      },
    },
  ],
  categories: {
    utility: "Utility Components",
  },
  enableCaching: true,
  maxCacheSize: 100,
};

// Default registry service instance
export const registryService = new RegistryService(DEFAULT_REGISTRY_CONFIG);
