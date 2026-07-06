import { useEffect } from "react";
import { useAuth, useModalAuth, useNotification } from "../context/ContextProvider";
import LoadingComponent from "../components/common/LoadingComponent";

export default function ManagerRoute({ children }) {
 const { user, isLoading } = useAuth();
 const { openLogin } = useModalAuth();
 const toast = useNotification();

 useEffect(() => {
 if (isLoading) {
 return;
 }

 if (!user) {
 toast.info("Thông báo", "Vui lòng đăng nhập bằng tài khoản quản lý.");
 openLogin();
 }
 }, [user, openLogin, isLoading]);

 if (isLoading) {
 return <LoadingComponent />;
 }

 if (!user) {
 return null;
 }

 return children;
}
