import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogDescription,
} from '@radix-ui/react-alert-dialog';
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import useAdminProducts from '@/hooks/use-adminProducts';

interface CustomAlertDialogProps {
  name: string;
  id: string;
}

const CustomAlertDialog = ({ name, id }: CustomAlertDialogProps) => {
  const { deleteProductMutation } = useAdminProducts();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{name}
            "? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteProductMutation({
                productId: id,
              })
            }
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
