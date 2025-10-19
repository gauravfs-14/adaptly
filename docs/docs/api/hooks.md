---
sidebar_position: 3
title: Hooks API
description: Complete documentation of useAdaptiveUI hook and other React hooks for Adaptly
---

# Hooks API Reference

This page documents all React hooks available in Adaptly, including the main `useAdaptiveUI` hook and its methods.

## useAdaptiveUI

The main hook for accessing Adaptly functionality. Provides access to the current UI state, component management, AI processing, and storage operations.

### Interface

```typescript
interface AdaptiveUIContextType {
  // UI State
  adaptation: UIAdaptation;
  updateAdaptation: (adaptation: Partial<UIAdaptation>) => void;
  
  // Component Management
  addComponent: (component: UIComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<UIComponent>) => void;
  
  // AI Processing
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing: boolean;
  lastLLMResponse?: string;
  
  // Configuration
  config?: AdaptlyConfig;
  
  // Storage Methods
  saveToStorage: () => boolean;
  loadFromStorage: () => UIAdaptation | null;
  clearStorage: () => boolean;
  hasStoredData: () => boolean;
  
  // LLM Provider Info
  currentLLMProvider?: string;
}
```

### Usage

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

## UI State Management

### adaptation

**Type**: `UIAdaptation`

**Description**: Current UI adaptation state containing all components and layout information.

**Example**:

```tsx
const { adaptation } = useAdaptiveUI();

console.log("Current components:", adaptation.components);
console.log("Layout type:", adaptation.layout);
console.log("Grid columns:", adaptation.columns);
```

### updateAdaptation

**Type**: `(updates: Partial<UIAdaptation>) => void`

**Description**: Updates the UI adaptation with partial changes. Automatically saves to storage if enabled.

**Parameters**:

- `updates`: Partial UI adaptation object

**Example**:

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

## Component Management

### addComponent

**Type**: `(component: UIComponent) => void`

**Description**: Adds a new component to the UI adaptation. Automatically saves to storage if enabled.

**Parameters**:

- `component`: UIComponent object to add

**Example**:

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

### removeComponent

**Type**: `(id: string) => void`

**Description**: Removes a component from the UI adaptation by ID. Automatically saves to storage if enabled.

**Parameters**:

- `id`: Component ID to remove

**Example**:

```tsx
const { removeComponent } = useAdaptiveUI();

// Remove component by ID
removeComponent("metric-1");
```

### updateComponent

**Type**: `(id: string, updates: Partial<UIComponent>) => void`

**Description**: Updates an existing component with partial changes. Automatically saves to storage if enabled.

**Parameters**:

- `id`: Component ID to update
- `updates`: Partial component object

**Example**:

```tsx
const { updateComponent } = useAdaptiveUI();

// Update component props
updateComponent("metric-1", {
  props: {
    title: "Updated Revenue",
    value: "$50,000",
    change: "+25.5%"
  }
});

// Update component position
updateComponent("metric-1", {
  position: { x: 2, y: 0, w: 2, h: 1 }
});

// Update component visibility
updateComponent("metric-1", {
  visible: false
});
```

## AI Processing

### parseUserInput

**Type**: `(input: string) => void`

**Description**: Processes user input using basic command parsing (no AI). Useful for simple commands like "reset" or "grid layout".

**Parameters**:

- `input`: User input string

**Example**:

```tsx
const { parseUserInput } = useAdaptiveUI();

// Simple commands without AI
parseUserInput("reset to default");
parseUserInput("switch to grid layout");
parseUserInput("switch to flex layout");
```

### parseUserInputWithLLM

**Type**: `(input: string) => Promise<void>`

**Description**: Processes user input using AI/LLM for intelligent component selection and layout generation.

**Parameters**:

- `input`: Natural language input string

**Example**:

```tsx
const { parseUserInputWithLLM } = useAdaptiveUI();

// AI-powered commands
await parseUserInputWithLLM("Create a sales dashboard with revenue metrics");
await parseUserInputWithLLM("Add charts and filter by this week");
await parseUserInputWithLLM("Show user analytics for this month");
```

### resetToDefault

**Type**: `() => void`

**Description**: Resets the UI adaptation to the default layout. Clears storage if enabled.

**Example**:

```tsx
const { resetToDefault } = useAdaptiveUI();

// Reset to default layout
resetToDefault();
```

