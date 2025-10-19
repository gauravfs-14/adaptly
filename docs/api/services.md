# Services API Reference

This document provides comprehensive API reference for Adaptly's core services: `CoreLLMService`, `RegistryService`, and `adaptlyLogger`.

## 🤖 CoreLLMService

The service responsible for AI model communication and response processing.

### Class Definition

```typescript
class CoreLLMService {
  constructor(config: LLMConfig);
  
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse>;
}
```

### Constructor

```typescript
interface LLMConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
```

### Methods

#### processUserRequest

```typescript
async processUserRequest(
  input: string,
  currentLayout: UIAdaptation,
  availableSpace: SpaceInfo,
  availableComponents: string[],
  config: AdaptlyJsonConfig
): Promise<LLMResponse>
```

**Parameters:**

- `input`: User's natural language input
- `currentLayout`: Current UI layout state
- `availableSpace`: Available space for components
- `availableComponents`: List of available component names
- `config`: Component registry configuration

**Returns:**

```typescript
interface LLMResponse {
  success: boolean;
  newAdaptation?: UIAdaptation;
  reasoning?: string;
  error?: string;
}
```

### Usage Examples

#### Basic Usage

```typescript
import { CoreLLMService } from 'adaptly';

const llmService = new CoreLLMService({
  apiKey: 'your-gemini-api-key',
  model: 'gemini-2.0-flash',
  maxTokens: 1000,
  temperature: 0.7
});

const response = await llmService.processUserRequest(
  'Add a revenue chart',
  currentLayout,
  { width: 6, height: 4 },
  ['MetricCard', 'SalesChart', 'DataTable'],
  adaptlyConfig
);

if (response.success && response.newAdaptation) {
  // Update layout with AI suggestions
  updateLayout(response.newAdaptation);
}
```

#### Advanced Usage

```typescript
class CustomLLMService extends CoreLLMService {
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    // Add custom preprocessing
    const processedInput = this.preprocessInput(input);
    
    // Call parent method
    const response = await super.processUserRequest(
      processedInput,
      currentLayout,
      availableSpace,
      availableComponents,
      config
    );
    
    // Add custom postprocessing
    return this.postprocessResponse(response);
  }
  
  private preprocessInput(input: string): string {
    // Custom input preprocessing logic
    return input.toLowerCase().trim();
  }
  
  private postprocessResponse(response: LLMResponse): LLMResponse {
    // Custom response postprocessing logic
    return response;
  }
}
```

## 📚 RegistryService

The service responsible for managing component registry and metadata.

### Class Definition

```typescript
class RegistryService {
  constructor(config: RegistryConfig);
  
  getAllComponents(): ComponentMetadata[];
  getComponent(id: string): ComponentMetadata | undefined;
  getComponentsByCategory(category: string): ComponentMetadata[];
  getComponentsByTags(tags: string[]): ComponentMetadata[];
  getComponentsForPosition(
    availableWidth: number,
    availableHeight: number,
    screenSize?: 'mobile' | 'tablet' | 'desktop'
  ): ComponentMetadata[];
  getRecommendedComponents(
    useCase: string,
    availableSpace: { width: number; height: number },
    screenSize?: 'mobile' | 'tablet' | 'desktop'
  ): ComponentMetadata[];
  getSuggestions(
    userInput: string,
    availableSpace: { width: number; height: number },
    screenSize?: 'mobile' | 'tablet' | 'desktop'
  ): ComponentSuggestion[];
  getCategories(): Record<string, unknown>;
  getComponentCountByCategory(): Record<string, number>;
  searchComponents(query: string): ComponentMetadata[];
  validateRegistry(): boolean;
  getErrors(): string[];
}
```

### Constructor

```typescript
interface RegistryConfig {
  components: ComponentMetadata[];
  categories: Record<string, unknown>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}
```

### Methods

#### getAllComponents

```typescript
getAllComponents(): ComponentMetadata[]
```

