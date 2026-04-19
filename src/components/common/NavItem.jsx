import { Link } from "react-router-dom";

export const NavItem = ({ isAcctive = false, label, direct }) => {
  return (
    <Link
      to={direct}
      className={`${isAcctive ? "text-[var(--orange)] border-b-2 border-[var(--orange)]" : "hover:text-[var(--orange)] border-b-2 border-transparent hover:border-[var(--orange)] text-[var(--white)]"} font-medium pb-1`}
    >
      {label}
    </Link>
  );
};
