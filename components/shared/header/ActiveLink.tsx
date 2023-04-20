import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface ActiveLinkProps {
  href: string;
  children: string | React.ReactNode;
  onClick?: () => void;
}

const ActiveLink: FC<ActiveLinkProps> = ({ href, children, onClick }) => {
  const { pathname } = useRouter();
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`
        text-3xl md:text-base py-2 md:py-0 w-full md:w-auto text-center md:text-left rounded
      ${
        `/${href}`.includes(pathname)
          ? "font-extrabold bg-creator-light md:bg-transparent"
          : "ring-2 ring-creator-gradient md:ring-0"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
