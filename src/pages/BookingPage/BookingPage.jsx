import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Loader2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useAuth, useNotification } from "@/context/ContextProvider";
import { bookingService, roomHoldService, userService } from "@/services";

import StepInfo from "./StepInfo";
import StepConfirm from "./StepConfirm";
import StepPayment from "./StepPayment";
import StepDone from "./StepDone";
import BookingSummaryCard from "./BookingSummaryCard";

const STEPS = ["Thông tin", "Xác nhận", "Thanh toán", "Hoàn tất"];

/* ── Countdown ── */
const useCountdown = (expiresAt, onExpired) => {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    expiresAt
      ? Math.max(0, Math.floor((new Date(expiresAt) - Date.now()) / 1000))
      : 0,
  );
  const timerRef = useRef(null);
  useEffect(() => {
    if (!expiresAt) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          onExpired?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [expiresAt]);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  return { secondsLeft, display: `${mm}:${ss}` };
};

/* ── Main ── */
const BookingPage = () => {
  const toast = useNotification();
  const { user } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    rooms,
    checkInDate,
    checkOutDate,
    adults,
    children,
    totalPrice,
    nights,
    sessionId,
    expiresAt,
  } = state ?? {};

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    notes: "",
  });
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user?.id) {
        try {
          const res = await userService.getUserById(user.id);
          if (res.success && res.data) {
            setUserProfile(res.data);
            const customer = res.data.customer || {};
            setForm({
              guestName: customer.fullName || "",
              guestEmail: customer.email || "",
              guestPhone: customer.phone || "",
              notes: "",
            });
          }
        } catch (error) {
          console.error("Lỗi khi tải thông tin tài khoản để tự điền:", error);
        }
      }
    };
    loadUserProfile();
  }, [user]);
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [expired, setExpired] = useState(false);

  const booking = {
    rooms,
    checkInDate,
    checkOutDate,
    adults,
    children,
    totalPrice,
    nights,
  };

  const handleExpired = async () => {
    setExpired(true);
    try {
      await roomHoldService.release(sessionId);
    } catch {}
  };

  const { secondsLeft, display: countdownDisplay } = useCountdown(
    expiresAt,
    handleExpired,
  );

  const handleNext = () => {
    const errs = {};
    if (!form.guestName.trim()) errs.guestName = "Vui lòng nhập họ tên.";
    if (!form.guestEmail.trim()) errs.guestEmail = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(form.guestEmail))
      errs.guestEmail = "Email không hợp lệ.";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await bookingService.create({
        customerId: userProfile?.customer?.customerId || undefined,
        guestName: form.guestName.trim(),
        guestEmail: form.guestEmail.trim(),
        guestPhone: form.guestPhone.trim() || undefined,
        notes: form.notes.trim() || undefined,
        checkInDate,
        checkOutDate,
        sessionId,
        bookingDetails: (rooms ?? []).map((r) => ({ roomId: r.roomId })),
      });
      if (res.success) {
        setBookingResult(res.data);
        setStep(2);
      }
    } catch (e) {
      toast.error(
        "Lỗi đặt phòng",
        e?.response?.data?.message ?? "Đặt phòng thất bại. Vui lòng thử lại.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (expired)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 text-slate-800">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Phiên đặt phòng hết hạn
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Thời gian giữ phòng 15 phút đã kết thúc. Vui lòng tìm kiếm lại
            phòng.
          </p>
          <button
            onClick={() => navigate(-2)}
            className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3 rounded-xl transition cursor-pointer shadow-md shadow-purple-600/10"
          >
            Tìm lại phòng
          </button>
        </div>
      </div>
    );

  if (!state)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="text-center">
          <p className="text-slate-500 mb-4">
            Không tìm thấy thông tin đặt phòng.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-bold text-white bg-[var(--blue)] hover:bg-purple-700 px-6 py-3 rounded-xl cursor-pointer transition"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-4">
          <button
            onClick={() =>
              step > 0 && !bookingResult ? setStep((s) => s - 1) : navigate(-1)
            }
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition text-sm font-semibold cursor-pointer shrink-0"
          >
            <ArrowLeft size={15} />{" "}
            {step > 0 && !bookingResult ? "Quay lại" : "Chi tiết phòng"}
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <span className="text-[var(--blue)] text-sm font-semibold flex-1">
            Đặt phòng
          </span>
          {!bookingResult && (
            <div
              className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${
                secondsLeft <= 120
                  ? "bg-red-50 text-red-500 border border-red-100 animate-pulse"
                  : "bg-purple-50 text-[var(--blue)] border border-purple-100"
              }`}
            >
              <Clock size={13} /> {countdownDisplay}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div
                key={i}
                className="flex items-center gap-2 flex-1 last:flex-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step
                        ? "bg-green-500 text-white"
                        : i === step
                          ? "bg-[var(--blue)] text-white"
                          : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-bold ${i === step ? "text-slate-800 font-bold" : "text-slate-400"}`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px ${i < step ? "bg-green-500" : "bg-slate-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              {STEPS[step]}
            </h2>
            {step === 0 && (
              <StepInfo form={form} setForm={setForm} errors={errors} />
            )}
            {step === 1 && <StepConfirm form={form} booking={booking} />}
            {step === 2 && (
              <StepPayment
                bookingResult={bookingResult}
                onPaid={() => setStep(3)}
              />
            )}
            {step === 3 && <StepDone bookingResult={bookingResult} />}
          </div>

          {/* Actions */}
          {step < 2 && !bookingResult && (
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 h-12 rounded-xl border border-slate-200 font-semibold text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
                >
                  Quay lại
                </button>
              )}
              {step === 0 && (
                <button
                  onClick={handleNext}
                  className="flex-[2] h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-purple-600/10"
                >
                  Tiếp theo <ChevronRight size={15} />
                </button>
              )}
              {step === 1 && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-purple-600/10"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Đang xử
                      lý...
                    </>
                  ) : (
                    <>
                      <Check size={15} /> Xác nhận đặt phòng
                    </>
                  )}
                </button>
              )}
            </div>
          )}
          {step === 3 && bookingResult && (
            <button
              onClick={() => navigate("/")}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-purple-600/10"
            >
              Về trang chủ
            </button>
          )}
        </div>

        {/* Right: summary */}
        <BookingSummaryCard
          bookingResult={bookingResult}
          secondsLeft={secondsLeft}
          countdownDisplay={countdownDisplay}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          nights={nights}
          rooms={rooms}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default BookingPage;
