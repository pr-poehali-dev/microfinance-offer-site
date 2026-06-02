import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MFO_LIST = [
  {
    id: 1,
    name: "MoneyMan",
    shortName: "Money\nMan",
    bg: "#1a3a6b",
    textColor: "#fff",
    tag: "Рекомендуем",
    tagColor: "bg-green-100 text-green-700",
    subtitle: "Первый займ под 0%",
    sumMax: "до 30 000 ₽",
    termMax: "до 21 дня",
    decision: "от 1 минуты",
    approval: "98%",
    noRequirements: "Без справок и поручителей",
    extra: "Первый займ 0%",
    extraB: "Круглосуточно",
    rating: 4.8,
    reviews: 5,
    features: ["Первый займ 0%", "Без справок", "24/7"],
  },
  {
    id: 2,
    name: "Займер",
    shortName: "ЗАЙМЕР",
    bg: "#2d2d2d",
    textColor: "#fff",
    tag: null,
    subtitle: "Высокий шанс одобрения",
    sumMax: "до 30 000 ₽",
    termMax: "до 30 дней",
    decision: "от 2 минут",
    approval: "95%",
    noRequirements: "Без звонков и проверок",
    extra: "Моментально на карту",
    extraB: "",
    rating: 4.8,
    reviews: 5,
    features: ["95% одобрение", "Без звонков", "На карту"],
  },
  {
    id: 3,
    name: "Екапуста",
    shortName: "е\nкапуста",
    bg: "#ff6b35",
    textColor: "#fff",
    tag: null,
    subtitle: "Быстро и просто",
    sumMax: "до 50 000 ₽",
    termMax: "до 21 дня",
    decision: "от 5 минут",
    approval: "94%",
    noRequirements: "Без отказов и поручителей",
    extra: "Онлайн 24/7",
    extraB: "",
    rating: 4.7,
    reviews: 5,
    features: ["Без отказов", "Онлайн 24/7", "До 50 000 ₽"],
  },
  {
    id: 4,
    name: "Miloan",
    shortName: "MILOAN",
    bg: "#1e7e4a",
    textColor: "#fff",
    tag: null,
    subtitle: "Для новых клиентов",
    sumMax: "до 100 000 ₽",
    termMax: "до 24 недель",
    decision: "от 15 минут",
    approval: "92%",
    noRequirements: "Большие суммы до 100 000 ₽",
    extra: "Гибкий срок до 24 недель",
    extraB: "Низкая ставка от 0,7%",
    rating: 4.6,
    reviews: 5,
    features: ["До 100 000 ₽", "24 недели", "Низкая ставка"],
  },
  {
    id: 5,
    name: "Турбозайм",
    shortName: "ТУРБО\nЗАЙМ",
    bg: "#c0392b",
    textColor: "#fff",
    tag: null,
    subtitle: "Надёжно и быстро",
    sumMax: "до 16 000 ₽",
    termMax: "до 30 дней",
    decision: "от 10 минут",
    approval: "93%",
    noRequirements: "Простой процесс",
    extra: "Без скрытых комиссий",
    extraB: "Досрочное погашение",
    rating: 4.5,
    reviews: 5,
    features: ["Простой процесс", "Без комиссий", "Досрочно"],
  },
];

const FAQ_LIST = [
  { q: "Кто может получить займ онлайн?", a: "Гражданин РФ от 18 лет с паспортом и телефоном. Официальное трудоустройство не обязательно. Каждая МФО устанавливает свои требования — уточняйте на сайте выбранной организации." },
  { q: "Как быстро рассматривается заявка?", a: "Большинство МФО принимают решение автоматически за 1–15 минут. После одобрения деньги поступают на карту в течение нескольких минут." },
  { q: "Нужны ли справки и поручители?", a: "Нет. Для получения займа достаточно паспорта гражданина РФ. Никаких справок о доходах, поручителей или залога не требуется." },
  { q: "Как я получу деньги?", a: "Деньги переводятся на вашу банковскую карту любого банка, на расчётный счёт или выдаются наличными в офисе (зависит от МФО)." },
  { q: "Что будет, если я не смогу вовремя вернуть займ?", a: "Свяжитесь с МФО заранее. Большинство организаций предлагают пролонгацию займа. Просрочка влечёт начисление пени и ухудшение кредитной истории." },
  { q: "Безопасно ли оформлять займ онлайн?", a: "Да, если МФО внесена в реестр ЦБ РФ. Все организации в нашем каталоге имеют действующую лицензию. Данные передаются по защищённому соединению." },
  { q: "Почему могут отказать в займе?", a: "Причины отказа: неверно указанные данные, плохая кредитная история, наличие открытых просроченных долгов или несоответствие требованиям МФО." },
];

