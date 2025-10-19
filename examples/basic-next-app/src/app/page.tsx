"use client";

import { AdaptlyProvider } from "adaptly";
import { MetricCard } from "@/components/MetricCard";
import { TaskList } from "@/components/TaskList";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Timer } from "@/components/Timer";
import { NoteCard } from "@/components/NoteCard";
import adaptlyConfig from "../../adaptly.json";
import { Kbd } from "@/components/ui/kbd";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          My Adaptive Dashboard
        </h1>
        <p className="text-sm mb-4">
          Press<Kbd>⌘ K</Kbd> to to open the command bar. Use natural language
          to describe what you want to see.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          This demo shows how to use Adaptly to create a dashboard with various
          components. You can use natural language to describe what you want to
          see.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 mb-8">
          <li>
            For example, you can say "Create a dashboard with revenue metrics"
            or "Add a weather widget".
          </li>
          <li>
            You can also say "Create a dashboard with revenue metrics and a
            weather widget".
          </li>
          <li>
            You can also say "Create a dashboard with revenue metrics and a
            weather widget and a timer".
          </li>
          <li>
            You can also say "Create a dashboard with revenue metrics and a
            weather widget and a timer and a note card".
          </li>
          <li>
            You can also say "Create a dashboard with revenue metrics and a
            weather widget and a timer and a note card and a task list".
          </li>
          <li>
            You can also say "Create a dashboard with revenue metrics and a
            weather widget and a timer and a note card and a task list and a
            metric card".
          </li>
        </ul>
        <AdaptlyProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY!}
          provider="google"
          model="gemini-2.0-flash-exp"
          components={{
            MetricCard,
            TaskList,
            WeatherWidget,
            Timer,
            NoteCard,
          }}
          adaptlyConfig={adaptlyConfig}
          enableStorage={true}
          storageKey="my-dashboard"
          className="h-full"
        />
      </div>
    </div>
  );
}
