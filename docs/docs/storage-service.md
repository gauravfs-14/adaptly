---
sidebar_position: 5
title: Storage Service
description: Configure persistent state management with localStorage in Adaptly
---

# Storage Service Guide

Adaptly automatically saves and restores your UI state across browser sessions using localStorage. This guide covers how to configure, customize, and manage persistent storage in your Adaptly applications.

## How Storage Works

Adaptly's storage service automatically:

- **Saves** UI changes when components are added, removed, or updated
- **Loads** saved state when the application starts
- **Validates** stored data against current version
- **Migrates** data when version changes

## Basic Configuration

### Enable Storage

Storage is enabled by default, but you can configure it explicitly:

```tsx
<AdaptlyProvider
  apiKey={apiKey}
  provider="google"
  model="gemini-2.0-flash-exp"
  components={components}
  adaptlyConfig={adaptlyConfig}
  enableStorage={true}
  storageKey="my-dashboard"
  storageVersion="1.0.0"
/>
```

### Storage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableStorage` | `boolean` | `true` | Enable/disable storage |
| `storageKey` | `string` | `"adaptly-ui"` | Key prefix for localStorage |
| `storageVersion` | `string` | `"1.0.0"` | Version for data migration |

## Storage Key Naming

Adaptly creates storage keys using the pattern: `{storageKey}_{storageVersion}`

```tsx
// Example configurations
storageKey="my-dashboard"     // → "my-dashboard_1.0.0"
storageKey="analytics-app"    // → "analytics-app_1.0.0"
storageKey="user-preferences" // → "user-preferences_1.0.0"
```

## Data Structure

Adaptly stores the complete UI adaptation in localStorage:

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
          "change": "+20.1%"
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

## Version Control

### Automatic Versioning

When you update `storageVersion`, Adaptly automatically:

- Detects version mismatch
- Clears old data
- Starts fresh with new version

```tsx
// Version 1.0.0
<AdaptlyProvider storageVersion="1.0.0" />

// Version 2.0.0 - old data cleared automatically
<AdaptlyProvider storageVersion="2.0.0" />
```

### Manual Version Management

```tsx
// Check if stored data exists
const { hasStoredData } = useAdaptiveUI();

if (hasStoredData()) {
  console.log("Found saved UI state");
} else {
  console.log("No saved state found");
}
```

## Manual Storage Controls

### Save to Storage

```tsx
const { saveToStorage } = useAdaptiveUI();

// Manually save current state
const saved = saveToStorage();
if (saved) {
  console.log("UI state saved successfully");
}
```

### Load from Storage

```tsx
const { loadFromStorage } = useAdaptiveUI();

// Manually load saved state
const savedState = loadFromStorage();
if (savedState) {
  console.log("Loaded saved state:", savedState);
}
```

### Clear Storage

```tsx
const { clearStorage } = useAdaptiveUI();

// Clear all saved data
const cleared = clearStorage();
if (cleared) {
  console.log("Storage cleared successfully");
}
```

### Check Storage Status

```tsx
const { hasStoredData } = useAdaptiveUI();

// Check if data exists
if (hasStoredData()) {
  console.log("Storage contains saved data");
} else {
  console.log("Storage is empty");
}
```

## Advanced Storage Patterns

### Multiple Storage Keys

Use different storage keys for different parts of your app:

```tsx
// Dashboard storage
<AdaptlyProvider
  storageKey="dashboard-ui"
  storageVersion="1.0.0"
  // ... other props
/>

// Analytics storage
<AdaptlyProvider
  storageKey="analytics-ui"
  storageVersion="1.0.0"
  // ... other props
/>
```

### Conditional Storage

```tsx
const [enableStorage, setEnableStorage] = useState(true);

<AdaptlyProvider
  enableStorage={enableStorage}
  storageKey="my-app"
  // ... other props
/>

// Toggle storage on/off
<button onClick={() => setEnableStorage(!enableStorage)}>
  {enableStorage ? "Disable" : "Enable"} Storage
</button>
```

### Storage with User Authentication

```tsx
const [userId, setUserId] = useState(null);

<AdaptlyProvider
  storageKey={userId ? `user-${userId}-ui` : "guest-ui"}
  storageVersion="1.0.0"
  // ... other props
/>
```

## Browser Compatibility

### Supported Browsers

