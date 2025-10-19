# Installation & Setup

This guide will walk you through installing and setting up Adaptly in your React or Next.js application.

## 📋 Prerequisites

Before installing Adaptly, ensure you have:

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **npm, yarn, pnpm, or bun** - Package manager
- **React 19+** - Core framework dependency
- **TypeScript** (recommended) - For type safety
- **Google Gemini API key** (optional) - For AI functionality

## 🚀 Installation

### Using npm

```bash
npm install adaptly
```

### Using yarn

```bash
yarn add adaptly
```

### Using pnpm

```bash
pnpm add adaptly
```

### Using bun

```bash
bun add adaptly
```

## 🔧 Basic Setup

### 1. Install Adaptly

Adaptly includes all necessary dependencies. Simply install the package:

```bash
npm install adaptly
```

**Note**: All dependencies (React, AI SDK, UI components, etc.) are included automatically.

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# Google Gemini API Key (required for AI features)
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
# or
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

**Getting a Gemini API Key:**

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project
3. Generate an API key
4. Copy the key to your environment variables

### 3. Component Registry

Create an `adaptly.json` file in your project root:

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
    "DataTable": {
      "description": "Display tabular data with filtering and sorting",
      "props": {
        "title": { "type": "string", "required": true },
        "data": { "type": "array", "required": true },
        "columns": { "type": "array", "required": true }
      },
      "useCases": ["data display", "tabular information"],
      "space": { "min": [4, 4], "max": [6, 8], "preferred": [6, 6] }
    }
  }
}
```

### 4. Basic Implementation

```tsx
// app/page.tsx or your main component
import { AdaptlyProvider, AdaptiveLayout, AdaptiveCommand } from 'adaptly';
import adaptlyConfig from '../adaptly.json';

// Your components
import { MetricCard } from '@/components/MetricCard';
import { DataTable } from '@/components/DataTable';

export default function App() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}
      components={{
        MetricCard,
        DataTable,
      }}
      adaptlyConfig={adaptlyConfig}
    >
      <AdaptiveCommand />
      <AdaptiveLayout />
    </AdaptlyProvider>
  );
}
```

## 🎨 Styling Setup

### Tailwind CSS (Recommended)

1. **Install Tailwind CSS:**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/adaptly/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. **Add to your CSS:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### shadcn/ui (Optional but Recommended)

1. **Initialize shadcn/ui:**

```bash
npx shadcn-ui@latest init
```

2. **Install required components:**

```bash
npx shadcn-ui@latest add command dialog
```

## 🔧 Advanced Configuration

### TypeScript Setup

If using TypeScript, create a `types/adaptly.d.ts` file:

```typescript
declare module 'adaptly' {
  export * from 'adaptly/dist/index';
}
```

### Next.js App Router Setup

For Next.js 13+ with App Router:

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Pages Router Setup

For Next.js with Pages Router:

```tsx
// pages/_app.tsx
import { AdaptlyProvider } from 'adaptly';
import adaptlyConfig from '../adaptly.json';

function MyApp({ Component, pageProps }) {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}
      components={{}}
      adaptlyConfig={adaptlyConfig}
    >
      <Component {...pageProps} />
    </AdaptlyProvider>
  );
}

export default MyApp;
```

## 🧪 Testing Your Setup

### 1. Create a Test Component

```tsx
// components/TestComponent.tsx
export function TestComponent({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
```

### 2. Register the Component

Add to your `adaptly.json`:

```json
{
  "components": {
    "TestComponent": {
      "description": "A simple test component",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true }
      },
      "useCases": ["testing", "demo"],
      "space": { "min": [2, 2], "max": [4, 4], "preferred": [3, 3] }
    }
  }
}
```

### 3. Test the Command Interface

1. Run your application
2. Press `⌘K` (or `Ctrl+K`)
3. Type: "Add a test component"
4. Watch the AI generate the layout

## 🚨 Troubleshooting

### Common Issues

**1. "Module not found" errors:**

- Ensure all peer dependencies are installed
- Check your import paths
- Verify TypeScript configuration

**2. "API key not found" warnings:**

- Check your environment variables
- Ensure the key is prefixed with `NEXT_PUBLIC_`
- Restart your development server

**3. Components not rendering:**

- Verify component registration in `adaptly.json`
- Check component props match the registry
- Ensure components are passed to `AdaptlyProvider`

**4. Styling issues:**

- Ensure Tailwind CSS is properly configured
- Check CSS imports
- Verify Tailwind content paths include Adaptly

### Debug Mode

Enable debug logging:

```tsx
<AdaptlyProvider
  // ... other props
  logging={{
    enabled: true,
    level: "debug"
  }}
>
  {/* Your app */}
</AdaptlyProvider>
```

## 📚 Next Steps

Once you have Adaptly installed and configured:

1. **Read the [Quick Start Guide](./quick-start.md)** - Learn the basics
2. **Explore the [Component Registry](./component-registry.md)** - Understand component registration
3. **Check out [Examples](./examples.md)** - See real-world implementations
4. **Follow the [Basic Dashboard Tutorial](./tutorials/basic-dashboard.md)** - Build your first adaptive dashboard

## 🆘 Need Help?

If you're still having issues:

- **Check the [Troubleshooting Guide](./troubleshooting.md)**
- **Search [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)**
- **Join our [Discord Community](https://discord.gg/adaptly)** (coming soon)
- **Read the [FAQ](./faq.md)**

---

**Ready to start building?** Check out the [Quick Start Guide](./quick-start.md) next!
