import axios from "axios";

if (!import.meta.env.VITE_API_URL) {
  // throw new Error("VITE_API_URL is not defined in .env");
  console.warn(
    "[api] VITE_API_URL não definida. Usando fallback local: http://localhost:3000/api",
  );
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;
      // Don't redirect on auth pages — let them show the error message
      const isAuthPage = path === "/login" || path === "/signup" || path === "/";
      if (!isAuthPage) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("_up");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
