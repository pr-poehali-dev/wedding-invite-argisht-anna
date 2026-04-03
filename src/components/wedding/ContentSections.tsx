import Icon from "@/components/ui/icon";
import { FadeIn, COUPLE_PHOTO } from "./shared";

export function About() {
  return (
    <section id="about" className="py-28 px-6" style={{ background: "#0e0e0e" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-20">
          <p className="font-golos text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#b8973a" }}>О паре</p>
          <h2 className="font-cormorant font-light text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Наша история
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#b8973a" }} />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <div
              className="relative overflow-hidden"
              style={{ background: "#1a1a1a", aspectRatio: "3/4" }}
            >
              <img
                src={COUPLE_PHOTO}
                alt="Аргишт и Анна"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-col gap-8">
            <div>
              <p className="font-cormorant italic text-2xl mb-3" style={{ color: "#c9a84c" }}>Как всё началось</p>
              <p className="font-golos leading-relaxed text-base" style={{ color: "#888" }}>
                Семь лет назад на репетиции КВНа встретились участники двух разных команд. Смех, импровизация, соперничество на сцене — именно там они впервые по-настоящему заметили друг друга.
              </p>
            </div>
            <div className="w-12 h-px" style={{ background: "#b8973a40" }} />
            <div>
              <p className="font-cormorant italic text-2xl mb-3" style={{ color: "#c9a84c" }}>Два года ожидания</p>
              <p className="font-golos leading-relaxed text-base" style={{ color: "#888" }}>
                Дружба, репетиции, совместные выступления — и всё это время чувство росло. Спустя два года они наконец решились сказать главное. И это стало лучшей импровизацией в их жизни.
              </p>
            </div>
            <div className="w-12 h-px" style={{ background: "#b8973a40" }} />
            <p className="font-cormorant font-light text-xl italic leading-relaxed" style={{ color: "#b8973a" }}>
              «Лучшие истории начинаются не по сценарию.»
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function Venue() {
  return (
    <section id="venue" className="py-28 px-6" style={{ background: "#141414" }}>
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="font-golos text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#b8973a" }}>Дата и место</p>
          <h2 className="font-cormorant font-light text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Где и когда
          </h2>
          <div className="w-16 h-px mx-auto mb-16" style={{ background: "#b8973a" }} />
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
                style={{ background: "#1a1a1a", border: "1px solid #b8973a30" }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ background: "#b8973a15" }}
                >
                  <Icon name={icon} size={20} style={{ color: "#c9a84c" }} />
                </div>
                <p className="font-golos text-xs tracking-widest uppercase" style={{ color: "#555" }}>{title}</p>
                <p className="font-cormorant text-white text-xl font-medium">{text}</p>
                <p className="font-golos text-sm" style={{ color: "#666" }}>{sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12">
          <a
            href="https://yandex.ru/maps/?text=Суздаль+ул+Ленина+138+Николаевский+Пасад"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-golos text-sm tracking-widest uppercase transition-all duration-300"
            style={{ border: "1px solid #b8973a60", color: "#c9a84c" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#b8973a"; (e.currentTarget as HTMLElement).style.color = "#0e0e0e"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
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

export function Schedule() {
  return (
    <section id="schedule" className="py-28 px-6" style={{ background: "#0e0e0e" }}>
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-20">
          <p className="font-golos text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#b8973a" }}>День торжества</p>
          <h2 className="font-cormorant font-light text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Программа
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#b8973a" }} />
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px hidden md:block" style={{ background: "#b8973a25" }} />
          <div className="flex flex-col gap-10">
            {SCHEDULE.map(({ time, event, desc }, i) => (
              <FadeIn key={time} delay={i * 0.08}>
                <div className="flex gap-8 items-start">
                  <div className="hidden md:flex flex-col items-end min-w-[4rem]">
                    <span className="font-cormorant text-xl" style={{ color: "#c9a84c" }}>{time}</span>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-4 h-4 mt-1 relative z-10">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#b8973a" }} />
                  </div>
                  <div className="flex-1 pl-5 md:pl-0" style={{ borderLeft: "2px solid #b8973a20" }}>
                    <span className="md:hidden font-cormorant text-lg block mb-1" style={{ color: "#c9a84c" }}>{time}</span>
                    <p className="font-cormorant text-white text-xl font-medium">{event}</p>
                    <p className="font-golos text-sm mt-1" style={{ color: "#666" }}>{desc}</p>
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

export function Gallery() {
  const images = [
    { url: COUPLE_PHOTO, ratio: "aspect-[3/4]" },
    { url: COUPLE_PHOTO, ratio: "aspect-square" },
    { url: COUPLE_PHOTO, ratio: "aspect-[4/3]" },
    { url: COUPLE_PHOTO, ratio: "aspect-[3/4]" },
  ];

  return (
    <section id="gallery" className="py-28 px-6" style={{ background: "#141414" }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="font-golos text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#b8973a" }}>Моменты</p>
          <h2 className="font-cormorant font-light text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Галерея
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "#b8973a" }} />
          <p className="font-golos text-sm mt-6" style={{ color: "#555" }}>Здесь появятся ваши фотографии</p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map(({ url, ratio }, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className={`${ratio} overflow-hidden group`}>
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "grayscale(30%) contrast(1.1)" }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
