import { useState } from "react";
import { Check, Truck, Home, Building2, Sparkles, Info, Layers, MessageCircle, Menu, X, Minus, Plus, ShieldAlert } from "lucide-react";
import { STORE, formatMT } from "@/config/store";
import { GREETING, whatsappUrl, calcTotal } from "@/lib/order";
import { CtaLink, SectionTitle, WhatsAppIcon } from "./ui";
import logoWide from "@/assets/desentox-logo-wide.png.asset.json";
import logo from "@/assets/desentox-logo.png.asset.json";
import sinkSlow from "@/assets/sink-slow.jpg";
import pipeResidue from "@/assets/pipe-residue.jpg";
import drainOdor from "@/assets/drain-odor.jpg";
import homeSink from "@/assets/home-sink.jpg";
import bizKitchen from "@/assets/business-kitchen.jpg";

const nav = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "Perguntas frequentes" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#topo" aria-label="DesentoX — início"><img src={logoWide.url} alt="DesentoX" className="h-10 w-auto md:h-11" width={160} height={52} /></a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {nav.map((n) => <a key={n.href} href={n.href} className="text-sm font-semibold text-forest hover:text-primary">{n.label}</a>)}
          <CtaLink href="#encomendar" variant="primary" className="px-5 py-2.5">Encomendar agora</CtaLink>
        </nav>
        <button className="rounded-md p-2 text-forest md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t bg-background px-4 py-4 md:hidden" aria-label="Menu móvel">
          {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 font-semibold text-forest">{n.label}</a>)}
          <CtaLink href="#encomendar" variant="primary" className="mt-2 w-full" onClick={() => setOpen(false)}>Encomendar agora</CtaLink>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section id="topo" className="bg-dark-gradient relative overflow-hidden text-on-dark">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 inline-block rounded-full border border-lime/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-lime">{STORE.slogan}</p>
          <h1 className="font-display text-4xl font-extrabold uppercase leading-[1.05] md:text-6xl">Canos entupidos? <span className="text-lime">Recupere a tranquilidade.</span></h1>
          <p className="mt-5 text-lg text-on-dark-muted">Conheça a DesentoX, o desentupidor de canos em pó para ajudar a combater os problemas de escoamento, em casa ou no seu negócio.</p>
          <ul className="mt-6 space-y-2">
            {["Para o dia a dia da sua casa ou negócio.", "Instruções de utilização indicadas no rótulo.", "Encomenda simples pelo WhatsApp."].map((t) => (
              <li key={t} className="flex items-start gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-lime" />{t}</li>
            ))}
          </ul>
          <div className="mt-7 rounded-2xl border border-on-dark/15 bg-on-dark/5 p-5">
            <p className="font-display text-3xl font-extrabold"><span className="text-lime">750 MT</span> <span className="text-lg">por embalagem</span></p>
            <p className="mt-2 flex items-center gap-2 font-display font-bold uppercase"><Truck className="h-5 w-5 text-lime" />Entrega gratuita em Maputo e Matola</p>
            <p className="mt-1 text-sm text-on-dark-muted">Consulte a disponibilidade para confirmar a cobertura da sua localização.</p>
          </div>
          <CtaLink href="#encomendar" className="mt-6 w-full sm:w-auto">Quero a minha DesentoX</CtaLink>
          <p className="mt-3 text-xs text-on-dark-muted">Encomenda pelo WhatsApp, sem pagamento online nesta página.</p>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-10 rounded-full bg-lime/25 blur-3xl" />
          <img src={STORE.productImage} alt="Pote branco DesentoX com tampa e rótulo verde e preto" className="animate-floaty relative w-full max-w-md drop-shadow-2xl" width={600} height={400} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  const cards = [
    { img: sinkSlow, t: "Água a escoar lentamente", alt: "Pia com água acumulada" },
    { img: pipeResidue, t: "Resíduos nas canalizações", alt: "Ilustração de resíduos dentro de um cano" },
    { img: drainOdor, t: "Maus odores junto aos ralos", alt: "Ralo de duche num ambiente doméstico" },
  ];
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle sub="Quando a água demora a escoar ou surgem odores desagradáveis junto às canalizações, tarefas simples em casa ou no trabalho podem tornar-se incómodas.">Um cano entupido pode complicar todo o seu dia.</SectionTitle>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article key={c.t} className="overflow-hidden rounded-2xl bg-card shadow-card">
              <img src={c.img} alt={c.alt} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover" />
              <h3 className="p-5 font-display text-lg font-bold text-forest">{c.t}</h3>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center font-semibold text-forest">Conheça a DesentoX e descubra se é adequada ao problema que pretende resolver.</p>
      </div>
    </section>
  );
}

