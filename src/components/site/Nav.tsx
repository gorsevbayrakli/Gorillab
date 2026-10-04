import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV } from "./data";
import { EASE, Magnetic } from "./motion";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "bg-background" : "bg-transparent"}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8" aria-label="Ana menü">
          <a href="#top" className="display text-2xl tracking-wide md:text-3xl">GORILLAB</a>
          <ul className="hidden items-center gap-8 text-sm font-medium lg:flex">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="text-foreground/80 transition-colors hover:text-primary">{n.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Magnetic>
              <a href="#deneme" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground sm:inline-block">
                Ücretsiz Deneme Dersi
              </a>
            </Magnetic>
            <button onClick={() => setOpen((o) => !o)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open}>
              <span className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="grain fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 pt-16 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ul className="relative z-10 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.a href={n.href} onClick={() => setOpen(false)} className="display block text-6xl hover:text-primary"
                    initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.05 * i, duration: 0.6, ease: EASE }}>
                    {n.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <a href="#deneme" onClick={() => setOpen(false)} className="relative z-10 mt-10 self-start rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground">
              Ücretsiz Deneme Dersi
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
