import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { notifyTrialRequest } from "@/lib/trial-notify.functions";
import { QUIZ } from "./data";
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
  const [answers, setAnswers] = useState<{ blocker?: string; discipline?: string; days?: string }>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkk, setKvkk] = useState(false);
  const [consentAt, setConsentAt] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; kvkk?: string }>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const pick = (key: "blocker" | "discipline" | "days", v: string) => {
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
    setSubmitError(false);
    setSending(true);
    const fullPhone = "+90" + normalizePhone(phone);
    const { error } = await supabase.from("trial_requests").insert({
      name: name.trim(), phone: fullPhone, blocker: answers.blocker ?? "", discipline: answers.discipline ?? "", days: answers.days ?? "",
      kvkk_consent_at: consentAt ?? new Date().toISOString(),
    });
    setSending(false);
    if (error) {
      console.error("trial_requests insert failed:", error);
      setSubmitError(true);
      return;
    }
    setDone(true);
    // E-posta bildirimi arka planda gider; sonucu form akışını etkilemez.
    notifyTrialRequest({
      data: { name: name.trim(), phone: fullPhone, blocker: answers.blocker ?? "", discipline: answers.discipline ?? "", days: answers.days ?? "" },
    }).catch((err) => console.error("trial notification call failed:", err));
  };

  const total = 4;
  const cur = QUIZ[Math.min(step, 2)]!;
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
                <p className="display mb-5 text-3xl sm:text-4xl">{cur.q}</p>
                <div className="flex flex-col gap-2">
                  {cur.opts.map((o) => (
                    <button
                      key={o}
                      onClick={() => pick(cur.key, o)}
                      className={`group flex items-center justify-between border px-4 py-3.5 text-left font-medium transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground ${answers[cur.key] === o ? "border-primary" : "border-border"}`}
                    >
                      {o}
                      <span aria-hidden className="translate-x-[-6px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
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
                  <input type="checkbox" checked={kvkk} onChange={(e) => { setKvkk(e.target.checked); setConsentAt(e.target.checked ? new Date().toISOString() : null); }} className="mt-1 h-4 w-4 accent-primary" />
                  <span>
                    <Link to="/kvkk" className="underline hover:text-foreground">KVKK Aydınlatma Metni</Link>'ni okudum, kişisel verilerimin deneme dersi için işlenmesini onaylıyorum.
                  </span>
                </label>
                {errors.kvkk && <span className="text-sm text-primary">{errors.kvkk}</span>}
                {submitError && <p role="alert" className="text-sm text-primary">Bir sorun oldu, lütfen tekrar dene.</p>}
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
