import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: "top" | "bottom";
}

const Tooltip = ({ children, text, position = "top" }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <span
        className={`
          absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md
          whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 left-1/2 -translate-x-1/2
          ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}
        `}
      >
        {text}
        <span
          className={`
            absolute left-1/2 -translate-x-1/2 border-4 border-transparent
            ${position === "top" ? "top-full border-t-gray-900" : "bottom-full border-b-gray-900"}
          `}
        />
      </span>
    </div>
  );
};

export default Tooltip;
