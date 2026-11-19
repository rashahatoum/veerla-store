# Veerla Store — مواصفات الصفحة الرئيسية (Home Page Spec)

> هذا الملف هو المرجع الدقيق لتنفيذ الصفحة الرئيسية لمتجر Veerla Store.
> **الأولوية عند التعارض:** ملاحظات صاحبة المتجر + لقطات الشاشة المرفقة ← ثم هذا الملف ← ثم ملفات `design-reference/`.

---

## 0. السياق التقني

- **Frontend:** Next.js (افحص المشروع أولاً: App Router أو Pages Router، TypeScript أو لا، Tailwind أو CSS Modules — واتبع أعراف المشروع الموجودة ولا تغيّرها).
- **Backend:** Laravel API. المنتجات والفئات تأتي من الـ API. إذا لم تكن الـ endpoints جاهزة: استخدم بيانات وهمية في ملف typed واحد (`mock/home.ts`) مع `TODO` واضح لربطها لاحقاً، وابنِ طبقة `lib/api` بحيث يكون الاستبدال سطراً واحداً.
- **الاتجاه:** `<html lang="ar" dir="rtl">`. استخدم الخصائص المنطقية (`margin-inline-start`، `inset-inline-end`…) بدل left/right ما أمكن.
- **لا مكتبات أنيميشن ثقيلة** (لا GSAP، لا Framer Motion) — كل الحركات أدناه CSS خالص + سطور JS قليلة. هذا مقصود للأداء.
- **الصور:** كل الصور في `public/images/veerla/`. استخدم `next/image`، وصورة المخمل في الـ Hero بـ `priority`.

### ملفات design-reference
ملفات `.dc.html` هي مصدر التصميم الأصلي (ليست قابلة للتشغيل مباشرة — فيها صيغة قوالب خاصة `{{ }}` و `<sc-for>`). استخدمها لقراءة **القيم الدقيقة** (مسافات، ألوان، أحجام، الـ CSS keyframes). روابط `/_blob/...` فيها تقابل الملفات هكذا:

| `/_blob/` id | الملف |
|---|---|
| `3a7e5be9…` | `velvet.jpg` |
| `462ceb3f…` | `silk.jpg` |
| `201ecee3…` | `logo-gold.webp` |
| `5afbfae2…` | `logo-feather.webp` |
| `74958292…` | `logo-words.webp` |
| `4b16294b…` | `logo-on-velvet.jpg` |
| `e8aedb04…` | `feather-gold.jpg` |
| `c80b2932…` | `sample-robe.jpg` |
| `276103ac…` | `sample-gift-box.jpg` |
| `5158795b…` | `sample-tag.jpg` |

صور `sample-*` مؤقتة — صور المنتجات الحقيقية ستأتي من الـ API.

---

## 1. الخطوط

| الدور | الخط | الأوزان | الاستخدام |
|---|---|---|---|
| عناوين عربية | **Amiri** (أميري) | 400, 700 | كل `h1`, `h2`، أسماء المنتجات، أسماء الفئات. `line-height: 1.5` (أميري طويل الحروف — لا تقلّل عن 1.45) |
| نصوص عربية | **IBM Plex Sans Arabic** | 300, 400, 500, 600, 700 | النص الأساسي للموقع كله، الأزرار، الأسعار، القوائم |
| إنجليزي — عناوين صغيرة | **Cinzel** | 400, 500, 600 | تسميات صغيرة بأحرف متباعدة (`letter-spacing: .3em–.4em`) مثل `Winter Edit`، `The Golden Feather Edit`، رقم الطلب، الكلمة الضخمة VEERLA في الفوتر |
| إنجليزي — لمسات ناعمة | **Cormorant Garamond** (Italic) | 400, 500 italic | عبارات إنجليزية مائلة مثل *Light as a feather, soft as velvet* وتسميات القيم (Extra Soft…) |

```ts
// app/fonts.ts  (عدّل حسب بنية المشروع)
import { Amiri, IBM_Plex_Sans_Arabic, Cinzel, Cormorant_Garamond } from 'next/font/google';
export const amiri = Amiri({ subsets: ['arabic', 'latin'], weight: ['400', '700'], variable: '--font-amiri', display: 'swap' });
export const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-plex', display: 'swap' });
export const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-cinzel', display: 'swap' });
export const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' });
```
`body { font-family: var(--font-plex) }` و `h1, h2 { font-family: var(--font-amiri); letter-spacing: 0 }`.

---

## 2. الألوان (Design Tokens)