### isLLMProcessing

**Type**: `boolean`

**Description**: Indicates whether the LLM is currently processing a request.

**Example**:

```tsx
const { isLLMProcessing } = useAdaptiveUI();

if (isLLMProcessing) {
  return <div>AI is thinking...</div>;
}
```

### lastLLMResponse

**Type**: `string | undefined`

**Description**: The last response from the LLM, including reasoning or error messages.

**Example**:

```tsx
const { lastLLMResponse } = useAdaptiveUI();

if (lastLLMResponse) {
  return (
    <div className="ai-response">
      <h3>AI Response:</h3>
      <p>{lastLLMResponse}</p>
    </div>
  );
}
```

## Storage Methods

### saveToStorage

**Type**: `() => boolean`

**Description**: Manually saves the current UI adaptation to localStorage.

**Returns**: `true` if successful, `false` if failed

**Example**:

```tsx
const { saveToStorage } = useAdaptiveUI();

const handleSave = () => {
  const saved = saveToStorage();
  if (saved) {
    console.log("UI state saved successfully");
  } else {
    console.log("Failed to save UI state");
  }
};
```

### loadFromStorage

**Type**: `() => UIAdaptation | null`

**Description**: Manually loads the saved UI adaptation from localStorage.

**Returns**: Saved adaptation object or `null` if none exists

**Example**:

```tsx
const { loadFromStorage } = useAdaptiveUI();

const handleLoad = () => {
  const savedState = loadFromStorage();
  if (savedState) {
    console.log("Loaded saved state:", savedState);
  } else {
    console.log("No saved state found");
  }
};
```

### clearStorage

**Type**: `() => boolean`

**Description**: Clears all saved UI adaptation data from localStorage.

**Returns**: `true` if successful, `false` if failed

**Example**:

```tsx
const { clearStorage } = useAdaptiveUI();

const handleClear = () => {
  const cleared = clearStorage();
  if (cleared) {
    console.log("Storage cleared successfully");
  } else {
    console.log("Failed to clear storage");
  }
};
```

### hasStoredData

**Type**: `() => boolean`

**Description**: Checks if there is saved data in localStorage.

**Returns**: `true` if data exists, `false` if not

**Example**:

```tsx
const { hasStoredData } = useAdaptiveUI();

if (hasStoredData()) {
  console.log("Found saved data");
} else {
  console.log("No saved data found");
}
```

## Configuration and Provider Info

### config

**Type**: `AdaptlyConfig | undefined`

**Description**: Current Adaptly configuration object.

**Example**:

```tsx
const { config } = useAdaptiveUI();

if (config) {
  console.log("LLM enabled:", config.enableLLM);
  console.log("Storage enabled:", config.storage?.enabled);
}
```

### currentLLMProvider

**Type**: `string | undefined`

**Description**: Current LLM provider being used.

**Example**:

```tsx
const { currentLLMProvider } = useAdaptiveUI();

console.log("Current provider:", currentLLMProvider); // "google", "openai", or "anthropic"
```

## Usage Examples

### Basic Component Management

```tsx
import { useAdaptiveUI } from "adaptly";

function DashboardControls() {
  const { 
    adaptation, 
    addComponent, 
    removeComponent, 
    updateComponent 
  } = useAdaptiveUI();

  const addMetric = () => {
    const newMetric = {
      id: `metric-${Date.now()}`,
      type: "MetricCard",
      props: {
        title: "New Metric",
        value: "$0",
        change: "0%"
      },
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    };
    addComponent(newMetric);
  };

  const removeMetric = (id: string) => {
    removeComponent(id);
  };

  const updateMetric = (id: string, title: string) => {
    updateComponent(id, {
      props: { title }
    });
  };

  return (
    <div>
      <button onClick={addMetric}>Add Metric</button>
      {adaptation.components.map(component => (
        <div key={component.id}>
          <span>{component.props.title}</span>
          <button onClick={() => removeMetric(component.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### AI Processing with Status

```tsx
import { useAdaptiveUI } from "adaptly";

