import { Badge } from '../ui/badge';

type AvialableSizesProps = { size: string[] };

const AvialableSizes = ({ size }: AvialableSizesProps) => {
  return (
    size && (
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium">Size:</span>
        <Badge variant="outline">{size}</Badge>
      </div>
    )
  );
};

export default AvialableSizes;
