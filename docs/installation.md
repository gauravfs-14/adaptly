# Installation Guide

This guide will help you install and set up Adaptly in your React or Next.js project.

## 📋 Prerequisites

Before installing Adaptly, ensure you have:

- **Node.js**: Version 18 or higher
- **React**: Version 18 or 19
- **TypeScript**: Version 5.0 or higher (recommended)
- **Package Manager**: npm, yarn, pnpm, or bun

## 🚀 Installation

### Step 1: Install Adaptly

Choose your preferred package manager:

```bash
# Using npm
npm install adaptly

# Using yarn
yarn add adaptly

# Using pnpm
pnpm add adaptly

# Using bun
bun add adaptly
```

### Step 2: Install Peer Dependencies

Adaptly requires React and React-DOM as peer dependencies. If you don't have them installed:

```bash
# Using npm
npm install react react-dom

# Using yarn
yarn add react react-dom

# Using pnpm
pnpm add react react-dom

# Using bun
bun add react react-dom
```

**Note**: All AI SDKs and UI dependencies are bundled automatically. You only need React and React-DOM as peer dependencies.

## 🔧 Project Setup

### For Next.js Projects

1. **Create a new Next.js project** (if starting fresh):

```bash
npx create-next-app@latest my-adaptly-app --typescript --tailwind --eslint
cd my-adaptly-app
```

2. **Install Adaptly**:

```bash
npm install adaptly
```

3. **Install additional dependencies** (if using shadcn/ui):

```bash
npx shadcn@latest init
npx shadcn@latest add command dialog
```

### For React Projects

1. **Create a new React project** (if starting fresh):

```bash
npx create-react-app my-adaptly-app --template typescript
cd my-adaptly-app
```

2. **Install Adaptly**:

```bash
npm install adaptly
```

3. **Install Tailwind CSS** (recommended):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 🔑 API Key Setup

Adaptly requires an API key from at least one LLM provider. You can use:

- **Google Gemini** (recommended for beginners)
- **OpenAI GPT**
- **Anthropic Claude**

### Google Gemini Setup

1. **Get your API key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Add to environment variables**:

```bash
# .env.local (Next.js)
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# .env (React)
REACT_APP_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### OpenAI Setup

1. **Get your API key**:
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key

2. **Add to environment variables**:

```bash
# .env.local (Next.js)
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here

# .env (React)
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

### Anthropic Setup

1. **Get your API key**:
   - Go to [Anthropic Console](https://console.anthropic.com/)
   - Create a new API key
   - Copy the key

2. **Add to environment variables**:

```bash
# .env.local (Next.js)
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here

# .env (React)
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

## 📁 Project Structure

After installation, your project should look like this:

```
my-adaptly-app/
├── src/
│   ├── app/ (Next.js) or src/ (React)
│   │   ├── layout.tsx (Next.js)
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/ (shadcn/ui components)
│   │   ├── MetricCard.tsx
│   │   ├── SalesChart.tsx
│   │   └── ...
│   └── adaptly.json
├── .env.local (Next.js) or .env (React)
├── package.json
└── tailwind.config.js
```

## 🎯 Basic Setup

### 1. Create adaptly.json

Create a `adaptly.json` file in your project root:

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

### 2. Create Your First Component

Create a simple component in `src/components/MetricCard.tsx`:

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-sm ${
            changeType === "positive" ? "text-green-600" : 
            changeType === "negative" ? "text-red-600" : 
            "text-gray-600"
          }`}>
            {change}
          </p>
        )}
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {progress !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
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

### 3. Set Up AdaptlyProvider

In your main page component (`src/app/page.tsx` for Next.js or `src/App.tsx` for React):

```tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from '../adaptly.json';
import { MetricCard } from '@/components/MetricCard';

export default function Home() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
      provider="google"
      model="gemini-2.0-flash-exp"
      components={{ MetricCard }}
      adaptlyConfig={adaptlyConfig}
      enableStorage={true}
      storageKey="my-app-ui"
    />
  );
}
```

## 🧪 Testing Your Installation

1. **Start your development server**:

```bash
# Next.js
npm run dev

# React
npm start
```

2. **Open your browser** and navigate to your app

3. **Press `⌘K`** (or `Ctrl+K` on Windows/Linux) to open the command interface

4. **Try a command** like "Add a metric card" or "Create a dashboard"

5. **Watch the AI work** - it should dynamically add and arrange components

## 🔧 Configuration Options

### AdaptlyProvider Props

```tsx
<AdaptlyProvider
  // Required
  apiKey="your-api-key"
  components={{ MetricCard, SalesChart }}
  adaptlyConfig={adaptlyConfig}
  
  // Optional
  provider="google" // or "openai" or "anthropic"
  model="gemini-2.0-flash-exp"
  enableStorage={true}
  storageKey="my-app-ui"
  storageVersion="1.0.0"
  defaultLayout={{
    components: [],
    layout: "grid",
    spacing: 6,
    columns: 6
  }}
  className="h-full"
  style={{}}
  aiSuggestions={[
    { value: "Add metrics", label: "📊 Add metrics" }
  ]}
  showAISuggestions={true}
  showUtilityCommands={true}
  customLoader={MyCustomLoader}
/>
```

## 🚨 Common Issues

### Issue: "Component not found" error

**Solution**: Make sure your component is properly registered in the `components` prop and defined in `adaptly.json`.

### Issue: "API key not found" error

**Solution**: Check that your environment variable is correctly set and prefixed with `NEXT_PUBLIC_` (Next.js) or `REACT_APP_` (React).

### Issue: "adaptly.json validation failed"

**Solution**: Ensure your `adaptly.json` file has the correct structure with required fields: `description`, `props`, `useCases`, and `space`.

### Issue: Components not rendering

**Solution**: Check that your components are properly exported and imported, and that they match the types defined in `adaptly.json`.

## 📚 Next Steps

Now that you have Adaptly installed and configured:

1. **Read the [Quick Start Guide](./quick-start.md)** to build your first adaptive UI
2. **Learn about [Component Registry](./component-registry.md)** to configure more components
3. **Explore [LLM Providers](./llm-providers.md)** to set up multiple AI providers
4. **Check out the [Demo Application](../examples/adaptly-demo/)** for a complete example

## 🆘 Need Help?

- **Documentation**: Check other guides in this documentation
- **Examples**: Look at the demo application in `/examples`
- **Issues**: [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions)

---

Ready to build your first adaptive UI? Check out the [Quick Start Guide](./quick-start.md)!
