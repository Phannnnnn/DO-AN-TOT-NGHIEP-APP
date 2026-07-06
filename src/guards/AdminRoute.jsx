import { useEffect } from "react";
import { useAuth, useModalAuth, useNotification } from "../context/ContextProvider";
import LoadingComponent from "../components/common/LoadingComponent";

export default function ManagerRoute({ children }) {
 const { user, isLoading } = useAuth();
 const { openLogin } = useModalAuth();
 const toast = useNotification();

 const isAdmin = user?.role === "ADMIN";

 useEffect(() => {
 if (isLoading) {
 return;
 }

 if (!user || !isAdmin) {
 toast.info("Thông báo", "Vui lòng đăng nhập bằng tài khoản quản trị viên.");
 openLogin();
 }
 }, [user, isAdmin, openLogin, isLoading]);

 if (isLoading) {
 return <LoadingComponent />;
 }

 if (!user || !isAdmin) {
 return null;
 }

 return children;
}