```css
:root {
  --plum-950: #1F0718;  /* أعمق برقوقي — خلفية تحت المخمل */
  --plum-900: #2A0A20;  /* النص الأساسي + الأزرار الداكنة */
  --plum-800: #3D1030;  /* الأسعار */
  --plum-700: #5A1F45;  /* الروابط، الأيقونات */
  --mauve-600: #6E4A58; /* نص ثانوي */
  --mauve-500: #5C3A48; /* فقرات على الفاتح */
  --gold-500: #C9A46C;  /* الأزرار الذهبية، الخطوط الزخرفية */
  --gold-300: #E2C08A;  /* نص ذهبي على الداكن */
  --gold-700: #7E5E2E;  /* نص ذهبي على الفاتح (يحقق التباين) */
  --nude-100: #F3E4D8;  /* شريط القيم، خلفيات البطاقات */
  --border:   #E8CDBB;
  --border-strong: #D9BFAF;
  --ivory:    #FCF7F2;  /* خلفية الصفحة */
  --card:     #FFFBF7;
  --ivory-text: #F8EEE6;/* نص على المخمل */
  --sale:     #A23B4C;
}
```
- نص على المخمل دائماً فوق طبقة تعتيم `rgba(31,7,24,.5–.55)` لضمان التباين.
- الذهبي `#C9A46C` لا يُستخدم كلون نص على الخلفيات الفاتحة (تباين ضعيف) — استخدم `--gold-700`.
- الزوايا: 2px للأزرار، 4px للبطاقات والصور. الأقواس: `border-radius: 200px 200px 4px 4px`.

---

## 3. بنية الصفحة الرئيسية (بالترتيب)

1. **Header** — خلفية مخمل (`velvet.jpg` + تعتيم `.55`) + خط سفلي ذهبي `1px rgba(201,164,108,.45)`.
   - شريط إعلانات علوي `rgba(20,4,15,.55)`، نص `#EAD3AB` 13px، ثلاث عبارات بينها معيّنات ذهبية 4px.
   - صف رئيسي: الشعار (`logo-gold.webp` 100×64) — **مخفي في الصفحة الرئيسية فقط** لأن الـ Hero يكتبه؛ القائمة (6 روابط، "التخفيضات" بلون `--gold-300`)؛ الأيقونات (بحث، حساب، مفضلة، سلة + شارة ذهبية).
2. **Hero** — مخمل حي + الريشة تكتب الشعار (انظر §4.1 و §4.2). `min-height: 780px`، المحتوى في المنتصف:
   eyebrow ذهبي ("مجموعة شتاء 2026" + `Winter Edit` بـ Cinzel بين خطين 36px) ← مسرح الشعار 540px ← `h1` "نعومةٌ تليق بلحظاتكِ في البيت" (Amiri، `clamp(30px,3.4vw,48px)`) ← فقرة 17px وزن 300 ← زرّان: ذهبي "تسوقي المجموعة" + شفاف بإطار "اكتشفي الهدايا" (ارتفاع 56px). في الأسفل حافة حرير متموجة بلون `--nude-100` (§4.4).
3. **شريط القيم** (`--nude-100`) — 4 عناصر: دائرة 56px بإطار ذهبي + أيقونة خطية، عنوان عربي 17px/600، وتحته الإنجليزي بـ Cormorant Italic 17px:
   نعومة فائقة / Extra Soft — قماش قابل للتنفس / Breathable — جودة تدوم / Premium Quality — راحة في البيت / Home Comfort.
4. **الفئات** — عنوان "اختاري راحتكِ" + رابط "عرض كل الفئات"؛ 4 بطاقات بشكل قوس (صورة 360px داخل إطار 1px مع حشوة 8px)، الاسم بـ Amiri 24px.
5. **المنتجات** — أيقونة ريشة + "قطعٌ اخترناها لكِ" + تبويبات pill (وصل حديثاً / الأكثر مبيعاً / عروض خاصة) + شبكة 4 بطاقات منتج (§4.5) + زر "تسوقي كل المنتجات".
6. **قسم الهدايا** — بطاقة نصفها لوحة مخمل (نص + 3 نقاط بعلامة ✓ ذهبية + زر ذهبي) ونصفها صورة صندوق الهدية.
7. **مجموعة الريشة الذهبية** — خلفية `silk.jpg` كاملة مع حافة حرير علوية وسفلية بلون العاجي؛ صورة `feather-gold.jpg` + لوحة عاجية `rgba(252,247,242,.93)` فيها: `The Golden Feather Edit` (Cinzel) ← العنوان ← فقرة ← العبارة المائلة *Light as a feather, soft as velvet.* ← زر برقوقي.
8. **#فيرلا_في_البيت** — 5 صور مربعة.
9. **النشرة البريدية** — مخمل + حافة حرير علوية عاجية + صورة الريشة (`logo-feather.webp`) + حقل بريد + زر ذهبي.
10. **Footer** — مخمل بتعتيم `.78`، الشعار، 3 أعمدة روابط، طرق الدفع كشارات، وكلمة VEERLA ضخمة بـ Cinzel بلون `rgba(201,164,108,.12)`.

