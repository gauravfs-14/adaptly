---
sidebar_position: 1
title: Types API
description: Complete TypeScript interfaces and types for Adaptly
---

# Types API Reference

This page documents all TypeScript interfaces and types available in Adaptly. These types provide full type safety and IntelliSense support for your development.

## Core Types

### UIComponent

Represents a single component in the adaptive UI layout.

```typescript
interface UIComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}
```

**Fields:**

- `id`: Unique identifier for the component
- `type`: Component type (must match adaptly.json registry)
- `props`: Component properties and data
- `position`: Grid position and size (x, y, width, height)
- `visible`: Whether the component is visible

**Example:**

```typescript
const component: UIComponent = {
  id: "metric-1",
  type: "MetricCard",
  props: {
    title: "Revenue",
    value: "$45,231",
    change: "+20.1%"
  },
  position: { x: 0, y: 0, w: 2, h: 1 },
  visible: true
};
```

### UIAdaptation

Represents the complete UI layout state.

```typescript
interface UIAdaptation {
  components: UIComponent[];
  layout: "grid" | "flex" | "absolute";
  spacing: number;
  columns: number;
}
```

**Fields:**

- `components`: Array of UI components
- `layout`: Layout type (grid, flex, or absolute)
- `spacing`: Gap between components in pixels
- `columns`: Number of grid columns

**Example:**

```typescript
const adaptation: UIAdaptation = {
  components: [
    {
      id: "metric-1",
      type: "MetricCard",
      props: { title: "Revenue", value: "$45,231" },
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    }
  ],
  layout: "grid",
  spacing: 6,
  columns: 6
};
```

## Configuration Types

### AdaptlyConfig

Main configuration object for AdaptlyProvider.

```typescript
interface AdaptlyConfig {
  llm?: LLMConfig;
  registry?: RegistryConfig;
  defaultLayout?: Partial<UIAdaptation>;
  enableLLM?: boolean;
  adaptlyJson: AdaptlyJsonConfig; // REQUIRED
  storage?: {
    enabled?: boolean;
    key?: string;
    version?: string;
  };
  loadingOverlay?: {
    enabled?: boolean;
    message?: string;
    subMessage?: string;
    customLoader?: CustomLoaderComponent;
  };
  logging?: {
    enabled?: boolean;
    level?: "debug" | "info" | "warn" | "error";
  };
}
```

**Fields:**

- `llm`: LLM configuration (optional)
- `registry`: Component registry configuration (optional)
- `defaultLayout`: Default UI layout (optional)
- `enableLLM`: Enable AI processing (optional, default: true)
- `adaptlyJson`: Component registry configuration (required)
- `storage`: Storage configuration (optional)
- `loadingOverlay`: Loading overlay configuration (optional)
- `logging`: Logging configuration (optional)

### AdaptlyJsonConfig

Configuration for the adaptly.json file.

```typescript
interface AdaptlyJsonConfig {
  version: string;
  components: Record<string, ComponentJsonConfig>;
}
```

**Fields:**

- `version`: Configuration version
- `components`: Component definitions

**Example:**

```typescript
const adaptlyConfig: AdaptlyJsonConfig = {
  version: "1.0.0",
  components: {
    "MetricCard": {
      description: "Display key performance indicators",
      props: {
        "title": { type: "string", required: true },
        "value": { type: "string", required: true }
      },
      useCases: ["revenue tracking", "user metrics"],
      space: { min: [2, 1], max: [3, 2], preferred: [2, 1] }
    }
  }
};
```

### ComponentJsonConfig

Configuration for a single component in adaptly.json.

```typescript
interface ComponentJsonConfig {
  description: string;
  props: Record<string, PropJsonConfig>;
  useCases: string[];
  space: {
    min: number[]; // [width, height]
    max: number[]; // [width, height]
    preferred: number[]; // [width, height]
  };
}
```

**Fields:**

- `description`: What the component does
- `props`: Property definitions
- `useCases`: When to use this component
- `space`: Space requirements

### PropJsonConfig

Configuration for a component property.

```typescript
interface PropJsonConfig {
  type: string;
  required: boolean;
  allowed?: (string | number)[];
}
```

