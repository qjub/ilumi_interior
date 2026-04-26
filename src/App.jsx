import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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

const pricingPackages = [
  {
    name: "STANDARD",
    title: "Návrh interiéru s vizualizáciami",
    price: "40 € / m²",
    note: "s DPH • pri ploche do 120 m²",
    highlight: false,
    features: [
      "digitalizácia dodaných podkladov",
      "úvodné osobné alebo online stretnutie",
      "2D pôdorysné riešenie návrhu",
      "materiálový koncept a výber prvkov",
      "fotorealistické vizualizácie interiéru",
      "zoznam použitých prvkov a materiálov",
      "jedno kolo korekcií k vizualizáciám",
    ],
  },
  {
    name: "PREMIUM",
    title: "Návrh interiéru s dokumentáciou",
    price: "60 € / m²",
    note: "s DPH • pri ploche do 100 m²",
    highlight: true,
    features: [
      "všetko zo služby Standard",
      "detailná projektová dokumentácia návrhu",
      "výkresy stavebných úprav, podláh, dverí a svetiel",
      "podklady pre profesistov: voda, elektro, SDK, kladačské plány",
      "výkresy nábytku na mieru: pôdorysy, pohľady, rezy a detaily",
      "podklady pre klientské zmeny u developera",
    ],
  },
  {
    name: "TURBO",
    title: "Rýchly návrh v zrýchlenom režime",
    price: "na dopyt",
    note: "pre projekty, ktoré horia viac než rozpočet po prvej návšteve showroomu",
    highlight: false,
    features: [
      "zrýchlený harmonogram podľa kapacity",
      "prioritizácia najdôležitejších miestností",
      "rozsah a cena podľa konkrétneho zadania",
      "vhodné pri termínoch developera alebo rýchlej rekonštrukcii",
    ],
  },
];

const workflowSteps = [
  ["01", "Cenová ponuka", "Cena sa odvíja od m² riešenej plochy a špeciálneho rozsahu prác. Po odsúhlasení nasleduje záloha 60 %."],
  ["02", "Úvodné stretnutie", "Prejdeme predstavy o interiéri, štýl, funkciu priestoru a vstupné podklady. Ideálne sú aj referenčné obrázky."],
  ["03", "Úprava dispozície", "Pri rekonštrukcii najprv riešime funkčné rozloženie priestoru. Pekná vizualizácia zlej dispozície je len drahý make-up."],
  ["04", "Prvé vizualizácie", "Odovzdanie prvých vizualizácií, pôdorysu zariaďovacích prvkov a zoznamu použitých prvkov. Štandardne jeden variant, ktorý sa dolaďuje."],
  ["05", "Korekcie", "Spoločné prejdenie návrhu a pripomienok. V tomto kole sa môžu upraviť koncept, nábytky, farby a materiály. Nasleduje úhrada 20 %."],
  ["06", "Výkresy a odovzdanie", "Po schválení vizuálu sa pripraví výkresová dokumentácia. Pri odovzdaní projektu nasleduje doplatok 20 %."],
];

