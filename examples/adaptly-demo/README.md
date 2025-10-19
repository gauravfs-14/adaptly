# Adaptly Demo Application

A comprehensive Next.js demonstration of the Adaptly AI-powered adaptive UI framework. This example showcases how to build intelligent dashboards that respond to natural language commands.

## 🎯 What This Demo Shows

- **AI-Powered UI Generation**: Natural language to UI layout conversion
- **Component Registry**: How to register and configure components
- **Adaptive Layouts**: Dynamic grid systems that respond to user input
- **Command Interface**: `⌘K` command bar implementation
- **Real-world Components**: Dashboard, charts, tables, and more

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Google Gemini API key

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

   Add your Gemini API key:

   ```env
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   # or
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
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

1. **Press `⌘K`** (or `Ctrl+K` on Windows/Linux) to open the command interface
2. **Describe what you want**: Try commands like:
   - "Create a sales dashboard"
   - "Add revenue metrics"
   - "Show team performance"
   - "Create a data table"
   - "Make the layout more compact"
   - "Add more visual elements"

3. **Watch the AI work**: The interface will dynamically rearrange and add components based on your description

## 🧩 Available Components

The demo includes these pre-configured components:

- **MetricCard**: Key performance indicators with trends
- **SalesChart**: Interactive charts and graphs
- **DataTable**: Tabular data with filtering and sorting
- **TeamMembers**: Team member cards with roles and avatars
- **ActivityFeed**: Real-time activity timeline
- **NotificationCenter**: Centralized notification management
- **WeatherWidget**: Weather conditions and forecasts
- **QuickStats**: Compact KPI displays
- **ResourceMonitor**: System resource utilization

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── MetricCard.tsx      # Sample metric component
│   ├── SalesChart.tsx     # Sample chart component
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
      "description": "Display key performance indicators",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true }
      },
      "useCases": ["dashboard", "analytics"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}
```

## 🎨 Customization

### Adding New Components

1. **Create your component** in `src/components/`
2. **Register it** in `adaptly.json`
3. **Add it to the components object** in `page.tsx`
4. **Test with `⌘K`** - describe your new component

### Styling

The demo uses:

- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **next-themes** for dark/light mode
- **Lucide React** for icons

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

- `src/app/page.tsx` - Main dashboard implementation
- `adaptly.json` - Component registry
- `src/components/` - Your custom components

## 📚 Learn More

- [Adaptly Documentation](../docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Found a bug or want to add a feature? We'd love your help!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.
