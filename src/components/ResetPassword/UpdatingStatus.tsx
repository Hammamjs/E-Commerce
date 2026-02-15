import { Loader } from 'lucide-react';

const UpdatingStatus = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader size="sm" className="mr-2" />
      Updating Password...
    </div>
  );
};

export default UpdatingStatus;
