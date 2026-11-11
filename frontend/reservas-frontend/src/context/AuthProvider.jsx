import { useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const parseJwt = (token) => {
  try {
    if (!token) return null;

    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("error al decodificar jwt", error);
    return null;
  }
};

const extraerUsuario = (token, emailFallback = "") => {
  if (!token) return null;
  const decoded = parseJwt(token);
  if (!decoded) return null;

  return {
    email:
      decoded.email ||
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] ||
      emailFallback,
    nombre:
      decoded.nombre ||
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      "",
    role:
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      "Cliente",
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return extraerUsuario(token) || null;
  });

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;

    localStorage.setItem("token", token);
    //asignamos el usuario leyendo las claves dinamicamente
    const usuarioLogueado = extraerUsuario(token, email);
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
