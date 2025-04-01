import { AlignJustify, LogOut } from "lucide-react";
import { title } from "process";

interface HeaderProps {
  onLogout: () => void;
  toggleSidebar: () => void;
  title: string;
}

export default function Header({
  onLogout,
  toggleSidebar,
  title,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 focus:outline-none md:hidden"
        >
          <AlignJustify size={22} />
        </button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <LogOut size={20} />
        <span>Sair</span>
      </button>
    </header>
  );
}
