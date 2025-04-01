import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória!"),
});

export function useLoginForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    const validation = formSchema.safeParse(formValues);

    if (!validation.success) {
      const errorsValidation = validation.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(errorsValidation || {});
      return;
    }

    const { email, password } = formValues;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (!result?.error) {
      router.push(result?.url || "/");
    }
  };

  return {
    errors,
    formValues,
    setFormValues,
    handleSubmit,
  };
}
