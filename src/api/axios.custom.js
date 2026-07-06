import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    const data = response?.data || response;
    if (data?.success === false) {
      return Promise.reject(data);
    }
    return data;
  },
  async (error) => {
    const originalRequest = error.config;

    // 1. Kiểm tra xem request bị lỗi có phải là request Đăng nhập hoặc Refresh Token không
    // Bạn có thể dùng API_ENDPOINTS.AUTH.LOGIN hoặc check chuỗi URL tùy thuộc vào cấu trúc dự án của bạn
    const isAuthRequest =
      originalRequest.url?.includes("login") ||
      originalRequest.url?.includes("refresh");

    // 2. Chỉ tự động refresh token nếu ĐÓ KHÔNG PHẢI là request login/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const res = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
          refreshToken,
        });
        const { access_token, refresh_token } = res.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    // Nếu là lỗi từ request Login, nó sẽ lọt xuống đây và trả về cho file LoginPage xử lý toast.error
    return Promise.reject(error.response?.data || error);
  },
);

export default apiClient;
