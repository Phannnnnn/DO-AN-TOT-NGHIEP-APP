import ModalAuthProvider from "../context/authContext/ModalAuthProvider";
import AuthProvider from "./authContext/AuthProvider";
import BookingProvider from "./BookingConText/BookingProvider";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ModalAuthProvider>
        <BookingProvider>{children}</BookingProvider>
      </ModalAuthProvider>
    </AuthProvider>
  );
};

export default ContextProvider;

export { useAuth } from "./authContext/AuthProvider";
export { useBooking } from "./BookingConText/BookingProvider";
export { useModalAuth } from "./authContext/ModalAuthProvider";
