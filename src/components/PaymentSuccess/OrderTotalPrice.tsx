type OrderTotalPriceProps = {
  orderTotalPrice: number;
};

const OrderTotalPrice = ({ orderTotalPrice }: OrderTotalPriceProps) => {
  return (
    <div className="bg-gradient-primary p-4 rounded-lg text-center mb-6">
      <div className="text-primary-foreground">
        <p className="text-sm opacity-90 mb-1">Total Paid</p>
        <p className="text-3xl font-bold">${orderTotalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderTotalPrice;
