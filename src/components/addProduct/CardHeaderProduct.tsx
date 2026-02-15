import { CardHeader, CardTitle } from '../ui/card';
import { Upload } from 'lucide-react';

const CardHeaderProduct = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Upload className="h-5 w-5" />
        Product Information
      </CardTitle>
    </CardHeader>
  );
};

export default CardHeaderProduct;
