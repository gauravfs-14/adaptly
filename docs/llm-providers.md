# LLM Providers Guide

Adaptly supports multiple AI providers, allowing you to choose the best model for your needs. This guide covers setting up and configuring different LLM providers.

## 🎯 Supported Providers

Adaptly supports three major AI providers:

- **Google Gemini** - Fast, cost-effective, great for most use cases
- **OpenAI GPT** - Powerful, excellent for complex reasoning
- **Anthropic Claude** - Balanced performance and cost

## 🔧 Provider Configuration

### Basic Setup

```tsx
<AdaptlyProvider
  apiKey="your-api-key"
  provider="google" // or "openai" or "anthropic"
  model="gemini-2.0-flash-exp"
  // ... other props
/>
```

### Environment Variables

Set up your API keys in environment variables:

```bash
# .env.local (Next.js) or .env (React)

# Google Gemini (recommended for beginners)
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# OpenAI GPT
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Claude
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## 🤖 Google Gemini

### Getting Started

1. **Get your API key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Set environment variable**:

   ```bash
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

3. **Configure AdaptlyProvider**:

   ```tsx
   <AdaptlyProvider
     apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
     provider="google"
     model="gemini-2.0-flash-exp"
     // ... other props
   />
   ```

### Available Models

```tsx
// Experimental models (latest features)
model="gemini-2.0-flash-exp"

// Stable models
model="gemini-2.0-flash"
model="gemini-1.5-pro"
model="gemini-1.5-flash"
model="gemini-1.0-pro"
```

### Model Comparison

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| `gemini-2.0-flash-exp` | Fast | Low | Latest features, experimentation |
| `gemini-2.0-flash` | Fast | Low | Production use, fast responses |
| `gemini-1.5-pro` | Medium | Medium | Complex reasoning, detailed analysis |
| `gemini-1.5-flash` | Fast | Low | Quick responses, simple tasks |
| `gemini-1.0-pro` | Medium | Medium | Balanced performance |

### Example Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
  provider="google"
  model="gemini-2.0-flash-exp"
  components={{ MetricCard, SalesChart, DataTable }}
  adaptlyConfig={adaptlyConfig}
  enableStorage={true}
/>
```

## 🧠 OpenAI GPT

### Getting Started

1. **Get your API key**:
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key

2. **Set environment variable**:

   ```bash
   NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
   ```

3. **Configure AdaptlyProvider**:

   ```tsx
   <AdaptlyProvider
     apiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY!}
     provider="openai"
     model="gpt-4o"
     // ... other props
   />
   ```

### Available Models

```tsx
// Latest models
model="gpt-4o"           // Latest GPT-4 model
model="gpt-4o-mini"      // Cost-effective version

// Previous models
model="gpt-4-turbo"      // GPT-4 Turbo
model="gpt-4"            // GPT-4
model="gpt-3.5-turbo"    // GPT-3.5 Turbo
```

### Model Comparison

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| `gpt-4o` | Fast | Medium | Latest features, best performance |
| `gpt-4o-mini` | Fast | Low | Cost-effective, good performance |
| `gpt-4-turbo` | Medium | High | Complex reasoning, detailed analysis |
| `gpt-4` | Medium | High | High-quality responses |
| `gpt-3.5-turbo` | Fast | Low | Quick responses, simple tasks |

### Example Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY!}
  provider="openai"
  model="gpt-4o"
  components={{ MetricCard, SalesChart, DataTable }}
  adaptlyConfig={adaptlyConfig}
  enableStorage={true}
/>
```

## 🎭 Anthropic Claude

### Getting Started

