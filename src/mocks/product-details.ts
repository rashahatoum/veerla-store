import type {
  Availability,
  Localized,
  ProductDetail,
  ProductSummary,
  Size,
  SizeChart,
} from "@/types/catalog";
import { mockGalleries, mockProducts } from "./catalog";
import { placeholderReviews } from "./reviews";

// Product detail mocks, built on top of the card data in ./catalog so the two
// never disagree. Texts, measurements and stock are illustrative only.

const letterSizes: Size[] = ["S", "M", "L", "XL"].map((label, index) => ({
  id: index + 1,
  label,
  system: "letter",
  sort_order: index + 1,
}));

/** SAMPLE chart — to be replaced by the owner's real measurements. */
const sampleChart: SizeChart = {
  measurements: [
    { ar: "الصدر", en: "Bust" },
    { ar: "الخصر", en: "Waist" },
    { ar: "الورك", en: "Hips" },
    { ar: "طول البنطلون", en: "Pants length" },
  ],
  rows: [
    { size: "S", values: [88, 70, 94, 100] },
    { size: "M", values: [94, 76, 100, 102] },
    { size: "L", values: [100, 82, 106, 104] },
    { size: "XL", values: [106, 88, 112, 106] },
  ],
};

type Extra = {
  description: Localized;
  fabric: Localized;
  care: Localized;
  fit_note: Localized | null;
  /** Availability overrides: color slug → size label (default in_stock). */
  stock?: Record<string, Partial<Record<string, Availability>>>;
};

const care: Localized = {
  ar: "غسيل يدوي أو غسالة على برنامج ناعم بمي باردة، بدون مبيّض، ونشر بالظل.",
  en: "Hand wash or gentle machine cycle in cold water, no bleach, dry in the shade.",
};

const extras: Record<number, Extra> = {
  1: {
    description: {
      ar: "طقم بيت أسود بهودي وبنطلون واسع، مزيّن بخطوط ذهبية ناعمة. أناقة هادية للسهرات بالبيت.",
      en: "A black hoodie and wide-leg pants set with fine gold piping — quiet elegance for evenings at home.",
    },
    fabric: { ar: "قطن مخلوط بوبر ناعم من جوّا.", en: "Cotton blend, brushed soft inside." },
    care,
    fit_note: null,
  },
  2: {
    description: {
      ar: "طقم كريمي مطرّز بغزال وأشجار شتوية، مع حواف خمرية. دفا الشتا بلمسة احتفالية.",
      en: "A cream set embroidered with a deer and winter trees, trimmed in burgundy — winter warmth with a festive touch.",
    },
    fabric: { ar: "فليس ناعم ودافي.", en: "Soft, warm fleece." },
    care,
    fit_note: null,
    stock: { cream: { M: "low_stock", XL: "out_of_stock" } },
  },
  3: {
    description: {
      ar: "طقم هودي بياقة متقاطعة وحبال مجدولة بحلقات معدنية، مع بنطلون واسع من تحت. قصة مريحة ومرتبة لكل اليوم.",
      en: "A crossover-neck hoodie with braided cords and metal eyelets, paired with flared pants — a relaxed, polished fit for all day.",
    },
    fabric: { ar: "قطن ثقيل ناعم، مبطّن بوبر من جوّا.", en: "Soft heavyweight cotton, brushed inside." },
    care,
    fit_note: null,
    stock: { navy: { L: "out_of_stock" }, beige: { M: "low_stock" } },
  },
  4: {
    description: {
      ar: "طقم مخمل بني بتطريز ذهبي على الأكمام والبنطلون. فخامة المخمل بأريحية البيت.",
      en: "A brown velvet set with gold embroidery on the sleeves and pants — velvet luxury, home comfort.",
    },
    fabric: { ar: "مخمل ناعم.", en: "Soft velvet." },
    care: {
      ar: "تنظيف لطيف باليد بمي باردة، بدون عصر، ونشر على سطح مستوي.",
      en: "Gentle hand wash in cold water, do not wring, dry flat.",
    },
    fit_note: { ar: "القصة بتجي صغيرة شوي — اختاري مقاس أكبر.", en: "Runs slightly small — choose one size up." },
    stock: { cocoa: { S: "low_stock" } },
  },
  5: {
    description: {
      ar: "طقم جاكيت بسحاب وبنطلون واسع، بخطوط منحنية بتحدد القصة وورود ناعمة على الجيوب. أنوثة ناعمة لكل يوم.",
      en: "A zip jacket and wide-leg pants with curved piping that shapes the silhouette and soft flower details on the pockets.",
    },
    fabric: { ar: "قطن ناعم مبطّن بوبر من جوّا.", en: "Soft cotton, brushed inside." },
    care,
    fit_note: null,
    stock: { "rose-pink": { S: "low_stock" }, "white-gold": { XL: "out_of_stock" } },
  },
};

function rating(slug: string): ProductDetail["rating"] {
  const reviews = placeholderReviews.filter((review) => review.product.slug === slug);
  if (reviews.length === 0) return null;
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return { average: Math.round(average * 10) / 10, count: reviews.length };
}

function toDetail(product: ProductSummary): ProductDetail {
  const extra = extras[product.id];
  const colors = product.colors.map(({ color }) => ({
    color,
    images: mockGalleries[product.id][color.slug],
  }));
  const variants = colors.flatMap(({ color }) =>
    letterSizes.map((size) => ({
      id: product.id * 1000 + color.id * 10 + size.id,
      color_id: color.id,
      size_id: size.id,
      availability: extra.stock?.[color.slug]?.[size.label] ?? ("in_stock" as Availability),
    })),
  );

  return {
    ...product,
    description: extra.description,
    fabric: extra.fabric,
    care: extra.care,
    fit_note: extra.fit_note,
    colors,
    sizes: letterSizes,
    variants,
    size_chart: sampleChart,
    rating: rating(product.slug),
  };
}

export const mockProductDetails: ProductDetail[] = mockProducts.map(toDetail);
