import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Quiz } from "@/components/site/Quiz";
import { GalleryViewer } from "@/components/site/GalleryViewer";
import { Circled, EASE, Magnetic, Photo, RevealLines } from "@/components/site/motion";
import { ADIMLAR, DERSLER, EGITMENLER, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, INSTAGRAM, SSS, YORUMLAR, waLink } from "@/components/site/data";
import boxingHeroVideo from "@/assets/gorillab/boxing-hero.mp4";
import boxingHeroImage from "@/assets/gorillab/boxing-hero.jpg";
import coachingImage from "@/assets/gorillab/coaching.jpg.asset.json";
import dumbbellsImage from "@/assets/gorillab/dumbbells.jpg.asset.json";
import gymImage from "@/assets/gorillab/gym.jpg.asset.json";
import lobbyImage from "@/assets/gorillab/lobby.jpg.asset.json";
import pilates1Image from "@/assets/gorillab/pilates-1.jpg.asset.json";
import pilates2Image from "@/assets/gorillab/pilates-2.jpg.asset.json";
import pilates3Image from "@/assets/gorillab/pilates-3.jpg.asset.json";
import pullupImage from "@/assets/gorillab/pullup.jpg.asset.json";
import reformerImage from "@/assets/gorillab/reformer.jpg.asset.json";
import ringImage from "@/assets/gorillab/ring.jpg.asset.json";
import strengthImage from "@/assets/gorillab/strength.jpg.asset.json";
import trainingVideo from "@/assets/gorillab/training.mp4.asset.json";
import treadmillsImage from "@/assets/gorillab/treadmills.jpg.asset.json";
import yigitImage from "@/assets/gorillab/yigit-bilir.jpg.asset.json";
import anilImage from "@/assets/gorillab/anil-bilir.jpg.asset.json";
import nazlicanImage from "@/assets/gorillab/nazlican-beltan.jpg.asset.json";
import iremnurImage from "@/assets/gorillab/iremnur-sensoy.jpg.asset.json";

const TITLE = "Gorillab Studio | Maltepe Birebir Boks, Kickboks, Muay Thai ve Reformer Pilates";
const DESC = "Maltepe'de birebir boks, kickboks, Muay Thai ve reformer pilates. Aylık üyelik yok, ilk ders ücretsiz. Eğitmenin seni tanıyor.";
const LESSON_IMAGES = [boxingHeroImage, coachingImage.url, strengthImage.url, reformerImage.url] as const;
const TRAINER_IMAGES = [yigitImage.url, anilImage.url, nazlicanImage.url, iremnurImage.url] as const;
const GALLERY_IMAGES = [
  ringImage.url,
  gymImage.url,
  dumbbellsImage.url,
  treadmillsImage.url,
  pilates1Image.url,
  pilates2Image.url,
  lobbyImage.url,
  pilates3Image.url,
  strengthImage.url,
  boxingHeroImage,
  pullupImage.url,
  coachingImage.url,
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ExerciseGym", "SportsActivityLocation"],
  name: "Gorillab Studio",
  telephone: "+905493400053",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bağlarbaşı, Ateş Çk. Sk. No: 1-5/2",
    postalCode: "34854",
    addressLocality: "Maltepe",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 40.92008, longitude: 29.13623 },
  openingHours: "Mo-Su 07:00-22:30",
  sameAs: [INSTAGRAM],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Dersler />
        <NasilCalisir />
        <UyelikYok />
        <Egitmenler />
        <Yorumlar />
        <Galeri />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp'tan yaz"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl md:hidden">
        <WaIcon />
      </a>
    </div>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="grain relative flex min-h-svh flex-col justify-end overflow-hidden pb-10 pt-28 md:pb-16">
      <div className="absolute inset-0 -z-10">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={boxingHeroImage} aria-label="Gorillab Studio'da birebir boks dersi">
          <source src={boxingHeroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/55" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-primary">Maltepe · Birebir Ders Stüdyosu</p>
          <RevealLines as="h1" className="display hero-size !leading-[1.12]" lines={["Burada numara", "değil,", <Circled key="c">isimsin.</Circled>]} />
          <p className="mt-6 max-w-xl text-lg text-foreground/85">
            Boks, kickboks, Muay Thai ve reformer pilates. Her ders sadece seninle, her eğitmen seni tanıyor.
          </p>
          <a href="#dersler" className="mt-6 inline-block text-sm font-medium underline underline-offset-4 hover:text-primary">Stüdyoyu gör ↓</a>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }}>
          <Quiz />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const text = "BOKS ✦ KICKBOKS ✦ MUAY THAI ✦ REFORMER PİLATES ✦ BİREBİR ✦ ";
  return (
    <div className="overflow-hidden bg-primary py-4 text-ink" aria-label="Branşlar: boks, kickboks, Muay Thai, reformer pilates, birebir">
      <div className="animate-marquee flex w-max whitespace-nowrap" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="display px-2 text-4xl md:text-6xl">{text}</span>
        ))}
      </div>
    </div>
  );
}

