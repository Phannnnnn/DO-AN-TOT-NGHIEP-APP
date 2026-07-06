import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  Star,
  ArrowRight,
  BedDouble,
  Phone,
  Check,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";
import DateInput from "@/components/common/DatePickerCustom";

const toDateStr = (d) => {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  return `${Y}-${M}-${D}`;
};

/* ── GuestPicker: dropdown −/+ ── */
const GuestPicker = ({ rooms, adults, children, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Đóng khi click ngoài
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const summary = `${adults} người lớn - ${children} trẻ em`;

  const Counter = ({ label, sub, value, onInc, onDec, min = 0, max = 10 }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDec}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[var(--blue)] hover:text-[var(--blue)] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-bold text-gray-800">
          {value}
        </span>
        <button
          onClick={onInc}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[var(--blue)] hover:text-[var(--blue)] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col gap-1" ref={ref}>
      <label className="text-xs font-bold text-gray-500">Khách</label>
      <button
        onClick={() => setOpen((p) => !p)}
        className="h-11 px-3 flex items-center gap-2 rounded-xl border-2 border-transparent hover:border-gray-200 transition cursor-pointer text-sm font-semibold text-gray-800 w-full text-left"
      >
        <Users size={15} className="text-[var(--blue)] shrink-0" />
        <span className="flex-1 truncate">{summary}</span>
        <ChevronDown
          size={13}
          className={`text-gray-400 transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 w-72 p-4">
          <Counter
            label="Người lớn"
            sub="18 tuổi trở lên"
            value={adults}
            min={1}
            max={rooms * 4}
            onInc={() => onChange({ rooms, adults: adults + 1, children })}
            onDec={() => onChange({ rooms, adults: adults - 1, children })}
          />
          <Counter
            label="Trẻ em"
            sub="0–17 tuổi"
            value={children}
            min={0}
            max={rooms * 3}
            onInc={() => onChange({ rooms, adults, children: children + 1 })}
            onDec={() => onChange({ rooms, adults, children: children - 1 })}
          />
          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full h-9 rounded-xl bg-[var(--blue)] text-white text-xs font-bold cursor-pointer hover:bg-purple-700 transition"
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Main ── */
const HomePage = () => {
  const navigate = useNavigate();
  const todayStr = toDateStr(new Date());
  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toDateStr(d);
  })();

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });

  useEffect(() => {
    if (checkOut <= checkIn) {
      const d = new Date(checkIn + "T00:00:00");
      d.setDate(d.getDate() + 1);
      setCheckOut(toDateStr(d));
    }
  }, [checkIn]);

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adults: String(guests.adults),
      children: String(guests.children),
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col justify-end">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070"
            alt="Victoria Heritage Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f2e]/95 via-[#1a0f2e]/70 to-[#1a0f2e]/20" />
        </div>

        {/* Nội dung hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-64 pt-36 w-full">
          <div className="max-w-xl mb-10">
            {/* Tiêu đề */}
            <h1 className="text-white font-bold leading-[0.92] mb-5 text-[clamp(2.8rem,6vw,5rem)]">
              LUMISTAY HOTEL
            </h1>
            <p className="text-white/55 text-base leading-relaxed">
              Tọa lạc ngay trung tâm Hà Nội, nơi kiến trúc di sản giao thoa với
              tiện nghi hiện đại — mang đến kỳ lưu trú hoàn hảo cho cả nghỉ
              dưỡng lẫn công tác.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {["Giá tốt nhất khi đặt trực tiếp"].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs px-3 py-1.5 rounded-full"
                >
                  <Check size={11} className="text-[var(--blue)]" /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Search Box ── */}
          <div className="bg-white rounded-2xl shadow-2xl p-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Nhận phòng */}
              <div className="px-4 py-3">
                <DateInput
                  label="Nhận phòng"
                  value={checkIn}
                  onChange={setCheckIn}
                  minDate={todayStr}
                  placeholder="Chọn ngày"
                />
              </div>
              {/* Trả phòng */}
              <div className="px-4 py-3">
                <DateInput
                  label="Trả phòng"
                  value={checkOut}
                  onChange={setCheckOut}
                  minDate={checkIn}
                  placeholder="Chọn ngày"
                />
              </div>
              {/* Khách & Phòng */}
              <div className="px-4 py-3">
                <GuestPicker
                  rooms={guests.rooms}
                  adults={guests.adults}
                  children={guests.children}
                  onChange={setGuests}
                />
              </div>
              {/* Nút tìm — cùng hàng, cột 4 */}
              <div className="px-2 py-2 flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all"
                >
                  <Search size={15} /> Tìm phòng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="#7c3aed" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="relative z-10">
              <p className="text-[var(--blue)] text-xs font-bold mb-3">
                Ưu đãi đặc biệt
              </p>
              <h2 className="text-slate-800 font-bold text-4xl leading-tight mb-4">
                ĐẶT PHÒNG HÔM NAY
                <br />
                <span className="text-[var(--blue)]">TIẾT KIỆM ĐẾN 30%</span>
              </h2>
              <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
                Đặt trực tiếp qua website để nhận giá tốt nhất.
              </p>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-purple-600/20 transition-all hover:-translate-y-0.5 cursor-pointer text-sm inline-flex items-center gap-2"
              >
                Xem phòng trống <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
