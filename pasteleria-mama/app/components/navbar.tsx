"use client";

import { useEffect, useState } from "react";
import { CakeSlice } from "lucide-react";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled
          ? "bg-white/80 text-rose-950 shadow-sm backdrop-blur-md"
          : "border border-white/40 bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-sm md:px-6 lg:px-8">
        <nav className="hidden items-center gap-5 md:flex">
          <a
            className={`transition ${
              isScrolled ? "hover:text-rose-600" : "hover:text-amber-100"
            }`}
            href="#inicio"
          >
            Inicio
          </a>
          <a
            className={`transition ${
              isScrolled ? "hover:text-rose-600" : "hover:text-amber-100"
            }`}
            href="#productos"
          >
            Productos
          </a>
        </nav>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-3 text-center">
            <div
              className={`flex h-12 w-12 items-center justify-center border bg-gradient-to-br from-rose-100/40 to-amber-100/40 shadow-lg backdrop-blur-sm ${
                isScrolled
                  ? "border-rose-200 text-rose-700"
                  : "border-white/40 text-white"
              }`}
            >
              <CakeSlice className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.28em] sm:text-xs ${
                  isScrolled ? "text-rose-400" : "text-white/80"
                }`}
              >
                Encina&apos;s Bakery
              </p>
              <p className="text-sm font-black leading-tight sm:text-base">
                Sabor real
              </p>
            </div>
          </div>
        </div>
        <nav className="hidden items-center justify-end gap-5 md:flex">
          <a
            className={`transition ${
              isScrolled ? "hover:text-rose-600" : "hover:text-amber-100"
            }`}
            href="#nosotros"
          >
            Nosotros
          </a>
          <a
            className={`transition ${
              isScrolled ? "hover:text-rose-600" : "hover:text-amber-100"
            }`}
            href="#productos"
          >
            Pedidos
          </a>
        </nav>
        <div className="flex flex-1 justify-end md:hidden">
          <a
            className={`rounded-none border px-4 py-2 text-xs font-bold transition ${
              isScrolled
                ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                : "border-white/40 hover:bg-white/10"
            }`}
            href="#productos"
          >
            Ver catálogo
          </a>
        </div>
      </div>
    </header>
  );
}
