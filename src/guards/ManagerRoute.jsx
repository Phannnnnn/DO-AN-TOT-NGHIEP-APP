import { useEffect } from "react";
import { useAuth, useModalAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";
import LoadingComponent from "../components/common/LoadingComponent";

export default function ManagerRoute({ children }) {
  const { user, isLoading } = useAuth();
  const { openLogin } = useModalAuth();

  const isManager = user?.role === "MANAGER";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user || !isManager) {
      toast.info("Vui lòng đăng nhập bằng tài khoản quản lý.");
      openLogin();
    }
  }, [user, isManager, openLogin, isLoading]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!user || !isManager) {
    return null;
  }

  return children;
}
