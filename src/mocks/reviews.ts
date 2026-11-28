import type { Review } from "@/types/content";
import { mockProducts } from "./catalog";

function productRef(id: number): Review["product"] {
  const product = mockProducts.find((item) => item.id === id)!;
  return { slug: product.slug, name: product.name };
}

// DEV PLACEHOLDERS ONLY — layout samples, not real customers. The live site
// shows only real reviews approved by the owner (via the Laravel API).
export const placeholderReviews: Review[] = [
  {
    id: 1,
    customer_display_name: "Sample A.",
    rating: 5,
    body: "نص تجريبي لرأي زبونة: القماش ناعم كتير والمقاس مزبوط.",
    product: productRef(4),
    created_at: "2026-11-10",
  },
  {
    id: 2,
    customer_display_name: "Sample B.",
    rating: 5,
    body: "نص تجريبي: التغليف حلو والتوصيل كان سريع.",
    product: productRef(1),
    created_at: "2026-11-12",
  },
  {
    id: 3,
    customer_display_name: "Sample C.",
    rating: 4,
    body: "Sample review text: warm, soft and exactly like the photos.",
    product: productRef(2),
    created_at: "2026-11-15",
  },
  {
    id: 4,
    customer_display_name: "Sample D.",
    rating: 5,
    body: "نص تجريبي لرأي أطول شوي ليبيّن كيف الكرت بيتصرف مع نص من كذا سطر، والألوان متل الصور تماماً.",
    product: productRef(3),
    created_at: "2026-11-18",
  },
  {
    id: 5,
    customer_display_name: "Sample E.",
    rating: 4,
    body: "نص تجريبي: المخمل تقيل ودافي، بس المقاس بيجي صغير شوي.",
    product: productRef(4),
    created_at: "2026-11-20",
  },
];
