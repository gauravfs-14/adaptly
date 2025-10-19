---
sidebar_position: 7
title: Troubleshooting
description: Common issues, error messages, and solutions for Adaptly
---

# Troubleshooting Guide

This guide covers common issues you might encounter when using Adaptly, along with solutions and debugging tips.

## API Key Issues

### "API key is required" Error

**Problem**: Adaptly shows "API key is required" error message.

**Causes**:

- Environment variable not set
- API key not provided to AdaptlyProvider
- Environment variable name mismatch

**Solutions**:

1. **Check environment variable name**:

   ```bash
   # .env.local
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

2. **Verify API key format**:
   - Google: Starts with `AIza...`
   - OpenAI: Starts with `sk-...`
   - Anthropic: Starts with `sk-ant-...`

3. **Restart development server**:

   ```bash
   npm run dev
   ```

4. **Check API key in code**:

   ```tsx
   console.log("API key:", process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY);
   ```

### "Invalid API key" Error

**Problem**: API key is provided but marked as invalid.

**Solutions**:

1. **Verify key is correct**:
   - Check for typos
   - Ensure key is complete
   - Verify key hasn't expired

2. **Check provider-specific requirements**:
   - Google: Get key from [Google AI Studio](https://aistudio.google.com/)
   - OpenAI: Get key from [OpenAI Platform](https://platform.openai.com/)
   - Anthropic: Get key from [Anthropic Console](https://console.anthropic.com/)

3. **Test key independently**:

   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" https://api.openai.com/v1/models
   ```

### "Rate limit exceeded" Error

**Problem**: API requests are being rate limited.

**Solutions**:

1. **Wait before retrying**:
   - Google: 15 requests/minute (free tier)
   - OpenAI: Varies by model and tier
   - Anthropic: 5 requests/minute (free tier)

2. **Upgrade API plan**:
   - Check your provider's pricing
   - Consider upgrading for higher limits

3. **Switch providers temporarily**:

   ```tsx
   // Use different provider
   <AdaptlyProvider
     apiKey={process.env.NEXT_PUBLIC_OPENAI_API_KEY!}
     provider="openai"
     model="gpt-4o-mini"
     // ... other props
   />
   ```

## Component Issues

### "Component not found" Error

**Problem**: AI tries to use a component that doesn't exist.

**Causes**:

- Component not registered in `components` prop
- Component name mismatch between `adaptly.json` and component registry
- Component not exported properly

**Solutions**:

1. **Check component registration**:

   ```tsx
   // ✅ Correct
   <AdaptlyProvider
     components={{ MetricCard, SalesChart, TeamMembers }}
     // ... other props
   />
   
   // ❌ Missing component
   <AdaptlyProvider
     components={{ MetricCard }} // Missing SalesChart
     // ... other props
   />
   ```

2. **Verify component names match**:

   ```json
   // adaptly.json
   {
     "components": {
       "MetricCard": { /* ... */ }  // Must match component name
     }
   }
   ```

3. **Check component exports**:

   ```tsx
   // ✅ Correct export
   export function MetricCard(props) { /* ... */ }
   
   // ❌ Wrong export
   export default function MetricCard(props) { /* ... */ }
   ```

### Component Not Rendering

**Problem**: Component is registered but not appearing in UI.

**Causes**:

- Component validation failed
- Invalid props passed to component
- Component position outside grid bounds

**Solutions**:

1. **Check component validation**:

   ```tsx
   // Enable debug logging
   import { adaptlyLogger } from "adaptly";
   adaptlyLogger.setConfig({ enabled: true, level: "debug" });
   ```

2. **Verify component props**:

   ```tsx
   // Check if props match adaptly.json schema
   const component = {
     id: "metric-1",
     type: "MetricCard",
     props: {
       title: "Revenue",    // Required
       value: "$45,231"    // Required
     },
     position: { x: 0, y: 0, w: 2, h: 1 },
     visible: true
   };
   ```

3. **Check grid bounds**:

   ```tsx
   // Ensure position is within grid
   position: { x: 0, y: 0, w: 2, h: 1 } // Within 6x6 grid
   ```

### Component Validation Errors

**Problem**: Components are filtered out during validation.

**Common validation failures**:

1. **Missing required props**:

   ```json
   // adaptly.json
   {
     "props": {
       "title": { "type": "string", "required": true },
       "value": { "type": "string", "required": true }
     }
   }
   ```

   ```tsx
   // ❌ Missing required props
   const component = {
     type: "MetricCard",
     props: { title: "Revenue" } // Missing value
   };
   
   // ✅ All required props
   const component = {
     type: "MetricCard",
     props: { title: "Revenue", value: "$45,231" }
   };
   ```

