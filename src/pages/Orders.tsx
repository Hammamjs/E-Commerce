// import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, Calendar, Eye, Download } from 'lucide-react';
import useOrders from '@/hooks/use-orders';

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
            {orders?.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{order._id}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          ${order.totalPrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} item
                          {order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2"
                      >
                        <div className="flex-1">
                          <span className="font-medium text-foreground">
                            {item.product.name}
                          </span>
                          <span className="text-muted-foreground ml-2">
                            × {order.quantity}
                          </span>
                        </div>
                        <span className="font-semibold text-foreground">
                          ${(3.0).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>

                    {order.status === 'delivered' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Invoice
                        </Button>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </>
                    )}

                    {order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {orders?.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No orders yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start shopping to see your orders here
                </p>
                <Button asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
