"use server";

import db from "@/utils/db";
import { hashSync } from "bcrypt-ts";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório!"),
  email: z.string().email("E-mail inválido!"),
  password: z.string().min(1, "Senha é obrigatória!"),
});

export default async function registerForms(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  const validationSchema = registerSchema.safeParse(data);

  if (!validationSchema.success) {
    const errors = validationSchema.error.errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {} as Record<string, string>);

    return {
      success: false,
      errors,
      values: data,
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      message: "Este e-mail de usúario já está cadastrado!",
      success: false,
    };
  }

  const userCreated = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password),
    },
  });

  if (userCreated) {
    return {
      message: "Cadastro realizado com sucesso!",
      success: true,
    };
  }
}