const timelineSteps = [
  { label: "Cenová ponuka", meta: "záloha 60 %", active: true },
  { label: "Úvodné stretnutie", meta: "zadanie + štýl", active: true },
  { label: "Úprava dispozície", meta: "funkcia priestoru", active: false },
  { label: "Prvé vizualizácie", meta: "4 - 6 týždňov", active: true },
  { label: "Kolo korekcií", meta: "úhrada 20 %", active: true },
  { label: "Vypracovanie výkresov", meta: "4 - 6 týždňov", active: true },
  { label: "Odovzdanie projektu", meta: "doplatok 20 %", active: true },
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

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      if (!(target instanceof Element)) return;

      setIsHovering(
        Boolean(
          target.closest("a") ||
            target.closest("button") ||
            target.closest("input") ||
            target.closest("textarea") ||
            target.closest("select") ||
            target.closest("[data-cursor='hover']")
        )
      );
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setPosition({ x: -100, y: -100 });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-white mix-blend-difference md:block"
      animate={{
        x: position.x - (isHovering ? 18 : 7),
        y: position.y - (isHovering ? 18 : 7),
        width: isPressed ? 28 : isHovering ? 36 : 14,
        height: isPressed ? 28 : isHovering ? 36 : 14,
        opacity: 1,
        boxShadow: isHovering
          ? "0 0 34px rgba(255,255,255,0.95)"
          : "0 0 16px rgba(255,255,255,0.55)",
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.45,
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
    ["Cenník", "#pricing"],
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
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-black text-white"
    >
      {/* FULLSCREEN VIDEO */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
       <video
  className="h-full w-full bg-black object-contain md:object-cover"
  src="/hero-video.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
/>

        {/* DARK OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-black/35 md:bg-black/25" />

        {/* BOTTOM GRADIENT */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black via-black/60 to-transparent md:h-96" />

        {/* LEFT GRADIENT FOR TEXT READABILITY */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/90 via-black/45 to-transparent md:from-black/85 md:via-black/35" />
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pt-24 md:items-end md:px-8 md:pb-32 lg:pb-40">
        <div className="max-w-5xl md:max-w-4xl lg:-translate-x-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm text-zinc-300 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-white" />
            Interiéry • vizualizácie • Unreal Engine prehliadky
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="text-4xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Interiér
            <br />
            nie je obrázok.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg md:text-xl md:leading-8"
          >
            Navrhujeme interiéry, vizualizácie a interaktívne prehliadky,
            <br className="hidden md:block" /> ktoré z priestoru spravia jasné
            rozhodnutie ešte pred realizáciou.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton>Chcem navrhnúť projekt</MagneticButton>

            <a
              href="#portfolio"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-black sm:justify-start"
            >
              Pozrieť portfólio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* TECHNICAL SIGNATURE */}
      <div className="pointer-events-none absolute bottom-10 right-8 z-10 hidden text-right text-[10px] uppercase tracking-[0.24em] text-white/45 md:block">
        <div>UE WALKTHROUGH / 01</div>
        <div className="mt-2">Real-time interior presentation</div>
        <div className="mt-2">Mobile • Tablet • Desktop</div>
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-zinc-400 transition hover:text-white md:bottom-8"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </a>
    </section>
  );
}

function ProblemSection() {
  const projects = [
    {
      title: "Byt Trenčín",
      category: "Návrh interiéru / vizualizácie",
      description:
        "Denná zóna s dôrazom na svetlo, materiály, úložný priestor a čistú nadčasovú atmosféru.",
      cover: "/showcase/visual-01.jpg",
      images: [
        "/projects/byt-trencin-01.jpg",
        "/projects/byt-trencin-02.jpg",
        "/projects/byt-trencin-03.jpg",
      ],
    },
    {
      title: "Kuchyňa a obývačka",
      category: "Interiérový dizajn",
      description:
        "Návrh otvoreného priestoru, kde kuchyňa, jedálenská časť a obývačka fungujú ako jeden celok.",
      cover: "/showcase/visual-02.jpg",
      images: [
        "/projects/kuchyna-01.jpg",
        "/projects/kuchyna-02.jpg",
        "/projects/kuchyna-03.jpg",
      ],
    },
    {
      title: "Prémiový apartmán",
      category: "Vizualizácie / prezentácia",
      description:
        "Vizuálna prezentácia interiéru pre klienta, ktorý potrebuje pochopiť atmosféru ešte pred realizáciou.",
      cover: "/showcase/visual-03.jpg",
      images: [
        "/projects/apartman-01.jpg",
        "/projects/apartman-02.jpg",
        "/projects/apartman-03.jpg",
      ],
    },
    {
      title: "Minimalistická denná zóna",
      category: "Návrh interiéru",
      description:
        "Jednoduchý, funkčný a materiálovo čistý návrh bez zbytočného vizuálneho bordelu.",
      cover: "/showcase/visual-04.jpg",
      images: [
        "/projects/denna-zona-01.jpg",
        "/projects/denna-zona-02.jpg",
        "/projects/denna-zona-03.jpg",
      ],
    },
  ];

  const [activeVisual, setActiveVisual] = useState(0);
  const [openedProject, setOpenedProject] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVisual((prev) => (prev + 1) % projects.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [projects.length]);

  function nextVisual() {
    setActiveVisual((prev) => (prev + 1) % projects.length);
  }

  function prevVisual() {
    setActiveVisual((prev) => (prev - 1 + projects.length) % projects.length);
  }

  function openProject(project) {
    setOpenedProject(project);
    setActiveGalleryImage(0);
  }

  function closeProject() {
    setOpenedProject(null);
    setActiveGalleryImage(0);
  }

  const mediaBlocks = [
    {
      kicker: "01 / Vizualizácie",
      title: "Vidieť",
      text: "Statické vizualizácie ukážu atmosféru, materiály, svetlo a proporcie priestoru ešte pred realizáciou.",
      type: "slideshow",
    },
    {
      kicker: "02 / Proces návrhu",
      title: "Pochopiť",
      text: "Výkresy, pôdorysy, vizualizácie a logika návrhu ukážu, prečo priestor funguje.",
      type: "video",
      layout: "verticalRight",
      src: "/showcase/understand-video.mp4",
    },
    {
      kicker: "03 / Interaktívna prehliadka",
      title: "Zažiť",
      text: "Klient si vie priestor prejsť cez mobil, tablet alebo počítač a pochopiť ho ako reálny zážitok.",
      type: "video",
      src: "/showcase/experience-video.mp4",
    },
  ];

  return (
    <section className="bg-black pt-24 text-white">
      {/* INTRO TEXT */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">
              Problém
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Pekný obrázok
              <br />
              nestačí.
            </h2>
          </div>

          <p className="max-w-3xl text-xl leading-9 text-zinc-300">
            Klient nepotrebuje iba pekný render. Potrebuje vidieť výsledok,
            pochopiť návrh a zažiť priestor ešte pred realizáciou.
          </p>
        </div>
      </div>

      {/* FULL WIDTH MEDIA SECTIONS */}
      <div className="mt-20">
        {mediaBlocks.map((block, index) => (
          <motion.article
            key={block.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: index * 0.08 }}
            className="group relative overflow-hidden border-t border-white/10 bg-zinc-950 last:border-b"
          >
            <div className="relative min-h-[80vh] overflow-hidden md:min-h-screen">
              {/* MEDIA */}
              {block.type === "slideshow" ? (
                <>
                  {projects.map((project, visualIndex) => (
                    <button
                      type="button"
                      key={project.cover}
                      onClick={() => openProject(project)}
                      className={`absolute inset-0 z-0 h-full w-full transition-opacity duration-1000 ${
                        visualIndex === activeVisual
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                      aria-label={`Otvoriť projekt ${project.title}`}
                    >
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </button>
                  ))}

                  {/* MINIMAL FULL-HEIGHT ARROWS */}
                  <button
                    type="button"
                    onClick={prevVisual}
                    className="absolute left-0 top-0 z-30 flex h-full w-24 items-center justify-start bg-gradient-to-r from-black/35 to-transparent pl-5 text-5xl font-light text-white/40 transition hover:text-white md:w-36 md:pl-10"
                    aria-label="Predchádzajúca vizualizácia"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={nextVisual}
                    className="absolute right-0 top-0 z-30 flex h-full w-24 items-center justify-end bg-gradient-to-l from-black/35 to-transparent pr-5 text-5xl font-light text-white/40 transition hover:text-white md:w-36 md:pr-10"
                    aria-label="Ďalšia vizualizácia"
                  >
                    ›
                  </button>

                  {/* MANUAL DOTS */}
                  <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:bottom-10">
                    {projects.map((_, visualIndex) => (
                      <button
                        type="button"
                        key={visualIndex}
                        onClick={() => setActiveVisual(visualIndex)}
                        className={`h-2 rounded-full transition-all ${
                          visualIndex === activeVisual
                            ? "w-10 bg-white"
                            : "w-2 bg-white/35 hover:bg-white/70"
                        }`}
                        aria-label={`Zobraziť vizualizáciu ${
                          visualIndex + 1
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openProject(projects[activeVisual])}
                    className="absolute right-5 top-5 z-30 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 backdrop-blur transition hover:bg-white hover:text-black md:right-10 md:top-10"
                  >
                    Klikni pre galériu
                  </button>
                </>
              ) : block.layout === "verticalRight" ? (
                <>
                  {/* BLURRED BACKGROUND VIDEO */}
                  <video
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
                    src={block.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* DARK BASE OVERLAY */}
                  <div className="pointer-events-none absolute inset-0 bg-black/55" />

                  {/* LEFT TEXT */}
                  <div className="absolute left-5 top-1/2 z-20 max-w-xl -translate-y-1/2 px-1 md:left-16 lg:left-24">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/45">
                      {block.kicker}
                    </p>

                    <h3 className="mt-5 text-5xl font-black tracking-[-0.055em] md:text-7xl lg:text-8xl">
                      {block.title}
                    </h3>

                    <p className="mt-6 max-w-lg text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
                      {block.text}
                    </p>
                  </div>

                  {/* RIGHT VERTICAL VIDEO */}
                  {/* RIGHT VERTICAL VIDEO */}
<video
  className="absolute bottom-0 right-0 top-0 z-20 h-full w-[36vw] object-cover shadow-2xl shadow-black"
  src={block.src}
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
/>
                </>
              ) : (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={block.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              )}

              {/* GENERAL OVERLAYS - not for verticalRight, because it has its own composition */}
              {block.layout !== "verticalRight" && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-black/20" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/45 to-transparent" />
                </>
              )}

              {/* KICKER - hidden for verticalRight because it has its own kicker */}
              {block.layout !== "verticalRight" && (
                <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 backdrop-blur md:left-10 md:top-10">
                  {block.kicker}
                </div>
              )}

              {/* CENTER BOTTOM TEXT - hidden for verticalRight because it has its own left text */}
              {block.layout !== "verticalRight" && (
                <div className="pointer-events-none absolute bottom-20 left-1/2 z-20 w-full max-w-3xl -translate-x-1/2 px-6 text-center md:bottom-28">
                  <h3 className="text-5xl font-black tracking-[-0.055em] md:text-7xl lg:text-8xl">
                    {block.title}
                  </h3>

                  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
                    {block.text}
                  </p>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* PROJECT MODAL */}
      {openedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 px-5 py-5 text-white backdrop-blur-xl md:px-8 md:py-8"
        >
          <div className="mx-auto grid h-full max-w-7xl gap-6 md:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT INFO */}
            <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
                  {openedProject.category}
                </p>

                <h3 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  {openedProject.title}
                </h3>

                <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
                  {openedProject.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {openedProject.images.map((img, imageIndex) => (
                  <button
                    type="button"
                    key={img}
                    onClick={() => setActiveGalleryImage(imageIndex)}
                    className={`h-16 w-24 overflow-hidden rounded-xl border transition ${
                      imageIndex === activeGalleryImage
                        ? "border-white"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/45 text-2xl text-white backdrop-blur transition hover:bg-white hover:text-black"
                aria-label="Zavrieť galériu"
              >
                ×
              </button>

              <img
                src={openedProject.images[activeGalleryImage]}
                alt={openedProject.title}
                className="h-full min-h-[60vh] w-full object-cover md:min-h-full"
              />

              <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs text-white/70 backdrop-blur">
                {activeGalleryImage + 1} / {openedProject.images.length}
              </div>
            </div>
          </div>
        </motion.div>
      )}
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

function WorkflowTimeline() {
  return (
    <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-zinc-500">časová os projektu</p>
          <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] md:text-4xl">Od cenovej ponuky po odovzdanie.</h3>
        </div>
        <p className="max-w-xl text-sm leading-6 text-zinc-500 md:text-right">
          Termíny závisia od vyťaženosti, rozsahu a náročnosti projektu. Záloha rezervuje miesto v harmonograme.
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="relative grid grid-cols-7 gap-3">
          <div className="absolute left-[7%] right-[7%] top-[46px] h-px bg-white/15" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute left-[7%] right-[7%] top-[46px] h-px origin-left bg-white/70"
          />

          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className={cn(
                  "relative z-10 grid h-[92px] w-[92px] place-items-center rounded-full border px-2 text-center text-[9px] font-black uppercase leading-[1.05] tracking-[0.08em] shadow-2xl",
                  step.active
                    ? "border-white bg-white text-black shadow-white/10"
                    : "border-white/15 bg-zinc-700 text-white shadow-black"
                )}
              >
                <span className="block max-w-[74px] text-center leading-[1.05]">{step.label}</span>
              </div>
              <div className="mt-5 min-h-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                {step.meta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:hidden">
        {timelineSteps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="grid grid-cols-[44px_1fr] gap-4 rounded-2xl border border-white/10 bg-black/35 p-4"
          >
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-xs font-black text-black">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="font-black uppercase tracking-[0.12em] text-white">{step.label}</div>
              <div className="mt-1 text-sm text-zinc-500">{step.meta}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PricingAndWorkflow() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-black px-5 py-28 text-white md:px-8">
      <div className="absolute left-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute right-[-14rem] bottom-10 h-[38rem] w-[38rem] rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-zinc-500">Služby a cenník</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Jasný rozsah. Jasná cena. Menej hádania.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl md:leading-9">
            Základ je jednoduchý: najprv sa nastaví rozsah, potom návrh, potom korekcie a výstup. Varianty riešime iba vtedy, keď majú dôvod. Nie preto, že rozhodovanie je novodobá forma sebapoškodzovania.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {pricingPackages.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "relative overflow-hidden rounded-[2rem] border p-7",
                item.highlight
                  ? "border-white/30 bg-white text-black shadow-2xl shadow-white/10"
                  : "border-white/10 bg-white/[0.035]"
              )}
            >
              {item.highlight && (
                <div className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white">
                  najžiadanejšie
                </div>
              )}

              <div className={cn("text-xs font-black uppercase tracking-[0.32em]", item.highlight ? "text-black/45" : "text-zinc-500")}>
                {item.name}
              </div>
              <h3 className="mt-5 max-w-sm text-2xl font-black leading-tight tracking-[-0.03em] md:text-3xl">
                {item.title}
              </h3>
              <div className="mt-8 flex items-end gap-2">
                <div className="text-5xl font-black tracking-[-0.08em]">{item.price}</div>
              </div>
              <p className={cn("mt-3 min-h-12 text-sm leading-6", item.highlight ? "text-black/60" : "text-zinc-500")}>
                {item.note}
              </p>

              <div className={cn("mt-7 h-px", item.highlight ? "bg-black/10" : "bg-white/10")} />

              <ul className="mt-7 space-y-4">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6">
                    <span className={cn("mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full", item.highlight ? "bg-black text-white" : "bg-white text-black")}>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className={item.highlight ? "text-black/75" : "text-zinc-300"}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight">Väčšie plochy a špeciálny rozsah</h3>
              <p className="mt-3 leading-7 text-zinc-400">
                Pri väčších alebo technicky komplikovanejších projektoch sa cena nastavuje individuálne podľa reálneho rozsahu. Teda nie od oka, nie z krištáľovej gule, ale podľa práce.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["60 % záloha", "20 % po korekciách", "20 % pri odovzdaní"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm font-semibold text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <WorkflowTimeline />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map(([num, title, text]) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/10 bg-black/40 p-6"
            >
              <div className="text-xs font-black uppercase tracking-[0.32em] text-white/25">{num}</div>
              <h3 className="mt-4 text-xl font-black md:text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
            </motion.div>
          ))}
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
    <main className="min-h-screen bg-black font-sans text-white selection:bg-white selection:text-black md:cursor-none">
      <Noise />
      <CustomCursor />
      <Header />
      <Hero />
      <ProblemSection />
      <Services />
      <PricingAndWorkflow />
      <Portfolio />
      <PricingCue />
      <Contact />
      <Footer />
    </main>
  );
}
