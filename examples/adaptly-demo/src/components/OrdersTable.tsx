import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Filter, MoreHorizontal } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Completed" | "Pending" | "Shipped";
  priority: "High" | "Medium" | "Low";
  date: string;
}

interface OrdersTableProps {
  orders?: Order[];
  title?: string;
  description?: string;
  showActions?: boolean;
  onExport?: () => void;
  onFilter?: () => void;
  onOrderAction?: (orderId: string, action: string) => void;
}

const defaultOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Laptop",
    amount: "$1,299",
    status: "Completed",
    priority: "High",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Phone",
    amount: "$699",
    status: "Pending",
    priority: "Medium",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    product: "Tablet",
    amount: "$499",
    status: "Shipped",
    priority: "Low",
    date: "2024-01-13",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    product: "Headphones",
    amount: "$199",
    status: "Completed",
    priority: "Medium",
    date: "2024-01-12",
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    product: "Watch",
    amount: "$299",
    status: "Pending",
    priority: "High",
    date: "2024-01-11",
  },
];

export function OrdersTable({
  orders = defaultOrders,
  title = "Recent Orders",
  description = "A list of your recent orders",
  showActions = true,
  onExport,
  onFilter,
  onOrderAction,
}: OrdersTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showActions && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={onFilter}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              {showActions && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status) as any}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(order.priority) as any}>
                    {order.priority}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onOrderAction?.(order.id, "view")}
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onOrderAction?.(order.id, "edit")}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onOrderAction?.(order.id, "delete")}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
