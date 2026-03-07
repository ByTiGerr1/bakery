"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CakeSlice } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const useSolidStyle = isScrolled || pathname !== "/";
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);

      setLastScrollY((previousScrollY) => {
        if (currentScrollY <= 0) {
          setIsVisible(true);
        } else if (currentScrollY > previousScrollY) {
          setIsVisible(false);
        } else if (currentScrollY < previousScrollY) {
          setIsVisible(true);
        }

        return currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      data-last-scroll-position={lastScrollY}
      className={`fixed left-0 right-0 top-0 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        useSolidStyle
          ? "border-b border-rose-100/70 bg-white/80 text-rose-950 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] sm:px-4 sm:py-4 sm:text-sm md:grid-cols-[1fr_auto_1fr] md:px-6 md:py-5 lg:px-8">
        <nav className="hidden items-center gap-2 md:flex md:justify-start">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              className={`rounded-full border px-4 py-2 transition ${
                pathname === link.href
                  ? useSolidStyle
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-white/70 bg-white/15 text-amber-100"
                  : useSolidStyle
                    ? "border-transparent text-rose-700 hover:border-rose-100 hover:bg-rose-50/70"
                    : "border-white/20 text-white/90 hover:border-white/50 hover:bg-white/10"
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex justify-center">
          <div className="flex items-center gap-3 text-center sm:gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl border bg-gradient-to-br from-rose-100/40 to-amber-100/40 shadow-lg backdrop-blur-sm sm:h-11 sm:w-11 md:h-12 md:w-12 ${
                useSolidStyle
                  ? "border-rose-200 text-rose-700"
                  : "border-white/40 text-white"
              }`}
            >
              <CakeSlice className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-left">
              <p
                className={`text-[9px] font-bold uppercase tracking-[0.22em] sm:text-[10px] md:text-xs ${
                  useSolidStyle ? "text-rose-400" : "text-white/80"
                }`}
              >
                Pastelería Encina
              </p>
              <p className="text-xs font-black leading-tight sm:text-sm md:text-base">
                Horneado artesanal
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:justify-end">
          <CartDrawer />
        </div>
      </div>

      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.14em] sm:px-4 sm:text-xs md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className={`whitespace-nowrap rounded-full border px-3 py-2 transition ${
              pathname === link.href
                ? useSolidStyle
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : "border-white/80 bg-white/20 text-white"
                : useSolidStyle
                  ? "border-rose-100 text-rose-600 hover:border-rose-200 hover:bg-rose-50"
                  : "border-white/40 text-white/90 hover:bg-white/10"
            }`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <div className="ml-1">
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
}
