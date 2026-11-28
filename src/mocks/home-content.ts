import type { HomeContent } from "@/types/content";
import { mockProducts } from "./catalog";
import { placeholderReviews } from "./reviews";

/** Simulates the API resolving the owner's ordered product picks. */
function pick(ids: number[]) {
  return ids.flatMap((id) => mockProducts.filter((product) => product.id === id));
}

/** Default home content — what the dashboard starts with. */
export const mockHomeContent: HomeContent = {
  hero: {
    background: {
      url: "/assets/imgs/veerla/velvet.jpg",
      width: 1600,
      height: 900,
      alt: { ar: "", en: "" }, // decorative
    },
  },
  offers: { enabled: true, products: pick([4, 1]) },
  best_sellers: { enabled: true, products: pick([2, 1, 3, 4]) },
  new_arrivals: { enabled: true, products: pick([5, 3, 1, 2, 4]) },
  about: {
    enabled: true,
    image: {
      url: "/assets/imgs/veerla/about-story.webp",
      width: 1200,
      height: 1500,
      alt: {
        ar: "مشغل VEERLA: مانيكان بجاكيت خمري ووشاح مطبوع بالريش، ودفتر تصاميم، وعلبة هدية VEERLA بشريطة ساتان",
        en: "The VEERLA studio: a mannequin in a burgundy jacket with a feather-print scarf, a sketchbook, and a VEERLA gift box with a satin ribbon",
      },
    },
    title: { ar: "من نحن | حكاية VEERLA", en: "About Us | The Story of VEERLA" },
    lead: {
      ar: "لأن الأناقة ليست مجرد ما نرتديه، بل ما نشعر به.",
      en: "Because elegance isn't just about what you wear, but how you feel.",
    },
    body: [
      {
        ar: "وُلدت VEERLA من شغف بالتفاصيل الجميلة، ورغبة في تقديم أزياء نسائية بجودة عالية وتصاميم مميزة تحمل بصمتنا الخاصة، تجمع بين الراحة والأناقة وتعكس شخصية كل امرأة.",
        en: "VEERLA was born from a passion for beautiful details and a desire to create women's fashion that combines premium quality, comfort, and unique designs that reflect every woman's individuality.",
      },
      {
        ar: "ونؤمن أن أجمل التصاميم قد تبدأ من فكرة لديكِ! فإذا كنتِ تحلمين بموديل لم تجديه في الأسواق، شاركينا فكرتكِ، فقد تكون مصدر إلهام لقطعتنا القادمة.",
        en: "We believe the most beautiful designs can begin with your imagination! If you've been dreaming of a style you can't find anywhere, share your idea with us. It might just inspire our next creation.",
      },
    ],
    closing: {
      ar: "VEERLA — صُممت لتشبهكِ، لا لتشبهي غيركِ.",
      en: "VEERLA — Designed to reflect you, not to make you look like everyone else.",
    },
  },
  reviews: { enabled: true, items: placeholderReviews.slice(0, 4) },
};
