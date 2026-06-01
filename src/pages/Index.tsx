import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ────────────────────────────────────────────────────────────────────

const MFO_LIST = [
  {
    id: 1,
    name: "МигКредит",
    logo: "🏦",
    tag: "ТОП выбор",
    rate: "от 0.5% / день",
    amount: "до 100 000 ₽",
    term: "до 30 дней",
    approval: "97%",
    rating: 4.8,
    reviews: 1284,
    features: ["Без залога", "Онлайн 24/7", "За 5 минут"],
    color: "from-blue-900/40 to-blue-950/20",
  },
  {
    id: 2,
    name: "Займер",
    logo: "💎",
    tag: "Лучшая ставка",
    rate: "от 0.3% / день",
    amount: "до 50 000 ₽",
    term: "до 60 дней",
    approval: "95%",
    rating: 4.7,
    reviews: 987,
    features: ["Первый займ 0%", "Продление срока", "Скидки постоянным"],
    color: "from-emerald-900/40 to-emerald-950/20",
  },
  {
    id: 3,
    name: "СберЗайм",
    logo: "🏛️",
    tag: "Надёжность",
    rate: "от 0.6% / день",
    amount: "до 200 000 ₽",
    term: "до 90 дней",
    approval: "92%",
    rating: 4.9,
    reviews: 2156,
    features: ["Крупная сумма", "Долгий срок", "Партнёр Сбера"],
    color: "from-indigo-900/40 to-indigo-950/20",
  },
  {
    id: 4,
    name: "CashDrive",
    logo: "⚡",
    tag: "Быстро",
    rate: "от 0.8% / день",
    amount: "до 30 000 ₽",
    term: "до 21 дня",
    approval: "99%",
    rating: 4.5,
    reviews: 643,
    features: ["Одобрение за 2 мин", "На карту любого банка", "Без проверки КИ"],
    color: "from-amber-900/30 to-amber-950/20",
  },
  {
    id: 5,
    name: "МонеДо",
    logo: "🌟",
    tag: "Для новых",
    rate: "0% первый займ",
    amount: "до 15 000 ₽",
    term: "до 30 дней",
    approval: "93%",
    rating: 4.6,
    reviews: 812,
    features: ["Первый займ бесплатно", "Простая заявка", "Улучшение КИ"],
    color: "from-purple-900/30 to-purple-950/20",
  },
  {
    id: 6,
    name: "КредитПлюс",
    logo: "💼",
    tag: "Большая сумма",
    rate: "от 0.45% / день",
    amount: "до 500 000 ₽",
    term: "до 365 дней",
    approval: "88%",
    rating: 4.4,
    reviews: 534,
    features: ["До 500 тыс.", "Длинный срок", "Поручительство"],
    color: "from-teal-900/30 to-teal-950/20",
  },
];

const REVIEWS = [
  { id: 1, mfo: "МигКредит", author: "Антон С.", rating: 5, text: "Деньги пришли через 8 минут. Уже третий раз пользуюсь — ни разу проблем не было. Ставка честная, без скрытых комиссий.", date: "28 мая 2026" },
  { id: 2, mfo: "Займер", author: "Марина Л.", rating: 5, text: "Первый займ взяла под 0% — очень удобно. Заявка простая, всё понятно написано. Буду рекомендовать подругам.", date: "25 мая 2026" },
  { id: 3, mfo: "СберЗайм", author: "Дмитрий В.", rating: 5, text: "Серьёзная организация. Взял 150 000 рублей на 3 месяца под хорошую ставку. Всё прозрачно, менеджер ответил на все вопросы.", date: "20 мая 2026" },
  { id: 4, mfo: "CashDrive", author: "Ольга Р.", rating: 4, text: "Очень быстро! Буквально за 2 минуты одобрили. Единственный минус — ставка чуть выше других, но скорость того стоит.", date: "18 мая 2026" },
];

