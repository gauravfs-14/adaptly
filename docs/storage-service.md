# Storage Service Guide

Adaptly's storage service provides automatic persistence of your UI state, ensuring that user customizations are saved and restored across sessions. This guide covers everything you need to know about storage configuration and management.

## 📋 Overview

The storage service automatically:

- **Saves UI state** to localStorage when changes occur
- **Restores UI state** when the page loads
- **Handles version control** to manage configuration changes
- **Provides manual controls** for advanced use cases

## 🚀 Basic Setup

### Enable Storage

```tsx
<AdaptlyProvider
  // ... other props
  enableStorage={true}
  storageKey="my-app-ui"
  storageVersion="1.0.0"
/>
```

### Storage Configuration

```tsx
<AdaptlyProvider
  // ... other props
  enableStorage={true}
  storageKey="my-dashboard-ui"        // Unique key for your app
  storageVersion="2.0.0"              // Version for compatibility
/>
```

## 🔧 Storage Options

### Basic Configuration

```tsx
<AdaptlyProvider
  // ... other props
  enableStorage={true}                // Enable/disable storage
  storageKey="my-app-ui"              // localStorage key
  storageVersion="1.0.0"              // Version for compatibility
/>
```

### Advanced Configuration

```tsx
<AdaptlyProvider
  // ... other props
  enableStorage={true}
  storageKey="my-app-ui"
  storageVersion="2.0.0"
  // Custom storage configuration
  storageConfig={{
    enabled: true,
    key: "my-app-ui",
    version: "2.0.0",
    autoSave: true,
    maxRetries: 3,
    retryDelay: 1000,
  }}
/>
```

## 📱 Manual Storage Control

### Using the useAdaptiveUI Hook

```tsx
import { useAdaptiveUI } from 'adaptly';

function MyComponent() {
  const {
    saveToStorage,
    loadFromStorage,
    clearStorage,
    hasStoredData,
  } = useAdaptiveUI();

  const handleSave = () => {
    const success = saveToStorage();
    if (success) {
      console.log('UI state saved successfully');
    }
  };

  const handleLoad = () => {
    const savedState = loadFromStorage();
    if (savedState) {
      console.log('UI state loaded:', savedState);
    }
  };

  const handleClear = () => {
    const success = clearStorage();
    if (success) {
      console.log('Storage cleared');
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save State</button>
      <button onClick={handleLoad}>Load State</button>
      <button onClick={handleClear}>Clear Storage</button>
      <p>Has stored data: {hasStoredData() ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Storage Methods

```tsx
const {
  // Storage methods
  saveToStorage,      // Save current state to localStorage
  loadFromStorage,    // Load saved state from localStorage
  clearStorage,       // Clear saved state
  hasStoredData,      // Check if stored data exists
  
  // UI state
  adaptation,         // Current UI state
  updateAdaptation,   // Update UI state
} = useAdaptiveUI();
```

## 🔄 Automatic Storage

### Auto-Save Behavior

Adaptly automatically saves your UI state when:

- **Components are added** - New components are saved immediately
- **Components are removed** - Changes are saved immediately
- **Components are updated** - Updates are saved immediately
- **Layout changes** - Layout modifications are saved immediately

### Auto-Load Behavior

Adaptly automatically loads saved state when:

- **Page loads** - Saved state is restored on initialization
- **Component mounts** - State is loaded when AdaptlyProvider mounts
- **Storage is available** - Only loads if localStorage is accessible

## 🏷️ Storage Keys

### Key Structure

Storage keys follow this pattern:

```
{storageKey}_{storageVersion}
```

Examples:

- `my-app-ui_1.0.0`
- `dashboard-ui_2.0.0`
- `admin-panel_1.5.0`

### Custom Keys

```tsx
<AdaptlyProvider
  // ... other props
  storageKey="my-custom-dashboard"
  storageVersion="1.0.0"
  // Results in localStorage key: "my-custom-dashboard_1.0.0"
