import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de utilização | DesentoX" },
      { name: "description", content: "Condições de encomenda da DesentoX: 750 MT por embalagem, entrega gratuita em Maputo e Matola." },
      { property: "og:title", content: "Termos de utilização | DesentoX" },
      { property: "og:description", content: "Condições de encomenda da DesentoX pelo WhatsApp." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold text-forest">Termos de utilização</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
        <li>Preço: 750 MT por embalagem.</li>
        <li>Entrega gratuita em Maputo e Matola, dentro da área de cobertura confirmada pela nossa equipa.</li>
        <li>As encomendas são feitas pelo WhatsApp e só ficam confirmadas após resposta da nossa equipa.</li>
        <li>Utilize o produto sempre de acordo com as instruções do rótulo.</li>
      </ul>
      <Link to="/" className="mt-8 inline-block font-semibold text-primary">← Voltar à página inicial</Link>
    </main>
  ),
});
