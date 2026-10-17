import { useState, type ReactNode } from "react";
import { AlertCircle, Truck } from "lucide-react";
import { STORE, formatMT } from "@/config/store";
import { buildOrderMessage, calcTotal, isFreeDeliveryArea, validateOrder, whatsappUrl, type OrderData, type OrderErrors } from "@/lib/order";
import { WhatsAppIcon, SectionTitle } from "./ui";

const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-forest">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function OrderForm({ qty, setQty }: { qty: number; setQty: (n: number) => void }) {
  const [d, setD] = useState({ name: "", phone: "", locality: "", neighborhood: "", address: "", notes: "" });
  const [errors, setErrors] = useState<OrderErrors>({});
  const [fatal, setFatal] = useState("");
  const [opened, setOpened] = useState(false);
  const set = (k: keyof typeof d) => (e: { target: { value: string } }) => setD({ ...d, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFatal("");
    const data: OrderData = { ...d, quantity: qty };
    const errs = validateOrder(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0] ?? "")?.focus();
      return;
    }
    try {
      const url = whatsappUrl(buildOrderMessage(data));
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (!w) window.location.href = url;
      setOpened(true);
    } catch {
      setFatal("Não foi possível abrir o WhatsApp. Tente novamente dentro de instantes.");
    }
  };

  const aria = (k: keyof OrderErrors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const free = isFreeDeliveryArea(d.locality);

  return (
    <section id="encomendar" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle sub="Preencha os dados abaixo para enviar o seu pedido pelo WhatsApp.">Faça a sua encomenda</SectionTitle>
        <form onSubmit={submit} noValidate className="grid gap-8 rounded-3xl bg-card p-6 shadow-card md:grid-cols-5 md:p-10">
          <div className="space-y-4 md:col-span-3">
            <Field id="name" label="Nome completo *" error={errors.name}><input id="name" autoComplete="name" className={input} value={d.name} onChange={set("name")} {...aria("name")} /></Field>
            <Field id="phone" label="Número de telefone com WhatsApp *" error={errors.phone}><input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="84 123 4567" className={input} value={d.phone} onChange={set("phone")} {...aria("phone")} /></Field>
            <Field id="locality" label="Localidade *" error={errors.locality}>
              <select id="locality" className={input} value={d.locality} onChange={set("locality")} {...aria("locality")}>
                <option value="">Seleccione…</option>
                {[...STORE.freeDeliveryAreas, STORE.otherLocation].map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            {d.locality && (free ? (
              <p className="flex gap-2 rounded-xl bg-primary/10 p-3 text-sm text-primary"><Truck className="h-5 w-5 shrink-0" />Entrega gratuita, sujeita à confirmação da cobertura.</p>
            ) : (
              <p className="flex gap-2 rounded-xl bg-secondary p-3 text-sm text-forest"><AlertCircle className="h-5 w-5 shrink-0" />A entrega gratuita está disponível em Maputo e Matola, dentro da área de cobertura. Contacte-nos para confirmar a possibilidade de entrega noutra localização.</p>
            ))}
            <Field id="neighborhood" label="Bairro *" error={errors.neighborhood}><input id="neighborhood" className={input} value={d.neighborhood} onChange={set("neighborhood")} {...aria("neighborhood")} /></Field>
            <Field id="address" label="Endereço ou referência para a entrega *" error={errors.address}><input id="address" autoComplete="street-address" className={input} value={d.address} onChange={set("address")} {...aria("address")} /></Field>
            <Field id="quantity" label="Quantidade de embalagens *" error={errors.quantity}>
              <input id="quantity" type="number" min={STORE.minQty} max={STORE.maxQty} className={input} value={qty}
                onChange={(e) => setQty(Number.parseInt(e.target.value, 10) || 0)} {...aria("quantity")} />
            </Field>
            <Field id="notes" label="Observações (opcional)"><textarea id="notes" rows={3} className={input} value={d.notes} onChange={set("notes")} /></Field>
          </div>
          <aside className="md:col-span-2">
            <div className="sticky top-24 rounded-2xl bg-dark-gradient p-6 text-on-dark">
              <h3 className="font-display text-lg font-extrabold uppercase">Resumo do pedido</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div><dt className="text-on-dark-muted">Produto</dt><dd className="font-semibold">{STORE.product}</dd></div>
                <div className="flex justify-between"><dt className="text-on-dark-muted">Preço unitário</dt><dd>{formatMT(STORE.unitPrice)}</dd></div>
                <div className="flex justify-between"><dt className="text-on-dark-muted">Quantidade</dt><dd>{qty}</dd></div>
                <div className="flex justify-between"><dt className="text-on-dark-muted">Entrega</dt><dd className="text-right">Gratuita nas zonas de cobertura confirmadas</dd></div>
                <div className="flex justify-between border-t border-on-dark/15 pt-3"><dt className="font-bold">Total dos produtos</dt><dd className="font-display text-2xl font-extrabold text-lime">{formatMT(calcTotal(Math.max(0, qty)))}</dd></div>
              </dl>
              <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-4 font-display text-sm font-extrabold uppercase text-ink transition hover:brightness-110">
                <WhatsAppIcon className="h-5 w-5" />Enviar encomenda pelo WhatsApp
              </button>
              <p className="mt-3 text-xs text-on-dark-muted">Ao clicar, o WhatsApp será aberto com a mensagem preparada. Envie a mensagem para que possamos receber o seu pedido.</p>
              {fatal && <p role="alert" className="mt-3 rounded-lg bg-destructive/20 p-3 text-sm">{fatal}</p>}
              {opened && !fatal && <p role="status" className="mt-3 rounded-lg bg-on-dark/10 p-3 text-sm">O WhatsApp foi aberto. Não se esqueça de <b>enviar a mensagem</b> para que a nossa equipa receba o seu pedido.</p>}
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}
