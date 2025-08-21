import { Link } from 'react-router-dom';
import { Popover, PopoverContent } from './ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import useHeader from '@/hooks/useHeader';
import { memo } from 'react';
type Links = {
  name: string;
  path: string;
  allowedTo: ('USER' | 'ADMIN' | 'GUEST')[];
};
const links: Links[] = [
  {
    name: 'Home',
    path: '/',
    allowedTo: ['USER', 'ADMIN', 'GUEST'],
  },
  {
    name: 'Products',
    path: '/products',
    allowedTo: ['USER', 'ADMIN', 'GUEST'],
  },
  {
    name: 'Categories',
    path: '/categories',
    allowedTo: ['USER', 'ADMIN', 'GUEST'],
  },
  {
    name: 'Add Product',
    path: '/add-product',
    allowedTo: ['ADMIN'],
  },
  {
    name: 'Admin Products',
    path: '/dashboard/admin-products',
    allowedTo: ['ADMIN'],
  },
  {
    name: 'Admin Orders',
    path: '/dashboard/admin-orders',
    allowedTo: ['ADMIN'],
  },
  {
    name: 'Profile',
    path: '/profile',
    allowedTo: ['USER', 'ADMIN'],
  },
  {
    name: 'Orders',
    path: '/orders',
    allowedTo: ['USER'],
  },
  {
    name: 'Logout',
    path: '/logout',
    allowedTo: ['USER', 'ADMIN'],
  },
];

const roleLinksMap = {
  USER: links.filter((link) => link.allowedTo.includes('USER')),
  ADMIN: links.filter((link) => link.allowedTo.includes('ADMIN')),
  GUEST: links.filter((link) => link.allowedTo.includes('GUEST')),
};

const RouteLink = memo(
  ({
    isActive,
    link,
    onSelect,
  }: {
    link: Links;
    isActive: (path: string) => boolean;
    onSelect: (link: Links) => void;
  }) => {
    return (
      <Link
        onClick={() => onSelect(link)}
        to={link.path === '/logout' ? '/' : link.path}
        className={`block w-full hover:bg-gray-900 transition p-2 ${
          isActive(link.path) ? 'text-primary font-medium' : ''
        }`}
      >
        {link.name}
      </Link>
    );
  }
);

const MobileMenu = ({ isActive }: { isActive: (path: string) => boolean }) => {
  const { isOpen, setIsOpen, handleCloseAndSignout, user } = useHeader();

  const filterLinks = user ? roleLinksMap[user.role] : roleLinksMap.GUEST;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {filterLinks.map((filteredLink) => (
          <RouteLink
            key={filteredLink.path}
            onSelect={() => handleCloseAndSignout({ link: filteredLink })}
            isActive={() => isActive(filteredLink.path)}
            link={filteredLink}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MobileMenu;
