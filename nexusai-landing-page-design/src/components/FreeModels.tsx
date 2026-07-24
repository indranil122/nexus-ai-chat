import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Brain, Zap, Cpu, Layers, Filter, Sparkles, ArrowUpRight } from "lucide-react";

type Model = {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  family: string;
  context: string;
  features: ("vision" | "reasoning" | "tools" | "fast")[];
  contextWindow: number;
  description: string;
};

const models: Model[] = [
  {
    id: "gemma-3-27b",
    name: "Gemma 3 27B",
    provider: "OpenRouter",
    providerColor: "from-zinc-700 to-zinc-900",
    family: "Google",
    context: "128K",
    features: ["vision", "reasoning"],
    contextWindow: 128000,
    description: "Multimodal reasoning with vision.",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "OpenRouter",
    providerColor: "from-zinc-700 to-zinc-900",
    family: "DeepSeek",
    context: "164K",
    features: ["reasoning"],
    contextWindow: 164000,
    description: "Open reasoning model with chain-of-thought.",
  },
  {
    id: "llama-3.3",
    name: "Llama 3.3 70B",
    provider: "Groq",
    providerColor: "from-zinc-600 to-zinc-800",
    family: "Meta",
    context: "128K",
    features: ["fast"],
    contextWindow: 128000,
    description: "Ultra fast inference, free on Groq.",
  },
  {
    id: "nemotron-ultra",
    name: "Nemotron Ultra 253B",
    provider: "NVIDIA NIM",
    providerColor: "from-zinc-700 to-zinc-900",
    family: "NVIDIA",
    context: "1M",
    features: ["reasoning", "vision"],
    contextWindow: 1000000,
    description: "Reasoning at scale, vision included.",
  },
  {
    id: "qwen-3",
    name: "Qwen 3 235B",
    provider: "Together AI",
    providerColor: "from-zinc-700 to-zinc-900",
    family: "Alibaba",
    context: "200K",
    features: ["reasoning", "tools"],
    contextWindow: 200000,
    description: "Massive context, agentic capabilities.",
  },
  {
    id: "mistral-small",
    name: "Mistral Small 3.1",
    provider: "OpenRouter",
    providerColor: "from-zinc-700 to-zinc-900",
    family: "Mistral",
    context: "128K",
    features: ["vision"],
    contextWindow: 128000,
    description: "Open-weight vision language model.",
  },
  {
    id: "llama-3.1-8b",
    name: "Llama 3.1 8B Instant",
    provider: "Groq",
    providerColor: "from-zinc-600 to-zinc-800",
    family: "Meta",
    context: "128K",
    features: ["fast"],
    contextWindow: 128000,
    description: "Sub-second responses, free tier.",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3 Chat",
    provider: "Fireworks",
    providerColor: "from-zinc-700 to-zinc-900",
    family: "DeepSeek",
    context: "64K",
    features: ["fast", "tools"],
    contextWindow: 64000,
    description: "Blazing fast chat completions.",
  },
];

const filters = ["All", "OpenRouter", "Groq", "NVIDIA NIM", "Together AI", "Fireworks", "DeepInfra"];

const featureIcons = {
  vision: { icon: Eye, label: "Vision" },
  reasoning: { icon: Brain, label: "Reasoning" },
  tools: { icon: Layers, label: "Tools" },
  fast: { icon: Zap, label: "Fast" },
};

export function FreeModels() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    return models.filter((m) => {
      const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase()) || m.family.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = activeFilter === "All" || m.provider === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <section id="models" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:items-end mb-12">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live · Updated 3s ago
              </span>
            </p>
            <h2 className="text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] font-semibold text-[var(--fg)]">
              Free Models <span className="editorial italic font-normal text-[var(--fg-soft)]">available right now.</span>
            </h2>
            <p className="mt-5 text-[16px] text-[var(--fg-soft)] max-w-xl">
              Automatically fetched from providers in real time. Filter by capability, find the perfect free model, and start building in seconds.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-[12.5px] text-[var(--fg-soft)]">
              <Sparkles size={12} strokeWidth={1.8} />
              <span><span className="text-[var(--fg)] font-medium">{models.length * 12}</span> free models discovered</span>
            </div>
            <div className="inline-flex items-center gap-2 text-[11.5px] text-[var(--fg-muted)] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              next refresh in 3s
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={15} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
            <input
              type="text"
              placeholder="Search models or families…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] pl-10 pr-3 py-2.5 text-[14px] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 text-[12px] text-[var(--fg-muted)] pr-2 border-r border-[var(--border)]">
              <Filter size={12} strokeWidth={1.8} />
              Filter
            </div>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
                  activeFilter === f
                    ? "bg-[var(--fg)] text-[var(--bg)]"
                    : "border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg-soft)] hover:text-[var(--fg)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m, i) => (
            <ModelCard key={m.id} model={m} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--fg-muted)] text-[14px]">
            No models match your search.
          </div>
        )}

        <div className="mt-10 flex items-center justify-center">
          <a href="#" className="group inline-flex items-center gap-2 rounded-xl btn-secondary px-5 py-2.5 text-[13.5px] font-medium">
            View all {models.length * 12}+ free models
            <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ModelCard({ model, index }: { model: Model; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 card-hover overflow-hidden"
    >
      {/* Top gradient ring (very subtle) */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--fg)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${model.providerColor} flex items-center justify-center text-white text-[12px] font-semibold`}>
            {model.family[0]}
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-[var(--fg-muted)]">{model.family}</div>
            <h3 className="text-[16px] font-semibold tracking-tight text-[var(--fg)] leading-tight">{model.name}</h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide">
          FREE
        </span>
      </div>

      <p className="text-[12.5px] text-[var(--fg-soft)] mb-4 min-h-[2.5em]">
        {model.description}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap mb-4">
        {model.features.map((f) => {
          const { icon: Icon, label } = featureIcons[f];
          return (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-1.5 py-0.5 text-[10.5px] text-[var(--fg-soft)]"
            >
              <Icon size={10} strokeWidth={1.8} />
              {label}
            </span>
          );
        })}
        <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-1.5 py-0.5 text-[10.5px] text-[var(--fg-soft)]">
          <Cpu size={10} strokeWidth={1.8} />
          {model.context}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-1.5 text-[11.5px] text-[var(--fg-soft)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
          {model.provider}
        </div>
        <button className="text-[11.5px] font-medium text-[var(--fg)] inline-flex items-center gap-1 group/btn">
          Open
          <ArrowUpRight size={11} strokeWidth={2.2} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}
