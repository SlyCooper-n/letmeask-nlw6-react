import React, { ReactNode, useContext } from "react";

export const AuthContext = React.createContext({} as any);

export const AppProvider = (props: { children: ReactNode | ReactNode[] }) => {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
};
