import type { Product } from '@/types/product';
import AdminProductCard from './AdminProductCard';

type Props = {
  filteredProducts: Product[];
};

const AdminProductsList = ({ filteredProducts }: Props) => {
  return filteredProducts.map((product) => (
    <AdminProductCard product={product} key={product._id} />
  ));
};

export default AdminProductsList;
