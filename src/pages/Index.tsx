import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-08-15T13:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { label: "О паре", href: "#about" },
  { label: "Дата и место", href: "#venue" },
  { label: "Программа", href: "#schedule" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
  { label: "RSVP", href: "#rsvp" },
];

function Nav() {
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

function Hero() {
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

function About() {
  return (
    <section id="about" className="py-28 px-6" style={{ background: "#fcf9f3" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-20">
          <p className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/60 mb-4">О паре</p>
          <h2 className="font-cormorant font-light text-stone-800" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Наша история
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mt-6" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #f5ede0, #ede0cc)",
                aspectRatio: "3/4",
              }}
            >
              <img
                src="https://cdn.poehali.dev/projects/d9dd51c4-bb1e-411e-99a5-212baefad47d/files/673161ed-d560-48c5-9366-d2210788d6f2.jpg"
                alt="Аргишт и Анна"
                className="w-full h-full object-cover"
                style={{ mixBlendMode: "multiply", opacity: 0.85 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-col gap-8">
            <div>
              <p className="font-cormorant italic text-amber-700 text-2xl mb-3">Аргишт</p>
              <p className="font-golos text-stone-500 leading-relaxed text-base">
                Человек, который умеет находить красоту в простых вещах. Его улыбка — первое, что замечаешь, и последнее, что хочется забыть.
              </p>
            </div>
            <div className="w-12 h-px bg-amber-300/60" />
            <div>
              <p className="font-cormorant italic text-amber-700 text-2xl mb-3">Анна</p>
              <p className="font-golos text-stone-500 leading-relaxed text-base">
                Та, что наполняет любое пространство теплом и светом. Рядом с ней мир становится чуть добрее и интереснее.
              </p>
            </div>
            <div className="w-12 h-px bg-amber-300/60" />
            <p className="font-cormorant font-light text-stone-600 text-xl italic leading-relaxed">
              «Любовь — это не то, что ты находишь. Любовь — это то, что тебя находит.»
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section
      id="venue"
      className="py-28 px-6"
      style={{ background: "linear-gradient(160deg, #f0e6d3 0%, #e8d9c0 100%)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/60 mb-4">Дата и место</p>
          <h2 className="font-cormorant font-light text-stone-800 mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Где и когда
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mb-16" />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "Calendar", title: "Дата", text: "15 августа 2026", sub: "суббота" },
            { icon: "Clock", title: "Время", text: "13:00", sub: "сбор гостей с 12:30" },
            { icon: "MapPin", title: "Место", text: "Николаевский Пасад", sub: "г. Суздаль, ул. Ленина, 138" },
          ].map(({ icon, title, text, sub }) => (
            <FadeIn key={title} delay={0.1}>
              <div
                className="flex flex-col items-center gap-4 py-10 px-6"
                style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(180,150,100,0.2)" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ background: "rgba(180,130,70,0.12)" }}
                >
                  <Icon name={icon} size={20} className="text-amber-700" />
                </div>
                <p className="font-golos text-xs tracking-widest uppercase text-stone-400">{title}</p>
                <p className="font-cormorant text-stone-800 text-xl font-medium">{text}</p>
                <p className="font-golos text-stone-400 text-sm">{sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12">
          <a
            href="https://yandex.ru/maps/?text=Суздаль+ул+Ленина+138+Николаевский+Пасад"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-amber-600/40 text-amber-800 font-golos text-sm tracking-widest uppercase hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all duration-300"
          >
            <Icon name="Navigation" size={14} />
            Построить маршрут
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

const SCHEDULE = [
  { time: "12:30", event: "Сбор гостей", desc: "Приветственные напитки в лобби" },
  { time: "13:00", event: "Выездная церемония", desc: "Торжественная роспись в Николаевском Пасаде" },
  { time: "14:00", event: "Фотосессия", desc: "Прогулка по историческим улочкам Суздаля" },
  { time: "15:00", event: "Праздничный банкет", desc: "Торжественный ужин в гостиничном комплексе" },
  { time: "20:00", event: "Вечеринка", desc: "Танцы и живая музыка до полуночи" },
];

function Schedule() {
  return (
    <section id="schedule" className="py-28 px-6" style={{ background: "#fcf9f3" }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-20">
          <p className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/60 mb-4">День торжества</p>
          <h2 className="font-cormorant font-light text-stone-800" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Программа
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mt-6" />
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-amber-200/60 hidden md:block" />
          <div className="flex flex-col gap-10">
            {SCHEDULE.map(({ time, event, desc }, i) => (
              <FadeIn key={time} delay={i * 0.08}>
                <div className="flex gap-8 items-start">
                  <div className="hidden md:flex flex-col items-end min-w-[4rem]">
                    <span className="font-cormorant text-amber-700 text-xl">{time}</span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-4 h-4 mt-1 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-amber-500/70" />
                  </div>
                  <div className="flex-1 border-l-2 border-amber-200/60 pl-5 md:border-none md:pl-0">
                    <span className="md:hidden font-cormorant text-amber-700 text-lg block mb-1">{time}</span>
                    <p className="font-cormorant text-stone-800 text-xl font-medium">{event}</p>
                    <p className="font-golos text-stone-400 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    { url: "https://cdn.poehali.dev/projects/d9dd51c4-bb1e-411e-99a5-212baefad47d/files/673161ed-d560-48c5-9366-d2210788d6f2.jpg", ratio: "aspect-[3/4]" },
    { url: "https://cdn.poehali.dev/projects/d9dd51c4-bb1e-411e-99a5-212baefad47d/files/673161ed-d560-48c5-9366-d2210788d6f2.jpg", ratio: "aspect-square" },
    { url: "https://cdn.poehali.dev/projects/d9dd51c4-bb1e-411e-99a5-212baefad47d/files/673161ed-d560-48c5-9366-d2210788d6f2.jpg", ratio: "aspect-[4/3]" },
    { url: "https://cdn.poehali.dev/projects/d9dd51c4-bb1e-411e-99a5-212baefad47d/files/673161ed-d560-48c5-9366-d2210788d6f2.jpg", ratio: "aspect-[3/4]" },
  ];

  return (
    <section
      id="gallery"
      className="py-28 px-6"
      style={{ background: "linear-gradient(160deg, #f0e6d3 0%, #e8d9c0 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/60 mb-4">Моменты</p>
          <h2 className="font-cormorant font-light text-stone-800" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Галерея
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mt-6" />
          <p className="font-golos text-stone-400 text-sm mt-6">Здесь появятся ваши фотографии</p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map(({ url, ratio }, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className={`${ratio} overflow-hidden group`}>
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "sepia(20%) contrast(1.05)" }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="py-28 px-6" style={{ background: "#fcf9f3" }}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/60 mb-4">Связь</p>
          <h2 className="font-cormorant font-light text-stone-800 mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Контакты
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mb-16" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Аргишт", role: "Жених", phone: "+7 (___) ___-__-__" },
            { name: "Анна", role: "Невеста", phone: "+7 (___) ___-__-__" },
          ].map(({ name, role, phone }) => (
            <FadeIn key={name} delay={0.1}>
              <div
                className="p-8 text-center"
                style={{ background: "rgba(245,237,224,0.6)", border: "1px solid rgba(180,150,100,0.2)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(180,130,70,0.12)" }}
                >
                  <Icon name="User" size={22} className="text-amber-700/70" />
                </div>
                <p className="font-cormorant text-stone-800 text-2xl mb-1">{name}</p>
                <p className="font-golos text-xs tracking-widest uppercase text-amber-600/70 mb-4">{role}</p>
                <div className="flex items-center justify-center gap-2 text-stone-500">
                  <Icon name="Phone" size={14} />
                  <span className="font-golos text-sm">{phone}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12">
          <p className="font-golos text-stone-400 text-sm">
            По всем вопросам, связанным с торжеством, обращайтесь к организаторам
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function RSVP() {
  const [form, setForm] = useState({ name: "", guests: "1", attendance: "yes", wishes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="rsvp"
      className="py-28 px-6"
      style={{ background: "linear-gradient(160deg, #f0e6d3 0%, #e8d9c0 100%)" }}
    >
      <div className="max-w-xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="font-golos text-xs tracking-[0.35em] uppercase text-amber-700/60 mb-4">Подтверждение</p>
          <h2 className="font-cormorant font-light text-stone-800 mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            RSVP
          </h2>
          <div className="w-16 h-px bg-amber-400/50 mx-auto mb-4" />
          <p className="font-golos text-stone-400 text-sm">Просим подтвердить участие до 1 июля 2026</p>
        </FadeIn>

        {sent ? (
          <FadeIn>
            <div className="text-center py-16">
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(180,130,70,0.12)" }}
              >
                <Icon name="Heart" size={28} className="text-amber-700" />
              </div>
              <p className="font-cormorant text-stone-800 text-3xl mb-3">Спасибо!</p>
              <p className="font-golos text-stone-400 text-sm">Мы получили ваш ответ и с нетерпением ждём встречи</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(180,150,100,0.2)", padding: "2.5rem" }}
            >
              <div>
                <label className="font-golos text-xs tracking-widest uppercase text-stone-400 block mb-2">Ваше имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-transparent border-b border-amber-300/60 pb-2 font-golos text-stone-700 text-base outline-none placeholder:text-stone-300 focus:border-amber-600/60 transition-colors"
                />
              </div>

              <div>
                <label className="font-golos text-xs tracking-widest uppercase text-stone-400 block mb-2">Буду присутствовать</label>
                <div className="flex gap-4">
                  {[{ value: "yes", label: "Да, буду!" }, { value: "no", label: "К сожалению, нет" }].map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value={value}
                        checked={form.attendance === value}
                        onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                        className="accent-amber-600"
                      />
                      <span className="font-golos text-sm text-stone-500">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-golos text-xs tracking-widest uppercase text-stone-400 block mb-2">Количество гостей</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-transparent border-b border-amber-300/60 pb-2 font-golos text-stone-700 text-base outline-none focus:border-amber-600/60 transition-colors"
                />
              </div>

              <div>
                <label className="font-golos text-xs tracking-widest uppercase text-stone-400 block mb-2">Пожелания</label>
                <textarea
                  value={form.wishes}
                  onChange={(e) => setForm({ ...form, wishes: e.target.value })}
                  placeholder="Ваши пожелания молодожёнам..."
                  rows={3}
                  className="w-full bg-transparent border-b border-amber-300/60 pb-2 font-golos text-stone-700 text-sm outline-none placeholder:text-stone-300 focus:border-amber-600/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3 px-8 bg-amber-700 text-white font-golos text-sm tracking-widest uppercase hover:bg-amber-800 transition-colors duration-300"
              >
                Отправить
              </button>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ background: "#1c1714" }}>
      <p className="font-cormorant text-amber-200/60 text-3xl mb-2">А &amp; А</p>
      <p className="font-golos text-stone-500 text-xs tracking-widest uppercase">15 · 08 · 2026 · Суздаль</p>
      <p className="font-golos text-stone-600 text-xs mt-6">с любовью ✦</p>
    </footer>
  );
}

export default function Index() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Venue />
      <Schedule />
      <Gallery />
      <Contacts />
      <RSVP />
      <Footer />
    </div>
  );
}
