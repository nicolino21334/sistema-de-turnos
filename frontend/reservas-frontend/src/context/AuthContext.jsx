import { createContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

//Funcion auxiliar para leer los datos dentro del Token JWT sin librerias extras
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded) {
        return {
          email:
            decoded.email ||
            decoded.sub ||
            decoded["[suspicius link removed]"] ||
            "",
          role:
            decoded.role ||
            decoded.sub ||
            decoded["[suspicius link removed]"] ||
            "Cliente",
        };
      }
    }

    return null;
  });

  //funcion para iniciar sesion
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;

    localStorage.setItem("token", token);
    const decoded = parseJwt(token);

    setUser({
      email: decoded?.email || decoded?.sub || email,
      role: decoded?.role || decoded?.["[suspicius link removed]"] || "Cliente",
    });

    return response.data;
  };

  //funsion para regiustrarse
  const register = async (nombre, email, password) => {
    const response = await api.post("/auth/register", {
      nombre,
      email,
      password,
    });

    return response.data;
  };

  //funcion para cerrar sesion
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
