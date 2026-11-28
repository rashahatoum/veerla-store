import type {
  Color,
  Localized,
  Price,
  ProductImage,
  ProductSummary,
} from "@/types/catalog";

// Mock data shaped exactly like the planned API. Prices and the exchange
// rate are illustrative only.
//
// Photos: public/assets/imgs/products/<product-slug>/<color-slug>-NN.<ext>
// NN = position in the gallery; 01 is the main photo shown on cards.

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

/** Simulates an active offer: `price` = offer price, `compare_at_price` = regular price. */
function offer(regularCents: number, offerCents: number) {
  return { price: price(offerCents), compare_at_price: price(regularCents) };
}

const regular = (usdCents: number) => ({ price: price(usdCents), compare_at_price: null });

const colors = {
  black: { id: 1, slug: "black", name: { ar: "أسود", en: "Black" }, hex: "#111111" },
  cream: { id: 2, slug: "cream", name: { ar: "كريمي", en: "Cream" }, hex: "#E9DCC9" },
  navy: { id: 3, slug: "navy", name: { ar: "كحلي", en: "Navy" }, hex: "#1C2340" },
  cocoa: { id: 4, slug: "cocoa", name: { ar: "بني كاكاو", en: "Cocoa" }, hex: "#4A2318" },
  beige: { id: 5, slug: "beige", name: { ar: "بيج", en: "Beige" }, hex: "#C9AE90" },
  rosePink: { id: 6, slug: "rose-pink", name: { ar: "وردي", en: "Rose pink" }, hex: "#D27A8C" },
  whiteGold: { id: 7, slug: "white-gold", name: { ar: "أبيض بذهبي", en: "White & gold" }, hex: "#F4EEE3" },
} satisfies Record<string, Color>;

const loungeSets = {
  slug: "lounge-sets",
  name: { ar: "أطقم بيت", en: "Lounge sets" },
};

type Shot = { alt: Localized; role?: ProductImage["role"] };

let nextImageId = 1;

/** Builds a color's ordered gallery from the folder convention above. */
function gallery(
  productSlug: string,
  colorSlug: string,
  shots: Shot[],
  { ext = "webp", width = 1500, height = 2000 } = {},
): ProductImage[] {
  return shots.map((shot, index) => ({
    id: nextImageId++,
    url: `/assets/imgs/products/${productSlug}/${colorSlug}-${String(index + 1).padStart(2, "0")}.${ext}`,
    width,
    height,
    alt: shot.alt,
    role: shot.role ?? (index === 0 ? "main" : "detail"),
  }));
}

/** Old single-collage mocks (960×1280 JPG) until the owner sends separate photos. */
const collage = (productSlug: string, colorSlug: string, alt: Localized) =>
  gallery(productSlug, colorSlug, [{ alt }], { ext: "jpg", width: 960, height: 1280 });

