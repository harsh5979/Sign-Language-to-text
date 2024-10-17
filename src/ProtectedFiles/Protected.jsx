
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/contextapi';

// const Privated = ({ element: Component }) => {
    
//   const { islogin } = useAuth();

//   return islogin ? Component : <Navigate to="/adminlogin" />;
// };

// export default Privated;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/contextapi';

const Privated = ({ element: Component, adminOnly = false }) => {
  const { isLogin, user,userType } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" />;
  } 

  if (adminOnly && (!user || userType!=="admin")) {
    return <Navigate to="*" />;
  }

  return Component;
};

export default Privated;
