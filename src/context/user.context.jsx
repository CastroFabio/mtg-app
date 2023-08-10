import { createContext, useState } from "react";

//valor que voce quer acessar
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//Provider é o componente funcional
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
