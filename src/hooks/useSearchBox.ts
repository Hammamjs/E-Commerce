import { useMemo, useState, type ChangeEvent } from 'react';
import { useProductsStore } from '@/stores/product/useProductsStore';

const useSearchBox = () => {
  const [search, setSearch] = useState<string>('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const products = useProductsStore((state) => state.items);

  const filterSrearch = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const handleSubmitSearch = (closePopover: () => void) => {
    closePopover();
    setSearch('');
  };
  return {
    search,
    setSearch,
    handleInputChange,
    handleSubmitSearch,
    filterSrearch,
  };
};

export default useSearchBox;
