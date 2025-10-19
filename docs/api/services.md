---
layout: default
title: Services API
description: Storage, LLM, and registry services
---

This document provides comprehensive API reference for Adaptly's service layer and internal services.

## 🤖 EnhancedLLMService

Service for managing AI interactions with multiple LLM providers.

### Constructor

```tsx
class EnhancedLLMService {
  constructor(config: LLMConfig)
}
```

**Parameters:**

- `config`: LLM configuration object

**Example:**

```tsx
import { EnhancedLLMService } from 'adaptly';

const llmService = new EnhancedLLMService({
  provider: "google",
  apiKey: "your-api-key",
  model: "gemini-2.0-flash-exp",
  maxTokens: 1000,
  temperature: 0.7
});
```

### Methods

#### processUserRequest

Processes user input with AI and returns layout suggestions.

```tsx
async processUserRequest(
  userInput: string,
  currentAdaptation: UIAdaptation,
  availableSpace: { width: number; height: number },
  availableComponents?: string[],
  adaptlyConfig?: unknown
): Promise<{
  success: boolean;
  newAdaptation?: Partial<UIAdaptation>;
  reasoning?: string;
  error?: string;
}>
```

**Parameters:**

- `userInput`: Natural language input from user
- `currentAdaptation`: Current UI state
- `availableSpace`: Available space for components
- `availableComponents`: List of available component types
- `adaptlyConfig`: Component registry configuration

**Returns:**

- `success`: Whether the request was successful
- `newAdaptation`: AI-generated UI layout
- `reasoning`: AI's reasoning for the layout
- `error`: Error message if failed

**Example:**

```tsx
const result = await llmService.processUserRequest(
  "Add a revenue metric card",
  currentAdaptation,
  { width: 6, height: 4 },
  ["MetricCard", "SalesChart", "DataTable"],
  adaptlyConfig
);

if (result.success && result.newAdaptation) {
  console.log('AI generated layout:', result.newAdaptation);
  console.log('AI reasoning:', result.reasoning);
}
```

#### getProvider

Returns the current LLM provider.

```tsx
getProvider(): string
```

**Returns:**

- Provider name (e.g., "google", "openai", "anthropic")

**Example:**

```tsx
const provider = llmService.getProvider();
console.log('Current provider:', provider);
```

## 🧠 CoreLLMService

Legacy service for Google Gemini integration.

### Constructor

```tsx
class CoreLLMService {
  constructor(config: LLMConfig)
}
```

**Parameters:**

- `config`: LLM configuration object

**Example:**

```tsx
import { CoreLLMService } from 'adaptly';

const llmService = new CoreLLMService({
  provider: "google",
  apiKey: "your-api-key",
  model: "gemini-2.0-flash-exp",
  maxTokens: 1000,
  temperature: 0.7
});
```

### Methods

#### processUserRequest

Processes user input with Google Gemini.

```tsx
async processUserRequest(
  userInput: string,
  currentAdaptation: UIAdaptation,
  availableSpace: { width: number; height: number },
  availableComponents?: string[],
  adaptlyConfig?: unknown
): Promise<{
  success: boolean;
  newAdaptation?: Partial<UIAdaptation>;
  reasoning?: string;
  error?: string;
}>
```

**Parameters:**

- `userInput`: Natural language input from user
- `currentAdaptation`: Current UI state
- `availableSpace`: Available space for components
- `availableComponents`: List of available component types
- `adaptlyConfig`: Component registry configuration

**Returns:**

- `success`: Whether the request was successful
- `newAdaptation`: AI-generated UI layout
- `reasoning`: AI's reasoning for the layout
- `error`: Error message if failed

## 💾 StorageService

Service for managing persistent UI state storage.

### Constructor

```tsx
class StorageService {
  constructor(config: StorageConfig)
}
```

**Parameters:**

- `config`: Storage configuration object

**Example:**

```tsx
import { StorageService } from 'adaptly';

const storageService = new StorageService({
  enabled: true,
  key: "my-app-ui",
  version: "1.0.0"
});
```

### Methods

#### saveAdaptation

Saves UI adaptation to localStorage.

```tsx
saveAdaptation(adaptation: UIAdaptation): boolean
```

**Parameters:**

- `adaptation`: UI adaptation to save

**Returns:**

- `boolean`: Whether save was successful

**Example:**

```tsx
const success = storageService.saveAdaptation(adaptation);
if (success) {
  console.log('UI state saved successfully');
} else {
  console.error('Failed to save UI state');
}
```

#### loadAdaptation

Loads UI adaptation from localStorage.

```tsx
loadAdaptation(): UIAdaptation | null
```

**Returns:**

- `UIAdaptation | null`: Loaded adaptation or null if not found

**Example:**

```tsx
const savedAdaptation = storageService.loadAdaptation();
if (savedAdaptation) {
  console.log('Loaded adaptation:', savedAdaptation);
} else {
  console.log('No saved adaptation found');
}
```