export function ProductSection() {
  return (
    <section className="bg-dark-gradient py-16 text-on-dark md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <img src={STORE.productImage} alt="Embalagem DesentoX em pote com rótulo oficial" loading="lazy" width={600} height={400} className="mx-auto w-full max-w-md drop-shadow-2xl" />
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase md:text-4xl">DesentoX. <span className="text-lime">Canos livres, sem complicações.</span></h2>
          <p className="mt-5 text-lg text-on-dark-muted">A DesentoX é um desentupidor de canos em pó, apresentado numa embalagem prática para utilização conforme as instruções do fabricante.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Embalagem em pote.", "Preço claro de 750 MT.", "Encomendas através do WhatsApp.", "Entrega gratuita em Maputo e Matola, dentro da área de cobertura."].map((t) => (
              <li key={t} className="flex gap-2 rounded-xl border border-on-dark/10 bg-on-dark/5 p-3 text-sm"><Check className="h-5 w-5 shrink-0 text-lime" />{t}</li>
            ))}
          </ul>
          <CtaLink href="#encomendar" className="mt-8">Encomendar por 750 MT</CtaLink>
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const blocks = [
    { icon: Home, img: homeSink, t: "Para a sua casa", d: "Para quem procura uma solução prática para lidar com problemas de escoamento na cozinha, no lavatório ou noutras áreas compatíveis com as indicações do produto.", alt: "Cozinha doméstica moderna com pia" },
    { icon: Building2, img: bizKitchen, t: "Para o seu negócio", d: "Para restaurantes, hotéis, lojas e outros estabelecimentos que precisam de cuidar das suas instalações e canalizações.", alt: "Cozinha comercial limpa" },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>Uma solução para o seu dia a dia.</SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.t} className="group relative overflow-hidden rounded-3xl shadow-card">
              <img src={b.img} alt={b.alt} loading="lazy" width={928} height={720} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-on-dark">
                <b.icon className="mb-2 h-8 w-8 text-lime" />
                <h3 className="font-display text-2xl font-extrabold">{b.t}</h3>
                <p className="mt-2 text-sm text-on-dark-muted">{b.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CtaLink href="#encomendar" variant="whatsapp"><WhatsAppIcon className="h-5 w-5" />Faça a sua encomenda pelo WhatsApp</CtaLink>
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  const items = [
    { icon: Sparkles, t: "Praticidade", d: "Um produto em pó com instruções de utilização definidas pelo fabricante." },
    { icon: Info, t: "Informação clara", d: "Saiba o preço e as condições de entrega antes de concluir a encomenda." },
    { icon: Layers, t: "Para diferentes necessidades", d: "Consulte as aplicações autorizadas no rótulo para verificar a adequação ao seu problema." },
    { icon: MessageCircle, t: "Encomenda directa", d: "Envie o seu pedido pelo WhatsApp e confirme os detalhes com a nossa equipa." },
  ];
  return (
    <section id="beneficios" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>Por que conhecer a DesentoX?</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <article key={it.t} className="rounded-2xl bg-card p-6 shadow-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"><it.icon className="h-6 w-6" /></div>
              <h3 className="font-display text-lg font-bold text-forest">{i + 1}. {it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    { t: "Escolha a quantidade", d: "Indique quantas embalagens pretende receber." },
    { t: "Preencha os seus dados", d: "Informe o seu nome, telefone, bairro e referência para a entrega." },
    { t: "Envie pelo WhatsApp", d: "Receberemos a sua mensagem quando a enviar na aplicação. A nossa equipa confirmará a disponibilidade e os detalhes da entrega." },
  ];
  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>Fazer a sua encomenda é simples.</SectionTitle>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="relative rounded-2xl border-2 border-border p-6">
              <span className="font-display text-5xl font-extrabold text-lime">0{i + 1}</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">Passo {i + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-forest">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 rounded-full bg-primary/10 px-5 py-3 text-center text-sm font-semibold text-primary"><Truck className="h-5 w-5 shrink-0" />Entrega gratuita em Maputo e Matola, dentro da área de cobertura confirmada.</p>
      </div>
    </section>
  );
}

