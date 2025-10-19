---
sidebar_position: 3
title: Component Registry
description: Learn how to configure your components in adaptly.json for AI understanding
---

# Component Registry Guide

The component registry is the heart of Adaptly's AI understanding. By defining your components in `adaptly.json`, you tell the AI what components are available, how to use them, and when to suggest them.

## What is adaptly.json?

`adaptly.json` is a configuration file that describes your components to the AI. It includes:

- **Component descriptions** - What each component does
- **Props definitions** - What properties each component accepts
- **Use cases** - When the AI should suggest each component
- **Space requirements** - How much space each component needs

## Basic Structure

```json
{
  "version": "1.0.0",
  "components": {
    "ComponentName": {
      "description": "What this component does",
      "props": { /* prop definitions */ },
      "useCases": ["when", "to", "use", "this"],
      "space": { "min": [width, height], "max": [width, height], "preferred": [width, height] }
    }
  }
}
```

## Minimal Example

Let's start with a simple MetricCard component:

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
        "changeType": { 
          "type": "string", 
          "required": false, 
          "allowed": ["positive", "negative", "neutral"] 
        },
        "progress": { "type": "number", "required": false },
        "description": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics", "performance indicators", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}
```

## Prop Definitions

Each prop in your component needs to be defined with:

### Required Fields

- **`type`**: The data type (`string`, `number`, `boolean`, `array`, `object`)
- **`required`**: Whether the prop is required (`true`/`false`)

### Optional Fields

- **`allowed`**: Array of allowed values for validation
- **`default`**: Default value (not used by AI, for documentation)

```json
{
  "title": { "type": "string", "required": true },
  "value": { "type": "string", "required": true },
  "change": { "type": "string", "required": false },
  "changeType": { 
    "type": "string", 
    "required": false, 
    "allowed": ["positive", "negative", "neutral"] 
  },
  "progress": { "type": "number", "required": false },
  "description": { "type": "string", "required": false }
}
```

## Use Cases

The `useCases` array tells the AI when to suggest each component. Use descriptive phrases that users might say:

```json
"useCases": [
  "revenue tracking",
  "user metrics", 
  "performance indicators",
  "KPI display",
  "sales data",
  "analytics overview"
]
```

**Good use cases:**

- "revenue tracking" ✅
- "user engagement" ✅
- "system performance" ✅

**Avoid:**

- "card" ❌ (too generic)
- "component" ❌ (not descriptive)
- "display" ❌ (too vague)

## Space Requirements

Define how much space each component needs in the grid:

```json
"space": { 
  "min": [2, 1],      // Minimum: 2 columns wide, 1 row tall
  "max": [3, 2],      // Maximum: 3 columns wide, 2 rows tall  
  "preferred": [2, 1] // Preferred: 2 columns wide, 1 row tall
}
```

### Space Guidelines

- **Small components** (buttons, badges): `min: [1,1], max: [2,1], preferred: [1,1]`
- **Medium components** (cards, metrics): `min: [2,1], max: [3,2], preferred: [2,1]`
- **Large components** (charts, tables): `min: [3,3], max: [6,4], preferred: [4,3]`
- **Full-width components**: `min: [4,2], max: [6,4], preferred: [6,3]`

## Progressive Examples

### 1. Single Component

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values, trends, and progress bars",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true }
      },
      "useCases": ["revenue tracking", "user metrics", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}
```

