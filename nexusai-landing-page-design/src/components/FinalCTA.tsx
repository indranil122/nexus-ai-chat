import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section className="relative py-32 md:py-44 border-t border-[var(--border)] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--bg-soft)] blur-3xl opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[12px] text-[var(--fg-soft)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span>No account · No credit card · MIT licensed</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-[64px] sm:text-[80px] md:text-[112px] leading-[0.95] tracking-[-0.045em] font-semibold text-[var(--fg)]"
        >
          Build faster.
          <br />
          <span className="editorial italic font-normal text-[var(--fg-soft)]">Experiment freely.</span>
          <br />
          Own your AI workflow.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 text-[16.5px] text-[var(--fg-soft)] max-w-xl mx-auto"
        >
          Join thousands of developers who have replaced their AI stack with a single, privacy-first workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl btn-primary px-6 py-3.5 text-[14.5px] font-medium"
          >
            Launch NexusAI
            <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl btn-secondary px-6 py-3.5 text-[14.5px] font-medium"
          >
            <GithubIcon size={15} />
            Star on GitHub
            <span className="ml-1 inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-1.5 py-0.5 text-[11px] font-mono">
              <Star size={9} className="fill-current" />
              12.4k
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
