---
layout: default
title: Component Registry Guide
description: Configure your components for AI understanding
---

The component registry is the heart of Adaptly. It tells the AI about your components, their capabilities, and how they should be used. This guide covers everything you need to know about configuring your components for AI understanding.

## 📋 Overview

The component registry is defined in `adaptly.json` and serves as a bridge between your React components and the AI. It provides the AI with:

- **Component descriptions** - What each component does
- **Property definitions** - What props are available and their types
- **Use cases** - When and why to use each component
- **Space requirements** - How much space each component needs

## 🏗️ Registry Structure

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
      "useCases": ["use case 1", "use case 2"],
      "space": {
        "min": [2, 1],
        "max": [4, 3],
        "preferred": [3, 2]
      }
    }
  }
}
```

### Required Fields

Every component definition must include:

- **`description`** - Human-readable description of what the component does
- **`props`** - Object defining all available properties
- **`useCases`** - Array of use cases where this component is appropriate
- **`space`** - Object defining space requirements (min, max, preferred)

## 🔧 Property Configuration

### Property Types

```json
{
  "props": {
    "title": {
      "type": "string",
      "required": true
    },
    "value": {
      "type": "number",
      "required": false
    },
    "isVisible": {
      "type": "boolean",
      "required": false
    },
    "items": {
      "type": "array",
      "required": false
    },
    "config": {
      "type": "object",
      "required": false
    }
  }
}
```

### Supported Types

- **`string`** - Text values
- **`number`** - Numeric values
- **`boolean`** - True/false values
- **`array`** - Lists of items
- **`object`** - Complex data structures

### Property Options

```json
{
  "status": {
    "type": "string",
    "required": true,
    "allowed": ["active", "inactive", "pending"]
  },
  "priority": {
    "type": "number",
    "required": false,
    "min": 1,
    "max": 10
  }
}
```

## 📐 Space Requirements

Space requirements tell the AI how much grid space each component needs:

```json
{
  "space": {
    "min": [2, 1],    // Minimum width, height
    "max": [4, 3],    // Maximum width, height
    "preferred": [3, 2] // Preferred width, height
  }
}
```

### Space Guidelines

- **Minimum**: The smallest space the component can function in
- **Maximum**: The largest space the component should occupy
- **Preferred**: The ideal space for the component

### Common Space Patterns

```json
// Small metric card
"space": { "min": [1, 1], "max": [2, 1], "preferred": [2, 1] }

// Medium chart
"space": { "min": [3, 2], "max": [6, 4], "preferred": [4, 3] }

// Large table
"space": { "min": [4, 3], "max": [6, 8], "preferred": [6, 6] }

