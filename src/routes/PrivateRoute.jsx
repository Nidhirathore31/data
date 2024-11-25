import React from 'react';


const PrivateRoute = ({ Component }) => {
  const userToken = localStorage.getItem("token")
  return (
    <>
      {
        !userToken || userToken == "undefined" ? <Navigator to='/login' /> : <Component />
      }
    </>
  )
}

export default PrivateRoute