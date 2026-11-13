"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  /** Mark the link active for child routes too (e.g. /docs/blur for /docs). */
  matchPrefix?: boolean;
};

export function NavLink({
  href,
  children,
  className,
  activeClassName,
  matchPrefix = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = matchPrefix
    ? pathname === href || pathname.startsWith(`${href}/`)
    : pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cx(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
