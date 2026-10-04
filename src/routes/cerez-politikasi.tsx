import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => ({
    meta: [
      { title: "Çerez Politikası | Gorillab Studio" },
      { name: "description", content: "Gorillab Studio web sitesi çerez politikası." },
      { property: "og:title", content: "Çerez Politikası | Gorillab Studio" },
      { property: "og:description", content: "Gorillab Studio web sitesi çerez politikası." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage title="Çerez Politikası" />,
});