const FAQ = [
  { q: "Как выбрать МФО?", a: "Обращайте внимание на дневную процентную ставку, максимальную сумму и срок займа. Также важен рейтинг организации в ЦБ РФ. На нашем сайте все МФО проверены и лицензированы." },
  { q: "Можно ли получить займ с плохой кредитной историей?", a: "Да, большинство МФО лояльны к кредитной истории. CashDrive и МигКредит рассматривают заявки даже при проблемах с КИ. Начните с небольшой суммы и своевременно погашайте — это улучшит историю." },
  { q: "Сколько времени занимает одобрение?", a: "Большинство МФО из нашего каталога одобряют заявки за 2-15 минут. CashDrive — самый быстрый, до 2 минут. Деньги поступают на карту в течение 5-30 минут после подписания договора." },
  { q: "Какие документы нужны?", a: "Как правило, нужен только паспорт гражданина РФ. Некоторые МФО дополнительно запрашивают СНИЛС или второй документ для крупных сумм. Никаких справок с работы или поручителей." },
  { q: "Как погасить займ досрочно?", a: "Все МФО из нашего каталога разрешают досрочное погашение без штрафов. Вы платите только за фактические дни пользования деньгами. Это значительно сокращает итоговую переплату." },
];

const STEPS = [
  { num: "01", title: "Выберите МФО", desc: "Сравните условия всех организаций в каталоге, изучите рейтинги и отзывы реальных клиентов.", icon: "Search" },
  { num: "02", title: "Подайте заявку", desc: "Перейдите на сайт МФО и заполните короткую анкету. Только паспорт — без справок и поручителей.", icon: "FileText" },
  { num: "03", title: "Получите решение", desc: "Автоматическая система проверяет данные и выдаёт решение за 2-15 минут. Одобрение до 99%.", icon: "CheckCircle" },
  { num: "04", title: "Получите деньги", desc: "После подписания договора деньги поступят на вашу карту в течение нескольких минут.", icon: "Banknote" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "hsl(43, 90%, 55%)" : "hsl(220, 18%, 28%)"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function MfoCard({ mfo, delay }: { mfo: typeof MFO_LIST[0]; delay: number }) {
  return (
    <div className={`card-hover animate-fade-up opacity-0 delay-${delay} relative bg-gradient-to-br ${mfo.color} border border-white/8 rounded-2xl p-6 flex flex-col gap-4`}>
      {mfo.tag && (
        <span className="badge-top absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full font-display tracking-wide">
          {mfo.tag}
        </span>
      )}

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center text-2xl border border-white/10">
          {mfo.logo}
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold text-white tracking-wide">{mfo.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={mfo.rating} size={13} />
            <span className="text-xs text-muted-foreground">{mfo.rating} ({mfo.reviews.toLocaleString("ru")})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Ставка", value: mfo.rate },
          { label: "Сумма", value: mfo.amount },
          { label: "Срок", value: mfo.term },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/6">
            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
            <div className="text-sm font-semibold text-white leading-tight">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {mfo.features.map((f) => (
          <span key={f} className="text-xs bg-white/6 border border-white/8 text-secondary-foreground px-2.5 py-1 rounded-full">
            {f}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/8">
        <span className="text-xs text-muted-foreground">
          Одобрение <span className="text-green-400 font-semibold">{mfo.approval}</span>
        </span>
        <button className="gold-gradient text-[hsl(220,25%,7%)] font-semibold text-sm px-5 py-2 rounded-lg hover:opacity-90 transition-opacity font-display tracking-wide">
          Получить займ
        </button>
      </div>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

const SECTIONS = ["Главная", "Все МФО", "Как работает", "Вопросы", "Безопасность"] as const;
type Section = typeof SECTIONS[number];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("Главная");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (section: Section) => {
    setActiveSection(section);
    setMobileMenu(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-display font-bold gold-text tracking-wider">ФИНАНС</span>
            <span className="text-2xl font-display font-light text-white/70 tracking-wider">ПРО</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                  activeSection === s ? "text-[hsl(43,90%,55%)] active" : "text-muted-foreground hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>

          <button className="hidden md:block gold-gradient text-[hsl(220,25%,7%)] font-semibold text-sm px-5 py-2 rounded-lg font-display tracking-wide hover:opacity-90 transition-opacity">
            Подобрать займ
          </button>

          <button className="md:hidden text-muted-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-background/95 border-t border-border px-6 py-4 flex flex-col gap-4">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`text-left text-sm font-medium py-1 ${activeSection === s ? "gold-text" : "text-muted-foreground"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="Главная" className="hero-bg relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-6 animate-fade-up opacity-0">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">Все МФО проверены ЦБ РФ</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6 animate-fade-up opacity-0 delay-1">
              ЗАЙМ ДО{" "}
              <span className="gold-text">500 000 ₽</span>{" "}
              ЗА 5 МИНУТ
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-up opacity-0 delay-2 max-w-xl">
              Сравните условия от ведущих МФО России. Только лицензированные организации, реальные отзывы, прозрачные ставки.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up opacity-0 delay-3">
              <button
                onClick={() => scrollTo("Все МФО")}
                className="gold-gradient text-[hsl(220,25%,7%)] font-bold text-base px-8 py-3.5 rounded-xl font-display tracking-wide hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                Смотреть все предложения
              </button>
              <button
                onClick={() => scrollTo("Как работает")}
                className="border border-white/20 bg-white/5 text-white font-semibold text-base px-8 py-3.5 rounded-xl font-display tracking-wide hover:bg-white/10 transition-all"
              >
                Как это работает
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-up opacity-0 delay-4">
            {[
              { value: "47+", label: "МФО в каталоге" },
              { value: "99%", label: "Одобряемость" },
              { value: "2 мин", label: "Среднее решение" },
              { value: "150K+", label: "Клиентов доверяют" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center">
                <div className="text-3xl font-display font-bold gold-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ВСЕ МФО ── */}
      <section id="Все МФО" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[hsl(43,90%,55%)] text-sm font-semibold uppercase tracking-widest mb-2 font-display">Каталог</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">ВСЕ ПРЕДЛОЖЕНИЯ</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">Отсортировано по рейтингу. Обновляется ежедневно.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Все", "Первый займ 0%", "Без проверки КИ", "Крупная сумма", "Быстрое одобрение"].map((f) => (
              <button
                key={f}
                className={`text-sm px-4 py-2 rounded-lg border transition-all font-medium ${
                  f === "Все"
                    ? "gold-gradient text-[hsl(220,25%,7%)] border-transparent"
                    : "border-border bg-muted/50 text-muted-foreground hover:border-white/20 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MFO_LIST.map((mfo, i) => (
              <MfoCard key={mfo.id} mfo={mfo} delay={Math.min(i + 1, 5)} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ── КАК РАБОТАЕТ ── */}
      <section id="Как работает" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[hsl(43,90%,55%)] text-sm font-semibold uppercase tracking-widest mb-2 font-display">Инструкция</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">КАК ЭТО РАБОТАЕТ</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Получить займ онлайн — быстро и просто. Следуйте четырём шагам.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className={`animate-fade-up opacity-0 delay-${i + 1} relative bg-muted/50 border border-border rounded-2xl p-6 hover:border-white/20 transition-all`}>
                <div className="text-5xl font-display font-bold text-white/6 absolute top-4 right-4">{step.num}</div>
                <div className="w-12 h-12 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center mb-5">
                  <Icon name={step.icon} fallback="Circle" size={22} className="text-[hsl(43,90%,55%)]" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2 tracking-wide">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ── ОТЗЫВЫ ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[hsl(43,90%,55%)] text-sm font-semibold uppercase tracking-widest mb-2 font-display">Клиенты</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">РЕАЛЬНЫЕ ОТЗЫВЫ</h2>
            <p className="text-muted-foreground">Отзывы проверены и подтверждены</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((rev, i) => (
              <div key={rev.id} className={`animate-fade-up opacity-0 delay-${i + 1} bg-muted/40 border border-border rounded-2xl p-5 hover:border-white/15 transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={rev.rating} size={14} />
                  <span className="text-xs text-muted-foreground font-semibold border border-border px-2 py-0.5 rounded-full">{rev.mfo}</span>
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-4">"{rev.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {rev.author[0]}
                    </div>
                    <span className="text-xs font-semibold text-white">{rev.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="border border-border bg-muted/30 text-muted-foreground hover:text-white hover:border-white/20 transition-all text-sm font-medium px-6 py-2.5 rounded-lg">
              Загрузить ещё отзывы
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ── ВОПРОСЫ ── */}
      <section id="Вопросы" className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[hsl(43,90%,55%)] text-sm font-semibold uppercase tracking-widest mb-2 font-display">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">ЧАСТЫЕ ВОПРОСЫ</h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden bg-muted/30 hover:border-white/15 transition-colors">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white pr-4 font-display tracking-wide">{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-[hsl(43,90%,55%)]" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* ── БЕЗОПАСНОСТЬ ── */}
      <section id="Безопасность" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[hsl(43,90%,55%)] text-sm font-semibold uppercase tracking-widest mb-2 font-display">Защита</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">ВАША БЕЗОПАСНОСТЬ</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Мы работаем только с легальными МФО, внесёнными в реестр ЦБ РФ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "ShieldCheck", title: "Реестр ЦБ РФ", desc: "Все организации каталога имеют действующую лицензию Банка России. Проверяем статус ежемесячно." },
              { icon: "Lock", title: "Защита данных", desc: "Ваши личные данные передаются только в выбранную МФО по зашифрованному каналу SSL/TLS." },
              { icon: "Eye", title: "Прозрачные условия", desc: "Мы публикуем полную стоимость займа (ПСК), включая все комиссии. Никаких скрытых платежей." },
              { icon: "Award", title: "Независимый рейтинг", desc: "Рейтинги формируются на основе реальных отзывов клиентов и объективных финансовых показателей." },
              { icon: "Scale", title: "Правовая защита", desc: "Все МФО работают в рамках 151-ФЗ. Максимальная ставка ограничена законом — не более 0,8% в день." },
              { icon: "PhoneCall", title: "Поддержка 24/7", desc: "Если у вас возникли вопросы или проблемы — наша служба поддержки работает круглосуточно." },
            ].map((item, i) => (
              <div key={item.title} className={`animate-fade-up opacity-0 delay-${i + 1} bg-muted/40 border border-border rounded-2xl p-6 hover:border-white/15 transition-all`}>
                <div className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center mb-4">
                  <Icon name={item.icon} fallback="Circle" size={20} className="text-[hsl(43,90%,55%)]" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2 tracking-wide">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="relative bg-gradient-to-r from-amber-900/30 via-amber-800/20 to-amber-900/30 border border-amber-700/30 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">ГОТОВЫ ПОДОБРАТЬ ЗАЙМ?</h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Выберите нужную сумму — мы покажем лучшие предложения именно для вас
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {["10 000 ₽", "30 000 ₽", "50 000 ₽", "100 000 ₽"].map((sum) => (
                  <button
                    key={sum}
                    className="border border-amber-700/40 bg-amber-900/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-amber-800/30 transition-all font-display tracking-wide"
                  >
                    {sum}
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollTo("Все МФО")}
                className="gold-gradient text-[hsl(220,25%,7%)] font-bold text-base px-10 py-4 rounded-xl font-display tracking-wide hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-amber-500/25"
              >
                Подобрать лучшее предложение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-muted/20 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xl font-display font-bold gold-text tracking-wider">ФИНАНС</span>
                <span className="text-xl font-display font-light text-white/60 tracking-wider">ПРО</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Информационный сайт. Не является финансовой организацией. Все МФО имеют лицензию ЦБ РФ.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              {SECTIONS.map((s) => (
                <button key={s} onClick={() => scrollTo(s)} className="hover:text-white transition-colors">
                  {s}
                </button>
              ))}
            </div>

            <div className="text-xs text-muted-foreground text-center md:text-right">
              <div>© 2026 ФинансПро</div>
              <div className="mt-1">Займы от 0% до 0.8% в день</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}