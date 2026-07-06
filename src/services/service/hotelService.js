import apiClient from "@/api/axios.custom";
import { API_ENDPOINTS } from "@/api/endpoints";

export const hotelService = {
  getServices: () => {
    return apiClient.get(API_ENDPOINTS.SERVICE.SERVICES);
  },
};
