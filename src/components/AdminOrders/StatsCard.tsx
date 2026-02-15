import { Package } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { capitalize } from '@/utils/capitalize';

type StatsCardProps = {
  status: number;
  statusname: string;
};

const StatsCard = ({ status, statusname }: StatsCardProps) => {
  const capitalizeStatus = capitalize(statusname);
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {capitalizeStatus} Orders
            </p>
            <p className="text-2xl font-bold text-foreground">{status}</p>
          </div>
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <Package className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
