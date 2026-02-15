import { Card, CardContent } from '../ui/card';
import { DollarSign } from 'lucide-react';

type TotalRevenueProps = {
  totalRevenue: number;
};

const TotalRevenue = ({ totalRevenue }: TotalRevenueProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalRevenue;
