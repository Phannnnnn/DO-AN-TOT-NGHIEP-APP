import { useEffect } from "react";
import { useAuth, useModalAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";
import LoadingComponent from "../components/common/LoadingComponent";

export default function ManagerRoute({ children }) {
  const { user, isLoading } = useAuth();
  const { openLogin } = useModalAuth();

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user || !isAdmin) {
      toast.info("Vui lòng đăng nhập bằng tài khoản quản trị viên.");
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