كل الأقسام 3–8 تنكشف بحركة "ستارة الحرير" عند التمرير (§4.4).

---

## 4. الأنيميشن — المواصفات الدقيقة

### قواعد عامة (إلزامية)
- حرّك فقط `transform` و `opacity` و `clip-path` (و `background-position` للمعة). ممنوع تحريك `width/height/top/left` للعناصر الكبيرة.
- `@media (prefers-reduced-motion: reduce)` → أوقف **كل** الحركات واعرض الحالة النهائية مباشرة.
- لا تُخفِ أي محتوى بانتظار JavaScript: الحالة الافتراضية بدون JS = كل شيء ظاهر.
- على أجهزة اللمس `(hover: none)` لا توجد حالات hover — العناصر التي تظهر بالـ hover تكون ظاهرة دائماً.

### 4.1 الريشة تكتب الشعار (Hero Intro) — الحركة الرئيسية

**الطبقات** (كلها بنفس الأبعاد 967×625 ومكدّسة فوق بعض بدقة، `position:absolute; inset:0`):
1. `logo-words.webp` — الحروف والقوس و STORE (بدون الريشة).
2. `logo-feather.webp` — الريشة وحدها، في مكانها النهائي بالضبط. ساق الريشة هو الذراع اليمنى لحرف V، فعندما تستقر الريشة يكتمل الحرف.
3. `.lg-pen` — نقطة ضوء صغيرة (رأس القلم).
4. `.lg-sheen` — لمعة ذهبية مقصوصة على شكل الشعار عبر `mask-image: url(logo-gold.webp)`.

الحاوية: `.logo-stage { position:relative; width:min(540px, 80vw); aspect-ratio: 967/625 }` مع `role="img" aria-label="Veerla Store"`.

**الخط الزمني:**

| الوقت | ما يحدث |
|---|---|
| 0.0s → 0.2s | فراغ (الريشة مخفية) |
| 0.2s → 2.1s | الريشة تسقط من أعلى اليمين متمايلة كريشة حقيقية وتستقر في مكانها |
| 0.8s / 1.0s / 1.2s | الـ h1 ثم الفقرة ثم الأزرار تصعد 14px مع ظهور تدريجي (0.9s لكل منها) — **الأزرار متاحة بعد ~2 ثانية، لا ننتظر نهاية الشعار** |
| 1.8s → 3.3s | الحروف "تُكتب" من اليسار لليمين (مسح clip-path)، ونقطة الضوء تتحرك على حافة المسح كأنها رأس قلم |
| 3.35s → 4.75s | لمعة ذهبية تعبر الشعار مرة واحدة من اليسار لليمين |
| بعدها | ثبات تام. اللمعة تتكرر فقط عند hover على الشعار |

```css
.lg-feather { transform-origin: 46% 38%; animation: featherFall 1.9s cubic-bezier(.33,0,.2,1) .2s both; }
@keyframes featherFall {
  0%   { opacity:0; transform: translate(20%,-90%) rotate(-30deg); }
  22%  { opacity:1; transform: translate(-9%,-62%) rotate(14deg); }
  48%  {            transform: translate(7%,-30%)  rotate(-9deg); }
  74%  {            transform: translate(-3%,-9%)  rotate(4deg); }
  100% { opacity:1; transform: none; }
}

.lg-words { animation: writeIn 1.5s cubic-bezier(.65,0,.35,1) 1.8s both; }
@keyframes writeIn { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
/* ملاحظة: inset فيزيائي — المسح من اليسار لليمين لأن الشعار لاتيني، حتى داخل صفحة RTL */

.lg-pen {
  position:absolute; left:2%; top:64%; width:18px; height:18px; margin:-9px; border-radius:50%;
  background: radial-gradient(circle, #FFF6DD 0, #E2C08A 38%, rgba(226,192,138,0) 70%);
  box-shadow: 0 0 26px 10px rgba(255,214,150,.4);
  opacity:0; pointer-events:none;
  animation: penMove 1.5s cubic-bezier(.65,0,.35,1) 1.8s both;
}
@keyframes penMove {
  0%   { left:2%;  top:64%; opacity:0; }
  10%  { opacity:1; }
  35%  { top:72%; }
  62%  { top:63%; }
  88%  { opacity:1; }
  100% { left:97%; top:68%; opacity:0; }
}

.lg-sheen {
  position:absolute; inset:0; pointer-events:none;
  -webkit-mask: url(/images/veerla/logo-gold.webp) center/100% 100% no-repeat;
          mask: url(/images/veerla/logo-gold.webp) center/100% 100% no-repeat;
  background: linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,249,228,.95) 50%, rgba(255,255,255,0) 62%) no-repeat;
  background-size: 300% 100%;
  background-position: 120% 0;
  animation: sheen 1.4s ease-out 3.35s both;
}
@keyframes sheen { from { background-position:120% 0; } to { background-position:-20% 0; } }
.logo-stage:hover .lg-sheen { animation: sheenHover 1.2s ease-out both; }
@keyframes sheenHover { from { background-position:120% 0; } to { background-position:-20% 0; } }

.rise { animation: rise .9s ease-out both; }
.d1 { animation-delay:.8s } .d2 { animation-delay:1s } .d3 { animation-delay:1.2s }
@keyframes rise { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
```