### 2. Three Components

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values, trends, and progress bars",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true },
        "change": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    },
    "SalesChart": {
      "description": "Visualize sales data with interactive charts and graphs",
      "props": {
        "title": { "type": "string", "required": false },
        "timeRange": { 
          "type": "string", 
          "required": false, 
          "allowed": ["7d", "30d", "90d", "1y"] 
        }
      },
      "useCases": ["sales visualization", "trend analysis", "performance charts"],
      "space": { "min": [3, 3], "max": [6, 5], "preferred": [4, 4] }
    },
    "TeamMembers": {
      "description": "Display team member cards with roles, avatars, and contact information",
      "props": {
        "title": { "type": "string", "required": false },
        "department": { "type": "string", "required": false },
        "limit": { "type": "number", "required": false }
      },
      "useCases": ["team display", "contact information", "user profiles"],
      "space": { "min": [2, 2], "max": [4, 4], "preferred": [3, 3] }
    }
  }
}
```

### 3. Full Demo Configuration

For a complete example with 10+ components, see the [demo application's adaptly.json](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/adaptly.json).

## Component Naming Conventions

### Good Names

- `MetricCard` ✅
- `SalesChart` ✅
- `TeamMembers` ✅
- `DataTable` ✅

### Avoid

- `Card` ❌ (too generic)
- `Component` ❌ (not descriptive)
- `metric-card` ❌ (use PascalCase)

## Validation and Errors

Adaptly validates your `adaptly.json` configuration and will show helpful error messages:

### Common Validation Errors

**Missing required fields:**

```json
// ❌ Error: Component 'MetricCard' must have a description
"MetricCard": {
  "props": { /* ... */ }
}
```

**Invalid prop types:**

```json
// ❌ Error: Prop 'progress' must have a valid type
"progress": { "type": "invalid", "required": false }
```

**Missing space requirements:**

```json
// ❌ Error: Component 'MetricCard' must have space requirements
"MetricCard": {
  "description": "Display metrics",
  "props": { /* ... */ }
  // Missing space field
}
```

## Best Practices

### 1. Descriptive Descriptions

```json
// ✅ Good
"description": "Display key performance indicators with values, trends, and progress bars"

// ❌ Avoid
"description": "Shows data"
```

### 2. Comprehensive Use Cases

```json
// ✅ Good
"useCases": [
  "revenue tracking",
  "user metrics", 
  "performance indicators",
  "KPI display",
  "sales data",
  "analytics overview"
]

// ❌ Too limited
"useCases": ["metrics"]
```

### 3. Realistic Space Requirements

```json
// ✅ Good - matches actual component size
"space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }

// ❌ Too restrictive
"space": { "min": [1, 1], "max": [1, 1], "preferred": [1, 1] }
```

### 4. Complete Prop Definitions

```json
// ✅ Good - all props defined
"props": {
  "title": { "type": "string", "required": true },
  "value": { "type": "string", "required": true },
  "change": { "type": "string", "required": false },
  "changeType": { 
    "type": "string", 
    "required": false, 
    "allowed": ["positive", "negative", "neutral"] 
  }
}
```

## Testing Your Configuration

1. **Validate syntax**: Use a JSON validator to check for syntax errors
2. **Test with AI**: Try commands like "Create a dashboard" to see if components are suggested
3. **Check console**: Look for validation warnings in the browser console
4. **Verify props**: Ensure all required props are provided when components are created

## Advanced Configuration

### Custom Prop Validation

```json
"changeType": { 
  "type": "string", 
  "required": false, 
  "allowed": ["positive", "negative", "neutral"] 
}
```

### Complex Props

```json
"filters": { 
  "type": "object", 
  "required": false 
},
"columns": { 
  "type": "array", 
  "required": true 
}
```

## Next Steps

- **[LLM Providers Guide](llm-providers)** - Set up AI providers
- **[Storage Service Guide](storage-service)** - Configure persistence
- **[Advanced Features Guide](advanced-features)** - Custom validation and loaders
- **[API Reference](api/core-components)** - Complete component documentation

## Example Configurations

- **[Minimal Setup](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/adaptly.json)** - 1-2 components
- **[Full Demo](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/adaptly.json)** - 10+ components
- **[Component Examples](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/src/components)** - Real React components

---

**Ready to add more components?** Check out the [LLM Providers Guide](llm-providers) to set up multiple AI providers for even better results!
