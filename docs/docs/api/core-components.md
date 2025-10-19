---
sidebar_position: 2
title: Core Components API
description: Complete documentation of AdaptlyProvider, AdaptiveLayout, AdaptiveCommand, and other core components
---

# Core Components API Reference

This page documents all core components available in Adaptly, including their props, usage examples, and implementation details.

## AdaptlyProvider

The main provider component that wraps your application and provides AI-powered adaptive UI functionality.

### Props

```typescript
interface AdaptlyProviderProps {
  // Required props
  apiKey: string;
  components: Record<string, React.ComponentType<any>>;
  adaptlyConfig: AdaptlyJsonConfig;
  
  // Optional props
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
    icon?: React.ComponentType<unknown>;
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

### Required Props

#### apiKey

- **Type**: `string`
- **Description**: API key for the LLM provider
- **Example**: `process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!`

#### components

- **Type**: `Record<string, React.ComponentType<any>>`
- **Description**: Registry of React components available to the AI
- **Example**: `{ MetricCard, SalesChart, TeamMembers }`

#### adaptlyConfig

- **Type**: `AdaptlyJsonConfig`
- **Description**: Component registry configuration from adaptly.json
- **Example**: `import adaptlyConfig from "./adaptly.json"`

### Optional Props

#### icons

- **Type**: `Record<string, React.ComponentType<any>>`
- **Default**: `undefined`
- **Description**: Registry of icon components
- **Example**: `{ DollarSign, Users, ShoppingCart }`

#### model

- **Type**: `string`
- **Default**: `"gemini-2.0-flash-exp"`
- **Description**: LLM model to use
- **Examples**:
  - Google: `"gemini-2.0-flash-exp"`, `"gemini-1.5-pro"`
  - OpenAI: `"gpt-4o"`, `"gpt-4o-mini"`
  - Anthropic: `"claude-3-5-sonnet-20241022"`

#### provider

- **Type**: `"google" | "openai" | "anthropic"`
- **Default**: `"google"`
- **Description**: LLM provider to use

#### defaultLayout

- **Type**: `Partial<UIAdaptation>`
- **Default**: `undefined`
- **Description**: Default UI layout when no saved state exists

#### className

- **Type**: `string`
- **Default**: `""`
- **Description**: CSS class name for the container

#### style

- **Type**: `React.CSSProperties`
- **Default**: `{}`
- **Description**: Inline styles for the container

#### aiSuggestions

- **Type**: `Array<{ value: string; label: string; icon?: React.ComponentType<unknown>; description?: string; }>`
- **Default**: `undefined`
- **Description**: Custom AI suggestions for the command bar

#### showAISuggestions

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to show AI suggestions in the command bar

#### showUtilityCommands

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to show utility commands (reset, etc.)

#### customLoader

- **Type**: `CustomLoaderComponent`
- **Default**: `undefined`
- **Description**: Custom loading overlay component

#### enableStorage

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to enable persistent storage

#### storageKey

- **Type**: `string`
- **Default**: `"adaptly-ui"`
- **Description**: Key prefix for localStorage

#### storageVersion

- **Type**: `string`
- **Default**: `"1.0.0"`
- **Description**: Version for data migration

#### children

- **Type**: `React.ReactNode`
- **Default**: `undefined`
- **Description**: Child components

### Usage Examples

#### Basic Usage

```tsx
import { AdaptlyProvider } from "adaptly";
import { MetricCard, SalesChart } from "./components";
import adaptlyConfig from "./adaptly.json";

<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
  provider="google"
  model="gemini-2.0-flash-exp"
  components={{ MetricCard, SalesChart }}
  adaptlyConfig={adaptlyConfig}
/>
```

#### Advanced Configuration

```tsx
<AdaptlyProvider
  apiKey={apiKey}
  provider="openai"
  model="gpt-4o"
  components={{ MetricCard, SalesChart, TeamMembers }}
  icons={{ DollarSign, Users, ShoppingCart }}
  adaptlyConfig={adaptlyConfig}
  defaultLayout={{
    components: [
      {
        id: "welcome",
        type: "EmptyCard",
        props: { title: "Welcome!", description: "Press ⌘K to start" },
        position: { x: 0, y: 0, w: 6, h: 2 },
        visible: true
      }
    ],
    layout: "grid",
    spacing: 6,
    columns: 6
  }}
  enableStorage={true}
  storageKey="my-dashboard"
  storageVersion="1.0.0"
  className="h-full"
  style={{ minHeight: "100vh" }}
