import { useState } from 'react';

const useProfileUIState = () => {
  const [changePass, setChangePass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return {
    changePass,
    setChangePass,
    showPassword,
    setShowPassword,
  };
};

export default useProfileUIState;
