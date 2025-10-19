# Adaptly — The AI-Adaptive UI Library for React & Next.js

[![npm version](https://img.shields.io/npm/v/adaptly.svg?style=flat-square)](https://www.npmjs.com/package/adaptly)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-61dafb.svg?style=flat-square)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000.svg?style=flat-square)](https://nextjs.org/)
[![GitHub stars](https://img.shields.io/github/stars/gauravfs-14/adaptly.svg?style=flat-square)](https://github.com/gauravfs-14/adaptly/stargazers)

**Adaptly** brings intelligence to modern web dashboards and applications.
It's a TypeScript-first library that lets your UI *understand what users mean*, not just what they click.
With a single `Cmd + K`, users can describe their goal or need in plain English, and Adaptly uses an **LLM-driven planner** to dynamically recompose your React interface using your existing components.

> "Show me billing and analytics."
> "Create a sales dashboard with revenue metrics."
> "Add some charts and filter by this week."

Adaptly turns those statements into live UI transformations — rearranging components, filtering data, and configuring display options instantly.

## 🎯 Key Features

- **Multi-LLM Support**: Choose from Google Gemini, OpenAI GPT-4, or Anthropic Claude
- **Persistent Storage**: Automatically saves and restores UI state across sessions
- **Component Registry**: Define your components in `adaptly.json` for AI understanding
- **Built-in Command Bar**: Cmd + K interface with AI suggestions
- **Data Filtering**: LLM can filter and configure existing data, not pass new data
- **TypeScript First**: Full type safety with comprehensive interfaces
- **Next.js Ready**: Seamless integration with App Router

## 🚀 Quick Start

```bash
# Install Adaptly
npm install adaptly

# Install peer dependencies (if not already installed)
npm install react react-dom
```

**Note**: All AI SDKs and UI dependencies are bundled automatically. You only need React and React-DOM as peer dependencies.

### 1. Create your `adaptly.json` configuration

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values, trends, and progress bars",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true },
        "change": { "type": "string", "required": false },
        "changeType": { "type": "string", "required": false, "allowed": ["positive", "negative", "neutral"] },
        "progress": { "type": "number", "required": false },
        "description": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics", "performance indicators", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}
```

### 2. Set up your components

```tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from './adaptly.json';
import { MetricCard, SalesChart, TeamMembers } from './components';

function App() {
  return (
    <AdaptlyProvider
      apiKey="your-api-key"
      provider="google" // or "openai" or "anthropic"
      model="gemini-2.0-flash-exp" // or "gpt-4o" or "claude-3-5-sonnet-20241022"
      components={{ 
        MetricCard, 
        SalesChart, 
        TeamMembers,
        DataTable: OrdersTable,
        EmptyCard,
        ActivityFeed,
        NotificationCenter,
        WeatherWidget,
        QuickStats,
        ResourceMonitor
      }}
      adaptlyConfig={adaptlyConfig} // REQUIRED: adaptly.json configuration
      enableStorage={true}
      storageKey="my-app-ui"
    />
  );
}
```

### 3. Start using AI commands

Press `⌘K` and describe what you want: "Create a sales dashboard" or "Add revenue metrics"

---

## 🎯 What Adaptly Does

| Category                   | Feature                              | Description                                                                                                                                 |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI-Driven Planning**     | Natural-language → structured layout | Sends user goals and your component registry to an LLM that returns a JSON layout plan with selected components and display configurations. |
| **Multi-LLM Support**      | OpenAI, Anthropic, Google providers  | Choose from GPT-4, Claude 3.5 Sonnet, or Gemini 2.0 Flash with model selection for different AI capabilities and cost optimization.       |
| **Persistent Storage**     | localStorage state management        | Automatically saves and restores your UI state across page refreshes with version control and manual controls.                            |
| **Command Bar**            | Cmd + K interface                    | Built using shadcn's Command & Dialog components for smooth in-app natural-language input.                                                  |
| **Adaptive Layout Engine** | Dynamic Tailwind grid                | Re-renders the UI based on the LLM's plan: which components to show, in what order, with what styling.                                      |
| **Data Filtering Only**    | LLM filters existing data            | LLM can only filter and configure existing data, not pass new data. Components use predefined sample data.                                  |
| **Built-in Features**      | All-in-one provider                  | Includes layout engine, command interface, loading overlay, and storage management in a single component.                                 |
| **Next.js Integration**    | App Router native                    | Ships React Provider, API route, and hooks that plug directly into a Next.js project with minimal setup.                                    |
| **Component Registry**     | adaptly.json configuration          | Define your components with descriptions, props, use cases, and space requirements for AI understanding.                                |
| **TypeScript Support**     | Full type safety                     | Comprehensive TypeScript interfaces for all components, configurations, and API responses.                                                 |

---

## 🏗️ Architecture

```text
<App>
 └── <AdaptlyProvider apiKey={key} components={components} adaptlyConfig={config}>
       ├── <AdaptiveLayout />    // Renders components dynamically
       ├── <AdaptiveCommand />   // Cmd + K interface
       └── <LoadingOverlay />    // AI processing indicator
     </AdaptlyProvider>
```

### Core Modules

1. **AdaptlyProvider**
   Main provider that wraps your app and provides AI-powered adaptive functionality. Includes built-in command bar and loading overlay.

2. **AdaptiveLayout**
   Renders your registered React components in a dynamic, AI-driven layout based on user commands.

3. **AdaptiveCommand**
   Built-in command bar (Cmd + K) for natural language input with AI suggestions.

4. **LoadingOverlay**
   Built-in loading indicator with dark overlay and animations during AI processing.

5. **EnhancedLLMService**
   Handles communication with multiple LLM providers (OpenAI, Anthropic, Google) for natural language processing with advanced features.

6. **StorageService**
   Manages persistent storage with localStorage for saving and restoring UI state with version control.

7. **RegistryService**
   Manages component registry and provides AI with component metadata for intelligent selection.

---

## 🧩 Component Registry Schema

Each app using Adaptly defines a registry file describing components and their semantics. The LLM can only filter and configure display options, not pass new data.

`adaptly.json`

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values, trends, and progress bars",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true },
        "change": { "type": "string", "required": false },
        "changeType": { "type": "string", "required": false, "allowed": ["positive", "negative", "neutral"] },
        "progress": { "type": "number", "required": false },
        "description": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics", "performance indicators", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    },
    "SalesChart": {
      "description": "Visualize sales data with interactive charts and graphs",
      "props": {
        "title": { "type": "string", "required": false },
        "description": { "type": "string", "required": false },
        "height": { "type": "number", "required": false },
        "timeRange": { "type": "string", "required": false, "allowed": ["7d", "30d", "90d", "1y"] },
        "metric": { "type": "string", "required": false, "allowed": ["sales", "revenue", "profit", "orders"] },
        "category": { "type": "string", "required": false },
        "sortBy": { "type": "string", "required": false, "allowed": ["date", "value", "growth"] },
        "sortOrder": { "type": "string", "required": false, "allowed": ["asc", "desc"] }
      },
      "useCases": ["sales visualization", "trend analysis", "performance charts"],
      "space": { "min": [3, 3], "max": [6, 5], "preferred": [4, 4] }
    },
    "ActivityFeed": {
      "description": "Display recent user activities, system events, and real-time updates in a timeline format. Uses predefined sample data - LLM can only filter and configure display options.",
      "props": {
        "title": { "type": "string", "required": false },
        "description": { "type": "string", "required": false },
        "maxItems": { "type": "number", "required": false },
        "showAvatars": { "type": "boolean", "required": false }
      },
      "useCases": ["user activity tracking", "system monitoring", "real-time updates", "audit logs"],
      "space": { "min": [3, 3], "max": [6, 6], "preferred": [4, 4] }
    }
  }
}
```

---

## ⚙️ AI Integration

Adaptly supports multiple LLM providers with model selection. Choose the best provider and model for your needs:

### Supported Providers & Models

**Google Gemini:**

- `gemini-2.0-flash-exp` (experimental)
- `gemini-2.0-flash` (stable)
- `gemini-1.5-pro`
- `gemini-1.5-flash`
- `gemini-1.0-pro`

**OpenAI GPT:**

- `gpt-4o` (latest)
- `gpt-4o-mini` (cost-effective)
- `gpt-4-turbo`
- `gpt-4`
- `gpt-3.5-turbo`

**Anthropic Claude:**

- `claude-3-5-sonnet-20241022` (latest)
- `claude-3-5-haiku-20241022` (fast)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`

### AI Capabilities

- **Natural Language Understanding**: Parsing user commands and intent
- **Component Selection**: Choosing appropriate components based on user needs
- **Layout Planning**: Determining optimal component arrangement
- **Data Filtering**: LLM can only filter existing data and configure display options
- **Model Selection**: Choose from multiple models per provider for different capabilities
- **Persistent Storage**: AI decisions are saved and restored across sessions
- **Component Registry Integration**: AI understands your components through adaptly.json

---

## 🔧 Example Next.js Integration

```tsx
import { AdaptlyProvider, useAdaptiveUI } from "adaptly";
import adaptlyConfig from "./adaptly.json";
import { MetricCard, SalesChart, TeamMembers } from "@/components";

export default function Dashboard() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}
      provider="google"
      model="gemini-2.0-flash-exp"
      components={{
        MetricCard,
        SalesChart,
        TeamMembers,
        DataTable: OrdersTable,
        EmptyCard,
        ActivityFeed,
        NotificationCenter,
        WeatherWidget,
        QuickStats,
        ResourceMonitor
      }}
      adaptlyConfig={adaptlyConfig} // REQUIRED
      enableStorage={true}
      storageKey="my-dashboard"
      storageVersion="2.0.0"
    />
  );
}

// Access adaptive UI methods
function AdaptiveContent() {
  const { currentLLMProvider } = useAdaptiveUI();
  
  return (
    <div>
      <p>Current LLM Provider: {currentLLMProvider}</p>
    </div>
  );
}
```

### User Flow

1. Press **Cmd + K**
2. Type: "Show me billing and analytics" or "Create a sales dashboard"
3. The planner calls the LLM → returns structured JSON.
4. `AdaptiveLayout` re-renders those components with filtered data and configuration.
5. UI state is automatically saved and restored on page refresh.

---

## 🧠 Technical Stack

| Layer             | Technology                    |
| ----------------- | ----------------------------- |
| Framework         | React 19+ / Next.js 15        |
| Language          | TypeScript 5.9+              |
| Styling           | Tailwind CSS + shadcn UI      |
| AI Engine         | OpenAI GPT-4 / Anthropic Claude / Google Gemini |
| AI SDK            | @ai-sdk/openai, @ai-sdk/anthropic, @ai-sdk/google |
| Storage           | localStorage with version control |
| Command Interface | cmdk 1.1.1                    |
| Icons             | Lucide React 0.546.0          |
| State Management  | React Context                 |
| Packaging         | Rollup                        |
| Deployment        | Vercel or any Node-based host |
| Component Registry | adaptly.json configuration   |
| Data Visualization | Recharts 2.15.4              |

---

## 🔐 Privacy Model

- The registry and user goal are the only data sent to the LLM.
- No analytics or telemetry are collected by Adaptly.
- Developers must provide their own LLM API key.
- Results are deterministic through schema validation and temperature control.
- All UI state is stored locally in localStorage with version control.
- No external data is transmitted except to your chosen LLM provider.

---

## 🧭 Roadmap

- **Custom CLI** for project scaffolding and adaptly.json validation
- **Enhanced customization** with more layout options
- **Performance optimizations** for faster AI responses
- **Advanced storage options** with cloud sync capabilities
- **Component marketplace** for sharing and discovering components
- **Real-time collaboration** features for team environments
- **Advanced AI features** with context-aware suggestions
- **Component templates** for common use cases
- **Export/Import** functionality for UI configurations

---

## 📚 Documentation

- **[Full Documentation](./docs/README.md)** - Comprehensive developer guide
- **[LLM Providers](./docs/llm-providers.md)** - Multiple AI provider setup
- **[Storage Service](./docs/storage-service.md)** - Persistent storage guide
- **[Component Registry](./docs/component-registry.md)** - adaptly.json configuration guide
- **[API Reference](./docs/api/)** - Complete API documentation
- **[Examples](./examples/)** - Working examples and demos
- **[Advanced Features](./docs/advanced-features.md)** - Advanced usage patterns
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📋 Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## 🔒 Security

Please report security vulnerabilities responsibly. See our [Security Policy](SECURITY.md) for details.

## 💬 Summary

**Adaptly** is the first UI framework that makes your front-end *intent-driven*.
Instead of navigating menus or switching dashboards, users just *tell* the interface what they want — and the LLM rewrites the layout in real time.

It's not a chat assistant overlay. It's an AI that lives *inside* your app's design system.

### Key Benefits

- **Faster Development**: Build dashboards in minutes, not hours
- **Better UX**: Users describe what they want in plain English
- **Flexible**: Works with any React components and design system
- **Persistent**: UI state is saved and restored automatically
- **Multi-LLM**: Choose the best AI provider for your needs
- **TypeScript**: Full type safety and IntelliSense support
