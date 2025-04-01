import { ReactNode } from "react";
import Form from "next/form";

interface FormProps {
  children: ReactNode;
  action: (e: any) => void;
}

export default function FormComponent({ children, action }: FormProps) {
  return (
    <Form className="mt-11 w-full space-y-7" action={action}>
      {children}
    </Form>
  );
}
