import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FadeIn } from "./shared";

export function Contacts() {
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

export function RSVP() {
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

export function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ background: "#1c1714" }}>
      <p className="font-cormorant text-amber-200/60 text-3xl mb-2">А &amp; А</p>
      <p className="font-golos text-stone-500 text-xs tracking-widest uppercase">15 · 08 · 2026 · Суздаль</p>
      <p className="font-golos text-stone-600 text-xs mt-6">с любовью ✦</p>
    </footer>
  );
}