**Fields:**

- `type`: Property type (string, number, boolean, array, object)
- `required`: Whether the property is required
- `allowed`: Allowed values (optional)

## LLM Types

### LLMConfig

Configuration for LLM providers.

```typescript
interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
```

**Fields:**

- `provider`: LLM provider (google, openai, anthropic)
- `apiKey`: API key for the provider
- `model`: Model name to use
- `maxTokens`: Maximum tokens to generate (optional)
- `temperature`: Creativity level 0-1 (optional)

### LLMProvider

Supported LLM providers.

```typescript
type LLMProvider = "google" | "openai" | "anthropic";
```

**Values:**

- `"google"`: Google Gemini models
- `"openai"`: OpenAI GPT models
- `"anthropic"`: Anthropic Claude models

## Component Registry Types

### ComponentMetadata

Metadata for a registered component.

```typescript
interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  tags: string[];
  gridRequirements: {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    preferredWidth: number;
    preferredHeight: number;
    aspectRatio: number;
    responsive: {
      mobile: GridRequirements;
      tablet: GridRequirements;
      desktop: GridRequirements;
    };
  };
  props: {
    required: string[];
    optional: string[];
    defaults: Record<string, unknown>;
    validation: Record<string, string>;
    definitions: PropDefinition[];
  };
  examples: ComponentExample[];
  priority: "high" | "medium" | "low";
}
```

### PropDefinition

Definition for a component property.

```typescript
interface PropDefinition {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object" | "function";
  description: string;
  required: boolean;
  defaultValue?: unknown;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
  };
  examples?: unknown[];
  dataSource?: {
    type: "static" | "api" | "filtered" | "computed";
    endpoint?: string;
    filters?: string[];
    transformations?: string[];
  };
}
```

### ComponentExample

Example usage of a component.

```typescript
interface ComponentExample {
  name: string;
  description: string;
  props: Record<string, unknown>;
  gridPosition: { x: number; y: number; w: number; h: number };
  useCase: string;
}
```

### ComponentSuggestion

AI suggestion for a component.

```typescript
interface ComponentSuggestion {
  component: ComponentMetadata;
  confidence: number;
  reasoning: string;
  suggestedProps: Record<string, unknown>;
  suggestedPosition: { x: number; y: number; w: number; h: number };
}
```

## Command Types

### Command

A command in the command bar.

```typescript
interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  category: "layout" | "component" | "theme" | "utility";
}
```

**Fields:**

- `id`: Unique command identifier
- `label`: Display label
- `description`: Command description
- `icon`: Icon component
- `action`: Action to perform
- `category`: Command category

### CommandConfig

Configuration for the command bar.

```typescript
interface CommandConfig {
  keyPress?: string;
  commands?: Command[];
  enableLLM?: boolean;
  placeholder?: string;
  emptyMessage?: string;
}
```

### CommandHandler

Handler for command processing.

```typescript
interface CommandHandler {
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM?: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing?: boolean;
  lastLLMResponse?: string;
}
```

## Storage Types

### StorageConfig

Configuration for storage service.

```typescript
interface StorageConfig {
  enabled: boolean;
  key: string;
  version: string;
}
```

**Fields:**

- `enabled`: Whether storage is enabled
- `key`: Storage key prefix
- `version`: Data version for migration

## Custom Loader Types

### CustomLoaderProps

Props for custom loader components.

```typescript
interface CustomLoaderProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}
```

**Fields:**

- `isVisible`: Whether the loader is visible
- `message`: Main loading message
- `subMessage`: Additional loading message

### CustomLoaderComponent

Type for custom loader components.

```typescript
type CustomLoaderComponent = React.ComponentType<CustomLoaderProps>;
```

## Registry Types

### ComponentRegistry

Registry of React components.

```typescript
interface ComponentRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

### IconRegistry

Registry of icon components.

```typescript
interface IconRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

### RegistryConfig

Configuration for component registry.

```typescript
interface RegistryConfig {
  components: ComponentMetadata[];
  categories: Record<string, unknown>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}
```

### RegistryInterface

Interface for component registry operations.

