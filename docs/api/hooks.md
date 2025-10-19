---
layout: default
title: Hooks API
description: useAdaptiveUI and other React hooks
---

This document provides comprehensive API reference for Adaptly's React hooks and their usage.

## 🎣 useAdaptiveUI

The primary hook that provides access to the adaptive UI context and all related functionality.

### Signature

```tsx
function useAdaptiveUI(): AdaptiveUIContextType
```

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
  } = useAdaptiveUI();

  return (
    <div>
      <p>Components: {adaptation.components.length}</p>
      <button onClick={() => addComponent(newComponent)}>
        Add Component
      </button>
    </div>
  );
}
```

### UI State Management

```tsx
function UIStateExample() {
  const {
    adaptation,
    updateAdaptation,
    addComponent,
    removeComponent,
    updateComponent,
  } = useAdaptiveUI();

  // Update entire adaptation
  const handleLayoutChange = (newLayout: string) => {
    updateAdaptation({ layout: newLayout });
  };

  // Add new component
  const handleAddComponent = () => {
    const newComponent: UIComponent = {
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

  // Remove component
  const handleRemoveComponent = (id: string) => {
    removeComponent(id);
  };

  // Update component
  const handleUpdateComponent = (id: string) => {
    updateComponent(id, {
      props: {
        title: 'Updated Revenue',
        value: '$50,000'
      }
    });
  };

  return (
    <div>
      <button onClick={() => handleLayoutChange('flex')}>
        Switch to Flex Layout
      </button>
      <button onClick={handleAddComponent}>
        Add Metric Card
      </button>
      <button onClick={() => handleRemoveComponent('metric-1')}>
        Remove Component
      </button>
      <button onClick={() => handleUpdateComponent('metric-1')}>
        Update Component
      </button>
    </div>
  );
}
```

### AI Processing

```tsx
function AIProcessingExample() {
  const {
    parseUserInput,
    parseUserInputWithLLM,
    resetToDefault,
    isLLMProcessing,
    lastLLMResponse,
  } = useAdaptiveUI();

  // Basic parsing (fallback)
  const handleBasicInput = (input: string) => {
    parseUserInput(input);
  };

  // LLM-powered parsing
  const handleLLMInput = async (input: string) => {
    try {
      await parseUserInputWithLLM(input);
    } catch (error) {
      console.error('LLM processing failed:', error);
    }
  };

  // Reset to default
  const handleReset = () => {
    resetToDefault();
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Describe what you want..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleLLMInput(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
      
      <button 
        onClick={() => handleLLMInput('Add a revenue metric')}
        disabled={isLLMProcessing}
      >
        {isLLMProcessing ? 'Processing...' : 'Add Revenue Metric'}
      </button>
      
      <button onClick={handleReset}>
        Reset to Default
      </button>
      
      {lastLLMResponse && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <p className="text-sm text-blue-800">
            AI Response: {lastLLMResponse}
          </p>
        </div>
      )}
    </div>
  );
}
```

### Storage Management

```tsx
function StorageExample() {
  const {
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
  } = useAdaptiveUI();

  const handleSave = () => {
    const success = saveToStorage();
    if (success) {
      console.log('UI state saved successfully');
    } else {
      console.error('Failed to save UI state');
    }
  };

  const handleLoad = () => {
    const savedState = loadFromStorage();
    if (savedState) {
      console.log('UI state loaded:', savedState);
    } else {
      console.log('No saved state found');
    }
  };

  const handleClear = () => {
    const success = clearStorage();
    if (success) {
      console.log('Storage cleared');
    } else {
      console.error('Failed to clear storage');
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save State</button>
      <button onClick={handleLoad}>Load State</button>
      <button onClick={handleClear}>Clear Storage</button>
      <p>Has stored data: {hasStoredData() ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Configuration Access

```tsx
function ConfigExample() {
  const { config, currentLLMProvider } = useAdaptiveUI();

  return (
    <div>
      <p>LLM Provider: {currentLLMProvider}</p>
      <p>Storage Enabled: {config?.storage?.enabled ? 'Yes' : 'No'}</p>
      <p>Storage Key: {config?.storage?.key}</p>
      <p>Storage Version: {config?.storage?.version}</p>
    </div>
  );
}
```

## 🔧 Advanced Usage Patterns

### Component Lifecycle Management

```tsx
function ComponentLifecycleExample() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    updateComponent,
  } = useAdaptiveUI();

  // Track component changes
  useEffect(() => {
    console.log('Components changed:', adaptation.components.length);
  }, [adaptation.components]);

  // Auto-save on component changes
  useEffect(() => {
    if (adaptation.components.length > 0) {
      // Auto-save logic here
      console.log('Auto-saving due to component changes');
    }
  }, [adaptation.components]);

  return (
    <div>
      <p>Total components: {adaptation.components.length}</p>
      <p>Layout: {adaptation.layout}</p>
      <p>Spacing: {adaptation.spacing}</p>
      <p>Columns: {adaptation.columns}</p>
    </div>
  );
}
```

### Error Handling

```tsx
function ErrorHandlingExample() {
  const {
    parseUserInputWithLLM,
    isLLMProcessing,
    lastLLMResponse,
  } = useAdaptiveUI();

  const handleAIRequest = async (input: string) => {
    try {
      await parseUserInputWithLLM(input);
    } catch (error) {
      console.error('AI request failed:', error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div>
      <button 
        onClick={() => handleAIRequest('Add a metric')}
        disabled={isLLMProcessing}
      >
        {isLLMProcessing ? 'Processing...' : 'Ask AI'}
      </button>
      
      {lastLLMResponse && (
        <div className={`p-3 rounded ${
          lastLLMResponse.startsWith('Error:') 
            ? 'bg-red-50 text-red-800' 
            : 'bg-green-50 text-green-800'
        }`}>
          {lastLLMResponse}
        </div>
      )}
    </div>
  );
}
```

### Custom Component Management

```tsx
function CustomComponentManagement() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    updateComponent,
  } = useAdaptiveUI();

  // Create component with validation
  const createValidatedComponent = (type: string, props: any) => {
    const component: UIComponent = {
      id: `component-${Date.now()}`,
      type,
      props,
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    };
    
    // Validate component before adding
    if (component.type && component.props) {
      addComponent(component);
      return component.id;
    }
    
    return null;
  };

  // Batch component operations
  const batchAddComponents = (components: UIComponent[]) => {
    components.forEach(component => {
      addComponent(component);
    });
  };

  // Find component by type
  const findComponentsByType = (type: string) => {
    return adaptation.components.filter(comp => comp.type === type);
  };

  return (
    <div>
      <button onClick={() => createValidatedComponent('MetricCard', {
        title: 'Revenue',
        value: '$45,231'
      })}>
        Add Metric Card
      </button>
      
      <button onClick={() => {
        const metricCards = findComponentsByType('MetricCard');
        console.log('Found metric cards:', metricCards.length);
      }}>
        Count Metric Cards
      </button>
    </div>
  );
}
```

### Performance Optimization

```tsx
function PerformanceOptimizedExample() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    updateComponent,
  } = useAdaptiveUI();

  // Memoize expensive operations
  const componentCount = useMemo(() => {
    return adaptation.components.length;
  }, [adaptation.components]);

  const componentTypes = useMemo(() => {
    return [...new Set(adaptation.components.map(comp => comp.type))];
  }, [adaptation.components]);

  // Debounce component updates
  const debouncedUpdateComponent = useCallback(
    debounce((id: string, updates: Partial<UIComponent>) => {
      updateComponent(id, updates);
    }, 300),
    [updateComponent]
  );

  return (
    <div>
      <p>Total components: {componentCount}</p>
      <p>Component types: {componentTypes.join(', ')}</p>
    </div>
  );
}
```

## 🚨 Error Handling

### Common Errors

```tsx
function ErrorHandlingExample() {
  const {
    parseUserInputWithLLM,
    isLLMProcessing,
    lastLLMResponse,
  } = useAdaptiveUI();

  // Handle different error types
  const handleAIRequest = async (input: string) => {
    try {
      await parseUserInputWithLLM(input);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          console.error('API key issue:', error.message);
        } else if (error.message.includes('rate limit')) {
          console.error('Rate limit exceeded:', error.message);
        } else {
          console.error('Unknown error:', error.message);
        }
      }
    }
  };

  return (
    <div>
      <button onClick={() => handleAIRequest('Add a metric')}>
        Test AI Request
      </button>
      
      {lastLLMResponse && (
        <div className={`p-3 rounded ${
          lastLLMResponse.startsWith('Error:') 
            ? 'bg-red-50 text-red-800' 
            : 'bg-green-50 text-green-800'
        }`}>
          {lastLLMResponse}
        </div>
      )}
    </div>
  );
}
```

### Validation

```tsx
function ValidationExample() {
  const { addComponent } = useAdaptiveUI();

  const addValidatedComponent = (component: UIComponent) => {
    // Validate required fields
    if (!component.id || !component.type) {
      console.error('Component missing required fields');
      return false;
    }

    // Validate component type
    const validTypes = ['MetricCard', 'SalesChart', 'DataTable'];
    if (!validTypes.includes(component.type)) {
      console.error('Invalid component type:', component.type);
      return false;
    }

    // Add component
    addComponent(component);
    return true;
  };

  return (
    <div>
      <button onClick={() => addValidatedComponent({
        id: 'test-1',
        type: 'MetricCard',
        props: { title: 'Test', value: '$100' },
        position: { x: 0, y: 0, w: 2, h: 1 },
        visible: true
      })}>
        Add Validated Component
      </button>
    </div>
  );
}
```

## 🔍 Debugging

### Debug Information

```tsx
function DebugExample() {
  const {
    adaptation,
    config,
    currentLLMProvider,
    isLLMProcessing,
    lastLLMResponse,
  } = useAdaptiveUI();

  const debugInfo = {
    componentCount: adaptation.components.length,
    layout: adaptation.layout,
    spacing: adaptation.spacing,
    columns: adaptation.columns,
    llmProvider: currentLLMProvider,
    isProcessing: isLLMProcessing,
    lastResponse: lastLLMResponse,
    storageEnabled: config?.storage?.enabled,
    storageKey: config?.storage?.key,
    storageVersion: config?.storage?.version,
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3>Debug Information</h3>
      <pre className="text-sm">{JSON.stringify(debugInfo, null, 2)}</pre>
    </div>
  );
}
```

### Logging

```tsx
function LoggingExample() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    updateComponent,
  } = useAdaptiveUI();

  // Log component changes
  useEffect(() => {
    console.log('Components updated:', adaptation.components);
  }, [adaptation.components]);

  // Log layout changes
  useEffect(() => {
    console.log('Layout updated:', {
      layout: adaptation.layout,
      spacing: adaptation.spacing,
      columns: adaptation.columns
    });
  }, [adaptation.layout, adaptation.spacing, adaptation.columns]);

  return <div>Check console for logs</div>;
}
```

## 📚 Related Documentation

- **[Core Components API](./core-components.md)** - Component documentation
- **[Types API](./types.md)** - Type definitions
- **[Services API](./services.md)** - Service layer documentation
- **[Component Registry Guide](../component-registry.md)** - Component configuration
- **[Storage Service Guide](../storage-service.md)** - Storage configuration

---

Ready to learn about types? Check out the [Types API](./types.md)!
