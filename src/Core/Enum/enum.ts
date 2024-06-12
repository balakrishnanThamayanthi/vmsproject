export type EnumLiteralsOf<T extends object> = T[keyof T];

export type AttoDeskStores = EnumLiteralsOf<typeof AttoDeskStores>;

export const AttoDeskStores = Object.freeze({
  DEFAULT: "DEFAULT" as const,
  PRODUCT: "PRODUCT" as const,
  CATEGORY: "CATEGORY" as const,
  // SALEDETAILS: 'SALEDETAILS' as const,
});

export const RooleType = Object.freeze({
  FOOD: 1 as const,
  Beverages: 2 as const,
  Alcohol: 3 as const,
  Desserts: 4 as const,
});

export const KitchenPrinterType = Object.freeze({
  KDS: 1 as const,
  PVF: 2 as const,
  LMS: 3 as const,
  KDF: 4 as const,
});

export const SizeOfLevelType = Object.freeze({
  Bottle: 1 as const,
  Combo: 2 as const,
  Each: 3 as const,
  gal: 4 as const,
  gm: 5 as const,
  kg: 6 as const,
  Large: 7 as const,
  li: 8 as const,
  lb: 5 as const,
  Medium: 6 as const,
  oz: 7 as const,
  small: 8 as const,
});
