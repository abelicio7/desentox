
export const STORE = {
  brand: "DesentoX",
  product: "DesentoX — Desentupidor de Canos em Pó",
  unitPrice: 750,
  currency: "MT",
  whatsapp: "258879931016",
  freeDeliveryAreas: ["Maputo Cidade", "Matola"] as const,
  otherLocation: "Outra localização",
  slogan: "CANOS LIVRES, SEM COMPLICAÇÕES.",
  productImage: "/images/desentox-pote.png",
  minQty: 1,
  maxQty: 20,
};

export const formatMT = (n: number) =>
  `${n.toLocaleString("pt-PT").replace(/\s/g, ".")} ${STORE.currency}`;
