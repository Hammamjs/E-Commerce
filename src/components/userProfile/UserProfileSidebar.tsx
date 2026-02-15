import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Camera } from 'lucide-react';
import UserAvatar from './UserAvatar';
import UserInformation from './UserInformation';
import UserPreference from './UserPreference';
import type { UserInfo } from '@/types/User';

type UserProfileSidebarProps = {
  user: UserInfo;
  cartItemsLength: number;
  favoritesLength: number;
  ordersLength: number;
  handleOnImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
};

const UserProfileSidebar = ({
  user,
  cartItemsLength,
  favoritesLength,
  ordersLength,
  handleOnImageChange,
}: UserProfileSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardContent className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <UserAvatar
              profileImg={user.profileImg}
              username={user.username[0]}
            />
            <Button
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              variant="secondary"
            >
              <Input
                type="file"
                className="hidden"
                id="img"
                onChange={handleOnImageChange}
              />
              <label className="cursor-pointer" htmlFor="img">
                <Camera className="h-4 w-4" />
              </label>
            </Button>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            {user?.username}
          </h2>
          <p className="text-foreground/60 text-sm mb-4">Premium Member</p>

          {/* User information */}
          <UserInformation
            address={user.address}
            email={user.email}
            phone={user.phone}
          />

          {/* User preference */}
          <UserPreference
            cartItemsLength={cartItemsLength}
            favoritesLength={favoritesLength}
            orderLength={ordersLength}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileSidebar;
