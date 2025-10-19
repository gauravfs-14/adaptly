# LLM Providers Configuration

Adaptly v2.0 supports multiple LLM providers, allowing you to choose the best AI model for your specific needs.

## 🎯 Supported Providers

### OpenAI GPT-4

- **Best for**: Complex reasoning, detailed analysis, creative tasks
- **Model**: `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`
- **API Key**: `NEXT_PUBLIC_OPENAI_API_KEY`

### Anthropic Claude

- **Best for**: Nuanced understanding, safety-focused applications, long conversations
- **Model**: `claude-3-5-sonnet-20241022`, `claude-3-opus-20240229`
- **API Key**: `NEXT_PUBLIC_ANTHROPIC_API_KEY`

### Google Gemini

- **Best for**: Fast responses, cost-effective processing, multimodal tasks
- **Model**: `gemini-2.0-flash-exp`, `gemini-1.5-pro`, `gemini-1.5-flash`
- **API Key**: `NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY`

## 🔧 Configuration

### Basic Setup

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY}
  provider="openai"
  model="gpt-4"
  // ... other props
/>
```

### Provider-Specific Examples

#### OpenAI Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY}
  provider="openai"
  model="gpt-4"
  components={components}
  adaptlyConfig={config}
/>
```

#### Anthropic Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY}
  provider="anthropic"
  model="claude-3-5-sonnet-20241022"
  components={components}
  adaptlyConfig={config}
/>
```

#### Google Configuration

```tsx
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}
  provider="google"
  model="gemini-2.0-flash-exp"
  components={components}
  adaptlyConfig={config}
/>
```

## 🔄 Dynamic Provider Switching

```tsx
function App() {
  const [provider, setProvider] = useState<"openai" | "anthropic" | "google">("openai");
  
  const getApiKey = () => {
    switch (provider) {
      case "openai":
        return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      case "anthropic":
        return process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      case "google":
        return process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
    }
  };

  const getModel = () => {
    switch (provider) {
      case "openai":
        return "gpt-4";
      case "anthropic":
        return "claude-3-5-sonnet-20241022";
      case "google":
        return "gemini-2.0-flash-exp";
    }
  };

  return (
    <AdaptlyProvider
      apiKey={getApiKey()}
      provider={provider}
      model={getModel()}
      components={components}
      adaptlyConfig={config}
    />
  );
}
```

## 🎛️ Advanced Configuration

### Custom LLM Settings

```tsx
<AdaptlyProvider
  apiKey={apiKey}
  provider="openai"
  model="gpt-4"
  // Custom LLM configuration
  llmConfig={{
    maxTokens: 2000,
    temperature: 0.7,
    // Provider-specific settings
  }}
  // ... other props
/>
```

### Provider-Specific Features

#### OpenAI Features

- Function calling support
- JSON mode for structured outputs
- Advanced reasoning capabilities

#### Anthropic Features

- Constitutional AI principles
- Long context windows
- Safety-focused responses

#### Google Features

- Multimodal capabilities
- Fast response times
- Cost-effective processing

## 🔍 Provider Selection Guide

### Choose OpenAI When

- You need complex reasoning and analysis
- Working with structured data processing
- Require function calling capabilities
- Budget allows for premium pricing

### Choose Anthropic When

- Safety and ethical considerations are important
- Working with sensitive or personal data
- Need nuanced understanding of context
- Require long conversation handling

### Choose Google When

- Cost optimization is a priority
- Need fast response times
- Working with multimodal content
- Building high-volume applications

## 🚨 Error Handling

### Missing API Key

```tsx
function ProviderStatus() {
  const { currentLLMProvider } = useAdaptiveUI();
  
  return (
    <div>
      {currentLLMProvider ? (
        <span>Connected to {currentLLMProvider}</span>
      ) : (
        <span className="text-red-500">No LLM provider connected</span>
      )}
    </div>
  );
}
```

### Provider-Specific Error Handling

```tsx
function ErrorBoundary() {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Handle provider-specific errors
    if (error?.includes('OpenAI')) {
      console.log('OpenAI API error:', error);
    } else if (error?.includes('Anthropic')) {
      console.log('Anthropic API error:', error);
    } else if (error?.includes('Google')) {
      console.log('Google API error:', error);
    }
  }, [error]);
  
  return error ? <div>Error: {error}</div> : null;
}
```

## 📊 Performance Comparison

| Provider | Speed | Cost | Quality | Best Use Case |
|----------|-------|------|---------|---------------|
| OpenAI GPT-4 | Medium | High | Excellent | Complex reasoning |
| Anthropic Claude | Medium | Medium | Excellent | Safety-focused |
| Google Gemini | Fast | Low | Good | High-volume apps |

## 🔧 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct and has proper permissions
   - Check environment variable naming
   - Ensure the key is for the correct provider

2. **Model Not Found**
   - Verify the model name is correct for the provider
   - Check if the model is available in your region
   - Ensure you have access to the specific model

3. **Rate Limiting**
   - Implement exponential backoff
   - Consider switching to a different provider
   - Monitor your API usage

### Debug Mode

```tsx
<AdaptlyProvider
  // ... other props
  logging={{
    enabled: true,
    level: "debug"
  }}
/>
```

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Google AI Documentation](https://ai.google.dev/docs)
- [Vercel AI SDK Documentation](https://ai-sdk.dev/)
