# Adaptly Demo Application

A comprehensive Next.js demonstration of the Adaptly AI-powered adaptive UI framework. This example showcases how to build intelligent dashboards that respond to natural language commands.

## 🎯 What This Demo Shows

- **AI-Powered UI Generation**: Natural language to UI layout conversion
- **Multi-LLM Support**: Switch between Google Gemini, OpenAI GPT, and Anthropic Claude
- **Component Registry**: How to register and configure components with adaptly.json
- **Adaptive Layouts**: Dynamic grid systems that respond to user input
- **Command Interface**: `⌘K` command bar implementation with AI suggestions
- **Persistent Storage**: UI state is saved and restored across sessions
- **Real-world Components**: Dashboard, charts, tables, and more
- **Provider Selection**: Live switching between different LLM providers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- At least one API key from:
  - Google Gemini API key
  - OpenAI API key
  - Anthropic API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gauravfs-14/adaptly.git
   cd adaptly/examples/adaptly-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys (at least one required):

   ```env
   # Google Gemini (recommended)
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   
   # OpenAI GPT (optional)
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   
   # Anthropic Claude (optional)
   NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Select your LLM provider** from the dropdown in the top-right corner
2. **Press `⌘K`** (or `Ctrl+K` on Windows/Linux) to open the command interface
3. **Describe what you want**: Try commands like:
   - "Create a sales dashboard"
   - "Add revenue metrics"
   - "Show team performance"
   - "Create a data table"
   - "Make the layout more compact"
   - "Add more visual elements"
   - "Show me analytics and charts"
   - "Create a monitoring dashboard"

4. **Watch the AI work**: The interface will dynamically rearrange and add components based on your description
5. **Your changes are saved**: Refresh the page and your layout will be restored

## 🧩 Available Components

The demo includes these pre-configured components:

- **MetricCard**: Key performance indicators with trends and progress bars
- **SalesChart**: Interactive charts and graphs with filtering options
- **DataTable**: Tabular data with filtering and sorting (OrdersTable)
- **TeamMembers**: Team member cards with roles and avatars
- **ActivityFeed**: Real-time activity timeline with sample data
- **NotificationCenter**: Centralized notification management with filtering
- **WeatherWidget**: Weather conditions and forecasts with sample data
- **QuickStats**: Compact KPI displays with multiple metrics
- **ResourceMonitor**: System resource utilization monitoring
- **EmptyCard**: Placeholder for empty states and fallbacks

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx            # Main dashboard page with AdaptlyProvider
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── MetricCard.tsx      # Sample metric component
│   ├── SalesChart.tsx      # Sample chart component
│   ├── TeamMembers.tsx    # Team member component
│   ├── OrdersTable.tsx    # Data table component
│   ├── ActivityFeed.tsx    # Activity timeline component
│   ├── NotificationCenter.tsx # Notification component
│   ├── WeatherWidget.tsx  # Weather component
│   ├── QuickStats.tsx     # Quick stats component
│   ├── ResourceMonitor.tsx # Resource monitoring component
│   ├── EmptyCard.tsx      # Empty state component
│   └── ...                 # Other demo components
├── adaptly.json           # Component registry configuration
└── components.json        # shadcn/ui configuration
```

## ⚙️ Configuration

### adaptly.json

This file defines your component registry - what components are available to the AI:

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
    }
  }
}
```

## 🎨 Customization

### Adding New Components

1. **Create your component** in `src/components/`
2. **Register it** in `adaptly.json` with proper props, use cases, and space requirements
3. **Add it to the components object** in `page.tsx`
4. **Add icons** to the icons object if needed
5. **Test with `⌘K`** - describe your new component

### LLM Provider Configuration

The demo supports multiple LLM providers with live switching:

- **Google Gemini**: Default provider with experimental models
- **OpenAI GPT**: GPT-4, GPT-4o, and other models
- **Anthropic Claude**: Claude 3.5 Sonnet and other models

You can switch providers using the dropdown in the top-right corner.

### Styling

The demo uses:

- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **next-themes** for dark/light mode
- **Lucide React** for icons
- **Recharts** for data visualization
- **Sonner** for toast notifications

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables**
4. **Deploy**

### Other Platforms

The demo works on any platform that supports Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Files to Modify

- `src/app/page.tsx` - Main dashboard implementation with AdaptlyProvider
- `adaptly.json` - Component registry configuration
- `src/components/` - Your custom components
- `src/components/ui/` - shadcn/ui components
- `components.json` - shadcn/ui configuration

## 📚 Learn More

- [Adaptly Documentation](../docs/)
- [Adaptly Core Library](../adaptly-lib/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [Lucide React Icons](https://lucide.dev/)

## 🤝 Contributing

Found a bug or want to add a feature? We'd love your help!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.