#### clearStorage

Clears stored adaptation from localStorage.

```tsx
clearStorage(): boolean
```

**Returns:**

- `boolean`: Whether clear was successful

**Example:**

```tsx
const success = storageService.clearStorage();
if (success) {
  console.log('Storage cleared successfully');
} else {
  console.error('Failed to clear storage');
}
```

#### hasStoredAdaptation

Checks if there's a stored adaptation available.

```tsx
hasStoredAdaptation(): boolean
```

**Returns:**

- `boolean`: Whether stored data exists

**Example:**

```tsx
const hasData = storageService.hasStoredAdaptation();
console.log('Has stored data:', hasData);
```

#### getStorageInfo

Gets storage information (timestamp, version, etc.).

```tsx
getStorageInfo(): { timestamp?: number; version?: string } | null
```

**Returns:**

- Storage information object or null

**Example:**

```tsx
const info = storageService.getStorageInfo();
if (info) {
  console.log('Storage timestamp:', new Date(info.timestamp!));
  console.log('Storage version:', info.version);
}
```

## 📋 RegistryService

Service for managing component metadata and registry.

### Constructor

```tsx
class RegistryService {
  constructor(config: RegistryConfig)
}
```

**Parameters:**

- `config`: Registry configuration object

**Example:**

```tsx
import { RegistryService } from 'adaptly';

const registryService = new RegistryService({
  components: componentMetadata,
  categories: {},
  enableCaching: true,
  maxCacheSize: 100
});
```

### Methods

#### getAllComponents

Gets all registered components.

```tsx
getAllComponents(): ComponentMetadata[]
```

**Returns:**

- Array of component metadata

**Example:**

```tsx
const components = registryService.getAllComponents();
console.log('Total components:', components.length);
```

#### getComponent

Gets a specific component by ID.

```tsx
getComponent(id: string): ComponentMetadata | undefined
```

**Parameters:**

- `id`: Component ID

**Returns:**

- Component metadata or undefined

**Example:**

```tsx
const component = registryService.getComponent('MetricCard');
if (component) {
  console.log('Component found:', component.name);
}
```

#### getComponentsByCategory

Gets components by category.

```tsx
getComponentsByCategory(category: string): ComponentMetadata[]
```

**Parameters:**

- `category`: Component category

**Returns:**

- Array of components in category

**Example:**

```tsx
const metrics = registryService.getComponentsByCategory('metrics');
console.log('Metric components:', metrics.length);
```

#### getComponentsByTags

Gets components by tags.

```tsx
getComponentsByTags(tags: string[]): ComponentMetadata[]
```

**Parameters:**

- `tags`: Array of tags to search for

**Returns:**

- Array of matching components

**Example:**

```tsx
const charts = registryService.getComponentsByTags(['chart', 'visualization']);
console.log('Chart components:', charts.length);
```

#### getComponentsForPosition

Gets components suitable for a specific position.

```tsx
getComponentsForPosition(
  availableWidth: number,
  availableHeight: number,
  screenSize?: "mobile" | "tablet" | "desktop"
): ComponentMetadata[]
```

**Parameters:**

- `availableWidth`: Available width in grid units
- `availableHeight`: Available height in grid units
- `screenSize`: Screen size for responsive components

**Returns:**

- Array of suitable components

**Example:**

```tsx
const suitableComponents = registryService.getComponentsForPosition(2, 1, 'desktop');
console.log('Suitable components:', suitableComponents.length);
```

#### getRecommendedComponents

Gets recommended components for a use case.

```tsx
getRecommendedComponents(
  useCase: string,
  availableSpace: { width: number; height: number },
  screenSize?: "mobile" | "tablet" | "desktop"
): ComponentMetadata[]
```

**Parameters:**

- `useCase`: Use case description
- `availableSpace`: Available space
- `screenSize`: Screen size

**Returns:**

- Array of recommended components

**Example:**

```tsx
const recommendations = registryService.getRecommendedComponents(
  'revenue tracking',
  { width: 3, height: 2 },
  'desktop'
);
console.log('Recommended components:', recommendations.length);
```

#### getSuggestions

Gets AI suggestions for user input.

```tsx
getSuggestions(
  userInput: string,
  availableSpace: { width: number; height: number },
  screenSize?: "mobile" | "tablet" | "desktop"
): ComponentSuggestion[]
```

**Parameters:**

- `userInput`: User's natural language input
- `availableSpace`: Available space
- `screenSize`: Screen size

**Returns:**

- Array of component suggestions

**Example:**

```tsx
const suggestions = registryService.getSuggestions(
  'Add a revenue chart',
  { width: 4, height: 3 },
  'desktop'
);
console.log('AI suggestions:', suggestions.length);
```

#### getCategories

Gets all component categories.

```tsx
getCategories(): Record<string, unknown>
```

**Returns:**

- Object with category information

**Example:**

