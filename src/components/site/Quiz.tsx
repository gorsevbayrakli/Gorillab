import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { QUIZ, waLink } from "./data";
import { EASE } from "./motion";

const normalizePhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return d;
};
const schema = z.object({
  name: z.string().trim().min(2, "Adını yazar mısın?").max(80),
  phone: z.string().refine((v) => /^5\d{9}$/.test(normalizePhone(v)), "Geçerli bir cep numarası gir (5XX XXX XX XX)."),
  kvkk: z.literal(true, { errorMap: () => ({ message: "Devam etmek için onay gerekli." }) }),
});

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkk, setKvkk] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const pick = (key: string, v: string) => {
    setAnswers((a) => ({ ...a, [key]: v }));
    setStep((s) => s + 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse({ name, phone, kvkk });
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      return setErrors(errs);
    }
    setErrors({});
    setSending(true);
    const fullPhone = "+90" + normalizePhone(phone);
    const msg = `Merhaba Gorillab! Ben ${name.trim()}. Ücretsiz deneme dersi ayarlamak istiyorum.\n• Beni durduran: ${answers.blocker}\n• İlgilendiğim branş: ${answers.discipline}\n• Haftada: ${answers.days}\n• Telefon: ${fullPhone}`;
    const win = window.open(waLink(msg), "_blank");
    await supabase.from("trial_requests").insert({
      name: name.trim(), phone: fullPhone, blocker: answers.blocker, discipline: answers.discipline, days: answers.days,
    });
    if (!win) window.location.href = waLink(msg);
    setSending(false);
    setDone(true);
  };

  const total = 4;
  return (
    <div id="deneme" className="grain w-full max-w-md scroll-mt-24 bg-surface p-6 text-foreground shadow-2xl sm:p-8">
      <div className="relative z-10">
        {!done && (
          <div className="mb-6 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span>Adım {step + 1}/{total}</span>
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="hover:text-foreground">← Geri</button>
            )}
          </div>
        )}
        {!done && (
          <div className="mb-6 h-1 w-full bg-muted">
            <motion.div className="h-full bg-primary" animate={{ width: `${((step + 1) / total) * 100}%` }} transition={{ ease: EASE }} />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={done ? "done" : step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {done ? (
              <div className="py-6">
                <p className="display text-5xl">Tamamdır.</p>
                <p className="mt-3 text-lg text-muted-foreground">Eğitmenimiz seni arayacak.</p>
              </div>
            ) : step < 3 ? (
              <>
                <p className="display mb-5 text-3xl sm:text-4xl">{QUIZ[step].q}</p>
                <div className="flex flex-col gap-2">
                  {QUIZ[step].opts.map((o) => (
                    <button
                      key={o}
                      onClick={() => pick(QUIZ[step].key, o)}
                      className={`group flex items-center justify-between border px-4 py-3.5 text-left font-medium transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground ${answers[QUIZ[step].key] === o ? "border-primary" : "border-border"}`}
                    >
                      {o}
                      <span className="translate-x-[-6px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-3">
                <p className="display mb-2 text-3xl sm:text-4xl">Seni nasıl arayalım?</p>
                <label className="text-sm text-muted-foreground">
                  Ad
                  <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="given-name"
                    className="mt-1 w-full border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary" />
                  {errors.name && <span className="mt-1 block text-primary">{errors.name}</span>}
                </label>
                <label className="text-sm text-muted-foreground">
                  Telefon
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX"
                    className="mt-1 w-full border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary" />
                  {errors.phone && <span className="mt-1 block text-primary">{errors.phone}</span>}
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
                  <span>
                    <Link to="/kvkk" className="underline hover:text-foreground">KVKK Aydınlatma Metni</Link>'ni okudum, kişisel verilerimin deneme dersi için işlenmesini onaylıyorum.
                  </span>
                </label>
                {errors.kvkk && <span className="text-sm text-primary">{errors.kvkk}</span>}
                <button disabled={sending} className="mt-2 rounded-full bg-primary px-6 py-4 font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                  {sending ? "Gönderiliyor…" : "Deneme dersimi ayarla"}
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
