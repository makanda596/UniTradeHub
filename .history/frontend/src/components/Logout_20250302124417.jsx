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
      <div onClick={logoutHandle} > Logou</div>
  )
}

export default Logout