1. **Get your API key**:
   - Go to [Anthropic Console](https://console.anthropic.com/)
   - Create a new API key
   - Copy the key

2. **Set environment variable**:

   ```bash
   NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
   ```

3. **Configure AdaptlyProvider**:

   ```tsx
   <AdaptlyProvider
     apiKey={process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!}
     provider="anthropic"
     model="claude-3-5-sonnet-20241022"
     // ... other props
   />
   ```

### Available Models

```tsx
// Latest models
model="claude-3-5-sonnet-20241022"  // Latest Claude 3.5 Sonnet
model="claude-3-5-haiku-20241022"   // Fast Claude 3.5 Haiku

// Previous models
model="claude-3-opus-20240229"      // Claude 3 Opus
model="claude-3-sonnet-20240229"    // Claude 3 Sonnet
```

### Model Comparison

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| `claude-3-5-sonnet-20241022` | Medium | Medium | Balanced performance, latest features |
| `claude-3-5-haiku-20241022` | Fast | Low | Quick responses, cost-effective |
| `claude-3-opus-20240229` | Slow | High | Complex reasoning, detailed analysis |
| `claude-3-sonnet-20240229` | Medium | Medium | Balanced performance |

### Example Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!}
  provider="anthropic"
  model="claude-3-5-sonnet-20241022"
  components={{ MetricCard, SalesChart, DataTable }}
  adaptlyConfig={adaptlyConfig}
  enableStorage={true}
/>
```

## 🔄 Dynamic Provider Switching

### Runtime Provider Selection

You can switch providers at runtime using state:

```tsx
"use client";

import { useState } from 'react';
import { AdaptlyProvider } from 'adaptly';

export default function Dashboard() {
  const [provider, setProvider] = useState<'google' | 'openai' | 'anthropic'>('google');
  const [model, setModel] = useState('gemini-2.0-flash-exp');

  const getApiKey = () => {
    switch (provider) {
      case 'google':
        return process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!;
      case 'openai':
        return process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
      case 'anthropic':
        return process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!;
      default:
        return '';
    }
  };

  const getModelOptions = () => {
    switch (provider) {
      case 'google':
        return ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash'];
      case 'openai':
        return ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'];
      case 'anthropic':
        return ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022'];
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="mb-4">
        <select 
          value={provider} 
          onChange={(e) => setProvider(e.target.value as any)}
        >
          <option value="google">Google Gemini</option>
          <option value="openai">OpenAI GPT</option>
          <option value="anthropic">Anthropic Claude</option>
        </select>
        
        <select 
          value={model} 
          onChange={(e) => setModel(e.target.value)}
        >
          {getModelOptions().map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <AdaptlyProvider
        apiKey={getApiKey()}
        provider={provider}
        model={model}
        components={{ MetricCard, SalesChart, DataTable }}
        adaptlyConfig={adaptlyConfig}
        enableStorage={true}
      />
    </div>
  );
}
```

### Provider-Specific Configuration

```tsx
const getProviderConfig = (provider: string) => {
  switch (provider) {
    case 'google':
      return {
        model: 'gemini-2.0-flash-exp',
        maxTokens: 1000,
        temperature: 0.7,
      };
    case 'openai':
      return {
        model: 'gpt-4o',
        maxTokens: 1500,
        temperature: 0.8,
      };
    case 'anthropic':
      return {
        model: 'claude-3-5-sonnet-20241022',
        maxTokens: 2000,
        temperature: 0.7,
      };
    default:
      return {};
  }
};
```

## ⚙️ Advanced Configuration

### Custom LLM Settings

```tsx
<AdaptlyProvider
  apiKey={apiKey}
  provider="google"
  model="gemini-2.0-flash-exp"
  // Custom LLM configuration
  llmConfig={{
    maxTokens: 1500,
    temperature: 0.8,
    topP: 0.9,
    frequencyPenalty: 0.1,
    presencePenalty: 0.1,
  }}
  // ... other props
/>
```

### Provider-Specific Optimizations

```tsx
// Google Gemini optimizations
const geminiConfig = {
  model: 'gemini-2.0-flash-exp',
  maxTokens: 1000,
  temperature: 0.7,
  // Gemini-specific settings
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
};

// OpenAI GPT optimizations
const openaiConfig = {
  model: 'gpt-4o',
  maxTokens: 1500,
  temperature: 0.8,
  // OpenAI-specific settings
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
};

// Anthropic Claude optimizations
const claudeConfig = {
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 2000,
  temperature: 0.7,
  // Claude-specific settings
  topP: 0.9,
  topK: 40,
};
```

## 🎯 Provider Selection Guide

### Choose Google Gemini When

- **Budget is a concern** - Lowest cost per request
- **Speed is important** - Fastest response times
- **Simple use cases** - Basic UI generation and layout
- **Getting started** - Easiest to set up and use

### Choose OpenAI GPT When

- **Complex reasoning** - Need advanced AI capabilities
- **Quality over cost** - Willing to pay for best performance
- **Latest features** - Want access to newest AI capabilities
- **Enterprise use** - Need reliable, production-ready AI

### Choose Anthropic Claude When

- **Balanced approach** - Good balance of cost and performance
- **Safety is important** - Built-in safety features
- **Long conversations** - Better context retention
- **Creative tasks** - Excellent for creative UI generation

## 🔍 Performance Comparison

### Response Time

| Provider | Model | Avg Response Time | Best For |
|----------|-------|-------------------|----------|
| Google | gemini-2.0-flash-exp | 1-2s | Quick responses |
| Google | gemini-1.5-pro | 2-3s | Balanced performance |
| OpenAI | gpt-4o | 2-4s | High quality |
| OpenAI | gpt-4o-mini | 1-2s | Cost-effective |
| Anthropic | claude-3-5-sonnet | 2-3s | Balanced approach |
| Anthropic | claude-3-5-haiku | 1-2s | Fast responses |

### Cost Comparison

| Provider | Model | Cost per 1K tokens | Best For |
|----------|-------|-------------------|----------|
| Google | gemini-2.0-flash-exp | $0.0005 | Budget-friendly |
| Google | gemini-1.5-pro | $0.001 | Balanced cost |
| OpenAI | gpt-4o | $0.005 | Premium quality |
| OpenAI | gpt-4o-mini | $0.00015 | Cost-effective |
| Anthropic | claude-3-5-sonnet | $0.003 | Balanced cost |
| Anthropic | claude-3-5-haiku | $0.00025 | Budget-friendly |

## 🚨 Common Issues

### API Key Issues

**Error**: "API key not found"

- **Solution**: Check that your environment variable is set correctly
- **Solution**: Ensure the variable name matches your provider
- **Solution**: Verify the API key is valid and has sufficient credits

**Error**: "Invalid API key"

- **Solution**: Regenerate your API key
- **Solution**: Check that the key is copied correctly
- **Solution**: Ensure the key has the right permissions

### Model Issues

**Error**: "Model not found"

- **Solution**: Check that the model name is correct
- **Solution**: Ensure the model is available in your region
- **Solution**: Try a different model from the same provider

**Error**: "Model not supported"

- **Solution**: Use a supported model for your provider
- **Solution**: Check the model availability in your region
- **Solution**: Update to a newer model version

### Rate Limiting

**Error**: "Rate limit exceeded"

- **Solution**: Wait before making more requests
- **Solution**: Upgrade your API plan
- **Solution**: Implement request queuing

## 🔧 Troubleshooting

### Debug Mode

Enable debug logging to see provider-specific information:

```tsx
<AdaptlyProvider
  // ... other props
  logging={{ enabled: true, level: 'debug' }}
/>
```

### Provider Testing

Test different providers with the same request:

```tsx
const testProviders = async () => {
  const providers = ['google', 'openai', 'anthropic'];
  
  for (const provider of providers) {
    console.log(`Testing ${provider}...`);
    // Test your AdaptlyProvider with this provider
  }
};
```

### Performance Monitoring

Monitor provider performance:

```tsx
const [providerStats, setProviderStats] = useState({});

const trackProviderPerformance = (provider: string, responseTime: number) => {
  setProviderStats(prev => ({
    ...prev,
    [provider]: {
      ...prev[provider],
      responseTime,
      requestCount: (prev[provider]?.requestCount || 0) + 1,
    },
  }));
};
```

## 📚 Next Steps

Now that you understand LLM providers:

1. **Read the [Storage Service Guide](./storage-service.md)** for persistent state management
2. **Explore [Advanced Features](./advanced-features.md)** for custom configurations
3. **Check out [Troubleshooting Guide](./troubleshooting.md)** for common issues
4. **See the [Demo Application](../examples/adaptly-demo/)** for complete examples

## 🆘 Support

- **Documentation**: Check other guides in this documentation
- **Examples**: Look at the demo application in `/examples`
- **Issues**: [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions)

---

Ready to learn about persistent storage? Check out the [Storage Service Guide](./storage-service.md)!
