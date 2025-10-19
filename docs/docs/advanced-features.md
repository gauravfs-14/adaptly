---
sidebar_position: 6
---

# Advanced Features

Custom loaders, advanced configurations

This guide covers advanced features and configurations for Adaptly, including custom loaders, advanced storage, multi-provider setups, and performance optimizations.

## 🎨 Custom Loaders

### Creating Custom Loaders

Create a custom loading component for AI processing:

```tsx
import { CustomLoaderProps } from 'adaptly';

function MyCustomLoader({ isVisible, message, subMessage }: CustomLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{message}</h3>
        <p className="text-gray-600 mb-4">{subMessage}</p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Use with AdaptlyProvider
<AdaptlyProvider
  // ... other props
  customLoader={MyCustomLoader}
/>
```

### Advanced Loader with Progress

```tsx
function ProgressLoader({ isVisible, message, subMessage }: CustomLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
        <div className="mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{message}</h3>
          <p className="text-gray-600 mb-4">{subMessage}</p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-500">{progress}% complete</p>
      </div>
    </div>
  );
}
```

## 🔄 Multi-Provider Setup

### Dynamic Provider Switching

```tsx
"use client";

import { useState, useEffect } from 'react';
import { AdaptlyProvider } from 'adaptly';

function MultiProviderDashboard() {
  const [provider, setProvider] = useState<'google' | 'openai' | 'anthropic'>('google');
  const [model, setModel] = useState('gemini-2.0-flash-exp');
  const [isLoading, setIsLoading] = useState(false);

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
        return [
          { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash (Experimental)' },
          { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
          { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
          { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' }
        ];
      case 'openai':
        return [
          { value: 'gpt-4o', label: 'GPT-4o' },
          { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
          { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
        ];
      case 'anthropic':
        return [
          { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
          { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku' },
          { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' }
        ];
      default:
        return [];
    }
  };

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider as any);
    const options = getModelOptions();
    if (options.length > 0) {
      setModel(options[0].value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Provider Selection */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Adaptive Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <select 
              value={provider} 
              onChange={(e) => handleProviderChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="google">Google Gemini</option>
              <option value="openai">OpenAI GPT</option>
              <option value="anthropic">Anthropic Claude</option>
            </select>
            
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {getModelOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AdaptlyProvider */}
      <AdaptlyProvider
        apiKey={getApiKey()}
        provider={provider}
        model={model}
        components={{
          MetricCard,
          SalesChart,
          DataTable,
        }}
        adaptlyConfig={adaptlyConfig}
        enableStorage={true}
        storageKey={`dashboard-${provider}`}
        storageVersion="1.0.0"
        className="h-full"
      />
    </div>
  );
}
```

### Provider Performance Monitoring

```tsx
function ProviderPerformanceMonitor() {
  const [performance, setPerformance] = useState<Record<string, any>>({});
  const { currentLLMProvider } = useAdaptiveUI();

  const trackPerformance = async (provider: string, request: string) => {
    const startTime = Date.now();
    
    try {
      // Make request and measure performance
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setPerformance(prev => ({
        ...prev,
        [provider]: {
          ...prev[provider],
          responseTime,
          requestCount: (prev[provider]?.requestCount || 0) + 1,
          lastRequest: new Date().toISOString()
        }
      }));
    } catch (error) {
      console.error('Performance tracking error:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Provider Performance</h3>
      <div className="space-y-2">
        {Object.entries(performance).map(([provider, stats]) => (
          <div key={provider} className="flex justify-between items-center p-2 bg-white rounded">
            <span className="font-medium">{provider}</span>
            <div className="text-sm text-gray-600">
              <span>Avg: {stats.responseTime}ms</span>
              <span className="ml-2">Requests: {stats.requestCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 💾 Advanced Storage

### Custom Storage Service

```tsx
import { StorageService } from 'adaptly';

class CustomStorageService extends StorageService {
  constructor(config: StorageConfig) {
    super(config);
  }

  // Override save to add compression
  saveAdaptation(adaptation: UIAdaptation): boolean {
    try {
      // Compress data before saving
      const compressed = this.compressData(adaptation);
      const storageKey = `${this.config.key}_${this.config.version}`;
      
      const dataToStore = {
        adaptation: compressed,
        timestamp: Date.now(),
        version: this.config.version,
        compressed: true
      };

      localStorage.setItem(storageKey, JSON.stringify(dataToStore));
      return true;
    } catch (error) {
      console.error('Custom storage save failed:', error);
      return false;
    }
  }

