import { motion } from "framer-motion";
import { Lock, KeyRound, ShieldCheck, FileKey } from "lucide-react";

export function Privacy() {
  return (
    <section className="relative py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-[480px] mx-auto">
              {/* Background rings */}
              <div className="absolute inset-0 rounded-full border border-[var(--border)]" />
              <div className="absolute inset-6 rounded-full border border-[var(--border)]" />
              <div className="absolute inset-14 rounded-full border border-[var(--border)]" />
              <div className="absolute inset-24 rounded-full border border-[var(--border)] border-dashed" />

              {/* Floating encryption badges */}
              <FloatChip className="absolute top-6 left-1/2 -translate-x-1/2" icon={<Lock size={12} />} label="AES-GCM" />
              <FloatChip className="absolute top-1/2 -right-2 -translate-y-1/2" icon={<KeyRound size={12} />} label="Web Crypto API" />
              <FloatChip className="absolute bottom-6 left-1/2 -translate-x-1/2" icon={<ShieldCheck size={12} />} label="Zero telemetry" />
              <FloatChip className="absolute top-1/2 -left-2 -translate-y-1/2" icon={<FileKey size={12} />} label="Local-only" />

              {/* Central lock */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 -m-8 rounded-full bg-[var(--fg)]/5 blur-2xl" />
                  <div className="relative h-28 w-28 rounded-3xl bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]">
                    <Lock size={42} strokeWidth={1.4} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
              Privacy by architecture
            </p>
            <h2 className="text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] font-semibold text-[var(--fg)]">
              Your API keys
              <br />
              <span className="editorial italic font-normal text-[var(--fg-soft)]">stay yours.</span>
            </h2>
            <p className="mt-6 text-[16px] text-[var(--fg-soft)] leading-[1.6] max-w-lg">
              NexusAI never stores, syncs, or proxies your API keys. Everything is encrypted locally using the Web Crypto API and stays entirely inside your browser. Not on our servers. Not in our database. Not anywhere but yours.
            </p>

            <div className="mt-10 space-y-3">
              {[
                { label: "Encrypted at rest with AES-GCM 256", sub: "Keys never leave your device" },
                { label: "Zero telemetry, zero tracking", sub: "No usage analytics, ever" },
                { label: "Open source core", sub: "Audit the entire stack" },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-4">
                  <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--fg)] text-[var(--bg)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[var(--fg)]">{row.label}</div>
                    <div className="text-[12.5px] text-[var(--fg-soft)]">{row.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatChip({ className, icon, label }: { className?: string; icon: React.ReactNode; label: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[11.5px] font-medium text-[var(--fg)] shadow-sm ${className}`}>
      <span className="text-[var(--fg-soft)]">{icon}</span>
      {label}
    </div>
  );
}
