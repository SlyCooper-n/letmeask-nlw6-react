import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const useGlobalContext = () => {
  return useContext(AuthContext);
};
