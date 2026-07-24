import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 12, suffix: "+", label: "Providers", sub: "Integrated and growing" },
  { value: 300, suffix: "+", label: "Models", sub: "Across all tiers" },
  { value: 40, suffix: "+", label: "Free Models", sub: "Available right now" },
  { value: 100, suffix: "%", label: "Client Side", sub: "Runs in your browser" },
  { value: 0, suffix: "", label: "Servers", sub: "We host nothing" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} start={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, start, index }: { stat: typeof stats[0]; start: boolean; index: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1500;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(stat.value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(stat.value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="text-center md:text-left"
    >
      <div className="flex items-baseline gap-0.5 justify-center md:justify-start">
        <span className="text-[56px] md:text-[72px] leading-none tracking-[-0.04em] font-semibold text-[var(--fg)]">
          {val}
        </span>
        <span className="text-[28px] md:text-[36px] font-semibold text-[var(--fg-soft)]">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-[13.5px] font-medium text-[var(--fg)]">{stat.label}</div>
      <div className="text-[11.5px] text-[var(--fg-muted)] font-mono mt-0.5">{stat.sub}</div>
    </motion.div>
  );
}
