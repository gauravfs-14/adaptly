"use client";

import React, { useMemo } from "react";
import { useAdaptiveUI } from "./adaptive-ui-provider";
import { UIComponent, UIAdaptation } from "./types";
import { adaptlyLogger } from "./logger";

// Framework-style component registry interface
export interface ComponentRegistry {
  [key: string]: React.ComponentType<unknown>;
}

// Framework-style icon registry interface
export interface IconRegistry {
  [key: string]: React.ComponentType<unknown>;
}

// Internal grid component - developers don't use this directly
export function AdaptiveGridCore({
  adaptation,
  componentRegistry,
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
          `Component type ${component.type} not found in registry`
        );
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              Component {component.type} not found
            </p>
          </div>
        );
      }

      // Debug: Log component props to identify objects (only in development)
      if (
        process.env.NODE_ENV === "development" &&
        Object.keys(component.props).length > 0
      ) {
        console.log("Rendering component:", component.type);
        console.log("Component props:", component.props);
      }

      // Create safe props by filtering out problematic objects
      const safeProps = { ...component.props };

      // Remove any props that are objects with label/onClick (likely UI elements)
      Object.keys(safeProps).forEach((key) => {
        const value = safeProps[key];
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          // Check if it's a UI element object (has label/onClick properties)
          if (
            (value as Record<string, unknown>).label ||
            (value as Record<string, unknown>).onClick
          ) {
            console.warn(`Removing problematic prop ${key}:`, value);
            delete safeProps[key];
          } else {
            // For other objects, convert to string
            safeProps[key] = JSON.stringify(value);
          }
        }
      });

      // Pass iconRegistry to components so they can use icons
      return <Component {...safeProps} />;
    },
    [componentRegistry]
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

  // No default components - framework is truly dependent on adaptly.json
  // All components must be defined in adaptly.json and provided via componentRegistry
  const finalComponentRegistry = componentRegistry || {};

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