/>
```

## 📊 Storage Data Structure

### Stored Data Format

```json
{
  "adaptation": {
    "components": [
      {
        "id": "metric-1",
        "type": "MetricCard",
        "props": {
          "title": "Revenue",
          "value": "$45,231",
          "change": "+20.1%",
          "changeType": "positive"
        },
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

### Data Validation

The storage service validates:

- **Version compatibility** - Ensures stored data matches current version
- **Component structure** - Validates component definitions
- **Layout integrity** - Checks layout configuration
- **Data freshness** - Handles stale data gracefully

## 🔄 Version Control

### Version Management

```tsx
// Version 1.0.0
<AdaptlyProvider
  storageVersion="1.0.0"
  // ... other props
/>

// Version 2.0.0 (breaking changes)
<AdaptlyProvider
  storageVersion="2.0.0"
  // ... other props
/>
```

### Version Compatibility

- **Same version** - Data is loaded normally
- **Different version** - Data is cleared and fresh state is used
- **Missing version** - Data is cleared and fresh state is used

### Migration Handling

```tsx
// Handle version changes
const handleVersionChange = (oldVersion: string, newVersion: string) => {
  console.log(`Migrating from ${oldVersion} to ${newVersion}`);
  // Custom migration logic here
};

<AdaptlyProvider
  storageVersion="2.0.0"
  onVersionChange={handleVersionChange}
  // ... other props
/>
```

## 🎯 Use Cases

### Dashboard Persistence

```tsx
// Save user's dashboard layout
<AdaptlyProvider
  enableStorage={true}
  storageKey="user-dashboard"
  storageVersion="1.0.0"
  // ... other props
/>
```

### Multi-User Support

```tsx
// Different storage for different users
const userId = getCurrentUserId();

<AdaptlyProvider
  enableStorage={true}
  storageKey={`dashboard-${userId}`}
  storageVersion="1.0.0"
  // ... other props
/>
```

### Environment-Specific Storage

```tsx
// Different storage for different environments
const environment = process.env.NODE_ENV;

<AdaptlyProvider
  enableStorage={true}
  storageKey={`dashboard-${environment}`}
  storageVersion="1.0.0"
  // ... other props
/>
```

## 🔧 Advanced Configuration

### Custom Storage Service

```tsx
import { StorageService } from 'adaptly';

// Create custom storage service
const customStorage = new StorageService({
  enabled: true,
  key: 'my-custom-key',
  version: '1.0.0',
});

// Use with AdaptlyProvider
<AdaptlyProvider
  // ... other props
  storageService={customStorage}
/>
```

### Storage Events

```tsx
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === 'my-app-ui_1.0.0') {
    console.log('Storage changed:', event.newValue);
  }
};

useEffect(() => {
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
```

### Storage Quotas

```tsx
// Check storage quota
const checkStorageQuota = () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then((estimate) => {
      console.log('Storage quota:', estimate.quota);
      console.log('Storage usage:', estimate.usage);
    });
  }
};
```

## 🚨 Common Issues

### Storage Not Working

**Issue**: Changes not being saved

- **Solution**: Check that `enableStorage={true}` is set
- **Solution**: Verify localStorage is available
- **Solution**: Check browser storage permissions

**Issue**: Data not loading on page refresh

- **Solution**: Ensure storage key is consistent
- **Solution**: Check version compatibility
- **Solution**: Verify data format is correct

### Version Conflicts

**Issue**: "Version mismatch" error

- **Solution**: Update storage version to match current version
- **Solution**: Clear storage and start fresh
- **Solution**: Implement migration logic

**Issue**: Data lost after version update

- **Solution**: This is expected behavior for breaking changes
- **Solution**: Implement data migration
- **Solution**: Backup data before version updates

### Storage Quota Exceeded

**Issue**: "Storage quota exceeded" error

- **Solution**: Clear old storage data
- **Solution**: Reduce stored data size
- **Solution**: Implement data compression

## 🔍 Debugging Storage

### Enable Debug Logging

```tsx
<AdaptlyProvider
  // ... other props
  logging={{ enabled: true, level: 'debug' }}
/>
```

### Storage Inspection

```tsx
// Inspect stored data
const inspectStorage = () => {
  const storageKey = 'my-app-ui_1.0.0';
  const storedData = localStorage.getItem(storageKey);
  console.log('Stored data:', JSON.parse(storedData || '{}'));
};

// Clear specific storage
const clearStorage = () => {
  const storageKey = 'my-app-ui_1.0.0';
  localStorage.removeItem(storageKey);
};
```

### Storage Testing

```tsx
// Test storage functionality
const testStorage = async () => {
  const { saveToStorage, loadFromStorage, clearStorage } = useAdaptiveUI();
  
  // Test save
  const saveResult = saveToStorage();
  console.log('Save result:', saveResult);
  
  // Test load
  const loadResult = loadFromStorage();
  console.log('Load result:', loadResult);
  
  // Test clear
  const clearResult = clearStorage();
  console.log('Clear result:', clearResult);
};
```

## 📊 Storage Analytics

### Track Storage Usage

```tsx
const trackStorageUsage = () => {
  const storageKey = 'my-app-ui_1.0.0';
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    const data = JSON.parse(storedData);
    const size = new Blob([storedData]).size;
    
    console.log('Storage size:', size, 'bytes');
    console.log('Component count:', data.adaptation.components.length);
    console.log('Last updated:', new Date(data.timestamp));
  }
};
```

### Storage Metrics

```tsx
const getStorageMetrics = () => {
  const metrics = {
    totalSize: 0,
    componentCount: 0,
    lastUpdated: null,
  };
  
  // Calculate metrics
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('my-app-ui_')) {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        metrics.totalSize += new Blob([data]).size;
        metrics.componentCount += parsed.adaptation.components.length;
        if (!metrics.lastUpdated || parsed.timestamp > metrics.lastUpdated) {
          metrics.lastUpdated = parsed.timestamp;
        }
      }
    }
  }
  
  return metrics;
};
```

## 🔒 Security Considerations

### Data Privacy

- **Local storage only** - Data never leaves the user's browser
- **No external transmission** - Storage is completely local
- **User control** - Users can clear storage at any time

### Data Validation

```tsx
// Validate stored data before loading
const validateStoredData = (data: any) => {
  if (!data || typeof data !== 'object') return false;
  if (!data.adaptation || !Array.isArray(data.adaptation.components)) return false;
  if (!data.version || !data.timestamp) return false;
  
  return true;
};
```

## 📚 Next Steps

Now that you understand storage service:

1. **Read the [Advanced Features Guide](./advanced-features.md)** for custom configurations
2. **Check out [Troubleshooting Guide](./troubleshooting.md)** for common issues
3. **Explore [API Reference](./api/)** for complete API documentation
4. **See the [Demo Application](../examples/adaptly-demo/)** for complete examples

## 🆘 Support

- **Documentation**: Check other guides in this documentation
- **Examples**: Look at the demo application in `/examples`
- **Issues**: [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions)

---

Ready to explore advanced features? Check out the [Advanced Features Guide](./advanced-features.md)!
