---
sidebar_position: 4
title: Services API
description: Complete documentation of Adaptly's service layer including LLM, storage, and registry services
---

# Services API Reference

This page documents all service classes available in Adaptly, including their methods, configuration, and usage examples.

## EnhancedLLMService

Service for managing AI interactions with multiple LLM providers (Google Gemini, OpenAI GPT, Anthropic Claude).

### Constructor

```typescript
constructor(config: LLMConfig)
```

**Parameters**:

- `config`: LLM configuration object

**Example**:

```typescript
import { EnhancedLLMService } from "adaptly";

const llmService = new EnhancedLLMService({
  provider: "openai",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  model: "gpt-4o",
  maxTokens: 1000,
  temperature: 0.7
});
```

### Methods

#### processUserRequest

**Type**: `(userInput: string, currentAdaptation: UIAdaptation, availableSpace: { width: number; height: number }, availableComponents?: string[], adaptlyConfig?: unknown) => Promise<{ success: boolean; newAdaptation?: Partial<UIAdaptation>; reasoning?: string; error?: string; }>`

**Description**: Processes user input and generates UI adaptation using AI.

**Parameters**:

- `userInput`: Natural language input from user
- `currentAdaptation`: Current UI adaptation state
- `availableSpace`: Available space for components
- `availableComponents`: Array of available component types
- `adaptlyConfig`: Component registry configuration

**Returns**: Promise with success status, new adaptation, reasoning, or error

**Example**:

```typescript
const result = await llmService.processUserRequest(
  "Create a sales dashboard with revenue metrics",
  currentAdaptation,
  { width: 6, height: 6 },
  ["MetricCard", "SalesChart", "TeamMembers"],
  adaptlyConfig
);

if (result.success && result.newAdaptation) {
  console.log("AI generated layout:", result.newAdaptation);
  console.log("Reasoning:", result.reasoning);
} else {
  console.error("AI processing failed:", result.error);
}
```

### Provider Initialization

The service automatically initializes the appropriate provider based on configuration:

```typescript
// Google Gemini
const googleService = new EnhancedLLMService({
  provider: "google",
  apiKey: "your-google-key",
  model: "gemini-2.0-flash-exp"
});

// OpenAI GPT
const openaiService = new EnhancedLLMService({
  provider: "openai",
  apiKey: "your-openai-key",
  model: "gpt-4o"
});

// Anthropic Claude
const anthropicService = new EnhancedLLMService({
  provider: "anthropic",
  apiKey: "your-anthropic-key",
  model: "claude-3-5-sonnet-20241022"
});
```

### Error Handling

```typescript
try {
  const result = await llmService.processUserRequest(
    userInput,
    currentAdaptation,
    availableSpace,
    availableComponents,
    adaptlyConfig
  );
  
  if (result.success) {
    // Handle successful response
    updateAdaptation(result.newAdaptation);
  } else {
    // Handle error
    console.error("LLM processing failed:", result.error);
  }
} catch (error) {
  console.error("Service error:", error);
}
```

## StorageService

Service for managing persistent storage of UI adaptations using localStorage.

### Constructor

```typescript
constructor(config: StorageConfig)
```

**Parameters**:

- `config`: Storage configuration object

**Example**:

```typescript
import { StorageService } from "adaptly";

const storageService = new StorageService({
  enabled: true,
  key: "my-dashboard",
  version: "1.0.0"
});
```

### Methods

#### saveAdaptation

**Type**: `(adaptation: UIAdaptation) => boolean`

**Description**: Saves UI adaptation to localStorage.

**Parameters**:

- `adaptation`: UI adaptation object to save

**Returns**: `true` if successful, `false` if failed

**Example**:

```typescript
const saved = storageService.saveAdaptation(adaptation);
if (saved) {
  console.log("UI state saved successfully");
} else {
  console.log("Failed to save UI state");
}
```

#### loadAdaptation

**Type**: `() => UIAdaptation | null`

**Description**: Loads UI adaptation from localStorage.

**Returns**: Saved adaptation object or `null` if none exists

**Example**:

```typescript
const savedAdaptation = storageService.loadAdaptation();
if (savedAdaptation) {
  console.log("Loaded saved state:", savedAdaptation);
  setAdaptation(savedAdaptation);
} else {
  console.log("No saved state found");
}
```

