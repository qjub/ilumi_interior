import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Boxes, Building2, Camera, Check, ChevronDown, Compass, ExternalLink, Eye, Layers3, Menu, MousePointer2, Play, Sparkles, X, Zap } from "lucide-react";

/*
  ILUMI INTERIOR - React landing page prototype

  Ako použiť logo:
  1. V React/Vite projekte vytvor priečinok: public
  2. Nahraj tvoje logo ako: public/ilumi-logo.png
  3. Ak chceš iný názov, zmeň LOGO_SRC nižšie.

  Odporúčaný stack:
  - Vite + React
  - Tailwind CSS
  - framer-motion
  - lucide-react
*/

const LOGO_SRC = "/ilumi-logo.png";

const services = [
  {
    icon: Compass,
    title: "Interiérový dizajn",
    text: "Premyslený návrh priestoru, dispozície, materiálov, svetla a nábytku. Nie dekoratívna náhoda oblečená do béžovej.",
  },
  {
    icon: Camera,
    title: "Fotorealistické vizualizácie",
    text: "Silné statické výstupy pre klientov, prezentácie, predaj a rozhodovanie ešte pred realizáciou.",
  },
  {
    icon: MousePointer2,
    title: "Interaktívne prehliadky",
    text: "Priestor, ktorý sa dá prejsť cez mobil, tablet alebo PC. Ideálne pre developerov, showroomy a realitný predaj.",
  },
];

const process = [
  ["01", "Analýza", "Pôdorys, svetlo, potreby, rozpočet, technické limity a reálny spôsob používania priestoru."],
  ["02", "Koncept", "Jeden jasný smer. Nie desať možností, po ktorých klient potrebuje terapeutické sedenie."],
  ["03", "Vizualizácia", "Fotorealistické obrazy, video alebo interaktívna prehliadka podľa typu projektu."],
  ["04", "Výstup", "Odovzdanie návrhu, podkladov, prezentácie a odporúčaní pre ďalší krok."],
];

const projects = [
  {
    title: "Byt s interaktívnou prehliadkou",
    type: "Unreal Engine / Interior",
    desc: "Návrh interiéru spracovaný ako priestor, ktorý si klient vie reálne prejsť pred realizáciou.",
  },
  {
    title: "Developerský predajný koncept",
    type: "Real estate / Sales tool",
    desc: "Výber bytu, variantov a atmosféry priestoru cez jednoduché prezentačné rozhranie.",
  },
  {
    title: "Prémiová kuchyňa a denná zóna",
    type: "Interior / Visualization",
    desc: "Materiálovo čistý návrh s dôrazom na svetlo, ergonómiu a dlhodobú nadčasovosť.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MagneticButton({ children, variant = "primary", className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.12,
      y: (e.clientY - rect.top - rect.height / 2) * 0.12,
    });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition",
        variant === "primary"
          ? "bg-white text-black hover:bg-zinc-200"
          : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

function Noise() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
      }}
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Služby", "#services"],
    ["Proces", "#process"],
    ["Portfólio", "#portfolio"],
    ["Kontakt", "#contact"],
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-black/70 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={LOGO_SRC} alt="Ilumi Interior logo" className="h-9 w-9 object-contain" />
          </div>
          <div className="leading-none">
            <div className="text-sm font-black tracking-[0.32em] text-white">ILUMI</div>
            <div className="mt-1 text-[10px] tracking-[0.42em] text-zinc-400">INTERIOR</div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-zinc-300 transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black md:inline-flex">
          Začať projekt
        </a>

        <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-white/10 bg-black/95 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="text-lg text-zinc-200">
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.2]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* FULLSCREEN VIDEO */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/0" />

        {/* BOTTOM GRADIENT */}
        <div className="absolute inset-x-0 bottom-0 h-50 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* LEFT GRADIENT FOR TEXT READABILITY */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-24 md:items-end md:px-8 md:pb-32 lg:pb-20">
  <div className="max-w-5xl md:max-w-4xl">  
        

          <motion.h1
  initial={{ opacity: 0, y: 28 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.75, delay: 0.08 }}
  className="text-5xl font-black leading-[0.9] tracking-[-0.055em] text-white md:text-6xl lg:text-7xl"
>
  Interiér  nie je len
  <br />
"pekný obrázok"
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.75, delay: 0.16 }}
  className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl"
>
  Navrhujeme interiéry, vizualizácie a interaktívne prehliadky,
  <br />
  ktoré z priestoru spravia jasné rozhodnutie ešte pred realizáciou.
