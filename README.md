# Adaptly — The AI-Adaptive UI Library for React & Next.js

[![npm version](https://img.shields.io/npm/v/adaptly.svg?style=flat-square)](https://www.npmjs.com/package/adaptly)
[![npm downloads](https://img.shields.io/npm/dm/adaptly.svg?style=flat-square)](https://www.npmjs.com/package/adaptly)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-61dafb.svg?style=flat-square)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000.svg?style=flat-square)](https://nextjs.org/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-ff6b6b.svg?style=flat-square)](https://github.com/gauravfs-14/adaptly)
[![GitHub stars](https://img.shields.io/github/stars/gauravfs-14/adaptly.svg?style=flat-square)](https://github.com/gauravfs-14/adaptly/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/gauravfs-14/adaptly.svg?style=flat-square)](https://github.com/gauravfs-14/adaptly/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/gauravfs-14/adaptly.svg?style=flat-square)](https://github.com/gauravfs-14/adaptly/pulls)

**Adaptly** brings intelligence to modern web dashboards and applications.
It's a TypeScript-first library that lets your UI *understand what users mean*, not just what they click.
With a single `Cmd + K`, users can describe their goal or need in plain English, and Adaptly uses an **LLM-driven planner** to dynamically recompose your React interface using your existing components.

> "I can't see blue."
> "Show me billing and analytics."
> "Focus this dashboard on user retention."

Adaptly turns those statements into live UI transformations — changing colors, scaling text, and rearranging relevant components instantly.

## 🚀 Quick Start

```bash
npm install adaptly
```

**Note**: All dependencies are included automatically - no additional packages needed!

```tsx
import { AdaptlyProvider, AdaptiveLayout, AdaptiveCommand } from 'adaptly';

function App() {
  return (
    <AdaptlyProvider
      apiKey="your-gemini-api-key"
      components={{ MetricCard, SalesChart, DataTable }}
      adaptlyConfig={adaptlyConfig}
    >
      <AdaptiveCommand />
      <AdaptiveLayout />
    </AdaptlyProvider>
  );
}
```

Press `⌘K` and describe what you want: "Create a sales dashboard" or "Add revenue metrics"

---

## 🎯 What Adaptly Does

| Category                   | Feature                              | Description                                                                                                                                 |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI-Driven Planning**     | Natural-language → structured layout | Sends user goals and your component registry to an LLM that returns a JSON layout plan with selected components and accessibility settings. |
| **Command Bar**            | Cmd + K interface                    | Built using shadcn's Command & Dialog components for smooth in-app natural-language input.                                                  |
| **Adaptive Layout Engine** | Dynamic Tailwind grid                | Re-renders the UI based on the LLM's plan: which components to show, in what order, with what styling.                                      |
| **Accessibility Layer**    | Color & text adaptation              | Applies color substitution (e.g., avoid blue hues) and font scaling through CSS variables and Tailwind utilities.                           |
| **Developer Registry**     | JSON-based component context         | You declare what your app can show — Adaptly uses that context to decide how to respond to user intent.                                     |
| **Next.js Integration**    | App Router native                    | Ships React Provider, API route, and hooks that plug directly into a Next.js project with minimal setup.                                    |

---

## 🏗️ Architecture

```
<App>
 └── <AdaptlyProvider apiKey={key} components={components} adaptlyConfig={config}>
       ├── <AdaptiveCommand />   // Cmd + K
       └── <AdaptiveLayout />    // Dynamic layout from AI plan
     </AdaptlyProvider>
```

### Core Modules

1. **AdaptlyProvider**
   Main provider that wraps your app and provides AI-powered adaptive functionality.

2. **AdaptiveCommand**
   Opens a shadcn Command dialog for natural language input.

3. **AdaptiveLayout**
   Renders your registered React components in a dynamic, AI-driven layout.

4. **LLM Service**
   Handles communication with Google Gemini API for natural language processing.

5. **Registry Service**
   Manages component registry and metadata processing.

---

## 🧩 Component Registry Schema

Each app using Adaptly defines a registry file describing components and their semantics.

`adaptly.json`

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values and trends",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true },
        "change": { "type": "string", "required": false },
        "changeType": { "type": "string", "required": false, "allowed": ["positive", "negative", "neutral"] }
      },
      "useCases": ["dashboard", "analytics", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    },
    "SalesChart": {
      "description": "Visualize sales data with interactive charts and graphs",
      "props": {
        "title": { "type": "string", "required": false },
        "timeRange": { "type": "string", "required": false, "allowed": ["7d", "30d", "90d", "1y"] }
      },
      "useCases": ["sales visualization", "trend analysis"],
      "space": { "min": [3, 3], "max": [6, 5], "preferred": [4, 4] }
    }
  }
}
```

---

## ⚙️ AI Integration

Adaptly uses Google Gemini 2.0 Flash for natural language processing. The AI service is built into the library and handles:

- **Natural Language Understanding**: Parsing user commands and intent
- **Component Selection**: Choosing appropriate components based on user needs
- **Layout Planning**: Determining optimal component arrangement
- **Accessibility Adaptation**: Adjusting colors, fonts, and layout for accessibility needs

---

## 🔧 Example Next.js Integration

```tsx
import { AdaptlyProvider, AdaptiveLayout, AdaptiveCommand } from "adaptly";
import adaptlyConfig from "./adaptly.json";
import { MetricCard } from "@/components/MetricCard";
import { SalesChart } from "@/components/SalesChart";

const components = {
  MetricCard,
  SalesChart
};

export default function Dashboard() {
  return (
    <AdaptlyProvider
      apiKey="your-gemini-api-key"
      components={components}
      adaptlyConfig={adaptlyConfig}
    >
      <AdaptiveCommand />
      <AdaptiveLayout />
    </AdaptlyProvider>
  );
}
```

**User Flow**

1. Press **Cmd + K**
2. Type: "Show me billing and analytics. I can't see blue."
3. The planner calls the LLM → returns structured JSON.
4. `AdaptiveGrid` re-renders those components with adjusted color palette.

---

## 🧠 Technical Stack

| Layer             | Technology                    |
| ----------------- | ----------------------------- |
| Framework         | React 19+ / Next.js 15        |
| Language          | TypeScript 5.9+              |
| Styling           | Tailwind CSS + shadcn UI      |
| AI Engine         | Google Gemini 2.0 Flash      |
| AI SDK            | @ai-sdk/google 2.0.23         |
| Command Interface | cmdk 1.1.1                    |
| Icons             | Lucide React 0.546.0          |
| State Management  | React Context                 |
| Packaging         | Rollup                        |
| Deployment        | Vercel or any Node-based host |

---

## 🔐 Privacy Model

- The registry and user goal are the only data sent to the LLM.
- No analytics or telemetry are collected by Adaptly.
- Developers must provide their own LLM API key.
- Results are deterministic through schema validation and temperature control.

---

## 🧭 Roadmap

- **Custom CLI** for project scaffolding and adaptly.json validation
- **Layout persistence** (per-user memory in localStorage)
- **Multi-LLM support** with adapters for OpenAI, Anthropic, and Mistral APIs
- **Enhanced customization** with more layout options
- **Performance optimizations** for faster AI responses

---

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
