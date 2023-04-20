import { FC, DOMAttributes } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SortButton: FC<
  DOMAttributes<HTMLButtonElement> & {
    active: boolean;
    direction?: "asc" | "desc";
    showArrow?: boolean;
    onClick: () => void;
  }
> = ({ active, direction, showArrow, onClick, children, ...props }) => {
  return (
    <button
      type="button"
      className={`flex items-center space-x-1 text-sm hover:underline ${
        active ? "font-bold" : ""
      }`}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <IoIosArrowDown
          className={`transform ${direction === "desc" ? "rotate-180" : ""}`}
        />
      )}
    </button>
  );
};

export default SortButton;
