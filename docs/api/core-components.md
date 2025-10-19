---
layout: default
title: Core Components API
description: AdaptlyProvider, hooks, and utilities
render_with_liquid: false
---

This document provides comprehensive API reference for Adaptly's core components and their usage.

## 🎯 AdaptlyProvider

The main provider component that wraps your application and provides AI-powered adaptive functionality.

### Props

```tsx
interface AdaptlyProviderProps {
  // Required
  apiKey: string;
  components: Record<string, React.ComponentType<any>>;
  adaptlyConfig: AdaptlyJsonConfig;
  
  // Optional
  icons?: Record<string, React.ComponentType<any>>;
  model?: string;
  provider?: "google" | "openai" | "anthropic";
  defaultLayout?: Partial<UIAdaptation>;
  className?: string;
  style?: React.CSSProperties;
  
  // Command bar customization
  aiSuggestions?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
  }>;
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
  
  // Custom loader
  customLoader?: CustomLoaderComponent;
  
  // Storage options
  enableStorage?: boolean;
  storageKey?: string;
  storageVersion?: string;
  
  // Children
  children?: React.ReactNode;
}
```

### Basic Usage

```tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from './adaptly.json';
import { MetricCard, SalesChart, DataTable } from './components';

function App() {
  return (
    <AdaptlyProvider
      apiKey="your-api-key"
      provider="google"
      model="gemini-2.0-flash-exp"
      components={{ MetricCard, SalesChart, DataTable }}
      adaptlyConfig={adaptlyConfig}
      enableStorage={true}
      storageKey="my-app-ui"
    />
  );
}
```

### Advanced Usage

{% raw %}

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
  provider="google"
  model="gemini-2.0-flash-exp"
  components={{ MetricCard, SalesChart, DataTable }}
  icons={{ DollarSign, Users, BarChart3 }}
  adaptlyConfig={adaptlyConfig}
  enableStorage={true}
  storageKey="my-app-ui"
  storageVersion="1.0.0"
  defaultLayout={{
    components: [],
    layout: "grid",
    spacing: 6,
    columns: 6
  }}
  aiSuggestions={[
    { value: "Add metrics", label: "📊 Add metrics" },
    { value: "Show charts", label: "📈 Show charts" }
  ]}
  showAISuggestions={true}
  showUtilityCommands={true}
  customLoader={MyCustomLoader}
  className="h-full"
  style={{ minHeight: '100vh' }}
>
  <MyCustomContent />
</AdaptlyProvider>
```

{% endraw %}

## 🎣 useAdaptiveUI Hook

React hook that provides access to the adaptive UI context and methods.

### Return Value

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

### Basic Usage

```tsx
import { useAdaptiveUI } from 'adaptly';

function MyComponent() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    parseUserInputWithLLM,
    isLLMProcessing,
    lastLLMResponse,
  } = useAdaptiveUI();

  const handleAddComponent = () => {
    const newComponent = {
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
    
    addComponent(newComponent);
  };

  const handleAIRequest = async () => {
    await parseUserInputWithLLM('Add a revenue metric card');
  };

  return (
    <div>
      <button onClick={handleAddComponent}>Add Component</button>
      <button onClick={handleAIRequest} disabled={isLLMProcessing}>
        {isLLMProcessing ? 'Processing...' : 'Ask AI'}
      </button>
      {lastLLMResponse && (
        <p>AI Response: {lastLLMResponse}</p>
      )}
    </div>
  );
}
```

### Storage Usage

```tsx
function StorageControls() {
  const {
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
  } = useAdaptiveUI();

  return (
    <div>
      <button onClick={saveToStorage}>Save State</button>
      <button onClick={loadFromStorage}>Load State</button>
      <button onClick={clearStorage}>Clear Storage</button>
      <p>Has stored data: {hasStoredData() ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## 🎨 AdaptiveLayout

Internal component that renders the adaptive UI layout. Not typically used directly by developers.

### Props

```tsx
interface AdaptiveLayoutProps {
  adaptation: UIAdaptation;
  componentRegistry: ComponentRegistry;
  iconRegistry?: IconRegistry;
  className?: string;
  style?: React.CSSProperties;
}
```

### Usage

```tsx
// This is handled automatically by AdaptlyProvider
// You don't need to use this component directly
```

## ⌨️ AdaptiveCommand

Internal component that provides the command interface. Not typically used directly by developers.

### Props

```tsx
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

### Usage

```tsx
// This is handled automatically by AdaptlyProvider
// You don't need to use this component directly
```

## 🔄 LoadingOverlay

Internal component that shows loading state during AI processing. Not typically used directly by developers.

### Props

```tsx
interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}
```

### Usage

```tsx
// This is handled automatically by AdaptlyProvider
// You don't need to use this component directly
```

## 🏗️ Type Definitions

### UIComponent

```tsx
interface UIComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}
```

### UIAdaptation

```tsx
interface UIAdaptation {
  components: UIComponent[];
  layout: "grid" | "flex" | "absolute";
  spacing: number;
  columns: number;
}
```

### AdaptlyConfig

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

```tsx
interface AdaptlyJsonConfig {
  version: string;
  components: Record<string, ComponentJsonConfig>;
}
```

### ComponentJsonConfig

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

```tsx
interface PropJsonConfig {
  type: string;
  required: boolean;
  allowed?: (string | number)[];
}
```

### CustomLoaderComponent

```tsx
interface CustomLoaderProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}

