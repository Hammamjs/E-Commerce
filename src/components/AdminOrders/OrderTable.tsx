import CustomTableRow from './CustomTableRow';
import TableList from './TableList';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Package, Table } from 'lucide-react';
import { TableBody, TableHeader, TableRow } from '../ui/table';
import type { OrderStatus, OrdersType } from '@/types/Orders';

type OrderTableProps = {
  orders: OrdersType[];
  handleStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  getStatusColor: (status: OrderStatus) => string;
  getStatusDot: (status: OrderStatus) => string;
};

const OrderTable = ({
  orders,
  getStatusColor,
  getStatusDot,
  handleStatusChange,
}: OrderTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          All Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableList />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <CustomTableRow
                key={order._id}
                order={order}
                handleStatusChange={handleStatusChange}
                getStatusColor={getStatusColor}
                getStatusDot={getStatusDot}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderTable;
