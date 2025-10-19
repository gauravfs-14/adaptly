# Adaptly Documentation

Welcome to the comprehensive documentation for Adaptly, the AI-powered adaptive UI framework for React and Next.js applications.

## 📚 Documentation Overview

This documentation is designed to help you understand, implement, and master Adaptly's AI-driven adaptive UI capabilities. Whether you're a beginner or an experienced developer, you'll find detailed guides and examples to get you started.

## 🚀 Quick Navigation

### Getting Started

- **[Installation Guide](./installation.md)** - Set up Adaptly in your project
- **[Quick Start Guide](./quick-start.md)** - Build your first adaptive UI in minutes
- **[Component Registry](./component-registry.md)** - Configure your components for AI understanding

### Core Features

- **[LLM Providers](./llm-providers.md)** - Configure multiple AI providers
- **[Storage Service](./storage-service.md)** - Persistent UI state management
- **[Advanced Features](./advanced-features.md)** - Custom loaders, advanced configurations

### API Reference

- **[Core Components](./api/core-components.md)** - AdaptlyProvider, hooks, and utilities
- **[Hooks](./api/hooks.md)** - useAdaptiveUI and other React hooks
- **[Types](./api/types.md)** - TypeScript interfaces and types

### Tutorials & Examples

- **[Quick Start Guide](./quick-start.md)** - Step-by-step dashboard creation
- **[Demo Application](../examples/adaptly-demo/)** - Full-featured example application

### Troubleshooting

- **[Troubleshooting Guide](./troubleshooting.md)** - Common issues and solutions

## 🎯 What is Adaptly?

Adaptly is a TypeScript-first library that brings AI intelligence to your React applications. It allows users to describe what they want in plain English, and the AI dynamically recomposes your UI using your existing components.

### Key Features

- **🤖 AI-Powered UI Generation**: Natural language to UI layout conversion
- **🔄 Multi-LLM Support**: Google Gemini, OpenAI GPT, Anthropic Claude
- **💾 Persistent Storage**: Automatic state management with version control
- **📋 Component Registry**: JSON-based component configuration
- **⌨️ Command Interface**: Built-in `⌘K` command bar with AI suggestions
- **🎨 Adaptive Layouts**: Dynamic grid systems that respond to user input
- **🔧 TypeScript Support**: Full type safety and IntelliSense
- **📱 Next.js Ready**: Seamless integration with App Router

## 🏗️ Architecture Overview

```
Your App
└── AdaptlyProvider (Main Provider)
    ├── AdaptiveLayout (Renders components dynamically)
    ├── AdaptiveCommand (⌘K command interface)
    ├── LoadingOverlay (AI processing indicator)
    └── StorageService (Persistent state management)
```

### Core Components

1. **AdaptlyProvider**: Main provider that wraps your app
2. **AdaptiveLayout**: Renders components in AI-driven layouts
3. **AdaptiveCommand**: Built-in command bar with AI suggestions
4. **LoadingOverlay**: Visual feedback during AI processing
5. **StorageService**: Manages persistent UI state
6. **EnhancedLLMService**: Multi-provider AI integration

## 🚀 Quick Start

For a complete setup guide, see the [Quick Start Guide](./quick-start.md).

```tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from './adaptly.json';

function App() {
  return (
    <AdaptlyProvider
      apiKey="your-api-key"
      provider="google"
      model="gemini-2.0-flash-exp"
      components={{ MetricCard, SalesChart, DataTable }}
      adaptlyConfig={adaptlyConfig}
      enableStorage={true}
    />
  );
}
```

## 📖 How It Works

1. **Configure Components**: Define your components in `adaptly.json`
2. **Register Components**: Pass your React components to AdaptlyProvider
3. **User Interaction**: Users press `⌘K` and describe what they want
4. **AI Processing**: LLM analyzes the request and generates a layout plan
5. **Dynamic Rendering**: AdaptiveLayout renders the new UI configuration
6. **State Persistence**: Changes are automatically saved and restored

## 🎨 Component Registry

The heart of Adaptly is the component registry defined in `adaptly.json`. This file tells the AI about your components. For detailed configuration, see the [Component Registry Guide](./component-registry.md).

## 🔧 LLM Integration

Adaptly supports multiple AI providers with model selection. For detailed setup instructions, see the [LLM Providers Guide](./llm-providers.md).

- **Google Gemini**: `gemini-2.0-flash-exp`, `gemini-1.5-pro`
- **OpenAI GPT**: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`
- **Anthropic Claude**: `claude-3-5-sonnet-20241022`, `claude-3-opus-20240229`

## 💾 Storage & Persistence

Adaptly automatically saves and restores your UI state. For detailed configuration, see the [Storage Service Guide](./storage-service.md).

- **localStorage Integration**: Automatic state persistence
- **Version Control**: Handles configuration changes gracefully
- **Manual Controls**: Save, load, and clear storage programmatically

## 🎯 Use Cases

- **Dashboard Applications**: Dynamic business intelligence dashboards
- **Admin Panels**: Configurable admin interfaces
- **Analytics Tools**: Adaptive data visualization
- **Content Management**: Dynamic content layouts
- **Prototyping**: Rapid UI iteration and testing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](../CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

- **Documentation**: This comprehensive guide
- **Examples**: Working examples in `/examples`
- **Issues**: [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions)

---

Ready to get started? Check out the [Installation Guide](./installation.md) to set up Adaptly in your project!
