import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Line-by-line mask slide-up reveal. */
export function RevealLines({ lines, className, as = "h2" }: { lines: ReactNode[]; className?: string; as?: "h1" | "h2" | "h3" }) {
  const Tag = motion[as];
  const reduce = useReducedMotion();
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: reduce ? 0 : "105%" }, show: { y: 0 } }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Hand-drawn red marker circle around a word. */
export function Circled({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-[8%] -top-[18%] h-[136%] w-[116%] overflow-visible"
      >
        <motion.path
          d="M40 22 C 110 4, 250 6, 285 40 C 305 72, 250 108, 150 112 C 60 115, 8 92, 12 60 C 16 30, 80 14, 175 12 C 220 11, 250 16, 262 22"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
        />
      </svg>
    </span>
  );
}

/** Labeled photo placeholder with slow parallax + scale-in. */
export function Photo({ label, className, parallax = true }: { label: string; className?: string; parallax?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-surface", className)} role="img" aria-label={label}>
      <motion.div
        className="photo-ph absolute -inset-[10%] flex items-center justify-center"
        style={parallax && !reduce ? { y } : undefined}
        initial={{ scale: reduce ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <span className="absolute inset-0 flex items-center justify-center p-4 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
        [FOTO: {label}]
      </span>
    </div>
  );
}

/** Magnetic hover wrapper (desktop pointer only). */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const move = (e: MouseEvent) => {
    if (reduce || !ref.current || !window.matchMedia("(pointer:fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  const leave = () => ref.current && (ref.current.style.transform = "");
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={leave} className="inline-block transition-transform duration-300 ease-out">
      {children}
    </span>
  );
}
