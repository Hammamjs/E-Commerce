import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import UpdateUserInformation from './UpdateUserInformation';
import UserSettings from './UserSettings';
import { Package, Settings, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import UserOrderList from './UserOrderList';
import type { UserInfo } from '@/features/users/types/User';
import type { OrdersType } from '@/types/Orders';
import type { Dispatch, SetStateAction } from 'react';

type MainSectionProps = {
  changePass: boolean;
  user: UserInfo;
  orders: OrdersType[];
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  setChangePass: Dispatch<SetStateAction<boolean>>;
  updateUser: (user: keyof Partial<UserInfo>, value: string) => void;
  // handleUpdateUser: (updatedUser: Partial<UserInfo>) => void;
  handleUpdateUserPassword: () => void;
};

const MainSection = ({
  // handleUpdateUser,
  updateUser,
  user,
  orders,
  changePass,
  handleUpdateUserPassword,
  setChangePass,
  setShowPassword,
  showPassword,
}: MainSectionProps) => {
  return (
    <div className="lg:col-span-3">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <UpdateUserInformation
          // handleUpdateUser={handleUpdateUser}
          updateUser={updateUser}
          user={user}
        />

        <TabsContent value="orders" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track your recent orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <UserOrderList orders={orders} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <UserSettings
          changePass={changePass}
          handleUpdateUserPassword={handleUpdateUserPassword}
          setChangePass={setChangePass}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          updateUser={updateUser}
          user={user}
        />
      </Tabs>
    </div>
  );
};

export default MainSection;
