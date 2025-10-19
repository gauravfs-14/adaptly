# Types API Reference

This document provides comprehensive TypeScript definitions for all Adaptly types, interfaces, and enums.

## 🏗️ Core Types

### UIComponent

Represents a single component in the adaptive layout.

```typescript
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
- `type`: Component type name (must match registry)
- `props`: Component properties and data
- `position`: Grid position and dimensions
- `visible`: Whether the component is visible

### UIAdaptation

Represents the complete layout state.

```typescript
interface UIAdaptation {
  components: UIComponent[];
  layout: 'grid' | 'flex' | 'absolute';
  spacing: number;
  columns: number;
}
```

**Properties:**

- `components`: Array of all components in the layout
- `layout`: Layout type for positioning
- `spacing`: Spacing between components
- `columns`: Number of grid columns

## 🧩 Component Registry Types

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
  priority: 'high' | 'medium' | 'low';
}
```

### PropDefinition

Definition for a component property.

```typescript
interface PropDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'function';
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
    type: 'static' | 'api' | 'filtered' | 'computed';
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

AI-generated component suggestion.

```typescript
interface ComponentSuggestion {
  component: ComponentMetadata;
  confidence: number;
  reasoning: string;
  suggestedProps: Record<string, unknown>;
  suggestedPosition: { x: number; y: number; w: number; h: number };
}
```

## 🔧 Configuration Types

### AdaptlyConfig

Main configuration interface.

```typescript
interface AdaptlyConfig {
  llm?: LLMConfig;
  registry?: RegistryConfig;
  defaultLayout?: Partial<UIAdaptation>;
  enableLLM?: boolean;
  adaptlyJson: AdaptlyJsonConfig;
  loadingOverlay?: LoadingOverlayConfig;
  logging?: LoggingConfig;
}
```

### LLMConfig

Configuration for the LLM service.

```typescript
interface LLMConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
```

### RegistryConfig

Configuration for the registry service.

```typescript
interface RegistryConfig {
  components: ComponentMetadata[];
  categories: Record<string, unknown>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}
```

### LoadingOverlayConfig

Configuration for the loading overlay.

```typescript
interface LoadingOverlayConfig {
  enabled?: boolean;
  message?: string;
  subMessage?: string;
  customLoader?: CustomLoaderComponent;
}
```

### LoggingConfig

Configuration for the logging system.

```typescript
interface LoggingConfig {
  enabled?: boolean;
  level?: 'debug' | 'info' | 'warn' | 'error';
}
```

## 📝 Adaptly.json Types

### AdaptlyJsonConfig

Configuration from adaptly.json file.

```typescript
interface AdaptlyJsonConfig {
  version: string;
  components: Record<string, ComponentJsonConfig>;
}
```

### ComponentJsonConfig

Component configuration from adaptly.json.

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

### PropJsonConfig

Property configuration from adaptly.json.

```typescript
interface PropJsonConfig {
  type: string;
  required: boolean;
  allowed?: (string | number)[];
}
```

## 🎨 Component Types

### ComponentRegistry

Registry of available components.

```typescript
interface ComponentRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

### IconRegistry

Registry of available icons.

```typescript
interface IconRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

## ⌨️ Command Types

### Command

Individual command definition.

```typescript
interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  category: 'layout' | 'component' | 'theme' | 'utility';
}
```

### CommandConfig

Configuration for the command interface.

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

Handler for command execution.

```typescript
interface CommandHandler {
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM?: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing?: boolean;
  lastLLMResponse?: string;
}
```

## 🔄 Service Types

### LLMResponse

Response from the LLM service.

```typescript
interface LLMResponse {
  success: boolean;
  newAdaptation?: UIAdaptation;
  reasoning?: string;
  error?: string;
}
```

### SpaceInfo

Information about available space.

```typescript
interface SpaceInfo {
  width: number;
  height: number;
}
```

### GridRequirements

Grid requirements for components.

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

## 🎯 Hook Types

### AdaptiveUIContextType

Context type for the adaptive UI hook.

```typescript
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
```

### AdaptiveCommandReturn

Return type for the adaptive command hook.

```typescript
interface AdaptiveCommandReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  handleSelect: (value: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  getCommands: () => Command[];
  getFilteredCommands: () => Command[];
}
```

## 🎨 Custom Loader Types

### CustomLoaderProps

Props for custom loader components.

```typescript
interface CustomLoaderProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}
```

### CustomLoaderComponent

Type for custom loader components.

```typescript
type CustomLoaderComponent = React.ComponentType<CustomLoaderProps>;
```

## 🔧 Utility Types

### DataSourceConfig

Configuration for data sources.

```typescript
interface DataSourceConfig {
  description: string;
  examples: string[];
}
```

### LayoutConfig

Configuration for layout settings.

```typescript
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