// Full-width component
"space": { "min": [6, 2], "max": [6, 4], "preferred": [6, 3] }
```

## 🎯 Use Cases

Use cases help the AI understand when to use each component:

```json
{
  "useCases": [
    "revenue tracking",
    "user metrics", 
    "performance indicators",
    "KPI display",
    "dashboard summary"
  ]
}
```

### Effective Use Cases

- **Be specific**: "revenue tracking" vs "metrics"
- **Use common terms**: "dashboard", "analytics", "monitoring"
- **Include synonyms**: "KPI display", "performance indicators"
- **Think like a user**: What would someone search for?

## 📝 Complete Examples

### MetricCard Component

```json
{
  "MetricCard": {
    "description": "Display key performance indicators with values, trends, and progress bars",
    "props": {
      "title": {
        "type": "string",
        "required": true
      },
      "value": {
        "type": "string",
        "required": true
      },
      "change": {
        "type": "string",
        "required": false
      },
      "changeType": {
        "type": "string",
        "required": false,
        "allowed": ["positive", "negative", "neutral"]
      },
      "progress": {
        "type": "number",
        "required": false
      },
      "description": {
        "type": "string",
        "required": false
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
    }
  }
}
```

### SalesChart Component

```json
{
  "SalesChart": {
    "description": "Visualize sales data with interactive charts and graphs",
    "props": {
      "title": {
        "type": "string",
        "required": false
      },
      "description": {
        "type": "string",
        "required": false
      },
      "timeRange": {
        "type": "string",
        "required": false,
        "allowed": ["7d", "30d", "90d", "1y"]
      },
      "metric": {
        "type": "string",
        "required": false,
        "allowed": ["sales", "revenue", "profit", "orders"]
      },
      "category": {
        "type": "string",
        "required": false
      },
      "sortBy": {
        "type": "string",
        "required": false,
        "allowed": ["date", "value", "growth"]
      },
      "sortOrder": {
        "type": "string",
        "required": false,
        "allowed": ["asc", "desc"]
      }
    },
    "useCases": [
      "sales visualization",
      "trend analysis",
      "performance charts",
      "revenue tracking",
      "data visualization"
    ],
    "space": {
      "min": [3, 3],
      "max": [6, 5],
      "preferred": [4, 4]
    }
  }
}
```

### DataTable Component

```json
{
  "DataTable": {
    "description": "Display tabular data with filtering, sorting, and pagination",
    "props": {
      "title": {
        "type": "string",
        "required": true
      },
      "data": {
        "type": "array",
        "required": true
      },
      "columns": {
        "type": "array",
        "required": true
      },
      "filters": {
        "type": "object",
        "required": false
      },
      "sortBy": {
        "type": "string",
        "required": false
      },
      "sortOrder": {
        "type": "string",
        "required": false,
        "allowed": ["asc", "desc"]
      }
    },
    "useCases": [
      "data display",
      "tabular information",
      "sortable lists",
      "data tables",
      "information display"
    ],
    "space": {
      "min": [4, 4],
      "max": [6, 8],
      "preferred": [6, 6]
    }
  }
}
```

## 🎨 Advanced Configuration

### Conditional Properties

```json
{
  "Chart": {
    "description": "Interactive chart component with multiple chart types",
    "props": {
      "type": {
        "type": "string",
        "required": true,
        "allowed": ["line", "bar", "pie", "area"]
      },
      "data": {
        "type": "array",
        "required": true
      },
      "showLegend": {
        "type": "boolean",
        "required": false
      },
      "animation": {
        "type": "boolean",
        "required": false
      }
    },
    "useCases": [
      "data visualization",
      "chart display",
      "analytics",
      "trend analysis"
    ],
    "space": {
      "min": [3, 3],
      "max": [6, 6],
      "preferred": [4, 4]
    }
  }
}
```

### Complex Data Structures

```json
{
  "UserProfile": {
    "description": "Display user information with avatar and contact details",
    "props": {
      "user": {
        "type": "object",
        "required": true
      },
      "showContact": {
        "type": "boolean",
        "required": false
      },
      "showStatus": {
        "type": "boolean",
        "required": false
      }
    },
    "useCases": [
      "user profiles",
      "team members",
      "contact information",
      "user display"
    ],
    "space": {
      "min": [2, 2],
      "max": [3, 3],
      "preferred": [2, 2]
    }
  }
}
```

## 🔍 Best Practices

### 1. Write Clear Descriptions

```json
// Good
"description": "Display key performance indicators with values, trends, and progress bars"

// Bad
"description": "Shows numbers"
```

### 2. Use Specific Use Cases

```json
// Good
"useCases": ["revenue tracking", "user metrics", "performance indicators"]

// Bad
"useCases": ["data", "info", "stuff"]
```

### 3. Define Realistic Space Requirements

```json
// Good - realistic space requirements
"space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }

// Bad - unrealistic requirements
"space": { "min": [1, 1], "max": [12, 12], "preferred": [6, 6] }
```

### 4. Use Meaningful Property Names

```json
// Good
"timeRange": { "type": "string", "allowed": ["7d", "30d", "90d"] }

// Bad
"x": { "type": "string", "allowed": ["a", "b", "c"] }
```

### 5. Provide Helpful Allowed Values

```json
// Good
"status": {
  "type": "string",
  "allowed": ["active", "inactive", "pending", "archived"]
}

// Bad
"status": {
  "type": "string",
  "allowed": ["a", "b", "c"]
}
```

## 🚨 Common Mistakes

### 1. Missing Required Fields

```json
// ❌ Missing description
{
  "MyComponent": {
    "props": { "title": { "type": "string", "required": true } },
    "useCases": ["display"],
    "space": { "min": [1, 1], "max": [2, 2], "preferred": [1, 1] }
  }
}

// ✅ Complete definition
{
  "MyComponent": {
    "description": "Display component with title",
    "props": { "title": { "type": "string", "required": true } },
    "useCases": ["display"],
    "space": { "min": [1, 1], "max": [2, 2], "preferred": [1, 1] }
  }
}
```

### 2. Inconsistent Property Types

```json
// ❌ Inconsistent types
{
  "props": {
    "count": { "type": "string" },  // Should be number
    "active": { "type": "string" }   // Should be boolean
  }
}

// ✅ Correct types
{
  "props": {
    "count": { "type": "number" },
    "active": { "type": "boolean" }
  }
}
```

### 3. Unrealistic Space Requirements

```json
// ❌ Unrealistic space
"space": { "min": [1, 1], "max": [12, 12], "preferred": [6, 6] }

// ✅ Realistic space
"space": { "min": [2, 1], "max": [4, 3], "preferred": [3, 2] }
```

## 🧪 Testing Your Registry

### 1. Validation

Adaptly automatically validates your registry. Check the browser console for validation errors:

```bash
# Common validation errors
"Component 'MyComponent' must have a description"
"Component 'MyComponent' must have props defined"
"Component 'MyComponent' must have useCases array"
"Component 'MyComponent' must have space requirements"
```

### 2. Testing with AI

1. **Press `⌘K`** to open the command interface
2. **Try commands** that should use your components:
   - "Add a metric card"
   - "Show me some charts"
   - "Create a data table"
3. **Verify** that the AI selects the right components

### 3. Debug Mode

Enable debug logging to see how the AI processes your registry:

```tsx
<AdaptlyProvider
  // ... other props
  logging={{ enabled: true, level: "debug" }}
/>
```

## 🔄 Registry Updates

### Adding New Components

1. **Create the component** in your codebase
2. **Add to registry** in `adaptly.json`
3. **Register in AdaptlyProvider**:

```tsx
components={{
  MetricCard,
  SalesChart,
  DataTable,
  NewComponent, // Add your new component
}}
```

### Updating Existing Components

1. **Update the registry** in `adaptly.json`
2. **Update your component** if needed
3. **Test with AI** to ensure it still works

### Removing Components

1. **Remove from registry** in `adaptly.json`
2. **Remove from AdaptlyProvider**:

```tsx
components={{
  MetricCard,
  SalesChart,
  // DataTable removed
}}
```

## 📚 Next Steps

Now that you understand the component registry:

1. **Read the [LLM Providers Guide](./llm-providers.md)** to set up multiple AI providers
2. **Explore [Storage Service Guide](./storage-service.md)** for persistent state management
3. **Check out [Advanced Features](./advanced-features.md)** for custom configurations
4. **See the [Demo Application](../examples/adaptly-demo/)** for complete examples

## 🆘 Troubleshooting

### Registry Validation Errors

**Error**: "Component 'MyComponent' must have a description"

- **Solution**: Add a description field to your component definition

**Error**: "Component 'MyComponent' must have props defined"

- **Solution**: Add a props object with at least one property

**Error**: "Component 'MyComponent' must have useCases array"

- **Solution**: Add a useCases array with at least one use case

**Error**: "Component 'MyComponent' must have space requirements"

- **Solution**: Add space object with min, max, and preferred arrays

### AI Not Selecting Components

**Issue**: AI not using your components

- **Solution**: Check that use cases match what users are asking for
- **Solution**: Ensure descriptions are clear and specific
- **Solution**: Verify space requirements are realistic

### Component Not Rendering

**Issue**: Component appears in AI response but doesn't render

- **Solution**: Check that component is properly exported
- **Solution**: Verify component is registered in AdaptlyProvider
- **Solution**: Ensure component props match the registry definition

---

Ready to set up multiple AI providers? Check out the [LLM Providers Guide](./llm-providers.md)!
