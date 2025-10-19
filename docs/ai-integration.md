# AI Integration Guide

This guide covers how to integrate and configure AI models with Adaptly, including setup, configuration, and advanced usage patterns.

## 🤖 Overview

Adaptly uses Large Language Models (LLMs) to understand natural language input and generate appropriate UI layouts. The AI integration is designed to be flexible and extensible, supporting multiple AI providers and models.

## 🚀 Quick Setup

### Basic Configuration

```tsx
import { AdaptlyProvider } from 'adaptly';

<AdaptlyProvider
  apiKey="your-gemini-api-key"
  enableLLM={true}
  llm={{
    apiKey: "your-gemini-api-key",
    model: "gemini-2.0-flash",
    maxTokens: 1000,
    temperature: 0.7
  }}
  // ... other props
>
  {/* Your app */}
</AdaptlyProvider>
```

### Environment Variables

```env
# Google Gemini (recommended)
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# Alternative naming
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here

# OpenAI (planned)
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here

# Anthropic (planned)
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
```

## 🔧 Supported AI Providers

### Google Gemini (Primary)

**Model**: `gemini-2.0-flash`
**Provider**: Google AI Studio
**Setup**:

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project
3. Generate an API key
4. Add to environment variables

```tsx
const llmConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  model: 'gemini-2.0-flash',
  maxTokens: 1000,
  temperature: 0.7
};
```

### OpenAI (Planned)

**Models**: `gpt-4`, `gpt-3.5-turbo`
**Provider**: OpenAI
**Setup**:

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add to environment variables

```tsx
const llmConfig = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  model: 'gpt-4',
  maxTokens: 1000,
  temperature: 0.7
};
```

### Anthropic (Planned)

**Models**: `claude-3-sonnet`, `claude-3-haiku`
**Provider**: Anthropic
**Setup**:

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an API key
3. Add to environment variables

```tsx
const llmConfig = {
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  model: 'claude-3-sonnet',
  maxTokens: 1000,
  temperature: 0.7
};
```

## ⚙️ Configuration Options

### LLM Configuration

```typescript
interface LLMConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
}
```

### Model Parameters

#### Temperature

Controls randomness in responses:

- `0.0`: Deterministic, always same response
- `0.7`: Balanced creativity and consistency (recommended)
- `1.0`: High creativity, varied responses

```tsx
const llmConfig = {
  temperature: 0.7, // Balanced creativity
  // ... other config
};
```

#### Max Tokens

Limits response length:

- `500`: Short responses
- `1000`: Medium responses (recommended)
- `2000`: Long responses

```tsx
const llmConfig = {
  maxTokens: 1000, // Medium response length
  // ... other config
};
```

## 🎯 Prompt Engineering

### How Adaptly Uses Prompts

Adaptly automatically constructs prompts that include:

1. **User Input**: Natural language description
2. **Component Registry**: Available components and their capabilities
3. **Current Layout**: Existing components and their positions
4. **Available Space**: Grid dimensions and constraints
5. **Context**: User preferences and previous interactions

### Example Prompt Structure

```
You are a UI layout assistant. Given a user's request and available components, suggest an appropriate layout.

User Request: "Add a revenue chart"
Available Components: [MetricCard, SalesChart, DataTable, ...]
Current Layout: [existing components]
Available Space: 6x4 grid

Please suggest which components to add and how to arrange them.
```

### Customizing Prompts

```tsx
class CustomLLMService extends CoreLLMService {
  protected buildPrompt(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): string {
    // Custom prompt construction
    return `
      You are an expert UI designer. 
      User wants: ${input}
      Available components: ${availableComponents.join(', ')}
      Current layout: ${JSON.stringify(currentLayout)}
      
      Design the perfect layout for this request.
    `;
  }
}
```

## 🔄 AI Processing Flow

### 1. Input Processing

```typescript
// User input is captured
const userInput = "Add a revenue chart";

// Input is preprocessed
const processedInput = preprocessInput(userInput);

// Context is gathered
const context = {
  currentLayout,
  availableSpace,
  availableComponents,
  userPreferences
};
```

