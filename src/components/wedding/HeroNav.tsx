import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useCountdown } from "./shared";

const NAV_LINKS = [
  { label: "О паре", href: "#about" },
  { label: "Дата и место", href: "#venue" },
  { label: "Программа", href: "#schedule" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
  { label: "RSVP", href: "#rsvp" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184, 151, 58, 0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-cormorant text-xl tracking-widest transition-colors ${scrolled ? "hover:text-white" : "text-white/80 hover:text-white"}`}
          style={scrolled ? { color: "#c9a84c" } : {}}
        >
          А&nbsp;&amp;&nbsp;А
        </button>

        <ul className={`hidden md:flex gap-8 font-golos text-sm tracking-widest uppercase ${scrolled ? "" : "text-white/60"}`}
          style={scrolled ? { color: "#666" } : {}}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleLink(l.href)}
                className="transition-colors"
                style={{ color: "inherit" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={e => (e.currentTarget.style.color = "")}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button className={`md:hidden transition-colors ${scrolled ? "text-stone-600" : "text-white/70"}`} onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#fcf9f3] border-t border-amber-200/40 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleLink(l.href)}
              className="font-golos text-sm tracking-widest uppercase text-stone-500 hover:text-amber-800 text-left transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Hero() {
  const { days, hours, minutes, seconds } = useCountdown();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Фото на весь экран */}
      <img
        src="https://cdn.poehali.dev/projects/d9dd51c4-bb1e-411e-99a5-212baefad47d/bucket/28aab6ec-8f24-46d8-9efe-609830db0715.jpg"
        alt="Аргишт и Анна"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: "none" }}
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Тонкий градиент снизу для таймера */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Контент */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        <p
          className="font-golos text-xs tracking-[0.35em] uppercase text-white/60 mb-10"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.2s" }}
        >
          Приглашение на свадьбу
        </p>

        {/* Имена поверх фото */}
        <h1
          className="font-cormorant font-light text-white leading-none"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 10rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 1.2s ease 0.4s",
            textShadow: "0 2px 40px rgba(0,0,0,0.4)",
          }}
        >
          Аргишт
        </h1>

        <p
          className="font-cormorant italic text-4xl md:text-5xl my-2"
          style={{ color: "#b8973a99", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.7s" }}
        >
          &amp;
        </p>

        <h1
          className="font-cormorant font-light text-white leading-none"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 10rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "all 1.2s ease 0.9s",
            textShadow: "0 2px 40px rgba(0,0,0,0.4)",
          }}
        >
          Анна
        </h1>

        <div
          className="w-20 h-px mx-auto my-8"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.1s", background: "#b8973a60" }}
        />

        <p
          className="font-golos text-sm tracking-[0.25em] uppercase text-white/60 mb-14"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.3s" }}
        >
          15 · 08 · 2026 &nbsp;·&nbsp; Суздаль
        </p>

        {/* Таймер */}
        <div
          className="flex gap-8 md:gap-14 justify-center mb-14"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s" }}
        >
          {[
            { value: days, label: "дней" },
            { value: hours, label: "часов" },
            { value: minutes, label: "минут" },
            { value: seconds, label: "секунд" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span
                className="font-cormorant font-light text-white leading-none"
                style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                {String(value).padStart(2, "0")}
              </span>
              <span className="font-golos text-[10px] tracking-widest uppercase text-white/40 mt-1">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" })}
          className="px-10 py-3 font-golos text-sm tracking-widest uppercase transition-all duration-300"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.7s", border: "1px solid #b8973a60", color: "#c9a84c" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#b8973a"; (e.currentTarget as HTMLElement).style.color = "#0e0e0e"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
        >
          Подтвердить участие
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-white/30" />
      </div>
    </section>
  );
}