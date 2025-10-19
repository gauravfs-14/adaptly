# Basic Dashboard Tutorial

This tutorial will walk you through building a complete adaptive dashboard using Adaptly. By the end, you'll have a fully functional dashboard that responds to natural language commands.

## 🎯 What We'll Build

A comprehensive dashboard with:

- **Metric Cards**: Key performance indicators
- **Charts**: Sales and revenue visualization
- **Data Tables**: Order and customer information
- **Team Members**: Staff directory
- **Activity Feed**: Real-time updates
- **AI-Powered Layout**: Responds to natural language commands

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Google Gemini API key
- Basic React/Next.js knowledge

### Step 1: Create the Project

```bash
# Create a new Next.js project
npx create-next-app@latest adaptly-dashboard --typescript --tailwind --eslint
cd adaptly-dashboard

# Install Adaptly and dependencies
npm install adaptly @radix-ui/react-dialog @radix-ui/react-command cmdk lucide-react
```

### Step 2: Set Up Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### Step 3: Create Component Registry

Create `adaptly.json` in your project root:

```json
{
  "version": "1.0.0",
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators with values, trends, and progress bars",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true },
        "change": { "type": "string", "required": false },
        "changeType": { "type": "string", "required": false, "allowed": ["positive", "negative", "neutral"] },
        "progress": { "type": "number", "required": false },
        "description": { "type": "string", "required": false }
      },
      "useCases": ["revenue tracking", "user metrics", "performance indicators", "KPI display"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    },
    "SalesChart": {
      "description": "Visualize sales data with interactive charts and graphs",
      "props": {
        "title": { "type": "string", "required": false },
        "description": { "type": "string", "required": false },
        "height": { "type": "number", "required": false },
        "timeRange": { "type": "string", "required": false, "allowed": ["7d", "30d", "90d", "1y"] },
        "metric": { "type": "string", "required": false, "allowed": ["sales", "revenue", "profit", "orders"] },
        "category": { "type": "string", "required": false },
        "sortBy": { "type": "string", "required": false, "allowed": ["date", "value", "growth"] },
        "sortOrder": { "type": "string", "required": false, "allowed": ["asc", "desc"] }
      },
      "useCases": ["sales visualization", "trend analysis", "performance charts"],
      "space": { "min": [3, 3], "max": [6, 5], "preferred": [4, 4] }
    },
    "DataTable": {
      "description": "Display tabular data with filtering, sorting, and pagination",
      "props": {
        "title": { "type": "string", "required": true },
        "data": { "type": "array", "required": true },
        "columns": { "type": "array", "required": true },
        "filters": { "type": "object", "required": false },
        "sortBy": { "type": "string", "required": false },
        "sortOrder": { "type": "string", "required": false, "allowed": ["asc", "desc"] }
      },
      "useCases": ["data display", "tabular information", "sortable lists"],
      "space": { "min": [4, 4], "max": [6, 8], "preferred": [6, 6] }
    },
    "TeamMembers": {
      "description": "Display team member cards with roles, avatars, and contact information",
      "props": {
        "title": { "type": "string", "required": false },
        "description": { "type": "string", "required": false },
        "showHoverCard": { "type": "boolean", "required": false },
        "department": { "type": "string", "required": false },
        "status": { "type": "string", "required": false, "allowed": ["online", "away", "offline"] },
        "role": { "type": "string", "required": false },
        "sortBy": { "type": "string", "required": false, "allowed": ["name", "role", "status", "tasks"] },
        "sortOrder": { "type": "string", "required": false, "allowed": ["asc", "desc"] },
        "limit": { "type": "number", "required": false }
      },
      "useCases": ["team display", "contact information", "user profiles"],
      "space": { "min": [2, 2], "max": [4, 4], "preferred": [3, 3] }
    },
    "ActivityFeed": {
      "description": "Display recent user activities, system events, and real-time updates in a timeline format",
      "props": {
        "activities": { "type": "array", "required": false },
        "title": { "type": "string", "required": false },
        "description": { "type": "string", "required": false },
        "maxItems": { "type": "number", "required": false },
        "showAvatars": { "type": "boolean", "required": false }
      },
      "useCases": ["user activity tracking", "system monitoring", "real-time updates", "audit logs"],
      "space": { "min": [3, 3], "max": [6, 6], "preferred": [4, 4] }
    },
    "WelcomeCard": {
      "description": "Welcome message and instructions for new users",
      "props": {
        "title": { "type": "string", "required": true },
        "description": { "type": "string", "required": true }
      },
      "useCases": ["onboarding", "welcome", "instructions"],
      "space": { "min": [4, 2], "max": [6, 4], "preferred": [6, 3] }
    }
  }
}
```

