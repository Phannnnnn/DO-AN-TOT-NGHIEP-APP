import { Filter, Check } from "lucide-react";
import PriceInput from "./PriceInput";
import { formatVND } from "../utils";

const FilterPanel = ({
  roomTypeOptions,
  selectedTypes,
  onToggleType,
  floorOptions,
  selectedFloors,
  onToggleFloor,
  minPrice,
  maxPrice,
  filterMin,
  filterMax,
  onFilterMinChange,
  onFilterMaxChange,
  onClear,
  totalFiltered,
  totalAll,
}) => {
  const hasFilter =
    selectedTypes.length > 0 ||
    selectedFloors.length > 0 ||
    filterMin !== "" ||
    filterMax !== "";
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Filter size={15} className="text-[var(--blue)]" />
          Bộ lọc
        </span>
        {hasFilter && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-[var(--blue)] hover:underline cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-slate-400">
        Hiển thị{" "}
        <span className="font-bold text-slate-700">{totalFiltered}</span> /{" "}
        {totalAll} lựa chọn
      </p>

      {/* Loại phòng */}
      {roomTypeOptions.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Loại phòng
          </p>
          <div className="flex flex-col gap-2">
            {roomTypeOptions.map((type) => {
              const active = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => onToggleType(type)}
                  className={`flex items-center gap-2.5 text-sm font-semibold px-3 py-2 rounded-xl border transition-all cursor-pointer text-left ${
                    active
                      ? "bg-purple-50 border-purple-200 text-[var(--blue)]"
                      : "border-slate-200 text-slate-600 hover:border-purple-200 hover:bg-purple-50/50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      active
                        ? "bg-[var(--blue)] border-[var(--blue)]"
                        : "border-slate-300"
                    }`}
                  >
                    {active && <Check size={10} className="text-white" />}
                  </span>
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tầng */}
      {floorOptions.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Tầng
          </p>
          <div className="flex flex-wrap gap-2">
            {floorOptions.map((floor) => {
              const active = selectedFloors.includes(floor);
              return (
                <button
                  key={floor}
                  onClick={() => onToggleFloor(floor)}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[var(--blue)] border-[var(--blue)] text-white shadow-md shadow-purple-300/30"
                      : "border-slate-200 text-slate-600 hover:border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  {floor}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Khoảng giá */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Khoảng giá / đêm
        </p>

        {/* Gợi ý khoảng giá thực tế */}
        {minPrice > 0 && maxPrice > 0 && (
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-slate-400">
              {formatVND(minPrice)}
            </span>
            <div className="flex-1 mx-2 h-px bg-gradient-to-r from-purple-200 to-indigo-200" />
            <span className="text-xs text-slate-400">
              {formatVND(maxPrice)}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">
              Từ
            </label>
            <PriceInput
              value={filterMin}
              onChange={onFilterMinChange}
              placeholder={
                minPrice > 0 ? minPrice.toLocaleString("vi-VN") : "0"
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-300 font-bold">đến</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">
              Đến
            </label>
            <PriceInput
              value={filterMax}
              onChange={onFilterMaxChange}
              placeholder={
                maxPrice > 0 ? maxPrice.toLocaleString("vi-VN") : "Tối đa"
              }
            />
          </div>

          {/* Hiển thị khoảng đã chọn */}
          {(filterMin || filterMax) && (
            <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-100 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-[var(--blue)]">
                {filterMin ? formatVND(Number(filterMin)) : "Tối thiểu"}
              </span>
              <span className="text-slate-300 text-xs">→</span>
              <span className="text-xs font-bold text-[var(--blue)]">
                {filterMax ? formatVND(Number(filterMax)) : "Không giới hạn"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