### 2. Prompt Construction

```typescript
const prompt = buildPrompt(
  processedInput,
  context,
  componentRegistry
);
```

### 3. AI Model Call

```typescript
const response = await llmService.generateContent(prompt);
```

### 4. Response Processing

```typescript
const parsedResponse = parseAIResponse(response);
const newLayout = generateLayout(parsedResponse);
```

### 5. Layout Update

```typescript
updateAdaptation(newLayout);
```

## 🧠 AI Capabilities

### What the AI Can Do

#### Component Selection

- Choose appropriate components based on user intent
- Understand component capabilities and use cases
- Match components to available space

#### Layout Generation

- Arrange components in logical order
- Optimize for available space
- Consider responsive design principles

#### Context Understanding

- Remember previous interactions
- Understand user preferences
- Adapt to different screen sizes

### Example AI Responses

#### "Add a revenue chart"

```json
{
  "components": [
    {
      "type": "SalesChart",
      "props": {
        "title": "Revenue Chart",
        "metric": "revenue",
        "timeRange": "30d"
      },
      "position": { "x": 0, "y": 0, "w": 4, "h": 3 }
    }
  ]
}
```

#### "Create a sales dashboard"

```json
{
  "components": [
    {
      "type": "MetricCard",
      "props": { "title": "Total Sales", "value": "$45,231" },
      "position": { "x": 0, "y": 0, "w": 2, "h": 1 }
    },
    {
      "type": "SalesChart",
      "props": { "title": "Sales Trend", "metric": "sales" },
      "position": { "x": 2, "y": 0, "w": 4, "h": 3 }
    },
    {
      "type": "DataTable",
      "props": { "title": "Recent Orders", "data": "orders" },
      "position": { "x": 0, "y": 3, "w": 6, "h": 4 }
    }
  ]
}
```

## 🔧 Advanced Configuration

### Custom AI Providers

```tsx
class CustomAIProvider {
  async generateContent(prompt: string): Promise<string> {
    // Custom AI integration
    const response = await this.callCustomAI(prompt);
    return response;
  }
  
  private async callCustomAI(prompt: string): Promise<string> {
    // Implement your custom AI logic
    return "Custom AI response";
  }
}
```

### Multi-Model Support

```tsx
class MultiModelLLMService extends CoreLLMService {
  private models: Map<string, LLMConfig> = new Map();
  
  constructor(configs: Record<string, LLMConfig>) {
    super(configs.primary);
    this.models = new Map(Object.entries(configs));
  }
  
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    // Try primary model first
    try {
      return await super.processUserRequest(
        input, currentLayout, availableSpace, availableComponents, config
      );
    } catch (error) {
      // Fallback to secondary model
      return await this.fallbackModel(input, currentLayout, availableSpace, availableComponents, config);
    }
  }
}
```

### Caching AI Responses

```tsx
class CachedLLMService extends CoreLLMService {
  private cache: Map<string, LLMResponse> = new Map();
  
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    const cacheKey = this.generateCacheKey(input, currentLayout, availableSpace);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const response = await super.processUserRequest(
      input, currentLayout, availableSpace, availableComponents, config
    );
    
    this.cache.set(cacheKey, response);
    return response;
  }
}
```

## 🎨 Customizing AI Behavior

### Response Formatting

```tsx
class FormattedLLMService extends CoreLLMService {
  protected formatResponse(response: string): LLMResponse {
    // Custom response formatting
    const parsed = JSON.parse(response);
    
    return {
      success: true,
      newAdaptation: {
        components: parsed.components.map(this.formatComponent),
        layout: parsed.layout || 'grid',
        spacing: parsed.spacing || 6,
        columns: parsed.columns || 6
      },
      reasoning: parsed.reasoning
    };
  }
  
  private formatComponent(component: any): UIComponent {
    return {
      id: component.id || generateId(),
      type: component.type,
      props: component.props || {},
      position: component.position,
      visible: component.visible !== false
    };
  }
}
```

### Error Handling

