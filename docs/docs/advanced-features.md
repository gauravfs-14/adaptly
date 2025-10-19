---
sidebar_position: 6
title: Advanced Features
description: Custom loaders, component validation, command bar customization, and advanced hooks usage
---

# Advanced Features Guide

This guide covers advanced Adaptly features for power users, including custom loaders, component validation, command bar customization, and advanced hooks usage.

## Custom Loaders

### Default Loading Overlay

Adaptly includes a built-in loading overlay that appears during AI processing:

```tsx
<AdaptlyProvider
  // ... other props
  // Loading overlay is enabled by default
/>
```

### Custom Loader Component

Create your own loading overlay with the `customLoader` prop:

```tsx
// Custom loader component
function MyCustomLoader({ isVisible, message, subMessage }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div>
            <h3 className="text-lg font-semibold">{message}</h3>
            <p className="text-gray-600 dark:text-gray-400">{subMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Use custom loader
<AdaptlyProvider
  customLoader={MyCustomLoader}
  // ... other props
/>
```

### Loader Configuration

Customize the loading overlay behavior:

```tsx
<AdaptlyProvider
  // ... other props
  // These props are passed to your custom loader
  loadingOverlay={{
    enabled: true,
    message: "AI is generating your layout...",
    subMessage: "Creating components and arranging them for you"
  }}
/>
```

## Component Validation

### Automatic Validation

Adaptly automatically validates components against your `adaptly.json` schema:

```json
{
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true },
        "change": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}
```

### Validation Rules

**Required Props:**

```tsx
// ✅ Valid - has required props
<MetricCard title="Revenue" value="$45,231" />

// ❌ Invalid - missing required props
<MetricCard value="$45,231" /> // Missing title
```

**Type Validation:**

```tsx
// ✅ Valid - correct types
<MetricCard title="Revenue" value="$45,231" progress={75} />

// ❌ Invalid - wrong types
<MetricCard title="Revenue" value="$45,231" progress="75%" /> // progress should be number
```

**Allowed Values:**

```tsx
// ✅ Valid - allowed value
<MetricCard changeType="positive" />

// ❌ Invalid - not in allowed list
<MetricCard changeType="good" /> // Should be "positive", "negative", or "neutral"
```

### Validation Errors

Adaptly will log validation errors and filter out invalid components:

```tsx
// Check console for validation warnings
console.log("Component validation failed:", component);
```

## Command Bar Customization

### Custom AI Suggestions

Override the default AI suggestions with your own:

```tsx
const customSuggestions = [
  {
    value: "Create a sales dashboard",
    label: "📊 Create a sales dashboard",
    description: "Generate a dashboard with sales metrics and charts"
  },
  {
    value: "Show user analytics",
    label: "👥 Show user analytics", 
    description: "Display user engagement and activity metrics"
  },
  {
    value: "Add revenue metrics",
    label: "💰 Add revenue metrics",
    description: "Include revenue tracking and financial data"
  }
];

<AdaptlyProvider
  aiSuggestions={customSuggestions}
  // ... other props
/>
```

### Command Bar Options

Customize the command bar behavior:

```tsx
<AdaptlyProvider
  showAISuggestions={true}        // Show AI suggestions
  showUtilityCommands={true}      // Show utility commands (reset, etc.)
  // ... other props
/>
```

### Custom Commands

Add your own utility commands:

```tsx
const { parseUserInput } = useAdaptiveUI();

// Custom command handler
const handleCustomCommand = (command: string) => {
  switch (command) {
    case "export data":
      // Export current layout
      break;
    case "import data":
      // Import layout from file
      break;
    case "share layout":
      // Share layout with team
      break;
  }
};

// Use in your component
<button onClick={() => handleCustomCommand("export data")}>
  Export Layout
</button>
```

## Layout Customization

### Default Layout

Set a default layout for your application:

```tsx
const defaultLayout = {
  components: [
    {
      id: "welcome-card",
      type: "EmptyCard",
      props: {
        title: "Welcome to Adaptly!",
        description: "Press ⌘K to describe how you want your dashboard to look."
      },
      position: { x: 0, y: 0, w: 6, h: 2 },
      visible: true
    }
  ],
  layout: "grid" as const,
  spacing: 6,
  columns: 6
};

<AdaptlyProvider
  defaultLayout={defaultLayout}
  // ... other props
/>
```

### Grid Configuration

Customize the grid layout:

```tsx
const gridConfig = {
  components: [],
  layout: "grid" as const,
  spacing: 8,        // Gap between components
  columns: 12        // Number of columns
};

<AdaptlyProvider
  defaultLayout={gridConfig}
  // ... other props
/>
```

### Layout Types

Support different layout types:

```tsx
// Grid layout (default)
const gridLayout = {
  layout: "grid" as const,
  columns: 6,
  spacing: 6
};

// Flex layout
const flexLayout = {
  layout: "flex" as const,
  spacing: 6
};

// Absolute layout
const absoluteLayout = {
  layout: "absolute" as const,
  spacing: 6
};
```

## Advanced Hooks Usage

