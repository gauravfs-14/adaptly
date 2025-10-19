import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface SalesData {
  name: string;
  sales: number;
  revenue: number;
  profit?: number;
  orders?: number;
}

interface SalesChartProps {
  title?: string;
  description?: string;
  height?: number;
  // Filtering parameters that LLM can pass
  timeRange?: "7d" | "30d" | "90d" | "1y";
  metric?: "sales" | "revenue" | "profit" | "orders";
  category?: string;
  sortBy?: "date" | "value" | "growth";
  sortOrder?: "asc" | "desc";
}

export function SalesChart({
  title = "Sales Overview",
  description = "Monthly sales and revenue trends",
  height = 300,
  timeRange = "30d",
  metric = "sales",
  category,
  sortBy = "date",
  sortOrder = "asc",
}: SalesChartProps) {
  // Simulate data fetching based on filtering parameters
  const generateData = () => {
    const baseData = [
      { name: "Jan", sales: 4000, revenue: 2400, profit: 1200, orders: 45 },
      { name: "Feb", sales: 3000, revenue: 1398, profit: 800, orders: 32 },
      { name: "Mar", sales: 2000, revenue: 9800, profit: 4900, orders: 28 },
      { name: "Apr", sales: 2780, revenue: 3908, profit: 1954, orders: 38 },
      { name: "May", sales: 1890, revenue: 4800, profit: 2400, orders: 25 },
      { name: "Jun", sales: 2390, revenue: 3800, profit: 1900, orders: 42 },
    ];

    // Apply filtering based on parameters
    let filteredData = [...baseData];

    // Filter by time range
    if (timeRange === "7d") {
      filteredData = filteredData.slice(-1);
    } else if (timeRange === "30d") {
      filteredData = filteredData.slice(-2);
    } else if (timeRange === "90d") {
      filteredData = filteredData.slice(-3);
    }

    // Sort data
    if (sortBy === "value") {
      filteredData.sort((a, b) => {
        const aVal = a[metric] || 0;
        const bVal = b[metric] || 0;
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return filteredData;
  };

  const chartData = generateData();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
              color: "hsl(var(--chart-1))",
            },
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="flex-1 min-h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tick={{ fontSize: 12 }} />
              <YAxis fontSize={12} tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
