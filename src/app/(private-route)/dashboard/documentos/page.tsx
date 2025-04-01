"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react";
import { File, Plus } from "lucide-react";

import Button from "@/components/button/button";
import DashboardLayout from "@/components/dashboard-layout/dashboard-layout";
import DocumentUpload from "@/components/document-upload/document-upload";

import Link from "next/link";

interface Documento {
  id: string;
  name: string;
  fileKey: string;
  userId: string;
  status: "PENDING" | "SIGNED";
  createdAt: Date;
}

export default function Documentos() {
  const session = useSession();
  const userId = session.data?.user.id;

  const router = useRouter();

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documentos");
      const data = await res.json();

      setDocumentos(data);
    } catch (error) {
      console.error("Erro ao trazer os documentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/documentos/${id}?id=${id}`, { method: "DELETE" });
      fetchDocuments();
    } catch (error) {
      console.error("Erro ao deletar o documento", error);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-2xl">
        Carregando...
      </div>
    );

  return (
    <DashboardLayout title="Assinaturas" onLogout={handleLogout}>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Meus Documentos</h1>
              <p className="text-gray-500">Gerencie todos os seus documentos</p>
            </div>
            <Button
              type="button"
              className="px-4 py-2 font-medium rounded-md transition-colors"
              onClick={() => setShowUpload(true)}
            >
              <Plus size={18} />
              Novo Documento
            </Button>
          </div>

          {showUpload && (
            <DocumentUpload
              onClose={() => setShowUpload(false)}
              onSuccess={fetchDocuments}
            />
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documentos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        <h1 className="text-center text-gray-800">
                          Você ainda não possui documentos
                        </h1>
                      </td>
                    </tr>
                  ) : (
                    documentos.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <File size={20} className="mr-2 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              doc.status === "SIGNED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {doc.status === "SIGNED" ? "Assinado" : "Pendente"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
                          <Link
                            href={`/dashboard/documentos/visualizar-documento/${doc.id}`}
                            className="px-4 py-2 border border-gray-300 rounded-md text-black 
                            bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Visualizar
                          </Link>

                          <Button
                            type="button"
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleDelete(doc.id)}
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
