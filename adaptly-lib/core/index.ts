// ============================================================================
// ADAPTLY FRAMEWORK - Main Exports for Developers
// ============================================================================

// 🚀 MAIN COMPONENTS - What developers use most
export { AdaptlyProvider } from "./adaptly-provider"; // Main entry point - requires config
export { AdaptiveLayout } from "./adaptive-grid"; // Renders your components
export { AdaptiveCommand, AdaptiveCommandWrapper } from "./adaptive-command"; // AI command bar

// 🔧 PROVIDER & HOOKS - For advanced usage
export { AdaptiveUIProvider, useAdaptiveUI } from "./adaptive-ui-provider";

// 🎨 UTILITIES - Optional components
export { LoadingOverlay } from "./loading-overlay";
export { RegistryService, registryService } from "./registry-service";
export { CoreLLMService } from "./llm-service";
export { adaptlyLogger } from "./logger";

// 📝 TYPES - For TypeScript support
export * from "./types";
export type { UIComponent, UIAdaptation } from "./adaptive-ui-provider";
export type { ComponentMetadata, ComponentSuggestion } from "./types";
