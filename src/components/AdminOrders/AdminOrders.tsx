import { Footer } from 'react-day-picker';
import StatsCard from './StatsCard';
import TotalRevenue from './TotalRevenue';
import OrderTable from './OrderTable';
import Header from '../Header';
import useAdminOrders from '@/hooks/use-adminOrders';

type Props = {};

export default function AdminOrders({}: Props) {
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
            <StatsCard status={stats.pending} statusname="pending" />

            <StatsCard status={stats.shipped} statusname="shipped" />

            <StatsCard status={stats.delivered} statusname="delivered" />

            <TotalRevenue totalRevenue={stats.totalRevenue} />
          </div>

          {/* Orders Table */}
          <OrderTable
            orders={orders}
            getStatusColor={getStatusColor}
            getStatusDot={getStatusDot}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
