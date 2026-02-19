import { LogUserIn } from '@/api/UserApi';
import type { UserInfo } from '@/features/users/types/User';
import { useBaseMutation } from '@/shared/lib/react-query/useBaseMutation';

// const useLoginMutation = () => {
//   const { mutate } = useMutation({
//     mutationFn: LogUserIn,
//     onSuccess: (data) => {
//       setUser(data.user);
//       addToLocalstorage('user', data.user);
//       setTimeout(() => {
//         navigate(from, { replace: true });
//       }, 10);
//     },
//     // onError: (error) => {
//     //   console.log(error);
//     //   if (axios.isAxiosError(error)) {
//     //     const message = error?.response?.data?.message ?? error?.response?.data;
//     //     toast.error(message);
//     //   }
//     // },
//   });
//   return {};
// };

type useLoginMutationParams = {
  onSuccess: (data: { user: UserInfo }) => void;
};

export const useLoginMutation = ({ onSuccess }: useLoginMutationParams) =>
  useBaseMutation<{ user: UserInfo }, { email: string; password: string }>({
    mutationFn: LogUserIn,
    onSuccess,
    successMessage: 'Logged in',
  });

export default useLoginMutation;
