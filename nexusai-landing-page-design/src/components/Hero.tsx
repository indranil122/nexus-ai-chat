import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, Zap, Eye, Brain, Code2, MessageSquare, Cpu } from "lucide-react";

const badges = [
  "100% Client Side",
  "Bring Your Own Keys",
  "Zero Server",
  "Local AI Ready",
  "Open Source Friendly",
];

const codeSnippet = `import { useState } from "react";

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { name: "Starter", price: yearly ? 9 : 12 },
    { name: "Pro",     price: yearly ? 24 : 32, featured: true },
    { name: "Team",    price: yearly ? 49 : 64 },
  ];
  return (
    <section className="grid">
      {plans.map(p => (
        <article key={p.name} data-featured={p.featured}>
          <h3>{p.name}</h3>
          <span>$\{p.price}<small>/mo</small></span>
          <button>Get started</button>
        </article>
      ))}
    </section>
  );
}`;

const providers = [
  { name: "OpenRouter", sub: "118 models" },
  { name: "Groq", sub: "Ultra fast" },
  { name: "NVIDIA NIM", sub: "Reasoning" },
  { name: "Together AI", sub: "Open models" },
  { name: "Ollama", sub: "Local" },
];

export function Hero() {
  const [streamProgress, setStreamProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStreamProgress((p) => (p >= codeSnippet.length ? 0 : p + 4));
    }, 35);
    return () => clearInterval(id);
  }, []);

  const typedCode = codeSnippet.slice(0, streamProgress);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />

      {/* Floating decorative orbs */}
      <div className="absolute top-32 left-[8%] h-72 w-72 rounded-full bg-[var(--bg-soft)] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-60 right-[5%] h-96 w-96 rounded-full bg-[var(--bg-soft)] blur-3xl opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — Copy */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[12px] text-[var(--fg-soft)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>Version 2.4 · Now with Live Canvas</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-[44px] sm:text-[56px] lg:text-[68px] leading-[0.98] tracking-[-0.035em] font-semibold text-[var(--fg)]"
            >
              Every Open-Source AI Model.
              <br />
              <span className="editorial text-[var(--fg)] italic font-normal">
                One Workspace.
              </span>
              <br />
              <span className="text-[var(--fg-muted)]">Zero Servers.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-[560px] text-[16.5px] leading-[1.6] text-[var(--fg-soft)]"
            >
              Connect OpenRouter, NVIDIA NIM, Groq, Together AI, Fireworks, DeepInfra, Ollama, LM Studio and more from one beautiful workspace. Bring your own API keys, discover free models instantly, and keep every prompt completely private.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-3 text-[14px] font-medium"
              >
                Start Building
                <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#models"
                className="group inline-flex items-center gap-2 rounded-xl btn-secondary px-5 py-3 text-[14px] font-medium"
              >
                <Sparkles size={14} strokeWidth={1.8} />
                Explore Free Models
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5"
            >
              {badges.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--fg-soft)]">
                  <Check size={13} strokeWidth={2.2} className="text-[var(--fg)]" />
                  {b}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex items-center gap-3 text-[12.5px] text-[var(--fg-muted)]"
            >
              <div className="flex -space-x-2">
                {["#0a0a0a", "#27272a", "#52525b"].map((c, i) => (
                  <span
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-[var(--bg)]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span>
                Trusted by <span className="text-[var(--fg)] font-medium">12,400+</span> developers building locally.
              </span>
            </motion.div>
          </div>

          {/* RIGHT — Product preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <ProductPreview typedCode={typedCode} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProductPreview({ typedCode }: { typedCode: string }) {
  return (
    <div className="relative">
      {/* Floating provider cards around */}
      <div className="hidden md:block">
        <FloatingCard
          className="absolute -top-6 -left-12 z-20 animate-float"
          icon={<Zap size={13} strokeWidth={1.8} />}
          title="Groq"
          subtitle="184 tok/s"
          delay="0s"
        />
        <FloatingCard
          className="absolute -top-2 right-0 z-20 animate-float-med"
          icon={<Eye size={13} strokeWidth={1.8} />}
          title="Vision"
          subtitle="Gemma 3 · 27B"
          delay="1s"
        />
        <FloatingCard
          className="absolute bottom-20 -left-16 z-20 animate-float"
          icon={<Brain size={13} strokeWidth={1.8} />}
          title="Reasoning"
          subtitle="DeepSeek R1"
          delay="2s"
        />
        <FloatingCard
          className="absolute -bottom-4 right-4 z-20 animate-float-med"
          icon={<Cpu size={13} strokeWidth={1.8} />}
          title="Local · Ollama"
          subtitle="Llama 3.3 · 70B"
          delay="1.5s"
        />
      </div>

      {/* Main app window */}
      <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-[var(--bg-soft)] border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            nexus.ai/workspace/new
          </div>
          <div className="flex items-center gap-1.5 text-[var(--fg-muted)]">
            <Code2 size={12} strokeWidth={1.8} />
          </div>
        </div>

        <div className="grid grid-cols-[180px_1fr] h-[460px]">
          {/* Sidebar */}
          <aside className="border-r border-[var(--border)] bg-[var(--bg-soft)] p-3 space-y-3 hidden sm:block">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--fg-muted)] mb-1.5 px-1.5">Provider</div>
              <div className="space-y-0.5">
                {providers.map((p, i) => (
                  <div
                    key={p.name}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] ${
                      i === 0 ? "bg-[var(--bg-elev)] text-[var(--fg)] shadow-sm border border-[var(--border)]" : "text-[var(--fg-soft)] hover:bg-[var(--bg-elev)]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
                      {p.name}
                    </span>
                    {i === 0 && <Check size={10} strokeWidth={2.5} />}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--fg-muted)] mb-1.5 px-1.5">Model</div>
              <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2 py-1.5 text-[12px] flex items-center justify-between">
                <span>deepseek-r1</span>
                <span className="text-[9px] rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 font-medium">FREE</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--fg-muted)] mb-1.5 px-1.5">Sessions</div>
              <div className="space-y-0.5 text-[12px] text-[var(--fg-soft)]">
                <div className="px-2 py-1 truncate">Pricing component</div>
                <div className="px-2 py-1 truncate text-[var(--fg-muted)]">API refactor</div>
                <div className="px-2 py-1 truncate text-[var(--fg-muted)]">Vision test</div>
              </div>
            </div>
          </aside>

          {/* Main area */}
          <div className="flex flex-col bg-[var(--bg-elev)]">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-[var(--border)] px-3 py-2">
              <TabPill icon={<MessageSquare size={11} strokeWidth={1.8} />} label="Chat" active />
              <TabPill icon={<Code2 size={11} strokeWidth={1.8} />} label="Code" />
              <TabPill icon={<Sparkles size={11} strokeWidth={1.8} />} label="Canvas" />
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-hidden p-4 space-y-3 text-[12.5px]">
              <div className="flex gap-2">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-[var(--bg-soft)] border border-[var(--border)]" />
                <div className="rounded-xl rounded-tl-sm bg-[var(--bg-soft)] border border-[var(--border)] px-3 py-2 max-w-[90%]">
                  <p className="text-[var(--fg)]">Generate a React pricing component with monthly/yearly toggle.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center">
                  <Sparkles size={10} strokeWidth={2} />
                </span>
                <div className="rounded-xl rounded-tl-sm border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-2 max-w-[95%] space-y-2">
                  <p className="text-[var(--fg)]">I'll build a clean, accessible pricing card with a billing toggle.</p>

                  {/* Code block */}
                  <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-soft)]">
                    <div className="flex items-center justify-between border-b border-[var(--border)] px-2.5 py-1.5">
                      <div className="flex items-center gap-1.5 text-[10.5px] text-[var(--fg-muted)] font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                        streaming · pricing.tsx
                      </div>
                      <div className="flex items-center gap-1 text-[var(--fg-muted)]">
                        <span className="text-[10px] font-mono">tsx</span>
                      </div>
                    </div>
                    <pre className="code-block p-3 overflow-hidden whitespace-pre-wrap">
                      <code>
                        <TokenizedCode text={typedCode} />
                        <span className="inline-block w-1.5 h-3.5 bg-[var(--fg)] align-middle ml-0.5 animate-stream-cursor" />
                      </code>
                    </pre>
                  </div>

                  {/* Live canvas preview */}
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-2.5">
                    <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)] mb-2 px-1">
                      <span className="flex items-center gap-1.5 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
                        live preview
                      </span>
                      <span>v0.3.2</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "Starter", price: "9", featured: false },
                        { name: "Pro", price: "24", featured: true },
                        { name: "Team", price: "49", featured: false },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className={`rounded-md border p-2 ${
                            p.featured
                              ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                              : "border-[var(--border)] bg-[var(--bg-elev)]"
                          }`}
                        >
                          <div className="text-[10px] opacity-70">{p.name}</div>
                          <div className="text-[14px] font-semibold mt-0.5">${p.price}</div>
                          <div className={`text-[8.5px] mt-0.5 ${p.featured ? "opacity-80" : "text-[var(--fg-muted)]"}`}>/month</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-[var(--border)] p-3">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-2">
                <span className="text-[var(--fg-muted)] text-[11px] font-mono">→</span>
                <span className="text-[12px] text-[var(--fg-muted)] flex-1 truncate">Ask Nexus to build anything…</span>
                <span className="text-[10px] font-mono text-[var(--fg-muted)] border border-[var(--border)] rounded px-1.5 py-0.5">⌘K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCard({ className, icon, title, subtitle, delay }: { className?: string; icon: React.ReactNode; title: string; subtitle: string; delay: string }) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] px-3 py-2 backdrop-blur ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[var(--fg-soft)]">{icon}</span>
        <div>
          <div className="text-[11.5px] font-medium text-[var(--fg)] leading-tight">{title}</div>
          <div className="text-[10px] text-[var(--fg-muted)] leading-tight mt-0.5">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function TabPill({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] ${
        active ? "bg-[var(--bg-soft)] text-[var(--fg)] border border-[var(--border)]" : "text-[var(--fg-muted)]"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function TokenizedCode({ text }: { text: string }) {
  // Simple highlighter for the demo
  const matches: { start: number; end: number; t: string }[] = [];

  const keywordRegex = /(import|export|from|const|let|var|function|return|if|else|true|false|null|new|className|key)/g;
  let m: RegExpExecArray | null;
  while ((m = keywordRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, t: m[0] });
  }
  const strRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  while ((m = strRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, t: m[0] });
  }
  const comRegex = /(\/\/[^\n]*)/g;
  while ((m = comRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, t: m[0] });
  }
  const numRegex = /\b(\d+)\b/g;
  while ((m = numRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, t: m[0] });
  }
  matches.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  for (const mt of matches) {
    if (mt.start < cursor) continue;
    if (mt.start > cursor) out.push(text.slice(cursor, mt.start));
    const word = mt.t;
    let cls = "";
    if (/^["'`]/.test(word)) cls = "token-str";
    else if (/^\/\//.test(word)) cls = "token-com";
    else if (/^\d+$/.test(word)) cls = "token-num";
    else if (/^(import|export|from|const|let|var|function|return|if|else|new|true|false|null)$/.test(word)) cls = "token-key";
    else cls = "token-fn";
    out.push(
      <span key={`${mt.start}-${word}`} className={cls}>
        {word}
      </span>
    );
    cursor = mt.end;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return <>{out}</>;
}
