import { House, File } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: <House size={20} />,
    href: "/dashboard",
  },
  {
    title: "Documentos",
    icon: <File size={20} />,
    href: "/dashboard/documentos",
  },
];

interface AsideProps {
  sidebarOpen: boolean;
  pathname: string;
}

export default function Aside({ sidebarOpen, pathname }: AsideProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
    transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-screen ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">SuperSign</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        isActive ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
