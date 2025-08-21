import { memo } from 'react';
import { TableCell } from './ui/table';
import type { OrderStatus, OrdersType } from '@/types/Orders';
import { Calendar } from 'lucide-react';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectValue } from './ui/select';
import { SelectTrigger } from '@radix-ui/react-select';

interface CustomTableRowProps {
  order: OrdersType;
  handleStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  getStatusColor: (status: OrderStatus) => string;
  getStatusDot: (status: OrderStatus) => string;
}

const CustomTableRow = ({
  order,
  handleStatusChange,
  getStatusColor,
  getStatusDot,
}: CustomTableRowProps) => {
  return (
    <tr>
      <TableCell className="font-medium">{order._id}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{order.user.email}</div>
          <div className="text-sm text-muted-foreground">
            {order.user.username}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <div key={index} className="text-sm">
              {1}× {item.product.name}
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell className="font-semibold">
        ${order.totalPrice.toFixed(2)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${getStatusDot(order.status)}`}
          ></div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <Select
          value={order.status}
          onValueChange={(value) =>
            handleStatusChange(order._id, value as OrderStatus)
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </tr>
  );
};

export default memo(CustomTableRow);