const STEPS = [
  { icon: "Search", title: "1. Выберите МФО", desc: "Изучите предложения и выберите подходящий вам займ" },
  { icon: "FileText", title: "2. Заполните заявку", desc: "Заполните онлайн-заявку на сайте выбранной МФО" },
  { icon: "Clock", title: "3. Дождитесь решения", desc: "Решение по вашей заявке придёт от 1 до 15 минут" },
  { icon: "CreditCard", title: "4. Получите деньги", desc: "Деньги поступят на карту, счёт или наличными удобным способом" },
];

const ADVANTAGES = [
  { icon: "Zap", title: "Быстро", desc: "Решение за 5–15 минут" },
  { icon: "UserCheck", title: "Доступно", desc: "Одобрение даже с плохой КИ" },
  { icon: "Monitor", title: "Удобно", desc: "Оформление онлайн 24/7" },
  { icon: "Shield", title: "Безопасно", desc: "Все данные под защитой" },
];

const SECURITY_ITEMS = [
  { icon: "Lock", title: "SSL-шифрование", desc: "Все данные передаются по защищённому соединению" },
  { icon: "ShieldOff", title: "Защита информации", desc: "Ваши персональные данные надёжно защищены" },
  { icon: "EyeOff", title: "Не передаём данные", desc: "Мы никогда не передаём ваши данные третьим лицам" },
  { icon: "BadgeCheck", title: "Только проверенные МФО", desc: "Все данные проверены только с надёжными МФО" },
];

const NAV_LINKS = ["Главная", "Все МФО", "Как это работает", "Вопросы", "Безопасность"] as const;
type NavLink = typeof NAV_LINKS[number];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#f5a623" : "#ddd"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating} из 5</span>
    </div>
  );
}

