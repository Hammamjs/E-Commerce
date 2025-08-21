import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useAdminProducts from '@/hooks/use-adminProducts';
import CustomAlertDialog from '@/components/CustomAlertDialog';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { setSearchKey, filteredProducts, products } = useAdminProducts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Product Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage all products in your store
              </p>
            </div>
            <Link to="/add-product">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="my-2">
              <Input
                type="search"
                placeholder="Find product by name..."
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          ${product.discountPrice}
                        </span>
                        {product.discountPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.inStock ? 'default' : 'destructive'}
                      >
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
                        <CustomAlertDialog
                          name={product.name}
                          id={product._id}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProducts;