  // Override load to handle compression
  loadAdaptation(): UIAdaptation | null {
    try {
      const storageKey = `${this.config.key}_${this.config.version}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (!storedData) return null;
      
      const parsedData = JSON.parse(storedData);
      
      if (parsedData.compressed) {
        // Decompress data
        return this.decompressData(parsedData.adaptation);
      }
      
      return parsedData.adaptation;
    } catch (error) {
      console.error('Custom storage load failed:', error);
      return null;
    }
  }

  private compressData(data: UIAdaptation): string {
    // Simple compression - in production, use a proper compression library
    return JSON.stringify(data);
  }

  private decompressData(compressed: string): UIAdaptation {
    return JSON.parse(compressed);
  }
}

// Use custom storage service
const customStorage = new CustomStorageService({
  enabled: true,
  key: 'my-app-ui',
  version: '1.0.0'
});
```

### Storage Analytics

```tsx
function StorageAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const analyzeStorage = () => {
      const storageKey = 'my-app-ui_1.0.0';
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        const size = new Blob([storedData]).size;
        
        setAnalytics({
          size,
          componentCount: data.adaptation.components.length,
          lastUpdated: new Date(data.timestamp),
          version: data.version,
          compressionRatio: size / JSON.stringify(data.adaptation).length
        });
      }
    };

    analyzeStorage();
  }, []);

  if (!analytics) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Storage Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Storage Size</p>
          <p className="text-lg font-semibold">{analytics.size} bytes</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Components</p>
          <p className="text-lg font-semibold">{analytics.componentCount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-sm">{analytics.lastUpdated.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Compression Ratio</p>
          <p className="text-sm">{(analytics.compressionRatio * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Advanced Component Configuration

### Dynamic Component Registry

```tsx
function DynamicComponentRegistry() {
  const [components, setComponents] = useState<Record<string, React.ComponentType<any>>>({});
  const [adaptlyConfig, setAdaptlyConfig] = useState<AdaptlyJsonConfig>({
    version: "1.0.0",
    components: {}
  });

  const addComponent = (name: string, component: React.ComponentType<any>, config: ComponentJsonConfig) => {
    setComponents(prev => ({ ...prev, [name]: component }));
    setAdaptlyConfig(prev => ({
      ...prev,
      components: { ...prev.components, [name]: config }
    }));
  };

  const removeComponent = (name: string) => {
    setComponents(prev => {
      const newComponents = { ...prev };
      delete newComponents[name];
      return newComponents;
    });
    setAdaptlyConfig(prev => {
      const newComponents = { ...prev.components };
      delete newComponents[name];
      return { ...prev, components: newComponents };
    });
  };

  return (
    <div>
      <ComponentManager 
        onAdd={addComponent}
        onRemove={removeComponent}
      />
      
      <AdaptlyProvider
        apiKey={apiKey}
        provider="google"
        model="gemini-2.0-flash-exp"
        components={components}
        adaptlyConfig={adaptlyConfig}
        enableStorage={true}
      />
    </div>
  );
}
```

### Component Validation

```tsx
function ComponentValidator() {
  const validateComponent = (component: UIComponent, config: ComponentJsonConfig): boolean => {
    // Check required props
    const requiredProps = Object.entries(config.props)
      .filter(([_, propConfig]) => propConfig.required)
      .map(([name, _]) => name);

    for (const prop of requiredProps) {
      if (!component.props[prop]) {
        console.error(`Missing required prop: ${prop}`);
        return false;
      }
    }

    // Check prop types
    for (const [propName, propValue] of Object.entries(component.props)) {
      const propConfig = config.props[propName];
      if (propConfig) {
        const expectedType = propConfig.type;
        const actualType = typeof propValue;
        
        if (expectedType === 'array' && !Array.isArray(propValue)) {
          console.error(`Prop ${propName} should be array`);
          return false;
        }
        
        if (expectedType !== 'array' && actualType !== expectedType) {
          console.error(`Prop ${propName} should be ${expectedType}, got ${actualType}`);
          return false;
        }
      }
    }

    return true;
  };

  return null; // This is a utility function
}
```

## 🚀 Performance Optimizations

### Memoization

```tsx
import { useMemo, useCallback } from 'react';
import { useAdaptiveUI } from 'adaptly';

function OptimizedComponent() {
  const {
    adaptation,
    addComponent,
    removeComponent,
    updateComponent,
  } = useAdaptiveUI();

  // Memoize expensive calculations
  const componentCount = useMemo(() => {
    return adaptation.components.length;
  }, [adaptation.components]);

  const componentTypes = useMemo(() => {
    return [...new Set(adaptation.components.map(comp => comp.type))];
  }, [adaptation.components]);

  // Memoize callbacks
  const handleAddComponent = useCallback((component: UIComponent) => {
    addComponent(component);
  }, [addComponent]);

  const handleRemoveComponent = useCallback((id: string) => {
    removeComponent(id);
  }, [removeComponent]);

  return (
    <div>
      <p>Total components: {componentCount}</p>
      <p>Component types: {componentTypes.join(', ')}</p>
    </div>
  );
}
```

### Debounced Updates

```tsx
import { useCallback, useRef } from 'react';
import { useAdaptiveUI } from 'adaptly';

function DebouncedComponent() {
  const { updateComponent } = useAdaptiveUI();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedUpdate = useCallback((id: string, updates: Partial<UIComponent>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      updateComponent(id, updates);
    }, 300);
  }, [updateComponent]);

  return (
    <div>
      {/* Use debouncedUpdate instead of updateComponent */}
    </div>
  );
}
```

### Virtual Scrolling

```tsx
import { useMemo } from 'react';
import { useAdaptiveUI } from 'adaptly';

function VirtualizedGrid() {
  const { adaptation } = useAdaptiveUI();
  
  const visibleComponents = useMemo(() => {
    // Implement virtual scrolling logic
    const viewportHeight = window.innerHeight;
    const itemHeight = 200; // Estimated component height
    const visibleCount = Math.ceil(viewportHeight / itemHeight) + 2;
    
    return adaptation.components.slice(0, visibleCount);
  }, [adaptation.components]);

  return (
    <div className="grid grid-cols-6 gap-6">
      {visibleComponents.map(component => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
}
```

## 🔧 Custom Hooks

### useAdaptiveUI with Custom Logic

```tsx
function useAdaptiveUIWithAnalytics() {
  const adaptiveUI = useAdaptiveUI();
  const [analytics, setAnalytics] = useState({
    componentAdds: 0,
    componentRemoves: 0,
    aiRequests: 0,
    lastActivity: null as Date | null
  });

  const addComponentWithAnalytics = useCallback((component: UIComponent) => {
    adaptiveUI.addComponent(component);
    setAnalytics(prev => ({
      ...prev,
      componentAdds: prev.componentAdds + 1,
      lastActivity: new Date()
    }));
  }, [adaptiveUI]);

  const removeComponentWithAnalytics = useCallback((id: string) => {
    adaptiveUI.removeComponent(id);
    setAnalytics(prev => ({
      ...prev,
      componentRemoves: prev.componentRemoves + 1,
      lastActivity: new Date()
    }));
  }, [adaptiveUI]);

  const parseUserInputWithAnalytics = useCallback(async (input: string) => {
    await adaptiveUI.parseUserInputWithLLM(input);
    setAnalytics(prev => ({
      ...prev,
      aiRequests: prev.aiRequests + 1,
      lastActivity: new Date()
    }));
  }, [adaptiveUI]);

  return {
    ...adaptiveUI,
    addComponent: addComponentWithAnalytics,
    removeComponent: removeComponentWithAnalytics,
    parseUserInputWithLLM: parseUserInputWithAnalytics,
    analytics
  };
}
```

### useStorage with Custom Logic

```tsx
function useStorageWithBackup() {
  const { saveToStorage, loadFromStorage, clearStorage } = useAdaptiveUI();
  const [backups, setBackups] = useState<any[]>([]);

  const saveWithBackup = useCallback(() => {
    const success = saveToStorage();
    if (success) {
      const backup = {
        timestamp: Date.now(),
        data: loadFromStorage()
      };
      setBackups(prev => [backup, ...prev.slice(0, 4)]); // Keep last 5 backups
    }
    return success;
  }, [saveToStorage, loadFromStorage]);

  const restoreFromBackup = useCallback((backupIndex: number) => {
    if (backups[backupIndex]) {
      const backup = backups[backupIndex];
      // Restore from backup
      console.log('Restoring from backup:', backup);
    }
  }, [backups]);

  return {
    saveToStorage: saveWithBackup,
    loadFromStorage,
    clearStorage,
    backups,
    restoreFromBackup
  };
}
```

## 🎨 Advanced Styling

### Theme Integration

```tsx
function ThemedAdaptlyProvider({ theme }: { theme: 'light' | 'dark' }) {
  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white'
  };

  return (
    <div className={themeClasses[theme]}>
      <AdaptlyProvider
        apiKey={apiKey}
        provider="google"
        model="gemini-2.0-flash-exp"
        components={components}
        adaptlyConfig={adaptlyConfig}
        className={`h-full ${themeClasses[theme]}`}
      />
    </div>
  );
}
```

### Responsive Design

```tsx
function ResponsiveAdaptlyProvider() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveConfig = () => {
    switch (screenSize) {
      case 'mobile':
        return { columns: 2, spacing: 4 };
      case 'tablet':
        return { columns: 4, spacing: 5 };
      case 'desktop':
        return { columns: 6, spacing: 6 };
    }
  };

  return (
    <AdaptlyProvider
      apiKey={apiKey}
      provider="google"
      model="gemini-2.0-flash-exp"
      components={components}
      adaptlyConfig={adaptlyConfig}
      defaultLayout={{
    components: [],
    layout: "grid",
    ...getResponsiveConfig()
  }}
      className="h-full"
    />
  );
}
```

## 📚 Next Steps

Now that you understand advanced features:

1. **Read the [Troubleshooting Guide](troubleshooting)** for common issues
2. **Check out [API Reference](api/core-components)** for complete API documentation
3. **See the [Demo Application](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/)** for complete examples
4. **Explore [Component Registry Guide](component-registry)** for advanced component configuration

## 🆘 Support

- **Documentation**: Check other guides in this documentation
- **Examples**: Look at the demo application in `/examples`
- **Issues**: [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions)

---

Ready to troubleshoot issues? Check out the [Troubleshooting Guide](troubleshooting)!
