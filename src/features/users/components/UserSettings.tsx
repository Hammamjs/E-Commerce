import { TabsContent } from '@radix-ui/react-tabs';
import { Button } from '../../../components/ui/button';
import UpdateUserPassword from './UpdateUserPassword';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import type { Dispatch, SetStateAction } from 'react';
import type { UserInfo } from '@/features/users/types/User';

type UserSettingsProps = {
  changePass: boolean;
  showPassword: boolean;
  user: UserInfo;
  updateUser: (user: keyof Partial<UserInfo>, val: string) => void;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  setChangePass: Dispatch<SetStateAction<boolean>>;
  handleUpdateUserPassword: () => void;
};

const UserSettings = ({
  changePass,
  handleUpdateUserPassword,
  setChangePass,
  setShowPassword,
  showPassword,
  updateUser,
  user,
}: UserSettingsProps) => {
  return (
    <TabsContent value="settings" className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-foreground/60">
                  Receive emails about your orders and promotions
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-foreground/60">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Privacy Settings</h4>
                <p className="text-sm text-foreground/60">
                  Control how your data is used and shared
                </p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            {/* Update user password */}
            <UpdateUserPassword
              changePass={changePass}
              handleUpdateUserPassword={handleUpdateUserPassword}
              setChangePass={setChangePass}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
              updateUser={updateUser}
              user={user}
            />
          </div>

          <div className="pt-6 border-t border-border">
            <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
              <div>
                <h5 className="font-medium">Delete Account</h5>
                <p className="text-sm text-foreground/60">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UserSettings;