## 🧩 Building Components

### Step 4: Create MetricCard Component

Create `components/MetricCard.tsx`:

```tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  progress?: number;
  description?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  progress, 
  description 
}: MetricCardProps) {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      )}
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

### Step 5: Create SalesChart Component

Create `components/SalesChart.tsx`:

```tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  title?: string;
  description?: string;
  height?: number;
  timeRange?: '7d' | '30d' | '90d' | '1y';
  metric?: 'sales' | 'revenue' | 'profit' | 'orders';
  category?: string;
  sortBy?: 'date' | 'value' | 'growth';
  sortOrder?: 'asc' | 'desc';
}

// Sample data - in a real app, this would come from an API
const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

export function SalesChart({ 
  title = 'Sales Overview', 
  description,
  height = 300,
  timeRange = '30d',
  metric = 'sales',
  category,
  sortBy = 'date',
  sortOrder = 'desc'
}: SalesChartProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Time Range: {timeRange}</span>
        <span>Metric: {metric}</span>
      </div>
    </div>
  );
}
```

### Step 6: Create DataTable Component

Create `components/DataTable.tsx`:

```tsx
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

interface DataTableProps {
  title: string;
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }>;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function DataTable({ 
  title, 
  data, 
  columns, 
  filters = {}, 
  sortBy, 
  sortOrder = 'asc' 
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState(sortBy);
  const [currentOrder, setCurrentOrder] = useState(sortOrder);

  const handleSort = (key: string) => {
    if (currentSort === key) {
      setCurrentOrder(currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setCurrentSort(key);
      setCurrentOrder('asc');
    }
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!currentSort) return 0;
    
    const aVal = a[currentSort];
    const bVal = b[currentSort];
    
    if (aVal < bVal) return currentOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return currentOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      <div className="mb-4 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  <button
                    onClick={() => column.sortable && handleSort(column.key)}
                    className={`flex items-center space-x-1 ${
                      column.sortable ? 'hover:text-gray-700 dark:hover:text-gray-300' : ''
                    }`}
                    disabled={!column.sortable}
                  >
                    <span>{column.label}</span>
                    {column.sortable && currentSort === column.key && (
                      currentOrder === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {sortedData.length} of {data.length} items
      </div>
    </div>
  );
}
```

### Step 7: Create TeamMembers Component

Create `components/TeamMembers.tsx`:

```tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'online' | 'away' | 'offline';
  avatar?: string;
  email: string;
  phone?: string;
}

interface TeamMembersProps {
  title?: string;
  description?: string;
  showHoverCard?: boolean;
  department?: string;
  status?: 'online' | 'away' | 'offline';
  role?: string;
  sortBy?: 'name' | 'role' | 'status' | 'tasks';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

const sampleMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Product Manager',
    department: 'Product',
    status: 'online',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: 'away',
    email: 'jane@company.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Backend Developer',
    department: 'Engineering',
    status: 'online',
    email: 'mike@company.com',
    phone: '+1 (555) 345-6789'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    role: 'Designer',
    department: 'Design',
    status: 'offline',
    email: 'sarah@company.com',
    phone: '+1 (555) 456-7890'
  }
];

export function TeamMembers({
  title = 'Team Members',
  description,
  showHoverCard = true,
  department,
  status,
  role,
  sortBy = 'name',
  sortOrder = 'asc',
  limit
}: TeamMembersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredMembers = sampleMembers
    .filter(member => {
      if (department && member.department !== department) return false;
      if (status && member.status !== status) return false;
      if (role && member.role !== role) return false;
      return true;
    })
    .slice(0, limit || sampleMembers.length);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(member.status)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {member.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {member.role}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {member.department}
                </Badge>
                <Badge 
                  variant={member.status === 'online' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {member.status}
                </Badge>
              </div>
            </div>
            
            {showHoverCard && (
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Mail className="h-4 w-4" />
                </button>
                {member.phone && (
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Phone className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Step 8: Create ActivityFeed Component

Create `components/ActivityFeed.tsx`:

```tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Activity } from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  avatar?: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
  title?: string;
  description?: string;
  maxItems?: number;
  showAvatars?: boolean;
}

const sampleActivities: Activity[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'created',
    target: 'new order #1234',
    timestamp: '2 minutes ago',
    type: 'success',
    avatar: undefined
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'updated',
    target: 'product catalog',
    timestamp: '15 minutes ago',
    type: 'info',
    avatar: undefined
  },
  {
    id: '3',
    user: 'Mike Johnson',
    action: 'completed',
    target: 'system maintenance',
    timestamp: '1 hour ago',
    type: 'success',
    avatar: undefined
  },
  {
    id: '4',
    user: 'Sarah Wilson',
    action: 'reported',
    target: 'bug in checkout',
    timestamp: '2 hours ago',
    type: 'warning',
    avatar: undefined
  }
];

export function ActivityFeed({
  activities = sampleActivities,
  title = 'Recent Activity',
  description,
  maxItems = 10,
  showAvatars = true
}: ActivityFeedProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    }
  };

  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            {showAvatars && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback>
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.user}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.action}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {activity.target}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getTypeColor(activity.type)}`}
                >
                  {activity.type}
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length > maxItems && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            View all {activities.length} activities
          </button>
        </div>
      )}
    </div>
  );
}
```

### Step 9: Create WelcomeCard Component

Create `components/WelcomeCard.tsx`:

```tsx
import React from 'react';
import { Sparkles, Command } from 'lucide-react';

interface WelcomeCardProps {
  title: string;
  description: string;
}

export function WelcomeCard({ title, description }: WelcomeCardProps) {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">{title}</h2>
      </div>
      
      <p className="text-blue-700 dark:text-blue-300 mb-4">{description}</p>
      
      <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
        <Command className="h-4 w-4" />
        <span>Press ⌘K to get started</span>
      </div>
    </div>
  );
}
```

## 🎨 Setting Up the Main App

### Step 10: Create the Main Dashboard

Replace `app/page.tsx`:

```tsx
'use client';

import { AdaptlyProvider, AdaptiveLayout, AdaptiveCommand } from 'adaptly';
import adaptlyConfig from '../adaptly.json';
import { MetricCard } from '@/components/MetricCard';
import { SalesChart } from '@/components/SalesChart';
import { DataTable } from '@/components/DataTable';
import { TeamMembers } from '@/components/TeamMembers';
import { ActivityFeed } from '@/components/ActivityFeed';
import { WelcomeCard } from '@/components/WelcomeCard';

// Sample data for the dashboard
const sampleOrders = [
  { id: '1', customer: 'John Doe', product: 'Laptop', amount: '$1,299', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', product: 'Mouse', amount: '$29', status: 'Pending' },
  { id: '3', customer: 'Mike Johnson', product: 'Keyboard', amount: '$89', status: 'Shipped' },
  { id: '4', customer: 'Sarah Wilson', product: 'Monitor', amount: '$399', status: 'Completed' },
];

const sampleColumns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'product', label: 'Product', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export default function Dashboard() {
  return (
    <AdaptlyProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY || ''}
      components={{
        MetricCard,
        SalesChart,
        DataTable,
        TeamMembers,
        ActivityFeed,
        WelcomeCard,
      }}
      adaptlyConfig={adaptlyConfig}
      defaultLayout={{
        components: [
          {
            id: 'welcome',
            type: 'WelcomeCard',
            props: {
              title: 'Welcome to Your Adaptive Dashboard!',
              description: 'This dashboard adapts to your needs. Press ⌘K and describe what you want to see. Try saying "Add some metrics" or "Create a sales dashboard".'
            },
            position: { x: 0, y: 0, w: 6, h: 3 },
            visible: true,
          },
          {
            id: 'revenue-metric',
            type: 'MetricCard',
            props: {
              title: 'Total Revenue',
              value: '$45,231',
              change: '+20.1%',
              changeType: 'positive',
              progress: 75,
              description: 'from last month'
            },
            position: { x: 0, y: 3, w: 2, h: 1 },
            visible: true,
          },
          {
            id: 'users-metric',
            type: 'MetricCard',
            props: {
              title: 'Active Users',
              value: '1,234',
              change: '+5.2%',
              changeType: 'positive',
              progress: 60,
              description: 'this week'
            },
            position: { x: 2, y: 3, w: 2, h: 1 },
            visible: true,
          },
          {
            id: 'orders-metric',
            type: 'MetricCard',
            props: {
              title: 'Orders',
              value: '89',
              change: '+12.3%',
              changeType: 'positive',
              progress: 45,
              description: 'today'
            },
            position: { x: 4, y: 3, w: 2, h: 1 },
            visible: true,
          },
          {
            id: 'sales-chart',
            type: 'SalesChart',
            props: {
              title: 'Sales Overview',
              description: 'Monthly sales performance',
              timeRange: '30d',
              metric: 'sales'
            },
            position: { x: 0, y: 4, w: 4, h: 4 },
            visible: true,
          },
          {
            id: 'team-members',
            type: 'TeamMembers',
            props: {
              title: 'Team Members',
              description: 'Your team at a glance',
              limit: 4
            },
            position: { x: 4, y: 4, w: 2, h: 4 },
            visible: true,
          },
          {
            id: 'orders-table',
            type: 'DataTable',
            props: {
              title: 'Recent Orders',
              data: sampleOrders,
              columns: sampleColumns
            },
            position: { x: 0, y: 8, w: 6, h: 6 },
            visible: true,
          },
          {
            id: 'activity-feed',
            type: 'ActivityFeed',
            props: {
              title: 'Recent Activity',
              description: 'Latest team activities',
              maxItems: 5
            },
            position: { x: 0, y: 14, w: 6, h: 4 },
            visible: true,
          }
        ],
        layout: 'grid',
        spacing: 6,
        columns: 6,
      }}
      enableLLM={true}
      logging={{
        enabled: true,
        level: 'debug'
      }}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Adaptive Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Press{' '}
              <kbd className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                ⌘K
              </kbd>{' '}
              to describe what you want to see
            </p>
          </div>
          
          <AdaptiveCommand />
          <AdaptiveLayout />
        </div>
      </div>
    </AdaptlyProvider>
  );
}
```

### Step 11: Install Required Dependencies

```bash
# Install chart library for SalesChart
npm install recharts

# Install shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add avatar badge
```

### Step 12: Run Your Dashboard

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you should see your adaptive dashboard!

## 🎮 Testing Your Dashboard

### Try These Commands

Press `⌘K` and try these natural language commands:

1. **"Add more metrics"** - AI will suggest additional metric cards
2. **"Create a sales dashboard"** - AI will arrange sales-focused components
3. **"Show team information"** - AI will prioritize team-related components
4. **"Add a chart"** - AI will add a sales chart
5. **"Make it more compact"** - AI will optimize the layout for space
6. **"Add a data table"** - AI will add a table component
7. **"Show recent activity"** - AI will add an activity feed
8. **"Reset to default"** - AI will restore the original layout

### Expected Behavior

- **AI Processing**: You should see a loading overlay when the AI is processing
- **Layout Changes**: Components should rearrange based on your commands
- **Component Addition**: New components should appear in appropriate positions
- **Responsive Design**: Layout should work on different screen sizes

## 🎨 Customizing Your Dashboard

### Adding New Components

1. **Create the component** in `components/`
2. **Register it** in `adaptly.json`
3. **Add it** to the components object in `page.tsx`
4. **Test with ⌘K** - describe your new component

### Customizing the Layout

```tsx
// Change default layout
<AdaptlyProvider
  defaultLayout={{
    components: [
      // Your custom layout
    ],
    layout: 'grid',
    spacing: 8,
    columns: 12,
  }}
  // ... other props
>
```

### Adding Custom Commands

```tsx
<AdaptiveCommand
  aiSuggestions={[
    {
      value: "Add revenue metrics",
      label: "💰 Add revenue metrics",
      description: "Add key revenue indicators"
    },
    {
      value: "Create a sales dashboard",
      label: "📊 Create a sales dashboard",
      description: "Build a complete sales overview"
    }
  ]}
/>
```

## 🚀 Next Steps

Now that you have a working adaptive dashboard:

1. **Read the [Component Registry Guide](./component-registry.md)** - Learn about advanced component registration
2. **Check out [Advanced Layouts](./tutorials/advanced-layouts.md)** - Build more complex layouts
3. **Explore [Custom Components](./custom-components.md)** - Create your own components
4. **Try the [Deployment Guide](./deployment.md)** - Deploy your dashboard

## 🆘 Troubleshooting

### Common Issues

**Components not rendering:**

- Check component names match between registry and components object
- Verify props match the registry definition
- Ensure components are properly exported

**AI not responding:**

- Verify API key is correct
- Check network connectivity
- Ensure LLM service is properly configured

**Layout issues:**

- Check space requirements in registry
- Verify component positioning
- Ensure responsive design is working

### Debug Tools

```tsx
// Enable debug logging
<AdaptlyProvider
  logging={{
    enabled: true,
    level: 'debug'
  }}
  // ... other props
>
```

## 🎉 Congratulations

You've successfully built a complete adaptive dashboard! You now have:

- ✅ A working adaptive dashboard
- ✅ AI-powered component generation
- ✅ Natural language command interface
- ✅ Responsive layout system
- ✅ Component registry configuration
- ✅ Real-world components (metrics, charts, tables, team, activity)

**Ready for more?** Check out the [Advanced Layouts Tutorial](./tutorials/advanced-layouts.md) to build even more sophisticated dashboards!