```tsx
const categories = registryService.getCategories();
console.log('Available categories:', Object.keys(categories));
```

#### getComponentCountByCategory

Gets component count by category.

```tsx
getComponentCountByCategory(): Record<string, number>
```

**Returns:**

- Object with category counts

**Example:**

```tsx
const counts = registryService.getComponentCountByCategory();
console.log('Component counts:', counts);
```

#### searchComponents

Searches components by query.

```tsx
searchComponents(query: string): ComponentMetadata[]
```

**Parameters:**

- `query`: Search query

**Returns:**

- Array of matching components

**Example:**

```tsx
const results = registryService.searchComponents('metric');
console.log('Search results:', results.length);
```

## 📝 AdaptlyLogger

Service for logging and debugging.

### Methods

#### info

Logs info message.

```tsx
info(message: string, ...args: unknown[]): void
```

**Parameters:**

- `message`: Log message
- `args`: Additional arguments

**Example:**

```tsx
import { adaptlyLogger } from 'adaptly';

adaptlyLogger.info('Component added successfully', component);
```

#### debug

Logs debug message.

```tsx
debug(message: string, ...args: unknown[]): void
```

**Parameters:**

- `message`: Log message
- `args`: Additional arguments

**Example:**

```tsx
adaptlyLogger.debug('Processing user input', userInput);
```

#### warn

Logs warning message.

```tsx
warn(message: string, ...args: unknown[]): void
```

**Parameters:**

- `message`: Log message
- `args`: Additional arguments

**Example:**

```tsx
adaptlyLogger.warn('Component validation failed', component);
```

#### error

Logs error message.

```tsx
error(message: string, ...args: unknown[]): void
```

**Parameters:**

- `message`: Log message
- `args`: Additional arguments

**Example:**

```tsx
adaptlyLogger.error('LLM processing failed', error);
```

#### setConfig

Sets logger configuration.

```tsx
setConfig(config: { enabled: boolean; level: string }): void
```

**Parameters:**

- `config`: Logger configuration

**Example:**

```tsx
adaptlyLogger.setConfig({
  enabled: true,
  level: 'debug'
});
```

## 🚀 Usage Examples

### Complete Service Setup

```tsx
import { 
  EnhancedLLMService, 
  StorageService, 
  RegistryService,
  adaptlyLogger 
} from 'adaptly';

// LLM Service
const llmService = new EnhancedLLMService({
  provider: "google",
  apiKey: "your-api-key",
  model: "gemini-2.0-flash-exp",
  maxTokens: 1000,
  temperature: 0.7
});

// Storage Service
const storageService = new StorageService({
  enabled: true,
  key: "my-app-ui",
  version: "1.0.0"
});

// Registry Service
const registryService = new RegistryService({
  components: componentMetadata,
  categories: {},
  enableCaching: true,
  maxCacheSize: 100
});

// Logger
adaptlyLogger.setConfig({
  enabled: true,
  level: 'debug'
});
```

### Service Integration

```tsx
// Process user request with all services
const processUserRequest = async (userInput: string) => {
  try {
    // Get current adaptation
    const currentAdaptation = storageService.loadAdaptation() || defaultAdaptation;
    
    // Get available components
    const availableComponents = registryService.getAllComponents();
    const componentNames = availableComponents.map(c => c.name);
    
    // Process with LLM
    const result = await llmService.processUserRequest(
      userInput,
      currentAdaptation,
      { width: 6, height: 4 },
      componentNames,
      adaptlyConfig
    );
    
    if (result.success && result.newAdaptation) {
      // Save new adaptation
      storageService.saveAdaptation(result.newAdaptation);
      
      // Log success
      adaptlyLogger.info('User request processed successfully', result.reasoning);
      
      return result;
    } else {
      adaptlyLogger.error('LLM processing failed', result.error);
      return null;
    }
  } catch (error) {
    adaptlyLogger.error('Service integration error', error);
    return null;
  }
};
```

### Error Handling

```tsx
// Handle service errors
const handleServiceError = (error: Error, service: string) => {
  adaptlyLogger.error(`${service} error:`, error);
  
  // Handle specific errors
  if (error.message.includes('API key')) {
    console.error('API key issue - check your configuration');
  } else if (error.message.includes('rate limit')) {
    console.error('Rate limit exceeded - wait before retrying');
  } else {
    console.error('Unknown service error');
  }
};

// Use with try-catch
try {
  const result = await llmService.processUserRequest(...);
} catch (error) {
  handleServiceError(error, 'LLM Service');
}
```

## 📚 Related Documentation

- **[Core Components API](./core-components.md)** - Component documentation
- **[Hooks API](./hooks.md)** - Hook documentation
- **[Types API](./types.md)** - Type definitions
- **[Component Registry Guide](../component-registry.md)** - Component configuration
- **[Storage Service Guide](../storage-service.md)** - Storage configuration

---

Ready to learn about advanced features? Check out the [Advanced Features Guide](../advanced-features.md)!
