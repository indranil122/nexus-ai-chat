import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Code2, Eye, RefreshCcw } from "lucide-react";

const generatedCode = `import { useState } from "react";

export function Weather() {
  const [city, setCity] = useState("Lisbon");
  const data = {
    Lisbon:   { temp: 22, sky: "Clear" },
    Tokyo:    { temp: 18, sky: "Cloudy" },
    Reykjavík:{ temp:  4, sky: "Snow" },
  };
  const w = data[city];
  return (
    <div className="card">
      <select onChange={e => setCity(e.target.value)}>
        {Object.keys(data).map(c => <option key={c}>{c}</option>)}
      </select>
      <h2>{w.temp}°C</h2>
      <p>{w.sky}</p>
    </div>
  );
}`;

export function CanvasShowcase() {
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTyped((p) => (p.length >= generatedCode.length ? generatedCode : p + generatedCode[p.length]));
    }, 18);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-28 md:py-36 border-t border-[var(--border)] bg-[var(--bg-soft)]/40">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--fg-muted)] mb-4">
              Live Canvas
            </p>
            <h2 className="text-[44px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] font-semibold text-[var(--fg)]">
              From prompt to <span className="editorial italic font-normal text-[var(--fg-soft)]">running app</span> in seconds.
            </h2>
            <p className="mt-5 text-[15px] text-[var(--fg-soft)] max-w-md">
              NexusAI doesn't just write code. It renders, hot-reloads, and lets you iterate on the result — all without leaving the workspace.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Code2 size={13} strokeWidth={1.6} className="text-[var(--fg-soft)]" />
                  <span className="text-[12px] font-mono text-[var(--fg)]">Weather.tsx</span>
                  <span className="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 text-[9.5px] font-mono">streaming</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="rounded-md border border-[var(--border)] p-1 text-[var(--fg-soft)] hover:text-[var(--fg)]">
                    <RefreshCcw size={11} strokeWidth={1.6} />
                  </button>
                  <button className="rounded-md border border-[var(--border)] p-1 text-[var(--fg-soft)] hover:text-[var(--fg)]">
                    <Play size={11} strokeWidth={1.6} />
                  </button>
                </div>
              </div>
              <pre className="code-block p-4 max-h-[420px] overflow-hidden">
                <code className="text-[var(--fg-soft)]">
                  <ColoredCode text={typed} />
                  <span className="inline-block w-1.5 h-3.5 bg-[var(--fg)] align-middle ml-0.5 animate-stream-cursor" />
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Right: Live preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.15)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--fg-muted)]">
                  <Eye size={11} strokeWidth={1.6} />
                  localhost:4242/weather
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">● live</span>
              </div>

              <div className="p-8 md:p-10 min-h-[420px] flex items-center justify-center bg-[var(--bg)]">
                <WeatherPreview step={step} />
              </div>
            </div>

            {/* Floating status pill */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] shadow-lg px-3 py-1.5 flex items-center gap-2 text-[11.5px] text-[var(--fg-soft)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              <span>HMR connected · 12ms</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WeatherPreview({ step }: { step: number }) {
  const cities = ["Lisbon", "Tokyo", "Reykjavík"];
  const data = [
    { temp: 22, sky: "Clear", icon: "☀" },
    { temp: 18, sky: "Cloudy", icon: "☁" },
    { temp: 4, sky: "Snow", icon: "❄" },
  ];
  const idx = step % data.length;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[12px] uppercase tracking-wider text-[var(--fg-muted)]">Weather</span>
          <select
            defaultValue={cities[idx]}
            key={step}
            className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-[12px] text-[var(--fg)] focus:outline-none"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-[64px] leading-none font-semibold tracking-tight text-[var(--fg)]">
            {data[idx].temp}°
          </span>
          <span className="text-[48px] leading-none mb-2">{data[idx].icon}</span>
        </div>
        <div className="mt-2 text-[14px] text-[var(--fg-soft)]">{data[idx].sky}</div>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          {["Mon", "Tue", "Wed"].map((d, i) => (
            <div key={d} className="rounded-md bg-[var(--bg-soft)] border border-[var(--border)] py-2">
              <div className="text-[10.5px] text-[var(--fg-muted)] uppercase">{d}</div>
              <div className="text-[14px] font-medium mt-0.5">{[20, 18, 16][i]}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColoredCode({ text }: { text: string }) {
  const matches: { start: number; end: number; t: string }[] = [];
  const keywordRegex = /(import|export|from|const|let|var|function|return|true|false|null|new|key)/g;
  let m: RegExpExecArray | null;
  while ((m = keywordRegex.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, t: m[0] });
  }
  const strRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  while ((m = strRegex.exec(text)) !== null) {
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
    else if (/^\d+$/.test(word)) cls = "token-num";
    else if (/^(import|export|from|const|let|var|function|return|true|false|null|new|key)$/.test(word)) cls = "token-key";
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
