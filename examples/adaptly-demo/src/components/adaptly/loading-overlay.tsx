"use client";

import React from "react";
import { Sparkles, Wand2, Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
}

export function LoadingOverlay({
  isVisible,
  message = "AI is generating your layout...",
  subMessage = "This may take a few moments",
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Animated Sparkles Icon */}
          <div className="relative">
            <Sparkles className="h-12 w-12 text-blue-500 animate-pulse" />
            <Loader2 className="h-6 w-6 text-blue-300 animate-spin absolute -top-1 -right-1" />
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
            <p className="text-sm text-gray-600">{subMessage}</p>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full animate-pulse"
              style={{ width: "60%" }}
            />
          </div>

          {/* AI Processing Indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Wand2 className="h-4 w-4 animate-bounce" />
            <span>Processing with Gemini AI...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
