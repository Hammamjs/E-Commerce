import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import CustomAlertDialog from '../CustomAlertDialog';
import type { Product } from '@/types/product';

type AdminProductCardProps = {
  product: Product;
};

const AdminProductCard = ({ product }: AdminProductCardProps) => {
  return (
    <TableRow>
      <TableCell>
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-md"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">${product.discountPrice}</span>
          {product.discountPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={product.inStock ? 'default' : 'destructive'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span>{product.ratings.average}/5</span>
          <span className="text-sm text-muted-foreground">
            ({product.ratings.count} reviews)
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Link to={`/edit-product/${product._id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <CustomAlertDialog name={product.name} id={product._id} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AdminProductCard;
