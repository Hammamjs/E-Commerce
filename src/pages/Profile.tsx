import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Settings,
  Camera,
  Lock,
  EyeOff,
  Eye,
} from 'lucide-react';

import useOrders from '@/hooks/use-orders';
import useProfile from '@/hooks/use-profile';

const Profile = () => {
  // const orderHistory = [
  //   {
  //     id: 'ORD-2024-001',
  //     date: '2024-01-15',
  //     status: 'Delivered',
  //     total: 299.99,
  //     items: 2,
  //   },
  //   {
  //     id: 'ORD-2024-002',
  //     date: '2024-01-10',
  //     status: 'Processing',
  //     total: 599.99,
  //     items: 1,
  //   },
  //   {
  //     id: 'ORD-2024-003',
  //     date: '2024-01-05',
  //     status: 'Shipped',
  //     total: 189.99,
  //     items: 3,
  //   },
  // ];

  const { orders } = useOrders();
  const {
    user,
    cart,
    changePass,
    favorites,
    getStatusColor,
    handleOnImageChange,
    handleUpdateUser,
    handleUpdateUserPassword,
    setChangePass,
    setShowPassword,
    showPassword,
    updateUser,
    staticEndpoint,
  } = useProfile();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border-border/20">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`${staticEndpoint}/${user?.profileImg}`}
                    />
                    <AvatarFallback className="bg-gray-800">
                      {user?.username[0]}
                    </AvatarFallback>
                  </Avatar>
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
                <p className="text-foreground/60 text-sm mb-4">
                  Premium Member
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-foreground/80">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-foreground/80">
                    <Phone className="h-4 w-4" />
                    <span>{user?.phone || 'Number not set yet'}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-foreground/80">
                    <MapPin className="h-4 w-4" />
                    <span className="text-center">
                      {user?.address || 'Missing info'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {orders?.length}
                    </div>
                    <div className="text-xs text-foreground/60">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {favorites?.length}
                    </div>
                    <div className="text-xs text-foreground/60">Favorites</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {cart.items?.length}
                    </div>
                    <div className="text-xs text-foreground/60">Cart Items</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
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
                          onChange={(e) =>
                            updateUser('username', e.target.value)
                          }
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
                          onChange={(e) =>
                            updateUser('address', e.target.value)
                          }
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
                      {orders?.map((order) => (
                        <div
                          key={order._id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{order._id}</span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground/60">
                              {new Date(order.createdAt).toLocaleDateString()} •{' '}
                              {order.quantity} items
                            </p>
                          </div>
                          <div className="flex items-center justify-between md:justify-end space-x-4 mt-2 md:mt-0">
                            <span className="text-lg font-bold text-primary">
                              ${order.totalPrice}
                            </span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
                          <h4 className="font-medium">
                            Two-Factor Authentication
                          </h4>
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

                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-foreground/60">
                            Update your account password
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setChangePass((prev) => !prev)}
                        >
                          {changePass ? 'Hide' : 'Change'}
                        </Button>
                      </div>
                      {changePass && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Current password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Current password"
                                value={user?.currentPassword ?? ''}
                                className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                                onChange={(e) =>
                                  updateUser('currentPassword', e.target.value)
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New password"
                                value={user?.password ?? ''}
                                className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                                onChange={(e) =>
                                  updateUser('password', e.target.value)
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              Password confirmation
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                                onChange={(e) =>
                                  updateUser('passwordConfirm', e.target.value)
                                }
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <Button onClick={handleUpdateUserPassword}>
                            Update password
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="pt-6 border-t border-border">
                      <h4 className="font-medium text-destructive mb-2">
                        Danger Zone
                      </h4>
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
