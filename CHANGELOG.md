# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-19

### 🚀 Major Features Added

#### Multiple LLM Provider Support

- **OpenAI GPT-4 Integration**: Full support for OpenAI's GPT-4 and GPT-3.5 models
- **Anthropic Claude Integration**: Support for Claude 3.5 Sonnet and Claude 3 Opus
- **Google Gemini Support**: Enhanced support for Gemini 2.0 Flash and other models
- **Dynamic Provider Switching**: Runtime switching between different LLM providers
- **Provider-Specific Configuration**: Tailored settings for each AI provider

#### Persistent Storage System

- **Automatic State Persistence**: UI state automatically saved to localStorage
- **Cross-Session Persistence**: State survives page refreshes and browser restarts
- **Version Control**: Storage includes version checking to prevent conflicts
- **Manual Storage Controls**: Access storage methods through `useAdaptiveUI` hook
- **Storage Status Monitoring**: Real-time status indicators and controls

#### Enhanced Configuration

- **Children Support**: AdaptlyProvider now accepts children components
- **Storage Configuration**: Flexible storage settings with custom keys and versions
- **Provider Selection**: Easy switching between LLM providers
- **Advanced LLM Settings**: Custom temperature, max tokens, and provider-specific options

### 🔧 API Changes

#### New Props for AdaptlyProvider

```tsx
<AdaptlyProvider
  provider="openai" // NEW: LLM provider selection
  enableStorage={true} // NEW: Enable persistent storage
  storageKey="my-app-ui" // NEW: Custom storage key
  storageVersion="1.0.0" // NEW: Version control
  children={<MyComponent />} // NEW: Children support
/>
```

#### New useAdaptiveUI Methods

```tsx
const {
  saveToStorage, // NEW: Manual save
  loadFromStorage, // NEW: Manual load
  clearStorage, // NEW: Clear storage
  hasStoredData, // NEW: Check storage status
  currentLLMProvider // NEW: Get current provider
} = useAdaptiveUI();
```

#### Enhanced LLMConfig Type

```tsx
interface LLMConfig {
  provider: "google" | "openai" | "anthropic"; // NEW: Required field
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}
```

### 📦 New Dependencies

- `@ai-sdk/openai`: OpenAI integration
- `@ai-sdk/anthropic`: Anthropic integration
- Enhanced `@ai-sdk/google`: Improved Google integration

### 🏗️ New Services

#### EnhancedLLMService

- Multi-provider LLM service supporting all three providers
- Provider-specific initialization and configuration
- Enhanced error handling and logging
- Backward compatibility with existing Google integration

#### StorageService

- localStorage management with version control
- Automatic save/restore functionality
- Manual storage controls
- Storage status monitoring and debugging

### 🎯 Enhanced Demo Application

- **LLM Provider Selector**: Real-time switching between providers
- **Storage Demo Panel**: Interactive storage controls and status
- **API Key Status**: Real-time monitoring of API key availability
- **Provider-Specific Instructions**: Tailored guidance for each provider
- **Environment Variable Guidance**: Helpful setup instructions

### 📚 Documentation Updates

- **Migration Guide**: Comprehensive v1.x to v2.0 migration guide
- **LLM Providers Documentation**: Detailed provider configuration guide
- **Storage Service Documentation**: Complete storage service documentation
- **Updated README**: Enhanced with new features and examples
- **API Documentation**: Updated with new methods and types

### 🔄 Breaking Changes

- `LLMConfig` now requires a `provider` field
- `AdaptlyProvider` now supports `children` prop
- Storage is enabled by default in new configurations
- Some internal APIs have changed (but public APIs remain compatible)

### 🐛 Bug Fixes

- Fixed context provider issues with `useAdaptiveUI` hook
- Resolved storage initialization timing issues
- Fixed provider switching edge cases
- Improved error handling for missing API keys

### 🚀 Performance Improvements

- Automatic storage reduces need for manual state management
- Enhanced LLM service with better error handling
- Improved logging and debugging capabilities
- Optimized storage operations

### 🧪 Testing

- Added comprehensive tests for new storage functionality
- Provider switching integration tests
- Storage version compatibility tests
- Enhanced error handling tests

## [1.0.0] - 2024-12-15

### 🎉 Initial Release

- **AI-Driven UI Generation**: Natural language to UI transformation
- **Google Gemini Integration**: Primary LLM provider support
- **Component Registry System**: JSON-based component configuration
- **Adaptive Layout Engine**: Dynamic Tailwind grid system
- **Command Interface**: ⌘K command bar for natural language input
- **Accessibility Features**: Color and text adaptation
- **Next.js Integration**: Seamless App Router support
- **TypeScript Support**: Full type safety and IntelliSense
- **shadcn/ui Integration**: Beautiful command interface
- **Comprehensive Documentation**: Complete developer documentation

### 🏗️ Core Architecture

- **AdaptlyProvider**: Main provider component
- **AdaptiveLayout**: Dynamic layout rendering
- **AdaptiveCommand**: Command interface
- **CoreLLMService**: Google Gemini integration
- **RegistryService**: Component management
- **LoadingOverlay**: User feedback system

### 📦 Dependencies

- React 19+ and Next.js 15+ support
- TypeScript 5.9+ for type safety
- Tailwind CSS for styling
- shadcn/ui components
- Google Gemini AI SDK
- Lucide React icons
- Rollup for packaging

### 🎯 Key Features

- Natural language UI generation
- Component registry system
- Adaptive layout engine
- Command interface (⌘K)
- Accessibility adaptations
- Real-time UI updates
- Developer-friendly API

---

## Migration Notes

### From v1.x to v2.0

1. **Update AdaptlyProvider props**:

   ```tsx
   // Before
   <AdaptlyProvider apiKey="key" model="gemini-2.0-flash-exp" />
   
   // After
   <AdaptlyProvider 
     apiKey="key" 
     provider="google" 
     model="gemini-2.0-flash-exp"
     enableStorage={true}
   />
   ```

2. **Access new storage methods**:

   ```tsx
   const { saveToStorage, loadFromStorage, clearStorage } = useAdaptiveUI();
   ```

3. **Environment variables for different providers**:

   ```bash
   # Google (existing)
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your-key
   
   # OpenAI (new)
   NEXT_PUBLIC_OPENAI_API_KEY=your-key
   
   # Anthropic (new)
   NEXT_PUBLIC_ANTHROPIC_API_KEY=your-key
   ```

## Support

For questions about migration or new features:

- 📖 [Migration Guide](./MIGRATION_GUIDE.md)
- 📚 [Documentation](./docs/README.md)
- 🐛 [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- 💬 [Discussions](https://github.com/gauravfs-14/adaptly/discussions)
