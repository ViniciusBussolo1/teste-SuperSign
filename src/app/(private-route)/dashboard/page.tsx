"use client";

import Button from "@/components/button/button";
import DashboardLayout from "@/components/dashboard-layout/dashboard-layout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <DashboardLayout title="Dashboard" onLogout={handleLogout}>
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard</h1>
          <p className="text-gray-500">
            Gerencie seus documentos e assinaturas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Documentos Recentes</h3>
            <p className="text-gray-500 mb-4">
              Acesse seus documentos recentes
            </p>
            <Button
              type="button"
              onClick={() => router.push("/dashboard/documentos")}
              className="w-full h-10 cursor-pointer"
            >
              Ver Documentos
            </Button>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
