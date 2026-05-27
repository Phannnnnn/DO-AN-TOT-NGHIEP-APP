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

/* ── Dữ liệu phòng ── */
const ROOMS = [
  {
    name: "Phòng Superior",
    desc: "Tiện nghi đầy đủ, phù hợp lưu trú ngắn ngày",
    price: "750.000",
    rating: 4.5,
    beds: "1 giường đôi",
    size: "28m²",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
  },
  {
    name: "Phòng Deluxe",
    desc: "Phòng rộng rãi với tầm nhìn thành phố tuyệt đẹp",
    price: "980.000",
    rating: 4.7,
    beds: "1 giường King",
    size: "35m²",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800",
  },
  {
    name: "Grand Deluxe",
    desc: "Không gian sang trọng, nội thất cao cấp",
    price: "1.200.000",
    rating: 4.8,
    beds: "1 giường King",
    size: "45m²",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
  },
  {
    name: "Junior Suite",
    desc: "Góc nhìn panorama, tầng cao yên tĩnh",
    price: "1.800.000",
    rating: 4.8,
    beds: "1 giường King",
    size: "55m²",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800",
  },
  {
    name: "Family Room",
    desc: "Lý tưởng cho gia đình với 2 phòng ngủ riêng biệt",
    price: "2.200.000",
    rating: 4.6,
    beds: "2 giường đôi",
    size: "70m²",
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
  },
  {
    name: "Heritage Suite",
    desc: "Phòng suite rộng lớn với phòng khách riêng biệt",
    price: "2.800.000",
    rating: 4.9,
    beds: "1 giường King + sofa",
    size: "80m²",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800",
  },
  {
    name: "Executive Suite",
    desc: "Dành cho doanh nhân, có phòng làm việc riêng",
    price: "3.500.000",
    rating: 4.9,
    beds: "1 giường King",
    size: "90m²",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800",
  },
  {
    name: "Victoria Penthouse",
    desc: "Đỉnh cao xa hoa — hồ bơi riêng tầng thượng",
    price: "5.500.000",
    rating: 5.0,
    beds: "2 phòng ngủ + phòng khách",
    size: "200m²",
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=800",
  },
];

