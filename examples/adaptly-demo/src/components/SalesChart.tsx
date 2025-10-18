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
  data?: SalesData[];
  title?: string;
  description?: string;
  height?: number;
}

const defaultData: SalesData[] = [
  { name: "Jan", sales: 4000, revenue: 2400, profit: 1200, orders: 45 },
  { name: "Feb", sales: 3000, revenue: 1398, profit: 800, orders: 32 },
  { name: "Mar", sales: 2000, revenue: 9800, profit: 4900, orders: 28 },
  { name: "Apr", sales: 2780, revenue: 3908, profit: 1954, orders: 38 },
  { name: "May", sales: 1890, revenue: 4800, profit: 2400, orders: 25 },
  { name: "Jun", sales: 2390, revenue: 3800, profit: 1900, orders: 42 },
];

export function SalesChart({
  data = defaultData,
  title = "Sales Overview",
  description = "Monthly sales and revenue trends",
  height = 300,
}: SalesChartProps) {
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
            <AreaChart data={data}>
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
