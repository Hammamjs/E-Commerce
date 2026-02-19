import { Mail, MapPin, Phone } from 'lucide-react';

type UserInformationProps = {
  email: string;
  phone: string;
  address: string;
};

const UserInformation = ({ email, phone, address }: UserInformationProps) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-center space-x-2 text-foreground/80">
        <Mail className="h-4 w-4" />
        <span className="truncate">{email}</span>
      </div>
      <div className="flex items-center justify-center space-x-2 text-foreground/80">
        <Phone className="h-4 w-4" />
        <span>{phone || 'Number not set yet'}</span>
      </div>
      <div className="flex items-center justify-center space-x-2 text-foreground/80">
        <MapPin className="h-4 w-4" />
        <span className="text-center">{address || 'Missing info'}</span>
      </div>
    </div>
  );
};

export default UserInformation;