/>
```

#### Custom AI Suggestions

```tsx
const customSuggestions = [
  {
    value: "Create a sales dashboard",
    label: "📊 Create a sales dashboard",
    description: "Generate a dashboard with sales metrics"
  },
  {
    value: "Show user analytics",
    label: "👥 Show user analytics",
    description: "Display user engagement metrics"
  }
];

<AdaptlyProvider
  apiKey={apiKey}
  components={components}
  adaptlyConfig={adaptlyConfig}
  aiSuggestions={customSuggestions}
  showAISuggestions={true}
  showUtilityCommands={true}
/>
```

#### Custom Loader

```tsx
function MyCustomLoader({ isVisible, message, subMessage }) {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <h3>{message}</h3>
        <p>{subMessage}</p>
      </div>
    </div>
  );
}

<AdaptlyProvider
  apiKey={apiKey}
  components={components}
  adaptlyConfig={adaptlyConfig}
  customLoader={MyCustomLoader}
/>
```

## AdaptiveUIProvider

Lower-level provider component for advanced usage. Use this when you need more control over the configuration.

### Props

```typescript
interface AdaptiveUIProviderProps {
  children: React.ReactNode;
  config?: AdaptlyConfig;
}
```

### Usage

```tsx
import { AdaptiveUIProvider } from "adaptly";

const config: AdaptlyConfig = {
  enableLLM: true,
  llm: {
    provider: "google",
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!,
    model: "gemini-2.0-flash-exp"
  },
  adaptlyJson: adaptlyConfig,
  storage: {
    enabled: true,
    key: "my-app",
    version: "1.0.0"
  }
};

<AdaptiveUIProvider config={config}>
  <MyApp />
</AdaptiveUIProvider>
```

## AdaptiveLayout

Renders the adaptive UI layout using the component registry.

### Props

```typescript
interface AdaptiveLayoutProps {
  componentRegistry: ComponentRegistry;
  iconRegistry?: IconRegistry;
  className?: string;
  style?: React.CSSProperties;
}
```

### Usage

```tsx
import { AdaptiveLayout } from "adaptly";

<AdaptiveLayout
  componentRegistry={{ MetricCard, SalesChart }}
  iconRegistry={{ DollarSign, Users }}
  className="grid-layout"
  style={{ gap: "1rem" }}
/>
```

## AdaptiveCommand

Command bar component for natural language input.

### Props

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

### Usage

```tsx
import { AdaptiveCommand } from "adaptly";

<AdaptiveCommand
  keyPress="k"
  aiSuggestions={customSuggestions}
  showAISuggestions={true}
  showUtilityCommands={true}
  className="command-bar"
