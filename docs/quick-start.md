# Quick Start Guide

Get up and running with Adaptly in under 10 minutes! This guide will walk you through creating your first AI-powered adaptive dashboard.

## 🎯 What We'll Build

By the end of this guide, you'll have:

- A working adaptive dashboard
- AI-powered component generation
- Natural language command interface
- Basic component registry

## ⚡ 5-Minute Setup

### Step 1: Create a New Project

```bash
# Create a new Next.js project
npx create-next-app@latest my-adaptly-app --typescript --tailwind --eslint
cd my-adaptly-app

# Install Adaptly
npm install adaptly
```

### Step 2: Set Up Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

**Get your API key:**

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project
3. Generate an API key
4. Copy it to your `.env.local` file

### Step 3: Create Component Registry

Create `adaptly.json` in your project root:

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
    "WelcomeCard": {
      "description": "Welcome message and instructions for new users",
      "props": {
        "title": { "type": "string", "required": true },
        "description": { "type": "string", "required": true }
      },
      "useCases": ["onboarding", "welcome", "instructions"],
      "space": { "min": [4, 2], "max": [6, 4], "preferred": [6, 3] }
    }
  }
}
```

**Note**: The `version` field in adaptly.json is for your component registry version, not the Adaptly package version.

### Step 4: Create Your Components

Create `components/MetricCard.tsx`:

```tsx
interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export function MetricCard({ title, value, change, changeType }: MetricCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      {change && (
        <p className={`text-sm ${
          changeType === 'positive' ? 'text-green-600' : 
          changeType === 'negative' ? 'text-red-600' : 
          'text-gray-600'
        }`}>
          {change}
        </p>
      )}
    </div>
  );
}
```

Create `components/WelcomeCard.tsx`:

```tsx
interface WelcomeCardProps {
  title: string;
  description: string;
}

export function WelcomeCard({ title, description }: WelcomeCardProps) {
  return (
    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">{title}</h2>
      <p className="text-blue-700 dark:text-blue-300">{description}</p>
    </div>
  );
}
```

### Step 5: Set Up Your App

Replace `app/page.tsx`:

```tsx
'use client';

import { AdaptlyProvider, AdaptiveLayout, AdaptiveCommand } from 'adaptly';
import adaptlyConfig from '../adaptly.json';
import { MetricCard } from '@/components/MetricCard';
import { WelcomeCard } from '@/components/WelcomeCard';

export default function Home() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}
      components={{
        MetricCard,
        WelcomeCard,
      }}
      adaptlyConfig={adaptlyConfig}
      defaultLayout={{
        components: [
          {
            id: 'welcome',
            type: 'WelcomeCard',
            props: {
              title: 'Welcome to Adaptly!',
              description: 'Press ⌘K to describe what you want to see. Try saying "Add some metrics" or "Create a dashboard".'
            },
            position: { x: 0, y: 0, w: 6, h: 3 },
            visible: true,
          }
        ],
        layout: 'grid',
        spacing: 6,
        columns: 6,
      }}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            My Adaptive Dashboard
          </h1>
          <AdaptiveCommand />
          <AdaptiveLayout />
        </div>
      </div>
    </AdaptlyProvider>
  );
}
```

### Step 6: Run Your App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you should see your adaptive dashboard!

## 🎮 Try It Out

1. **Press `⌘K`** (or `Ctrl+K` on Windows/Linux)
2. **Try these commands:**
   - "Add a revenue metric"
   - "Show me some KPIs"
   - "Create a dashboard with metrics"
   - "Add more components"

3. **Watch the magic happen!** The AI will generate appropriate components based on your description.

## 🧩 Understanding What Happened

### Component Registry

The `adaptly.json` file tells the AI what components are available, their properties, and use cases. This gives the AI context about your application's capabilities.

### AdaptlyProvider

This is the main wrapper that provides AI functionality to your app. It needs:

- `apiKey`: Your Gemini API key
- `components`: Object mapping component names to React components
- `adaptlyConfig`: Your component registry configuration

### AdaptiveLayout

This component renders your registered components in a dynamic grid layout based on AI suggestions.

### AdaptiveCommand

This provides the `⌘K` command interface for natural language input.

## 🎨 Customizing Your Dashboard

### Adding More Components

1. **Create a new component:**

```tsx
// components/SalesChart.tsx
export function SalesChart({ title, data }: { title: string; data: any[] }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {/* Your chart implementation */}
    </div>
  );
}
```

2. **Register it in adaptly.json:**

```json
{
  "components": {
    "SalesChart": {
      "description": "Display sales data in a chart format",
      "props": {
        "title": { "type": "string", "required": true },
        "data": { "type": "array", "required": true }
      },
      "useCases": ["sales", "analytics", "charts"],
      "space": { "min": [4, 3], "max": [6, 5], "preferred": [5, 4] }
    }
  }
}
```

3. **Add it to your components object:**

```tsx
<AdaptlyProvider
  components={{
    MetricCard,
    WelcomeCard,
    SalesChart, // Add your new component
  }}
  // ... other props
>
```

### Customizing the Command Interface

You can customize the command interface with suggestions:

```tsx
<AdaptiveCommand
  aiSuggestions={[
    {
      value: "Add revenue metrics",
      label: "💰 Add revenue metrics",
      description: "Add key revenue indicators"
    },
    {
      value: "Create a sales dashboard",
      label: "📊 Create a sales dashboard", 
      description: "Build a complete sales overview"
    }
  ]}
/>
```

## 🚀 Next Steps

Now that you have a basic adaptive dashboard:

1. **Explore the [Component Registry Guide](./component-registry.md)** - Learn how to register more complex components
2. **Check out [Advanced Layouts](./tutorials/advanced-layouts.md)** - Build more sophisticated layouts
3. **Read the [API Reference](./api/core-components.md)** - Understand all available features
4. **Try the [Basic Dashboard Tutorial](./tutorials/basic-dashboard.md)** - Build a complete dashboard

## 🆘 Troubleshooting

### Common Issues

**"API key not found" warning:**

- Check your `.env.local` file
- Ensure the key starts with `NEXT_PUBLIC_`
- Restart your development server

**Components not rendering:**

- Verify component names match between registry and components object
- Check that components are properly exported
- Ensure props match the registry definition

**Command interface not working:**

- Check that `AdaptiveCommand` is rendered
- Verify keyboard shortcuts work in your browser
- Check browser console for errors

### Debug Mode

Enable debug logging to see what's happening:

```tsx
<AdaptlyProvider
  logging={{
    enabled: true,
    level: "debug"
  }}
  // ... other props
>
```

## 🎉 Congratulations

You've successfully created your first adaptive dashboard! You now understand:

- How to set up Adaptly in a React/Next.js app
- How to register components in the AI system
- How to use the command interface
- How to customize the experience

**Ready for more?** Check out the [Component Registry Guide](./component-registry.md) to learn about advanced component registration!
