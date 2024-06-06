export type EnumLiteralsOf<T extends object> = T[keyof T];
export type AttoDeskStores = EnumLiteralsOf<typeof AttoDeskStores>;
export const AttoDeskStores = Object.freeze({
  DEFAULT: "DEFAULT" as const,
  PRODUCT: "PRODUCT" as const,
  CATEGORY: "CATEGORY" as const,
  // SALEDETAILS: 'SALEDETAILS' as const,
});
