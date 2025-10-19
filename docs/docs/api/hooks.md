---
sidebar_position: 2
title: Hooks API
description: React hooks for Adaptly components and state management
---

# Hooks API

Adaptly provides several React hooks to help you integrate AI-powered adaptive UI components into your React applications.

## useAdaptiveCommand

A hook for managing adaptive command functionality.

```typescript
import { useAdaptiveCommand } from 'adaptly';

function MyComponent() {
  const { 
    executeCommand, 
    isExecuting, 
    lastResult, 
    error 
  } = useAdaptiveCommand();

  const handleCommand = async () => {
    const result = await executeCommand('Create a button with primary styling');
    console.log(result);
  };

  return (
    <button onClick={handleCommand} disabled={isExecuting}>
      {isExecuting ? 'Executing...' : 'Execute Command'}
    </button>
  );
}
```

### Parameters

- `options` (optional): Configuration object
  - `llmProvider`: LLM provider instance
  - `registry`: Component registry
  - `storage`: Storage service instance

### Returns

- `executeCommand`: Function to execute adaptive commands
- `isExecuting`: Boolean indicating if a command is currently executing
- `lastResult`: Result of the last executed command
- `error`: Any error that occurred during command execution

## useAdaptiveGrid

A hook for managing adaptive grid layouts.

```typescript
import { useAdaptiveGrid } from 'adaptly';

function GridComponent() {
  const { 
    gridConfig, 
    updateGrid, 
    addComponent, 
    removeComponent 
  } = useAdaptiveGrid();

  return (
    <div className="adaptive-grid">
      {gridConfig.components.map((component, index) => (
        <div key={index} className="grid-item">
          {/* Render component */}
        </div>
      ))}
    </div>
  );
}
```

### Returns

- `gridConfig`: Current grid configuration
- `updateGrid`: Function to update the entire grid
- `addComponent`: Function to add a new component
- `removeComponent`: Function to remove a component

## useLLMService

A hook for interacting with LLM services.

```typescript
import { useLLMService } from 'adaptly';

function AIComponent() {
  const { 
    generateResponse, 
    isGenerating, 
    lastResponse 
  } = useLLMService();

  const handleGenerate = async () => {
    const response = await generateResponse('Create a login form');
    console.log(response);
  };

  return (
    <button onClick={handleGenerate} disabled={isGenerating}>
      Generate UI
    </button>
  );
}
```

### Returns

- `generateResponse`: Function to generate AI responses
- `isGenerating`: Boolean indicating if generation is in progress
- `lastResponse`: The last generated response

## useStorageService

A hook for managing persistent storage.

```typescript
import { useStorageService } from 'adaptly';

function StorageComponent() {
  const { 
    save, 
    load, 
    remove, 
    clear 
  } = useStorageService();

  const handleSave = () => {
    save('my-key', { data: 'example' });
  };

  const handleLoad = () => {
    const data = load('my-key');
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleSave}>Save Data</button>
      <button onClick={handleLoad}>Load Data</button>
    </div>
  );
}
```

### Returns

- `save`: Function to save data to storage
- `load`: Function to load data from storage
- `remove`: Function to remove data from storage
- `clear`: Function to clear all stored data

## useRegistryService

A hook for managing component registries.

```typescript
import { useRegistryService } from 'adaptly';

function RegistryComponent() {
  const { 
    registerComponent, 
    getComponent, 
    listComponents 
  } = useRegistryService();

  const handleRegister = () => {
    registerComponent('my-component', {
      type: 'button',
      props: { variant: 'primary' }
    });
  };

  return (
    <button onClick={handleRegister}>
      Register Component
    </button>
  );
}
```

### Returns

- `registerComponent`: Function to register a new component
- `getComponent`: Function to retrieve a component by name
- `listComponents`: Function to list all registered components

## Best Practices

1. **Error Handling**: Always wrap hook calls in try-catch blocks
2. **Loading States**: Use the provided loading states for better UX
3. **Cleanup**: Hooks automatically handle cleanup, but be mindful of memory usage
4. **TypeScript**: Use proper typing for better development experience

## Examples

See the [Quick Start Guide](/docs/quick-start) for complete examples of using these hooks in a real application.
