import { useEffect } from "react";
import { useAuth, useModalAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";
import LoadingComponent from "../components/common/LoadingComponent";

export default function ManagerRoute({ children }) {
  const { user, isLoading } = useAuth();
  const { openLogin } = useModalAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      toast.info("Vui lòng đăng nhập bằng tài khoản quản lý.");
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
