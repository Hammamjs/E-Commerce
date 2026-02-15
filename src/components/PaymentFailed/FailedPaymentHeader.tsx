import { Badge, CreditCard } from 'lucide-react';

type FailedPaymentHeaderProps = {
  cartId: string;
};

const FailedPaymentHeader = ({ cartId }: FailedPaymentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-500/10 rounded-lg">
          <CreditCard className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Order #{cartId}
          </h3>
          <p className="text-sm text-muted-foreground">
            Payment processing failed
          </p>
        </div>
      </div>
      <Badge className="bg-red-500/10 text-red-600 border-red-500/20 px-3 py-1">
        Failed
      </Badge>
    </div>
  );
};

export default FailedPaymentHeader;
