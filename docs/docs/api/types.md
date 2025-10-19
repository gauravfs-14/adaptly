---
sidebar_position: 9
---

# Types API

TypeScript interfaces and types

This document provides comprehensive type definitions for Adaptly's TypeScript interfaces and types.

## 🎯 Core Types

### UIComponent

Represents a single component in the adaptive UI.

```tsx
interface UIComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}
```

**Properties:**

- `id`: Unique identifier for the component
- `type`: Component type (must match registry)
- `props`: Component properties and data
- `position`: Grid position and dimensions
- `visible`: Whether component is visible

**Example:**

```tsx
const component: UIComponent = {
  id: 'metric-1',
  type: 'MetricCard',
  props: {
    title: 'Revenue',
    value: '$45,231',
    change: '+20.1%',
    changeType: 'positive'
  },
  position: { x: 0, y: 0, w: 2, h: 1 },
  visible: true
};
```

### UIAdaptation

Represents the complete UI state and layout configuration.

```tsx
interface UIAdaptation {
  components: UIComponent[];
  layout: "grid" | "flex" | "absolute";
  spacing: number;
  columns: number;
}
```

**Properties:**

- `components`: Array of UI components
- `layout`: Layout system type
- `spacing`: Spacing between components
- `columns`: Number of grid columns

**Example:**

```tsx
const adaptation: UIAdaptation = {
  components: [
    {
      id: 'metric-1',
      type: 'MetricCard',
      props: { title: 'Revenue', value: '$45,231' },
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    }
  ],
  layout: 'grid',
  spacing: 6,
  columns: 6
};
```

## 🔧 Configuration Types

### AdaptlyConfig

Main configuration interface for AdaptlyProvider.

```tsx
interface AdaptlyConfig {
  llm?: LLMConfig;
  registry?: RegistryConfig;
  defaultLayout?: Partial<UIAdaptation>;
  enableLLM?: boolean;
  adaptlyJson: AdaptlyJsonConfig;
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

### AdaptlyJsonConfig

Configuration for the component registry.

```tsx
interface AdaptlyJsonConfig {
  version: string;
  components: Record<string, ComponentJsonConfig>;
}
```

**Example:**

```tsx
const adaptlyConfig: AdaptlyJsonConfig = {
  version: "1.0.0",
  components: {
    MetricCard: {
      description: "Display key performance indicators",
      props: {
        title: { type: "string", required: true },
        value: { type: "string", required: true }
      },
      useCases: ["revenue tracking", "user metrics"],
      space: { min: [2, 1], max: [3, 2], preferred: [2, 1] }
    }
  }
};
```

### ComponentJsonConfig

Configuration for a single component in the registry.

```tsx
interface ComponentJsonConfig {
  description: string;
  props: Record<string, PropJsonConfig>;
  useCases: string[];
  space: {
    min: number[];
    max: number[];
    preferred: number[];
  };
}
```

### PropJsonConfig

Configuration for a component property.

```tsx
interface PropJsonConfig {
  type: string;
  required: boolean;
  allowed?: (string | number)[];
}
```

## 🤖 LLM Types

### LLMConfig

Configuration for LLM providers.

```tsx
interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
```

### LLMProvider

Supported LLM providers.

```tsx
type LLMProvider = "google" | "openai" | "anthropic";
```

**Example:**

```tsx
const llmConfig: LLMConfig = {
  provider: "google",
  apiKey: "your-api-key",
  model: "gemini-2.0-flash-exp",
  maxTokens: 1000,
  temperature: 0.7
};
```

## 🎨 Component Registry Types

### ComponentRegistry

Registry for React components.

```tsx
interface ComponentRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

**Example:**

```tsx
const componentRegistry: ComponentRegistry = {
  MetricCard,
  SalesChart,
  DataTable
};
```

### IconRegistry

Registry for icon components.

```tsx
interface IconRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

**Example:**

```tsx
const iconRegistry: IconRegistry = {
  DollarSign,
  Users,
  BarChart3
};
```

## ⌨️ Command Types

### Command

Command interface for the command bar.

```tsx
interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  category: "layout" | "component" | "theme" | "utility";
}
```

**Example:**

```tsx
const command: Command = {
  id: "reset",
  label: "Reset",
  description: "Reset to default layout",
  icon: RotateCcw,
  action: "reset",
  category: "utility"
};
```

### CommandConfig

Configuration for the command interface.

```tsx
interface CommandConfig {
  keyPress?: string;
  commands?: Command[];
  enableLLM?: boolean;
  placeholder?: string;
  emptyMessage?: string;
}
```

### CommandHandler

Handler interface for command processing.

```tsx
interface CommandHandler {
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM?: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing?: boolean;
  lastLLMResponse?: string;
}
```

## 🔄 Context Types

### AdaptiveUIContextType

Context type for the adaptive UI provider.

```tsx
interface AdaptiveUIContextType {
  // UI state
  adaptation: UIAdaptation;
  updateAdaptation: (adaptation: Partial<UIAdaptation>) => void;
  addComponent: (component: UIComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<UIComponent>) => void;
  