#### clearStorage

**Type**: `() => boolean`

**Description**: Clears all stored data from localStorage.

**Returns**: `true` if successful, `false` if failed

**Example**:

```typescript
const cleared = storageService.clearStorage();
if (cleared) {
  console.log("Storage cleared successfully");
} else {
  console.log("Failed to clear storage");
}
```

#### hasStoredAdaptation

**Type**: `() => boolean`

**Description**: Checks if stored data exists in localStorage.

**Returns**: `true` if data exists, `false` if not

**Example**:

```typescript
if (storageService.hasStoredAdaptation()) {
  console.log("Found saved data");
} else {
  console.log("No saved data found");
}
```

#### getStorageInfo

**Type**: `() => StorageInfo`

**Description**: Gets information about stored data.

**Returns**: Storage information object

**Example**:

```typescript
const info = storageService.getStorageInfo();
console.log("Storage info:", info);
```

### Storage Configuration

```typescript
interface StorageConfig {
  enabled: boolean;
  key: string;
  version: string;
}
```

**Fields**:

- `enabled`: Whether storage is enabled
- `key`: Storage key prefix
- `version`: Data version for migration

### Storage Key Format

Storage keys are created using the pattern: `{key}_{version}`

```typescript
// Example configurations
const config1 = { key: "dashboard", version: "1.0.0" }; // → "dashboard_1.0.0"
const config2 = { key: "analytics", version: "2.0.0" }; // → "analytics_2.0.0"
```

### Data Structure

The service stores data in the following format:

```typescript
interface StoredData {
  adaptation: UIAdaptation;
  timestamp: number;
  version: string;
}
```

**Example**:

```json
{
  "adaptation": {
    "components": [
      {
        "id": "metric-1",
        "type": "MetricCard",
        "props": { "title": "Revenue", "value": "$45,231" },
        "position": { "x": 0, "y": 0, "w": 2, "h": 1 },
        "visible": true
      }
    ],
    "layout": "grid",
    "spacing": 6,
    "columns": 6
  },
  "timestamp": 1703123456789,
  "version": "1.0.0"
}
```

### Version Control

The service automatically handles version mismatches:

```typescript
// Version 1.0.0
const service1 = new StorageService({
  enabled: true,
  key: "my-app",
  version: "1.0.0"
});

// Version 2.0.0 - old data cleared automatically
const service2 = new StorageService({
  enabled: true,
  key: "my-app",
  version: "2.0.0"
});
```

## RegistryService

Service for managing component registries and metadata.

### Constructor

```typescript
constructor(config?: RegistryConfig)
```

**Parameters**:

- `config`: Registry configuration object (optional)

**Example**:

```typescript
import { RegistryService } from "adaptly";

const registryService = new RegistryService({
  components: componentMetadata,
  categories: { "metrics": "Performance Metrics" },
  enableCaching: true,
  maxCacheSize: 100
});
```

### Methods

#### registerComponent

**Type**: `(name: string, definition: ComponentMetadata) => void`

**Description**: Registers a new component in the registry.

**Parameters**:

- `name`: Component name
- `definition`: Component metadata

**Example**:

```typescript
registryService.registerComponent("MetricCard", {
  id: "metric-card",
  name: "Metric Card",
  description: "Display key performance indicators",
  category: "metrics",
  icon: "chart",
  tags: ["kpi", "metrics", "dashboard"],
  gridRequirements: {
    minWidth: 2,
    maxWidth: 3,
    minHeight: 1,
    maxHeight: 2,
    preferredWidth: 2,
    preferredHeight: 1,
    aspectRatio: 2,
    responsive: {
      mobile: { minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 1, preferredWidth: 1, preferredHeight: 1, aspectRatio: 1 },
      tablet: { minWidth: 2, maxWidth: 3, minHeight: 1, maxHeight: 2, preferredWidth: 2, preferredHeight: 1, aspectRatio: 2 },
      desktop: { minWidth: 2, maxWidth: 3, minHeight: 1, maxHeight: 2, preferredWidth: 2, preferredHeight: 1, aspectRatio: 2 }
    }
  },
  props: {
    required: ["title", "value"],
    optional: ["change", "changeType", "progress", "description"],
    defaults: { changeType: "neutral" },
    validation: { changeType: "positive|negative|neutral" },
    definitions: [
      {
        name: "title",
        type: "string",
        description: "Metric title",
        required: true
      }
    ]
  },
  examples: [
    {
      name: "Revenue Metric",
      description: "Display revenue with change indicator",
      props: { title: "Revenue", value: "$45,231", change: "+20.1%" },
      gridPosition: { x: 0, y: 0, w: 2, h: 1 },
      useCase: "revenue tracking"
    }
  ],
  priority: "high"
});
```

