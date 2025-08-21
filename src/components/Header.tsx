import { ShoppingBag, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { NotificationDropdown } from './NotificationDropdown';
import MobileMenu from './MobileMenu';
import useHeader from '@/hooks/useHeader';
import SearchBox from './SearchBox';

const Header = () => {
  const { favorites, isActive, totalItems, user } = useHeader();
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 py-4 flex gap-3 flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              E-store
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBox />

          {user?.username && <NotificationDropdown />}

          {!user?.username && (
            <div className="md:flex items-center space-x-2">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          {user?.username && (
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          {user?.username && (
            <Link to="/favorites" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {favorites && favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>
          )}
          {user?.username && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          )}
          <MobileMenu isActive={isActive} />
        </div>
      </div>
    </header>
  );
};

export default Header;
