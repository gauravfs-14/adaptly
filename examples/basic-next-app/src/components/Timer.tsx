"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TimerProps {
  initialMinutes?: number;
  title?: string;
  onComplete?: () => void;
}

export function Timer({
  initialMinutes = 25,
  title = "Pomodoro Timer",
  onComplete,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(initialMinutes * 60);
  };

  const addTime = (minutes: number) => {
    setTimeLeft((prev) => Math.max(0, prev + minutes * 60));
  };

  const progress =
    ((initialMinutes * 60 - timeLeft) / (initialMinutes * 60)) * 100;
  const isComplete = timeLeft === 0;

  const getTimerGradient = () => {
    if (isComplete)
      return "from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20";
    if (isRunning)
      return "from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20";
    return "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20";
  };

  const getProgressColor = () => {
    if (isComplete) return "from-green-500 to-emerald-500";
    if (isRunning) return "from-red-500 to-pink-500";
    return "from-blue-500 to-indigo-500";
  };

  return (
    <Card
      className={`h-full w-full bg-gradient-to-br ${getTimerGradient()} border-0 shadow-lg flex flex-col`}
    >
      <div className="text-center flex flex-col h-full">
        <div className="flex items-center justify-center mb-4 flex-shrink-0">
          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-orange-600 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        <div className="flex-1 flex flex-col justify-center mb-6">
          <div
            className={`text-5xl font-mono font-bold mb-4 transition-all duration-300 ${
              isComplete
                ? "text-green-600 dark:text-green-400"
                : isRunning
                ? "text-red-600 dark:text-red-400 animate-pulse"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {formatTime(timeLeft)}
          </div>

          <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${getProgressColor()} shadow-lg`}
              style={{ width: `${progress}%` }}
            />
            {isRunning && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Progress: {Math.round(progress)}%</span>
            <span>•</span>
            <span>
              {Math.round((initialMinutes * 60 - timeLeft) / 60)}m elapsed
            </span>
          </div>
        </div>

        <div className="flex justify-center space-x-3 mb-4 flex-shrink-0">
          {!isRunning ? (
            <Button
              onClick={startTimer}
              disabled={isComplete}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isComplete
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isPaused ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg>
                  Resume
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg>
                  Start
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={pauseTimer}
              variant="outline"
              className="px-6 py-3 rounded-xl font-medium border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pause
            </Button>
          )}
          <Button
            onClick={resetTimer}
            variant="outline"
            className="px-4 py-3 rounded-xl font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </Button>
        </div>

        <div className="flex justify-center space-x-2 mb-4 flex-shrink-0">
          <Button
            onClick={() => addTime(5)}
            variant="ghost"
            size="sm"
            disabled={isRunning}
            className="px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-200"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            +5 min
          </Button>
          <Button
            onClick={() => addTime(-5)}
            variant="ghost"
            size="sm"
            disabled={isRunning}
            className="px-3 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
            -5 min
          </Button>
        </div>

        {isComplete && (
          <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-bounce flex-shrink-0">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                🎉 Timer Complete!
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              Great job! Time for a break.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