#### getComponent

**Type**: `(name: string) => ComponentMetadata | undefined`

**Description**: Retrieves component metadata by name.

**Parameters**:

- `name`: Component name

**Returns**: Component metadata or `undefined` if not found

**Example**:

```typescript
const component = registryService.getComponent("MetricCard");
if (component) {
  console.log("Component found:", component.description);
} else {
  console.log("Component not found");
}
```

#### getAllComponents

**Type**: `() => ComponentMetadata[]`

**Description**: Gets all registered components.

**Returns**: Array of component metadata

**Example**:

```typescript
const components = registryService.getAllComponents();
console.log("Registered components:", components.length);
```

#### getComponentsByCategory

**Type**: `(category: string) => ComponentMetadata[]`

**Description**: Gets components by category.

**Parameters**:

- `category`: Category name

**Returns**: Array of components in the category

**Example**:

```typescript
const metricComponents = registryService.getComponentsByCategory("metrics");
console.log("Metric components:", metricComponents.length);
```

#### getComponentsByTags

**Type**: `(tags: string[]) => ComponentMetadata[]`

**Description**: Gets components by tags.

**Parameters**:

- `tags`: Array of tag names

**Returns**: Array of components matching the tags

**Example**:

```typescript
const dashboardComponents = registryService.getComponentsByTags(["dashboard", "kpi"]);
console.log("Dashboard components:", dashboardComponents.length);
```

#### getComponentsForPosition

**Type**: `(availableWidth: number, availableHeight: number, screenSize?: "mobile" | "tablet" | "desktop") => ComponentMetadata[]`

**Description**: Gets components that fit in the available space.

**Parameters**:

- `availableWidth`: Available width in grid units
- `availableHeight`: Available height in grid units
- `screenSize`: Screen size for responsive requirements

**Returns**: Array of components that fit the space

**Example**:

```typescript
const fittingComponents = registryService.getComponentsForPosition(2, 1, "desktop");
console.log("Components that fit 2x1 space:", fittingComponents.length);
```

#### getRecommendedComponents

**Type**: `(useCase: string, availableSpace: { width: number; height: number }, screenSize?: "mobile" | "tablet" | "desktop") => ComponentMetadata[]`

**Description**: Gets components recommended for a specific use case.

**Parameters**:

- `useCase`: Use case description
- `availableSpace`: Available space
- `screenSize`: Screen size for responsive requirements

**Returns**: Array of recommended components

**Example**:

```typescript
const recommended = registryService.getRecommendedComponents(
  "revenue tracking",
  { width: 3, height: 2 },
  "desktop"
);
console.log("Recommended components:", recommended.length);
```

#### getSuggestions

**Type**: `(userInput: string, availableSpace: { width: number; height: number }, screenSize?: "mobile" | "tablet" | "desktop") => ComponentSuggestion[]`

**Description**: Gets AI suggestions for components based on user input.

**Parameters**:

- `userInput`: User input string
- `availableSpace`: Available space
- `screenSize`: Screen size for responsive requirements

**Returns**: Array of component suggestions

**Example**:

```typescript
const suggestions = registryService.getSuggestions(
  "Create a sales dashboard",
  { width: 6, height: 4 },
  "desktop"
);
console.log("AI suggestions:", suggestions.length);
```

## Logger

Service for managing logging throughout the application.

### Methods

#### log

**Type**: `(level: LogLevel, message: string, meta?: any) => void`

**Description**: Logs a message with specified level.

**Parameters**:

- `level`: Log level (debug, info, warn, error)
- `message`: Log message
- `meta`: Additional metadata (optional)

