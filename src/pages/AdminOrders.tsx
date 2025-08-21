import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Package, DollarSign } from 'lucide-react';
import useAdminOrders from '@/hooks/use-adminOrders';
import CustomTableRow from '@/components/CustomTableRow';

const AdminOrders = () => {
  const { getStatusColor, getStatusDot, stats, handleStatusChange, orders } =
    useAdminOrders();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Orders Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pending Orders
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.pending}
                    </p>
                  </div>
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Package className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Shipped Orders
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.shipped}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Delivered Orders
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.delivered}
                    </p>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      ${stats.totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
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
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;
