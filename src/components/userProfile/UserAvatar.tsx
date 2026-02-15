import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { AvatarImage } from '../ui/avatar';
import { staticEndpoint } from '@/api/BaseUrl';

type UserAvatarProps = {
  profileImg: string;
  username: string;
};

const UserAvatar = ({ profileImg, username }: UserAvatarProps) => {
  return (
    <Avatar className="h-24 w-24">
      <AvatarImage src={`${staticEndpoint}/${profileImg}`} />
      <AvatarFallback className="bg-gray-800">{username}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
