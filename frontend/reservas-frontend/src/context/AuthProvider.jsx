import { useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

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
  const obtenerUsuarioDeToken = (token) => {
    if (!token) return null;
    const decoded = parseJwt(token);
    if (!decoded) return null;

    const keys = Object.keys(decoded);
    const emailKey = keys.find((k) => k.toLowerCase().includes("email"));
    const roleKey = keys.find((k) => k.toLowerCase().includes("role"));

    return {
      email:
        decoded.email || decoded.sub || (emailKey ? decoded[emailKey] : ""),
      role: decoded.role || (roleKey ? decoded[roleKey] : "Cliente"),
    };
  };
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return obtenerUsuarioDeToken(token);
  });

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;

    localStorage.setItem("token", token);
    //asignamos el usuario leyendo las claves dinamicamente
    const usuarioLogueado = obtenerUsuarioDeToken(token) || {
      email,
      role: "Cliente",
    };
    setUser(usuarioLogueado);

    return response.data;
  };

  const register = async (nombre, email, password) => {
    const response = await api.post("/auth/register", {
      nombre,
      email,
      password,
    });
    return response.data;
  };

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
