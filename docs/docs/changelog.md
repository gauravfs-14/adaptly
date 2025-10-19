---
sidebar_position: 4
title: Changelog
description: All notable changes to Adaptly will be documented in this file
---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - December 19, 2024

### 🔧 Critical Bug Fixes

#### React Peer Dependency Resolution

- **Fixed React Version Conflicts**: Resolved "mismatching versions of React and the renderer" errors
- **Eliminated Duplicate React Instances**: Fixed "more than one copy of React" issues
- **Next.js 15+ Compatibility**: Full support for Next.js 15.5.6 and React 19.2.0
- **Proper React Externalization**: React is now properly externalized instead of bundled
- **Peer Dependency Updates**: Updated peer dependencies to support React >=18.0.0 (compatible with React 19+)

#### Build System Improvements

- **Enhanced Rollup Configuration**: Added explicit React externalization for both CJS and ESM builds
- **Node.js Engine Requirements**: Added Node.js >=18.0.0 engine requirements
- **Package Structure**: Improved package.json with proper peer dependency metadata
- **Build Reliability**: Eliminated all React bundling issues

### 📦 Technical Details

- **React Externalization**: React and React-DOM are now properly externalized in all builds
- **Peer Dependency Support**: Compatible with React 18+ and 19+
- **Next.js 15+ Support**: Full compatibility with latest Next.js versions
- **No Version Conflicts**: Eliminated all React version mismatch errors
- **Clean Installation**: No more peer dependency warnings during installation

### 🎯 Key Improvements

- **Seamless Installation**: Package installs without peer dependency errors
- **Latest Framework Support**: Works with Next.js 15+ and React 19+
- **Version Flexibility**: Compatible with React 18+ and 19+
- **No Duplicate Dependencies**: Single React instance per application
- **Enhanced Developer Experience**: Smooth installation and usage

## [0.0.4] - October 19, 2025

### 🔧 Bug Fixes

#### Package Dependencies

- **Removed Peer Dependencies**: Eliminated React and React-DOM peer dependencies to resolve build issues
- **Simplified Installation**: No longer requires manual peer dependency installation
- **Build Process**: Fixed dependency resolution errors during package building
- **Rollup Configuration**: Enhanced with `rollup-plugin-peer-deps-external` for automatic peer dependency handling

#### Documentation Improvements

- **Consolidated Guides**: Merged similar installation and quick-start documentation
- **Reduced Duplication**: Eliminated repetitive content across documentation files
- **Streamlined Structure**: Improved documentation organization and navigation
- **Version Consistency**: Updated all version references to v0.0.4

### 📦 Technical Details

- **Package Configuration**: Removed peer dependencies from package.json
- **Build System**: Enhanced Rollup configuration with peer dependency plugin
- **Documentation**: Consolidated installation and quick-start guides
- **Version Update**: Package version updated to v0.0.4

### 🎯 Key Improvements

- **Simplified Installation**: No more peer dependency warnings or manual installation steps
- **Better Build Process**: Automatic peer dependency handling during build
- **Cleaner Documentation**: Reduced duplication and improved navigation
- **Enhanced Developer Experience**: Streamlined setup process

## [0.0.3] - October 19, 2025

### 🔧 Bug Fixes

#### Rollup Build Configuration

- **Peer Dependencies Resolution**: Added `rollup-plugin-peer-deps-external` for proper peer dependency handling
- **Build Process**: Fixed dependency resolution errors with React and React-DOM peer dependencies
- **Automatic Externalization**: Peer dependencies are now automatically externalized based on `package.json` configuration
- **Cleaner Builds**: Removed manual external dependency declarations in favor of automatic detection

#### Build Improvements

- **Enhanced Rollup Config**: Updated Rollup configuration to use peer dependencies plugin
- **Dependency Management**: Improved handling of peer dependencies in both CJS and ESM builds
- **Build Reliability**: Eliminated dependency resolution errors during package building
- **Future-Proof**: Automatic handling of any new peer dependencies added to the project

### 📦 Technical Details

- **Plugin Integration**: Added `rollup-plugin-peer-deps-external` to build pipeline
- **Automatic Detection**: Build system now automatically detects and externalizes peer dependencies
- **Version Update**: Package version updated to v0.0.3
- **Build Process**: Enhanced build process for better dependency resolution

## [0.0.2] - October 19, 2025

### 🚀 New Features

#### Enhanced Documentation

- **Updated README**: Comprehensive documentation with improved examples and API reference
- **Version Information**: Updated package version to v0.0.2 across all documentation
- **Installation Guide**: Enhanced installation instructions with peer dependencies
- **API Documentation**: Complete TypeScript interfaces and service documentation

#### Improved Package Configuration

- **Version Bump**: Updated from v0.0.1 to v0.0.2
- **Dependency Updates**: Latest versions of all AI SDK packages
- **TypeScript Support**: Enhanced type definitions and IntelliSense support

### 📚 Documentation Updates

- **Core Library README**: Updated with comprehensive feature overview
- **API Reference**: Complete documentation of all hooks, services, and types
- **Installation Guide**: Step-by-step setup instructions
- **Component Registry**: Detailed adaptly.json configuration guide
- **LLM Providers**: Multi-provider setup and configuration
- **Storage Service**: Persistent state management documentation

### 🔧 Package Improvements

- **Version Alignment**: All documentation now reflects v0.0.2
- **Dependency Management**: Updated peer dependencies and dev dependencies
- **Build Configuration**: Enhanced Rollup configuration for better bundling
- **TypeScript Support**: Improved type safety and developer experience

### 🎯 Key Highlights

- **Multi-LLM Support**: Google Gemini, OpenAI GPT, Anthropic Claude
- **Built-in Command Interface**: ⌘K command bar with AI suggestions
- **Persistent Storage**: Automatic state management with version control
- **Component Registry**: JSON-based component configuration
- **TypeScript First**: Full type safety and IntelliSense support

## [1.0.0] - October 19, 2025

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

- 📚 [Documentation](/docs/intro)
- 🐛 [GitHub Issues](https://github.com/gauravfs-14/adaptly/issues)
- 💬 [Discussions](https://github.com/gauravfs-14/adaptly/discussions)