### useAdaptiveUI Hook

Access all Adaptly functionality through the `useAdaptiveUI` hook:

```tsx
import { useAdaptiveUI } from "adaptly";

function MyComponent() {
  const {
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
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
    currentLLMProvider
  } = useAdaptiveUI();

  // Use any of these methods
  return (
    <div>
      <p>Current provider: {currentLLMProvider}</p>
      <p>Processing: {isLLMProcessing ? "Yes" : "No"}</p>
      {lastLLMResponse && <p>Last response: {lastLLMResponse}</p>}
    </div>
  );
}
```

### Component Management

**Add Components:**

```tsx
const { addComponent } = useAdaptiveUI();

const newComponent = {
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

addComponent(newComponent);
```

**Update Components:**

```tsx
const { updateComponent } = useAdaptiveUI();

// Update component props
updateComponent("metric-1", {
  props: {
    title: "Updated Revenue",
    value: "$50,000"
  }
});

// Update component position
updateComponent("metric-1", {
  position: { x: 2, y: 0, w: 2, h: 1 }
});
```

**Remove Components:**

```tsx
const { removeComponent } = useAdaptiveUI();

removeComponent("metric-1");
```

### Layout Management

**Update Layout:**

```tsx
const { updateAdaptation } = useAdaptiveUI();

// Change layout type
updateAdaptation({
  layout: "flex",
  spacing: 8
});

// Update grid columns
updateAdaptation({
  columns: 12,
  spacing: 4
});
```

### AI Processing

**Basic Input Parsing:**

```tsx
const { parseUserInput } = useAdaptiveUI();

// Simple commands without AI
parseUserInput("reset to default");
parseUserInput("switch to grid layout");
```

**LLM-Powered Parsing:**

```tsx
const { parseUserInputWithLLM } = useAdaptiveUI();

// AI-powered commands
await parseUserInputWithLLM("Create a sales dashboard with revenue metrics");
await parseUserInputWithLLM("Add charts and filter by this week");
```

**Processing Status:**

```tsx
const { isLLMProcessing, lastLLMResponse } = useAdaptiveUI();

if (isLLMProcessing) {
  return <div>AI is thinking...</div>;
}

if (lastLLMResponse) {
  return <div>AI response: {lastLLMResponse}</div>;
}
```

### Storage Management

**Manual Storage Control:**

```tsx
const { saveToStorage, loadFromStorage, clearStorage, hasStoredData } = useAdaptiveUI();

// Save current state
const saved = saveToStorage();

// Load saved state
const savedState = loadFromStorage();

// Clear all data
const cleared = clearStorage();

// Check if data exists
if (hasStoredData()) {
  console.log("Found saved data");
}
```

## Real-World Patterns

### Provider Switching

Implement runtime provider switching:

```tsx
const [selectedProvider, setSelectedProvider] = useState("google");
const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash-exp");

const getApiKey = () => {
  switch (selectedProvider) {
    case "google":
      return process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!;
    case "openai":
      return process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
    case "anthropic":
      return process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!;
    default:
      return "";
  }
};

<AdaptlyProvider
  apiKey={getApiKey()}
  provider={selectedProvider}
  model={selectedModel}
  // ... other props
/>
```

### Theme Integration

Integrate with theme systems:

```tsx
const { adaptation } = useAdaptiveUI();

// Apply theme to components
const themedComponents = adaptation.components.map(component => ({
  ...component,
  props: {
    ...component.props,
    theme: currentTheme,
    darkMode: isDarkMode
  }
}));
```

### Notification Handling

Handle AI responses and errors:

```tsx
const { lastLLMResponse, isLLMProcessing } = useAdaptiveUI();

useEffect(() => {
  if (lastLLMResponse) {
    if (lastLLMResponse.includes("Error:")) {
      showErrorNotification(lastLLMResponse);
    } else {
      showSuccessNotification("Layout updated successfully");
    }
  }
}, [lastLLMResponse]);
```

## Performance Optimization

### Component Memoization

Memoize expensive components:

```tsx
const MemoizedMetricCard = React.memo(MetricCard);

<AdaptlyProvider
  components={{ MetricCard: MemoizedMetricCard }}
  // ... other props
/>
```

### Lazy Loading

Load components lazily:

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

### Storage Optimization

Optimize storage usage:

```tsx
// Use smaller storage keys
<AdaptlyProvider
  storageKey="ui" // Instead of "my-application-ui"
  storageVersion="1.0.0"
  // ... other props
/>
```

## Next Steps

- **[API Reference](api/core-components)** - Complete component documentation
- **[Troubleshooting Guide](troubleshooting)** - Common issues and solutions
- **[Demo Application](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo)** - Full implementation examples

## Example Implementations

- **[Advanced Demo](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo)** - Complete feature implementation
- **[Component Examples](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/src/components)** - Real React components
- **[Configuration Examples](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/adaptly.json)** - Full adaptly.json setup

---

**Ready for the API reference?** Check out the [Core Components API](api/core-components) for complete documentation of all Adaptly components and their props!
