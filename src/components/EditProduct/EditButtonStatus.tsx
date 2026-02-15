import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

type Props = {
  isUpdating: boolean;
};

const EditButtonStatus = ({ isUpdating }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 pt-6">
      <Button type="submit" className="flex-1" variant="hero">
        {isUpdating ? 'Updating...' : 'Update Product'}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(-1)}
        className="flex-1"
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditButtonStatus;