- **Chrome**: 4+ (localStorage support)
- **Firefox**: 3.5+ (localStorage support)
- **Safari**: 4+ (localStorage support)
- **Edge**: 12+ (localStorage support)

### Storage Limits

- **Chrome/Firefox**: ~10MB per domain
- **Safari**: ~5MB per domain
- **Mobile**: Varies by device

### Fallback Behavior

If localStorage is not available, Adaptly gracefully degrades:

```tsx
// Storage will be disabled automatically
<AdaptlyProvider
  enableStorage={true} // Will be ignored if localStorage unavailable
  // ... other props
/>
```

## Privacy Considerations

### Data Storage

- Data is stored locally in the user's browser
- No data is sent to external servers
- Users can clear data through browser settings

### Sensitive Data

Avoid storing sensitive information in component props:

```tsx
// ❌ Don't store sensitive data
<MetricCard
  title="User Revenue"
  value="$45,231"
  apiKey="secret-key" // ❌ Never store API keys
/>

// ✅ Store only display data
<MetricCard
  title="User Revenue"
  value="$45,231"
  change="+20.1%"
/>
```

### Data Retention

- Data persists until manually cleared
- Users can clear data through browser settings
- Consider implementing data expiration

## Debugging Storage

### Enable Debug Logging

```tsx
import { adaptlyLogger } from "adaptly";

// Enable debug logging
adaptlyLogger.setConfig({ enabled: true, level: "debug" });
```

### Check Storage Contents

```tsx
// Inspect localStorage directly
const storageKey = "my-dashboard_1.0.0";
const storedData = localStorage.getItem(storageKey);
console.log("Stored data:", JSON.parse(storedData));
```

### Storage Events

```tsx
// Listen for storage changes
window.addEventListener("storage", (e) => {
  if (e.key === "my-dashboard_1.0.0") {
    console.log("Storage changed:", e.newValue);
  }
});
```

## Common Issues

### Storage Not Persisting

**Check enableStorage prop:**

```tsx
// ✅ Storage enabled
<AdaptlyProvider enableStorage={true} />

// ❌ Storage disabled
<AdaptlyProvider enableStorage={false} />
```

**Check storage key:**

```tsx
// ✅ Valid key
<AdaptlyProvider storageKey="my-app" />

// ❌ Empty key
<AdaptlyProvider storageKey="" />
```

### Version Mismatch

**Update storage version:**

```tsx
// Old version
<AdaptlyProvider storageVersion="1.0.0" />

// New version - old data cleared
<AdaptlyProvider storageVersion="2.0.0" />
```

### Data Not Loading

**Check localStorage availability:**

```tsx
if (typeof window !== "undefined" && window.localStorage) {
  // localStorage is available
} else {
  // localStorage not available
}
```

## Best Practices

### 1. Use Descriptive Storage Keys

```tsx
// ✅ Good
storageKey="dashboard-ui"
storageKey="analytics-dashboard"
storageKey="user-preferences"

// ❌ Avoid
storageKey="ui"
storageKey="data"
storageKey="app"
```

### 2. Version Your Storage

```tsx
// ✅ Good - versioned
storageVersion="1.0.0"
storageVersion="2.0.0"

// ❌ Avoid - no versioning
storageVersion="1"
storageVersion="latest"
```

### 3. Handle Storage Errors

```tsx
try {
  const saved = saveToStorage();
  if (!saved) {
    console.warn("Failed to save UI state");
  }
} catch (error) {
  console.error("Storage error:", error);
}
```

### 4. Clean Up Old Data

```tsx
// Clear old storage keys
const oldKeys = ["my-app_1.0.0", "my-app_1.1.0"];
oldKeys.forEach(key => localStorage.removeItem(key));
```

## Next Steps

- **[Advanced Features Guide](advanced-features)** - Custom loaders and validation
- **[API Reference](api/core-components)** - Complete component documentation
- **[Troubleshooting Guide](troubleshooting)** - Common issues and solutions

## Example Implementations

- **[Demo App](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo)** - Full storage implementation
- **[Component Examples](https://github.com/gauravfs-14/adaptly/tree/main/examples/adaptly-demo/src/components)** - Real React components

---

**Ready for advanced features?** Check out the [Advanced Features Guide](advanced-features) to learn about custom loaders, component validation, and advanced hooks usage!
