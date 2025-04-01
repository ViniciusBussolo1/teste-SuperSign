interface FormTitleProps {
  title: string;
  description: string;
}

export default function FormTitle({ title, description }: FormTitleProps) {
  return (
    <div className="mt-11">
      <h1 className="font-semibold text-xl text-black">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
