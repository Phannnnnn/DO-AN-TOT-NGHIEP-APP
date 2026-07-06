import FormInput from "@/components/common/FormInput";
import FormInputPassword from "@/components/common/FormInputPassword";
import { useAuth } from "@/context/ContextProvider";
import { KeyRound, User, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const inputRef = useRef({ userName: null, password: null });
  const [disabled, setDisabled] = useState(false);
  const [validate, setValidate] = useState({
    userName: { isValidate: true, message: "" },
    password: { isValidate: true, message: "" },
  });
  const [messageResponse, setMessageRespon] = useState({
    isActive: false,
    success: false,
    message: "",
  });

  const clearFieldError = (fieldName) => {
    if (!validate[fieldName].isValidate) {
      setValidate((prev) => ({
        ...prev,
        [fieldName]: { isValidate: true, message: "" },
      }));
    }
  };

  const handleValidate = (userName, password) => {
    const newValidate = {
      userName: { isValidate: true, message: "" },
      password: { isValidate: true, message: "" },
    };
    if (!password)
      newValidate.password = {
        isValidate: false,
        message: "Trường này không được để trống.",
      };
    if (!userName)
      newValidate.userName = {
        isValidate: false,
        message: "Trường này không được để trống.",
      };
    setValidate(newValidate);
    return newValidate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = inputRef.current.userName?.value.trim() || "";
    const password = inputRef.current.password?.value.trim() || "";
    const result = handleValidate(userName, password);

    if (result.userName.isValidate && result.password.isValidate) {
      setDisabled(true);
      let isSuccess = false;
      try {
        const res = await login({ userName, password });
        if (res.success) {
          isSuccess = true;
          setMessageRespon({
            isActive: true,
            success: true,
            message:
              "Đăng nhập thành công bạn sẽ được chuyển hướng trong giây lát.",
          });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        }
      } catch {
        setMessageRespon({
          isActive: true,
          success: false,
          message:
            "Đăng nhập không thành công vui lòng kiểm tra thông tin đăng nhập.",
        });
      } finally {
        if (!isSuccess) {
          setDisabled(false);
        }
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-xl p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
      {/* Icon + Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 shadow-sm">
          <KeyRound className="text-purple-700 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Đăng nhập</h2>
        <p className="text-sm text-gray-500 text-center">
          Vui lòng nhập thông tin tài khoản của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="mb-5 flex flex-col gap-3">
          <FormInput
            ref={(e) => (inputRef.current.userName = e)}
            id="userName"
            label="Tên đăng nhập"
            icon={<User size={16} absoluteStrokeWidth />}
            placeholder="Email hoặc tên đăng nhập"
            validate={validate.userName}
            onChange={() => clearFieldError("userName")}
          />
          <FormInputPassword
            ref={(e) => (inputRef.current.password = e)}
            id="password"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            validate={validate.password}
            onChange={() => clearFieldError("password")}
          />
        </div>

        {messageResponse.isActive && (
          <div className="mb-3 flex justify-center gap-2">
            <div className="flex mt-0.5">
              {messageResponse.success && (
                <Loader2 className="animate-spin w-4 h-4 text-[var(--green_dark)] shrink-0" />
              )}
            </div>
            <div className="flex items-center">
              <p
                className={`${messageResponse.success ? "text-[var(--green_dark)]" : "text-[var(--red)]"} text-center text-xs font-semibold`}
              >
                {messageResponse.message}
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 shadow-md ${
            disabled
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[.99] cursor-pointer hover:shadow-lg"
          }`}
        >
          Đăng nhập
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Chưa có tài khoản?{" "}
        <Link
          to="/auth/register"
          className="text-purple-600 font-semibold hover:underline ml-1"
        >
          Đăng ký ngay
        </Link>
      </p>

      {/* Footer Links */}
      <div className="flex items-center justify-center gap-5 mt-6 pt-4 border-t border-gray-100">
        {["Hệ thống", "Hỗ trợ", "Liên hệ"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
