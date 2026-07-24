import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProviderMarquee } from "./components/ProviderMarquee";
import { FreeModels } from "./components/FreeModels";
import { WhyNexus } from "./components/WhyNexus";
import { Comparison } from "./components/Comparison";
import { BentoGrid } from "./components/BentoGrid";
import { CanvasShowcase } from "./components/CanvasShowcase";
import { Privacy } from "./components/Privacy";
import { ZeroServer } from "./components/ZeroServer";
import { Stats } from "./components/Stats";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Initial theme based on system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = stored ?? (prefersDark ? "dark" : "light");
      setTheme(initial);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar theme={theme} onThemeToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))} />
      <main>
        <Hero />
        <ProviderMarquee />
        <FreeModels />
        <WhyNexus />
        <Comparison />
        <BentoGrid />
        <CanvasShowcase />
        <Privacy />
        <ZeroServer />
        <Stats />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
