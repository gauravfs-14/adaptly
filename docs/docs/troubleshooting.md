---
sidebar_position: 7
---

# Troubleshooting Guide

Common issues and solutions

This guide helps you diagnose and resolve common issues with Adaptly. If you're experiencing problems, check this guide first before seeking additional help.

## 📋 Table of Contents

1. [Critical Issues (v0.0.5+)](#-critical-issues-v005)
2. [Common Issues](#-common-issues)
3. [API Key Issues](#-api-key-issues)
4. [Component Issues](#-component-issues)
5. [Storage Issues](#-storage-issues)
6. [Performance Issues](#-performance-issues)
7. [Frequently Asked Questions](#-frequently-asked-questions)

## 🚨 Critical Issues (v0.0.5+)

### React Peer Dependency Issues ✅ **FIXED in v0.0.5**

**Problem**: Getting peer dependency errors when installing Adaptly in Next.js 15+ applications.

**Symptoms**:

- `npm install adaptly` fails with peer dependency conflicts
- "Mismatching versions of React and the renderer" errors
- "More than one copy of React" warnings
- Installation fails with React version conflicts

**Solution**: **Update to v0.0.5+** - This issue has been completely resolved!

```bash
# Update to the latest version
npm update adaptly
# or
npm install adaptly@latest
```

**What was fixed**:

- ✅ React is now properly externalized instead of bundled
- ✅ Peer dependencies support React 18+ and 19+
- ✅ Full compatibility with Next.js 15+ and React 19+
- ✅ No more duplicate React instances
- ✅ Clean installation without warnings

**Verification**:

```bash
# Check that React is externalized
npm ls react
# Should show only one React version
```

## 🚨 Common Issues

### 1. Component Not Found Errors

**Error**: `Component type MetricCard not found in registry`

**Causes:**

- Component not properly exported
- Component not registered in AdaptlyProvider
- Component name mismatch between code and registry

**Solutions:**

1. **Check component export:**

```tsx
// ✅ Correct export
export function MetricCard(props: MetricCardProps) {
  return <div>...</div>;
}

// ❌ Incorrect export
export default function MetricCard(props: MetricCardProps) {
  return <div>...</div>;
}
```

2. **Check component registration:**

```tsx
// ✅ Correct registration
<AdaptlyProvider
  components={{ MetricCard, SalesChart, DataTable }}
  // ... other props
/>

// ❌ Incorrect registration
<AdaptlyProvider
  components={{ metricCard: MetricCard }} // Wrong key
  // ... other props
/>
```

3. **Check adaptly.json configuration:**

```json
{
  "components": {
    "MetricCard": {  // Must match component name
      "description": "Display key performance indicators",
      // ... other config
    }
  }
}
```

### 2. API Key Issues

**Error**: `API key not found` or `Invalid API key`

**Causes:**

- Environment variable not set
- Wrong environment variable name
- Invalid API key
- API key not accessible

**Solutions:**

1. **Check environment variable:**

```bash
# .env.local (Next.js)
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# .env (React)
REACT_APP_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

2. **Verify variable name:**

```tsx
// ✅ Correct usage
<AdaptlyProvider
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
  // ... other props
/>

// ❌ Incorrect usage
<AdaptlyProvider
  apiKey={process.env.GOOGLE_API_KEY!} // Wrong variable name
  // ... other props
/>
```

3. **Test API key:**

```tsx
// Test API key validity
const testApiKey = async () => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}`
      }
    });
    console.log('API key valid:', response.ok);
  } catch (error) {
    console.error('API key test failed:', error);
  }
};
```

### 3. Storage Issues

**Error**: `Storage not working` or `Data not persisting`

**Causes:**

- localStorage disabled
- Storage quota exceeded
- Version mismatch
- Invalid data format

**Solutions:**

1. **Check localStorage availability:**

```tsx
const checkLocalStorage = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('localStorage is available');
    return true;
  } catch (error) {
    console.error('localStorage not available:', error);
    return false;
  }
};
```

2. **Check storage quota:**

```tsx
const checkStorageQuota = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    console.log('Storage quota:', estimate.quota);
    console.log('Storage usage:', estimate.usage);
    console.log('Available space:', estimate.quota - estimate.usage);
  }
};
```

3. **Handle version mismatch:**

```tsx
// Clear storage on version mismatch
const handleVersionMismatch = () => {
  const currentVersion = '2.0.0';
  const storedVersion = localStorage.getItem('my-app-ui_version');
  
  if (storedVersion && storedVersion !== currentVersion) {
    console.log('Version mismatch detected, clearing storage');
    localStorage.removeItem('my-app-ui_1.0.0');
    localStorage.removeItem('my-app-ui_2.0.0');
  }
};
```

### 4. LLM Processing Issues

**Error**: `LLM processing failed` or `AI not responding`

**Causes:**

- Network issues
- API rate limits
- Invalid model name
- Insufficient API credits

**Solutions:**

1. **Check network connectivity:**

```tsx
const checkNetwork = async () => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models');
    console.log('Network connectivity:', response.ok);
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

2. **Handle rate limits:**

```tsx
const handleRateLimit = (error: Error) => {
  if (error.message.includes('rate limit')) {
    console.log('Rate limit exceeded, waiting...');
    setTimeout(() => {
      // Retry request
    }, 60000); // Wait 1 minute
  }
};
```

3. **Check model availability:**

```tsx
const checkModelAvailability = async (provider: string, model: string) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}`);
    console.log('Model available:', response.ok);
  } catch (error) {
    console.error('Model not available:', error);
  }
};
```

### 5. Component Rendering Issues

**Error**: `Component not rendering` or `Empty components`

**Causes:**

- Invalid component props
- Missing required props
- Component validation failures
- Empty or invalid data

**Solutions:**

1. **Validate component props:**

```tsx
const validateComponentProps = (component: UIComponent, config: ComponentJsonConfig) => {
  const requiredProps = Object.entries(config.props)
    .filter(([_, propConfig]) => propConfig.required)
    .map(([name, _]) => name);

  for (const prop of requiredProps) {
    if (!component.props[prop]) {
      console.error(`Missing required prop: ${prop}`);
      return false;
    }
  }
  return true;
};
```

2. **Check component data:**

```tsx
const checkComponentData = (component: UIComponent) => {
  if (component.type === 'MetricCard') {
    const { title, value } = component.props;
    if (!title || !value || value === '$0' || value === '0') {
      console.warn('Invalid metric card data:', component.props);
      return false;
    }
  }
  return true;
};
```

3. **Debug component rendering:**

```tsx
const debugComponentRendering = (component: UIComponent) => {
  console.log('Rendering component:', component.type);
  console.log('Component props:', component.props);
  console.log('Component position:', component.position);
  console.log('Component visible:', component.visible);
};
```

## 🔍 Debugging Tools

### 1. Enable Debug Logging

```tsx
<AdaptlyProvider
  // ... other props
  logging={{ enabled: true, level: 'debug' }}
/>
```

### 2. Component Inspector

```tsx
function ComponentInspector() {
  const { adaptation } = useAdaptiveUI();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Component Inspector</h3>
      <div className="space-y-2">
        {adaptation.components.map(component => (
          <div key={component.id} className="p-2 bg-white rounded border">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{component.type}</p>
                <p className="text-sm text-gray-600">ID: {component.id}</p>
                <p className="text-sm text-gray-600">
                  Position: {component.position.x}, {component.position.y} 
                  ({component.position.w}x{component.position.h})
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {component.visible ? 'Visible' : 'Hidden'}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500">Props:</p>
              <pre className="text-xs bg-gray-50 p-2 rounded">
                {JSON.stringify(component.props, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Storage Inspector

```tsx
function StorageInspector() {
  const { hasStoredData, loadFromStorage } = useAdaptiveUI();
  const [storageData, setStorageData] = useState<any>(null);

  const inspectStorage = () => {
    if (hasStoredData()) {
      const data = loadFromStorage();
      setStorageData(data);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Storage Inspector</h3>
      <button 
        onClick={inspectStorage}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Inspect Storage
      </button>
      {storageData && (
        <div className="bg-white p-4 rounded border">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(storageData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
```

### 4. Performance Monitor

```tsx
function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    // Measure render time
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Measure memory usage
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
    
    setMetrics({
      renderTime,
      componentCount: document.querySelectorAll('[data-adaptly-component]').length,
      memoryUsage
    });
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Performance Monitor</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Render Time</p>
          <p className="text-lg font-semibold">{metrics.renderTime.toFixed(2)}ms</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Components</p>
          <p className="text-lg font-semibold">{metrics.componentCount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Memory</p>
          <p className="text-lg font-semibold">{(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB</p>
        </div>
      </div>
    </div>
  );
}
```

## 🛠️ Common Fixes

### 1. Reset to Default

```tsx
function ResetButton() {
  const { resetToDefault, clearStorage } = useAdaptiveUI();

  const handleReset = () => {
    resetToDefault();
    clearStorage();
    console.log('Reset to default state');
  };

  return (
    <button 
      onClick={handleReset}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Reset to Default
    </button>
  );
}
```

### 2. Clear Storage

```tsx
function ClearStorageButton() {
  const { clearStorage } = useAdaptiveUI();

  const handleClear = () => {
    const success = clearStorage();
    if (success) {
      console.log('Storage cleared successfully');
    } else {
      console.error('Failed to clear storage');
    }
  };

  return (
    <button 
      onClick={handleClear}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Clear Storage
    </button>
  );
}
```

### 3. Reload Components

```tsx
function ReloadComponentsButton() {
  const { loadFromStorage } = useAdaptiveUI();

  const handleReload = () => {
    const savedData = loadFromStorage();
    if (savedData) {
      console.log('Components reloaded from storage');
    } else {
      console.log('No saved data to reload');
    }
  };

  return (
    <button 
      onClick={handleReload}
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      Reload Components
    </button>
  );
}
```

## 🚨 Error Handling

### 1. Global Error Boundary

```tsx
class AdaptlyErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Adaptly Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Something went wrong</h3>
          <p className="text-red-600 mt-2">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Use with AdaptlyProvider
<AdaptlyErrorBoundary>
  <AdaptlyProvider
    // ... props
  />
</AdaptlyErrorBoundary>
```

### 2. Error Recovery

```tsx
function ErrorRecovery() {
  const { resetToDefault, clearStorage } = useAdaptiveUI();
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error) => {
    console.error('Adaptly error:', error);
    setError(error);
  };

  const recoverFromError = () => {
    try {
      resetToDefault();
      clearStorage();
      setError(null);
      console.log('Recovered from error');
    } catch (recoveryError) {
      console.error('Recovery failed:', recoveryError);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800">Error Detected</h3>
        <p className="text-red-600 mt-2">{error.message}</p>
        <button 
          onClick={recoverFromError}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Recover
        </button>
      </div>
    );
  }

  return null;
}
```

## 📞 Getting Help

### 1. Check Documentation

- **[Quick Start Guide](quick-start)** - Setup and basic usage
- **[Component Registry Guide](component-registry)** - Component configuration
- **[LLM Providers Guide](llm-providers)** - AI provider issues
- **[Storage Service Guide](storage-service)** - Storage issues
- **[Advanced Features Guide](advanced-features)** - Advanced configurations

## ❓ Frequently Asked Questions

### General Questions

**Q: Do I need to install React and React-DOM separately?**
A: Yes, Adaptly requires React and React-DOM as peer dependencies. They should already be installed in your Next.js or React project.

**Q: Can I use Adaptly with other UI libraries like Material-UI or Chakra UI?**
A: Yes! Adaptly works with any React component library. Just register your components in the `components` prop of `AdaptlyProvider`.

**Q: Is Adaptly compatible with React 18 and 19?**
A: Yes, Adaptly supports both React 18 and 19. The v0.0.5+ release specifically fixes compatibility issues with React 19.

### API Key Questions

**Q: Do I need API keys for all providers?**
A: No, you only need an API key for the provider you're using. Set the `provider` prop to match your API key.

**Q: Which LLM provider should I use?**
A:

- **Google Gemini**: Best for beginners, generous free tier
- **OpenAI GPT**: Most popular, excellent performance
- **Anthropic Claude**: Great for complex reasoning tasks

**Q: Can I switch providers dynamically?**
A: Yes, you can change the `provider` and `model` props at runtime, but you'll need the corresponding API key.

### Component Questions

**Q: How many components can I register?**
A: There's no hard limit, but we recommend starting with 5-10 components for better AI performance.

**Q: Do my components need to be in a specific format?**
A: Your components should accept props as defined in `adaptly.json`. The AI will pass these props when rendering.

**Q: Can I use TypeScript components?**
A: Absolutely! Adaptly is TypeScript-first and works seamlessly with TypeScript components.

### Storage Questions

**Q: Where is the UI state stored?**
A: By default, state is stored in `localStorage`. You can customize this with the `storageKey` prop.

**Q: Can I disable storage?**
A: Yes, set `enableStorage={false}` to disable automatic state persistence.

**Q: How do I clear saved state?**
A: Use the `clearStorage()` method from the `useAdaptiveUI` hook, or clear localStorage manually.

### 2. Debug Information

When reporting issues, include:

```tsx
function DebugInfo() {
  const { adaptation, config, currentLLMProvider } = useAdaptiveUI();

  const debugInfo = {
    version: '1.0.0',
    components: adaptation.components.length,
    layout: adaptation.layout,
    llmProvider: currentLLMProvider,
    storageEnabled: config?.storage?.enabled,
    storageKey: config?.storage?.key,
    storageVersion: config?.storage?.version,
    userAgent: navigator.userAgent,
    localStorage: typeof localStorage !== 'undefined',
    timestamp: new Date().toISOString()
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Debug Information</h3>
      <pre className="text-sm overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
```

### 3. Community Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/gauravfs-14/adaptly/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/gauravfs-14/adaptly/discussions)
- **Documentation**: Check this comprehensive guide
- **Examples**: Look at the demo application in `/examples`

### 4. Common Solutions

| Issue | Solution |
|-------|----------|
| Component not found | Check export and registration |
| API key error | Verify environment variable |
| Storage not working | Check localStorage availability |
| AI not responding | Verify API key and model |
| Performance issues | Enable memoization and debouncing |
| Version conflicts | Clear storage and update version |

## 🎯 Prevention

### 1. Best Practices

- Always validate component props
- Use TypeScript for type safety
- Test with different providers
- Monitor performance metrics
- Handle errors gracefully
- Keep documentation updated

### 2. Testing

```tsx
// Test component registration
const testComponentRegistration = () => {
  const components = { MetricCard, SalesChart, DataTable };
  const componentNames = Object.keys(components);
  console.log('Registered components:', componentNames);
};

// Test API key
const testApiKey = async () => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models');
    console.log('API key test:', response.ok);
  } catch (error) {
    console.error('API key test failed:', error);
  }
};

// Test storage
const testStorage = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('Storage test: passed');
  } catch (error) {
    console.error('Storage test failed:', error);
  }
};
```

### 3. Monitoring

```tsx
// Monitor component changes
useEffect(() => {
  console.log('Components changed:', adaptation.components.length);
}, [adaptation.components]);

// Monitor AI processing
useEffect(() => {
  if (isLLMProcessing) {
    console.log('AI processing started');
  } else {
    console.log('AI processing completed');
  }
}, [isLLMProcessing]);

// Monitor storage
useEffect(() => {
  console.log('Storage status:', hasStoredData());
}, [hasStoredData]);
```

---

Still having issues? Check out the [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues) or [GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions) for community support!
