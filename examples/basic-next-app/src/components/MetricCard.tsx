// src/components/MetricCard.tsx
interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  progress?: number;
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  progress,
  description,
}: MetricCardProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl shadow-lg border-0 flex flex-col">
      <div className="flex items-start justify-between mb-3 flex-shrink-0">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          {change && (
            <p
              className={`text-sm font-medium ${
                changeType === "positive"
                  ? "text-green-600 dark:text-green-400"
                  : changeType === "negative"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {change}
            </p>
          )}
        </div>
        {progress !== undefined && (
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {progress}%
            </div>
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mb-3 flex-shrink-0">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