  // AI processing
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing: boolean;
  lastLLMResponse?: string;
  
  // Configuration
  config?: AdaptlyConfig;
  
  // Storage methods
  saveToStorage: () => boolean;
  loadFromStorage: () => UIAdaptation | null;
  clearStorage: () => boolean;
  hasStoredData: () => boolean;
  
  // LLM provider info
  currentLLMProvider?: string;
}
```

## 🎨 Component Types

### CustomLoaderComponent

Custom loader component interface.

```tsx
interface CustomLoaderProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}

type CustomLoaderComponent = React.ComponentType<CustomLoaderProps>;
```

**Example:**

```tsx
const MyCustomLoader: CustomLoaderComponent = ({ isVisible, message, subMessage }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold mb-2">{message}</h3>
        <p className="text-gray-600">{subMessage}</p>
      </div>
    </div>
  );
};
```

## 🏗️ Advanced Types

### ComponentMetadata

Metadata for component registry.

```tsx
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

Property definition for components.

```tsx
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

Example configuration for components.

```tsx
interface ComponentExample {
  name: string;
  description: string;
  props: Record<string, unknown>;
  gridPosition: { x: number; y: number; w: number; h: number };
  useCase: string;
}
```

### ComponentSuggestion

AI-generated component suggestion.

```tsx
interface ComponentSuggestion {
  component: ComponentMetadata;
  confidence: number;
  reasoning: string;
  suggestedProps: Record<string, unknown>;
  suggestedPosition: { x: number; y: number; w: number; h: number };
}
```

## 🔧 Service Types

### StorageConfig

Configuration for storage service.

```tsx
interface StorageConfig {
  enabled: boolean;
  key: string;
  version: string;
}
```

### RegistryConfig

Configuration for component registry.

```tsx
interface RegistryConfig {
  components: ComponentMetadata[];
  categories: Record<string, unknown>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}
```

### RegistryInterface

Interface for component registry service.

```tsx
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

## 🎯 Utility Types

### GridRequirements

Grid space requirements for components.

```tsx
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

### DataSourceConfig

Configuration for data sources.

```tsx
interface DataSourceConfig {
  description: string;
  examples: string[];
}
```

### LayoutConfig

Layout configuration.

```tsx
interface LayoutConfig {
  grid: {
    columns: number;
    spacing: number;
    responsive: {
      mobile: { columns: number };
      tablet: { columns: number };
      desktop: { columns: number };
    };
  };
}
```

## 🚀 Usage Examples

### Complete Type Usage

```tsx
import { 
  AdaptlyProvider, 
  useAdaptiveUI,
  UIComponent,
  UIAdaptation,
  AdaptlyConfig,
  AdaptlyJsonConfig,
  ComponentRegistry,
  IconRegistry
} from 'adaptly';

// Component registry
const componentRegistry: ComponentRegistry = {
  MetricCard,
  SalesChart,
  DataTable
};

// Icon registry
const iconRegistry: IconRegistry = {
  DollarSign,
  Users,
  BarChart3
};

// Adaptly configuration
const adaptlyConfig: AdaptlyJsonConfig = {
  version: "1.0.0",
  components: {
    MetricCard: {
      description: "Display key performance indicators",
      props: {
        title: { type: "string", required: true },
        value: { type: "string", required: true }
      },
      useCases: ["revenue tracking", "user metrics"],
      space: { min: [2, 1], max: [3, 2], preferred: [2, 1] }
    }
  }
};

// Main configuration
const config: AdaptlyConfig = {
  enableLLM: true,
  adaptlyJson: adaptlyConfig,
  storage: {
    enabled: true,
    key: "my-app-ui",
    version: "1.0.0"
  },
  loadingOverlay: {
    enabled: true,
    message: "AI is generating your layout...",
    subMessage: "Creating components and arranging them for you"
  },
  logging: {
    enabled: true,
    level: "info"
  }
};

// Component usage
function MyComponent() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    parseUserInputWithLLM,
    isLLMProcessing
  } = useAdaptiveUI();

  const handleAddComponent = () => {
    const component: UIComponent = {
      id: 'metric-1',
      type: 'MetricCard',
      props: {
        title: 'Revenue',
        value: '$45,231'
      },
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    };
    
    addComponent(component);
  };

  return (
    <div>
      <button onClick={handleAddComponent}>
        Add Component
      </button>
      <p>Components: {adaptation.components.length}</p>
    </div>
  );
}
```

## 📚 Related Documentation

- **[Core Components API](core-components)** - Component documentation
- **[Hooks API](hooks)** - Hook documentation
- **[Services API](services)** - Service layer documentation
- **[Component Registry Guide](../component-registry)** - Component configuration
- **[Storage Service Guide](../storage-service)** - Storage configuration

---

Ready to learn about services? Check out the [Services API](services)!
