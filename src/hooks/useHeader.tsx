import { logout } from '@/api/UserApi';
import { useCartStore } from '@/stores/useCartStore';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import { useUserStore } from '@/stores/useUserStore';
import { clearLocalstorage } from '@/utils/LocalStorage';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useHeader = () => {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.cart).items.length;
  const favorites = useFavoriteStore((state) => state.favorites);
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const closePopover = (): void => {
    // Delay to prevent flickering
    setTimeout(() => setIsOpen(false), 50);
  };

  const handleCloseAndSignout = useCallback(
    async ({ link }: { link: { path: string; name: string } }) => {
      {
        closePopover();
        if (link.path.includes('/logout')) {
          clearLocalstorage();
          window.location.reload();
          logout(); // Api request
        }
      }
    },
    []
  );

  const isActive = (path: string) => location.pathname === path;

  return {
    totalItems,
    favorites,
    user,
    isActive,
    isOpen,
    setIsOpen,
    handleCloseAndSignout,
    closePopover,
  };
};

export default useHeader;
