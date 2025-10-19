---
layout: default
title: Adaptly Documentation
description: AI-Adaptive UI Library for React & Next.js
nav_order: 1
render_with_liquid: false
---

Build intelligent, adaptive user interfaces with AI-powered component generation and natural language commands.

## 🚀 Quick Start

Get up and running in 5 minutes with a complete working demo:

```bash
# 1. Create a new Next.js project
npx create-next-app@latest my-adaptly-demo --typescript --tailwind --eslint
cd my-adaptly-demo

# 2. Install Adaptly
npm install adaptly

# 3. Set up shadcn/ui
npx shadcn@latest init
npx shadcn@latest add card button command

# 4. Set up your API key
echo "NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here" > .env.local

# 5. Follow the complete tutorial
```

**[📖 Complete Quick Start Guide →](quick-start.html)**

## ✨ Key Features

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

## 🎯 What is Adaptly?

Adaptly is a TypeScript-first library that brings AI intelligence to your React applications. It allows users to describe what they want in plain English, and the AI dynamically recomposes your UI using your existing components.

## 📖 How It Works

1. **Configure Components**: Define your components in `adaptly.json`
2. **Register Components**: Pass your React components to AdaptlyProvider
3. **User Interaction**: Users press `⌘K` and describe what they want
4. **AI Processing**: LLM analyzes the request and generates a layout plan
5. **Dynamic Rendering**: AdaptiveLayout renders the new UI configuration
6. **State Persistence**: Changes are automatically saved and restored

## 🎨 Component Registry

The heart of Adaptly is the component registry defined in `adaptly.json`. This file tells the AI about your components. For detailed configuration, see the [Component Registry Guide](component-registry.html).

## 🔧 LLM Integration

Adaptly supports multiple AI providers with model selection. For detailed setup instructions, see the [LLM Providers Guide](llm-providers.html).

- **Google Gemini**: `gemini-2.0-flash-exp`, `gemini-1.5-pro`
- **OpenAI GPT**: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`
- **Anthropic Claude**: `claude-3-5-sonnet-20241022`, `claude-3-opus-20240229`

## 💾 Storage & Persistence

Adaptly automatically saves and restores your UI state. For detailed configuration, see the [Storage Service Guide](storage-service.html).

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

Ready to get started? Check out the [Quick Start Guide](quick-start.html) to install Adaptly and build your first adaptive UI!
