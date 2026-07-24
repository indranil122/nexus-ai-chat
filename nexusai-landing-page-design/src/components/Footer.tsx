import { Logo } from "./Logo";
import { MessageCircle } from "lucide-react";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const columns = [
  {
    title: "Product",
    links: ["Features", "Free Models", "Providers", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Tutorials", "Templates", "Status", "Brand"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press", "Contact", "Sponsors"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "License", "Cookies", "DMCA"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-soft)]/40">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-5 text-[13.5px] text-[var(--fg-soft)] max-w-xs leading-[1.6]">
              A privacy-first, zero-server AI workbench. Built in the open for developers who care about their workflow.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a href="#" aria-label="GitHub" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors">
                <GithubIcon size={15} />
              </a>
              <a href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors">
                <TwitterIcon size={15} />
              </a>
              <a href="#" aria-label="Discord" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors">
                <MessageCircle size={15} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11.5px] uppercase tracking-wider text-[var(--fg-muted)] font-medium mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[12.5px] text-[var(--fg-muted)]">
            <span>© 2025 NexusAI Labs.</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              All systems operational
            </span>
          </div>
          <div className="flex items-center gap-3 text-[12.5px] text-[var(--fg-muted)] font-mono">
            <span>v2.4.0</span>
            <span className="h-3 w-px bg-[var(--border)]" />
            <span>build a3f8c2</span>
            <span className="h-3 w-px bg-[var(--border)]" />
            <span>MIT licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
