import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DeviceData {
  name: string;
  value: number;
  color: string;
}

interface DeviceChartProps {
  data?: DeviceData[];
  title?: string;
  description?: string;
  height?: number;
}

const defaultData: DeviceData[] = [
  { name: "Desktop", value: 400, color: "#0088FE" },
  { name: "Mobile", value: 300, color: "#00C49F" },
  { name: "Tablet", value: 300, color: "#FFBB28" },
  { name: "Other", value: 200, color: "#FF8042" },
];

export function DeviceChart({
  data = defaultData,
  title = "Device Usage",
  description = "Traffic by device type",
  height = 300,
}: DeviceChartProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "#0088FE",
            },
            mobile: {
              label: "Mobile",
              color: "#00C49F",
            },
            tablet: {
              label: "Tablet",
              color: "#FFBB28",
            },
            other: {
              label: "Other",
              color: "#FF8042",
            },
          }}
          className="flex-1 min-h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                fontSize={12}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