const REVIEWS = [
  {
    name: "Nguyễn Minh Châu",
    date: "Tháng 3, 2025",
    rating: 5,
    text: "Phòng rất sạch sẽ, nhân viên nhiệt tình và chu đáo. Chắc chắn sẽ quay lại!",
    avatar: "https://i.pravatar.cc/48?img=1",
  },
  {
    name: "Trần Thanh Hải",
    date: "Tháng 2, 2025",
    rating: 5,
    text: "Tầm nhìn từ Heritage Suite cực kỳ ấn tượng. Xứng đáng với từng đồng bỏ ra.",
    avatar: "https://i.pravatar.cc/48?img=5",
  },
  {
    name: "Lê Thu Hương",
    date: "Tháng 4, 2025",
    rating: 5,
    text: "Bữa sáng ngon, vị trí thuận tiện đi lại, check-in nhanh chóng. Rất hài lòng!",
    avatar: "https://i.pravatar.cc/48?img=9",
  },
];

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

  const summary = `${adults} người lớn · ${rooms} phòng`;

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
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#0a1628] hover:text-[#0a1628] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-bold text-gray-800">
          {value}
        </span>
        <button
          onClick={onInc}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#0a1628] hover:text-[#0a1628] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col gap-1" ref={ref}>
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        Khách & Phòng
      </label>
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
            label="Phòng"
            value={rooms}
            min={1}
            max={10}
            onInc={() => onChange({ rooms: rooms + 1, adults, children })}
            onDec={() => onChange({ rooms: rooms - 1, adults, children })}
          />
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
            className="mt-3 w-full h-9 rounded-xl bg-[#0a1628] text-white text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-[#1e3a5f] transition"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/93 via-[#0a1628]/70 to-[#0a1628]/20" />
        </div>

        {/* Nội dung hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-64 pt-36 w-full">
          <div className="max-w-xl mb-10">
            {/* 5 sao */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[var(--blue)] text-[var(--blue)]"
                  />
                ))}
              </div>
              <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Khách sạn 5 sao — TP. Hồ Chí Minh
              </span>
            </div>

            {/* Tiêu đề */}
            <h1 className="text-white font-black leading-[0.92] mb-5 uppercase text-[clamp(2.8rem,6vw,5rem)] tracking-[-0.02em]">
              VICTORIA
              <br />
              <span className="text-[var(--blue)]">HERITAGE</span>
              <br />
              HOTEL
            </h1>
            <p className="text-white/55 text-base leading-relaxed">
              Tọa lạc ngay trung tâm Sài Gòn, nơi kiến trúc di sản giao thoa với
              tiện nghi hiện đại — mang đến kỳ lưu trú hoàn hảo cho cả nghỉ
              dưỡng lẫn công tác.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {[
                "Hủy phòng miễn phí",
                "Bữa sáng miễn phí",
                "Giá tốt nhất khi đặt trực tiếp",
              ].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full"
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
                  className="w-full h-11 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[var(--blue)] to-[var(--blue_dark)] shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all"
                >
                  <Search size={15} /> Tìm phòng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DANH SÁCH PHÒNG ══ */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[var(--blue)] text-xs font-black uppercase tracking-[0.3em] mb-2">
              Lựa chọn của bạn
            </p>
            <h2 className="text-4xl font-black text-[#0a1628] uppercase leading-tight">
              Hạng phòng
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              50+ phòng từ tiêu chuẩn đến cao cấp, đáp ứng mọi nhu cầu
            </p>
          </div>
          <button
            onClick={handleSearch}
            className="hidden md:flex items-center gap-2 text-sm font-black text-[#0a1628] border-2 border-[#0a1628] hover:bg-[#0a1628] hover:text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer uppercase tracking-wide"
          >
            Xem tất cả <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROOMS.map((room, i) => (
            <div
              key={i}
              onClick={handleSearch}
              className="group rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className="text-white font-black text-sm uppercase tracking-wide">
                    {room.name}
                  </span>
                  <div className="flex items-center gap-1 bg-[var(--blue)] px-2 py-0.5 rounded-full shrink-0">
                    <Star size={9} className="fill-white text-white" />
                    <span className="text-white text-[10px] font-black">
                      {room.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <p className="text-xs text-gray-500 leading-relaxed">
                  {room.desc}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-auto pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <BedDouble size={11} className="text-[var(--blue)]" />
                    {room.beds}
                  </span>
                  <span className="ml-auto">{room.size}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span className="text-[10px] text-gray-400">Từ </span>
                    <span className="font-black text-[#0a1628] text-base">
                      {room.price}
                    </span>
                    <span className="text-xs text-gray-400"> ₫/đêm</span>
                  </div>
                  <button className="text-[10px] font-black uppercase bg-[#0a1628] text-white px-3 py-1.5 rounded-lg hover:bg-[var(--blue)] hover:text-[#0a1628] transition-all cursor-pointer">
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ GIỚI THIỆU ══ */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[var(--blue)] text-xs font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-[var(--blue)]" /> Về chúng tôi
            </p>
            <h2 className="text-white font-black text-4xl uppercase leading-tight mb-6">
              HƠN 25 NĂM
              <br />
              <span className="text-[var(--blue)]">KIẾN TẠO KỶ NIỆM</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Victoria Heritage Hotel không chỉ là nơi nghỉ ngơi — đây là điểm
              giao thoa giữa kiến trúc Đông Dương cổ điển và tiện nghi 5 sao
              hiện đại, ngay giữa lòng Sài Gòn.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { val: "50+", lbl: "Hạng phòng" },
                { val: "1.200+", lbl: "Lượt khách/năm" },
                { val: "4.9★", lbl: "Đánh giá trung bình" },
                { val: "25+", lbl: "Năm kinh nghiệm" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <p className="text-[var(--blue)] font-black text-xl">
                    {s.val}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">{s.lbl}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                className="bg-[var(--blue)] hover:bg-[var(--blue)] text-[#0a1628] font-black text-sm px-6 py-3 rounded-xl uppercase tracking-wide transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Xem phòng trống
              </button>
              <button className="border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-2">
                <Phone size={15} /> Gọi ngay
              </button>
            </div>
          </div>

          {/* Ảnh chồng */}
          <div className="relative h-[460px]">
            <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
              <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200"
                alt="Lobby"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute left-0 bottom-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border-4 border-[#0a1628]">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800"
                alt="Phòng"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute right-2 bottom-14 bg-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--blue)] flex items-center justify-center shrink-0">
                <Star size={16} className="fill-white text-white" />
              </div>
              <div>
                <p className="text-xl font-black text-[#0a1628]">4.9</p>
                <p className="text-[10px] text-gray-400">1.240 đánh giá</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ĐÁNH GIÁ ══ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--blue)] text-xs font-black uppercase tracking-[0.3em] mb-3">
              Khách hàng nói gì
            </p>
            <h2 className="text-4xl font-black text-[#0a1628] uppercase">
              Đánh giá thực tế
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-[var(--blue)] text-[var(--blue)]"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#0a1628]">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center bg-gradient-to-br from-[#0a1628] to-[#1e3a5f]">
            <svg
              className="absolute inset-0 w-full h-full opacity-5"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--blue)_60%,transparent)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-[var(--blue)] text-xs font-black uppercase tracking-[0.3em] mb-3">
                Ưu đãi đặc biệt
              </p>
              <h2 className="text-white font-black text-4xl uppercase leading-tight mb-4">
                ĐẶT PHÒNG HÔM NAY
                <br />
                <span className="text-[var(--blue)]">TIẾT KIỆM ĐẾN 30%</span>
              </h2>
              <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
                Đặt trực tiếp qua website để nhận giá tốt nhất, bữa sáng miễn
                phí và dịch vụ đưa đón sân bay.
              </p>
              <button
                onClick={handleSearch}
                className="bg-[var(--blue)] hover:bg-[var(--blue)] text-[#0a1628] font-black px-10 py-4 rounded-2xl shadow-xl shadow-[var(--blue)]/20 transition-all hover:-translate-y-0.5 cursor-pointer uppercase tracking-widest text-sm inline-flex items-center gap-2"
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
