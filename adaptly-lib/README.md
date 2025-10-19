# Adaptly Core Library

The core TypeScript library that powers Adaptly's AI-driven adaptive UI framework. This package provides the essential components, hooks, and services for building intelligent, responsive user interfaces.

## 📦 Package Information

- **Version**: 0.0.2
- **License**: MIT
- **TypeScript**: Full support with type definitions
- **Dependencies**: React 19.2.0, AI SDK 5.0.76, @ai-sdk/google 2.0.23, @ai-sdk/openai 2.0.52, @ai-sdk/anthropic 2.0.33, @radix-ui/react-dialog 1.1.15, cmdk 1.1.1, lucide-react 0.546.0
- **Peer Dependencies**: React 18+ or 19+, React-DOM 19.2.0

## 🚀 Installation

```bash
# Install Adaptly
npm install adaptly

# Install peer dependencies (if not already installed)
npm install react react-dom
```

**Note**: All AI SDKs and UI dependencies are bundled automatically. You only need React and React-DOM as peer dependencies.

## 🧩 Core Components

### AdaptlyProvider

The main provider component that wraps your application and provides AI-powered adaptive functionality.

```tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from './adaptly.json';

<AdaptlyProvider
  apiKey="your-api-key"
  provider="google" // or "openai" or "anthropic"
  model="gemini-2.0-flash-exp" // or "gpt-4o" or "claude-3-5-sonnet-20241022"
  components={{ MetricCard, SalesChart, DataTable }}
  icons={{ DollarSign, Users, Activity }} // Optional icon registry
  adaptlyConfig={adaptlyConfig} // REQUIRED
  enableStorage={true}
  storageKey="my-app-ui"
  storageVersion="2.0.0"
  defaultLayout={{
    components: [],
    layout: "grid",
    spacing: 6,
    columns: 6
  }}
  aiSuggestions={[
    { value: "Add metrics", label: "📊 Add metrics", description: "Add key performance indicators" }
  ]}
  showAISuggestions={true}
  showUtilityCommands={true}
  customLoader={MyCustomLoader} // Optional custom loading component
/>
```

### Built-in Features

The AdaptlyProvider includes all necessary components:

- **AdaptiveLayout**: Renders components dynamically based on AI suggestions
- **AdaptiveCommand**: Built-in `⌘K` command interface with AI suggestions
- **LoadingOverlay**: Built-in loading indicator with dark overlay and animations
- **Storage Management**: Automatic state persistence with version control
- **Multi-LLM Support**: Google Gemini, OpenAI GPT, Anthropic Claude with model selection
- **Component Registry**: JSON-based component configuration (adaptly.json)
- **Icon Registry**: Optional icon management for components
- **Custom Loader**: Support for custom loading components

## 🔧 Core Hooks

### useAdaptiveUI

Access the adaptive UI context and control the layout programmatically.

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
    lastLLMResponse,
    currentLLMProvider,
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData
  } = useAdaptiveUI();

  // Use the adaptive UI functionality
  return (
    <div>
      <p>Current LLM Provider: {currentLLMProvider}</p>
      <p>Components: {adaptation.components.length}</p>
      {isLLMProcessing && <p>AI is processing...</p>}
    </div>
  );
}
```

### Additional Exports

```tsx
import { 
  AdaptiveLayout,
  AdaptiveCommand,
  AdaptiveCommandWrapper,
  LoadingOverlay,
  RegistryService,
  CoreLLMService,
  EnhancedLLMService,
  StorageService,
  adaptlyLogger
} from 'adaptly';
```

## 🎯 Key Features

- **Multi-LLM Support**: Google Gemini, OpenAI GPT, Anthropic Claude with model selection
- **Built-in Command Interface**: `⌘K` command bar with AI suggestions and utility commands
- **Built-in Loading Overlay**: Dark overlay with animations during AI processing
- **Persistent Storage**: Automatic state management with localStorage and version control
- **Component Registry**: JSON-based component configuration (adaptly.json)
- **Icon Registry**: Optional icon management for components
- **Data Filtering Only**: LLM can only filter existing data, not pass new data
- **Self-contained**: All features included in a single provider component
- **TypeScript Support**: Full type safety and IntelliSense
- **Peer Dependencies**: Only React and React-DOM required
- **Custom Loaders**: Support for custom loading components
- **Advanced Services**: EnhancedLLMService, StorageService, RegistryService

## 📚 API Reference

### Types

```typescript
interface AdaptlyConfig {
  enableLLM?: boolean;
  llm?: LLMConfig;
  defaultLayout?: Partial<UIAdaptation>;
  adaptlyJson: AdaptlyJsonConfig;
  storage?: StorageConfig;
  loadingOverlay?: LoadingOverlayConfig;
  logging?: LoggingConfig;
}

interface LLMConfig {
  provider: "google" | "openai" | "anthropic";
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

interface UIComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}

interface UIAdaptation {
  components: UIComponent[];
  layout: "grid" | "flex" | "absolute";
  spacing: number;
  columns: number;
}
```

### Services

- **EnhancedLLMService**: Handles multi-provider AI model interactions with advanced features
- **CoreLLMService**: Basic LLM service for Google Gemini
- **StorageService**: Manages persistent storage with version control
- **RegistryService**: Manages component registry and metadata
- **AdaptlyLogger**: Centralized logging system with configurable levels

## 🔗 Related Packages

- **adaptly-demo**: Example Next.js application with full dashboard implementation
- **adaptly-cli**: Command-line tools for project setup (planned)
- **adaptly-examples**: Additional example applications and use cases

## 📖 Documentation

For complete documentation, visit the [main repository](https://github.com/gauravfs-14/adaptly) or check the `/docs` folder for detailed guides.

### Quick Links

- **[Installation Guide](../docs/installation.md)** - Setup and configuration
- **[Component Registry](../docs/component-registry.md)** - adaptly.json configuration
- **[LLM Providers](../docs/llm-providers.md)** - Multi-provider setup
- **[Storage Service](../docs/storage-service.md)** - Persistent storage guide
- **[API Reference](../docs/api/)** - Complete API documentation
- **[Examples](../examples/)** - Working examples and demos

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/gauravfs-14/adaptly/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](https://github.com/gauravfs-14/adaptly/blob/main/LICENSE) for details.
