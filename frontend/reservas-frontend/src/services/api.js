import axios from "axios";

//creamos la instancia de Axios apuntando a nuestras api de c#
const api = axios.create({
  baseURL: "https://localhost:7151/api",
});

//interceptor para enviar automaticamente el Token JWT en cada peticion si el usuario esta logueado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
