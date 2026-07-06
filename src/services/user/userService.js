import apiClient from "../../api/axios.custom";
import { API_ENDPOINTS } from "@/api/endpoints";

export const userService = {

 getUserById: (id) => {
 return apiClient.get(API_ENDPOINTS.USER.GET_BY_ID(id));
 },

 updateCustomer: (customerId, customerData) => {
 return apiClient.patch(API_ENDPOINTS.CUSTOMER.UPDATE(customerId), customerData);
 },

 /**
 * Change user password.
 * @param {number|string} userId - The user ID
 * @param {object} changePasswordData - { currentPassword, newPassword }
 * @returns {Promise<any>}
 */
 changePassword: (userId, changePasswordData) => {
 return apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD(userId), changePasswordData);
 },
};
