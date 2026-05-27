export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    REFRESH_TOKEN: "auth/refresh-token",
  },

  BOOKING: {
    BOOKINGS: "booking",
    BOOKINGS_BY_ID: (id) => `booking/${id}`,
    BOOKING_AVAILBLE_ROOMS: "booking/available-rooms",
    BOOKING_STATUS: (id) => `booking/${id}/status`,
    BOOKING_CHECK_IN: (id) => `booking/${id}/check-in`,
    BOOKING_CHECK_OUT: (id) => `booking/${id}/check-out`,
  },

  ROOM: {
    ROOMS: "rooms",
    ROOM_BY_ID: (id) => `rooms/${id}`,
  },

  ROOM_HOLD: {
    HOLD: "/room-hold",
    RELEASE: (sessionId) => `/room-hold/${sessionId}`,
  },

  PAYMENT: {
    CREATE_PAYMENT: (id) => `payment/create-payment/${id}`,
    PAY_CASH: (id) => `payment/pay-cash/${id}`,
  },
};