Returns all registered components.

#### getComponent

```typescript
getComponent(id: string): ComponentMetadata | undefined
```

Returns a specific component by ID.

#### getComponentsByCategory

```typescript
getComponentsByCategory(category: string): ComponentMetadata[]
```

Returns components filtered by category.

#### getComponentsByTags

```typescript
getComponentsByTags(tags: string[]): ComponentMetadata[]
```

Returns components filtered by tags.

#### getComponentsForPosition

```typescript
getComponentsForPosition(
  availableWidth: number,
  availableHeight: number,
  screenSize?: 'mobile' | 'tablet' | 'desktop'
): ComponentMetadata[]
```

Returns components that fit in the specified space.

#### getRecommendedComponents

```typescript
getRecommendedComponents(
  useCase: string,
  availableSpace: { width: number; height: number },
  screenSize?: 'mobile' | 'tablet' | 'desktop'
): ComponentMetadata[]
```

Returns components recommended for a specific use case.

#### getSuggestions

```typescript
getSuggestions(
  userInput: string,
  availableSpace: { width: number; height: number },
  screenSize?: 'mobile' | 'tablet' | 'desktop'
): ComponentSuggestion[]
```

Returns AI-powered component suggestions based on user input.

#### validateRegistry

```typescript
validateRegistry(): boolean
```

Validates the registry configuration and returns true if valid.

#### getErrors

```typescript
getErrors(): string[]
```

Returns validation errors if the registry is invalid.

### Usage Examples

#### Basic Usage

```typescript
import { RegistryService } from 'adaptly';

const registryService = new RegistryService({
  components: componentMetadata,
  categories: categoryConfig,
  enableCaching: true,
  maxCacheSize: 100
});

// Get all components
const allComponents = registryService.getAllComponents();

// Get specific component
const metricCard = registryService.getComponent('MetricCard');

// Get components by category
const chartComponents = registryService.getComponentsByCategory('charts');

// Get components for specific space
const fittingComponents = registryService.getComponentsForPosition(4, 3, 'desktop');
```

#### Advanced Usage

```typescript
class CustomRegistryService extends RegistryService {
  constructor(config: RegistryConfig) {
    super(config);
    this.setupCustomFilters();
  }
  
  private setupCustomFilters() {
    // Add custom filtering logic
  }
  
  getComponentsByUserRole(userRole: string): ComponentMetadata[] {
    return this.getAllComponents().filter(component => {
      // Custom role-based filtering
      return this.isComponentAllowedForRole(component, userRole);
    });
  }
  
  private isComponentAllowedForRole(component: ComponentMetadata, role: string): boolean {
    // Custom permission logic
    return true; // Implement your logic
  }
}
```

#### Component Suggestions

```typescript
// Get AI-powered suggestions
const suggestions = registryService.getSuggestions(
  'I need to show sales data',
  { width: 6, height: 4 },
  'desktop'
);

suggestions.forEach(suggestion => {
  console.log(`Component: ${suggestion.component.name}`);
  console.log(`Confidence: ${suggestion.confidence}`);
  console.log(`Reasoning: ${suggestion.reasoning}`);
});
```

#### Registry Validation

```typescript
// Validate registry
const isValid = registryService.validateRegistry();

if (!isValid) {
  const errors = registryService.getErrors();
  console.error('Registry validation failed:', errors);
}
```

## 📝 adaptlyLogger

The centralized logging service for debugging and monitoring.

### Class Definition

```typescript
class adaptlyLogger {
  static setConfig(config: LoggingConfig): void;
  static debug(message: string, ...args: unknown[]): void;
  static info(message: string, ...args: unknown[]): void;
  static warn(message: string, ...args: unknown[]): void;
  static error(message: string, ...args: unknown[]): void;
}
```

### Configuration

```typescript
interface LoggingConfig {
  enabled?: boolean;
  level?: 'debug' | 'info' | 'warn' | 'error';
}
```

