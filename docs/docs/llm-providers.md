---
sidebar_position: 4
title: LLM Providers
description: Set up AI providers (Google Gemini, OpenAI GPT, Anthropic Claude) for Adaptly
---

# LLM Providers Guide

Adaptly supports multiple Large Language Model providers, giving you flexibility in AI capabilities, costs, and performance. This guide covers setup for all supported providers.

## Quick Start (Google Gemini)

For beginners, we recommend starting with Google Gemini as it's the easiest to set up and has a generous free tier.

### 1. Get Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" and create a new key
4. Copy the API key (starts with `AIza...`)

### 2. Set Up Environment Variables

Create a `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### 3. Configure AdaptlyProvider

```tsx
import { AdaptlyProvider } from "adaptly";
import adaptlyConfig from "./adaptly.json";

export default function App() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
      provider="google"
      model="gemini-2.0-flash-exp"
      components={{ MetricCard, SalesChart }}
      adaptlyConfig={adaptlyConfig}
    />
  );
}
```

### 4. Supported Models

- `gemini-2.0-flash-exp` (recommended - latest)
- `gemini-2.0-flash`
- `gemini-1.5-pro`
- `gemini-1.5-flash`
- `gemini-1.0-pro`

## Advanced Provider Setup

### OpenAI GPT Setup

#### 1. Get Your API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in and navigate to API Keys
3. Create a new secret key
4. Copy the key (starts with `sk-...`)

#### 2. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here
```

#### 3. Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY!}
  provider="openai"
  model="gpt-4o"
  components={{ MetricCard, SalesChart }}
  adaptlyConfig={adaptlyConfig}
/>
```

#### 4. Supported Models

- `gpt-4o` (recommended - most capable)
- `gpt-4o-mini` (cost-effective)
- `gpt-4-turbo`
- `gpt-4`
- `gpt-3.5-turbo`

### Anthropic Claude Setup

#### 1. Get Your API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign in and navigate to API Keys
3. Create a new key
4. Copy the key (starts with `sk-ant-...`)

#### 2. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key_here
```

#### 3. Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!}
  provider="anthropic"
  model="claude-3-5-sonnet-20241022"
  components={{ MetricCard, SalesChart }}
  adaptlyConfig={adaptlyConfig}
/>
```

#### 4. Supported Models

- `claude-3-5-sonnet-20241022` (recommended - most capable)
- `claude-3-5-haiku-20241022` (fastest)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`

## Provider Comparison

| Provider | Best For | Cost | Speed | Capabilities |
|----------|----------|------|-------|--------------|
| **Google Gemini** | Beginners, Free tier | Free tier available | Fast | Good for most tasks |
| **OpenAI GPT** | Advanced reasoning | Higher cost | Medium | Excellent for complex tasks |
| **Anthropic Claude** | Balanced performance | Medium cost | Fast | Great for structured output |

## Runtime Provider Switching

You can switch providers at runtime using state management:

```tsx
"use client";

import { useState } from "react";
import { AdaptlyProvider } from "adaptly";

export default function App() {
  const [selectedProvider, setSelectedProvider] = useState<"google" | "openai" | "anthropic">("google");
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash-exp");

  const getApiKey = () => {
    switch (selectedProvider) {
      case "google":
        return process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!;
      case "openai":
        return process.env.NEXT_PUBLIC_OPENAI_API_KEY!;
      case "anthropic":
        return process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!;
      default:
        return "";
    }
  };

  const modelOptions = {
    google: ["gemini-2.0-flash-exp", "gemini-2.0-flash", "gemini-1.5-pro"],
    openai: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
    anthropic: ["claude-3-5-sonnet-20241022", "claude-3-5-haiku-20241022"]
  };

  return (
    <div>
      {/* Provider selector */}
      <select 
        value={selectedProvider} 
        onChange={(e) => setSelectedProvider(e.target.value as any)}
      >
        <option value="google">Google Gemini</option>
        <option value="openai">OpenAI GPT</option>
        <option value="anthropic">Anthropic Claude</option>
      </select>

      {/* Model selector */}
      <select 
        value={selectedModel} 
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {modelOptions[selectedProvider].map(model => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>

      <AdaptlyProvider
        apiKey={getApiKey()}
        provider={selectedProvider}
        model={selectedModel}
        components={{ MetricCard, SalesChart }}
        adaptlyConfig={adaptlyConfig}
      />
    </div>
  );
}
```