**Example**:

```typescript
import { adaptlyLogger } from "adaptly";

adaptlyLogger.log("info", "Component registered", { name: "MetricCard" });
adaptlyLogger.log("error", "Failed to save data", { error: "Storage full" });
```

#### info

**Type**: `(message: string, meta?: any) => void`

**Description**: Logs an info message.

**Example**:

```typescript
adaptlyLogger.info("User action completed", { action: "save" });
```

#### warn

**Type**: `(message: string, meta?: any) => void`

**Description**: Logs a warning message.

**Example**:

```typescript
adaptlyLogger.warn("Deprecated API used", { api: "old-method" });
```

#### error

**Type**: `(message: string, error?: Error, meta?: any) => void`

**Description**: Logs an error message.

**Example**:

```typescript
adaptlyLogger.error("Failed to save data", error, { key: "user-data" });
```

#### debug

**Type**: `(message: string, meta?: any) => void`

**Description**: Logs a debug message.

**Example**:

```typescript
adaptlyLogger.debug("Component rendered", { type: "MetricCard", props: component.props });
```

#### setConfig

**Type**: `(config: { enabled: boolean; level: string }) => void`

**Description**: Configures the logger.

**Example**:

```typescript
adaptlyLogger.setConfig({ enabled: true, level: "debug" });
```

## Service Integration

### Using Services Together

```typescript
import { 
  EnhancedLLMService, 
  StorageService, 
  RegistryService,
  adaptlyLogger 
} from "adaptly";

// Initialize services
const logger = adaptlyLogger;
const storage = new StorageService({ 
  enabled: true, 
  key: "my-app", 
  version: "1.0.0" 
});
const registry = new RegistryService();
const llm = new EnhancedLLMService({
  provider: "google",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!,
  model: "gemini-2.0-flash-exp"
});

// Use services together
const generateAndSave = async (prompt: string) => {
  try {
    logger.info("Generating layout", { prompt });
    
    const availableComponents = registry.getAllComponents().map(c => c.name);
    const result = await llm.processUserRequest(
      prompt,
      currentAdaptation,
      { width: 6, height: 6 },
      availableComponents,
      adaptlyConfig
    );
    
    if (result.success && result.newAdaptation) {
      logger.info("Saving layout", { layoutId: result.newAdaptation.components?.length });
      storage.saveAdaptation(result.newAdaptation);
      logger.info("Layout generated and saved successfully");
      return result.newAdaptation;
    }
  } catch (error) {
    logger.error("Failed to generate layout", error);
    throw error;
  }
};
```

### Error Handling

```typescript
// LLM Service errors
try {
  const result = await llmService.processUserRequest(input, adaptation, space, components, config);
} catch (error) {
  if (error.message.includes("API key")) {
    console.error("Invalid API key");
  } else if (error.message.includes("quota")) {
    console.error("API quota exceeded");
  } else {
    console.error("LLM processing failed:", error);
  }
}

// Storage Service errors
try {
  const saved = storageService.saveAdaptation(adaptation);
  if (!saved) {
    console.error("Failed to save adaptation");
  }
} catch (error) {
  console.error("Storage error:", error);
}

// Registry Service errors
try {
  const component = registryService.getComponent("MetricCard");
  if (!component) {
    console.error("Component not found in registry");
  }
} catch (error) {
  console.error("Registry error:", error);
}
```

## Performance Optimization

### Service Caching

```typescript
// Enable caching for registry service
const registry = new RegistryService({
  enableCaching: true,
  maxCacheSize: 100
});
```

### Lazy Loading

```typescript
// Load services only when needed
const loadServices = async () => {
  const { EnhancedLLMService } = await import("adaptly");
  return new EnhancedLLMService(config);
};
```

### Memory Management

```typescript
// Clear caches periodically
setInterval(() => {
  registry.clearCache();
}, 300000); // 5 minutes
```

## Related Documentation

- **[Core Components API](../api/core-components)** - Component documentation
- **[Hooks API](../api/hooks)** - Hook documentation
- **[Types API](../api/types)** - TypeScript interfaces

---

**Ready for troubleshooting?** Check out the [Troubleshooting Guide](../troubleshooting) for common issues and solutions!
