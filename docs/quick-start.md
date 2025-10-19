# Quick Start Guide

Get up and running with Adaptly in just a few minutes! This guide will walk you through creating your first AI-powered adaptive UI.

## 🎯 What We'll Build

We'll create a simple dashboard that responds to natural language commands. Users can press `⌘K` and describe what they want, and the AI will dynamically arrange components.

## ⚡ 5-Minute Setup

> **Prerequisites**: Make sure you have Node.js 18+ and React 18+ installed. For detailed installation instructions, see the [Installation Guide](./installation.md).

### Step 1: Create Your Project

```bash
# Create a new Next.js project
npx create-next-app@latest my-adaptly-dashboard --typescript --tailwind --eslint
cd my-adaptly-dashboard

# Install Adaptly
npm install adaptly

# Install shadcn/ui (optional but recommended)
npx shadcn@latest init
npx shadcn@latest add card button
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file:

```bash
# Get your API key from https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

> **Note**: For detailed API key setup and multiple provider configuration, see the [LLM Providers Guide](./llm-providers.md).

### Step 3: Create adaptly.json

Create `adaptly.json` in your project root. For detailed component registry configuration, see the [Component Registry Guide](./component-registry.md).

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
        "timeRange": { "type": "string", "required": false, "allowed": ["7d", "30d", "90d", "1y"] },
        "metric": { "type": "string", "required": false, "allowed": ["sales", "revenue", "profit", "orders"] }
      },
      "useCases": ["sales visualization", "trend analysis", "performance charts"],
      "space": { "min": [3, 3], "max": [6, 5], "preferred": [4, 4] }
    },
    "DataTable": {
      "description": "Display tabular data with filtering, sorting, and pagination",
      "props": {
        "title": { "type": "string", "required": true },
        "data": { "type": "array", "required": true },
        "columns": { "type": "array", "required": true }
      },
      "useCases": ["data display", "tabular information", "sortable lists"],
      "space": { "min": [4, 4], "max": [6, 8], "preferred": [6, 6] }
    }
  }
}
```

### Step 4: Create Your Components

Create `src/components/MetricCard.tsx`:

{% raw %}

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()}`}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
        {progress !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

{% endraw %}

Create `src/components/SalesChart.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesChartProps {
  title?: string;
  description?: string;
  timeRange?: "7d" | "30d" | "90d" | "1y";
  metric?: "sales" | "revenue" | "profit" | "orders";
}

export function SalesChart({
  title = "Sales Overview",
  description = "Monthly sales and revenue trends",
  timeRange = "30d",
  metric = "sales",
}: SalesChartProps) {
  // Sample data based on time range
  const getSampleData = () => {
    const data = [
      { name: "Jan", sales: 4000, revenue: 2400 },
      { name: "Feb", sales: 3000, revenue: 1398 },
      { name: "Mar", sales: 2000, revenue: 9800 },
      { name: "Apr", sales: 2780, revenue: 3908 },
      { name: "May", sales: 1890, revenue: 4800 },
      { name: "Jun", sales: 2390, revenue: 3800 },
    ];

    if (timeRange === "7d") return data.slice(-1);
    if (timeRange === "30d") return data.slice(-2);
    if (timeRange === "90d") return data.slice(-3);
    return data;
  };

  const chartData = getSampleData();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {timeRange}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
            {metric}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-gray-600">Chart visualization</p>
            <p className="text-xs text-gray-500 mt-1">
              {chartData.length} data points for {timeRange}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

Create `src/components/DataTable.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableProps {
  title: string;
  data: any[];
  columns: string[];
}

export function DataTable({ title, data, columns }: DataTableProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th key={column} className="text-left p-2 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((row, index) => (
                <tr key={index} className="border-b">
                  {columns.map((column) => (
                    <td key={column} className="p-2">
                      {row[column] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 5 && (
            <p className="text-xs text-gray-500 mt-2">
              Showing 5 of {data.length} rows
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### Step 5: Set Up AdaptlyProvider

Update `src/app/page.tsx`:

```tsx
"use client";

import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from '../../adaptly.json';
import { MetricCard } from '@/components/MetricCard';
import { SalesChart } from '@/components/SalesChart';
import { DataTable } from '@/components/DataTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Adaptive Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Press <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">⌘K</kbd> to describe what you want
          </p>
        </div>
        
        <AdaptlyProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
          provider="google"
          model="gemini-2.0-flash-exp"
          components={{
            MetricCard,
            SalesChart,
            DataTable,
          }}
          adaptlyConfig={adaptlyConfig}
          enableStorage={true}
          storageKey="quick-start-dashboard"
          className="h-full"
        />
      </div>
    </div>
  );
}
```

### Step 6: Run Your Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Try It Out

1. **Press `⌘K`** (or `Ctrl+K` on Windows/Linux)
2. **Try these commands**:
   - "Add a revenue metric"
   - "Create a sales dashboard"
   - "Show me some charts"
   - "Add a data table"
   - "Make it more compact"

3. **Watch the magic happen** - the AI will dynamically add and arrange components!

## 🎯 What's Happening?

1. **User Input**: You describe what you want in natural language
2. **AI Processing**: The LLM analyzes your request and the component registry
3. **Layout Generation**: AI creates a structured layout plan
4. **Dynamic Rendering**: Adaptly renders the new UI configuration
5. **State Persistence**: Your changes are automatically saved

## 🔧 Customization Options

### Add More Components

1. **Create a new component** (e.g., `UserCard.tsx`)
2. **Add it to adaptly.json**:

```json
{
  "UserCard": {
    "description": "Display user information with avatar and details",
    "props": {
      "name": { "type": "string", "required": true },
      "email": { "type": "string", "required": true },
      "role": { "type": "string", "required": false }
    },
    "useCases": ["user profiles", "team members", "contact info"],
    "space": { "min": [2, 2], "max": [3, 3], "preferred": [2, 2] }
  }
}
```

3. **Register it in AdaptlyProvider**:

```tsx
components={{
  MetricCard,
  SalesChart,
  DataTable,
  UserCard, // Add your new component
}}
```

### Customize AI Suggestions

```tsx
<AdaptlyProvider
  // ... other props
  aiSuggestions={[
    { value: "Add revenue metrics", label: "💰 Add revenue metrics" },
    { value: "Show user data", label: "👥 Show user data" },
    { value: "Create analytics dashboard", label: "📊 Create analytics dashboard" },
  ]}
  showAISuggestions={true}
  showUtilityCommands={true}
/>
```

### Add Icons

```tsx
import { DollarSign, Users, BarChart3 } from "lucide-react";

<AdaptlyProvider
  // ... other props
  icons={{
    DollarSign,
    Users,
    BarChart3,
  }}
/>
```

## 🚀 Next Steps

Now that you have a working adaptive UI:

1. **Explore the [Component Registry Guide](./component-registry.md)** to learn about advanced component configuration
2. **Check out [LLM Providers](./llm-providers.md)** to set up multiple AI providers
3. **Learn about [Storage Service](./storage-service.md)** for advanced state management
4. **See the [Demo Application](../examples/adaptly-demo/)** for a complete example

## 🎉 Congratulations

You've successfully created your first AI-powered adaptive UI! The AI can now understand natural language commands and dynamically arrange your components.

## 🆘 Troubleshooting

### Common Issues

**Issue**: Components not appearing

- **Solution**: Check that your component is properly exported and registered

**Issue**: "API key not found" error

- **Solution**: Ensure your environment variable is set correctly

**Issue**: "adaptly.json validation failed"

- **Solution**: Check that all required fields are present in your component definitions

**Issue**: AI not responding

- **Solution**: Verify your API key is valid and has sufficient credits

## 📚 Learn More

- **[Component Registry Guide](./component-registry.md)** - Advanced component configuration
- **[LLM Providers Guide](./llm-providers.md)** - Multiple AI provider setup
- **[Storage Service Guide](./storage-service.md)** - Persistent state management
- **[API Reference](./api/)** - Complete API documentation
- **[Troubleshooting Guide](./troubleshooting.md)** - Common issues and solutions

---

Ready to dive deeper? Check out the [Component Registry Guide](./component-registry.md) to learn about advanced component configuration!
