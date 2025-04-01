"use client";

import { AlignJustify, File, FilePen, House, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Aside from "./aside/aside";
import Header from "./header/header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  onLogout: () => void;
}

export default function DashboardLayout({
  children,
  title,
  onLogout,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathanameUser = usePathname();
  const pathname = pathanameUser || "";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <Aside sidebarOpen={sidebarOpen} pathname={pathname} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onLogout={onLogout}
          toggleSidebar={toggleSidebar}
          title={title}
        />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
