import { AuthContext } from "@core/contexts";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
