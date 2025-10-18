# Component Registry System

A comprehensive JSON-based registry system for managing adaptive UI components with intelligent placement and LLM integration capabilities.

## 📁 File Structure

```
component-registry.json          # Main registry file
src/components/adaptly/
├── registry-service.ts          # Service for reading registry
├── registry-viewer.tsx          # UI for browsing components
└── adaptive-ui-provider.tsx     # Integration with adaptive system
```

## 🎯 Key Features

### **JSON-Based Registry**

- **Human-readable** component definitions
- **Version controlled** component metadata
- **Easy to modify** without code changes
- **LLM-friendly** structure for AI integration

### **Intelligent Component Placement**

- **Grid requirements** for optimal sizing
- **Responsive behavior** across devices
- **Priority-based** component suggestions
- **Context-aware** recommendations

### **Component Metadata**

Each component includes:

- **Basic info**: name, description, category, icon
- **Grid requirements**: min/max/preferred dimensions
- **Props definition**: required, optional, defaults, validation
- **Examples**: use cases and sample configurations
- **Priority levels**: high, medium, low

## 📋 Registry Structure

### **Component Definition**

```json
{
  "id": "metric-card",
  "name": "Metric Card",
  "description": "Display key performance indicators",
  "category": "metrics",
  "icon": "DollarSign",
  "tags": ["kpi", "metric", "stat"],
  "gridRequirements": {
    "minWidth": 1,
    "maxWidth": 3,
    "preferredWidth": 2,
    "preferredHeight": 1,
    "responsive": {
      "mobile": { /* mobile-specific requirements */ },
      "tablet": { /* tablet-specific requirements */ },
      "desktop": { /* desktop-specific requirements */ }
    }
  },
  "props": {
    "required": ["title", "value"],
    "optional": ["change", "description"],
    "defaults": { "change": "+0%", "progress": 0 },
    "validation": { "progress": "value >= 0 && value <= 100" }
  },
  "examples": [
    {
      "name": "Revenue Metric",
      "props": { "title": "Total Revenue", "value": "$45,231.89" },
      "gridPosition": { "x": 0, "y": 0, "w": 2, "h": 1 },
      "useCase": "financial dashboard"
    }
  ],
  "priority": "high"
}
```

## 🔧 Usage

### **Registry Service**

```typescript
import { registryService } from "@/components/adaptly";

// Get all components
const components = registryService.getAllComponents();

// Get components by category
const metrics = registryService.getComponentsByCategory("metrics");

// Get components for specific space
const suitable = registryService.getComponentsForPosition(4, 2, "desktop");

// Get suggestions for user input
const suggestions = registryService.getSuggestions("add chart", { width: 6, height: 3 });
```

### **Component Suggestions**

The registry service provides intelligent suggestions based on:

- **Available space** (width × height)
- **User input** (natural language)
- **Component requirements** (grid constraints)
- **Priority levels** (high, medium, low)
- **Context matching** (tags, categories)

### **Integration with Adaptive UI**

The registry integrates seamlessly with the adaptive UI system:

- **Automatic component mapping** from registry IDs to React components
- **Intelligent positioning** based on grid requirements
- **Props generation** from component defaults and user context
- **Responsive behavior** across different screen sizes

## 🎨 Component Categories

### **Metrics** (High Priority)

- Metric cards with KPIs
- System performance indicators
- Progress bars and gauges

### **Charts** (High Priority)

- Sales and revenue charts
- Device usage pie charts
- Time-series visualizations

### **Tables** (Medium Priority)

- Data tables with actions
- Order lists with status
- User management tables

### **Lists** (Low Priority)

- Team member displays
- User lists with avatars
- Contact information

### **Controls** (Low Priority)

- Quick action buttons
- System settings panels
- Configuration controls

## 🚀 Adding New Components

### **1. Update Registry JSON**

Add your component to `component-registry.json`:

```json
{
  "id": "custom-widget",
  "name": "Custom Widget",
  "description": "Your custom component",
  "category": "custom",
  "icon": "CustomIcon",
  "tags": ["custom", "widget", "special"],
  "gridRequirements": {
    "minWidth": 2,
    "maxWidth": 4,
    "minHeight": 2,
    "maxHeight": 3,
    "preferredWidth": 3,
    "preferredHeight": 2,
    "aspectRatio": 1.5,
    "responsive": {
      "mobile": { /* mobile requirements */ },
      "tablet": { /* tablet requirements */ },
      "desktop": { /* desktop requirements */ }
    }
  },
  "props": {
    "required": ["title"],
    "optional": ["description", "data"],
    "defaults": { "description": "Custom widget" },
    "validation": {}
  },
  "examples": [
    {
      "name": "Custom Example",
      "props": { "title": "Custom Widget", "data": [] },
      "gridPosition": { "x": 0, "y": 0, "w": 3, "h": 2 },
      "useCase": "custom dashboard"
    }
  ],
  "priority": "medium"
}
```

### **2. Create React Component**

Implement your component in the components folder:

```typescript
// src/components/CustomWidget.tsx
export function CustomWidget({ title, description, data }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your component content */}
      </CardContent>
    </Card>
  );
}
```

### **3. Update Component Registry**

Add your component to the registry service:

```typescript
// In adaptive-grid.tsx
const componentRegistry: Record<string, React.ComponentType<any>> = {
  // ... existing components
  CustomWidget,
};
```

### **4. Update Type Mapping**

Add the mapping in the adaptive UI provider:

```typescript
const typeMap: Record<string, string> = {
  // ... existing mappings
  "custom-widget": "CustomWidget",
};
```

## 🤖 LLM Integration

The registry is designed for easy LLM integration:

### **Natural Language Processing**

- **Component suggestions** based on user intent
- **Context-aware** recommendations
- **Priority-based** component selection
- **Grid-aware** positioning

### **Example LLM Prompts**

```
"Add a sales chart to show revenue trends"
→ Suggests: SalesChart component with appropriate props

"Show team members in a compact list"
→ Suggests: TeamMembers component with list layout

"Display system performance metrics"
→ Suggests: SystemMetrics component with monitoring props
```

### **LLM Response Format**

```json
{
  "suggestions": [
    {
      "component": { /* component metadata */ },
      "confidence": 0.85,
      "reasoning": "fits available space, matches context",
      "suggestedProps": { "title": "Sales Overview" },
      "suggestedPosition": { "x": 0, "y": 0, "w": 4, "h": 2 }
    }
  ]
}
```

## 📊 Registry Viewer

The `RegistryViewer` component provides a UI for browsing the registry:

- **Search and filter** components
- **Category-based** organization
- **Grid and list** view modes
- **Component details** and examples
- **Preview and code** actions

## 🔮 Future Enhancements

### **Advanced Features**

- **Dynamic component loading** from external sources
- **Component versioning** and updates
- **A/B testing** for component variations
- **Usage analytics** and optimization

### **LLM Integration**

- **Natural language** component generation
- **Context-aware** layout suggestions
- **Intelligent** component combinations
- **Automated** dashboard creation

This registry system provides a solid foundation for building intelligent, adaptive UI systems that can understand user intent and automatically generate appropriate component layouts!