2. **Invalid prop types**:

   ```json
   // adaptly.json
   {
     "props": {
       "progress": { "type": "number", "required": false }
     }
   }
   ```

   ```tsx
   // ❌ Wrong type
   const component = {
     type: "MetricCard",
     props: { progress: "75%" } // Should be number
   };
   
   // ✅ Correct type
   const component = {
     type: "MetricCard",
     props: { progress: 75 }
   };
   ```

3. **Invalid allowed values**:

   ```json
   // adaptly.json
   {
     "props": {
       "changeType": { 
         "type": "string", 
         "allowed": ["positive", "negative", "neutral"] 
       }
     }
   }
   ```

   ```tsx
   // ❌ Invalid value
   const component = {
     type: "MetricCard",
     props: { changeType: "good" } // Not in allowed list
   };
   
   // ✅ Valid value
   const component = {
     type: "MetricCard",
     props: { changeType: "positive" }
   };
   ```

## Storage Issues

### Storage Not Persisting

**Problem**: UI changes are not saved between sessions.

**Causes**:

- Storage disabled
- localStorage not available
- Storage key issues

**Solutions**:

1. **Check storage configuration**:

   ```tsx
   <AdaptlyProvider
     enableStorage={true}        // Must be true
     storageKey="my-app"        // Must be set
     storageVersion="1.0.0"     // Must be set
     // ... other props
   />
   ```

2. **Check localStorage availability**:

   ```tsx
   if (typeof window !== "undefined" && window.localStorage) {
     console.log("localStorage is available");
   } else {
     console.log("localStorage not available");
   }
   ```

3. **Check storage key**:

   ```tsx
   // Check what's stored
   const storageKey = "my-app_1.0.0";
   const stored = localStorage.getItem(storageKey);
   console.log("Stored data:", stored);
   ```

### Version Mismatch

**Problem**: "Stored adaptation version doesn't match current version" warning.

**Causes**:

- Storage version changed
- Data migration needed

**Solutions**:

1. **Update storage version**:

   ```tsx
   // Old version
   <AdaptlyProvider storageVersion="1.0.0" />
   
   // New version - old data cleared automatically
   <AdaptlyProvider storageVersion="2.0.0" />
   ```

2. **Manual data migration**:

   ```tsx
   const { loadFromStorage, clearStorage } = useAdaptiveUI();
   
   const migrateData = () => {
     const oldData = loadFromStorage();
     if (oldData) {
       // Transform old data to new format
       const newData = transformData(oldData);
       // Save new data
       updateAdaptation(newData);
       // Clear old data
       clearStorage();
     }
   };
   ```

### Storage Quota Exceeded

**Problem**: "Storage quota exceeded" error.

**Solutions**:

1. **Clear old data**:

   ```tsx
   const { clearStorage } = useAdaptiveUI();
   clearStorage();
   ```

2. **Use smaller storage keys**:

   ```tsx
   // ✅ Smaller key
   <AdaptlyProvider storageKey="ui" />
   
   // ❌ Large key
   <AdaptlyProvider storageKey="my-very-long-application-name-ui" />
   ```

3. **Implement data compression**:

   ```tsx
   // Compress data before storing
   const compressed = JSON.stringify(adaptation);
   localStorage.setItem(storageKey, compressed);
   ```

## LLM Issues

### LLM Not Responding

**Problem**: AI commands are not being processed.

**Causes**:

- API key issues
- Network connectivity
- Model availability
- Rate limiting

**Solutions**:

1. **Check API key**:

   ```tsx
   console.log("API key:", process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY);
   ```

2. **Check network connectivity**:

   ```tsx
   // Test API connectivity
   fetch("https://generativelanguage.googleapis.com/v1beta/models")
     .then(response => console.log("Google API accessible:", response.ok))
     .catch(error => console.error("Network error:", error));
   ```

3. **Check model availability**:

   ```tsx
   // Try different model
   <AdaptlyProvider
     model="gemini-1.5-flash"  // Instead of gemini-2.0-flash-exp
     // ... other props
   />
   ```

4. **Check rate limits**:

   ```tsx
   const { isLLMProcessing } = useAdaptiveUI();
   
   if (isLLMProcessing) {
     console.log("LLM is processing, please wait");
   }
   ```

### Poor AI Responses

**Problem**: AI generates irrelevant or incorrect components.

**Solutions**:

1. **Improve adaptly.json descriptions**:

   ```json
   // ✅ Good description
   {
     "description": "Display key performance indicators with values, trends, and progress bars",
     "useCases": ["revenue tracking", "user metrics", "performance indicators"]
   }
   
   // ❌ Poor description
   {
     "description": "Shows data",
     "useCases": ["metrics"]
   }
   ```

