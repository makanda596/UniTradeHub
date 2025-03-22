import React from 'react'

const Logout = ({ logout }) => {

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