function AIInterface() {
  const { 
    parseUserInputWithLLM, 
    isLLMProcessing, 
    lastLLMResponse 
  } = useAdaptiveUI();

  const handleAICommand = async (command: string) => {
    try {
      await parseUserInputWithLLM(command);
    } catch (error) {
      console.error("AI processing failed:", error);
    }
  };

  return (
    <div>
      <button 
        onClick={() => handleAICommand("Create a sales dashboard")}
        disabled={isLLMProcessing}
      >
        {isLLMProcessing ? "Processing..." : "Create Dashboard"}
      </button>
      
      {lastLLMResponse && (
        <div className="ai-response">
          <h3>AI Response:</h3>
          <p>{lastLLMResponse}</p>
        </div>
      )}
    </div>
  );
}
```

### Storage Management

```tsx
import { useAdaptiveUI } from "adaptly";

function StorageControls() {
  const { 
    saveToStorage, 
    loadFromStorage, 
    clearStorage, 
    hasStoredData 
  } = useAdaptiveUI();

  const handleSave = () => {
    const saved = saveToStorage();
    alert(saved ? "Saved successfully!" : "Save failed");
  };

  const handleLoad = () => {
    const savedState = loadFromStorage();
    if (savedState) {
      alert("Loaded saved state!");
    } else {
      alert("No saved state found");
    }
  };

  const handleClear = () => {
    const cleared = clearStorage();
    alert(cleared ? "Storage cleared!" : "Clear failed");
  };

  return (
    <div>
      <button onClick={handleSave}>Save State</button>
      <button onClick={handleLoad} disabled={!hasStoredData()}>
        Load State
      </button>
      <button onClick={handleClear}>Clear Storage</button>
    </div>
  );
}
```

### Layout Management

```tsx
import { useAdaptiveUI } from "adaptly";

function LayoutControls() {
  const { updateAdaptation, resetToDefault } = useAdaptiveUI();

  const switchToGrid = () => {
    updateAdaptation({
      layout: "grid",
      columns: 6,
      spacing: 6
    });
  };

  const switchToFlex = () => {
    updateAdaptation({
      layout: "flex",
      spacing: 8
    });
  };

  const increaseColumns = () => {
    updateAdaptation(prev => ({
      columns: prev.columns + 2
    }));
  };

  return (
    <div>
      <button onClick={switchToGrid}>Grid Layout</button>
      <button onClick={switchToFlex}>Flex Layout</button>
      <button onClick={increaseColumns}>More Columns</button>
      <button onClick={resetToDefault}>Reset</button>
    </div>
  );
}
```

## Error Handling

### Hook Usage Errors

```tsx
// ❌ Error - useAdaptiveUI must be used within AdaptlyProvider
function MyComponent() {
  const { adaptation } = useAdaptiveUI(); // Throws error
  return <div>{adaptation.components.length}</div>;
}

// ✅ Correct - use within AdaptlyProvider
function App() {
  return (
    <AdaptlyProvider apiKey={apiKey} components={components} adaptlyConfig={config}>
      <MyComponent />
    </AdaptlyProvider>
  );
}
```

### Component Validation Errors

```tsx
const { addComponent } = useAdaptiveUI();

// ❌ Invalid component - missing required fields
const invalidComponent = {
  type: "MetricCard",
  // Missing id, props, position, visible
};

addComponent(invalidComponent); // Will be filtered out

// ✅ Valid component
const validComponent = {
  id: "metric-1",
  type: "MetricCard",
  props: { title: "Revenue", value: "$45,231" },
  position: { x: 0, y: 0, w: 2, h: 1 },
  visible: true
};

addComponent(validComponent); // Will be added
```

## Performance Considerations

### Memoization

Use React.memo to prevent unnecessary re-renders:

```tsx
const MemoizedComponent = React.memo(({ adaptation }) => {
  const { updateAdaptation } = useAdaptiveUI();
  
  return (
    <div>
      {adaptation.components.map(component => (
        <div key={component.id}>{component.type}</div>
      ))}
    </div>
  );
});
```

### Conditional Rendering

Only render expensive components when needed:

```tsx
function ConditionalComponent() {
  const { isLLMProcessing } = useAdaptiveUI();
  
  if (isLLMProcessing) {
    return <div>Loading...</div>;
  }
  
  return <ExpensiveComponent />;
}
```

## Related Documentation

- **[Core Components API](../api/core-components)** - Component documentation
- **[Services API](../api/services)** - Service documentation
- **[Types API](../api/types)** - TypeScript interfaces

---

**Ready for services documentation?** Check out the [Services API](../api/services) for complete documentation of Adaptly's service layer!