/>
```

## AdaptiveCommandWrapper

Wrapper component that provides command bar functionality with default configuration.

### Props

```typescript
interface AdaptiveCommandWrapperProps {
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
import { AdaptiveCommandWrapper } from "adaptly";

<AdaptiveCommandWrapper
  aiSuggestions={customSuggestions}
  showAISuggestions={true}
  showUtilityCommands={true}
/>
```

## LoadingOverlay

Loading overlay component that appears during AI processing.

### Props

```typescript
interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

### Usage

```tsx
import { LoadingOverlay } from "adaptly";

<LoadingOverlay
  isVisible={isProcessing}
  message="AI is generating your layout..."
  subMessage="Creating components and arranging them for you"
  className="loading-overlay"
/>
```

## Component Implementation Details

### AdaptlyProvider Implementation

The AdaptlyProvider component:

1. **Validates Configuration**: Checks that adaptly.json is properly configured
2. **Initializes Services**: Sets up LLM and storage services
3. **Renders Layout**: Uses AdaptiveLayout to render components
4. **Provides Context**: Makes adaptive UI functionality available via useAdaptiveUI hook

```tsx
export function AdaptlyProvider({
  apiKey,
  components,
  adaptlyConfig,
  // ... other props
}) {
  // Validate configuration
  const validatedConfig = validateAdaptlyConfig(adaptlyConfig);
  
  // Create configuration object
  const config: AdaptlyConfig = {
    enableLLM: true,
    llm: { provider, apiKey, model },
    adaptlyJson: validatedConfig,
    storage: { enabled: enableStorage, key: storageKey, version: storageVersion },
    // ... other config
  };
  
  return (
    <AdaptiveUIProvider config={config}>
      <div className={`adaptly-container ${className}`} style={style}>
        <AdaptiveLayout componentRegistry={components} iconRegistry={icons} />
        <AdaptiveCommandWrapper
          aiSuggestions={aiSuggestions}
          showAISuggestions={showAISuggestions}
          showUtilityCommands={showUtilityCommands}
        />
        {children}
      </div>
    </AdaptiveUIProvider>
  );
}
```

### AdaptiveLayout Implementation

The AdaptiveLayout component:

1. **Renders Components**: Maps over the adaptation components
2. **Handles Missing Components**: Shows error for missing components
3. **Applies Grid Layout**: Uses CSS Grid for positioning
4. **Filters Props**: Removes problematic props before passing to components

```tsx
export function AdaptiveLayout({ adaptation, componentRegistry }) {
  const renderComponent = useCallback((component) => {
    const Component = componentRegistry[component.type];
    if (!Component) {
      return <div>Component {component.type} not found</div>;
    }
    
    // Filter props to remove problematic objects
    const safeProps = { ...component.props };
    // ... prop filtering logic
    
    return <Component {...safeProps} />;
  }, [componentRegistry]);
  
  return (
    <div className="adaptive-layout" style={gridStyle}>
      {adaptation.components.map(renderComponent)}
    </div>
  );
}
```

## Error Handling

### Component Not Found

When a component type is not found in the registry:

```tsx
// Shows error message
<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
  <p className="text-red-600 text-sm">
    Component {component.type} not found
  </p>
</div>
```

### Invalid Configuration

When adaptly.json is invalid:

```tsx
// Throws error during initialization
throw new Error("adaptly.json must define at least one component");
```

### Missing API Key

When API key is not provided:

```tsx
// LLM service will not initialize
if (!apiKey) {
  console.warn("API key is required for LLM functionality");
}
```

## Performance Considerations

### Component Memoization

Memoize expensive components to prevent unnecessary re-renders:

```tsx
const MemoizedMetricCard = React.memo(MetricCard);

<AdaptlyProvider
  components={{ MetricCard: MemoizedMetricCard }}
  // ... other props
/>
```

### Lazy Loading

Load components lazily to reduce initial bundle size:

```tsx
const LazyChart = React.lazy(() => import("./components/Chart"));

<AdaptlyProvider
  components={{ 
    MetricCard,
    Chart: LazyChart 
  }}
  // ... other props
/>
```

## Best Practices

### 1. Component Registry

```tsx
// ✅ Good - descriptive component names
const components = {
  MetricCard,
  SalesChart,
  TeamMembers,
  DataTable: OrdersTable
};

// ❌ Avoid - generic names
const components = {
  Card,
  Chart,
  List
};
```

### 2. Icon Registry

```tsx
// ✅ Good - semantic icon names
const icons = {
  DollarSign,
  Users,
  ShoppingCart,
  Activity
};

// ❌ Avoid - generic names
const icons = {
  Icon1,
  Icon2,
  Icon3
};
```

### 3. Configuration

```tsx
// ✅ Good - complete configuration
<AdaptlyProvider
  apiKey={apiKey}
  provider="google"
  model="gemini-2.0-flash-exp"
  components={components}
  adaptlyConfig={adaptlyConfig}
  enableStorage={true}
  storageKey="my-app"
  storageVersion="1.0.0"
/>

// ❌ Avoid - missing required props
<AdaptlyProvider
  apiKey={apiKey}
  components={components}
  // Missing adaptlyConfig
/>
```

## Related Documentation

- **[Hooks API](../api/hooks)** - useAdaptiveUI hook documentation
- **[Services API](../api/services)** - Service documentation
- **[Types API](../api/types)** - TypeScript interfaces

---

**Ready for hooks documentation?** Check out the [Hooks API](../api/hooks) for complete documentation of the useAdaptiveUI hook and other React hooks!
