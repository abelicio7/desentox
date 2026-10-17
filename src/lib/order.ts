import { STORE } from "@/config/store";

export type OrderData = {
  name: string;
  phone: string;
  locality: string;
  neighborhood: string;
  address: string;
  quantity: number;
  notes: string;
};

export const calcTotal = (qty: number) => qty * STORE.unitPrice;

export const isFreeDeliveryArea = (locality: string) =>
  (STORE.freeDeliveryAreas as readonly string[]).includes(locality);

export function validateOrder(d: OrderData): Record<string, string> {
  const e: Record<string, string> = {};
  if (d.name.trim().length < 3) e.name = "Indique o seu nome completo.";
  const digits = d.phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) e.phone = "Indique um número de telefone válido.";
  if (!d.locality) e.locality = "Seleccione a localidade.";
  if (!d.neighborhood.trim()) e.neighborhood = "Indique o bairro.";
  if (!d.address.trim()) e.address = "Indique o endereço ou uma referência.";
  if (!Number.isInteger(d.quantity) || d.quantity < STORE.minQty || d.quantity > STORE.maxQty)
    e.quantity = `A quantidade deve estar entre ${STORE.minQty} e ${STORE.maxQty}.`;
  return e;
}

export function buildOrderMessage(d: OrderData): string {
  const free = isFreeDeliveryArea(d.locality);
  const delivery = free
    ? "Gratuita, sujeita à confirmação da cobertura"
    : "Localidade fora das zonas de entrega gratuita anunciadas. Solicito confirmação da disponibilidade de entrega.";
  return `Olá, DesentoX! Gostaria de fazer uma encomenda.

DADOS DO CLIENTE
Nome: ${d.name.trim()}
Telefone: ${d.phone.trim()}
Localidade: ${d.locality}
Bairro: ${d.neighborhood.trim()}
Endereço/referência: ${d.address.trim()}

DETALHES DO PEDIDO
Produto: ${STORE.product}
Preço por embalagem: ${STORE.unitPrice} MT
Quantidade: ${d.quantity}
Total dos produtos: ${calcTotal(d.quantity)} MT
Entrega: ${delivery}

Observações: ${d.notes.trim() || "Sem observações"}

Gostaria de confirmar a disponibilidade e os detalhes da entrega. Obrigado!`;
}

export function whatsappUrl(text: string): string {
  if (!/^\d{8,15}$/.test(STORE.whatsapp)) throw new Error("Número de WhatsApp não configurado.");
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const GREETING = "Olá, DesentoX! Gostaria de saber mais sobre o produto e fazer uma encomenda.";
