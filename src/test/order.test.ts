import { describe, it, expect } from "vitest";
import { calcTotal, buildOrderMessage, whatsappUrl, isFreeDeliveryArea, validateOrder } from "@/lib/order";

const base = { name: "Ana Silva", phone: "841234567", locality: "Matola", neighborhood: "Liberdade", address: "Perto do mercado", quantity: 3, notes: "" };

describe("order rules", () => {
  it("price is 750 MT per unit", () => {
    expect(calcTotal(1)).toBe(750);
    expect(calcTotal(4)).toBe(3000);
    expect(calcTotal(7)).toBe(5250);
  });
  it("free delivery only Maputo Cidade and Matola", () => {
    expect(isFreeDeliveryArea("Maputo Cidade")).toBe(true);
    expect(isFreeDeliveryArea("Matola")).toBe(true);
    expect(isFreeDeliveryArea("Outra localização")).toBe(false);
  });
  it("uses the commercial WhatsApp number", () => {
    expect(whatsappUrl("x")).toMatch(/^https:\/\/wa\.me\/258879931016\?text=/);
  });
  it("message contains customer data and total", () => {
    const m = buildOrderMessage(base);
    expect(m).toContain("Nome: Ana Silva");
    expect(m).toContain("Total dos produtos: 2250 MT");
  });
  it("other location gets confirmation note", () => {
    expect(buildOrderMessage({ ...base, locality: "Outra localização" })).toContain("fora das zonas de entrega gratuita");
  });
  it("quantity limited to 1-20", () => {
    expect(validateOrder({ ...base, quantity: 21 }).quantity).toBeDefined();
    expect(validateOrder({ ...base, quantity: 0 }).quantity).toBeDefined();
    expect(validateOrder(base)).toEqual({});
  });
});
