"use client";

import { useEffect, useState } from "react";
import { CakeSlice } from "lucide-react";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY === 0);

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
      className={`fixed left-0 right-0 top-0 z-20 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isAtTop ? "bg-transparent" : "bg-slate-950/60 backdrop-blur-md"}`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-sm md:px-6 lg:px-8">
        <nav className="hidden items-center gap-5 md:flex">
          <a className="transition hover:text-amber-100" href="#inicio">
            Inicio
          </a>
          <a className="transition hover:text-amber-100" href="#productos">
            Productos
          </a>
        </nav>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-3 text-center text-white">
            <div className="flex h-12 w-12 items-center justify-center border border-white/40 bg-gradient-to-br from-rose-100/30 to-amber-100/30 text-white shadow-lg backdrop-blur-sm">
              <CakeSlice className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/80 sm:text-xs">
                Encina&apos;s Bakery
              </p>
              <p className="text-sm font-black leading-tight sm:text-base">
                Sabor real
              </p>
            </div>
          </div>
        </div>
        <nav className="hidden items-center justify-end gap-5 md:flex">
          <a className="transition hover:text-amber-100" href="#nosotros">
            Nosotros
          </a>
          <a className="transition hover:text-amber-100" href="#productos">
            Pedidos
          </a>
        </nav>
        <div className="flex flex-1 justify-end md:hidden">
          <a
            className="rounded-none border border-white/40 px-4 py-2 text-xs font-bold transition hover:bg-white/10"
            href="#productos"
          >
            Ver catálogo
          </a>
        </div>
      </div>
    </header>
  );
}
