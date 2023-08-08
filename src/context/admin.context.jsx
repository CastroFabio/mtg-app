import { createContext, useState } from "react";

//valor que voce quer acessar
export const AdminContext = createContext({
  currentAdmin: true,
  setCurrentAdmin: () => null,
});

//Provider é o componente funcional
export const AdminProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(true);
  const value = { currentAdmin, setCurrentAdmin };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
