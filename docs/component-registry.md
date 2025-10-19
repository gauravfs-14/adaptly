# Component Registry

The Component Registry is the heart of Adaptly's AI system. It tells the AI what components are available, their properties, use cases, and space requirements. This guide covers everything you need to know about registering and managing components.

## 🎯 What is the Component Registry?

The Component Registry is a JSON configuration file (`adaptly.json`) that defines:

- **Available Components**: What components the AI can use
- **Component Properties**: What props each component accepts
- **Use Cases**: When each component should be used
- **Space Requirements**: How much space each component needs
- **Component Metadata**: Descriptions, categories, and more

## 📁 Registry File Structure

### Basic Structure

```json
{
  "version": "1.0.0",
  "components": {
    "ComponentName": {
      "description": "What this component does",
      "props": {
        "propName": {
          "type": "string",
          "required": true,
          "allowed": ["option1", "option2"]
        }
      },
      "useCases": ["dashboard", "analytics"],
      "space": {
        "min": [2, 1],
        "max": [4, 3],
        "preferred": [3, 2]
      }
    }
  }
}
```

### Complete Example

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values, trends, and progress bars",
      "props": {
        "title": {
          "type": "string",
          "required": true,
          "description": "The metric title"
        },
        "value": {
          "type": "string",
          "required": true,
          "description": "The metric value"
        },
        "change": {
          "type": "string",
          "required": false,
          "description": "Change percentage or value"
        },
        "changeType": {
          "type": "string",
          "required": false,
          "allowed": ["positive", "negative", "neutral"],
          "description": "Type of change indicator"
        },
        "progress": {
          "type": "number",
          "required": false,
          "description": "Progress percentage (0-100)"
        }
      },
      "useCases": [
        "revenue tracking",
        "user metrics", 
        "performance indicators",
        "KPI display",
        "dashboard summary"
      ],
      "space": {
        "min": [2, 1],
        "max": [3, 2],
        "preferred": [2, 1]
      },
      "category": "metrics",
      "priority": "high",
      "tags": ["kpi", "metrics", "dashboard"]
    }
  }
}
```

## 🔧 Component Registration

### 1. Basic Component Registration

```json
{
  "components": {
    "SimpleCard": {
      "description": "A basic card component",
      "props": {
        "title": { "type": "string", "required": true },
        "content": { "type": "string", "required": true }
      },
      "useCases": ["general", "content"],
      "space": { "min": [2, 2], "max": [4, 4], "preferred": [3, 3] }
    }
  }
}
```

### 2. Advanced Component Registration

```json
{
  "components": {
    "DataTable": {
      "description": "Display tabular data with filtering, sorting, and pagination",
      "props": {
        "title": {
          "type": "string",
          "required": true,
          "description": "Table title"
        },
        "data": {
          "type": "array",
          "required": true,
          "description": "Array of data objects"
        },
        "columns": {
          "type": "array",
          "required": true,
          "description": "Column definitions"
        },
        "filters": {
          "type": "object",
          "required": false,
          "description": "Filter configuration"
        },
        "sortBy": {
          "type": "string",
          "required": false,
          "allowed": ["name", "date", "value"],
          "description": "Default sort column"
        },
        "sortOrder": {
          "type": "string",
          "required": false,
          "allowed": ["asc", "desc"],
          "description": "Sort direction"
        }
      },
      "useCases": [
        "data display",
        "tabular information",
        "sortable lists",
        "data analysis",
        "reporting"
      ],
      "space": {
        "min": [4, 4],
        "max": [6, 8],
        "preferred": [6, 6]
      },
      "category": "data",
      "priority": "high",
      "tags": ["table", "data", "sorting", "filtering"]
    }
  }
}
```

## 📏 Space Requirements

The `space` property defines how much space each component needs:

```json
{
  "space": {
    "min": [2, 1],      // Minimum width, height (grid units)
    "max": [4, 3],      // Maximum width, height (grid units)
    "preferred": [3, 2] // Preferred width, height (grid units)
  }
}
```

### Space Guidelines

- **Small components**: `min: [1, 1], max: [2, 2], preferred: [2, 1]`
- **Medium components**: `min: [2, 2], max: [4, 4], preferred: [3, 3]`
- **Large components**: `min: [4, 3], max: [6, 6], preferred: [5, 4]`
- **Full-width components**: `min: [6, 2], max: [6, 4], preferred: [6, 3]`

## 🏷️ Use Cases and Categories

### Use Cases

Use cases help the AI understand when to use each component:

```json
{
  "useCases": [
    "dashboard",      // General dashboard use
    "analytics",      // Data analysis
    "reporting",      // Reports and summaries
    "monitoring",     // System monitoring
    "user management", // User-related features
    "financial",      // Financial data
    "sales",          // Sales-related
    "marketing"       // Marketing data
  ]
}
```

### Categories

Categories help organize components:

```json
{
  "category": "metrics", // metrics, charts, tables, forms, etc.
}
```

### Tags

Tags provide additional context:

```json
{
  "tags": ["kpi", "dashboard", "real-time", "interactive"]
}
```

## 🎨 Component Props

### Prop Types

```json
{
  "props": {
    "stringProp": {
      "type": "string",
      "required": true,
      "description": "A string property"
    },
    "numberProp": {
      "type": "number",
      "required": false,
      "description": "A numeric property"
    },
    "booleanProp": {
      "type": "boolean",
      "required": false,
      "description": "A boolean property"
    },
    "arrayProp": {
      "type": "array",
      "required": true,
      "description": "An array property"
    },
    "objectProp": {
      "type": "object",
      "required": false,
      "description": "An object property"
    }
  }
}
```

### Prop Validation

```json
{
  "props": {
    "status": {
      "type": "string",
      "required": true,
      "allowed": ["active", "inactive", "pending"],
      "description": "Component status"
    },
    "priority": {
      "type": "string",
      "required": false,
      "allowed": ["low", "medium", "high", "critical"],
      "description": "Priority level"
    },
    "count": {
      "type": "number",
      "required": false,
      "min": 0,
      "max": 100,
      "description": "Item count"
    }
  }
}
```

## 🔄 Dynamic Component Registration

### Runtime Registration

You can register components dynamically in your React components:

```tsx
import { useAdaptiveUI } from 'adaptly';

