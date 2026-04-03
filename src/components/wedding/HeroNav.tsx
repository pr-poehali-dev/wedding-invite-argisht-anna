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
        background: scrolled ? "rgba(252, 249, 243, 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(180, 155, 120, 0.2)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-cormorant text-xl tracking-widest text-stone-700 hover:text-amber-800 transition-colors"
        >
          А&nbsp;&amp;&nbsp;А
        </button>

        <ul className="hidden md:flex gap-8 font-golos text-sm tracking-widest text-stone-500 uppercase">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleLink(l.href)}
                className="hover:text-amber-800 transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-stone-600" onClick={() => setOpen(!open)}>
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
      style={{ background: "linear-gradient(160deg, #fdf8ef 0%, #f5ede0 40%, #ede0cc 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(180,150,100,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-amber-300/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent to-amber-300/40" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p
          className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/70 mb-8"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.2s" }}
        >
          Приглашение на свадьбу
        </p>

        <h1
          className="font-cormorant font-light text-stone-800 mb-4 leading-none"
          style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s ease 0.4s",
          }}
        >
          Аргишт
        </h1>

        <p
          className="font-cormorant italic text-amber-700/60 text-3xl md:text-4xl mb-4"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.7s" }}
        >
          &amp;
        </p>

        <h1
          className="font-cormorant font-light text-stone-800 mb-12 leading-none"
          style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s ease 0.9s",
          }}
        >
          Анна
        </h1>

        <div
          className="w-24 h-px bg-amber-400/50 mx-auto mb-8"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
        />

        <p
          className="font-golos text-sm tracking-[0.2em] uppercase text-stone-500 mb-16"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s" }}
        >
          15 · 08 · 2026 &nbsp;·&nbsp; Суздаль
        </p>

        <div
          className="flex gap-6 md:gap-10 justify-center"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.6s" }}
        >
          {[
            { value: days, label: "дней" },
            { value: hours, label: "часов" },
            { value: minutes, label: "минут" },
            { value: seconds, label: "секунд" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-cormorant font-light text-stone-800 leading-none" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                {String(value).padStart(2, "0")}
              </span>
              <span className="font-golos text-[10px] tracking-widest uppercase text-stone-400 mt-1">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.querySelector("#rsvp")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 px-10 py-3 border border-amber-600/40 text-amber-800 font-golos text-sm tracking-widest uppercase hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all duration-300"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.8s" }}
        >
          Подтвердить участие
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={20} className="text-amber-600/40" />
      </div>
    </section>
  );
}
