import { ReactNode } from "react";

interface FormMainProps {
  children: ReactNode;
}

export default function FormMain({ children }: FormMainProps) {
  return (
    <div className="max-w-[22rem] w-full flex flex-col items-center ">
      {children}
    </div>
  );
}
