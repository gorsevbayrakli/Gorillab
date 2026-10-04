import { Link } from "@tanstack/react-router";

export function LegalPage({ title }: { title: string }) {
  return (
    <main className="grain min-h-screen px-5 py-24">
      <div className="relative z-10 mx-auto max-w-2xl">
        <Link to="/" className="display text-2xl">GORILLAB</Link>
        <h1 className="display mt-12 text-6xl">{title}</h1>
        <p className="mt-8 text-muted-foreground">[Metin hazırlanıyor. Bu sayfanın içeriği yakında eklenecek.]</p>
        <Link to="/" className="mt-10 inline-block text-primary underline underline-offset-4">← Ana sayfaya dön</Link>
      </div>
    </main>
  );
}
