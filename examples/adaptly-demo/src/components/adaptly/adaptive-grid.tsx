"use client";

import React, { useMemo } from "react";
import { useAdaptiveUI } from "./adaptive-ui-provider";
import { UIComponent, UIAdaptation } from "./types";
import { adaptlyLogger } from "./logger";

// Framework-style component registry interface
export interface ComponentRegistry {
  [key: string]: React.ComponentType<any>;
}

// Framework-style icon registry interface
export interface IconRegistry {
  [key: string]: React.ComponentType<any>;
}

// Internal grid component - developers don't use this directly
export function AdaptiveGridCore({
  adaptation,
  componentRegistry,
  iconRegistry,
  className = "",
  style = {},
}: {
  adaptation: UIAdaptation;
  componentRegistry: ComponentRegistry;
  iconRegistry?: IconRegistry;
  className?: string;
  style?: React.CSSProperties;
}) {
  const renderComponent = React.useCallback(
    (component: UIComponent) => {
      const Component = componentRegistry[component.type];
      if (!Component) {
        adaptlyLogger.warn(
          `Component type "${component.type}" not found in registry`
        );
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              Component "{component.type}" not found
            </p>
          </div>
        );
      }

      // Pass iconRegistry to components so they can use icons
      return <Component {...component.props} iconRegistry={iconRegistry} />;
    },
    [componentRegistry, iconRegistry]
  );

  const gridStyle = useMemo(() => {
    const baseStyle = {
      display: "grid",
      gap: `${adaptation.spacing || 6}px`,
      ...style,
    };

    if (adaptation.layout === "grid") {
      return {
        ...baseStyle,
        gridTemplateColumns: `repeat(${adaptation.columns || 6}, 1fr)`,
      };
    } else if (adaptation.layout === "flex") {
      return {
        ...baseStyle,
        display: "flex",
        flexWrap: "wrap" as const,
        gap: `${adaptation.spacing || 6}px`,
      };
    }

    return baseStyle;
  }, [adaptation, style]);

  return (
    <div className={`adaptive-grid ${className}`} style={gridStyle}>
      {adaptation.components
        .filter((component) => component.visible !== false)
        .map((component) => (
          <div
            key={component.id}
            className="adaptive-component"
            style={{
              gridColumn: `span ${component.position?.w || 1}`,
              gridRow: `span ${component.position?.h || 1}`,
            }}
          >
            {renderComponent(component)}
          </div>
        ))}
    </div>
  );
}

/**
 * AdaptiveLayout - The main component developers use to render adaptive UIs
 *
 * This component automatically connects to the Adaptly context and renders
 * your components in an adaptive grid/flex layout based on AI-generated layouts.
 *
 * Usage:
 * ```tsx
 * <AdaptiveLayout
 *   componentRegistry={myComponents}
 *   iconRegistry={myIcons}
 *   className="my-layout"
 * />
 * ```
 */
export function AdaptiveLayout({
  componentRegistry,
  iconRegistry,
  className = "",
  style = {},
}: {
  componentRegistry?: ComponentRegistry;
  iconRegistry?: IconRegistry;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { adaptation } = useAdaptiveUI();

  // Minimal default component registry - only EmptyCard as fallback
  const defaultComponentRegistry: ComponentRegistry = {
    EmptyCard: ({
      title,
      description,
      icon,
      action,
      iconRegistry: componentIconRegistry,
    }: any) => {
      // Use provided icon registry or fallback to default mapping
      const defaultIconMap: Record<string, any> = {
        HelpCircle: require("lucide-react").HelpCircle,
        Sparkles: require("lucide-react").Sparkles,
      };

      // Convert icon string to component if needed
      const IconComponent =
        typeof icon === "string"
          ? componentIconRegistry?.[icon] ||
            iconRegistry?.[icon] ||
            defaultIconMap[icon]
          : icon;

      return (
        <div className="p-6 bg-white rounded-lg shadow border-2 border-dashed border-gray-300">
          <div className="text-center">
            {IconComponent && (
              <IconComponent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            )}
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            {action && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {action}
              </button>
            )}
          </div>
        </div>
      );
    },
  };

  // Merge user-provided registry with defaults
  const finalComponentRegistry = {
    ...defaultComponentRegistry,
    ...componentRegistry,
  };

  return (
    <AdaptiveGridCore
      adaptation={adaptation}
      componentRegistry={finalComponentRegistry}
      iconRegistry={iconRegistry}
      className={className}
      style={style}
    />
  );
}
