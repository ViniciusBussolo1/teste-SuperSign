import Link from "next/link";

interface FormFooterProps {
  href: string;
  children: string;
  childrenLink: string;
}

export default function FormFooter({
  href,
  children,
  childrenLink,
}: FormFooterProps) {
  return (
    <p className="font-light text-[0.625rem] text-gray-500 mt-11 ">
      {children}
      {""}
      <Link
        href={href}
        className="text-[#5E6063] font-bold hover:text-gray-800 ml-1"
      >
        {childrenLink}
      </Link>
    </p>
  );
}
