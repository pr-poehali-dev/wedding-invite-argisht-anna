import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FadeIn } from "./shared";

export function Contacts() {
  return (
    <section id="contacts" className="py-28 px-6" style={{ background: "#0e0e0e" }}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="font-golos text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#b8973a" }}>Связь</p>
          <h2 className="font-cormorant font-light text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            Контакты
          </h2>
          <div className="w-16 h-px mx-auto mb-16" style={{ background: "#b8973a" }} />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Аргишт", role: "Жених", phone: "+7 (___) ___-__-__" },
            { name: "Анна", role: "Невеста", phone: "+7 (___) ___-__-__" },
          ].map(({ name, role, phone }) => (
            <FadeIn key={name} delay={0.1}>
              <div
                className="p-8 text-center"
                style={{ background: "#1a1a1a", border: "1px solid #b8973a25" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#b8973a15" }}
                >
                  <Icon name="User" size={22} style={{ color: "#c9a84c" }} />
                </div>
                <p className="font-cormorant text-white text-2xl mb-1">{name}</p>
                <p className="font-golos text-xs tracking-widest uppercase mb-4" style={{ color: "#b8973a" }}>{role}</p>
                <div className="flex items-center justify-center gap-2" style={{ color: "#666" }}>
                  <Icon name="Phone" size={14} />
                  <span className="font-golos text-sm">{phone}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-12">
          <p className="font-golos text-sm" style={{ color: "#555" }}>
            По всем вопросам, связанным с торжеством, обращайтесь к организаторам
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export function RSVP() {
  const [form, setForm] = useState({ name: "", guests: "1", attendance: "yes", wishes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="rsvp" className="py-28 px-6" style={{ background: "#141414" }}>
      <div className="max-w-xl mx-auto">
        <FadeIn className="text-center mb-16">
          <p className="font-golos text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#b8973a" }}>Подтверждение</p>
          <h2 className="font-cormorant font-light text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            RSVP
          </h2>
          <div className="w-16 h-px mx-auto mb-4" style={{ background: "#b8973a" }} />
          <p className="font-golos text-sm" style={{ color: "#666" }}>Просим подтвердить участие до 1 июля 2026</p>
        </FadeIn>

        {sent ? (
          <FadeIn>
            <div className="text-center py-16">
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                style={{ background: "#b8973a15" }}
              >
                <Icon name="Heart" size={28} style={{ color: "#c9a84c" }} />
              </div>
              <p className="font-cormorant text-white text-3xl mb-3">Спасибо!</p>
              <p className="font-golos text-sm" style={{ color: "#666" }}>Мы получили ваш ответ и с нетерпением ждём встречи</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              style={{ background: "#1a1a1a", border: "1px solid #b8973a25", padding: "2.5rem" }}
            >
              <div>
                <label className="font-golos text-xs tracking-widest uppercase block mb-2" style={{ color: "#666" }}>Ваше имя</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-transparent pb-2 font-golos text-white text-base outline-none transition-colors"
                  style={{ borderBottom: "1px solid #b8973a40" }}
                />
              </div>

              <div>
                <label className="font-golos text-xs tracking-widest uppercase block mb-2" style={{ color: "#666" }}>Буду присутствовать</label>
                <div className="flex gap-4">
                  {[{ value: "yes", label: "Да, буду!" }, { value: "no", label: "К сожалению, нет" }].map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value={value}
                        checked={form.attendance === value}
                        onChange={(e) => setForm({ ...form, attendance: e.target.value })}
                        className="accent-yellow-600"
                      />
                      <span className="font-golos text-sm" style={{ color: "#888" }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-golos text-xs tracking-widest uppercase block mb-2" style={{ color: "#666" }}>Количество гостей</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-transparent pb-2 font-golos text-white text-base outline-none transition-colors"
                  style={{ borderBottom: "1px solid #b8973a40" }}
                />
              </div>

              <div>
                <label className="font-golos text-xs tracking-widest uppercase block mb-2" style={{ color: "#666" }}>Пожелания</label>
                <textarea
                  value={form.wishes}
                  onChange={(e) => setForm({ ...form, wishes: e.target.value })}
                  placeholder="Ваши пожелания молодожёнам..."
                  rows={3}
                  className="w-full bg-transparent pb-2 font-golos text-white text-sm outline-none resize-none transition-colors"
                  style={{ borderBottom: "1px solid #b8973a40" }}
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3 px-8 font-golos text-sm tracking-widest uppercase transition-colors duration-300"
                style={{ background: "#b8973a", color: "#0e0e0e" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#d4af50")}
                onMouseLeave={e => (e.currentTarget.style.background = "#b8973a")}
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

export function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ background: "#080808", borderTop: "1px solid #b8973a20" }}>
      <p className="font-cormorant text-3xl mb-2" style={{ color: "#b8973a" }}>А &amp; А</p>
      <p className="font-golos text-xs tracking-widest uppercase" style={{ color: "#444" }}>15 · 08 · 2026 · Суздаль</p>
      <p className="font-golos text-xs mt-6" style={{ color: "#333" }}>с любовью ✦</p>
    </footer>
  );
}
