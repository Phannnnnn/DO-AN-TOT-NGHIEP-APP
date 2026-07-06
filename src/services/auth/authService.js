import apiClient from "../../api/axios.custom";
import { API_ENDPOINTS } from "../../api/endpoints";

export const authService = {
 login: (loginData) => {
 const { userName, password } = loginData;
 return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { userName, password });
 },

 register: (registerData) => {
 const { userName, fullName, email, password } = registerData;
 return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
 userName,
 fullName,
 email,
 password,
 });
 },

 profile: () => {
 return apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
 },

 refreshToken: (refreshToken) => {
 return apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
 },
};
