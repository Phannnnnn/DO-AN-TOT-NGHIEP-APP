import { Search, Stars } from "lucide-react";
import logo from "../../assets/img/logo.png";
import DatePickerCustom from "@/components/common/DatePickerCustom";
import { useEffect, useState } from "react";
import DropDownSelectInput from "./DropDownSelectInput";

const guestItems = [
  { value: 1, label: "1 người" },
  { value: 2, label: "2 người" },
  { value: 3, label: "3 người" },
  { value: 4, label: "4 người" },
];

const roomTypeItems = [
  { value: 1, label: "Loại 1" },
  { value: 2, label: "Loại 2" },
  { value: 3, label: "Loại 3" },
  { value: 4, label: "Loại 4" },
];

const HomePage = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guestSelect, setGuestSelect] = useState(1);
  const [roomTypeSelect, setRoomTypeSelect] = useState(1);

  useEffect(() => {
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
  }, [checkInDate]);

  const handleChangeGuestSelect = (value) => {
    setGuestSelect(value);
  };

  const handleChangeRoomTypeSelect = (value) => {
    setRoomTypeSelect(value);
  };

  return (
    <div className="min-h-screen bg-[var(--black)]/10">
      {/* 2. Hero Content */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src={logo}
            className="w-full h-full object-center object-cover"
            alt="logo-img"
          />
          <div className="absolute inset-0 bg-[var(--black)]/30" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="bg-[var(--orange)]/80 text-[10px] px-3 py-1 uppercase tracking-widest font-bold rounded-sm">
            Phòng nghỉ & Căn hộ
          </span>
          <h2 className="text-6xl font-serif font-bold mt-6 mb-4">
            Trải nghiệm kỳ nghỉ hoàn hảo
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Nơi vẻ đẹp di sản hòa quyện cùng sự sang trọng hiện đại, mang đến
            cho bạn những giây phút thư giãn tuyệt đối tại trung tâm thành phố.
          </p>
        </div>

        {/* 3. Floating Booking Bar */}
        <div className="absolute -bottom-1/12 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-[var(--white)] shadow-[0_0_10px_5px_rgba(74,197,238,0.3)] to-[var(--white)] p-6 rounded-2xl flex flex-wrap md:flex-nowrap gap-4 items-end text-[var(--black)]">
          <div className="flex-1 min-w-[150px] space-y-2">
            <DatePickerCustom
              label={"Ngày nhận phòng"}
              value={checkInDate}
              onChangeDate={setCheckInDate}
            />
          </div>
          <div className="flex-1 min-w-[150px] space-y-2 border-l md:pl-4">
            <DatePickerCustom
              label={"Ngày trả phòng"}
              minDate={checkInDate}
              value={checkOutDate}
              onChangeDate={setCheckOutDate}
            />
          </div>
          <div className="flex-1 min-w-[150px] space-y-2 border-l md:pl-4">
            <DropDownSelectInput
              label={"Số lượng khách"}
              items={guestItems}
              value={guestSelect}
              onChange={handleChangeGuestSelect}
            />
          </div>
          <div className="flex-1 min-w-[150px] space-y-2 border-l md:pl-4">
            <DropDownSelectInput
              label={"Loại phòng"}
              items={roomTypeItems}
              value={roomTypeSelect}
              onChange={handleChangeRoomTypeSelect}
            />
          </div>
          <button className="flex gap-2 items-center bg-[var(--orange)]/60 text-[var(--blue_dark)]/60 hover:bg-[var(--orange)] hover:text-[var(--blue_dark)] p-4 font-bold rounded-lg shadow-lg duration-300 transition-all cursor-pointer active:scale-95">
            <Search size={24} /> Tìm phòng
          </button>
        </div>
      </section>

      {/* 4. Stats Section */}
      <section className="pt-32 pb-20 px-16 flex justify-around text-center border-b bg-white">
        <div>
          <h3 className="text-4xl font-serif font-bold text-[#0A1D37]">50+</h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">
            Phòng nghỉ hạng sang
          </p>
        </div>
        <div>
          <h3 className="text-4xl font-serif font-bold text-[#0A1D37]">
            1,000+
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">
            Lượt khách hài lòng
          </p>
        </div>
        <div>
          <h3 className="text-4xl font-serif font-bold text-[#0A1D37]">
            4.8{" "}
            <Stars
              className="inline fill-orange-400 text-orange-400 pb-1"
              size={24}
            />
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">
            Đánh giá từ TripAdvisor
          </p>
        </div>
      </section>

      {/* 5. Room Collection */}
      <section className="py-20 px-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[var(--orange)] text-xs font-bold uppercase tracking-[0.3em]">
              Bộ sưu tập phòng nghỉ
            </span>
            <h2 className="text-4xl font-serif font-bold text-[#0A1D37] mt-2">
              Được thiết kế cho sự
              <br /> riêng tư và sang trọng
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-bold border-b-2 border-[#0A1D37] pb-1"
          >
            Xem tất cả các phòng
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoomCard
            name="Phòng Deluxe"
            price="690k"
            img="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070"
          />
          <RoomCard
            name="Luxury Suite"
            price="2.2M"
            img="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070"
            isFeatured={true}
          />
          <RoomCard
            name="Phòng Family"
            price="1.5M"
            img="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070"
          />
        </div>
      </section>
    </div>
  );
};

// Sub-component cho Room Card
const RoomCard = ({ name, price, img, isFeatured = false }) => (
  <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all border">
    <div className="relative h-64 overflow-hidden">
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-sm shadow-md">
        <span className="text-[10px] font-bold">Từ {price}/đêm</span>
      </div>
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-serif font-bold mb-4">{name}</h3>
      <div className="flex justify-center gap-4 text-gray-400 text-[10px] mb-6">
        <span>🛏 Wifi</span>
        <span>🚿 Điều hòa</span>
        <span>📺 Smart TV</span>
      </div>
      <button
        className={`w-full py-3 rounded-sm font-bold text-xs transition border ${isFeatured ? "bg-[#0A1D37] text-white border-[#0A1D37]" : "bg-white text-gray-800 border-gray-300 hover:border-[#0A1D37]"}`}
      >
        ĐẶT NGAY
      </button>
    </div>
  </div>
);
export default HomePage;
