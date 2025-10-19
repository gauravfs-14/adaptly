# Hooks API Reference

This document provides comprehensive API reference for Adaptly's React hooks, which allow you to interact with the adaptive UI system programmatically.

## 🎣 useAdaptiveUI

The primary hook for accessing and controlling the adaptive UI system.

### Signature

```typescript
function useAdaptiveUI(): AdaptiveUIContextType
```

### Return Value

```typescript
interface AdaptiveUIContextType {
  // Layout state
  adaptation: UIAdaptation;
  updateAdaptation: (adaptation: Partial<UIAdaptation>) => void;
  
  // Component management
  addComponent: (component: UIComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<UIComponent>) => void;
  
  // AI processing
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM: (input: string) => Promise<void>;
  resetToDefault: () => void;
  
  // State
  isLLMProcessing: boolean;
  lastLLMResponse?: string;
  config?: AdaptlyConfig;
}
```

### Basic Usage

```tsx
import { useAdaptiveUI } from 'adaptly';

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
    lastLLMResponse
  } = useAdaptiveUI();

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}
```

### Layout Management

#### Getting Current Layout

```tsx
function LayoutViewer() {
  const { adaptation } = useAdaptiveUI();
  
  return (
    <div>
      <h3>Current Layout</h3>
      <p>Layout Type: {adaptation.layout}</p>
      <p>Columns: {adaptation.columns}</p>
      <p>Spacing: {adaptation.spacing}</p>
      <p>Components: {adaptation.components.length}</p>
    </div>
  );
}
```

#### Updating Layout

```tsx
function LayoutController() {
  const { updateAdaptation } = useAdaptiveUI();
  
  const switchToGrid = () => {
    updateAdaptation({
      layout: 'grid',
      columns: 6,
      spacing: 6
    });
  };
  
  const switchToFlex = () => {
    updateAdaptation({
      layout: 'flex',
      spacing: 4
    });
  };
  
  return (
    <div>
      <button onClick={switchToGrid}>Grid Layout</button>
      <button onClick={switchToFlex}>Flex Layout</button>
    </div>
  );
}
```

### Component Management

#### Adding Components

```tsx
function ComponentAdder() {
  const { addComponent } = useAdaptiveUI();
  
  const addMetricCard = () => {
    addComponent({
      id: 'metric-' + Date.now(),
      type: 'MetricCard',
      props: {
        title: 'New Metric',
        value: '123',
        change: '+5%',
        changeType: 'positive'
      },
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    });
  };
  
  return (
    <button onClick={addMetricCard}>
      Add Metric Card
    </button>
  );
}
```

#### Removing Components

```tsx
function ComponentRemover({ componentId }: { componentId: string }) {
  const { removeComponent } = useAdaptiveUI();
  
  const handleRemove = () => {
    removeComponent(componentId);
  };
  
  return (
    <button onClick={handleRemove}>
      Remove Component
    </button>
  );
}
```

#### Updating Components

```tsx
function ComponentUpdater({ componentId }: { componentId: string }) {
  const { updateComponent } = useAdaptiveUI();
  
  const updatePosition = () => {
    updateComponent(componentId, {
      position: { x: 2, y: 1, w: 3, h: 2 }
    });
  };
  
  const updateProps = () => {
    updateComponent(componentId, {
      props: {
        title: 'Updated Title',
        value: 'Updated Value'
      }
    });
  };
  
  return (
    <div>
      <button onClick={updatePosition}>Update Position</button>
      <button onClick={updateProps}>Update Props</button>
    </div>
  );
}
```

### AI Processing

#### Basic Input Processing

```tsx
function BasicInputProcessor() {
  const { parseUserInput } = useAdaptiveUI();
  
  const handleInput = (input: string) => {
    parseUserInput(input);
  };
  
  return (
    <div>
      <input 
        placeholder="Enter command..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleInput(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
}
```

#### LLM-Powered Processing

```tsx
function LLMInputProcessor() {
  const { parseUserInputWithLLM, isLLMProcessing, lastLLMResponse } = useAdaptiveUI();
  
  const handleLLMInput = async (input: string) => {
    try {
      await parseUserInputWithLLM(input);
    } catch (error) {
      console.error('LLM processing failed:', error);
    }
  };
  
  return (
    <div>
      <input 
        placeholder="Describe what you want..."
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await handleLLMInput(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
      
      {isLLMProcessing && (
        <div className="text-blue-600">AI is thinking...</div>
      )}
      
      {lastLLMResponse && (
        <div className="text-gray-600">{lastLLMResponse}</div>
      )}
    </div>
  );
}
```

#### Resetting Layout

```tsx
function LayoutReset() {
  const { resetToDefault } = useAdaptiveUI();
  
  return (
    <button onClick={resetToDefault}>
      Reset to Default Layout
    </button>
  );
}
```

### Advanced Usage Patterns

#### Custom Component Factory

