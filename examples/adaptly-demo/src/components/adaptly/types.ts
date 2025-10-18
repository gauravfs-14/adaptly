// Core types for the Adaptly framework

export interface PropDefinition {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object" | "function";
  description: string;
  required: boolean;
  defaultValue?: any;
  options?: string[]; // For enum-like props
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
  };
  examples?: any[];
  dataSource?: {
    type: "static" | "api" | "filtered" | "computed";
    endpoint?: string;
    filters?: string[];
    transformations?: string[];
  };
}

export interface UIComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}

export interface UIAdaptation {
  components: UIComponent[];
  layout: "grid" | "flex" | "absolute";
  spacing: number;
  columns: number;
}

export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  tags: string[];
  gridRequirements: {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    preferredWidth: number;
    preferredHeight: number;
    aspectRatio: number;
    responsive: {
      mobile: GridRequirements;
      tablet: GridRequirements;
      desktop: GridRequirements;
    };
  };
  props: {
    required: string[];
    optional: string[];
    defaults: Record<string, any>;
    validation: Record<string, string>;
    definitions: PropDefinition[];
  };
  examples: ComponentExample[];
  priority: "high" | "medium" | "low";
}

export interface GridRequirements {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  preferredWidth: number;
  preferredHeight: number;
  aspectRatio: number;
}

export interface ComponentExample {
  name: string;
  description: string;
  props: Record<string, any>;
  gridPosition: { x: number; y: number; w: number; h: number };
  useCase: string;
}

export interface ComponentSuggestion {
  component: ComponentMetadata;
  confidence: number;
  reasoning: string;
  suggestedProps: Record<string, any>;
  suggestedPosition: { x: number; y: number; w: number; h: number };
}

export interface LLMConfig {
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

// Framework-style component registry interface
export interface ComponentRegistry {
  [key: string]: React.ComponentType<any>;
}

// Framework-style icon registry interface
export interface IconRegistry {
  [key: string]: React.ComponentType<any>;
}

// Framework-style command interface
export interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  category: "layout" | "component" | "theme" | "utility";
}

// Framework-style command configuration
export interface CommandConfig {
  keyPress?: string;
  commands?: Command[];
  enableLLM?: boolean;
  placeholder?: string;
  emptyMessage?: string;
}

// Framework-style command handler interface
export interface CommandHandler {
  parseUserInput: (input: string) => void;
  parseUserInputWithLLM?: (input: string) => Promise<void>;
  resetToDefault: () => void;
  isLLMProcessing?: boolean;
  lastLLMResponse?: string;
}

// Framework-style registry configuration
export interface RegistryConfig {
  components: ComponentMetadata[];
  categories: Record<string, any>;
  enableCaching?: boolean;
  maxCacheSize?: number;
}

// Framework-style registry interface
export interface RegistryInterface {
  getAllComponents(): ComponentMetadata[];
  getComponent(id: string): ComponentMetadata | undefined;
  getComponentsByCategory(category: string): ComponentMetadata[];
  getComponentsByTags(tags: string[]): ComponentMetadata[];
  getComponentsForPosition(
    availableWidth: number,
    availableHeight: number,
    screenSize?: "mobile" | "tablet" | "desktop"
  ): ComponentMetadata[];
  getRecommendedComponents(
    useCase: string,
    availableSpace: { width: number; height: number },
    screenSize?: "mobile" | "tablet" | "desktop"
  ): ComponentMetadata[];
  getSuggestions(
    userInput: string,
    availableSpace: { width: number; height: number },
    screenSize?: "mobile" | "tablet" | "desktop"
  ): ComponentSuggestion[];
  getCategories(): Record<string, any>;
  getComponentCountByCategory(): Record<string, number>;
  searchComponents(query: string): ComponentMetadata[];
}

export interface AdaptlyConfig {
  llm?: LLMConfig;
  registry?: RegistryConfig;
  defaultLayout?: Partial<UIAdaptation>;
  enableLLM?: boolean;
  loadingOverlay?: {
    enabled?: boolean;
    message?: string;
    subMessage?: string;
  };
  logging?: {
    enabled?: boolean;
    level?: "debug" | "info" | "warn" | "error";
  };
}

// Adaptly.json configuration types
export interface AdaptlyJsonConfig {
  version: string;
  description: string;
  components: Record<string, ComponentJsonConfig>;
  dataSources?: Record<string, DataSourceConfig>;
  layout?: LayoutConfig;
}

export interface ComponentJsonConfig {
  name: string;
  description: string;
  category: string;
  size: "small" | "medium" | "large" | "full";
  props: Record<string, PropJsonConfig>;
}

export interface PropJsonConfig {
  type: "string" | "number" | "boolean" | "array" | "object";
  description: string;
  required?: boolean;
  defaultValue?: any;
  options?: string[];
  examples?: any[];
  dataSource?: "api" | "filtered" | "computed";
}

export interface DataSourceConfig {
  description: string;
  examples: string[];
}

export interface LayoutConfig {
  grid: {
    columns: number;
    spacing: number;
    responsive: {
      mobile: { columns: number };
      tablet: { columns: number };
      desktop: { columns: number };
    };
  };
}