### Methods

#### setConfig

```typescript
static setConfig(config: LoggingConfig): void
```

Configures the logger with the specified settings.

#### debug

```typescript
static debug(message: string, ...args: unknown[]): void
```

Logs debug-level messages.

#### info

```typescript
static info(message: string, ...args: unknown[]): void
```

Logs info-level messages.

#### warn

```typescript
static warn(message: string, ...args: unknown[]): void
```

Logs warning-level messages.

#### error

```typescript
static error(message: string, ...args: unknown[]): void
```

Logs error-level messages.

### Usage Examples

#### Basic Usage

```typescript
import { adaptlyLogger } from 'adaptly';

// Configure logger
adaptlyLogger.setConfig({
  enabled: true,
  level: 'debug'
});

// Log messages
adaptlyLogger.debug('Debug message', { data: 'value' });
adaptlyLogger.info('Info message', { count: 5 });
adaptlyLogger.warn('Warning message', { issue: 'minor' });
adaptlyLogger.error('Error message', { error: new Error('Something went wrong') });
```

#### Advanced Usage

```typescript
class CustomLogger {
  private static instance: CustomLogger;
  
  static getInstance(): CustomLogger {
    if (!CustomLogger.instance) {
      CustomLogger.instance = new CustomLogger();
    }
    return CustomLogger.instance;
  }
  
  private constructor() {
    // Setup custom logging
  }
  
  log(level: string, message: string, data?: unknown) {
    // Custom logging logic
    console.log(`[${level.toUpperCase()}] ${message}`, data);
    
    // Send to external service
    this.sendToExternalService(level, message, data);
  }
  
  private sendToExternalService(level: string, message: string, data?: unknown) {
    // Send to external logging service
  }
}

// Use custom logger
const logger = CustomLogger.getInstance();
logger.log('info', 'Custom log message', { custom: 'data' });
```

#### Performance Monitoring

```typescript
class PerformanceLogger {
  private static timers: Map<string, number> = new Map();
  
  static startTimer(name: string): void {
    this.timers.set(name, Date.now());
  }
  
  static endTimer(name: string): void {
    const startTime = this.timers.get(name);
    if (startTime) {
      const duration = Date.now() - startTime;
      adaptlyLogger.info(`Timer ${name} completed in ${duration}ms`);
      this.timers.delete(name);
    }
  }
}

// Use performance logger
PerformanceLogger.startTimer('llm-processing');
await llmService.processUserRequest(input, layout, space, components, config);
PerformanceLogger.endTimer('llm-processing');
```

## 🔧 Service Integration

### Using Services Together

```typescript
import { CoreLLMService, RegistryService, adaptlyLogger } from 'adaptly';

class AdaptlyServiceManager {
  private llmService: CoreLLMService;
  private registryService: RegistryService;
  
  constructor(config: {
    llm: LLMConfig;
    registry: RegistryConfig;
    logging: LoggingConfig;
  }) {
    // Initialize services
    this.llmService = new CoreLLMService(config.llm);
    this.registryService = new RegistryService(config.registry);
    
    // Configure logging
    adaptlyLogger.setConfig(config.logging);
  }
  
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo
  ): Promise<LLMResponse> {
    adaptlyLogger.debug('Processing user request', { input, currentLayout });
    
    try {
      // Get available components
      const availableComponents = this.registryService.getAllComponents()
        .map(component => component.id);
      
      // Get component suggestions
      const suggestions = this.registryService.getSuggestions(
        input,
        availableSpace
      );
      
      adaptlyLogger.info('Component suggestions', { suggestions });
      
      // Process with LLM
      const response = await this.llmService.processUserRequest(
        input,
        currentLayout,
        availableSpace,
        availableComponents,
        this.registryService.getConfig()
      );
      
      adaptlyLogger.info('LLM response received', { response });
      
      return response;
    } catch (error) {
      adaptlyLogger.error('Error processing user request', { error });
      throw error;
    }
  }
}
```

