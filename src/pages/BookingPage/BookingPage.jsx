import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Loader2,
  User,
  Mail,
  Phone,
  FileText,
  BedDouble,
  Moon,
  Users,
  Clock,
  AlertTriangle,
  Copy,
  CheckCircle,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "react-toastify";
import { bookingService, paymentService, roomHoldService } from "@/services";

const formatVND = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );
const fmtDate = (d) =>
  d ? format(parseISO(d), "dd MMM yyyy", { locale: vi }) : "";
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

/* ── InputField dark ── */
const InputField = ({ label, icon, error, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">
      {label}
    </label>
    <div
      className={`flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-colors ${
        error
          ? "border-red-500/50 bg-white/5"
          : "border-white/10 bg-white/5 focus-within:border-[var(--blue)]"
      }`}
    >
      <span className="text-[var(--blue)] shrink-0">{icon}</span>
      <input
        className="flex-1 text-sm text-white outline-none bg-transparent placeholder:text-white/20"
        {...props}
      />
    </div>
    {error && <p className="text-[11px] text-red-400">{error}</p>}
  </div>
);

/* ── Step 0 ── */
const StepInfo = ({ form, setForm, errors }) => (
  <div className="flex flex-col gap-4">
    <InputField
      label="Họ và tên *"
      icon={<User size={15} />}
      placeholder="Nguyễn Văn A"
      value={form.guestName}
      onChange={(e) => setForm((p) => ({ ...p, guestName: e.target.value }))}
      error={errors.guestName}
    />
    <InputField
      label="Email *"
      icon={<Mail size={15} />}
      type="email"
      placeholder="example@email.com"
      value={form.guestEmail}
      onChange={(e) => setForm((p) => ({ ...p, guestEmail: e.target.value }))}
      error={errors.guestEmail}
    />
    <InputField
      label="Số điện thoại"
      icon={<Phone size={15} />}
      placeholder="0901 234 567"
      value={form.guestPhone}
      onChange={(e) => setForm((p) => ({ ...p, guestPhone: e.target.value }))}
    />
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30">
        Ghi chú
      </label>
      <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 focus-within:border-[var(--blue)] transition-colors">
        <FileText size={15} className="text-[var(--blue)] shrink-0 mt-0.5" />
        <textarea
          rows={3}
          placeholder="Yêu cầu đặc biệt, giờ nhận phòng dự kiến..."
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          className="flex-1 text-sm text-white outline-none bg-transparent resize-none placeholder:text-white/20"
        />
      </div>
    </div>
  </div>
);

/* ── Step 1 ── */
const StepConfirm = ({ form, booking }) => (
  <div className="flex flex-col gap-4">
    {/* Khách */}
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">
        Thông tin khách
      </p>
      <div className="flex flex-col gap-2 text-sm">
        {[
          { label: "Họ tên", val: form.guestName },
          { label: "Email", val: form.guestEmail },
          ...(form.guestPhone
            ? [{ label: "Điện thoại", val: form.guestPhone }]
            : []),
          ...(form.notes ? [{ label: "Ghi chú", val: form.notes }] : []),
        ].map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <span className="text-white/40 shrink-0">{row.label}</span>
            <span className="font-semibold text-white text-right">
              {row.val}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Phòng */}
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">
        Phòng đặt
      </p>
      <div className="flex flex-col gap-3">
        {booking.rooms.map((r) => (
          <div
            key={r.roomId}
            className="flex items-center justify-between text-sm"
          >
            <div>
              <p className="font-semibold text-white">{r.roomType?.typeName}</p>
              <p className="text-xs text-white/40">
                Tầng {r.floor} · Phòng {r.roomNumber}
              </p>
            </div>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {(r.roomBeds ?? []).map((b, i) => (
                <span
                  key={i}
                  className="text-[10px] text-white/60 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1"
                >
                  <BedDouble size={10} className="text-[var(--blue)]" />{" "}
                  {b.quantity}× {b.roomBedType}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Lưu trú */}
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">
        Thông tin lưu trú
      </p>
      <div className="flex flex-col gap-2 text-sm">
        {[
          {
            icon: <Moon size={13} />,
            label: "Nhận phòng",
            val: fmtDate(booking.checkInDate),
          },
          {
            icon: <Moon size={13} />,
            label: "Trả phòng",
            val: fmtDate(booking.checkOutDate),
          },
          {
            icon: <Users size={13} />,
            label: "Khách",
            val: `${booking.adults} người lớn${Number(booking.children) > 0 ? `, ${booking.children} trẻ em` : ""}`,
          },
        ].map((row) => (
          <div key={row.label} className="flex justify-between">
            <span className="text-white/40 flex items-center gap-1.5">
              <span className="text-[var(--blue)]">{row.icon}</span>
              {row.label}
            </span>
            <span className="font-semibold text-white">{row.val}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-[var(--blue)]/10 border border-[var(--blue)]/20 rounded-xl p-4 text-sm text-[var(--blue)] flex items-center gap-2">
      <Check size={14} className="shrink-0" /> Hủy miễn phí trước 24 giờ · Thanh
      toán tại khách sạn
    </div>
  </div>
);

/* ── Step 2: QR ── */
const StepPayment = ({ bookingResult, onPaid }) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loadingQR, setLoadingQR] = useState(true);
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const create = async () => {
      try {
        const res = await paymentService.createPayment(bookingResult.bookingId);
        if (res.success) setPaymentUrl(res.data?.paymentUrl ?? res.data);
      } catch {
        toast.error("Không thể tạo link thanh toán.");
      } finally {
        setLoadingQR(false);
      }
    };
    if (bookingResult?.bookingId) create();
  }, [bookingResult?.bookingId]);

  useEffect(() => {
    if (!bookingResult?.bookingId || paid) return;
    intervalRef.current = setInterval(async () => {
      try {
        const res = await bookingService.bookingById(bookingResult.bookingId);
        if (res.data?.paymentStatus === "paid") {
          clearInterval(intervalRef.current);
          setPaid(true);
          onPaid?.();
        }
      } catch {}
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [bookingResult?.bookingId, paid]);

  if (paid)
    return (
      <div className="text-center py-6 flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <Check size={28} className="text-green-400" />
        </div>
        <h3 className="text-lg font-black text-white uppercase">
          Thanh toán thành công!
        </h3>
        <p className="text-sm text-white/40">
          Mã đặt phòng:{" "}
          <span className="font-black text-white">
            #{bookingResult?.bookingId}
          </span>
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-white/50 text-center">
        Quét mã QR để thanh toán qua VNPAY
      </p>
      {loadingQR ? (
        <div className="w-52 h-52 flex items-center justify-center">
          <Loader2 size={28} className="animate-spin text-[var(--blue)]" />
        </div>
      ) : paymentUrl ? (
        <div className="p-4 bg-white rounded-2xl shadow-2xl">
          <QRCodeSVG value={paymentUrl} size={200} />
        </div>
      ) : (
        <div className="w-52 h-52 flex items-center justify-center bg-white/5 rounded-2xl text-sm text-white/30">
          Không tạo được QR
        </div>
      )}
      {paymentUrl && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(paymentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-2 text-xs font-semibold text-white/40 border border-white/15 hover:border-white/30 px-4 py-2 rounded-xl transition cursor-pointer"
        >
          {copied ? (
            <>
              <CheckCircle size={13} className="text-green-400" /> Đã sao chép
            </>
          ) : (
            <>
              <Copy size={13} /> Sao chép link
            </>
          )}
        </button>
      )}
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Loader2 size={12} className="animate-spin" /> Đang chờ xác nhận thanh
        toán...
      </div>
    </div>
  );
};

/* ── Step 3: Done ── */
const StepDone = ({ bookingResult }) => (
  <div className="text-center py-8 flex flex-col items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
      <Check size={32} className="text-green-400" />
    </div>
    <div>
      <h3 className="text-xl font-black text-white uppercase">
        Đặt phòng thành công!
      </h3>
      <p className="text-sm text-white/40 mt-1">
        Mã đặt phòng:{" "}
        <span className="font-black text-white">
          #{bookingResult?.bookingId}
        </span>
      </p>
    </div>
    <p className="text-sm text-white/40 max-w-xs text-center">
      Xác nhận đã được gửi đến email. Vui lòng kiểm tra hộp thư.
    </p>
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full text-sm">
      <div className="flex justify-between mb-2">
        <span className="text-white/40">Tổng thanh toán</span>
        <span className="font-black text-white">
          {formatVND(bookingResult?.totalAmount ?? 0)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/40">Phương thức</span>
        <span className="font-semibold text-white">VNPAY</span>
      </div>
    </div>
  </div>
);

/* ── Main ── */
const BookingPage = () => {
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
  const [errors, setErrors] = useState({});
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
    if (sessionId) {
      try {
        await roomHoldService.release(sessionId);
      } catch {}
    }
  };
  const { secondsLeft, display: countdownDisplay } = useCountdown(
    expiresAt,
    handleExpired,
  );
  useEffect(() => {
    return () => {
      if (sessionId && !bookingResult)
        roomHoldService.release(sessionId).catch(() => {});
    };
  }, [sessionId, bookingResult]);

  const validate = () => {
    const e = {};
    if (!form.guestName.trim()) e.guestName = "Vui lòng nhập họ tên";
    if (!form.guestEmail.trim()) e.guestEmail = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.guestEmail))
      e.guestEmail = "Email không hợp lệ";
    return e;
  };

  const handleNext = () => {
    if (step === 0) {
      const e = validate();
      if (Object.keys(e).length) {
        setErrors(e);
        return;
      }
      setErrors({});
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await bookingService.create({
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
        e?.response?.data?.message ?? "Đặt phòng thất bại. Vui lòng thử lại.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* Expired */
  if (expired)
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-black text-white uppercase mb-2">
            Phiên đặt phòng hết hạn
          </h2>
          <p className="text-sm text-white/40 mb-6">
            Thời gian giữ phòng 15 phút đã kết thúc. Vui lòng tìm kiếm lại
            phòng.
          </p>
          <button
            onClick={() => navigate(-2)}
            className="text-sm font-black text-white bg-[var(--blue)] hover:opacity-90 px-8 py-3 rounded-xl transition cursor-pointer uppercase tracking-wide"
          >
            Tìm lại phòng
          </button>
        </div>
      </div>
    );

  if (!state)
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">
            Không tìm thấy thông tin đặt phòng.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-black text-white bg-[var(--blue)] px-6 py-3 rounded-xl cursor-pointer uppercase"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-4">
          <button
            onClick={() =>
              step > 0 && !bookingResult ? setStep((s) => s - 1) : navigate(-1)
            }
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition text-sm font-semibold cursor-pointer shrink-0"
          >
            <ArrowLeft size={15} />{" "}
            {step > 0 && !bookingResult ? "Quay lại" : "Chi tiết phòng"}
          </button>
          <div className="h-4 w-px bg-white/15" />
          <span className="text-[var(--blue)] text-sm font-semibold flex-1">
            Đặt phòng
          </span>
          {!bookingResult && (
            <div
              className={`flex items-center gap-1.5 text-sm font-black px-3 py-1 rounded-full ${
                secondsLeft <= 120
                  ? "bg-red-500/20 text-red-400"
                  : "bg-white/10 text-[var(--blue)]"
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
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      i < step
                        ? "bg-green-500 text-white"
                        : i === step
                          ? "bg-[var(--blue)] text-white"
                          : "bg-white/10 text-white/30"
                    }`}
                  >
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-black uppercase tracking-wider ${i === step ? "text-white" : "text-white/30"}`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px ${i < step ? "bg-green-500" : "bg-white/10"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-black text-white uppercase mb-5">
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
                  className="flex-1 h-12 rounded-xl border border-white/15 font-semibold text-sm text-white/60 hover:border-white/30 hover:text-white transition cursor-pointer"
                >
                  Quay lại
                </button>
              )}
              {step === 0 && (
                <button
                  onClick={handleNext}
                  className="flex-[2] h-12 rounded-xl bg-[var(--blue)] hover:opacity-90 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  Tiếp theo <ChevronRight size={15} />
                </button>
              )}
              {step === 1 && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] h-12 rounded-xl bg-[var(--blue)] hover:opacity-90 disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
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
              className="w-full h-12 rounded-xl bg-[var(--blue)] hover:opacity-90 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Về trang chủ
            </button>
          )}
        </div>

        {/* Right: summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 backdrop-blur-sm">
            {/* Countdown */}
            {!bookingResult && (
              <div
                className={`flex items-center justify-between p-3 rounded-xl ${
                  secondsLeft <= 120
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-[var(--blue)]/10 border border-[var(--blue)]/20"
                }`}
              >
                <span
                  className={`text-xs font-black ${secondsLeft <= 120 ? "text-red-400" : "text-[var(--blue)]"}`}
                >
                  {secondsLeft <= 120
                    ? "⚠ Sắp hết hạn!"
                    : "Thời gian giữ phòng"}
                </span>
                <span
                  className={`font-black text-base ${secondsLeft <= 120 ? "text-red-400" : "text-[var(--blue)]"}`}
                >
                  {countdownDisplay}
                </span>
              </div>
            )}

            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
              Chi tiết đặt phòng
            </p>

            <div className="flex flex-col gap-1.5 text-sm">
              {[
                { label: "Nhận phòng", val: fmtDate(checkInDate) },
                { label: "Trả phòng", val: fmtDate(checkOutDate) },
                { label: "Số đêm", val: nights },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-white/40">{row.label}</span>
                  <span className="font-semibold text-white text-right">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3 flex flex-col gap-1.5">
              {(rooms ?? []).map((r) => (
                <div key={r.roomId} className="flex justify-between text-sm">
                  <span className="text-white/40">{r.roomType?.typeName}</span>
                  <span className="font-semibold text-white">
                    {formatVND(
                      parseFloat(r.pricePlan?.basePrice ?? 0) * nights,
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-3">
              <div className="flex justify-between">
                <span className="font-black text-white">Tổng cộng</span>
                <span className="font-black text-lg text-white">
                  {formatVND(totalPrice)}
                </span>
              </div>
              <p className="text-[11px] text-white/25 mt-0.5">
                Đã bao gồm thuế & phí
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
