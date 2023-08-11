import Link from "next/link";

type LinkProps = {
  children: any;
  href: string;
};

export default function DocLink({ children, href }: LinkProps) {
  return <Link href={href} className="text-14 text-success-400 underline">{children}</Link>;
}
