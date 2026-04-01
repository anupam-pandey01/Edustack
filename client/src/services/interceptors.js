import api from "./api";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenService";

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/refresh-token");

        setAccessToken(res.data.accessToken);

        return api(originalRequest);

      } catch (error) {
        clearAccessToken();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);