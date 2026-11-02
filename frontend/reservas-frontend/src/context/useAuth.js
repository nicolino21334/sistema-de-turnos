import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: async () => {},
      register: async () => {},
      logout: () => {},
    };
  }
  return context;
};

export default useAuth;
