"use client";

import { useState } from "react";
import Button from "../button/button";
import SignaturePanel from "../signature-panel/signature-pane";

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

interface DocumentViewerProps {
  documento: Documento;
}

export default function DocumentViewer({ documento }: DocumentViewerProps) {
  const [showSignaturePanel, setShowSignaturePanel] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <p>
          <strong>Status:</strong>{" "}
          {documento.status === "SIGNED" ? "Assinado" : "Pendente"}
        </p>
        <p>
          <strong>Criado em:</strong>{" "}
          {new Date(documento.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="border p-4 mb-4 min-h-[400px] flex items-center justify-center bg-gray-100">
        <p>Visualização do PDF: {documento.name}</p>
      </div>

      {documento.status === "PENDING" && (
        <Button
          type="button"
          onClick={() => setShowSignaturePanel(true)}
          className="px-4 py-2 cursor-pointer"
        >
          Assinar Documento
        </Button>
      )}

      {showSignaturePanel && (
        <SignaturePanel
          documentId={documento.id}
          onClose={() => setShowSignaturePanel(false)}
          onSuccess={() => window.location.reload()}
        />
      )}

      {documento.signature.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Assinaturas</h3>
          <div className="grid gap-2">
            {documento.signature.map((signature) => (
              <div key={signature.id} className="border p-2 rounded">
                <p>
                  Assinado em: {new Date(signature.signedAt!).toLocaleString()}
                </p>
                <div className="mt-2">
                  <p className="font-medium">Assinatura:</p>
                  <img
                    src={signature.signatureImg}
                    alt="Assinatura"
                    className="h-20 border"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
