import { motion } from "framer-motion";
import { Check, Minus, Server } from "lucide-react";

type Row = {
  name: string;
  initials: string;
  models: string;
  free: string;
  streaming: boolean;
  vision: boolean;
  reasoning: boolean;
  local: boolean;
};

const rows: Row[] = [
  { name: "OpenRouter", initials: "OR", models: "118+", free: "47", streaming: true, vision: true, reasoning: true, local: false },
  { name: "Groq", initials: "GQ", models: "12+", free: "8", streaming: true, vision: true, reasoning: true, local: false },
  { name: "NVIDIA NIM", initials: "NV", models: "32+", free: "14", streaming: true, vision: true, reasoning: true, local: false },
  { name: "Together AI", initials: "TG", models: "60+", free: "11", streaming: true, vision: true, reasoning: true, local: false },
  { name: "Fireworks", initials: "FW", models: "40+", free: "6", streaming: true, vision: true, reasoning: false, local: false },
  { name: "DeepInfra", initials: "DI", models: "55+", free: "9", streaming: true, vision: false, reasoning: true, local: false },
  { name: "Ollama", initials: "OL", models: "∞", free: "∞", streaming: true, vision: true, reasoning: true, local: true },
  { name: "LM Studio", initials: "LM", models: "∞", free: "∞", streaming: true, vision: true, reasoning: true, local: true },
];

export function Comparison() {
  return (
    <section id="compare" className="relative py-28 md:py-36 border-t border-[var(--border)] bg-[var(--bg-soft)]/40">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
            Provider matrix
          </p>
          <h2 className="text-[44px] sm:text-[56px] lg:text-[60px] leading-[1.02] tracking-[-0.035em] font-semibold text-[var(--fg)]">
            Compare every provider,
            <br />
            <span className="editorial italic font-normal text-[var(--fg-soft)]">in a single glance.</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-soft)]/50">
                  <th className="text-left font-medium text-[var(--fg-soft)] px-6 py-3.5 text-[12px] uppercase tracking-wider">Provider</th>
                  <th className="text-left font-medium text-[var(--fg-soft)] px-4 py-3.5 text-[12px] uppercase tracking-wider">Models</th>
                  <th className="text-left font-medium text-[var(--fg-soft)] px-4 py-3.5 text-[12px] uppercase tracking-wider">Free</th>
                  <th className="text-center font-medium text-[var(--fg-soft)] px-4 py-3.5 text-[12px] uppercase tracking-wider">Streaming</th>
                  <th className="text-center font-medium text-[var(--fg-soft)] px-4 py-3.5 text-[12px] uppercase tracking-wider">Vision</th>
                  <th className="text-center font-medium text-[var(--fg-soft)] px-4 py-3.5 text-[12px] uppercase tracking-wider">Reasoning</th>
                  <th className="text-center font-medium text-[var(--fg-soft)] px-4 py-3.5 text-[12px] uppercase tracking-wider">Local</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-soft)]/50 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-7 rounded-md bg-[var(--bg-soft)] border border-[var(--border)] flex items-center justify-center text-[10.5px] font-semibold text-[var(--fg)]">{r.initials}</span>
                        <span className="font-medium text-[var(--fg)]">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[var(--fg-soft)] font-mono text-[12.5px]">{r.models}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[12px] font-mono font-medium">
                        {r.free}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center"><Cell on={r.streaming} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell on={r.vision} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell on={r.reasoning} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell on={r.local} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden divide-y divide-[var(--border)]">
            {rows.map((r) => (
              <div key={r.name} className="p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="h-8 w-8 rounded-md bg-[var(--bg-soft)] border border-[var(--border)] flex items-center justify-center text-[11px] font-semibold">{r.initials}</span>
                  <span className="font-medium">{r.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div className="text-[var(--fg-soft)]">Models: <span className="text-[var(--fg)] font-mono">{r.models}</span></div>
                  <div className="text-[var(--fg-soft)]">Free: <span className="text-emerald-600 dark:text-emerald-400 font-mono">{r.free}</span></div>
                  <div className="col-span-2 flex gap-3 text-[11px] text-[var(--fg-soft)]">
                    {r.streaming && <span>Streaming</span>}
                    {r.vision && <span>· Vision</span>}
                    {r.reasoning && <span>· Reasoning</span>}
                    {r.local && <span>· Local</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-[12.5px] text-[var(--fg-muted)]">
          <Server size={13} strokeWidth={1.6} />
          <span>Updated continuously · No account required to browse</span>
        </div>
      </div>
    </section>
  );
}

function Cell({ on }: { on: boolean }) {
  if (on) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[var(--fg)] text-[var(--bg)]">
        <Check size={12} strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[var(--border)] text-[var(--fg-muted)]">
      <Minus size={12} strokeWidth={2} />
    </span>
  );
}
