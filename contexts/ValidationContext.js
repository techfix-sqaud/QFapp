import React, { useReducer } from "react";
import {
  validationReducer,
  initialValidationState,
} from "./ValidationProvider";

const ValidationContext = React.createContext();

export const ValidationReducer = ({ children }) => {
  const [state, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );

  return (
    <ValidationContext.Provider value={{ state, validationDispatch }}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationContext;
