import useAdminProducts from '@/hooks/use-adminProducts';
import AdminProductHeader from './AdminProductHeader';
import AdminTableRowList from './AdminTableRowList';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableHeader } from '../ui/table';
import AdminProductsList from './AdminProductsList';

type Props = {};

const AdminProduct = ({}: Props) => {
  const { setSearchKey, filteredProducts, products } = useAdminProducts();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AdminProductHeader />

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
                <AdminTableRowList />
              </TableHeader>
              <TableBody>
                <AdminProductsList filteredProducts={filteredProducts} />
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProduct;