</motion.p>



          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton>Chcem navrhnúť projekt</MagneticButton>

            <a
              href="#portfolio"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-black"
            >
              Pozrieť portfólio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-zinc-400 transition hover:text-white"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-black px-5 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Problém</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">Pekný obrázok nestačí.</h2>
          </div>
          <p className="max-w-3xl text-xl leading-9 text-zinc-300">
            Väčšina klientov robí drahé rozhodnutia z pár renderov, náladového moodboardu a pôdorysu, ktorý vyzerá ako technický dôkaz ľudskej bolesti. Ja robím návrh tak, aby človek pochopil priestor, pohyb, svetlo, materiál a výslednú atmosféru.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            [Eye, "Vidieť", "Fotorealistické výstupy ukážu atmosféru a materiály bez hádania."],
            [Layers3, "Pochopiť", "Dispozícia, ergonómia a logika priestoru vysvetlená jasne, nie mysticky."],
            [Boxes, "Zažiť", "Interaktívna prehliadka zmení návrh na zážitok, ktorý sa dá prejsť."],
          ].map(([Icon, title, text]) => (
            <motion.div
              key={title}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition hover:bg-white/[0.06]"
            >
              <Icon className="h-7 w-7 text-white" />
              <h3 className="mt-8 text-2xl font-black tracking-tight">{title}</h3>
              <p className="mt-4 leading-7 text-zinc-400">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-zinc-950 px-5 py-28 text-white md:px-8">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Služby</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">Od návrhu po interaktívny predajný nástroj.</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black p-7"
              >
                <div className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0" />
                <div className="relative z-10 transition group-hover:text-black">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:border-black/10 group-hover:bg-black/5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-10 text-2xl font-black tracking-tight">{service.title}</h3>
                  <p className="mt-5 leading-7 text-zinc-400 transition group-hover:text-black/70">{service.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-black px-5 py-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="md:sticky md:top-28 md:h-fit">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Proces</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">Menej chaosu. Viac verdiktu.</h2>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Klient nedostáva nekonečný bufet možností. Dostáva filtrované riešenie, ktoré má dôvod, logiku a vizuálnu silu.
            </p>
          </div>

          <div className="space-y-5">
            {process.map(([num, title, text]) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 md:grid-cols-[120px_1fr]"
              >
                <div className="text-5xl font-black tracking-[-0.08em] text-white/20">{num}</div>
                <div>
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-400">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="bg-zinc-950 px-5 py-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Portfólio</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">Vybrané projekty</h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-white">
            Chcem podobný výstup <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-700 via-zinc-900 to-black">
                <div className="absolute inset-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03]" />
                <motion.div
                  className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.2),transparent)]"
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "120%" }}
                  transition={{ duration: 0.85 }}
                />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-zinc-300 backdrop-blur">
                  {project.type}
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black tracking-tight">{project.title}</h3>
                <p className="mt-4 leading-7 text-zinc-400">{project.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCue() {
  return (
    <section className="bg-black px-5 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Pre koho</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">Pre klientov, developerov, showroomy a značky.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Ak potrebuješ iba pekný obrázok, dá sa. Ak potrebuješ, aby priestor predával, vysvetľoval a znižoval neistotu, tam začína byť vec zaujímavá.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Návrh interiéru s jasným procesom",
              "Vizualizácie pre rozhodovanie a predaj",
              "Interaktívne prehliadky cez link",
              "Video výstupy pre web a sociálne siete",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-white text-black">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-zinc-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white px-5 py-28 text-black md:px-8">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-zinc-500">Kontakt</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">Pošli pôdorys. Urobíme z chaosu smer.</h2>
            <p className="mt-7 text-lg leading-8 text-zinc-600">
              Najlepšie dopyty obsahujú pôdorys, fotky priestoru, lokalitu, rozpočet a stručný cieľ. Čím menej hádania, tým menej utrpenia pre všetkých zúčastnených.
            </p>
          </div>

          <form className="rounded-[2rem] border border-black/10 bg-black p-6 text-white shadow-2xl md:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm text-zinc-400">Meno</span>
                <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-white/40" placeholder="Jakub" />
              </label>
              <label className="block">
                <span className="text-sm text-zinc-400">Email</span>
                <input type="email" className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-white/40" placeholder="mail@projekt.sk" />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-sm text-zinc-400">Typ projektu</span>
              <select className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-white/40">
                <option>Interiérový dizajn</option>
                <option>Vizualizácie</option>
                <option>Interaktívna prehliadka</option>
                <option>Developerská prezentácia</option>
              </select>
            </label>

            <label className="mt-4 block">
              <span className="text-sm text-zinc-400">Správa</span>
              <textarea className="mt-2 min-h-36 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-white/40" placeholder="Popíš projekt, rozsah, termín a čo má výsledok vyriešiť." />
            </label>

            <button className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-zinc-200">
              Odoslať dopyt <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-zinc-500">
              Toto je prototyp formulára. Na produkcii ho napoj na Formspree, Resend, Supabase alebo vlastný API endpoint.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black px-5 py-12 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="Ilumi Interior logo" className="h-20 w-20 object-contain" />
          <div>
            <div className="text-sm font-black tracking-[0.32em]">ILUMI INTERIOR</div>
            <div className="mt-1 text-xs text-zinc-500">Interior design / Unreal Engine / Visualization</div>
          </div>
        </div>
        <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Ilumi Interior. Vizuálny poriadok namiesto drahého hádania.</div>
      </div>
    </footer>
  );
}

export default function IlumiInteriorPrototype() {
  return (
    <main className="min-h-screen bg-black font-sans text-white selection:bg-white selection:text-black">
      <Noise />
      <Header />
      <Hero />
      <ProblemSection />
      <Services />
      <Process />
      <Portfolio />
      <PricingCue />
      <Contact />
      <Footer />
    </main>
  );
}
