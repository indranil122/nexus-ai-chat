import { motion } from "framer-motion";
import { MessageSquare, Sparkles, BookOpen, FileText, Code2, Zap, Braces, Eye, Brain, History, KeyRound, GitCompareArrows } from "lucide-react";

const tiles = [
  { id: "chat", title: "AI Chat", desc: "Multi-model conversations with a single keystroke.", icon: MessageSquare, size: "lg", visual: "chat" },
  { id: "canvas", title: "Canvas Preview", desc: "Render React, HTML, and SVG as you stream.", icon: Sparkles, size: "md", visual: "canvas" },
  { id: "prompts", title: "Prompt Library", desc: "Save, version, and share.", icon: BookOpen, size: "sm", visual: "prompts" },
  { id: "markdown", title: "Markdown", desc: "Beautifully rendered.", icon: FileText, size: "sm", visual: "markdown" },
  { id: "code", title: "Code Highlighting", desc: "20+ languages.", icon: Code2, size: "md", visual: "code" },
  { id: "stream", title: "Streaming", desc: "Token by token.", icon: Zap, size: "sm", visual: "stream" },
  { id: "json", title: "JSON Mode", desc: "Schema-enforced outputs.", icon: Braces, size: "sm", visual: "json" },
  { id: "vision", title: "Vision Models", desc: "Drop an image, get an answer.", icon: Eye, size: "md", visual: "vision" },
  { id: "reasoning", title: "Reasoning Models", desc: "CoT and tool use.", icon: Brain, size: "sm", visual: "reasoning" },
  { id: "history", title: "Session History", desc: "Everything local.", icon: History, size: "sm", visual: "history" },
  { id: "vault", title: "API Vault", desc: "AES-GCM encrypted.", icon: KeyRound, size: "sm", visual: "vault" },
  { id: "compare", title: "Model Comparison", desc: "Same prompt, side by side.", icon: GitCompareArrows, size: "md", visual: "compare" },
];

export function BentoGrid() {
  return (
    <section className="relative py-28 md:py-36 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
            Built for developers
          </p>
          <h2 className="text-[44px] sm:text-[56px] lg:text-[60px] leading-[1.02] tracking-[-0.035em] font-semibold text-[var(--fg)]">
            Twelve features, one
            <br />
            <span className="editorial italic font-normal text-[var(--fg-soft)]">deliberate surface.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[180px]">
          {tiles.map((t, i) => (
            <BentoTile key={t.id} tile={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoTile({ tile, index }: { tile: typeof tiles[0]; index: number }) {
  const Icon = tile.icon;
  const span =
    tile.size === "lg"
      ? "col-span-2 row-span-2"
      : tile.size === "md"
      ? "col-span-2 row-span-1 md:col-span-2 md:row-span-1"
      : "col-span-1 row-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className={`group relative ${span} rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 overflow-hidden card-hover flex flex-col`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg)]">
          <Icon size={14} strokeWidth={1.6} />
        </div>
        <span className="text-[10.5px] font-mono text-[var(--fg-muted)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-[15px] font-semibold tracking-tight text-[var(--fg)]">
        {tile.title}
      </h3>
      <p className="text-[12.5px] text-[var(--fg-soft)] leading-[1.4] mt-0.5">
        {tile.desc}
      </p>

      <div className="mt-auto pt-3">
        <TileVisual kind={tile.visual} />
      </div>
    </motion.div>
  );
}

function TileVisual({ kind }: { kind: string }) {
  if (kind === "chat") {
    return (
      <div className="space-y-1.5">
        <div className="rounded-md bg-[var(--bg-soft)] border border-[var(--border)] px-2.5 py-1.5 text-[10.5px] text-[var(--fg-soft)] w-3/4">
          Refactor this hook
        </div>
        <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1.5 text-[10.5px] text-[var(--fg)] flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Sure, here is a cleaner version…
        </div>
      </div>
    );
  }
  if (kind === "canvas") {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-md bg-[var(--bg-soft)] border border-[var(--border)]" />
        ))}
      </div>
    );
  }
  if (kind === "prompts") {
    return (
      <div className="space-y-1">
        {["Summarize", "Refactor", "Explain"].map((p, i) => (
          <div key={p} className="flex items-center justify-between text-[10px] text-[var(--fg-soft)] font-mono">
            <span>{p}</span>
            <span className="text-[var(--fg-muted)]">v{i + 1}.0</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "markdown") {
    return (
      <div className="space-y-1">
        <div className="h-1.5 w-3/4 rounded bg-[var(--fg)]" />
        <div className="h-1.5 w-1/2 rounded bg-[var(--fg)]/30" />
        <div className="h-1.5 w-2/3 rounded bg-[var(--fg)]/30" />
        <div className="h-1.5 w-1/3 rounded bg-[var(--fg)]/30" />
      </div>
    );
  }
  if (kind === "code") {
    return (
      <div className="font-mono text-[10px] leading-[1.4] text-[var(--fg-soft)]">
        <span className="text-purple-500">const</span> <span className="text-blue-500">x</span> = <span className="text-amber-500">42</span>;
      </div>
    );
  }
  if (kind === "stream") {
    return (
      <div className="font-mono text-[10.5px] text-[var(--fg-soft)] flex items-center gap-1">
        <span>token</span>
        <span className="h-3 w-1 bg-[var(--fg)] animate-stream-cursor" />
      </div>
    );
  }
  if (kind === "json") {
    return (
      <pre className="font-mono text-[9.5px] text-[var(--fg-soft)] leading-[1.3]">
{`{
  "ok": true,
  "n": 42
}`}
      </pre>
    );
  }
  if (kind === "vision") {
    return (
      <div className="h-14 rounded-md bg-gradient-to-br from-[var(--bg-soft)] to-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
        <Eye size={16} strokeWidth={1.4} className="text-[var(--fg-muted)]" />
      </div>
    );
  }
  if (kind === "reasoning") {
    return (
      <div className="space-y-1 font-mono text-[10px]">
        <div className="text-[var(--fg-soft)]">thinking…</div>
        <div className="h-1 w-3/4 rounded bg-[var(--fg)]/30" />
        <div className="h-1 w-1/2 rounded bg-[var(--fg)]/30" />
      </div>
    );
  }
  if (kind === "history") {
    return (
      <div className="space-y-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] text-[var(--fg-soft)]">
            <span className="h-1 w-1 rounded-full bg-[var(--fg)]" />
            <span>session_{i + 1}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "vault") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-mono text-[var(--fg-soft)]">sk-</span>
        <span className="text-[10px] font-mono text-[var(--fg)]">•••••••••</span>
        <span className="h-3 w-3 rounded bg-[var(--fg)]" />
      </div>
    );
  }
  // compare
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <div className="h-10 rounded-md bg-[var(--bg-soft)] border border-[var(--border)] p-1.5 space-y-0.5">
        <div className="h-1 w-3/4 rounded bg-[var(--fg)]/30" />
        <div className="h-1 w-1/2 rounded bg-[var(--fg)]/30" />
      </div>
      <div className="h-10 rounded-md bg-[var(--bg-soft)] border border-[var(--border)] p-1.5 space-y-0.5">
        <div className="h-1 w-2/3 rounded bg-[var(--fg)]/30" />
        <div className="h-1 w-1/3 rounded bg-[var(--fg)]/30" />
      </div>
    </div>
  );
}
