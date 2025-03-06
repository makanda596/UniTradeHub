import React from 'react'
import { useAuthStore } from '../utilis/auth';

const Logout = () => {
    const { logout } = useAuthStore();

    const logoutHandle = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch (error) {
            alert(error.message);
        }
    };
  return (
      <div onClick={logoutHandle} > Logout</div>
  )
}

export default Logout