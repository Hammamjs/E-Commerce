import { useMutation, useQueryClient } from '@tanstack/react-query';
import handleError from '@/shared/utils/ErrorHandler';
import { toast } from '@/hooks/use-toast';

type BaseMutationsOptions<TData, TVariables> = {
  mutationFn: (variables: TVariables) => Promise<TData>;
  successMessage?: string;
  invalidatedKeys?: string[];
  onSuccess?: (data: TData) => void;
};

export const useBaseMutation = <TData, TVariables>({
  invalidatedKeys,
  mutationFn,
  onSuccess,
  successMessage,
}: BaseMutationsOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onError: (err) => handleError(err, 'cart'),
    onSuccess: (data) => {
      if (invalidatedKeys) {
        invalidatedKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      if (successMessage) {
        toast({ title: successMessage });
      }

      onSuccess?.(data);
    },
  });
};
