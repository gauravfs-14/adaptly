# Adaptly

AI-powered adaptive UI framework for React applications. Create dynamic, intelligent dashboards that adapt to user needs through natural language commands.

## Features

- 🤖 **AI-Powered**: Natural language UI generation using Gemini 2.0 Flash
- 🎨 **Adaptive Layouts**: Dynamic grid and flex layouts that respond to user input
- ⚡ **Command Interface**: Press `⌘K` to describe what you want to create
- 🧩 **Component Library**: Pre-built components for dashboards, charts, and data visualization
- 🎯 **TypeScript**: Full TypeScript support with excellent developer experience

## Installation

```bash
npm install adaptly
```

## Quick Start

```tsx
import { AdaptlyProvider } from 'adaptly';

function App() {
  return (
    <AdaptlyProvider
      apiKey="your-gemini-api-key"
      components={{
        MetricCard,
        SalesChart,
        DataTable,
        // ... your components
      }}
      adaptlyConfig={adaptlyConfig}
    >
      {/* Your app content */}
    </AdaptlyProvider>
  );
}
```

## Configuration

Create an `adaptly.json` file in your project root:

```json
{
  "components": {
    "MetricCard": {
      "description": "Display key metrics with trends",
      "props": {
        "title": "string",
        "value": "string",
        "change": "string"
      },
      "useCases": ["dashboard", "analytics"],
      "space": {
        "min": 1,
        "max": 4,
        "preferred": 2
      }
    }
  }
}
```

## Usage

1. **Press `⌘K`** to open the command interface
2. **Describe what you want**: "Create a sales dashboard"
3. **Watch the magic**: AI generates the perfect layout

## Examples

- "Add a revenue chart"
- "Show team performance metrics"
- "Create a data table with orders"
- "Make the layout more compact"

## Documentation

Visit our [documentation](https://github.com/gauravfs-14/adaptly#readme) for detailed guides and API reference.

## License

MIT