export function PricingSection({ qty, setQty }: { qty: number; setQty: (n: number) => void }) {
  const clamp = (n: number) => Math.min(STORE.maxQty, Math.max(STORE.minQty, n));
  return (
    <section className="bg-dark-gradient py-16 text-on-dark md:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-2">
        <img src={STORE.productImage} alt="Pote DesentoX" loading="lazy" width={600} height={400} className="mx-auto w-full max-w-sm drop-shadow-2xl" />
        <div className="rounded-3xl border border-on-dark/15 bg-on-dark/5 p-7">
          <h2 className="font-display text-3xl font-extrabold uppercase">Encomende a sua DesentoX.</h2>
          <p className="mt-4 font-display text-6xl font-extrabold text-lime">750 MT</p>
          <p className="text-on-dark-muted">Por embalagem.</p>
          <p className="mt-3 flex items-center gap-2 font-semibold"><Truck className="h-5 w-5 text-lime" />Entrega gratuita em Maputo e Matola.</p>
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-ink/60 p-4">
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Diminuir quantidade" onClick={() => setQty(clamp(qty - 1))} className="rounded-full border border-on-dark/30 p-2 hover:bg-on-dark/10"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-display text-2xl font-bold" aria-live="polite">{qty}</span>
              <button type="button" aria-label="Aumentar quantidade" onClick={() => setQty(clamp(qty + 1))} className="rounded-full border border-on-dark/30 p-2 hover:bg-on-dark/10"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="text-right"><p className="text-xs text-on-dark-muted">Total dos produtos</p><p className="font-display text-2xl font-extrabold text-lime">{formatMT(calcTotal(qty))}</p></div>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-on-dark-muted">
            {[1, 2, 3, 4].map((n) => <li key={n}>{n} {n === 1 ? "embalagem" : "embalagens"}: <b className="text-on-dark">{formatMT(calcTotal(n))}</b></li>)}
          </ul>
          <p className="mt-3 text-xs text-on-dark-muted">Entrega gratuita nas zonas de cobertura confirmadas.</p>
          <CtaLink href="#encomendar" className="mt-6 w-full">Encomendar agora</CtaLink>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["Quanto custa a DesentoX?", "Cada embalagem custa 750 MT."],
  ["A entrega é gratuita?", "Sim. A entrega é gratuita em Maputo e Matola, dentro da área de cobertura confirmada pela nossa equipa."],
  ["Posso encomendar para outra localização?", "Pode enviar a sua localização pelo WhatsApp para confirmar se existe possibilidade de entrega."],
  ["Como faço a encomenda?", "Preencha o formulário, clique no botão de WhatsApp e envie a mensagem preparada para a nossa equipa."],
  ["Posso comprar várias embalagens?", "Sim. Escolha a quantidade pretendida no formulário. O total será calculado automaticamente ao preço de 750 MT por embalagem."],
  ["Quanto tempo demora a entrega?", "O prazo será confirmado pela nossa equipa de acordo com a localização e a disponibilidade."],
  ["A minha encomenda fica confirmada automaticamente?", "Não. O envio da mensagem pelo WhatsApp permite à nossa equipa receber o pedido e confirmar a disponibilidade e os detalhes da entrega."],
];

export function FAQ() {
  return (
    <section id="faq" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle>Perguntas frequentes</SectionTitle>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-card p-5 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-forest">
                {q}<Plus className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-dark-gradient py-16 text-center text-on-dark md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <img src={STORE.productImage} alt="Pote DesentoX" loading="lazy" width={600} height={400} className="mx-auto w-64 drop-shadow-2xl" />
        <h2 className="mt-6 font-display text-3xl font-extrabold uppercase md:text-5xl">Canos livres, <span className="text-lime">sem complicações.</span></h2>
        <p className="mt-4 text-lg text-on-dark-muted">Faça a sua encomenda e receba a confirmação dos detalhes pelo WhatsApp.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
          <span className="rounded-full bg-on-dark/10 px-4 py-2">750 MT por embalagem</span>
          <span className="rounded-full bg-on-dark/10 px-4 py-2">Entrega gratuita em Maputo e Matola, dentro da cobertura confirmada</span>
        </div>
        <CtaLink href="#encomendar" className="mt-8">Quero encomendar agora</CtaLink>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-12 text-on-dark-muted md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <img src={logo.url} alt="DesentoX" loading="lazy" width={120} height={120} className="h-24 w-24 rounded-2xl bg-on-dark p-1" />
          <p className="mt-3 font-display font-bold text-on-dark">{STORE.slogan}</p>
          <p className="mt-1 text-sm">750 MT por embalagem · Entrega gratuita em Maputo e Matola, dentro da área de cobertura.</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm" aria-label="Rodapé">
          <a href="#faq" className="hover:text-lime">Perguntas frequentes</a>
          <a href="/privacidade" className="hover:text-lime">Política de privacidade</a>
          <a href="/termos" className="hover:text-lime">Termos de utilização</a>
        </nav>
        <p className="flex gap-2 text-sm"><ShieldAlert className="h-5 w-5 shrink-0 text-lime" />Aviso de segurança: leia e siga sempre as instruções do rótulo. Mantenha fora do alcance das crianças e animais. Evite o contacto com a pele e os olhos.</p>
      </div>
      <p className="mt-10 text-center text-xs">© {new Date().getFullYear()} DesentoX. Todos os direitos reservados.</p>
    </footer>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <a href={whatsappUrl(GREETING)} target="_blank" rel="noopener noreferrer" aria-label="Falar connosco no WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink shadow-glow transition hover:scale-105 md:bottom-6">
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-on-dark/10 bg-ink px-4 py-3 text-on-dark md:hidden">
      <span className="font-display font-bold">DesentoX — <span className="text-lime">750 MT</span></span>
      <CtaLink href="#encomendar" className="px-5 py-2.5">Encomendar</CtaLink>
    </div>
  );
}
