import FormInput from "@/components/common/FormInput";
import FormInputPassword from "@/components/common/FormInputPassword";
import { authService } from "@/services/auth/authService";
import { ClipboardList, User, Mail, AtSign, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
 const navigate = useNavigate();
 const inputRef = useRef({
 userName: null,
 fullName: null,
 email: null,
 password: null,
 });
 const [disabled, setDisabled] = useState(false);
 const [validate, setValidate] = useState({
 userName: { isValidate: true, message: "" },
 fullName: { isValidate: true, message: "" },
 email: { isValidate: true, message: "" },
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

 const handleValidate = (fields) => {
 const newValidate = {
 userName: { isValidate: true, message: "" },
 fullName: { isValidate: true, message: "" },
 email: { isValidate: true, message: "" },
 password: { isValidate: true, message: "" },
 };
 if (!fields.userName)
 newValidate.userName = {
 isValidate: false,
 message: "Trường này không được để trống.",
 };
 else if (fields.userName.length < 6)
 newValidate.userName = {
 isValidate: false,
 message: "Tên đăng nhập phải từ 6 ký tự.",
 };
 if (!fields.fullName)
 newValidate.fullName = {
 isValidate: false,
 message: "Trường này không được để trống.",
 };
 if (!fields.email)
 newValidate.email = {
 isValidate: false,
 message: "Trường này không được để trống.",
 };
 else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
 newValidate.email = { isValidate: false, message: "Email không hợp lệ." };
 if (!fields.password)
 newValidate.password = {
 isValidate: false,
 message: "Trường này không được để trống.",
 };
 else if (fields.password.length < 8)
 newValidate.password = {
 isValidate: false,
 message: "Mật khẩu phải từ 8 ký tự.",
 };
 setValidate(newValidate);
 return newValidate;
 };

 const handleSubmit = async (e) => {
 e.preventDefault();

 const fields = {
 userName: inputRef.current.userName?.value.trim() || "",
 fullName: inputRef.current.fullName?.value.trim() || "",
 email: inputRef.current.email?.value.trim() || "",
 password: inputRef.current.password?.value.trim() || "",
 };
 const result = handleValidate(fields);
 const isValid = Object.values(result).every((v) => v.isValidate);
 if (isValid) {
 setDisabled(true);
 let isSuccess = false;
 try {
 const res = await authService.register(fields);
 if (res?.success) {
 isSuccess = true;
 setMessageRespon({
 isActive: true,
 success: true,
 message:
 "Đăng ký thành công bạn sẽ được chuyển hướng trong giây lát.",
 });
 setTimeout(() => {
 navigate("/auth/login", { replace: true });
 }, 2000);
 }
 } catch (error) {
 setMessageRespon({
 isActive: true,
 success: false,
 message: error.message,
 });
 } finally {
 if (!isSuccess) {
 setDisabled(false);
 }
 }
 }
 };

 return (
 <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl">
 {/* Icon + Title */}
 <div className="flex flex-col items-center mb-4">
 <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-1.5 shadow-sm">
 <ClipboardList className="text-purple-700 w-5 h-5" />
 </div>
 <h2 className="text-xl font-bold text-gray-800 mb-0.5">
 Đăng ký
 </h2>
 <p className="text-xs text-gray-500 text-center">
 Vui lòng điền đầy đủ thông tin bên dưới
 </p>
 </div>

 <form onSubmit={handleSubmit} noValidate autoComplete="off">
 <div className="mb-3.5 flex flex-col gap-1.5">
 <FormInput
 ref={(e) => (inputRef.current.userName = e)}
 id="userName"
 label="Tên đăng nhập"
 icon={<AtSign size={14} absoluteStrokeWidth />}
 placeholder="Tối thiểu 6 ký tự"
 validate={validate.userName}
 onChange={() => clearFieldError("userName")}
 />
 <FormInput
 ref={(e) => (inputRef.current.fullName = e)}
 id="fullName"
 label="Họ và tên"
 icon={<User size={14} absoluteStrokeWidth />}
 placeholder="Nguyễn Văn A"
 validate={validate.fullName}
 onChange={() => clearFieldError("fullName")}
 />
 <FormInput
 ref={(e) => (inputRef.current.email = e)}
 id="email"
 label="Email"
 icon={<Mail size={14} absoluteStrokeWidth />}
 placeholder="email@example.com"
 validate={validate.email}
 onChange={() => clearFieldError("email")}
 />
 <FormInputPassword
 ref={(e) => (inputRef.current.password = e)}
 id="password"
 label="Mật khẩu"
 placeholder="Tối thiểu 8 ký tự"
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
 className={`w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 shadow-md ${disabled
 ? "bg-purple-300 cursor-not-allowed"
 : "bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[.99] cursor-pointer hover:shadow-lg"
 }`}
 >
 Tạo tài khoản
 </button>
 </form>

 <p className="text-center text-xs text-gray-500 mt-3.5">
 Đã có tài khoản?{" "}
 <Link
 to="/auth/login"
 className="text-purple-600 font-semibold hover:underline ml-1"
 >
 Đăng nhập
 </Link>
 </p>

 {/* Footer Links */}
 <div className="flex items-center justify-center gap-4 mt-3.5 pt-2.5 border-t border-gray-100">
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

export default RegisterPage;
