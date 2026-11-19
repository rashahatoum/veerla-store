import type {
  Color,
  Price,
  ProductImage,
  ProductSummary,
} from "@/types/catalog";

// Mock data shaped exactly like the planned API. Prices and the exchange
// rate are illustrative only.

/** Mock USD→SYP rate (new Syrian pound). Owner-managed in the real system. */
const MOCK_USD_TO_SYP = 150;
/** Mirrors Laravel's `syp_rounding_step` setting. */
const SYP_ROUNDING_STEP = 10;

/** Simulates the API: USD price is the source, SYP is derived and rounded. */
function price(usdCents: number): Price {
  const syp =
    Math.round((usdCents * MOCK_USD_TO_SYP) / 100 / SYP_ROUNDING_STEP) *
    SYP_ROUNDING_STEP;
  return {
    usd: { amount: usdCents, currency: "USD" },
    syp: { amount: syp, currency: "SYP" },
  };
}

function image(
  id: number,
  file: string,
  alt: ProductImage["alt"],
): ProductImage {
  return {
    id,
    url: `/assets/imgs/products/${file}`,
    width: 960,
    height: 1280,
    alt,
    role: "main",
  };
}

const colors = {
  black: { id: 1, slug: "black", name: { ar: "أسود", en: "Black" }, hex: "#111111" },
  cream: { id: 2, slug: "cream", name: { ar: "كريمي", en: "Cream" }, hex: "#E9DCC9" },
  navy: { id: 3, slug: "navy", name: { ar: "كحلي", en: "Navy" }, hex: "#1C2340" },
  cocoa: { id: 4, slug: "cocoa", name: { ar: "بني كاكاو", en: "Cocoa" }, hex: "#4A2318" },
} satisfies Record<string, Color>;

const loungeSets = {
  slug: "lounge-sets",
  name: { ar: "أطقم بيت", en: "Lounge sets" },
};

export const mockProducts: ProductSummary[] = [
  {
    id: 1,
    slug: "noir-gilded-set",
    name: { ar: "طقم نوار المذهّب", en: "Noir Gilded Set" },
    category: loungeSets,
    price: price(3200),
    colors: [
      {
        color: colors.black,
        image: image(1, "noir-gilded-set-black.jpg", {
          ar: "طقم هودي وبنطلون أسود بخطوط ذهبية",
          en: "Black hoodie and wide pants set with gold piping",
        }),
      },
    ],
    availability: "in_stock",
    is_new: true,
  },
  {
    id: 2,
    slug: "winter-deer-set",
    name: { ar: "طقم غزال الشتاء", en: "Winter Deer Set" },
    category: loungeSets,
    price: price(2800),
    colors: [
      {
        color: colors.cream,
        image: image(2, "winter-deer-set-cream.jpg", {
          ar: "طقم كريمي مطرّز بغزال وأشجار شتوية",
          en: "Cream set embroidered with a deer and winter trees",
        }),
      },
    ],
    availability: "low_stock",
    is_new: true,
  },
  {
    id: 3,
    slug: "midnight-crossneck-set",
    name: { ar: "طقم ميدنايت", en: "Midnight Cross-Neck Set" },
    category: loungeSets,
    price: price(2500),
    colors: [
      {
        color: colors.navy,
        image: image(3, "midnight-crossneck-set-navy.jpg", {
          ar: "طقم كحلي بياقة متقاطعة وحبال مجدولة",
          en: "Navy cross-neck hoodie set with braided cords",
        }),
      },
    ],
    availability: "in_stock",
    is_new: true,
  },
  {
    id: 4,
    slug: "cocoa-velvet-set",
    name: { ar: "طقم كاكاو المخمل المطرّز", en: "Cocoa Velvet Set" },
    category: loungeSets,
    price: price(3800),
    colors: [
      {
        color: colors.cocoa,
        image: image(4, "cocoa-velvet-set-brown.jpg", {
          ar: "طقم مخمل بني بتطريز ذهبي",
          en: "Brown velvet set with gold embroidery",
        }),
      },
    ],
    availability: "in_stock",
    is_new: true,
  },
];