function Dersler() {
  return (
    <section id="dersler" className="grain scroll-mt-16 py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <RevealLines className="display mb-12 text-6xl md:text-8xl" lines={["Dersler"]} />
        <div className="grid gap-5 sm:grid-cols-2">
          {DERSLER.map((d, index) => (
            <article key={d.t} className="group bg-surface">
              <div className="overflow-hidden">
                <div className="transition-transform duration-700 ease-out group-hover:scale-105">
                  <Photo label={d.img} src={LESSON_IMAGES[index] ?? boxingHeroImage} className="aspect-[4/3]" />
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="display text-4xl md:text-5xl">{d.t}</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">{d.d}</p>
                </div>
                <span className="display -translate-x-4 text-4xl text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NasilCalisir() {
  return (
    <section id="nasil-calisir" className="scroll-mt-16 bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealLines className="display mb-14 text-6xl md:text-8xl" lines={["Nasıl çalışır"]} />
        <ol className="grid gap-12 md:grid-cols-3">
          {ADIMLAR.map((a) => (
            <li key={a.n} className="border-t-2 border-ink pt-6">
              <span className="display block text-[7rem] leading-none text-primary md:text-[9rem]">{a.n}</span>
              <h3 className="display mt-4 text-3xl">{a.t}</h3>
              <p className="mt-3 text-ink/75">{a.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function UyelikYok() {
  return (
    <section className="grain py-28 text-center md:py-40">
      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <RevealLines className="display text-6xl md:text-9xl" lines={[<>Aylık üyelik <Circled key="y">yok.</Circled></>, "Taahhüt yok."]} />
        <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
          Kartından her ay para çekilip ayakkabın kutuda kalmaz. Ders paketi alırsın, kullandığın kadar ödersin.
        </p>
        <Magnetic>
          <a href={waLink("Merhaba, ders paketlerinizi öğrenmek istiyorum.")} target="_blank" rel="noopener"
            className="mt-10 inline-block rounded-full bg-primary px-8 py-4 font-bold uppercase tracking-wide text-primary-foreground">
            Paketleri sor
          </a>
        </Magnetic>
      </div>
    </section>
  );
}

function Egitmenler() {
  return (
    <section id="egitmenler" className="grain scroll-mt-16 border-t py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <RevealLines className="display mb-12 text-6xl md:text-8xl md:text-center" lines={["Eğitmenler"]} />
      </div>
      <div className="scrollbar-hidden relative z-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-auto md:max-w-7xl md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-8">
        {EGITMENLER.map((trainer, index) => (
          <article key={trainer.name} className="group w-[75vw] shrink-0 snap-start sm:w-[22rem] md:w-auto">
            <div className="grayscale transition-all duration-500 group-hover:grayscale-0">
              <Photo label={`${trainer.name}, Gorillab Studio eğitmeni`} src={TRAINER_IMAGES[index] ?? coachingImage.url} className="aspect-[3/4]" parallax={false} />
            </div>
            <h3 className="display mt-4 text-4xl lg:text-5xl">{trainer.name}</h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-widest text-primary">{trainer.mainDiscipline}</p>
            {trainer.disciplines ? <p className="mt-2 text-sm text-foreground/85">{trainer.disciplines}</p> : null}
            <p className="mt-2 text-muted-foreground">“{trainer.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Yorumlar() {
  const [i, setI] = useState(0);
  const n = YORUMLAR.length;
  const y = YORUMLAR[i] ?? YORUMLAR[0]!;
  return (
    <section className="bg-surface py-24 md:py-32" aria-label="Üyeler anlatıyor">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <RevealLines className="display mb-12 text-6xl md:text-8xl" lines={["Üyeler anlatıyor"]} />
        <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <p className="max-w-3xl text-2xl font-medium leading-snug md:text-3xl">“{y.text}”</p>
          <footer className="mt-6 text-sm text-muted-foreground">{y.name} · Google yorumu · {i + 1}/{n}</footer>
        </motion.blockquote>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Önceki yorum" className="flex h-12 w-12 items-center justify-center rounded-full border hover:border-primary hover:text-primary">←</button>
            <button onClick={() => setI((i + 1) % n)} aria-label="Sonraki yorum" className="flex h-12 w-12 items-center justify-center rounded-full border hover:border-primary hover:text-primary">→</button>
          </div>
          <a
            href="https://www.google.com/maps/search/Gorillab+Studio+Maltepe"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden className="text-primary">★★★★★</span>
            <span>
              <span className="font-semibold text-foreground">{GOOGLE_RATING}</span> · {GOOGLE_REVIEW_COUNT} Google yorumu
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Galeri() {
  return (
    <section className="grain py-24 md:py-32" aria-label="Galeri">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <RevealLines className="display text-6xl md:text-8xl" lines={["Stüdyo"]} />
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="font-medium underline underline-offset-4 hover:text-primary">@gorillabstudio</a>
        </div>
        <GalleryViewer images={GALLERY_IMAGES} />
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="sss" className="scroll-mt-16 bg-cream py-24 text-ink md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <RevealLines className="display mb-12 text-6xl md:text-8xl" lines={["Sık sorulanlar"]} />
        <ul>
          {SSS.map((s, k) => {
            const isOpen = open === k;
            return (
              <li key={s.q} className="border-b border-ink/20">
                <button onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold md:text-xl">
                  {s.q}
                  <span className={`text-3xl font-normal text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden>+</span>
                </button>
                <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                  <p className="pb-6 text-ink/75">{s.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="grain relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0 -z-0">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={coachingImage.url} aria-label="Gorillab Studio antrenmanı">
          <source src={trainingVideo.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <RevealLines className="display text-7xl md:text-[10rem]" lines={["İlk ders bizden."]} />
        <p className="mx-auto mt-6 max-w-lg text-lg text-foreground/85">Gel, ringi gör, eğitmeninle tanış. Sonrasına sen karar ver.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <a href="#deneme" className="inline-block rounded-full bg-primary px-8 py-4 font-bold uppercase tracking-wide text-primary-foreground">Deneme dersi ayarla</a>
          </Magnetic>
          <a href={waLink()} target="_blank" rel="noopener" className="inline-block rounded-full border border-foreground/40 px-8 py-4 font-bold uppercase tracking-wide hover:border-primary hover:text-primary">WhatsApp'tan yaz</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer id="iletisim" className="scroll-mt-16 border-t py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
        <div>
          <p className="display text-7xl md:text-9xl">Gorillab</p>
          <dl className="mt-8 space-y-5 text-foreground/85">
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Adres</dt><dd className="mt-1">Bağlarbaşı, Ateş Çk. Sk. No: 1-5/2, 34854 Maltepe/İstanbul</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</dt><dd className="mt-1"><a href="tel:+905493400053" className="hover:text-primary">+90 549 340 00 53</a></dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Saatler</dt><dd className="mt-1">Her gün 07:00 – 22:30</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</dt><dd className="mt-1"><a href={INSTAGRAM} target="_blank" rel="noopener" className="hover:text-primary">@gorillabstudio</a></dd></div>
          </dl>
        </div>
        <iframe
          title="Gorillab Studio harita konumu"
          src="https://www.google.com/maps?q=40.92008,29.13623&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`h-80 w-full border-0 md:h-full ${reduce ? "" : "grayscale"}`}
        />
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-wrap justify-between gap-4 px-5 text-sm text-muted-foreground md:px-8">
        <span>© 2026 Gorillab Studio</span>
        <span className="flex gap-6">
          <a href="/kvkk" className="hover:text-foreground">KVKK Aydınlatma Metni</a>
          <a href="/cerez-politikasi" className="hover:text-foreground">Çerez Politikası</a>
        </span>
      </div>
    </footer>
  );
}
