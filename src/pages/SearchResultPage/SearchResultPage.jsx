import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Users,
  Moon,
  BedDouble,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Tag,
  Sparkles,
  DoorOpen,
} from "lucide-react";
import { bookingService } from "@/services/booking/bookingService";

import FilterPanel from "./components/FilterPanel";
import CombinationCard from "./components/CombinationCard";
import RoomCard from "./components/RoomCard";
import SelectionBar from "./components/SelectionBar";
import { formatDate } from "./utils";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const adults = searchParams.get("adults") ?? "1";
  const children = searchParams.get("children") ?? "0";

  const [combinations, setCombinations] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [filterMin, setFilterMin] = useState("");
  const [filterMax, setFilterMax] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Multi-select state
  const [selectedRoomIds, setSelectedRoomIds] = useState(new Set());

  const nights = (() => {
    if (!checkInDate || !checkOutDate) return 0;
    return Math.max(
      1,
      Math.round((new Date(checkOutDate) - new Date(checkInDate)) / 86400000),
    );
  })();

  /* ── Fetch ── */
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await bookingService.getAvailableRooms({
          checkInDate,
          checkOutDate,
          adults: Number(adults),
          children: Number(children),
        });
        if (res.success && res.data) {
          setCombinations(res.data.combinations ?? []);
          setAvailableRooms(res.data.availableRooms ?? []);
        } else {
          setCombinations([]);
          setAvailableRooms([]);
        }
      } catch {
        setCombinations([]);
        setAvailableRooms([]);
      } finally {
        setLoading(false);
      }
    };
    if (checkInDate && checkOutDate) fetchRooms();
    else setLoading(false);
  }, [checkInDate, checkOutDate, adults, children]);

  /* ── Filter options ── */
  const roomTypeOptions = useMemo(() => {
    const types = new Set(availableRooms.map((r) => r.roomType.typeName));
    return [...types].sort();
  }, [availableRooms]);

  const floorOptions = useMemo(() => {
    const floors = new Set(availableRooms.map((r) => r.floor));
    return [...floors].sort((a, b) => a - b);
  }, [availableRooms]);

  const { minPrice, maxPrice } = useMemo(() => {
    if (!availableRooms.length) return { minPrice: 0, maxPrice: 0 };
    const prices = availableRooms.map((r) => r.roomType.activePrice ?? 0);
    return { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };
  }, [availableRooms]);

  /* ── Filter logic ── */
  const matchesFilters = (pricePerNight, roomTypeNames, floors) => {
    const min = filterMin !== "" ? Number(filterMin) : null;
    const max = filterMax !== "" ? Number(filterMax) : null;
    if (min !== null && pricePerNight < min) return false;
    if (max !== null && pricePerNight > max) return false;
    if (selectedTypes.length > 0) {
      const hasType = roomTypeNames.some((t) => selectedTypes.includes(t));
      if (!hasType) return false;
    }
    if (selectedFloors.length > 0) {
      const hasFloor = floors.some((f) => selectedFloors.includes(f));
      if (!hasFloor) return false;
    }
    return true;
  };

  const filteredCombinations = useMemo(
    () =>
      combinations.filter((combo) => {
        const pricePerNight = combo.rooms.reduce(
          (s, r) => s + (r.roomType.activePrice ?? 0),
          0,
        );
        return matchesFilters(
          pricePerNight,
          combo.rooms.map((r) => r.roomType.typeName),
          combo.rooms.map((r) => r.floor),
        );
      }),
    [combinations, selectedTypes, selectedFloors, filterMin, filterMax],
  );

  const filteredRooms = useMemo(
    () =>
      availableRooms.filter((room) =>
        matchesFilters(
          room.roomType.activePrice ?? 0,
          [room.roomType.typeName],
          [room.floor],
        ),
      ),
    [availableRooms, selectedTypes, selectedFloors, filterMin, filterMax],
  );

  const totalFiltered = filteredCombinations.length + filteredRooms.length;
  const totalAll = combinations.length + availableRooms.length;
  const hasActiveFilter =
    selectedTypes.length > 0 ||
    selectedFloors.length > 0 ||
    filterMin !== "" ||
    filterMax !== "";

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedFloors([]);
    setFilterMin("");
    setFilterMax("");
  };

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );

  const toggleFloor = (floor) =>
    setSelectedFloors((prev) =>
      prev.includes(floor) ? prev.filter((f) => f !== floor) : [...prev, floor],
    );

  /* ── Multi-select handlers ── */
  const toggleRoomSelect = (roomId) => {
    setSelectedRoomIds((prev) => {
      const next = new Set(prev);
      if (next.has(roomId)) next.delete(roomId);
      else next.add(roomId);
      return next;
    });
  };

  const removeSelectedRoom = (roomId) => {
    if (roomId === "all") {
      setSelectedRoomIds(new Set());
    } else {
      setSelectedRoomIds((prev) => {
        const next = new Set(prev);
        next.delete(roomId);
        return next;
      });
    }
  };

  const selectedRoomObjects = availableRooms.filter((r) =>
    selectedRoomIds.has(r.roomId),
  );

  /* ── Navigate ── */
  const goToDetail = (combo) =>
    navigate("/rooms/detail", {
      state: { combo, checkInDate, checkOutDate, adults, children },
    });

  const goToDetailSingleRoom = (room) =>
    goToDetail({
      rooms: [room],
      totalCapacity: room.roomType.maxOccupancy,
    });

  const goToDetailMultiSelect = () => {
    if (!selectedRoomObjects.length) return;
    const combo = {
      rooms: selectedRoomObjects,
      totalCapacity: selectedRoomObjects.reduce(
        (s, r) => s + (r.roomType.maxOccupancy ?? 0),
        0,
      ),
    };
    goToDetail(combo);
  };

  /* ── Filter panel props ── */
  const filterProps = {
    roomTypeOptions,
    selectedTypes,
    onToggleType: toggleType,
    floorOptions,
    selectedFloors,
    onToggleFloor: toggleFloor,
    minPrice,
    maxPrice,
    filterMin,
    filterMax,
    onFilterMinChange: setFilterMin,
    onFilterMaxChange: setFilterMax,
    onClear: clearFilters,
    totalFiltered,
    totalAll,
  };

  // Thêm padding bottom khi đang có phòng được chọn
  const hasSelection = selectedRoomIds.size > 0;

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-800 ${hasSelection ? "pb-44" : ""}`}
    >
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition text-sm font-semibold cursor-pointer shrink-0"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Trang chủ</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <span className="text-[var(--blue)] font-semibold flex items-center gap-1">
                <Moon size={13} /> {formatDate(checkInDate)} →{" "}
                {formatDate(checkOutDate)}
                <span className="text-slate-400 font-normal text-xs ml-1">
                  ({nights} đêm)
                </span>
              </span>
              <div className="h-3 w-px bg-slate-200 hidden sm:block" />
              <span className="text-slate-500 flex items-center gap-1">
                <Users size={12} /> {adults} người lớn
                {Number(children) > 0 ? `, ${children} trẻ em` : ""}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs font-bold text-[var(--blue)] border border-purple-200 hover:border-[var(--blue)] hover:bg-purple-50 px-3 py-1.5 rounded-lg transition cursor-pointer shrink-0"
          >
            <Search size={12} /> Tìm lại
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 mb-8">
          <div>
            <p className="text-[var(--blue)] text-xs font-bold mb-2">
              Kết quả tìm kiếm
            </p>
            <h1 className="text-4xl font-bold text-slate-800 leading-tight">
              {loading ? "Đang tìm kiếm..." : `${totalFiltered} lựa chọn`}
              <br />
              <span className="text-[var(--blue)]">phù hợp cho bạn</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {adults} người lớn
              {Number(children) > 0 ? `, ${children} trẻ em` : ""} · {nights}{" "}
              đêm
            </p>
          </div>

          {/* Nút lọc mobile */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            Lọc
            {hasActiveFilter && (
              <span className="w-5 h-5 rounded-full bg-[var(--blue)] text-white text-xs font-bold flex items-center justify-center">
                {selectedTypes.length +
                  selectedFloors.length +
                  (filterMin ? 1 : 0) +
                  (filterMax ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* ── Layout: Sidebar + Content ── */}
        <div className="flex gap-8 items-start">
          {/* Sidebar lọc – desktop */}
          {!loading && totalAll > 0 && (
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <FilterPanel {...filterProps} />
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-10">
            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-2 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 text-sm">
                  Đang tìm phòng phù hợp...
                </p>
              </div>
            )}

            {/* Không có phòng trống */}
            {!loading && totalAll === 0 && (
              <div className="text-center py-32 border border-dashed border-slate-200 rounded-3xl bg-white">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                  <BedDouble size={28} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Không tìm thấy phòng trống
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  Vui lòng thử ngày khác hoặc điều chỉnh số lượng khách.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Tìm lại
                </button>
              </div>
            )}

            {/* Lọc rỗng */}
            {!loading && totalAll > 0 && totalFiltered === 0 && (
              <div className="text-center py-24 border border-dashed border-slate-200 rounded-3xl bg-white">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
                  <Tag size={28} className="text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Không có kết quả phù hợp
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  Bộ lọc hiện tại không khớp với bất kỳ phòng nào.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* ── Phần 1: Tổ hợp đề xuất ── */}
            {!loading && filteredCombinations.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Sparkles size={15} className="text-[var(--blue)]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Tổ hợp phòng được đề xuất
                    </h2>
                    <p className="text-xs text-slate-400">
                      Các tổ hợp tối ưu đáp ứng đủ số lượng khách
                    </p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-[var(--blue)] bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
                    {filteredCombinations.length} tổ hợp
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCombinations.map((combo, idx) => (
                    <CombinationCard
                      key={idx}
                      combo={combo}
                      nights={nights}
                      onClick={() => goToDetail(combo)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Divider */}
            {!loading &&
              filteredCombinations.length > 0 &&
              filteredRooms.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">
                    Lựa chọn thêm
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              )}

            {/* ── Phần 2: Danh sách phòng đơn lẻ ── */}
            {!loading && filteredRooms.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <DoorOpen size={15} className="text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Danh sách phòng còn trống
                    </h2>
                    <p className="text-xs text-slate-400">
                      Chọn một hoặc nhiều phòng để đặt cùng lúc
                    </p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    {filteredRooms.length} phòng
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {filteredRooms.map((room, idx) => (
                    <RoomCard
                      key={idx}
                      room={room}
                      nights={nights}
                      isSelected={selectedRoomIds.has(room.roomId)}
                      onToggleSelect={() => toggleRoomSelect(room.roomId)}
                      onViewDetail={() => goToDetailSingleRoom(room)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* ── Drawer lọc – mobile ── */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <span className="text-base font-bold text-slate-800">Bộ lọc</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={15} className="text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <FilterPanel {...filterProps} />
            </div>
            <div className="p-6 border-t border-slate-100">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold transition cursor-pointer hover:from-purple-700 hover:to-indigo-700"
              >
                Xem {totalFiltered} kết quả
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Thanh chọn phòng – sticky bottom ── */}
      {hasSelection && (
        <SelectionBar
          selectedRooms={selectedRoomObjects}
          nights={nights}
          onClear={removeSelectedRoom}
          onProceed={goToDetailMultiSelect}
        />
      )}
    </div>
  );
};

export default SearchResultPage;
