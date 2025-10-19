"use client";

import * as React from "react";
import { Plus, Grid, Layout, RotateCcw, Sparkles, Wand2 } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useAdaptiveUI } from "./adaptive-ui-provider";
import { adaptlyLogger } from "./logger";

// Framework-style command interface
export interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
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

// Framework-style command dialog props
export interface AdaptiveCommandProps {
  keyPress?: string;
  config?: CommandConfig;
  handler?: CommandHandler;
  className?: string;
  style?: React.CSSProperties;
  // Allow developers to override command bar options
  aiSuggestions?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
  }>;
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
}

// Framework-style default commands - generic and configurable
export const DEFAULT_COMMANDS: Command[] = [
  {
    id: "reset",
    label: "Reset",
    description: "Reset to default layout",
    icon: RotateCcw,
    action: "reset",
    category: "utility",
  },
  {
    id: "grid-layout",
    label: "Grid Layout",
    description: "Switch to grid layout",
    icon: Grid,
    action: "grid layout",
    category: "layout",
  },
  {
    id: "flex-layout",
    label: "Flex Layout",
    description: "Switch to flex layout",
    icon: Layout,
    action: "flex layout",
    category: "layout",
  },
];

// Default AI suggestions that developers can override
export const DEFAULT_AI_SUGGESTIONS = [
  {
    value: "Type your own description and press Enter",
    label: "💡 Type your own description and press Enter",
    icon: Wand2,
    description: "Describe what you want to create",
  },
  {
    value: "Create a new layout",
    label: "Create a new layout",
    icon: Sparkles,
    description: "Generate a new UI layout",
  },
  {
    value: "Add more components",
    label: "Add more components",
    icon: Plus,
    description: "Add additional components to the layout",
  },
  {
    value: "Make the layout more compact",
    label: "Make the layout more compact",
    icon: Layout,
    description: "Optimize the layout for better space usage",
  },
  {
    value: "Improve the design",
    label: "Improve the design",
    icon: Wand2,
    description: "Enhance the visual design of the layout",
  },
];

