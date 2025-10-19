# Core Components API Reference

This document provides comprehensive API reference for Adaptly's core components: `AdaptlyProvider`, `AdaptiveLayout`, and `AdaptiveCommand`.

## 🏗️ AdaptlyProvider

The main provider component that wraps your application and provides AI-powered adaptive functionality.

### Props

```typescript
interface AdaptlyProviderProps {
  // Required props
  apiKey: string;
  components: ComponentRegistry;
  adaptlyConfig: AdaptlyJsonConfig;
  
  // Optional props
  icons?: IconRegistry;
  defaultLayout?: Partial<UIAdaptation>;
  customLoader?: CustomLoaderComponent;
  className?: string;
  style?: React.CSSProperties;
  
  // Configuration
  llm?: LLMConfig;
  registry?: RegistryConfig;
  enableLLM?: boolean;
  loadingOverlay?: LoadingOverlayConfig;
  logging?: LoggingConfig;
}
```

### Basic Usage

```tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from './adaptly.json';

<AdaptlyProvider
  apiKey="your-gemini-api-key"
  components={{
    MetricCard,
    SalesChart,
    DataTable,
  }}
  adaptlyConfig={adaptlyConfig}
>
  {/* Your app content */}
</AdaptlyProvider>
```

### Advanced Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}
  components={componentRegistry}
  adaptlyConfig={adaptlyConfig}
  icons={{
    DollarSign,
    Users,
    ShoppingCart,
  }}
  defaultLayout={{
    components: [
      {
        id: 'welcome',
        type: 'WelcomeCard',
        props: { title: 'Welcome!', description: 'Get started with ⌘K' },
        position: { x: 0, y: 0, w: 6, h: 2 },
        visible: true,
      }
    ],
    layout: 'grid',
    spacing: 6,
    columns: 6,
  }}
  customLoader={MyCustomLoader}
  enableLLM={true}
  logging={{
    enabled: true,
    level: 'debug'
  }}
  loadingOverlay={{
    enabled: true,
    message: 'AI is thinking...',
    subMessage: 'Generating your layout'
  }}
>
  {/* Your app content */}
</AdaptlyProvider>
```

### Configuration Options

#### LLM Configuration

```typescript
interface LLMConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
```

#### Registry Configuration

```typescript
interface RegistryConfig {
  components: ComponentMetadata[];
  categories: Record<string, unknown>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}
```

#### Loading Overlay Configuration

```typescript
interface LoadingOverlayConfig {
  enabled?: boolean;
  message?: string;
  subMessage?: string;
  customLoader?: CustomLoaderComponent;
}
```

#### Logging Configuration

```typescript
interface LoggingConfig {
  enabled?: boolean;
  level?: 'debug' | 'info' | 'warn' | 'error';
}
```

## 🎨 AdaptiveLayout

Renders your registered components in a dynamic, AI-driven layout.

### Props

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

### Basic Usage

```tsx
import { AdaptiveLayout } from 'adaptly';

<AdaptiveLayout />
```

### Advanced Usage

```tsx
<AdaptiveLayout
  className="my-dashboard"
  gridClassName="grid gap-6"
  itemClassName="p-4 border rounded-lg"
  spacing={8}
  columns={12}
  layout="grid"
  responsive={true}
  breakpoints={{
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  }}
/>
```

### Layout Types

#### Grid Layout (Default)

```tsx
<AdaptiveLayout layout="grid" columns={6} spacing={6} />
```

#### Flex Layout

```tsx
<AdaptiveLayout layout="flex" spacing={4} />
```

#### Absolute Layout

```tsx
<AdaptiveLayout layout="absolute" />
```

### Responsive Behavior

```tsx
<AdaptiveLayout
  responsive={true}
  breakpoints={{
    mobile: 768,   // < 768px
    tablet: 1024,  // 768px - 1024px
    desktop: 1280  // > 1024px
  }}
/>
```

## ⌨️ AdaptiveCommand

Provides the `⌘K` command interface for natural language input.

### Props

```typescript
interface AdaptiveCommandProps {
  keyPress?: string;
  config?: CommandConfig;
  handler?: CommandHandler;
  className?: string;
  style?: React.CSSProperties;
  aiSuggestions?: AISuggestion[];
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
}
```

### Basic Usage

```tsx
import { AdaptiveCommand } from 'adaptly';

<AdaptiveCommand />
```

### Advanced Usage

```tsx
<AdaptiveCommand
  keyPress="k"
  aiSuggestions={[
    {
      value: "Add revenue metrics",
      label: "💰 Add revenue metrics",
      icon: DollarSign,
      description: "Add key revenue indicators"
    },
    {
      value: "Create a sales dashboard",
      label: "📊 Create a sales dashboard",
      description: "Build a complete sales overview"
    }
  ]}
  showAISuggestions={true}
  showUtilityCommands={true}
  config={{
    placeholder: "Describe what you want to create...",
    emptyMessage: "Try describing your ideal dashboard",
    commands: [
      {
        id: "reset",
        label: "Reset Layout",
        description: "Reset to default layout",
        icon: RotateCcw,
        action: "reset",
        category: "utility"
      }
    ]
  }}