```typescript
interface RegistryInterface {
  getAllComponents(): ComponentMetadata[];
  getComponent(id: string): ComponentMetadata | undefined;
  getComponentsByCategory(category: string): ComponentMetadata[];
  getComponentsByTags(tags: string[]): ComponentMetadata[];
  getComponentsForPosition(
    availableWidth: number,
    availableHeight: number,
    screenSize?: "mobile" | "tablet" | "desktop"
  ): ComponentMetadata[];
  getRecommendedComponents(
    useCase: string,
    availableSpace: { width: number; height: number },
    screenSize?: "mobile" | "tablet" | "desktop"
  ): ComponentMetadata[];
  getSuggestions(
    userInput: string,
    availableSpace: { width: number; height: number },
    screenSize?: "mobile" | "tablet" | "desktop"
  ): ComponentSuggestion[];
  getCategories(): Record<string, unknown>;
  getComponentCountByCategory(): Record<string, number>;
  searchComponents(query: string): ComponentMetadata[];
}
```

## Grid Types

### GridRequirements

Requirements for grid positioning.

```typescript
interface GridRequirements {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  preferredWidth: number;
  preferredHeight: number;
  aspectRatio: number;
}
```

## Usage Examples

### Basic Component Usage

```typescript
import { UIComponent, UIAdaptation } from "adaptly";

// Create a component
const component: UIComponent = {
  id: "metric-1",
  type: "MetricCard",
  props: {
    title: "Revenue",
    value: "$45,231",
    change: "+20.1%"
  },
  position: { x: 0, y: 0, w: 2, h: 1 },
  visible: true
};

// Create an adaptation
const adaptation: UIAdaptation = {
  components: [component],
  layout: "grid",
  spacing: 6,
  columns: 6
};
```

### Configuration Usage

```typescript
import { AdaptlyConfig, AdaptlyJsonConfig } from "adaptly";

const adaptlyConfig: AdaptlyJsonConfig = {
  version: "1.0.0",
  components: {
    "MetricCard": {
      description: "Display key performance indicators",
      props: {
        "title": { type: "string", required: true },
        "value": { type: "string", required: true }
      },
      useCases: ["revenue tracking", "user metrics"],
      space: { min: [2, 1], max: [3, 2], preferred: [2, 1] }
    }
  }
};

const config: AdaptlyConfig = {
  enableLLM: true,
  adaptlyJson: adaptlyConfig,
  storage: {
    enabled: true,
    key: "my-app",
    version: "1.0.0"
  }
};
```

### LLM Configuration

```typescript
import { LLMConfig, LLMProvider } from "adaptly";

const llmConfig: LLMConfig = {
  provider: "google" as LLMProvider,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!,
  model: "gemini-2.0-flash-exp",
  maxTokens: 1000,
  temperature: 0.7
};
```

## Type Safety Benefits

### IntelliSense Support

All types provide full IntelliSense support in your IDE:

```typescript
// IntelliSense will show all available properties
const component: UIComponent = {
  id: "metric-1",
  type: "MetricCard",
  props: {
    title: "Revenue",
    value: "$45,231"
    // IntelliSense will suggest available props
  },
  position: {
    x: 0,
    y: 0,
    w: 2,
    h: 1
    // IntelliSense will show position properties
  },
  visible: true
};
```

### Compile-Time Validation

TypeScript will catch errors at compile time:

```typescript
// ❌ TypeScript error - missing required field
const component: UIComponent = {
  id: "metric-1",
  type: "MetricCard",
  props: { title: "Revenue" },
  // Missing position and visible fields
};

// ✅ Correct usage
const component: UIComponent = {
  id: "metric-1",
  type: "MetricCard",
  props: { title: "Revenue", value: "$45,231" },
  position: { x: 0, y: 0, w: 2, h: 1 },
  visible: true
};
```

## Related Documentation

- **[Core Components API](../api/core-components)** - Component documentation
- **[Hooks API](../api/hooks)** - Hook documentation
- **[Services API](../api/services)** - Service documentation

---

**Ready for component documentation?** Check out the [Core Components API](../api/core-components) for complete documentation of all Adaptly components!
