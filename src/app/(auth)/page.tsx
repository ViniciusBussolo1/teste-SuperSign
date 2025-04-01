"use client";

import { signIn } from "next-auth/react";

import { ToastContainer } from "react-toastify";

import Button from "@/components/button/button";
import FormFooter from "@/components/form-main/form-footer/form-footer";
import FormInput from "@/components/form-main/form-input/form-input";
import FormMain from "@/components/form-main/form-main";
import FormNotification from "@/components/form-main/form-notification/form-notification";
import FormTitle from "@/components/form-main/form-title/form-title";
import FormComponent from "@/components/form-main/form/form";
import { useLoginForm } from "@/hooks/login-form";
import { Github } from "lucide-react";

export default function Home() {
  const { errors, formValues, setFormValues, handleSubmit } = useLoginForm();

  return (
    <main className="w-full flex justify-center items-center h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <FormMain>
        <div className="w-full">
          <FormTitle
            title="Boas Vindas"
            description="Faça seu login com email e senha"
          />

          <FormComponent action={handleSubmit}>
            <FormInput
              name="email"
              type="email"
              placeholder="eu@exemplo.com.br"
              labelName="Email"
              error={errors.email}
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />

            <FormInput
              name="password"
              type="password"
              placeholder="********"
              labelName="Senha"
              error={errors.password}
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
            />

            <Button type="submit" className="w-full h-10 cursor-pointer">
              Login
            </Button>

            <div className="flex items-center ">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">ou</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Button
              type="button"
              className="w-full h-12 transition cursor-pointer"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "http://localhost:3000/dashboard",
                })
              }
            >
              Entrar com o github <Github size={20} />
            </Button>

            <FormNotification
              children="Ao continuar, você concorda com nossos Termos 
              de Uso e nossa Política de Privacidade."
            />
          </FormComponent>
        </div>

        <FormFooter
          children="Não possui cadastro?"
          href="/register"
          childrenLink="Registre-se"
        />
      </FormMain>
    </main>
  );
}
