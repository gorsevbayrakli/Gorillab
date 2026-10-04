import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/kvkk")({
  head: () => ({
    meta: [
      { title: "KVKK Aydınlatma Metni | Gorillab Studio" },
      { name: "description", content: "Gorillab Studio kişisel verilerin korunması aydınlatma metni." },
      { property: "og:title", content: "KVKK Aydınlatma Metni | Gorillab Studio" },
      { property: "og:description", content: "Gorillab Studio kişisel verilerin korunması aydınlatma metni." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage title="KVKK Aydınlatma Metni" />,
});
