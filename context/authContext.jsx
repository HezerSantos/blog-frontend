import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const userLogin = () => setIsAuthenticated(true);
    const userLogout = () => setIsAuthenticated(false);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, userLogin, userLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider