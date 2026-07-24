import { motion } from "framer-motion";
import { Layers, Shield, Sparkles, Compass } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Universal Workspace",
    desc: "One interface for every provider. Switch from OpenRouter to Ollama without leaving the canvas.",
    visual: "workspace",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your API keys stay inside your browser. Encrypted locally with the Web Crypto API. We never see them.",
    visual: "privacy",
  },
  {
    icon: Sparkles,
    title: "Live Canvas",
    desc: "Generate and preview applications instantly. Code, render, iterate — in a single frame.",
    visual: "canvas",
  },
  {
    icon: Compass,
    title: "Automatic Discovery",
    desc: "Fetch available models directly from providers. New free models appear the moment they ship.",
    visual: "discovery",
  },
];

export function WhyNexus() {
  return (
    <section id="features" className="relative py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
            Why NexusAI
          </p>
          <h2 className="text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] font-semibold text-[var(--fg)]">
            A workbench that respects
            <br />
            <span className="editorial italic font-normal text-[var(--fg-soft)]">your craft and your keys.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-8 card-hover overflow-hidden"
    >
      <div className="flex items-start justify-between mb-12">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg)]">
          <Icon size={18} strokeWidth={1.6} />
        </div>
        <span className="text-[11px] font-mono text-[var(--fg-muted)]">
          0{index + 1}
        </span>
      </div>

      <h3 className="text-[24px] tracking-[-0.02em] font-semibold text-[var(--fg)] mb-2">
        {feature.title}
      </h3>
      <p className="text-[14.5px] text-[var(--fg-soft)] leading-[1.55] max-w-md">
        {feature.desc}
      </p>

      <FeatureVisual kind={feature.visual} />
    </motion.div>
  );
}

function FeatureVisual({ kind }: { kind: string }) {
  if (kind === "workspace") {
    return (
      <div className="mt-8 relative h-44 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-3 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 h-full">
          {["OpenRouter", "Groq", "Ollama"].map((p, i) => (
            <div
              key={p}
              className={`rounded-lg border ${
                i === 1 ? "border-[var(--fg)] bg-[var(--bg-elev)]" : "border-[var(--border)] bg-[var(--bg-elev)]"
              } flex flex-col items-center justify-center gap-1.5`}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--fg)]" />
              <span className="text-[10px] text-[var(--fg)]">{p}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-[10px] text-[var(--fg-muted)] font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          3 providers active
        </div>
      </div>
    );
  }

  if (kind === "privacy") {
    return (
      <div className="mt-8 relative h-44 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] overflow-hidden flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
          <line x1="0" y1="50" x2="200" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 3" />
        </svg>
        <div className="relative flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elev)] border border-[var(--border)] text-[11px] text-[var(--fg)]">Your browser</div>
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path d="M2 7H22M22 7L17 2M22 7L17 12" stroke="currentColor" strokeWidth="1.4" className="text-[var(--fg)]" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="px-3 py-1.5 rounded-lg bg-[var(--bg-elev)] border border-[var(--border)] text-[11px] text-[var(--fg)]">sk-***</div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-center text-[10px] text-[var(--fg-muted)] font-mono">
          encrypted · local · zero telemetry
        </div>
      </div>
    );
  }

  if (kind === "canvas") {
    return (
      <div className="mt-8 relative h-44 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-3 overflow-hidden">
        <div className="grid grid-cols-2 gap-2 h-full">
          <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-2 font-mono text-[8.5px] text-[var(--fg-soft)] leading-tight overflow-hidden">
            <span className="text-[var(--fg)]">export function</span> Card() {"{"}
            <br />
            &nbsp;&nbsp;<span className="text-[var(--fg)]">return</span> (
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"<div />"}
            <br />
            &nbsp;&nbsp;);
            <br />
            {"}"}
          </div>
          <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] p-2 flex items-center justify-center">
            <div className="w-full space-y-1">
              <div className="h-1.5 w-1/2 rounded bg-[var(--fg)]/20" />
              <div className="h-1.5 w-3/4 rounded bg-[var(--fg)]/20" />
              <div className="h-6 mt-2 rounded bg-[var(--fg)]" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] text-[var(--fg-muted)] font-mono">
          live · hot reload
        </div>
      </div>
    );
  }

  // discovery
  return (
    <div className="mt-8 relative h-44 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] p-3 overflow-hidden">
      <div className="space-y-1.5">
        {["Llama 4 Scout", "Qwen 3 32B", "Mistral Codestral", "Gemma 3 27B"].map((m) => (
          <div
            key={m}
            className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1.5"
          >
            <span className="text-[10.5px] text-[var(--fg)]">{m}</span>
            <span className="text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400">+ new</span>
          </div>
        ))}
      </div>
    </div>
  );
}
