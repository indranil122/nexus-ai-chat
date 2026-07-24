import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Sun, Moon, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Providers", href: "#providers" },
  { label: "Free Models", href: "#models" },
  { label: "Features", href: "#features" },
  { label: "Compare", href: "#compare" },
  { label: "Changelog", href: "#" },
];

export function Navbar({ theme, onThemeToggle }: { theme: "light" | "dark"; onThemeToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-[0_1px_0_var(--border)]" : "bg-transparent border border-transparent"
          }`}
        >
          <div className="flex items-center gap-8 pl-1.5">
            <a href="#" className="text-[var(--fg)]">
              <Logo />
            </a>
            <ul className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="px-3 py-1.5 text-[13.5px] text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors rounded-lg hover:bg-[var(--bg-soft)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[var(--fg-soft)] hover:text-[var(--fg)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.41 1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
              </svg>
              Star
              <span className="ml-1 rounded-md bg-[var(--bg-soft)] border border-[var(--border)] px-1.5 py-0.5 text-[11px] font-medium text-[var(--fg)]">
                12.4k
              </span>
            </a>

            <button
              onClick={onThemeToggle}
              aria-label="Toggle theme"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--fg-soft)] hover:text-[var(--fg)] hover:bg-[var(--bg-soft)] transition-colors"
            >
              {theme === "light" ? <Moon size={15} strokeWidth={1.6} /> : <Sun size={15} strokeWidth={1.6} />}
            </button>

            <a
              href="#"
              className="group inline-flex items-center gap-1.5 rounded-lg btn-primary px-3.5 py-1.5 text-[13px] font-medium"
            >
              Launch App
              <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