// Framework-style adaptive command component (functional)
export function AdaptiveCommand({
  keyPress = "k",
  config,
  handler,
  aiSuggestions,
  showAISuggestions = true,
  showUtilityCommands = true,
}: AdaptiveCommandProps) {
  const [open, setOpen] = React.useState(false);

  // Setup keyboard listener
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === keyPress && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [keyPress, open]);

  const handleSelect = async (value: string) => {
    adaptlyLogger.debug("Command selected:", value);

    // Close command bar immediately
    setOpen(false);

    if (value === "reset") {
      handler?.resetToDefault();
    } else {
      try {
        if (handler?.parseUserInputWithLLM) {
          await handler.parseUserInputWithLLM(value);
        } else {
          handler?.parseUserInput(value);
        }
      } catch (error) {
        adaptlyLogger.error("Error executing command:", error);
        handler?.parseUserInput(value);
      }
    }
  };

  const getCommands = (): Command[] => {
    return config?.commands || DEFAULT_COMMANDS;
  };

  const getAISuggestions = () => {
    return aiSuggestions || DEFAULT_AI_SUGGESTIONS;
  };

  const commands = getCommands();
  const suggestions = getAISuggestions();

  // Safety checks: ensure arrays are always arrays
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];
  const safeCommands = Array.isArray(commands) ? commands : [];

  // Debug logging to help identify the source of objects
  if (typeof window !== "undefined" && (window as any).__DEV__ !== false) {
    if (!Array.isArray(suggestions)) {
      console.warn("Adaptly: suggestions is not an array:", suggestions);
    }
    if (!Array.isArray(commands)) {
      console.warn("Adaptly: commands is not an array:", commands);
    }
    if (
      handler?.lastLLMResponse &&
      typeof handler.lastLLMResponse !== "string"
    ) {
      console.warn(
        "Adaptly: lastLLMResponse is not a string:",
        handler.lastLLMResponse
      );
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={
          config?.placeholder || "Describe the UI you want to create..."
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value.trim()) {
            e.preventDefault();
            handleSelect(e.currentTarget.value.trim());
          }
        }}
      />
      <CommandList>
        <CommandEmpty>
          <div className="p-4 text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              {config?.emptyMessage ||
                "Try describing what UI you want to create..."}
            </p>
            <p className="text-xs text-gray-500">
              Press Enter to generate UI from your description
            </p>
          </div>
        </CommandEmpty>

        {handler?.isLLMProcessing && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-spin mx-auto mb-2" />
            AI is processing your request...
          </div>
        )}

        {handler?.lastLLMResponse && (
          <div className="p-4 text-sm text-muted-foreground border-t">
            <Wand2 className="h-4 w-4 inline mr-2" />
            {(() => {
              const response = handler.lastLLMResponse;
              if (typeof response === "string") {
                return response;
              } else if (typeof response === "object" && response !== null) {
                // Handle objects that might have label/onClick properties
                if (
                  (response as Record<string, unknown>).label &&
                  typeof (response as Record<string, unknown>).label ===
                    "string"
                ) {
                  return (response as Record<string, unknown>).label as string;
                }
                return JSON.stringify(response);
              }
              return String(response);
            })()}
          </div>
        )}

        {showAISuggestions && (
          <CommandGroup heading="AI-Powered UI Generation">
            {safeSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon || Wand2;
              return (
                <CommandItem
                  key={`ai-suggestion-${suggestion.value}-${index}`}
                  value={suggestion.value}
                  onSelect={() => handleSelect(suggestion.value)}
                  className={index === 0 ? "text-blue-600" : ""}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{suggestion.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {showAISuggestions && showUtilityCommands && <CommandSeparator />}

        {showUtilityCommands && (
          <CommandGroup heading="Utility Commands">
            {safeCommands.map((command) => {
              const Icon = command.icon;
              return (
                <CommandItem
                  key={command.id}
                  value={command.action}
                  onSelect={() => handleSelect(command.action)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{command.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

// Framework-style hook for using adaptive command
export function useAdaptiveCommand(
  handler: CommandHandler,
  config?: CommandConfig
): {
  open: boolean;
  setOpen: (open: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  handleSelect: (value: string) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  getCommands: () => Command[];
  getFilteredCommands: () => Command[];
} {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleSelect = async (value: string) => {
    adaptlyLogger.debug("Command selected:", value);
    if (value === "reset") {
      handler.resetToDefault();
    } else {
      try {
        if (handler.parseUserInputWithLLM) {
          await handler.parseUserInputWithLLM(value);
        } else {
          handler.parseUserInput(value);
        }
      } catch (error) {
        adaptlyLogger.error("Error executing command:", error);
        handler.parseUserInput(value);
      }
    }
    setInput("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        adaptlyLogger.debug("Enter pressed with input:", input);
        handler.parseUserInput(input);
        setInput("");
        setOpen(false);
      }
    }
  };

  const getCommands = (): Command[] => {
    return config?.commands || DEFAULT_COMMANDS;
  };

  const getFilteredCommands = (): Command[] => {
    const commands = getCommands();
    if (!input.trim()) return commands;

    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(input.toLowerCase()) ||
        command.description.toLowerCase().includes(input.toLowerCase()) ||
        command.action.toLowerCase().includes(input.toLowerCase())
    );
  };

  return {
    open,
    setOpen,
    input,
    setInput,
    handleSelect,
    handleKeyDown,
    getCommands,
    getFilteredCommands,
  };
}

// Context-aware wrapper for AdaptiveCommand
export function AdaptiveCommandWrapper({
  keyPress = "k",
  className = "",
  style = {},
  aiSuggestions,
  showAISuggestions = true,
  showUtilityCommands = true,
}: {
  keyPress?: string;
  className?: string;
  style?: React.CSSProperties;
  aiSuggestions?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
  }>;
  showAISuggestions?: boolean;
  showUtilityCommands?: boolean;
}) {
  const {
    parseUserInput,
    parseUserInputWithLLM,
    resetToDefault,
    isLLMProcessing,
    lastLLMResponse,
  } = useAdaptiveUI();

  return (
    <AdaptiveCommand
      keyPress={keyPress}
      className={className}
      style={style}
      aiSuggestions={aiSuggestions}
      showAISuggestions={showAISuggestions}
      showUtilityCommands={showUtilityCommands}
      handler={{
        parseUserInput,
        parseUserInputWithLLM,
        resetToDefault,
        isLLMProcessing,
        lastLLMResponse,
      }}
    />
  );
}

// Framework-style factory function
export function createAdaptiveCommand(
  handler: CommandHandler,
  config?: CommandConfig
): React.ComponentType<AdaptiveCommandProps> {
  const WrappedComponent = (props: AdaptiveCommandProps) => (
    <AdaptiveCommand {...props} handler={handler} config={config} />
  );
  WrappedComponent.displayName = "AdaptiveCommandWrapper";
  return WrappedComponent;
}
