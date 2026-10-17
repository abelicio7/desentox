import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header, Hero, ProblemSection, ProductSection, AudienceSection, BenefitsSection, HowToOrder, PricingSection, FAQ, FinalCTA, Footer, WhatsAppFloatingButton, MobileOrderBar } from "@/components/landing/Sections";
import { OrderForm } from "@/components/landing/OrderForm";

const title = "DesentoX | Desentupidor de Canos em Pó — 750 MT";
const description = "Conheça a DesentoX, desentupidor de canos em pó por 750 MT. Entrega gratuita em Maputo e Matola, dentro da área de cobertura. Encomende pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [qty, setQty] = useState(1);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <ProductSection />
        <AudienceSection />
        <BenefitsSection />
        <HowToOrder />
        <PricingSection qty={qty} setQty={setQty} />
        <OrderForm qty={qty} setQty={setQty} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <MobileOrderBar />
    </>
  );
}
