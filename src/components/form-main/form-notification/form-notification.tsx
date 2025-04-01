interface FormNotificationProps {
  children: string;
}

export default function FormNotification({ children }: FormNotificationProps) {
  return (
    <p className="font-light text-[0.625rem] text-gray-500 text-center mt-6">
      {children}
    </p>
  );
}