**تشغيل مرة واحدة في الجلسة** (حتى لا تزعج الزائرة كلما عادت للرئيسية):
- سكربت صغير inline في `<head>` (قبل الرسم، لتجنّب الوميض): إذا `sessionStorage['veerla_intro']` موجود → `document.documentElement.dataset.intro = 'seen'`، وإلا اضبطه.
- `[data-intro="seen"] .lg-feather, [data-intro="seen"] .lg-words, [data-intro="seen"] .lg-pen, [data-intro="seen"] .lg-sheen, [data-intro="seen"] .rise { animation: none; }` و `.lg-pen { display:none }` في هذه الحالة.
- انتبه لـ hydration: لا تقرأ sessionStorage داخل render في React — الـ attribute على `<html>` كافٍ لأن الحل كله CSS (أضف `suppressHydrationWarning` على `<html>`).

### 4.2 المخمل الحي (Hero background)

- صورة `velvet.jpg` تغطي الـ Hero (`object-fit: cover`) وفوقها:
  1. تعتيم شعاعي (vignette): `radial-gradient(ellipse 70% 65% at 50% 42%, rgba(31,7,24,.05) 0%, rgba(31,7,24,.7) 100%)`.
  2. طبقة ضوء تتبع المؤشر `.velvet-light`.
- **التنفس:**
```css
.velvet { animation: velvetBreath 26s ease-in-out infinite alternate; transform-origin: 60% 40%; will-change: transform; }
@keyframes velvetBreath { from { transform: scale(1.06); } to { transform: scale(1.13) translate(-1.6%, 1.2%); } }
```
- **الضوء على المخمل:**
```css
.velvet-light {
  position:absolute; inset:0; pointer-events:none; mix-blend-mode: screen;
  background: radial-gradient(560px circle at var(--mx,68%) var(--my,32%), rgba(255,170,205,.20), rgba(255,170,205,0) 62%);
}
```
  في JS: على `pointermove` داخل الـ Hero احسب موقع المؤشر كنسبة مئوية وحدّث `--mx` و `--my` على العنصر مباشرة عبر `ref` + `requestAnimationFrame` (**بدون setState** — لا re-render مع كل حركة). فعّلها فقط إذا `matchMedia('(hover: hover) and (pointer: fine)')`.
- **أداء:** عبر IntersectionObserver أوقف `velvetBreath` (`animation-play-state: paused`) عندما يخرج الـ Hero من الشاشة.
- نفس كلاس `.velvet` يُستخدم بلوحة قسم الهدايا وقسم النشرة.

### 4.3 لمعة الذهب على الأزرار

```css
.btn-gold { position:relative; overflow:hidden; transition: box-shadow .4s ease, transform .4s ease; }
.btn-gold::after {
  content:""; position:absolute; inset:0; pointer-events:none;
  background: linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,250,236,.8) 50%, rgba(255,255,255,0) 70%);
  transform: translateX(130%);
}
.btn-gold:hover { box-shadow: 0 12px 32px rgba(201,164,108,.38); transform: translateY(-1px); }
.btn-gold:hover::after { transform: translateX(-130%); transition: transform .9s ease; }
```
(عند خروج المؤشر ترجع اللمعة فوراً بدون transition، فلا تُرى عائدة.) طبّقه على كل الأزرار الذهبية.

