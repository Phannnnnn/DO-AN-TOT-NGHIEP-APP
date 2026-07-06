export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
    REFRESH_TOKEN: "auth/refresh-token",
    PROFILE: "auth/profile",
  },

  BOOKING: {
    BOOKINGS: "booking",
    BOOKINGS_BY_ID: (id) => `booking/${id}`,
    BOOKING_AVAILBLE_ROOMS: "booking/available-rooms",
    BOOKING_STATUS: (id) => `booking/${id}/status`,
    BOOKING_CHECK_IN: (id) => `booking/${id}/check-in`,
    BOOKING_CHECK_OUT: (id) => `booking/${id}/check-out`,
    MY_BOOKINGS: "booking/my-bookings",
    CANCEL_BOOKING: (id) => `booking/${id}/cancel`,
  },

  ROOM: {
    ROOMS: "rooms",
    ROOM_BY_ID: (id) => `rooms/${id}`,
  },

  SERVICE: {
    SERVICES: "service",
  },

  BOOKING_SERVICE: {
    ADD_SERVICE: (bookingDetailId) => `booking-service/${bookingDetailId}`,
  },

  ROOM_HOLD: {
    HOLD: "/room-hold",
    RELEASE: (sessionId) => `/room-hold/${sessionId}`,
  },

  PAYMENT: {
    CREATE_PAYMENT: (id) => `payment/create-payment/${id}`,
    PAY_CASH: (id) => `payment/pay-cash/${id}`,
    IPN: "payment/ipn",
    SERVICE_IPN: "payment/service-ipn",
    VERIFY_RETURN: "payment/verify-return",
  },

  CLOUDINARY: {
    GENERATE_SIGNATURE: "cloudinary/sign",
    UPLOAD: (cloudName) =>
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  },

  USER: {
    GET_BY_ID: (id) => `user/${id}`,
    CHANGE_PASSWORD: (id) => `user/${id}/change-password`,
  },

  CUSTOMER: {
    UPDATE: (id) => `customer/${id}`,
  },
};