## 🎯 Component Props Types

### AdaptiveCommandProps

Props for the AdaptiveCommand component.

```typescript
interface AdaptiveCommandProps {
  keyPress?: string;
  config?: CommandConfig;
  handler?: CommandHandler;
  className?: string;
  style?: React.CSSProperties;
  aiSuggestions?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
  }>;
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
}
```

### AdaptiveLayoutProps

Props for the AdaptiveLayout component.

```typescript
interface AdaptiveLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  gridClassName?: string;
  itemClassName?: string;
  spacing?: number;
  columns?: number;
  layout?: 'grid' | 'flex' | 'absolute';
  responsive?: boolean;
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}
```

## 🧪 Testing Types

### TestComponentProps

Props for test components.

```typescript
interface TestComponentProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}
```

### MockData

Type for mock data in tests.

```typescript
interface MockData {
  components: ComponentMetadata[];
  layout: UIAdaptation;
  config: AdaptlyConfig;
}
```

## 🔄 Event Types

### LayoutChangeEvent

Event fired when layout changes.

```typescript
interface LayoutChangeEvent {
  type: 'layout-change';
  payload: {
    oldLayout: UIAdaptation;
    newLayout: UIAdaptation;
    source: 'user' | 'ai' | 'programmatic';
  };
}
```

### ComponentAddEvent

Event fired when a component is added.

```typescript
interface ComponentAddEvent {
  type: 'component-add';
  payload: {
    component: UIComponent;
    position: { x: number; y: number; w: number; h: number };
  };
}
```

### ComponentRemoveEvent

Event fired when a component is removed.

```typescript
interface ComponentRemoveEvent {
  type: 'component-remove';
  payload: {
    componentId: string;
    component: UIComponent;
  };
}
```

## 🎨 Theme Types

### ThemeConfig

Configuration for theming.

```typescript
interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  radius: number;
}
```

### ColorScheme

Color scheme definition.

```typescript
interface ColorScheme {
  light: ThemeConfig;
  dark: ThemeConfig;
}
```

## 🔧 Plugin Types

### AdaptlyPlugin

Interface for Adaptly plugins.

```typescript
interface AdaptlyPlugin {
  name: string;
  version: string;
  install: (adaptly: AdaptlyInstance) => void;
  uninstall: () => void;
}
```

### AdaptlyInstance

Instance of the Adaptly system.

```typescript
interface AdaptlyInstance {
  services: {
    llm: CoreLLMService;
    registry: RegistryService;
    logger: typeof adaptlyLogger;
  };
  config: AdaptlyConfig;
  state: UIAdaptation;
}
```

## 🚀 Performance Types

### PerformanceMetrics

Metrics for performance monitoring.

```typescript
interface PerformanceMetrics {
  renderTime: number;
  layoutTime: number;
  aiProcessingTime: number;
  componentCount: number;
  memoryUsage: number;
}
```

### PerformanceConfig

Configuration for performance optimization.

```typescript
interface PerformanceConfig {
  enableVirtualization: boolean;
  enableMemoization: boolean;
  enableLazyLoading: boolean;
  maxComponents: number;
  debounceTime: number;
}
```

## 🆘 Error Types

### AdaptlyError

Base error class for Adaptly.

```typescript
class AdaptlyError extends Error {
  code: string;
  context?: Record<string, unknown>;
  
  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'AdaptlyError';
    this.code = code;
    this.context = context;
  }
}
```

### ValidationError

Error for validation failures.

```typescript
class ValidationError extends AdaptlyError {
  field: string;
  value: unknown;
  
  constructor(field: string, value: unknown, message: string) {
    super(message, 'VALIDATION_ERROR', { field, value });
    this.field = field;
    this.value = value;
  }
}
```

## 📚 Next Steps

Now that you understand all the types:

1. **Read the [Core Components API](./core-components.md)** - Learn about the main components
2. **Check out the [Hooks API](./hooks.md)** - Understand the available hooks
3. **Explore the [Services API](./services.md)** - Understand the underlying services
4. **Try the [Basic Dashboard Tutorial](../tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to start building?** Check out the [Quick Start Guide](../quick-start.md) to get started!
