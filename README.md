# 🧠 Adaptly — The AI-Adaptive UI Library for Next.js

**Adaptly** brings intelligence to modern web dashboards.
It’s a TypeScript-first library that lets your UI *understand what users mean*, not just what they click.
With a single `Cmd + K`, users can describe their goal or need in plain English, and Adaptly uses an **LLM-driven planner** to dynamically recompose your Next.js interface using your existing React components.

> “I can’t see blue.”
> “Show me billing and analytics.”
> “Focus this dashboard on user retention.”

Adaptly turns those statements into live UI transformations — changing colors, scaling text, and rearranging relevant components instantly.

---

## 🎯 What Adaptly Does

| Category                   | Feature                              | Description                                                                                                                                 |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI-Driven Planning**     | Natural-language → structured layout | Sends user goals and your component registry to an LLM that returns a JSON layout plan with selected components and accessibility settings. |
| **Command Bar**            | Cmd + K interface                    | Built using shadcn’s Command & Dialog components for smooth in-app natural-language input.                                                  |
| **Adaptive Layout Engine** | Dynamic Tailwind grid                | Re-renders the UI based on the LLM’s plan: which components to show, in what order, with what styling.                                      |
| **Accessibility Layer**    | Color & text adaptation              | Applies color substitution (e.g., avoid blue hues) and font scaling through CSS variables and Tailwind utilities.                           |
| **Developer Registry**     | JSON-based component context         | You declare what your app can show — Adaptly uses that context to decide how to respond to user intent.                                     |
| **Next.js Integration**    | App Router native                    | Ships React Provider, API route, and hooks that plug directly into a Next.js project with minimal setup.                                    |

---

## 🏗️ Architecture

```
<App>
 └── <AdaptiveUIProvider registry={registry}>
       ├── <AdaptiveCommand />   // Cmd + K
       └── <AdaptiveGrid />      // Dynamic layout from AI plan
     </AdaptiveUIProvider>
```

### Core Modules

1. **AdaptiveUIProvider**
   Provides context: registry, layout state, and preferences returned by the planner.

2. **AdaptiveCommand**
   Opens a shadcn Command dialog. Submits goals to the `/api/adaptly/plan` endpoint.

3. **AdaptiveGrid**
   Reads the layout plan and renders your registered React components in a responsive Tailwind grid.

4. **Planner API (LLM-only)**
   A Next.js route that calls an LLM (OpenAI, Anthropic, or Ollama Cloud) to parse user intent and return a JSON layout plan.

5. **Adapters**
   Runtime utilities that modify Tailwind classes or CSS variables for color blindness and font scaling.

---

## 🧩 Component Registry Schema

Each app using Adaptly defines a registry file describing components and their semantics.

`adaptive.registry.json`

```json
{
  "appName": "Cloud Console Demo",
  "version": "1.0",
  "components": [
    {
      "id": "user-metrics",
      "displayName": "User Metrics",
      "tags": ["analytics", "users", "kpi"],
      "description": "Displays DAU and growth",
      "sizeHints": { "w": 2, "h": 1 },
      "priority": 0.9
    },
    {
      "id": "billing-table",
      "displayName": "Billing Overview",
      "tags": ["billing", "finance"],
      "description": "Shows invoices and credits",
      "sizeHints": { "w": 4, "h": 2 },
      "priority": 0.8
    }
  ]
}
```

---

## ⚙️ Planner API (LLM-Only)

`app/api/adaptly/plan/route.ts`

```ts
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  avoidColors: z.array(z.string()).optional(),
  fontScale: z.number().optional(),
  selected: z.array(z.object({
    componentId: z.string(),
    w: z.number(),
    h: z.number()
  }))
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { goal, registry } = await req.json();

  const prompt = `
  You are a UI planner.
  Given a goal and a registry of components, select which ones to show,
  their approximate sizes, and any accessibility preferences.
  Respond only with valid JSON matching this schema: ${schema.toString()}
  Goal: ${goal}
  Registry: ${JSON.stringify(registry.components)}
  `;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: prompt }]
  });

  const plan = schema.parse(JSON.parse(res.choices[0].message.content));
  return NextResponse.json(plan);
}
```

---

## 🔧 Example Next.js Integration

```tsx
import { AdaptiveUIProvider, AdaptiveGrid, AdaptiveCommand } from "adaptly";
import registry from "./adaptive.registry.json";
import { UserMetrics } from "@/components/UserMetrics";
import { BillingTable } from "@/components/BillingTable";

const components = {
  "user-metrics": UserMetrics,
  "billing-table": BillingTable
};

export default function Dashboard() {
  return (
    <AdaptiveUIProvider registry={registry}>
      <AdaptiveCommand />
      <AdaptiveGrid components={components} />
    </AdaptiveUIProvider>
  );
}
```

**User Flow**

1. Press **Cmd + K**
2. Type: “Show me billing and analytics. I can’t see blue.”
3. The planner calls the LLM → returns structured JSON.
4. `AdaptiveGrid` re-renders those components with adjusted color palette.

---

## 🧠 Technical Stack

| Layer             | Technology                    |
| ----------------- | ----------------------------- |
| Framework         | Next.js 15 (App Router)       |
| Language          | TypeScript                    |
| Styling           | Tailwind CSS + shadcn UI      |
| AI Engine         | OpenAI (GPT-4o / GPT-4o-mini) |
| Schema Validation | zod                           |
| State Management  | React Context                 |
| Packaging         | tsup                          |
| Deployment        | Vercel or any Node-based host |

---

## 🔐 Privacy Model

* The registry and user goal are the only data sent to the LLM.
* No analytics or telemetry are collected by Adaptly.
* Developers must provide their own LLM API key.
* Results are deterministic through schema validation and temperature control.

---

## 🧭 Roadmap After v1.0

* **Layout persistence** (per-user memory in localStorage or Supabase)
* **Visual editing** with drag-and-drop grid adjustments
* **Role-aware planning** (different layouts per user type)
* **Automatic prompt caching** to reduce token cost
* **Multi-LLM support** with adapters for Anthropic and Mistral APIs

---

## 💬 Summary

**Adaptly** is the first UI framework that makes your front-end *intent-driven*.
Instead of navigating menus or switching dashboards, users just *tell* the interface what they want — and the LLM rewrites the layout in real time.

It’s not a chat assistant overlay. It’s an AI that lives *inside* your app’s design system.