/** product id → color slug → ordered gallery. Detail pages use all of it, cards use [0]. */
export const mockGalleries: Record<number, Record<string, ProductImage[]>> = {
  1: {
    black: collage("noir-gilded-set", "black", {
      ar: "طقم هودي وبنطلون أسود بخطوط ذهبية",
      en: "Black hoodie and wide pants set with gold piping",
    }),
  },
  2: {
    cream: collage("winter-deer-set", "cream", {
      ar: "طقم كريمي مطرّز بغزال وأشجار شتوية",
      en: "Cream set embroidered with a deer and winter trees",
    }),
  },
  3: {
    navy: gallery("crossover-hood-set", "navy", [
      { alt: { ar: "طقم هودي كحلي بياقة متقاطعة وبنطلون واسع، صورة كاملة", en: "Navy crossover-neck hoodie and flared pants, full look" } },
      { alt: { ar: "تفصيل كم الهودي الكحلي والجيبة", en: "Close-up of the navy hoodie cuff and pocket" } },
      { alt: { ar: "خصر البنطلون الكحلي المطاطي مع الجيبة", en: "Elastic waistband and pocket of the navy pants" } },
      { alt: { ar: "جيبة الكنغر والحبال المجدولة بالهودي الكحلي", en: "Kangaroo pocket and braided cords of the navy hoodie" } },
    ]),
    beige: gallery("crossover-hood-set", "beige", [
      { alt: { ar: "طقم هودي بيج بياقة متقاطعة وبنطلون واسع، صورة كاملة", en: "Beige crossover-neck hoodie and flared pants, full look" } },
      { alt: { ar: "الياقة المتقاطعة مع حبال مجدولة وحلقات معدنية", en: "Crossover neckline with braided cords and metal eyelets" } },
      { alt: { ar: "جيبة الكنغر وكم الهودي البيج", en: "Kangaroo pocket and sleeve of the beige hoodie" } },
      { alt: { ar: "خصر البنطلون البيج المطاطي مع الجيبة", en: "Elastic waistband and pocket of the beige pants" } },
      { alt: { ar: "البنطلون البيج الواسع من تحت بطوله الكامل", en: "The beige flared pants, full length" }, role: "other" },
    ]),
  },
  4: {
    cocoa: collage("cocoa-velvet-set", "cocoa", {
      ar: "طقم مخمل بني بتطريز ذهبي",
      en: "Brown velvet set with gold embroidery",
    }),
  },
  5: {
    "rose-pink": gallery("rose-set", "rose-pink", [
      { alt: { ar: "طقم جاكيت بسحاب وبنطلون واسع وردي بخطوط فضية، صورة كاملة", en: "Rose pink zip jacket and wide-leg pants with silver piping, full look" } },
      { alt: { ar: "الجاكيت الوردي من قدّام مع ورد على الجيوب", en: "Front of the rose pink jacket with flower pocket details" } },
      { alt: { ar: "الخطوط الفضية المنحنية وجيبة الوردة", en: "Curved silver piping and flower pocket" } },
      { alt: { ar: "خصر البنطلون الوردي المطاطي", en: "Elastic waistband of the rose pink pants" } },
      { alt: { ar: "البنطلون الوردي الواسع بطوله الكامل", en: "The rose pink wide-leg pants, full length" }, role: "other" },
    ]),
    "white-gold": gallery("rose-set", "white-gold", [
      { alt: { ar: "طقم جاكيت بسحاب وبنطلون أبيض بخطوط ذهبية، صورة كاملة", en: "White zip jacket and pants with gold piping, full look" } },
      { alt: { ar: "الجاكيت الأبيض بياقة عالية وسحاب ذهبي", en: "White jacket with a stand collar and gold zip" } },
      { alt: { ar: "كم منفوخ وجيبة بوردة ذهبية", en: "Puff sleeve and pocket with a gold-edged flower" } },
      { alt: { ar: "خصر البنطلون الأبيض وطرف الجاكيت", en: "Waistband of the white pants and jacket hem" } },
      { alt: { ar: "البنطلون الأبيض الواسع بخطوط ذهبية بطوله الكامل", en: "The white wide-leg pants with gold piping, full length" }, role: "other" },
    ]),
  },
};

/** Card colors: each color with its main photo, in gallery order. */
function cardColors(productId: number, list: Color[]) {
  return list.map((color) => ({ color, image: mockGalleries[productId][color.slug][0] }));
}

export const mockProducts: ProductSummary[] = [
  {
    id: 1,
    slug: "noir-gilded-set",
    name: { ar: "طقم نوار المذهّب", en: "Noir Gilded Set" },
    category: loungeSets,
    ...offer(3200, 2600),
    colors: cardColors(1, [colors.black]),
    availability: "in_stock",
    is_new: true,
  },
  {
    id: 2,
    slug: "winter-deer-set",
    name: { ar: "طقم غزال الشتاء", en: "Winter Deer Set" },
    category: loungeSets,
    ...regular(2800),
    colors: cardColors(2, [colors.cream]),
    availability: "low_stock",
    is_new: true,
  },
  {
    id: 3,
    slug: "crossover-hood-set",
    name: { ar: "طقم الهودي المتقاطع", en: "Crossover Hood Set" },
    category: loungeSets,
    ...regular(2500),
    colors: cardColors(3, [colors.navy, colors.beige]),
    availability: "in_stock",
    is_new: true,
  },
  {
    id: 4,
    slug: "cocoa-velvet-set",
    name: { ar: "طقم كاكاو المخمل المطرّز", en: "Cocoa Velvet Set" },
    category: loungeSets,
    ...offer(3800, 3000),
    colors: cardColors(4, [colors.cocoa]),
    availability: "in_stock",
    is_new: true,
  },
  {
    id: 5,
    slug: "rose-set",
    name: { ar: "طقم روز", en: "Rose Set" },
    category: loungeSets,
    ...regular(3400),
    colors: cardColors(5, [colors.rosePink, colors.whiteGold]),
    availability: "in_stock",
    is_new: true,
  },
];
