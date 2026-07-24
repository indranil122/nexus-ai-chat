const providers = [
  "OpenRouter",
  "Groq",
  "NVIDIA NIM",
  "Together AI",
  "Fireworks",
  "DeepInfra",
  "Ollama",
  "LM Studio",
  "Mistral",
  "Google AI Studio",
  "OpenAI Compatible",
  "Anthropic",
];

export function ProviderMarquee() {
  return (
    <section id="providers" className="relative py-20 border-y border-[var(--border)] bg-[var(--bg-soft)]/40">
      <div className="mx-auto max-w-[1280px] px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-3">
              Universal compatibility
            </p>
            <h2 className="text-[28px] sm:text-[32px] tracking-[-0.02em] font-semibold text-[var(--fg)]">
              Every provider you actually use.
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--fg-soft)] max-w-md">
            One workspace, twelve integrations. Switch models without changing your workflow.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...providers, ...providers].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="inline-flex items-center gap-3 mx-8 text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors"
            >
              <ProviderMark name={name} />
              <span className="text-[20px] tracking-[-0.01em] font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-slow whitespace-nowrap" style={{ animationDirection: "reverse" }}>
          {[...providers.slice().reverse(), ...providers.slice().reverse()].map((name, i) => (
            <div
              key={`${name}-r-${i}`}
              className="inline-flex items-center gap-3 mx-8 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              <ProviderMark name={name} />
              <span className="text-[18px] tracking-[-0.01em] font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProviderMark({ name }: { name: string }) {
  const letter = name.replace(/[^A-Za-z]/g, "")[0] || "•";
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] text-[13px] font-semibold tracking-tight">
      {letter}
    </span>
  );
}
