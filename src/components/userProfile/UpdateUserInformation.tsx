import { TabsContent } from '@radix-ui/react-tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import type { UserInfo } from '@/types/User';

type UpdateUserInformationProps = {
  updateUser: (user: keyof Partial<UserInfo>, value: string) => void;
  handleUpdateUser: (updatedUser: Partial<UserInfo>) => void;
  user: UserInfo;
};

const UpdateUserInformation = ({
  updateUser,
  user,
  handleUpdateUser,
}: UpdateUserInformationProps) => {
  return (
    <TabsContent value="profile" className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and bio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={user?.username}
                onChange={(e) => updateUser('username', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user?.email}
                onChange={(e) => updateUser('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={user?.phone}
                onChange={(e) => updateUser('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={user?.address}
                onChange={(e) => updateUser('address', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={user?.bio}
              onChange={(e) => updateUser('bio', e.target.value)}
            />
          </div>
          <Button onClick={() => handleUpdateUser(user ?? {})}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UpdateUserInformation;
