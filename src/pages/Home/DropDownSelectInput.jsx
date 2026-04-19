import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const GuestDropdown = ({ items, label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = items.find((o) => o.value === value) ?? items[1];

  return (
    <div className="flex flex-col items-center mx-auto relative" ref={ref}>
      <span className="text-xs font-semibold mb-2">{label}</span>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-36 flex items-center justify-between px-3 py-2 border border-[] rounded-lg text-xs font-medium hover:bg-[#F2F2F2] focus:outline-none cursor-pointer"
      >
        {selected.label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown list — absolute để không đẩy layout */}
      {open && (
        <ul className="absolute top-full left-0 w-full mt-1 border border-[var(--slate)]/60 rounded-lg shadow-md bg-[var(--white)] z-50 overflow-hidden">
          {items.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer ${
                option.value === selected.value
                  ? "bg-[var(--blue)] text-[var(--white)]"
                  : " hover:bg-[var(--blue)]/80"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestDropdown;