type CustomLoaderComponent = React.ComponentType<CustomLoaderProps>;
```

## 🎯 Component Registry

### ComponentRegistry

```tsx
interface ComponentRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

### IconRegistry

```tsx
interface IconRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

## 🔧 Command Interface

### Command

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

### CommandConfig

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

```tsx
interface CommandHandler {
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM?: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing?: boolean;
  lastLLMResponse?: string;
}
```

## 🚀 Examples

### Complete Dashboard Setup

```tsx
import { AdaptlyProvider } from 'adaptly';
import { useAdaptiveUI } from 'adaptly';
import adaptlyConfig from './adaptly.json';
import { MetricCard, SalesChart, DataTable } from './components';

function Dashboard() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
      provider="google"
      model="gemini-2.0-flash-exp"
      components={{ MetricCard, SalesChart, DataTable }}
      adaptlyConfig={adaptlyConfig}
      enableStorage={true}
      storageKey="dashboard-ui"
      storageVersion="1.0.0"
      aiSuggestions={[
        { value: "Add revenue metrics", label: "💰 Add revenue metrics" },
        { value: "Show sales charts", label: "📊 Show sales charts" },
        { value: "Create data table", label: "📋 Create data table" }
      ]}
      showAISuggestions={true}
      showUtilityCommands={true}
      className="h-full"
    />
  );
}

function DashboardControls() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    parseUserInputWithLLM,
    isLLMProcessing,
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
  } = useAdaptiveUI();

  const handleAIRequest = async (input: string) => {
    await parseUserInputWithLLM(input);
  };

  return (
    <div className="p-4 border-b">
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => handleAIRequest('Add a revenue metric')}
          disabled={isLLMProcessing}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isLLMProcessing ? 'Processing...' : 'Add Revenue Metric'}
        </button>
        <button 
          onClick={() => handleAIRequest('Show sales chart')}
          disabled={isLLMProcessing}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {isLLMProcessing ? 'Processing...' : 'Show Sales Chart'}
        </button>
      </div>
      
      <div className="flex gap-2">
        <button onClick={saveToStorage} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
          Save
        </button>
        <button onClick={loadFromStorage} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
          Load
        </button>
        <button onClick={clearStorage} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
          Clear
        </button>
        <span className="text-sm text-gray-600">
          Stored: {hasStoredData() ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
}
```

### Custom Loader Component

```tsx
function MyCustomLoader({ isVisible, message, subMessage }: CustomLoaderProps) {
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
}

// Use with AdaptlyProvider
<AdaptlyProvider
  // ... other props
  customLoader={MyCustomLoader}
/>
```

## 🚨 Common Issues

### Component Not Found

**Error**: "Component type MetricCard not found in registry"

- **Solution**: Ensure component is properly exported and registered
- **Solution**: Check that component name matches in adaptly.json

### Hook Usage Outside Provider

**Error**: "useAdaptiveUI must be used within an AdaptiveUIProvider"

- **Solution**: Wrap your component with AdaptlyProvider
- **Solution**: Ensure hook is called inside provider context

### Storage Not Working

**Error**: Storage methods return false

- **Solution**: Check that enableStorage is true
- **Solution**: Verify localStorage is available
- **Solution**: Check storage key and version

## 📚 Related Documentation

- **[Hooks API](./hooks.md)** - Detailed hook documentation
- **[Types API](./types.md)** - Complete type definitions
- **[Services API](./services.md)** - Service layer documentation
- **[Component Registry Guide](../component-registry.md)** - Component configuration
- **[Storage Service Guide](../storage-service.md)** - Storage configuration

---

Ready to learn about hooks? Check out the [Hooks API](./hooks.md)!
