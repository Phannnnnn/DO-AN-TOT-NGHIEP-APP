import { DoorOpen, X, ShoppingCart, ChevronRight } from "lucide-react";
import { formatVND } from "../utils";

const SelectionBar = ({ selectedRooms, nights, onClear, onProceed }) => {
  const totalPrice = selectedRooms.reduce(
    (sum, r) => sum + (r.roomType.activePrice ?? 0) * nights,
    0,
  );
  const totalCapacity = selectedRooms.reduce(
    (sum, r) => sum + (r.roomType.maxOccupancy ?? 0),
    0,
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Backdrop blur bar */}
      <div className="bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-2xl shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          {/* Danh sách phòng đã chọn */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {selectedRooms.map((room) => (
              <div
                key={room.roomId}
                className="shrink-0 flex items-center gap-2 bg-purple-50 border border-purple-200 text-[var(--blue)] text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <DoorOpen size={11} />
                Phòng {room.roomNumber} – {room.roomType.typeName}
                <button
                  onClick={() => onClear(room.roomId)}
                  className="hover:text-red-500 transition cursor-pointer ml-1"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[var(--blue)] text-white font-bold text-sm flex items-center justify-center shadow-md shadow-purple-400/30">
                  {selectedRooms.length}
                </div>
                <div>
                  <p className="text-xs text-slate-400">phòng đã chọn</p>
                  <p className="text-xs font-semibold text-slate-600">
                    Tổng sức chứa: {totalCapacity} khách
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-xs text-slate-400 mb-0.5">
                  Tổng ({nights} đêm)
                </p>
                <p className="text-base font-bold text-slate-900">
                  {formatVND(totalPrice)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onClear("all")}
                className="text-xs font-semibold text-slate-500 hover:text-red-500 transition cursor-pointer px-3 py-2"
              >
                Bỏ tất cả
              </button>
              <button
                onClick={onProceed}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md shadow-purple-500/20"
              >
                <ShoppingCart size={15} />
                Xem chi tiết
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionBar;
