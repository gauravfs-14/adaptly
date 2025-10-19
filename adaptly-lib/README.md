# Adaptly Core Library

The core TypeScript library that powers Adaptly's AI-driven adaptive UI framework. This package provides the essential components, hooks, and services for building intelligent, responsive user interfaces.

## 📦 Package Information

- **Version**: 0.0.5
- **License**: MIT
- **TypeScript**: Full support with type definitions
- **Dependencies**: AI SDK 5.0.76, @ai-sdk/google 2.0.23, @ai-sdk/openai 2.0.52, @ai-sdk/anthropic 2.0.33, @radix-ui/react-dialog 1.1.15, cmdk 1.1.1, lucide-react 0.546.0
- **React Peer Dependencies**: Properly externalized React for compatibility with Next.js 15+ and React 19+ (v0.0.5+)

## 🚀 Installation

```bash
# Install Adaptly (React peer dependencies properly handled!)
npm install adaptly
```

**Note**: React and React-DOM are peer dependencies (properly externalized). All other dependencies are bundled automatically for seamless installation!

## 🧩 Core Components

This package provides the core components for Adaptly:

- **AdaptlyProvider**: Main provider component
- **AdaptiveLayout**: Dynamic layout rendering
- **AdaptiveCommand**: Command interface
- **LoadingOverlay**: User feedback system
- **StorageService**: Persistent state management
- **EnhancedLLMService**: Multi-provider AI integration

For detailed API documentation and usage examples, see the [Core Components API Reference](../docs/api/core-components.md).

## 🔧 Core Hooks

This package provides essential React hooks for adaptive UI functionality:

- **useAdaptiveUI**: Main hook for accessing adaptive UI context
- **useStorage**: Storage management utilities
- **useLLM**: LLM provider integration

For detailed hook documentation and examples, see the [Hooks API Reference](../docs/api/hooks.md).

## 📚 API Reference

For complete API documentation, see:

- **[Core Components API](../docs/api/core-components.md)** - AdaptlyProvider, AdaptiveLayout, etc.
- **[Hooks API](../docs/api/hooks.md)** - useAdaptiveUI, useStorage, etc.
- **[Types API](../docs/api/types.md)** - TypeScript interfaces and types
- **[Services API](../docs/api/services.md)** - StorageService, LLMService, etc.

## 🎯 Key Features

- **Multi-LLM Support**: Google Gemini, OpenAI GPT, Anthropic Claude
- **Built-in Command Interface**: `⌘K` command bar with AI suggestions
- **Persistent Storage**: Automatic state management with version control
- **Component Registry**: JSON-based component configuration
- **TypeScript Support**: Full type safety and IntelliSense
- **Peer Dependencies**: Only React and React-DOM required

## 📖 Documentation

For complete documentation, see the [main documentation](../docs/README.md).

## 🔗 Related Packages

- **adaptly-demo**: Example Next.js application with full dashboard implementation
- **adaptly-cli**: Command-line tools for project setup (planned)
- **adaptly-examples**: Additional example applications and use cases

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/gauravfs-14/adaptly/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](https://github.com/gauravfs-14/adaptly/blob/main/LICENSE) for details.