function MyComponent() {
  const { updateAdaptation } = useAdaptiveUI();
  
  const addCustomComponent = () => {
    updateAdaptation({
      components: [
        {
          id: 'custom-' + Date.now(),
          type: 'CustomComponent',
          props: { title: 'Custom', value: '123' },
          position: { x: 0, y: 0, w: 2, h: 1 },
          visible: true
        }
      ]
    });
  };
  
  return (
    <button onClick={addCustomComponent}>
      Add Custom Component
    </button>
  );
}
```

### Conditional Registration

Register components based on user permissions or feature flags:

```tsx
const getAvailableComponents = (userRole: string) => {
  const baseComponents = { MetricCard, DataTable };
  
  if (userRole === 'admin') {
    return {
      ...baseComponents,
      AdminPanel,
      UserManagement
    };
  }
  
  return baseComponents;
};
```

## 🧪 Testing Your Registry

### Validation

Use the registry service to validate your configuration:

```tsx
import { RegistryService } from 'adaptly';

const registry = new RegistryService(adaptlyConfig);
const isValid = registry.validateRegistry();

if (!isValid) {
  console.error('Registry validation failed:', registry.getErrors());
}
```

### Component Suggestions

Test how the AI suggests components:

```tsx
const suggestions = registry.getSuggestions(
  "I need to show sales data",
  { width: 6, height: 4 },
  "desktop"
);

console.log('AI suggestions:', suggestions);
```

## 📚 Best Practices

### 1. Descriptive Names

Use clear, descriptive component names:

```json
{
  "components": {
    "RevenueMetricCard": { /* ... */ },
    "UserActivityChart": { /* ... */ },
    "OrderStatusTable": { /* ... */ }
  }
}
```

### 2. Comprehensive Descriptions

Provide detailed descriptions for the AI:

```json
{
  "description": "Display real-time user activity metrics with trend analysis and interactive filtering capabilities"
}
```

### 3. Realistic Space Requirements

Set realistic space requirements based on actual component needs:

```json
{
  "space": {
    "min": [2, 1],      // Don't make components too small
    "max": [4, 3],      // Don't make components too large
    "preferred": [3, 2] // Set realistic preferred size
  }
}
```

### 4. Comprehensive Use Cases

Include all relevant use cases:

```json
{
  "useCases": [
    "dashboard",
    "analytics", 
    "reporting",
    "monitoring",
    "user management"
  ]
}
```

### 5. Proper Prop Validation

Define clear prop requirements and validation:

```json
{
  "props": {
    "title": {
      "type": "string",
      "required": true,
      "description": "Component title",
      "minLength": 1,
      "maxLength": 100
    }
  }
}
```

## 🚀 Advanced Features

### Component Dependencies

Define component relationships:

```json
{
  "components": {
    "ChartContainer": {
      "description": "Container for chart components",
      "dependencies": ["SalesChart", "RevenueChart"],
      "space": { "min": [4, 3], "max": [6, 5], "preferred": [5, 4] }
    }
  }
}
```

### Conditional Rendering

Define when components should be shown:

```json
{
  "components": {
    "AdminPanel": {
      "description": "Administrative controls",
      "conditions": {
        "userRole": ["admin", "superuser"],
        "permissions": ["manage_users", "view_analytics"]
      }
    }
  }
}
```

### Component Variants

Define different variants of the same component:

```json
{
  "components": {
    "MetricCard": {
      "description": "Display key metrics",
      "variants": {
        "compact": { "space": { "min": [1, 1], "max": [2, 1], "preferred": [2, 1] } },
        "detailed": { "space": { "min": [3, 2], "max": [4, 3], "preferred": [3, 2] } }
      }
    }
  }
}
```

## 🆘 Troubleshooting

### Common Issues

**Components not appearing:**

- Check component names match between registry and React components
- Verify props match the registry definition
- Ensure components are properly exported

**AI not suggesting components:**

- Check use cases are relevant to user input
- Verify descriptions are clear and comprehensive
- Ensure space requirements are realistic

**Props not working:**

- Verify prop types match between registry and component
- Check required props are provided
- Ensure prop validation rules are correct

### Debug Tools

Enable debug logging to see registry processing:

```tsx
<AdaptlyProvider
  logging={{
    enabled: true,
    level: "debug"
  }}
  // ... other props
>
```

## 📖 Next Steps

Now that you understand the Component Registry:

1. **Read the [AI Integration Guide](./ai-integration.md)** - Learn how the AI uses your registry
2. **Check out [Advanced Layouts](./tutorials/advanced-layouts.md)** - Build complex layouts
3. **Explore [Custom Components](./custom-components.md)** - Create your own components
4. **Try the [Basic Dashboard Tutorial](./tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to build more complex components?** Check out the [Custom Components Guide](./custom-components.md) next!
