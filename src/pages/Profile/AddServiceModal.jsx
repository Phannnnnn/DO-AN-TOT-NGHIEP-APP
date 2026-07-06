import React from "react";
import { X, Loader2 } from "lucide-react";
import CustomSelect from "@/components/common/CustomSelect";
import Stepper from "@/components/common/Stepper";
import { useNoScroll } from "@/hooks/useNoScroll";

const AddServiceModal = ({
  showServiceModal,
  setShowServiceModal,
  selectedRoomNumber,
  selectedServiceId,
  setSelectedServiceId,
  availableServices,
  serviceQuantity,
  setServiceQuantity,
  addingService,
  handleAddServiceSubmit,
}) => {
  useNoScroll(showServiceModal);

  if (!showServiceModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
          <h3 className="font-bold text-lg text-slate-800">
            Thêm dịch vụ Phòng {selectedRoomNumber}
          </h3>
          <button
            onClick={() => setShowServiceModal(false)}
            className="text-[var(--black)]/60 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleAddServiceSubmit} className="flex flex-col gap-5">
          {/* Service Select */}
          <CustomSelect
            label="Chọn dịch vụ"
            value={Number(selectedServiceId)}
            onChange={(val) => setSelectedServiceId(Number(val))}
            options={availableServices.map((service) => ({
              value: service.serviceId,
              label: `${service.serviceName} (${Number(service.price).toLocaleString("vi-VN")} VND / ${service.unit})`,
            }))}
            placeholder="Chọn dịch vụ muốn thêm..."
          />

          {/* Quantity Select */}
          <Stepper
            label="Số lượng"
            value={serviceQuantity}
            onChange={(qty) => setServiceQuantity(qty)}
            min={1}
            max={100}
          />

          {/* Cost Calculation */}
          <div className="bg-slate-50 p-4 rounded-xl text-xs flex flex-col gap-1.5 my-2">
            <div className="flex justify-between">
              <span className="text-[var(--black)]/60 font-bold">Đơn giá:</span>
              <span className="font-semibold">
                {Number(
                  availableServices.find(
                    (s) => s.serviceId === Number(selectedServiceId),
                  )?.price || 0,
                ).toLocaleString("vi-VN")}{" "}
                VND
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-1.5">
              <span className="text-[var(--green)] font-bold">Thành tiền:</span>
              <span className="font-bold text-[var(--blue)] text-sm">
                {(
                  Number(
                    availableServices.find(
                      (s) => s.serviceId === Number(selectedServiceId),
                    )?.price || 0,
                  ) * serviceQuantity
                ).toLocaleString("vi-VN")}{" "}
                VND
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowServiceModal(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[var(--green)] font-bold text-xs cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={addingService}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white disabled:opacity-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-600/10 active:scale-95"
            >
              {addingService ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Đang thêm...
                </>
              ) : (
                <>Xác nhận</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
