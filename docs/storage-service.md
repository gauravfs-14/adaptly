# Storage Service Documentation

Adaptly v2.0 includes a comprehensive storage service that automatically saves and restores your UI state using localStorage.

## 🎯 Overview

The Storage Service provides:

- **Automatic Persistence**: UI state is saved automatically on changes
- **Version Control**: Storage includes version checking to prevent conflicts
- **Manual Controls**: Access storage methods through the `useAdaptiveUI` hook
- **Cross-Session Persistence**: State survives page refreshes and browser restarts

## 🔧 Basic Usage

### Automatic Storage

```tsx
<AdaptlyProvider
  enableStorage={true} // Enable automatic storage
  storageKey="my-app-ui" // Custom storage key
  storageVersion="1.0.0" // Version for compatibility
  // ... other props
/>
```

### Manual Storage Control

```tsx
import { useAdaptiveUI } from 'adaptly';

function StorageControls() {
  const { 
    saveToStorage, 
    loadFromStorage, 
    clearStorage, 
    hasStoredData 
  } = useAdaptiveUI();

  return (
    <div>
      <button onClick={saveToStorage}>Save State</button>
      <button onClick={loadFromStorage}>Load State</button>
      <button onClick={clearStorage}>Clear State</button>
      <span>Has data: {hasStoredData() ? 'Yes' : 'No'}</span>
    </div>
  );
}
```

## 📊 Storage Methods

### `saveToStorage()`

Manually saves the current UI state to localStorage.

```tsx
const { saveToStorage } = useAdaptiveUI();

// Save current state
const success = saveToStorage();
if (success) {
  console.log('State saved successfully');
}
```

### `loadFromStorage()`

Loads the saved UI state from localStorage.

```tsx
const { loadFromStorage } = useAdaptiveUI();

// Load saved state
const savedState = loadFromStorage();
if (savedState) {
  console.log('State loaded successfully');
}
```

### `clearStorage()`

Clears all stored UI state from localStorage.

```tsx
const { clearStorage } = useAdaptiveUI();

// Clear stored state
const success = clearStorage();
if (success) {
  console.log('Storage cleared successfully');
}
```

### `hasStoredData()`

Checks if there's stored data available.

```tsx
const { hasStoredData } = useAdaptiveUI();

// Check if data exists
const hasData = hasStoredData();
console.log('Has stored data:', hasData);
```

## ⚙️ Configuration Options

### Storage Configuration

```tsx
<AdaptlyProvider
  // ... other props
  enableStorage={true} // Enable/disable storage
  storageKey="my-app-ui" // localStorage key
  storageVersion="1.0.0" // Version for compatibility
/>
```

### Advanced Configuration

```tsx
// Custom storage configuration
const storageConfig = {
  enabled: true,
  key: "my-custom-key",
  version: "2.0.0"
};

<AdaptlyProvider
  // ... other props
  storage={storageConfig}
/>
```

## 🔄 Version Control

### Automatic Version Checking

The storage service automatically checks version compatibility:

```tsx
// If stored version doesn't match current version
// Storage will be cleared automatically
<AdaptlyProvider
  storageVersion="2.0.0" // Current version
  // If localStorage has version "1.0.0", it will be cleared
/>
```

### Manual Version Management

```tsx
function VersionManager() {
  const { clearStorage } = useAdaptiveUI();
  
  const handleVersionUpgrade = () => {
    // Clear old data when upgrading
    clearStorage();
    console.log('Storage cleared for version upgrade');
  };
  
  return (
    <button onClick={handleVersionUpgrade}>
      Clear Storage for Upgrade
    </button>
  );
}
```

## 📱 Storage Events

### Storage Change Detection

```tsx
import { useEffect } from 'react';

function StorageListener() {
  const { hasStoredData } = useAdaptiveUI();
  
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed:', hasStoredData());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [hasStoredData]);
  
  return null;
}
```

### Custom Storage Events

```tsx
function CustomStorageEvents() {
  const { saveToStorage, loadFromStorage } = useAdaptiveUI();
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToStorage();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveToStorage]);
  
  return null;
}
```

## 🛡️ Error Handling

### Storage Errors

```tsx
function StorageErrorHandler() {
  const { saveToStorage, loadFromStorage } = useAdaptiveUI();
  
  const handleSave = async () => {
    try {
      const success = saveToStorage();
      if (!success) {
        console.error('Failed to save to storage');
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  };
  
  const handleLoad = async () => {
    try {
      const state = loadFromStorage();
      if (!state) {
        console.log('No stored state found');
      }
    } catch (error) {
      console.error('Load error:', error);
    }
  };
  
  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
    </div>
  );
}
```

