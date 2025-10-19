---
sidebar_position: 2
title: Quick Start
description: Get Adaptly running in your React app in 5 minutes with a working example
---

# Quick Start Guide

This guide will get you up and running with Adaptly in just 5 minutes. We'll create a simple dashboard with AI-powered adaptive UI using Google Gemini.

## Prerequisites

- **Node.js 18+** (required for React 19+ support)
- **React 18+** or **Next.js 15+**
- **TypeScript 5.9+** (recommended)
- **Google Gemini API key** (free tier available) or other providers (Anthropic, OpenAI)

## Step 1: Create a New Project

```bash
# Create a new Next.js project with TypeScript
npx create-next-app@latest my-adaptly-app --typescript --tailwind --eslint
cd my-adaptly-app

# Install Adaptly
npm install adaptly
```

## Step 2: Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" and create a new key
4. Copy the API key (starts with `AIza...`)

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

## Step 4: Create Your Component

Create a simple `MetricCard` component:

```tsx
// src/components/MetricCard.tsx
interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  progress?: number;
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  progress,
  description,
}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className={`text-sm ${
              changeType === "positive" ? "text-green-600" : 
              changeType === "negative" ? "text-red-600" : 
              "text-gray-600"
            }`}>
              {change}
            </p>
          )}
        </div>
        {progress !== undefined && (
          <div className="w-16">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
```

## Step 5: Create Your adaptly.json Configuration

Create `adaptly.json` in your project root:

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
        "changeType": { 
          "type": "string", 
          "required": false, 
          "allowed": ["positive", "negative", "neutral"] 
        },
        "progress": { "type": "number", "required": false },
        "description": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics", "performance indicators", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}
```

## Step 6: Set Up AdaptlyProvider

Update your main page (`src/app/page.tsx`):

```tsx
"use client";

import { AdaptlyProvider } from "adaptly";
import { MetricCard } from "@/components/MetricCard";
import adaptlyConfig from "../../adaptly.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Adaptive Dashboard
        </h1>
        
        <AdaptlyProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
          provider="google"
          model="gemini-2.0-flash-exp"
          components={{ MetricCard }}
          adaptlyConfig={adaptlyConfig}
          enableStorage={true}
          storageKey="my-dashboard"
          className="h-full"
        />
      </div>
    </div>
  );
}
```

## Step 7: Run Your Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Try Your First AI Command

1. **Press `⌘K`** (or `Ctrl+K` on Windows/Linux) to open the command bar
2. **Type**: "Create a revenue dashboard with metrics"
3. **Press Enter** and watch Adaptly generate your dashboard!

The AI will:

- Create MetricCard components with realistic data
- Arrange them in an optimal grid layout
- Save the layout to localStorage
- Show you the reasoning behind its choices

## 🎉 Congratulations

You now have a working Adaptly application! Try these commands:

- "Add more metrics"
- "Show user statistics"
- "Create a performance overview"
- "Reset to default"

## What's Next?

### Learn More

- **[Component Registry Guide](component-registry)** - Configure more components
- **[LLM Providers Guide](llm-providers)** - Set up OpenAI or Anthropic
- **[Storage Service Guide](storage-service)** - Understand persistence

### Add More Components

- **[Advanced Features Guide](advanced-features)** - Custom loaders and validation
- **[API Reference](api/core-components)** - Complete component documentation

### See Real Examples

- **[Demo Application](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo)** - Full-featured dashboard
- **[Component Examples](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/src/components)** - 10+ real components

## Troubleshooting

### Common Issues

**"API key is required" error:**

- Make sure your `.env.local` file is in the project root
- Restart your development server after adding the environment variable
- Check that the API key starts with `AIza...`

**"Component not found" error:**

- Ensure your component is passed to the `components` prop
- Check that the component name in `adaptly.json` matches your component export

**Command bar not opening:**

- Make sure you're pressing `⌘K` (or `Ctrl+K`)
- Check the browser console for any JavaScript errors

**LLM not responding:**

- Verify your API key is correct
- Check your internet connection
- Try a different model (see [LLM Providers Guide](llm-providers))

### Getting Help

- **GitHub Issues**: [Report bugs](https://github.com/gauravfs-14/adaptly/issues)
- **Discussions**: [Ask questions](https://github.com/gauravfs-14/adaptly/discussions)
- **Documentation**: [Complete API Reference](api/core-components)

---

**Ready for more?** Check out the [Component Registry Guide](component-registry) to learn how to configure multiple components and create complex dashboards!
