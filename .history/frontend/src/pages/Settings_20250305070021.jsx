import React from 'react'
import { useAuthStore } from '../utilis/auth';

const Settings = () => {
      const { user } = useAuthStore();
      console.log(user?.email)
  return (
      <div>  <p>{user?.email}</p></div>
  )
}

export default Settings