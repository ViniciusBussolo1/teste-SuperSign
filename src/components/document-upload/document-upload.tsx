"use client";

import { useState } from "react";
import Button from "../button/button";
import FormMain from "../form-main/form-main";
import FormComponent from "../form-main/form/form";
import FormInput from "../form-main/form-input/form-input";

interface DocumentUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function DocumentUpload({
  onClose,
  onSuccess,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setError("O arquivo é obrigatório");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/documentos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao enviar documento");

      onSuccess();
      onClose();
    } catch (err) {
      setError("Erro ao enviar documento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

      <div className="bg-white p-6 rounded-lg w-full max-w-md z-50">
        <h2 className="text-xl font-bold mb-4">Upload de Documento</h2>

        <FormMain>
          <div className="w-full">
            <FormComponent action={handleSubmit}>
              <FormInput
                name="file"
                type="file"
                accept=".pdf"
                error={error}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded 
                  bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <Button
                  type="submit"
                  className="px-8 py-5.5 h-10 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </FormComponent>
          </div>
        </FormMain>
      </div>
    </div>
  );
}
