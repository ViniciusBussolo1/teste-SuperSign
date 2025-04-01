"use client";

import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "../button/button";

interface SignaturePanelProps {
  documentId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SignaturePanel({
  documentId,
  onClose,
  onSuccess,
}: SignaturePanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  const handleSign = async () => {
    setLoading(true);
    setError("");

    if (!signatureCanvasRef.current) {
      return;
    }

    const signatureImage = signatureCanvasRef.current.toDataURL();

    const res = await fetch("/api/assinaturas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentId,
        signatureImg: signatureImage,
      }),
    });

    if (!res.ok) {
      setError("Erro ao assinar documento. Tente novamente.");
      throw new Error("Erro ao assinar documento");
    }

    onSuccess();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      <div className="bg-white p-6 rounded-lg w-full max-w-md z-50">
        <h2 className="text-xl font-bold mb-4">Assinar Documento</h2>

        <div className="mb-4">
          <p className="mb-2">Desenhe sua assinatura:</p>

          <SignatureCanvas
            ref={signatureCanvasRef}
            penColor="black"
            canvasProps={{
              className: "border rounded w-full h-32 bg-white",
            }}
          />

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            className="mt-2 text-sm text-gray-800 "
            onClick={clearSignature}
          >
            Limpar assinatura
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded text-black 
          bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <Button
            type="button"
            onClick={handleSign}
            className="px-4 py-2 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Assinando..." : "Confirmar Assinatura"}
          </Button>
        </div>
      </div>
    </div>
  );
}
