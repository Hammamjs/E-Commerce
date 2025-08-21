import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/Orders';
import { useCallback, useEffect, useState } from 'react';
import type { OrdersType } from '@/types/Orders';
import { useOrdersStore } from '@/stores/useOrderStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';
import { useToast } from './use-toast';
import { createOrder } from '@/api/PaymentApi';
import { loadStripe } from '@stripe/stripe-js';
import { addToLocalstorage } from '@/utils/LocalStorage';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);

const useOrders = ({ id }: { id?: string }) => {
  const { data } = useQuery<{ data: OrdersType[] }, Error, OrdersType[]>({
    queryKey: ['user-orders'],
    queryFn: getOrders,
    select: (res) => res.data,
    staleTime: 60 * 1000 * 5, // 5 Min
  });

  const { setOrders, orders } = useOrdersStore(
    useShallow((state) => ({
      setOrders: state.setOrders,
      orders: state.orders,
    }))
  );

  useEffect(() => {
    if (data) {
      setOrders(data ?? []);
    }
  }, [data, setOrders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const handlePaymentIfAuthenticated = async () => {
    if (!user?.username) {
      toast({ title: 'Not authenticated', description: 'Please Sign in' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    await handlePayment();
  };

  const handlePayment = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await createOrder(id || '');
      addToLocalstorage('order', response.data.data);

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
      if (error) throw error;
    } catch (err) {
      console.error(err);
      toast({
        title: 'Payment failed',
        description: 'Could not process payment',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  return {
    getStatusColor,
    orders,
    isLoading,
    handlePaymentIfAuthenticated,
    handlePayment,
  };
};

export default useOrders;