### Service Lifecycle Management

```typescript
class ServiceLifecycleManager {
  private services: Map<string, unknown> = new Map();
  
  registerService(name: string, service: unknown): void {
    this.services.set(name, service);
    adaptlyLogger.info(`Service registered: ${name}`);
  }
  
  getService<T>(name: string): T | undefined {
    return this.services.get(name) as T;
  }
  
  unregisterService(name: string): void {
    this.services.delete(name);
    adaptlyLogger.info(`Service unregistered: ${name}`);
  }
  
  shutdown(): void {
    this.services.clear();
    adaptlyLogger.info('All services shutdown');
  }
}
```

## 🧪 Testing Services

### Testing CoreLLMService

```typescript
import { CoreLLMService } from 'adaptly';

describe('CoreLLMService', () => {
  let llmService: CoreLLMService;
  
  beforeEach(() => {
    llmService = new CoreLLMService({
      apiKey: 'test-key',
      model: 'test-model'
    });
  });
  
  test('processUserRequest returns valid response', async () => {
    const response = await llmService.processUserRequest(
      'Add a metric',
      mockLayout,
      { width: 6, height: 4 },
      ['MetricCard'],
      mockConfig
    );
    
    expect(response.success).toBe(true);
    expect(response.newAdaptation).toBeDefined();
  });
});
```

### Testing RegistryService

```typescript
import { RegistryService } from 'adaptly';

describe('RegistryService', () => {
  let registryService: RegistryService;
  
  beforeEach(() => {
    registryService = new RegistryService({
      components: mockComponents,
      categories: mockCategories
    });
  });
  
  test('getAllComponents returns all components', () => {
    const components = registryService.getAllComponents();
    expect(components).toHaveLength(mockComponents.length);
  });
  
  test('getComponent returns specific component', () => {
    const component = registryService.getComponent('MetricCard');
    expect(component).toBeDefined();
    expect(component?.name).toBe('MetricCard');
  });
});
```

### Testing adaptlyLogger

```typescript
import { adaptlyLogger } from 'adaptly';

describe('adaptlyLogger', () => {
  beforeEach(() => {
    adaptlyLogger.setConfig({
      enabled: true,
      level: 'debug'
    });
  });
  
  test('logs messages at correct level', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    adaptlyLogger.debug('Debug message');
    adaptlyLogger.info('Info message');
    adaptlyLogger.warn('Warning message');
    adaptlyLogger.error('Error message');
    
    expect(consoleSpy).toHaveBeenCalledTimes(4);
  });
});
```

## 🆘 Troubleshooting

### Common Issues

**LLM Service not responding:**

- Check API key is correct
- Verify network connectivity
- Ensure model is supported
- Check rate limits

**Registry Service errors:**

- Validate component metadata
- Check required fields
- Verify prop types
- Ensure unique component IDs

**Logger not working:**

- Check configuration
- Verify log level
- Ensure logger is enabled
- Check console output

### Debug Tools

```typescript
// Enable debug logging
adaptlyLogger.setConfig({
  enabled: true,
  level: 'debug'
});

// Log service state
adaptlyLogger.debug('LLM Service state', { 
  apiKey: llmService.apiKey,
  model: llmService.model 
});

adaptlyLogger.debug('Registry Service state', {
  componentCount: registryService.getAllComponents().length,
  categories: registryService.getCategories()
});
```

## 📚 Next Steps

Now that you understand the services API:

1. **Read the [Core Components API](./core-components.md)** - Learn about the main components
2. **Check out the [Hooks API](./hooks.md)** - Understand the available hooks
3. **Explore [Types Reference](./types.md)** - See all TypeScript definitions
4. **Try the [Basic Dashboard Tutorial](../tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to dive deeper?** Check out the [Types Reference](./types.md) to see all TypeScript definitions!
