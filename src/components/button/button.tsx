import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  className,
  type,
  disabled,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2";

  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
