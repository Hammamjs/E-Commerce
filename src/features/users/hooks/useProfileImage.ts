import { updateUserImage } from '@/api/UserApi';
import type { ChangeEvent } from 'react';

type UseProfileImageParams = {
  userId: string;
  onUserUpdated: (data: any) => void;
};

const useProfileImage = ({ userId, onUserUpdated }: UseProfileImageParams) => {
  const handleOnImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files?.[0] as File;

    if (!image) return;

    const formData = new FormData();
    formData.append('profileImg', image);

    try {
      const response = await updateUserImage(userId, formData);
      onUserUpdated(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return { handleOnImageChange };
};

export default useProfileImage;
