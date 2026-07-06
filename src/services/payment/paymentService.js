import apiClient from "@/api/axios.custom";
import { API_ENDPOINTS } from "@/api/endpoints";

export const paymentService = {
  createPayment: (bookingId) => {
    return apiClient.post(API_ENDPOINTS.PAYMENT.CREATE_PAYMENT(bookingId));
  },

  payCash: (bookingId) => {
    return apiClient.post(API_ENDPOINTS.PAYMENT.PAY_CASH(bookingId));
  },

  handleIpn: (params) => {
    return apiClient.get(API_ENDPOINTS.PAYMENT.IPN, { params });
  },

  handleServiceIpn: (params) => {
    return apiClient.get(API_ENDPOINTS.PAYMENT.SERVICE_IPN, { params });
  },

  verifyReturn: (params) => {
    return apiClient.get(API_ENDPOINTS.PAYMENT.VERIFY_RETURN, { params });
  },
};