2. **Add more use cases**:

   ```json
   {
     "useCases": [
       "revenue tracking",
       "user metrics", 
       "performance indicators",
       "KPI display",
       "sales data",
       "analytics overview"
     ]
   }
   ```

3. **Use more specific prompts**:

   ```tsx
   // ✅ Specific prompt
   await parseUserInputWithLLM("Create a sales dashboard with revenue metrics and user growth charts");
   
   // ❌ Vague prompt
   await parseUserInputWithLLM("Make a dashboard");
   ```

## Build and Deployment Issues

### Next.js Build Errors

**Problem**: Build fails with Adaptly-related errors.

**Solutions**:

1. **Check React version compatibility**:

   ```json
   // package.json
   {
     "dependencies": {
       "react": "^19.0.0",
       "react-dom": "^19.0.0"
     }
   }
   ```

2. **Check TypeScript configuration**:

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2020",
       "lib": ["DOM", "DOM.Iterable", "ES6"],
       "allowJs": true,
       "skipLibCheck": true,
       "strict": true,
       "forceConsistentCasingInFileNames": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "plugins": [
         {
           "name": "next"
         }
       ]
     }
   }
   ```

3. **Check environment variables**:

   ```bash
   # .env.local
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

### React 19 Compatibility

**Problem**: Issues with React 19 and Next.js 15+.

**Solutions**:

1. **Update to latest Adaptly version**:

   ```bash
   npm install adaptly@latest
   ```

2. **Check peer dependencies**:

   ```bash
   npm ls react react-dom
   ```

3. **Use proper React 19 patterns**:

   ```tsx
   // ✅ Correct for React 19
   "use client";
   
   import { AdaptlyProvider } from "adaptly";
   
   export default function App() {
     return (
       <AdaptlyProvider
         apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
         components={components}
         adaptlyConfig={adaptlyConfig}
       />
     );
   }
   ```

## Debugging Tips

### Enable Debug Logging

```tsx
import { adaptlyLogger } from "adaptly";

// Enable debug logging
adaptlyLogger.setConfig({ enabled: true, level: "debug" });
```

### Check Component Registry

```tsx
const { adaptation } = useAdaptiveUI();

console.log("Current components:", adaptation.components);
console.log("Layout:", adaptation.layout);
console.log("Grid columns:", adaptation.columns);
```

### Check Storage Contents

```tsx
const storageKey = "my-app_1.0.0";
const stored = localStorage.getItem(storageKey);
console.log("Stored data:", JSON.parse(stored));
```

### Check LLM Processing

```tsx
const { isLLMProcessing, lastLLMResponse } = useAdaptiveUI();

console.log("Processing:", isLLMProcessing);
console.log("Last response:", lastLLMResponse);
```

### Check Provider Status

```tsx
const { currentLLMProvider } = useAdaptiveUI();

console.log("Current provider:", currentLLMProvider);
```

## Common Error Messages

### "adaptly.json must define at least one component"

**Solution**: Ensure your `adaptly.json` has at least one component defined.

### "Component 'MetricCard' must have a description"

**Solution**: Add description to component in `adaptly.json`.

### "No components defined in adaptly.json configuration"

**Solution**: Check that `adaptlyConfig` prop is passed correctly.

### "LLM service not initialized"

**Solution**: Check API key and provider configuration.

### "Storage not available or disabled"

**Solution**: Check `enableStorage` prop and localStorage availability.

## Getting Help

### GitHub Issues

- **[Report bugs](https://github.com/gauravfs-14/adaptly/issues)**
- **[Request features](https://github.com/gauravfs-14/adaptly/issues)**
- **[Ask questions](https://github.com/gauravfs-14/adaptly/discussions)**

### Documentation

- **[Quick Start Guide](quick-start)** - Basic setup
- **[Component Registry Guide](component-registry)** - Configuration
- **[API Reference](api/core-components)** - Complete API docs

### Community

- **[GitHub Discussions](https://github.com/gauravfs-14/adaptly/discussions)**
- **[NPM Package](https://www.npmjs.com/package/adaptly)**

## Related Documentation

- **[Quick Start Guide](quick-start)** - Basic setup and troubleshooting
- **[Component Registry Guide](component-registry)** - Configuration issues
- **[LLM Providers Guide](llm-providers)** - API key and provider issues
- **[Storage Service Guide](storage-service)** - Persistence issues
- **[Advanced Features Guide](advanced-features)** - Advanced troubleshooting

---

**Still having issues?** Check out our [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues) or [Discussions](https://github.com/gauravfs-14/adaptly/discussions) for community support!