### Storage Quota Management

```tsx
function StorageQuotaManager() {
  const { clearStorage } = useAdaptiveUI();
  
  const checkStorageQuota = () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then((estimate) => {
        const used = estimate.usage || 0;
        const quota = estimate.quota || 0;
        const percentage = (used / quota) * 100;
        
        if (percentage > 80) {
          console.warn('Storage quota nearly full');
          // Optionally clear old data
          clearStorage();
        }
      });
    }
  };
  
  return (
    <button onClick={checkStorageQuota}>
      Check Storage Quota
    </button>
  );
}
```

## 🔍 Debugging

### Storage Debug Information

```tsx
function StorageDebug() {
  const { hasStoredData } = useAdaptiveUI();
  
  const getStorageInfo = () => {
    const key = 'adaptly-ui_1.0.0'; // Your storage key
    const data = localStorage.getItem(key);
    
    if (data) {
      const parsed = JSON.parse(data);
      return {
        timestamp: new Date(parsed.timestamp),
        version: parsed.version,
        size: data.length
      };
    }
    
    return null;
  };
  
  const info = getStorageInfo();
  
  return (
    <div>
      <h3>Storage Debug Info</h3>
      <p>Has data: {hasStoredData() ? 'Yes' : 'No'}</p>
      {info && (
        <div>
          <p>Last saved: {info.timestamp.toLocaleString()}</p>
          <p>Version: {info.version}</p>
          <p>Size: {info.size} bytes</p>
        </div>
      )}
    </div>
  );
}
```

## 🚀 Best Practices

### 1. Version Management

```tsx
// Always specify version for compatibility
<AdaptlyProvider
  storageVersion="1.0.0" // Increment for breaking changes
  // ... other props
/>
```

### 2. Storage Cleanup

```tsx
// Clean up old storage on app initialization
useEffect(() => {
  const currentVersion = "2.0.0";
  const storedVersion = localStorage.getItem('adaptly-ui_version');
  
  if (storedVersion && storedVersion !== currentVersion) {
    localStorage.removeItem('adaptly-ui_1.0.0'); // Remove old data
    localStorage.setItem('adaptly-ui_version', currentVersion);
  }
}, []);
```

### 3. Error Recovery

```tsx
function StorageRecovery() {
  const { loadFromStorage, clearStorage } = useAdaptiveUI();
  
  const handleRecovery = () => {
    try {
      const state = loadFromStorage();
      if (!state) {
        console.log('No backup state available');
        return;
      }
      
      // Validate state before applying
      if (state.components && Array.isArray(state.components)) {
        console.log('Recovery successful');
      } else {
        console.log('Invalid state, clearing storage');
        clearStorage();
      }
    } catch (error) {
      console.error('Recovery failed:', error);
      clearStorage();
    }
  };
  
  return <button onClick={handleRecovery}>Recover State</button>;
}
```

## 📊 Performance Considerations

### Storage Size Limits

- localStorage typically has a 5-10MB limit
- Large UI states may impact performance
- Consider implementing storage cleanup for large applications

### Optimization Tips

```tsx
// Optimize storage by only saving essential data
const optimizedState = {
  components: state.components.map(comp => ({
    id: comp.id,
    type: comp.type,
    props: comp.props,
    position: comp.position,
    visible: comp.visible
    // Remove unnecessary data
  })),
  layout: state.layout,
  spacing: state.spacing,
  columns: state.columns
};
```

## 🔧 Troubleshooting

### Common Issues

1. **Storage Not Working**
   - Check if `enableStorage={true}` is set
   - Verify localStorage is available in your environment
   - Check browser storage permissions

2. **Version Conflicts**
   - Ensure `storageVersion` is consistent
   - Clear storage when upgrading versions
   - Check for typos in version strings

3. **Data Loss**
   - Implement backup strategies
   - Use error handling for storage operations
   - Consider implementing cloud sync for critical data

### Debug Commands

```tsx
// Check storage status
console.log('Storage available:', 'localStorage' in window);
console.log('Has data:', hasStoredData());

// Inspect stored data
const data = localStorage.getItem('adaptly-ui_1.0.0');
console.log('Stored data:', JSON.parse(data || '{}'));
```

## 📚 Additional Resources

- [localStorage MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Storage Quota API](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager)
- [React Context Documentation](https://react.dev/reference/react/createContext)
