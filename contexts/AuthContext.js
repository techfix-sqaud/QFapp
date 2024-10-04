import React, { useReducer } from "react";
import { authReducer, initialState } from "./AuthProvider";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ userState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
