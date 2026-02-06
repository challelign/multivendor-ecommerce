"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import NavbarSidebar from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface NavbarItemProps {
  href: string;
  children: ReactNode;
  isActive?: boolean;
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contacts", children: "Contacts" },
];
export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <nav className="flex h-20 border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          aria-label="Open menu"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
      {session.data?.user ? (
        <Button
          asChild
          variant="outline"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black hover:bg-pink-400 transition-colors text-lg text-white hover:text-white  "
        >
          <Link href="/admin"> Dashboard</Link>
        </Button>
      ) : (
        <>
          <div className="hidden lg:flex">
            <Button
              asChild
              variant="secondary"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg  "
            >
              <Link prefetch href="/sign-in">
                Login
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black hover:bg-pink-400 transition-colors text-lg text-white hover:text-white  "
            >
              <Link prefetch href="/sign-up">
                Start Selling
              </Link>
            </Button>
          </div>
        </>
      )}
    </nav>
  );
};
