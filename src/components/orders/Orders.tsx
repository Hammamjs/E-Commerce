import useOrders from '@/hooks/use-orders';
import Header from '../Header';
import OrderList from './OrderList';
import EmptyState from './EmptyState';
import Footer from '../Footer';

const Orders = () => {
  // const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const { orders, getStatusColor } = useOrders({});

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track and manage your order history
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            <OrderList orders={orders} getStatusColor={getStatusColor} />
          </div>

          {/* Empty State */}
          <EmptyState orderLength={orders.length} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