function LogoBox({ mfo }: { mfo: typeof MFO_LIST[0] }) {
  return (
    <div
      className="logo-box text-center leading-tight"
      style={{ background: mfo.bg, color: mfo.textColor }}
    >
      {mfo.shortName.split("\n").map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeNav, setActiveNav] = useState<NavLink>("Главная");
  const [activeFilter, setActiveFilter] = useState("Все МФО");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (section: NavLink) => {
    setActiveNav(section);
    setMobileOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filters = ["Все МФО", "Новым клиентам", "Большие суммы", "На карту", "Быстрое решение"];

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-800" style={{ fontFamily: "'Golos Text', Roboto, sans-serif" }}>

      {/* ══ HEADER ══ */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("Главная")}>
            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center">
              <Icon name="Check" size={14} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight text-gray-800">Займы онлайн</div>
              <div className="text-[10px] text-gray-500 leading-tight">Подбор МФО</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`text-sm transition-colors pb-0.5 border-b-2 ${
                  activeNav === link
                    ? "text-green-700 border-green-600 font-semibold"
                    : "text-gray-600 border-transparent hover:text-green-700"
                }`}
              >
                {link}
              </button>
            ))}
          </nav>

          <button className="md:hidden text-gray-500" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}
                className={`text-left text-sm py-1 ${activeNav === link ? "text-green-700 font-semibold" : "text-gray-600"}`}>
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section id="Главная" className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                Где взять займ<br />
                <span className="text-green-600">онлайн</span> в 2026 году
              </h1>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Мы подобрали для вас надёжные МФО с высоким шансом одобрения.<br />
                Оформление за 5–10 минут. Деньги на карту, счёт или наличными.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: "Zap", text: "Быстро", sub: "Решение за 5 минут" },
                  { icon: "Shield", text: "Надёжно", sub: "Проверенные МФО" },
                  { icon: "CreditCard", text: "Удобно", sub: "На карту 24/7" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
                      <Icon name={item.icon} size={15} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800">{item.text}</div>
                      <div className="text-[11px] text-gray-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollTo("Все МФО")}
                className="btn-green px-7 py-3 text-sm rounded-lg"
              >
                Подобрать займ →
              </button>
            </div>

            {/* Hero card mockup */}
            <div className="hidden md:flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-64">
                <div className="text-xs text-gray-500 mb-1">Сумма займа</div>
                <div className="text-2xl font-bold text-gray-900 mb-3">30 000 ₽</div>
                <div className="text-xs text-gray-500 mb-1">Срок займа</div>
                <div className="text-lg font-semibold text-gray-800 mb-4">15 дней</div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }} />
                </div>
                <button className="btn-green w-full py-2.5 text-sm rounded-lg">
                  Получить деньги
                </button>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                  <Icon name="ShieldCheck" size={12} className="text-green-500" />
                  Безопасное оформление
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MFO CATALOG ══ */}
      <section id="Все МФО" className="py-10 bg-[#f7f8fa]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Лучшие предложения МФО</h2>
            <p className="text-sm text-gray-500">Выберите подходящий займ и оформите онлайн</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-4 py-1.5 rounded-full border transition-all ${
                  activeFilter === f
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* MFO cards */}
          <div className="flex flex-col gap-3">
            {MFO_LIST.map((mfo) => (
              <div
                key={mfo.id}
                className="mfo-row bg-white rounded-xl border border-gray-200 p-4 md:p-5"
              >
                {/* Mobile layout */}
                <div className="flex items-start gap-3 md:hidden">
                  <LogoBox mfo={mfo} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-gray-900">{mfo.name}</span>
                      {mfo.tag && (
                        <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">
                          {mfo.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{mfo.subtitle}</div>
                    <Stars rating={mfo.rating} />
                    <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
                      <div>
                        <div className="text-[10px] text-gray-400">Сумма</div>
                        <div className="text-xs font-semibold">{mfo.sumMax}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">Срок</div>
                        <div className="text-xs font-semibold">{mfo.termMax}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">Решение</div>
                        <div className="text-xs font-semibold">{mfo.decision}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-green flex-1 py-2 text-xs rounded-lg">
                        Получить деньги
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:flex items-center gap-4">
                  {/* Logo */}
                  <LogoBox mfo={mfo} />

                  {/* Name + rating */}
                  <div className="w-40 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-gray-900 text-sm">{mfo.name}</span>
                      {mfo.tag && (
                        <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">
                          {mfo.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-500 mb-1">{mfo.subtitle}</div>
                    <Stars rating={mfo.rating} />
                  </div>

                  {/* Params */}
                  <div className="flex flex-1 gap-6 items-center">
                    <div className="text-center">
                      <div className="text-[11px] text-gray-400 mb-0.5">Сумма займа</div>
                      <div className="text-sm font-bold text-gray-900">{mfo.sumMax}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] text-gray-400 mb-0.5">Срок займа</div>
                      <div className="text-sm font-bold text-gray-900">{mfo.termMax}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[11px] text-gray-400 mb-0.5">Решение</div>
                      <div className="text-sm font-bold text-gray-900">{mfo.decision}</div>
                    </div>
                    <div className="flex-1 text-xs text-gray-500 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <Icon name="Check" size={11} className="text-green-600 flex-shrink-0" />
                        {mfo.noRequirements}
                      </div>
                      {mfo.extra && (
                        <div className="flex items-center gap-1">
                          <Icon name="Check" size={11} className="text-green-600 flex-shrink-0" />
                          {mfo.extra}
                        </div>
                      )}
                      {mfo.extraB && (
                        <div className="flex items-center gap-1">
                          <Icon name="Check" size={11} className="text-green-600 flex-shrink-0" />
                          {mfo.extraB}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button className="btn-green px-6 py-2.5 text-sm rounded-lg whitespace-nowrap">
                      Получить деньги →
                    </button>
                    <button className="text-xs text-green-600 hover:underline">
                      Подробнее о МФО
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tip block */}
          <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Lightbulb" size={15} className="text-green-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-800">Совет: </span>
              <span className="text-sm text-gray-600">
                Если вам отказали в одном сервисе — не переживайте! Попробуйте другие варианты из нашего списка.
                Одобрение в каждой МФО принимается индивидуально.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="Как это работает" className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Как это работает?</h2>
            <p className="text-sm text-gray-500">Оформить займ онлайн — это просто и быстро</p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="step-num mx-auto mb-3">
                  <Icon name={step.icon} size={22} className="text-green-600" />
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
                <div className="text-sm font-semibold text-gray-800 mb-1">{step.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Important note */}
          <div className="important-block mt-5 flex gap-3 items-start">
            <Icon name="Info" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">
              Мы не выдаём займы и не являемся кредитной организацией. Все решения принимаются МФО.
              Перед оформлением займа внимательно ознакомьтесь с условиями договора.
            </span>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="Вопросы" className="py-12 bg-[#f7f8fa] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Вопросы и ответы</h2>
          <p className="text-sm text-gray-500 mb-6">Ответы на частые вопросы о займах онлайн</p>

          <div className="flex flex-col gap-2">
            {FAQ_LIST.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-gray-800 pr-4">{item.q}</span>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    className={`flex-shrink-0 transition-colors ${openFaq === i ? "text-green-600" : "text-gray-400"}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECURITY ══ */}
      <section id="Безопасность" className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Безопасность ваших данных</h2>
            <p className="text-sm text-gray-500">Мы заботимся о вашей конфиденциальности</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {SECURITY_ITEMS.map((item) => (
              <div key={item.title} className="security-card text-center">
                <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-3">
                  <Icon name={item.icon} size={20} className="text-green-600" />
                </div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-800">Займы онлайн</div>
                  <div className="text-[10px] text-gray-500">Подбор МФО</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Информационный сайт. Не является финансовой организацией.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-3">Навигация</div>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link}>
                    <button onClick={() => scrollTo(link)}
                      className="text-xs text-gray-500 hover:text-green-700 transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-3">Информация</div>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>О нас</li>
                <li>Политика конфиденциальности</li>
                <li>Пользовательское соглашение</li>
                <li>Контакты</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <div className="text-xs font-semibold text-gray-700 mb-3">Безопасность</div>
              <div className="flex items-start gap-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={18} className="text-green-600" />
                </div>
                <div className="text-[11px] text-gray-500 leading-relaxed">
                  Безопасное SSL-шифрование
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
            © 2026 Займы онлайн. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}