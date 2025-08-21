import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import useHeader from '@/hooks/useHeader';
import useSearchBox from '@/hooks/useSearchBox';

const SearchBox = () => {
  const { isOpen, setIsOpen, closePopover } = useHeader();
  const { filterSrearch, handleInputChange, handleSubmitSearch, search } =
    useSearchBox();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-secondary shadow-md w-screen h-full">
        <Input
          type="text"
          placeholder="Search ...."
          value={search}
          onChange={handleInputChange}
        />
        {search && (
          <div className="result p-2">
            {filterSrearch.length ? (
              filterSrearch.map((match) => (
                <Link
                  onClick={() => handleSubmitSearch(closePopover)}
                  to={`/product-details/${match._id}`}
                  className="w-full p-1 hover:bg-gray-700 transition flex"
                >
                  {match.name}
                </Link>
              ))
            ) : (
              <p className="p-2 text-center">No result matched</p>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchBox;
