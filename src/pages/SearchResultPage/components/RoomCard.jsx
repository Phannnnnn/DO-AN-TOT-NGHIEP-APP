import {
  Check,
  Plus,
  DoorOpen,
  BedDouble,
  Users,
  ChevronRight,
} from "lucide-react";
import { formatVND } from "../utils";

const RoomCard = ({
  room,
  nights,
  isSelected,
  onToggleSelect,
  onViewDetail,
}) => {
  const pricePerNight = room.roomType.activePrice ?? 0;
  const totalPrice = pricePerNight * nights;
  const images = room.roomType?.roomImages || [];
  const cover = images.find((i) => i.isCover) ?? images[0];
  const img =
    cover?.url ??
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800";

  return (
    <div
      onClick={onToggleSelect}
      className={`group relative flex flex-col sm:flex-row bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-sm cursor-pointer select-none ${
        isSelected
          ? "border-[var(--blue)] shadow-lg shadow-purple-100"
          : "border-slate-100 hover:border-purple-200 hover:shadow-md"
      }`}
    >
      {/* Ảnh */}
      <div className="relative sm:w-48 h-44 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={img}
          alt={room.roomType.typeName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <DoorOpen size={10} /> Phòng {room.roomNumber}
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3
                className={`text-base font-bold transition-colors ${isSelected ? "text-[var(--blue)]" : "text-slate-800"}`}
              >
                {room.roomType.typeName}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tầng {room.floor} · Phòng {room.roomNumber}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-full">
              Còn trống
            </span>
          </div>

          {/* Giường */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(room.roomType.roomBeds ?? []).slice(0, 2).map((b, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md"
              >
                <BedDouble size={9} /> {b.quantity}× {b.roomBedType}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md">
              <Users size={9} /> Tối đa {room.roomType.maxOccupancy} khách
            </span>
          </div>

          {/* Tiện nghi */}
          <div className="flex flex-wrap gap-2 mt-3">
            {(room.roomType.roomTypeAmenities ?? []).slice(0, 4).map((a) => (
              <span
                key={a.roomAmenityId}
                className="flex items-center gap-1 text-xs text-slate-400"
              >
                <Check size={9} className="text-emerald-500" />{" "}
                {a.roomAmenityName}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between mt-4 pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Tổng ({nights} đêm)</p>
            <p className="text-lg font-bold text-slate-900">
              {formatVND(totalPrice)}
            </p>
          </div>
          {/* Nút chi tiết – ngăn event bubble lên card */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail();
            }}
            className="flex items-center gap-1 border border-slate-200 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
          >
            Chi tiết <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
