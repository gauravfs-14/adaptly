---
sidebar_position: 3
title: Services API
description: Service layer APIs for LLM providers, storage, and component registry
---

# Services API

Adaptly provides a comprehensive service layer for managing AI-powered adaptive UI components. This API covers LLM providers, storage services, and component registries.

## LLM Service

The LLM service handles communication with various language model providers.

### EnhancedLLMService

```typescript
import { EnhancedLLMService } from 'adaptly';

const llmService = new EnhancedLLMService({
  provider: 'openai',
  apiKey: 'your-api-key',
  model: 'gpt-4',
  temperature: 0.7
});

// Generate UI layout from natural language
const layout = await llmService.generateLayout('Create a dashboard with charts');
```

### Configuration Options

- `provider`: LLM provider ('openai', 'anthropic', 'google')
- `apiKey`: API key for the provider
- `model`: Model name to use
- `temperature`: Creativity level (0-1)
- `maxTokens`: Maximum tokens to generate

### Methods

#### generateLayout(prompt: string)

Generates a UI layout from natural language description.

```typescript
const layout = await llmService.generateLayout(
  'Create a login form with email and password fields'
);
```

#### generateComponent(prompt: string, context?: any)

Generates a specific component configuration.

```typescript
const component = await llmService.generateComponent(
  'Create a primary button',
  { theme: 'dark' }
);
```

#### optimizeLayout(layout: any, feedback?: string)

Optimizes an existing layout based on feedback.

```typescript
const optimized = await llmService.optimizeLayout(
  currentLayout,
  'Make it more accessible'
);
```

## Storage Service

The storage service provides persistent data management.

### StorageService

```typescript
import { StorageService } from 'adaptly';

const storage = new StorageService({
  provider: 'localStorage',
  prefix: 'adaptly_',
  version: '1.0.0'
});
```

### Configuration Options

- `provider`: Storage provider ('localStorage', 'indexedDB', 'memory')
- `prefix`: Key prefix for stored data
- `version`: Data version for migration
- `encryption`: Enable encryption for sensitive data

### Methods

#### save(key: string, data: any, options?: SaveOptions)

Saves data to storage with optional metadata.

```typescript
await storage.save('user-preferences', {
  theme: 'dark',
  layout: 'grid'
}, {
  expires: Date.now() + 86400000, // 24 hours
  tags: ['user', 'preferences']
});
```

#### load(key: string, options?: LoadOptions)

Loads data from storage with optional filtering.

```typescript
const data = await storage.load('user-preferences', {
  includeMetadata: true
});
```

#### remove(key: string)

Removes data from storage.

```typescript
await storage.remove('user-preferences');
```

#### clear(options?: ClearOptions)

Clears all stored data.

```typescript
await storage.clear({
  pattern: 'user_*' // Only clear keys matching pattern
});
```

#### list(options?: ListOptions)

Lists stored data with optional filtering.

```typescript
const items = await storage.list({
  pattern: 'user_*',
  includeMetadata: true
});
```

## Registry Service

The registry service manages component definitions and configurations.

### RegistryService

```typescript
import { RegistryService } from 'adaptly';

const registry = new RegistryService({
  provider: 'json',
  source: './components.json'
});
```

### Configuration Options

- `provider`: Registry provider ('json', 'api', 'memory')
- `source`: Source for component definitions
- `cache`: Enable caching for better performance
- `validation`: Enable schema validation

### Methods

#### registerComponent(name: string, definition: ComponentDefinition)

Registers a new component definition.

```typescript
await registry.registerComponent('custom-button', {
  type: 'button',
  props: {
    variant: 'primary',
    size: 'medium'
  },
  styles: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  accessibility: {
    role: 'button',
    ariaLabel: 'Custom button'
  }
});
```

#### getComponent(name: string)

Retrieves a component definition.

```typescript
const component = await registry.getComponent('custom-button');
```

#### listComponents(filter?: ComponentFilter)

Lists all registered components.

```typescript
const components = await registry.listComponents({
  type: 'button',
  tags: ['primary']
});
```

#### updateComponent(name: string, definition: ComponentDefinition)

Updates an existing component definition.

```typescript
await registry.updateComponent('custom-button', {
  ...existingDefinition,
  props: {
    ...existingDefinition.props,
    size: 'large'
  }
});
```

#### removeComponent(name: string)

Removes a component definition.

```typescript
await registry.removeComponent('custom-button');
```

## Logger Service

The logger service provides structured logging for debugging and monitoring.

### Logger

```typescript
import { Logger } from 'adaptly';

const logger = new Logger({
  level: 'info',
  format: 'json',
  transports: ['console', 'file']
});
```

### Methods

#### log(level: LogLevel, message: string, meta?: any)

Logs a message with specified level.

```typescript
logger.log('info', 'Component registered', { name: 'custom-button' });
```

#### info(message: string, meta?: any)

Logs an info message.

```typescript
logger.info('User action completed', { action: 'save' });
```

#### warn(message: string, meta?: any)

Logs a warning message.

```typescript
logger.warn('Deprecated API used', { api: 'old-method' });
```

#### error(message: string, error?: Error, meta?: any)

Logs an error message.

```typescript
logger.error('Failed to save data', error, { key: 'user-data' });
```

## Service Integration

Services can be integrated together for comprehensive functionality:

```typescript
import { 
  EnhancedLLMService, 
  StorageService, 
  RegistryService,
  Logger 
} from 'adaptly';

// Initialize services
const logger = new Logger({ level: 'debug' });
const storage = new StorageService({ provider: 'localStorage' });
const registry = new RegistryService({ provider: 'json' });
const llm = new EnhancedLLMService({ provider: 'openai' });

// Use services together
const generateAndSave = async (prompt: string) => {
  try {
    logger.info('Generating layout', { prompt });
    const layout = await llm.generateLayout(prompt);
    
    logger.info('Saving layout', { layoutId: layout.id });
    await storage.save(`layout_${layout.id}`, layout);
    
    logger.info('Layout generated and saved successfully');
    return layout;
  } catch (error) {
    logger.error('Failed to generate layout', error);
    throw error;
  }
};
```

## Error Handling

All services include comprehensive error handling:

```typescript
try {
  const result = await service.method();
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors
  } else if (error instanceof NetworkError) {
    // Handle network errors
  } else {
    // Handle other errors
  }
}
```

## Performance Optimization

Services include built-in performance optimizations:

- **Caching**: Automatic caching for frequently accessed data
- **Batching**: Batch operations for better performance
- **Lazy Loading**: Load data only when needed
- **Connection Pooling**: Efficient connection management

## Examples

See the [Advanced Features](/docs/advanced-features) guide for complete examples of service integration and usage patterns.
