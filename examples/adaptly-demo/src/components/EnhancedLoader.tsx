import { Sparkles, Wand2, Brain, Zap } from "lucide-react";
import { CustomLoaderProps } from "./adaptly/types";

export function EnhancedLoader({
  isVisible,
  message = "AI is generating your layout...",
  subMessage = "Creating components and arranging them for you",
}: CustomLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Full-page translucent background */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />

      {/* Subtle animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-1 h-1 bg-slate-400/20 rounded-full animate-ping"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-slate-300/25 rounded-full animate-ping"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-slate-400/15 rounded-full animate-ping"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-slate-300/20 rounded-full animate-ping"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        />
      </div>

      {/* Main loader content */}
      <div className="relative z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md mx-4 text-center">
        {/* Animated logo/icon section */}
        <div className="relative mb-6">
          {/* Outer rotating ring */}
          <div className="w-20 h-20 mx-auto relative">
            <div
              className="absolute inset-0 border-4 border-transparent border-t-slate-600 border-r-slate-500 rounded-full animate-spin"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute inset-2 border-4 border-transparent border-b-slate-500 border-l-slate-400 rounded-full animate-spin"
              style={{
                animationDuration: "1.5s",
                animationDirection: "reverse",
              }}
            />

            {/* Central animated icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-slate-600 animate-pulse" />
                <div className="absolute -top-1 -right-1">
                  <Wand2
                    className="h-4 w-4 text-slate-500 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main message with typewriter effect */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            {message}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {subMessage}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-slate-600 rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* AI processing indicator with enhanced animation */}
        <div className="flex items-center justify-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <span className="flex items-center space-x-2">
            <Brain className="h-4 w-4 animate-pulse" />
            <span>Processing with AI...</span>
            <Zap className="h-4 w-4 text-slate-500 animate-pulse" />
          </span>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-slate-500/5 pointer-events-none" />
      </div>

      {/* Custom CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
