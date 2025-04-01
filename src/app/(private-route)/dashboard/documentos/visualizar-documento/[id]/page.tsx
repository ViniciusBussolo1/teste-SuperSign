"use client";

import DocumentViewer from "@/components/document-viewer.tsx/document-viwer";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

interface Documento {
  id: string;
  name: string;
  fileKey: string;
  status: "PENDING" | "SIGNED";
  createdAt: string;
  signature: Assinatura[];
}

interface Assinatura {
  id: string;
  signatureImg: string;
  signedAt: string;
}

export default function DocumentosPreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = use(params);

  const session = useSession();
  const userId = session.data?.user.id;

  const fecthDocument = async () => {
    try {
      const res = await fetch(`/api/documentos/${userId}?id=${id}`);
      const data = await res.json();
      setDocumento(data);
    } catch (error) {
      console.error("Erro ao trazer o documento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthDocument();
  }, [userId]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-2xl">
        Carregando...
      </div>
    );
  if (!documento)
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-2xl">
        Documento não encontrado
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{documento.name}</h1>
      <DocumentViewer documento={documento} />
    </div>
  );
}
