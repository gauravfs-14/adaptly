# Adaptly Core Library

The core TypeScript library that powers Adaptly's AI-driven adaptive UI framework. This package provides the essential components, hooks, and services for building intelligent, responsive user interfaces.

## 📦 Package Information

- **Version**: 0.0.1
- **License**: MIT
- **TypeScript**: Full support with type definitions
- **Dependencies**: React 19+, AI SDK, Radix UI, Lucide React

## 🚀 Installation

```bash
npm install adaptly
```

## 🧩 Core Components

### AdaptlyProvider

The main provider component that wraps your application and provides AI-powered adaptive functionality.

```tsx
import { AdaptlyProvider } from 'adaptly';

<AdaptlyProvider
  apiKey="your-gemini-api-key"
  components={{ MetricCard, SalesChart, DataTable }}
  adaptlyConfig={adaptlyConfig}
>
  {/* Your app content */}
</AdaptlyProvider>
```

### AdaptiveLayout

Renders your components in a dynamic, AI-driven layout.

```tsx
import { AdaptiveLayout } from 'adaptly';

<AdaptiveLayout />
```

### AdaptiveCommand

Provides the `⌘K` command interface for natural language input.

```tsx
import { AdaptiveCommand } from 'adaptly';

<AdaptiveCommand />
```

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
    parseUserInput,
    parseUserInputWithLLM,
    resetToDefault,
    isLLMProcessing
  } = useAdaptiveUI();

  // Use the adaptive UI functionality
}
```

## 🎯 Key Features

- **AI-Powered Layout Generation**: Uses Gemini 2.0 Flash for intelligent component selection
- **Dynamic Grid System**: Responsive layouts that adapt to user needs
- **Natural Language Interface**: `⌘K` command bar for user input
- **Component Registry**: Flexible component registration and management
- **TypeScript Support**: Full type safety and IntelliSense
- **Customizable**: Extensive configuration options for different use cases

## 📚 API Reference

### Types

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

- **CoreLLMService**: Handles AI model interactions
- **RegistryService**: Manages component registry
- **adaptlyLogger**: Centralized logging system

## 🔗 Related Packages

- **adaptly-demo**: Example Next.js application
- **adaptly-cli**: Command-line tools for project setup

## 📖 Documentation

For complete documentation, visit the [main repository](https://github.com/gauravfs-14/adaptly) or check the `/docs` folder for detailed guides.

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/gauravfs-14/adaptly/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](https://github.com/gauravfs-14/adaptly/blob/main/LICENSE) for details.
