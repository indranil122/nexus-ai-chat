import { motion } from "framer-motion";
import { User, Building2, Cpu, ArrowRight, Server } from "lucide-react";

export function ZeroServer() {
  return (
    <section className="relative py-28 md:py-36 border-t border-[var(--border)] bg-[var(--bg-soft)]/40">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
            The architecture
          </p>
          <h2 className="text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] font-semibold text-[var(--fg)]">
            The shortest path
            <br />
            <span className="editorial italic font-normal text-[var(--fg-soft)]">between you and the model.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-8"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-wider text-[var(--fg-muted)]">
                <Server size={12} strokeWidth={1.6} />
                Traditional AI Apps
              </div>
              <span className="text-[10.5px] font-mono text-[var(--fg-muted)]">3 hops</span>
            </div>

            <div className="space-y-3">
              <FlowNode icon={<User size={14} />} label="User" sub="browser" muted />
              <FlowArrow muted />
              <FlowNode icon={<Building2 size={14} />} label="Company Server" sub="logs, rate-limits, billing" muted />
              <FlowArrow muted />
              <FlowNode icon={<Cpu size={14} />} label="AI Model" sub="your prompt" muted />
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--border)]">
              <p className="text-[12.5px] text-[var(--fg-soft)]">
                Three parties see your prompt. Your data is logged, retrained on, and monetized.
              </p>
            </div>
          </motion.div>

          {/* NexusAI */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl border-2 border-[var(--fg)] bg-[var(--bg-elev)] p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-wider text-[var(--fg)] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                NexusAI
              </div>
              <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400">1 hop</span>
            </div>

            <div className="space-y-3">
              <FlowNode icon={<User size={14} />} label="You" sub="browser · local" highlight />
              <FlowArrow highlight />
              <FlowNode icon={<Cpu size={14} />} label="AI Provider" sub="direct · encrypted" highlight />
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--border)]">
              <p className="text-[13.5px] text-[var(--fg)] font-medium">
                No middleman. No tracking. No backend.
              </p>
              <p className="text-[12.5px] text-[var(--fg-soft)] mt-1">
                Your browser talks to providers directly. The only party that sees your key is the provider you chose.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({ icon, label, sub, muted, highlight }: { icon: React.ReactNode; label: string; sub: string; muted?: boolean; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3.5 ${
        highlight ? "border-[var(--fg)] bg-[var(--bg-soft)]" : "border-[var(--border)] bg-[var(--bg-soft)]"
      }`}
    >
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
          muted ? "bg-[var(--bg-elev)] text-[var(--fg-soft)] border border-[var(--border)]" : "bg-[var(--fg)] text-[var(--bg)]"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className={`text-[14px] font-medium ${muted ? "text-[var(--fg-soft)]" : "text-[var(--fg)]"}`}>{label}</div>
        <div className={`text-[11.5px] font-mono ${muted ? "text-[var(--fg-muted)]" : "text-[var(--fg-soft)]"}`}>{sub}</div>
      </div>
    </div>
  );
}

function FlowArrow({ muted, highlight }: { muted?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-4">
      <div className={`h-px flex-1 ${highlight ? "bg-[var(--fg)]" : "bg-[var(--border)] border-t border-dashed"} ${muted ? "border-dashed" : ""}`} />
      <ArrowRight size={12} className={highlight ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"} />
      <div className={`h-px flex-1 ${highlight ? "bg-[var(--fg)]" : "bg-[var(--border)] border-t border-dashed"} ${muted ? "border-dashed" : ""}`} />
    </div>
  );
}