```tsx
class RobustLLMService extends CoreLLMService {
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    try {
      return await super.processUserRequest(
        input, currentLayout, availableSpace, availableComponents, config
      );
    } catch (error) {
      // Fallback to basic parsing
      return this.fallbackResponse(input, currentLayout);
    }
  }
  
  private fallbackResponse(input: string, currentLayout: UIAdaptation): LLMResponse {
    // Basic keyword matching
    if (input.includes('metric')) {
      return {
        success: true,
        newAdaptation: {
          ...currentLayout,
          components: [
            ...currentLayout.components,
            {
              id: 'fallback-metric',
              type: 'MetricCard',
              props: { title: 'Metric', value: '0' },
              position: { x: 0, y: 0, w: 2, h: 1 },
              visible: true
            }
          ]
        }
      };
    }
    
    return { success: false, error: 'Unable to process request' };
  }
}
```

## 🧪 Testing AI Integration

### Mock AI Service

```tsx
class MockLLMService extends CoreLLMService {
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    // Mock responses for testing
    if (input.includes('metric')) {
      return {
        success: true,
        newAdaptation: {
          ...currentLayout,
          components: [
            ...currentLayout.components,
            {
              id: 'test-metric',
              type: 'MetricCard',
              props: { title: 'Test Metric', value: '100' },
              position: { x: 0, y: 0, w: 2, h: 1 },
              visible: true
            }
          ]
        }
      };
    }
    
    return { success: false, error: 'Mock error' };
  }
}
```

### Testing AI Responses

```tsx
describe('AI Integration', () => {
  test('processes user input correctly', async () => {
    const llmService = new MockLLMService({ apiKey: 'test', model: 'test' });
    
    const response = await llmService.processUserRequest(
      'Add a metric',
      mockLayout,
      { width: 6, height: 4 },
      ['MetricCard'],
      mockConfig
    );
    
    expect(response.success).toBe(true);
    expect(response.newAdaptation?.components).toHaveLength(1);
  });
});
```

## 🚀 Performance Optimization

### Response Caching

```tsx
class CachedLLMService extends CoreLLMService {
  private cache = new Map<string, LLMResponse>();
  
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    const cacheKey = this.generateCacheKey(input, currentLayout);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const response = await super.processUserRequest(
      input, currentLayout, availableSpace, availableComponents, config
    );
    
    this.cache.set(cacheKey, response);
    return response;
  }
}
```

### Debounced Requests

```tsx
class DebouncedLLMService extends CoreLLMService {
  private debounceTimer: NodeJS.Timeout | null = null;
  
  async processUserRequest(
    input: string,
    currentLayout: UIAdaptation,
    availableSpace: SpaceInfo,
    availableComponents: string[],
    config: AdaptlyJsonConfig
  ): Promise<LLMResponse> {
    return new Promise((resolve) => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      this.debounceTimer = setTimeout(async () => {
        const response = await super.processUserRequest(
          input, currentLayout, availableSpace, availableComponents, config
        );
        resolve(response);
      }, 300); // 300ms debounce
    });
  }
}
```

## 🆘 Troubleshooting

### Common Issues

**AI not responding:**

- Check API key is correct
- Verify network connectivity
- Ensure model is supported
- Check rate limits

**Poor AI responses:**

- Adjust temperature setting
- Improve component descriptions
- Add more use cases to registry
- Check prompt construction

**Slow AI responses:**

- Enable response caching
- Use debounced requests
- Consider model size
- Check network latency

### Debug Tools

```tsx
// Enable AI debugging
<AdaptlyProvider
  logging={{
    enabled: true,
    level: 'debug'
  }}
  // ... other props
>

// Log AI requests and responses
adaptlyLogger.debug('AI Request', { input, context });
adaptlyLogger.debug('AI Response', { response });
```

## 📚 Next Steps

Now that you understand AI integration:

1. **Read the [Component Registry Guide](./component-registry.md)** - Learn about component registration
2. **Check out the [Architecture Overview](./architecture.md)** - Understand the system design
3. **Explore [Custom Components](./custom-components.md)** - Build your own components
4. **Try the [Basic Dashboard Tutorial](./tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to start building?** Check out the [Quick Start Guide](./quick-start.md) to get started!