## Model Selection Guide

### For Development

- **Google Gemini**: `gemini-2.0-flash-exp` (free tier, good performance)
- **OpenAI**: `gpt-4o-mini` (cost-effective, good quality)
- **Anthropic**: `claude-3-5-haiku-20241022` (fastest, good quality)

### For Production

- **Google Gemini**: `gemini-2.0-flash` (stable, good performance)
- **OpenAI**: `gpt-4o` (best quality, higher cost)
- **Anthropic**: `claude-3-5-sonnet-20241022` (excellent quality, balanced cost)

### For Cost Optimization

- **Google Gemini**: `gemini-1.5-flash` (fastest, lowest cost)
- **OpenAI**: `gpt-3.5-turbo` (good quality, lower cost)
- **Anthropic**: `claude-3-5-haiku-20241022` (fast, cost-effective)

## Advanced Configuration

### Custom LLM Settings

You can customize LLM behavior through the AdaptlyProvider:

```tsx
<AdaptlyProvider
  apiKey={apiKey}
  provider="openai"
  model="gpt-4o"
  components={components}
  adaptlyConfig={adaptlyConfig}
  // Custom configuration
  enableStorage={true}
  storageKey="my-app-ui"
  storageVersion="1.0.0"
/>
```

### Error Handling

Each provider has different error patterns:

```tsx
// Handle provider-specific errors
const handleLLMError = (error: Error) => {
  if (error.message.includes("API key")) {
    console.error("Invalid API key for provider");
  } else if (error.message.includes("quota")) {
    console.error("API quota exceeded");
  } else if (error.message.includes("model")) {
    console.error("Model not available");
  }
};
```

### Provider-Specific Features

#### Google Gemini

- **Free tier**: 15 requests per minute
- **Rate limits**: Generous for development
- **Best for**: Quick prototyping, free development

#### OpenAI GPT

- **Rate limits**: Varies by model and tier
- **Best for**: Complex reasoning, advanced tasks
- **Cost**: Higher but excellent quality

#### Anthropic Claude

- **Rate limits**: 5 requests per minute (free tier)
- **Best for**: Balanced performance and cost
- **Safety**: Built-in safety features

## Troubleshooting

### Common Issues

**"API key is required" error:**

- Check environment variable name matches exactly
- Restart development server after adding variables
- Verify API key format (starts with correct prefix)

**"Model not found" error:**

- Check model name spelling
- Verify model is available in your region
- Try a different model from the supported list

**"Rate limit exceeded" error:**

- Wait before making more requests
- Consider upgrading your API plan
- Switch to a different provider temporarily

**"Invalid API key" error:**

- Verify the key is correct and active
- Check if the key has expired
- Ensure the key has the right permissions

### Debug Mode

Enable debug logging to see provider-specific information:

```tsx
// In your component
import { adaptlyLogger } from "adaptly";

// Enable debug logging
adaptlyLogger.setConfig({ enabled: true, level: "debug" });
```

### Provider Status

Check if your provider is working:

```tsx
const { currentLLMProvider, isLLMProcessing } = useAdaptiveUI();

console.log("Current provider:", currentLLMProvider);
console.log("Processing:", isLLMProcessing);
```

## Cost Optimization

### Free Tiers

- **Google Gemini**: 15 requests/minute (free)
- **OpenAI**: $5 credit (new accounts)
- **Anthropic**: 5 requests/minute (free)

### Cost-Effective Models

- **Google**: `gemini-1.5-flash` (fastest, cheapest)
- **OpenAI**: `gpt-3.5-turbo` (good quality, lower cost)
- **Anthropic**: `claude-3-5-haiku-20241022` (fast, cost-effective)

### Usage Monitoring

- Monitor your API usage in provider dashboards
- Set up billing alerts
- Use development models for testing

## Next Steps

- **[Storage Service Guide](storage-service)** - Configure persistence
- **[Advanced Features Guide](advanced-features)** - Custom loaders and validation
- **[API Reference](api/core-components)** - Complete component documentation

## Example Implementations

- **[Demo App](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo)** - Full provider switching
- **[Component Examples](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/src/components)** - Real React components

---

**Ready to configure persistence?** Check out the [Storage Service Guide](storage-service) to learn how Adaptly automatically saves and restores your UI state!
