import useProfile from '@/features/users/hooks/useProfile';
import UserProfileSidebar from './UserProfileSidebar';
import useOrders from '@/hooks/use-orders';
import MainSection from './MainSection';
import { useCart } from '@/features/cart';
import useProfileUIState from '../hooks/useProfileUIState';
import { useGetFavoritesQuery } from '@/features/favorites/query/useFavoritesQuery';

const Profile = () => {
  const { orders } = useOrders({});
  const { changePass, setChangePass, setShowPassword, showPassword } =
    useProfileUIState();

  const { user, handleOnImageChange, handleUpdateUserPassword, updateUser } =
    useProfile();

  const { data: favorites, isLoading } = useGetFavoritesQuery();

  const { cart } = useCart();

  if (!user) return;

  if (isLoading) return <h1>Loading ...</h1>;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <UserProfileSidebar
            cartItemsLength={cart.items.length}
            favoritesLength={favorites.length}
            handleOnImageChange={handleOnImageChange}
            ordersLength={orders.length}
            user={user}
          />

          {/* Main Content */}
          <MainSection
            changePass={changePass}
            // handleUpdateUser={handleUpdateUser}
            handleUpdateUserPassword={handleUpdateUserPassword}
            orders={orders}
            setChangePass={setChangePass}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            updateUser={updateUser}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