```tsx
function ComponentFactory() {
  const { addComponent } = useAdaptiveUI();
  
  const createMetricCard = (title: string, value: string, change?: string) => {
    addComponent({
      id: `metric-${title.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'MetricCard',
      props: {
        title,
        value,
        change,
        changeType: change?.startsWith('+') ? 'positive' : 'negative'
      },
      position: { x: 0, y: 0, w: 2, h: 1 },
      visible: true
    });
  };
  
  return (
    <div>
      <button onClick={() => createMetricCard('Revenue', '$45,231', '+20.1%')}>
        Add Revenue Metric
      </button>
      <button onClick={() => createMetricCard('Users', '1,234', '+5.2%')}>
        Add Users Metric
      </button>
    </div>
  );
}
```

#### Layout Persistence

```tsx
function LayoutPersistence() {
  const { adaptation, updateAdaptation } = useAdaptiveUI();
  
  // Save layout to localStorage
  const saveLayout = () => {
    localStorage.setItem('adaptly-layout', JSON.stringify(adaptation));
  };
  
  // Load layout from localStorage
  const loadLayout = () => {
    const saved = localStorage.getItem('adaptly-layout');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        updateAdaptation(parsed);
      } catch (error) {
        console.error('Failed to load layout:', error);
      }
    }
  };
  
  return (
    <div>
      <button onClick={saveLayout}>Save Layout</button>
      <button onClick={loadLayout}>Load Layout</button>
    </div>
  );
}
```

#### Conditional Component Rendering

```tsx
function ConditionalRenderer() {
  const { adaptation } = useAdaptiveUI();
  const userRole = useUserRole(); // Your custom hook
  
  const filteredComponents = adaptation.components.filter(component => {
    // Hide admin components for non-admin users
    if (component.type === 'AdminPanel' && userRole !== 'admin') {
      return false;
    }
    
    // Hide sensitive components for non-privileged users
    if (component.type === 'SensitiveData' && !userRole.includes('privileged')) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="grid gap-4">
      {filteredComponents.map(component => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
}
```

## 🔧 useAdaptiveCommand

Hook for managing the command interface programmatically.

### Signature

```typescript
function useAdaptiveCommand(
  handler: CommandHandler,
  config?: CommandConfig
): AdaptiveCommandReturn
```

### Parameters

```typescript
interface CommandHandler {
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM?: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing?: boolean;
  lastLLMResponse?: string;
}

interface CommandConfig {
  keyPress?: string;
  commands?: Command[];
  enableLLM?: boolean;
  placeholder?: string;
  emptyMessage?: string;
}
```

### Return Value

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

### Basic Usage

```tsx
import { useAdaptiveCommand } from 'adaptly';

function CustomCommandInterface() {
  const {
    parseUserInput,
    parseUserInputWithLLM,
    resetToDefault,
    isLLMProcessing,
    lastLLMResponse
  } = useAdaptiveUI();
  
  const {
    open,
    setOpen,
    input,
    setInput,
    handleSelect,
    handleKeyDown,
    getCommands
  } = useAdaptiveCommand({
    parseUserInput,
    parseUserInputWithLLM,
    resetToDefault,
    isLLMProcessing,
    lastLLMResponse
  });
  
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Open Command Interface
      </button>
      
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="w-full p-2 border rounded"
            />
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Advanced Usage

```tsx
function AdvancedCommandInterface() {
  const adaptiveUI = useAdaptiveUI();
  
  const {
    open,
    setOpen,
    input,
    setInput,
    handleSelect,
    getCommands,
    getFilteredCommands
  } = useAdaptiveCommand(adaptiveUI, {
    keyPress: 'k',
    placeholder: 'Describe what you want to create...',
    emptyMessage: 'Try describing your ideal dashboard',
    commands: [
      {
        id: 'custom-reset',
        label: 'Custom Reset',
        description: 'Reset with custom logic',
        icon: RotateCcw,
        action: 'custom-reset',
        category: 'utility'
      }
    ]
  });
  
  const commands = getCommands();
  const filteredCommands = getFilteredCommands();
  
  return (
    <div>
      {/* Your custom command interface */}
    </div>
  );
}
```

## 🎨 Custom Hooks

### useComponentRegistry

```tsx
function useComponentRegistry() {
  const { config } = useAdaptiveUI();
  
  const getComponentMetadata = (componentName: string) => {
    return config?.adaptlyJson?.components[componentName];
  };
  
  const getComponentsByCategory = (category: string) => {
    const components = config?.adaptlyJson?.components || {};
    return Object.entries(components)
      .filter(([_, metadata]) => metadata.category === category)
      .map(([name, metadata]) => ({ name, ...metadata }));
  };
  
  const getComponentsByUseCase = (useCase: string) => {
    const components = config?.adaptlyJson?.components || {};
    return Object.entries(components)
      .filter(([_, metadata]) => metadata.useCases.includes(useCase))
      .map(([name, metadata]) => ({ name, ...metadata }));
  };
  
  return {
    getComponentMetadata,
    getComponentsByCategory,
    getComponentsByUseCase
  };
}
```

### useLayoutHistory

```tsx
function useLayoutHistory() {
  const { adaptation, updateAdaptation } = useAdaptiveUI();
  const [history, setHistory] = useState<UIAdaptation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  const saveLayout = () => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(adaptation);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };
  
  const undo = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      updateAdaptation(history[newIndex]);
    }
  };
  
  const redo = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateAdaptation(history[newIndex]);
    }
  };
  
  return {
    saveLayout,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1
  };
}
```

### useComponentValidation

```tsx
function useComponentValidation() {
  const { adaptation } = useAdaptiveUI();
  const { getComponentMetadata } = useComponentRegistry();
  
  const validateComponent = (component: UIComponent) => {
    const metadata = getComponentMetadata(component.type);
    if (!metadata) {
      return { valid: false, error: 'Component not found in registry' };
    }
    
    // Validate required props
    const requiredProps = Object.entries(metadata.props)
      .filter(([_, prop]) => prop.required)
      .map(([name, _]) => name);
    
    const missingProps = requiredProps.filter(prop => !(prop in component.props));
    if (missingProps.length > 0) {
      return { 
        valid: false, 
        error: `Missing required props: ${missingProps.join(', ')}` 
      };
    }
    
    // Validate prop types
    for (const [propName, propValue] of Object.entries(component.props)) {
      const propDef = metadata.props[propName];
      if (propDef) {
        const expectedType = propDef.type;
        const actualType = typeof propValue;
        
        if (expectedType === 'array' && !Array.isArray(propValue)) {
          return { 
            valid: false, 
            error: `Prop ${propName} should be an array` 
          };
        }
        
        if (expectedType === 'object' && (actualType !== 'object' || Array.isArray(propValue))) {
          return { 
            valid: false, 
            error: `Prop ${propName} should be an object` 
          };
        }
      }
    }
    
    return { valid: true };
  };
  
  const validateAllComponents = () => {
    return adaptation.components.map(component => ({
      component,
      validation: validateComponent(component)
    }));
  };
  
  return {
    validateComponent,
    validateAllComponents
  };
}
```

## 🧪 Testing Hooks

### Testing useAdaptiveUI

```tsx
import { renderHook, act } from '@testing-library/react';
import { AdaptlyProvider } from 'adaptly';
import { useAdaptiveUI } from 'adaptly';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AdaptlyProvider
    apiKey="test-key"
    components={{}}
    adaptlyConfig={testConfig}
  >
    {children}
  </AdaptlyProvider>
);

test('useAdaptiveUI returns correct initial state', () => {
  const { result } = renderHook(() => useAdaptiveUI(), { wrapper });
  
  expect(result.current.adaptation).toBeDefined();
  expect(result.current.isLLMProcessing).toBe(false);
  expect(result.current.lastLLMResponse).toBeUndefined();
});

test('addComponent adds component to layout', () => {
  const { result } = renderHook(() => useAdaptiveUI(), { wrapper });
  
  act(() => {
    result.current.addComponent({
      id: 'test-component',
      type: 'TestComponent',
      props: { title: 'Test' },
      position: { x: 0, y: 0, w: 1, h: 1 },
      visible: true
    });
  });
  
  expect(result.current.adaptation.components).toHaveLength(1);
  expect(result.current.adaptation.components[0].id).toBe('test-component');
});
```

### Testing useAdaptiveCommand

```tsx
test('useAdaptiveCommand handles command selection', async () => {
  const mockHandler = {
    parseUserInput: jest.fn(),
    parseUserInputWithLLM: jest.fn(),
    resetToDefault: jest.fn(),
    isLLMProcessing: false,
    lastLLMResponse: undefined
  };
  
  const { result } = renderHook(() => useAdaptiveCommand(mockHandler));
  
  await act(async () => {
    await result.current.handleSelect('test command');
  });
  
  expect(mockHandler.parseUserInput).toHaveBeenCalledWith('test command');
});
```

## 🆘 Troubleshooting

### Common Issues

**Hook not working:**

- Ensure component is wrapped in `AdaptlyProvider`
- Check that the hook is called within the provider context
- Verify the hook is imported correctly

**State not updating:**

- Check that state updates are wrapped in `act()`
- Verify the component is re-rendering
- Check for console errors

**LLM processing not working:**

- Verify API key is provided
- Check network connectivity
- Ensure LLM service is properly configured

### Debug Tools

```tsx
// Enable debug logging
const { adaptation, isLLMProcessing, lastLLMResponse } = useAdaptiveUI();

console.log('Current adaptation:', adaptation);
console.log('LLM processing:', isLLMProcessing);
console.log('Last response:', lastLLMResponse);
```

## 📚 Next Steps

Now that you understand the hooks API:

1. **Read the [Core Components API](./core-components.md)** - Learn about the main components
2. **Check out the [Services API](./services.md)** - Understand the underlying services
3. **Explore [Custom Components](./custom-components.md)** - Build your own components
4. **Try the [Basic Dashboard Tutorial](../tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to dive deeper?** Check out the [Services API](./services.md) to understand the underlying services!
