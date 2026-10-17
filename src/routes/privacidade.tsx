import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade | DesentoX" },
      { name: "description", content: "Como a DesentoX trata os dados enviados nas encomendas pelo WhatsApp." },
      { property: "og:title", content: "Política de privacidade | DesentoX" },
      { property: "og:description", content: "Como a DesentoX trata os dados enviados nas encomendas pelo WhatsApp." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold text-forest">Política de privacidade</h1>
      <p className="mt-6 text-muted-foreground">Esta página não guarda os dados que introduz no formulário de encomenda. Os dados são usados apenas para preparar uma mensagem que é aberta no WhatsApp; só nos chegam se decidir enviá-la. Usamos essas informações exclusivamente para confirmar e entregar a sua encomenda.</p>
      <Link to="/" className="mt-8 inline-block font-semibold text-primary">← Voltar à página inicial</Link>
    </main>
  ),
});