/>
```

### Command Configuration

```typescript
interface CommandConfig {
  keyPress?: string;
  commands?: Command[];
  enableLLM?: boolean;
  placeholder?: string;
  emptyMessage?: string;
}
```

### AI Suggestions

```typescript
interface AISuggestion {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}
```

### Custom Commands

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

## 🔧 useAdaptiveUI Hook

Access the adaptive UI context and control the layout programmatically.

### Return Value

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

### Usage

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

  const handleAddMetric = () => {
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

  const handleUserInput = async (input: string) => {
    await parseUserInputWithLLM(input);
  };

  return (
    <div>
      <button onClick={handleAddMetric}>Add Metric</button>
      <button onClick={() => handleUserInput('Add a chart')}>
        Add Chart via AI
      </button>
      {isLLMProcessing && <div>AI is thinking...</div>}
      {lastLLMResponse && <div>{lastLLMResponse}</div>}
    </div>
  );
}
```

## 🎯 Component Types

### UIComponent

```typescript
interface UIComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}
```

### UIAdaptation

```typescript
interface UIAdaptation {
  components: UIComponent[];
  layout: 'grid' | 'flex' | 'absolute';
  spacing: number;
  columns: number;
}
```

### ComponentRegistry

```typescript
interface ComponentRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

### IconRegistry

```typescript
interface IconRegistry {
  [key: string]: React.ComponentType<unknown>;
}
```

## 🚀 Advanced Usage Patterns

### Custom Loader Component

```tsx
interface CustomLoaderProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}

const MyCustomLoader: React.FC<CustomLoaderProps> = ({ 
  isVisible, 
  message, 
  subMessage 
}) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-center font-semibold">{message}</p>
        <p className="text-center text-sm text-gray-600">{subMessage}</p>
      </div>
    </div>
  );
};

// Use in AdaptlyProvider
<AdaptlyProvider
  customLoader={MyCustomLoader}
  // ... other props
>
```

### Dynamic Component Registration

```tsx
function DynamicComponentManager() {
  const { updateAdaptation } = useAdaptiveUI();
  
  const registerComponent = (componentName: string, component: React.ComponentType) => {
    // Add to components registry
    const newComponents = {
      ...existingComponents,
      [componentName]: component
    };
    
    // Update the provider with new components
    // This would require re-rendering the provider
  };
  
  return (
    <div>
      <button onClick={() => registerComponent('NewComponent', MyNewComponent)}>
        Register New Component
      </button>
    </div>
  );
}
```

### Conditional Rendering

```tsx
function ConditionalLayout() {
  const { adaptation } = useAdaptiveUI();
  const userRole = useUserRole();
  
  const filteredComponents = adaptation.components.filter(component => {
    if (component.type === 'AdminPanel' && userRole !== 'admin') {
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

## 🧪 Testing Components

### Unit Testing

```tsx
import { render, screen } from '@testing-library/react';
import { AdaptlyProvider } from 'adaptly';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AdaptlyProvider
    apiKey="test-key"
    components={{ TestComponent }}
    adaptlyConfig={testConfig}
  >
    {children}
  </AdaptlyProvider>
);

test('renders adaptive layout', () => {
  render(
    <TestWrapper>
      <AdaptiveLayout />
    </TestWrapper>
  );
  
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});
```

### Integration Testing

```tsx
import { fireEvent, waitFor } from '@testing-library/react';

test('command interface works', async () => {
  render(<TestWrapper><AdaptiveCommand /></TestWrapper>);
  
  // Open command interface
  fireEvent.keyDown(document, { key: 'k', metaKey: true });
  
  // Type command
  const input = screen.getByPlaceholderText('Describe what you want...');
  fireEvent.change(input, { target: { value: 'Add a metric' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  // Wait for AI response
  await waitFor(() => {
    expect(screen.getByText('Metric added')).toBeInTheDocument();
  });
});
```

## 🆘 Troubleshooting

### Common Issues

**Components not rendering:**

- Check component names match between registry and components object
- Verify props match the registry definition
- Ensure components are properly exported

**Command interface not working:**

- Check keyboard event listeners
- Verify command handler is properly connected
- Check browser console for errors

**AI not responding:**

- Verify API key is correct
- Check network connectivity
- Ensure LLM service is properly configured

### Debug Tools

```tsx
// Enable debug logging
<AdaptlyProvider
  logging={{
    enabled: true,
    level: 'debug'
  }}
  // ... other props
>

// Use the logger directly
import { adaptlyLogger } from 'adaptly';

adaptlyLogger.debug('Debug message');
adaptlyLogger.info('Info message');
adaptlyLogger.warn('Warning message');
adaptlyLogger.error('Error message');
```

## 📚 Next Steps

Now that you understand the core components:

1. **Read the [Hooks API](./hooks.md)** - Learn about available hooks
2. **Check out [Services API](./services.md)** - Understand the underlying services
3. **Explore [Types Reference](./types.md)** - See all TypeScript definitions
4. **Try the [Basic Dashboard Tutorial](../tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to dive deeper?** Check out the [Hooks API](./hooks.md) to learn about the available hooks!