**شعار الهيدر (في باقي الصفحات):** نسخة ثانية من الشعار فوق الأصلية بـ `filter: brightness(1.9) saturate(.55)` ومقصوصة بشريط يعبر عند hover:
- الحالة العادية: `clip-path: inset(0 100% 0 -35%)` بدون transition.
- عند hover/focus: `clip-path: inset(0 -35% 0 100%)` مع `transition: clip-path .9s ease`.

### 4.4 حواف الحرير وانكشاف الأقسام

**الحافة المتموجة** (أسفل الـ Hero، أعلى وأسفل قسم الريشة الذهبية، أعلى النشرة):
```html
<div class="wave-box" aria-hidden="true" style="bottom:-1px">   <!-- للحافة العلوية: top:-1px; transform: scaleY(-1) -->
  <svg class="wave slow" viewBox="0 0 2880 64" preserveAspectRatio="none">
    <path d="M0 34 Q 360 4 720 34 T 1440 34 T 2160 34 T 2880 34 V64 H0 Z" fill="{لون القسم التالي}" fill-opacity=".45"/>
  </svg>
  <svg class="wave" viewBox="0 0 2880 64" preserveAspectRatio="none">
    <path d="M0 40 Q 360 14 720 40 T 1440 40 T 2160 40 T 2880 40 V64 H0 Z" fill="{لون القسم التالي}"/>
  </svg>
</div>
```
```css
.wave-box { position:absolute; left:0; right:0; height:64px; overflow:hidden; pointer-events:none; }
.wave { position:absolute; top:0; left:0; width:200%; height:100%; animation: waveDrift 30s linear infinite; }
.wave.slow { animation-duration: 46s; animation-direction: reverse; }
@keyframes waveDrift { from { transform: translateX(-50%); } to { transform: translateX(0); } }
```
المسار يتكرر مرتين بالضبط على 2880 وحدة، لذلك الإزاحة 50% تعطي حلقة بلا قفزة. طبقتان بسرعتين متعاكستين = إحساس طبقات حرير.

**انكشاف الأقسام عند التمرير ("ستارة الحرير"):**
```css
@supports (animation-timeline: view()) {
  .reveal { animation: silkReveal linear both; animation-timeline: view(); animation-range: entry 5% cover 30%; }
  @keyframes silkReveal {
    from { opacity:0; clip-path: inset(0 0 24% 0); transform: translateY(42px); }
    to   { opacity:1; clip-path: inset(0 0 0 0);   transform: none; }
  }
}
```
مرتبط بالتمرير نفسه (بدون JS). المتصفحات غير الداعمة تعرض المحتوى عادي بدون حركة — هذا مقبول ومقصود.

### 4.5 بطاقة المنتج (hover)
- **لا يوجد تبديل صورة** (تم إلغاؤه).
- الصورة: `transform: scale(1)` → `scale(1.04)` مع `transition: transform 1.2s cubic-bezier(.2,.7,.2,1)`، داخل حاوية `overflow:hidden`.
- زر "أضيفي للسلة" (أسفل الصورة، `rgba(42,10,32,.94)`، ارتفاع 46px): `opacity:0; transform: translateY(16px)` → `opacity:1; transform:none` مع `transition: transform .5s cubic-bezier(.2,.7,.2,1), opacity .4s ease`. يظهر أيضاً عند `:focus-within`، **ودائماً ظاهر على أجهزة اللمس**.
- زر المفضلة دائري 44px أعلى يسار الصورة، شارة المنتج (جديد/خصم/هدية) أعلى اليمين.
- اسم المنتج Amiri 20px، الوصف 14px `--mauve-600`، السعر 18px/600 `--plum-800`، السعر القديم مشطوب.

---

## 5. قبول العمل (Definition of Done)
- [ ] مطابق للقطات الشاشة المرفقة + ملاحظات صاحبة المتجر.
- [ ] RTL سليم، ويعمل على عرض 390px (الأقسام تتكدس، القائمة تتحول لزر قائمة).
- [ ] Lighthouse Performance ≥ 90 على الجوال؛ لا CLS من الخطوط أو الصور (أبعاد محددة لكل صورة).
- [ ] `prefers-reduced-motion` يوقف كل شيء.
- [ ] الحركة الافتتاحية مرة واحدة في الجلسة.
- [ ] كل الأزرار ≥ 44px، نصوص بتباين 4.5:1، روابط وأزرار حقيقية (`<a>`/`<button>`).
- [ ] مكونات قابلة لإعادة الاستخدام: `Header`, `Footer`, `ProductCard`, `SilkWave`, `LogoIntro`, `VelvetHero`, `SectionHeading`.
