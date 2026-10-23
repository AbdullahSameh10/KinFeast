
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Keyboard,
  MessageCircle,
  Monitor,
  Settings2,
  ShieldCheck,
  Smartphone,
  Type,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";

function AccessibilityPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("Accessibility");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = isArabic
    ? [
        {
          id: "our-commitment",
          title: "1. التزامنا بإمكانية الوصول",
          paragraphs: [
            "في KinFeast، نؤمن بأن الجميع يستحق تجربة سهلة ومريحة عند استكشاف الوصفات، واكتشاف الطهاة، والتفاعل مع محتوى منصتنا.",
            "نسعى إلى جعل موقعنا أكثر سهولة في الاستخدام لمختلف الأشخاص، بما في ذلك الأشخاص ذوو الإعاقة ومستخدمو التقنيات المساعدة.",
            "تُعد إمكانية الوصول جزءًا من جهودنا المستمرة لتحسين تجربة المستخدم. ولا يعني نشر هذه السياسة أن جميع صفحات الموقع وميزاته قد اجتازت بالفعل اختبارًا مستقلًا لإمكانية الوصول.",
          ],
        },
        {
          id: "accessibility-features",
          title: "2. ميزات تساعد على سهولة الاستخدام",
          paragraphs: [
            "نعمل على توفير تجربة واضحة وسهلة التصفح من خلال تنظيم المحتوى، واستخدام عناوين مفهومة، وتقديم عناصر تفاعلية ذات أغراض واضحة.",
            "تشمل أهدافنا تحسين وضوح النصوص، وتوفير تباين مناسب بين النص والخلفية، وتسهيل العثور على المعلومات المتعلقة بالوصفات والطهاة والحسابات.",
            "قد تختلف سهولة الوصول إلى بعض الميزات بحسب الصفحة والجهاز والمتصفح وإصدار الموقع المستخدم.",
          ],
        },
        {
          id: "keyboard-navigation",
          title: "3. التنقل باستخدام لوحة المفاتيح",
          paragraphs: [
            "نهدف إلى جعل العناصر التفاعلية، مثل الروابط والأزرار وحقول النماذج، قابلة للاستخدام باستخدام لوحة المفاتيح دون الاعتماد الكامل على الفأرة.",
            "في المتصفحات وأجهزة الإدخال التي تدعم ذلك، يمكنك تجربة مفتاح Tab للانتقال بين العناصر التفاعلية، وShift + Tab للعودة إلى العنصر السابق، وEnter لتفعيل الروابط والأزرار عند دعمها.",
            "قد تختلف طريقة التفاعل مع بعض العناصر بحسب نوعها والمتصفح المستخدم. إذا واجهت عنصرًا لا يمكنك الوصول إليه بلوحة المفاتيح، نرحب بإبلاغنا عنه.",
          ],
        },
        {
          id: "screen-readers",
          title: "4. برامج قراءة الشاشة والتقنيات المساعدة",
          paragraphs: [
            "نسعى إلى تنظيم صفحات KinFeast باستخدام عناوين واضحة وتسميات مفهومة للعناصر التفاعلية، بما يساعد مستخدمي برامج قراءة الشاشة والتقنيات المساعدة الأخرى.",
            "نهدف أيضًا إلى توفير نصوص بديلة مناسبة للصور المهمة عندما يكون ذلك ملائمًا، حتى يتمكن المستخدمون من فهم المعلومات التي تنقلها هذه الصور.",
            "قد تحتوي بعض الصور أو العناصر أو المحتويات التي تقدمها جهات خارجية على معلومات بديلة غير مكتملة. إذا لاحظت مشكلة، يمكنك التواصل معنا لتوضيحها.",
          ],
        },
        {
          id: "visual-accessibility",
          title: "5. وضوح النصوص والألوان",
          paragraphs: [
            "نهدف إلى تقديم نصوص سهلة القراءة، وتسلسل بصري واضح، وألوان تساعد على التمييز بين المحتوى والعناصر التفاعلية.",
            "ندرك أن المستخدمين قد يحتاجون إلى تكبير النصوص أو تغيير إعدادات العرض أو استخدام أدوات تكبير الشاشة لتسهيل القراءة.",
            "قد تختلف إمكانية قراءة بعض العناصر عند تغيير حجم النص أو استخدام إعدادات تباين مخصصة. نواصل العمل على تقليل هذه الصعوبات وتحسين تجربة العرض.",
          ],
        },
        {
          id: "responsive-design",
          title: "6. إمكانية الوصول عبر الأجهزة المختلفة",
          paragraphs: [
            "نهدف إلى توفير تجربة استخدام مناسبة على أجهزة الكمبيوتر والأجهزة اللوحية والهواتف المحمولة، مع مراعاة اختلاف أحجام الشاشات وطرق التفاعل.",
            "قد تختلف طريقة عرض بعض العناصر أو ترتيبها بحسب حجم الشاشة والمتصفح. نعمل على جعل التنقل بين صفحات الوصفات والطهاة وبقية أقسام المنصة أكثر وضوحًا وسهولة.",
          ],
        },
        {
          id: "continuous-improvement",
          title: "7. التحسين المستمر",
          paragraphs: [
            "إمكانية الوصول عملية مستمرة وليست مهمة تنتهي بمجرد نشر الموقع. لذلك نسعى إلى تحديد العوائق المحتملة وتحسين الصفحات والميزات كلما أمكن.",
            "قد تشمل جهود التحسين مراجعة بنية العناوين، وتسميات الأزرار، والتنقل باستخدام لوحة المفاتيح، والنصوص البديلة للصور، ووضوح رسائل الخطأ والنماذج.",
            "لا ندّعي الامتثال الكامل لأي معيار محدد ما لم يتم التحقق منه فعليًا. ونسعى إلى الاستفادة من إرشادات إمكانية الوصول المعترف بها عند مراجعة المنصة وتطويرها.",
          ],
        },
        {
          id: "third-party-content",
          title: "8. المحتوى والخدمات التابعة لجهات خارجية",
          paragraphs: [
            "قد تعتمد بعض الوظائف أو المواد المتاحة عبر KinFeast على خدمات أو محتوى مقدم من جهات خارجية.",
            "قد لا نتحكم بشكل كامل في إمكانية الوصول إلى هذه الخدمات أو في طريقة تصميمها وتحديثها. ومع ذلك، نرحب بإبلاغنا عن أي عائق تواجهه أثناء استخدامها من خلال منصتنا.",
          ],
        },
        {
          id: "feedback",
          title: "9. الإبلاغ عن مشكلات إمكانية الوصول",
          paragraphs: [
            "إذا واجهت صعوبة في الوصول إلى صفحة أو قراءة محتوى أو استخدام زر أو نموذج أو ميزة معينة، فنحن نرحب بملاحظاتك.",
            "لمساعدتنا على فهم المشكلة، يمكنك ذكر الصفحة المعنية، والخطوات التي أدت إلى ظهور المشكلة، والجهاز أو المتصفح المستخدم، وأي تقنية مساعدة تستخدمها إذا كنت ترغب في مشاركة هذه المعلومات.",
            "يرجى عدم إرسال كلمات المرور أو المعلومات المالية أو أي بيانات شخصية حساسة عند الإبلاغ عن مشكلة.",
          ],
        },
        {
          id: "updates",
          title: "10. التعديلات على هذه السياسة",
          paragraphs: [
            "قد نحدّث سياسة إمكانية الوصول عند تحسين المنصة أو تغيير ميزاتها أو تعديل ممارساتنا المتعلقة بإمكانية الوصول.",
            "سننشر النسخة المحدثة على هذه الصفحة. ننصحك بمراجعتها من وقت لآخر للاطلاع على أي تغييرات.",
          ],
        },
      ]
    : [
        {
          id: "our-commitment",
          title: "1. Our Accessibility Commitment",
          paragraphs: [
            "At KinFeast, we believe everyone deserves a clear and comfortable experience when exploring recipes, discovering chefs, and interacting with our platform.",
            "We strive to make our website more usable for people with different needs, including people with disabilities and users of assistive technologies.",
            "Accessibility is part of our ongoing effort to improve the user experience. Publishing this policy does not mean that every page and feature has already passed an independent accessibility audit.",
          ],
        },
        {
          id: "accessibility-features",
          title: "2. Features That Support Usability",
          paragraphs: [
            "We aim to provide a clear browsing experience through organized content, meaningful headings, and interactive elements with understandable purposes.",
            "Our goals include improving text readability, providing appropriate contrast between text and backgrounds, and making recipe, chef, and account information easier to find.",
            "The accessibility of individual features may vary depending on the page, device, browser, and version of the website.",
          ],
        },
        {
          id: "keyboard-navigation",
          title: "3. Keyboard Navigation",
          paragraphs: [
            "We aim to make interactive elements, including links, buttons, and form fields, usable with a keyboard without requiring a mouse.",
            "In browsers and with input devices that support it, you can try Tab to move between interactive elements, Shift + Tab to move backward, and Enter to activate links and buttons when supported.",
            "The way you interact with individual elements may vary by element type and browser. If you encounter an element that you cannot reach using a keyboard, please let us know.",
          ],
        },
        {
          id: "screen-readers",
          title: "4. Screen Readers and Assistive Technologies",
          paragraphs: [
            "We aim to organize KinFeast pages with clear headings and understandable labels for interactive elements to support screen reader users and people using other assistive technologies.",
            "We also aim to provide appropriate alternative text for meaningful images where relevant, helping users understand the information those images convey.",
            "Some images, elements, or content supplied by third parties may have incomplete alternative information. If you notice an issue, please contact us so we can better understand it.",
          ],
        },
        {
          id: "visual-accessibility",
          title: "5. Readability and Color",
          paragraphs: [
            "We aim to provide readable text, a clear visual hierarchy, and colors that help distinguish content from interactive elements.",
            "We recognize that users may need to enlarge text, adjust display settings, or use screen magnification tools to make content easier to read.",
            "Some elements may be less readable when text is resized or custom contrast settings are applied. We continue working to reduce these difficulties and improve the viewing experience.",
          ],
        },
        {
          id: "responsive-design",
          title: "6. Accessibility Across Devices",
          paragraphs: [
            "We aim to provide a usable experience on desktop computers, tablets, and mobile phones while accounting for different screen sizes and interaction methods.",
            "The layout and order of some elements may vary depending on screen size and browser. We work to make navigation between recipes, chefs, and other platform sections clearer and easier.",
          ],
        },
        {
          id: "continuous-improvement",
          title: "7. Continuous Improvement",
          paragraphs: [
            "Accessibility is an ongoing process, not a task that ends when a website launches. We therefore aim to identify potential barriers and improve pages and features whenever practical.",
            "Our improvement efforts may include reviewing heading structures, button labels, keyboard navigation, image alternative text, and the clarity of form and error messages.",
            "We do not claim full compliance with a particular standard unless it has been verified. We aim to draw on recognized accessibility guidance when reviewing and developing our platform.",
          ],
        },
        {
          id: "third-party-content",
          title: "8. Third-Party Content and Services",
          paragraphs: [
            "Some functionality or materials available through KinFeast may depend on services or content provided by third parties.",
            "We may not have full control over the accessibility, design, or updates of those services. However, we welcome reports of barriers you encounter while using them through our platform.",
          ],
        },
        {
          id: "feedback",
          title: "9. Reporting Accessibility Issues",
          paragraphs: [
            "If you have difficulty accessing a page, reading content, or using a button, form, or feature, we welcome your feedback.",
            "To help us understand the issue, you can identify the affected page, describe the steps that led to the problem, mention your device or browser, and share which assistive technology you use if you wish.",
            "Please do not send passwords, financial information, or other sensitive personal data when reporting an issue.",
          ],
        },
        {
          id: "updates",
          title: "10. Changes to This Policy",
          paragraphs: [
            "We may update this Accessibility Policy as we improve the platform, change its features, or revise our accessibility practices.",
            "The updated version will be published on this page. We encourage you to review it periodically for changes.",
          ],
        },
      ];

  const copy = isArabic
    ? {
        badge: "إمكانية الوصول والشمول",
        title: "إمكانية",
        highlight: "الوصول",
        intro:
          "نسعى في KinFeast إلى جعل استكشاف الوصفات والتفاعل مع منصتنا تجربة أكثر وضوحًا وسهولة للجميع.",
        updated: "آخر تحديث: 23 أكتوبر 2026",
        contents: "محتويات الصفحة",
        commitment: "هدفنا الأساسي",
        notice:
          "نواصل تحسين تجربة الوصول إلى المنصة. وقد تختلف إمكانية الوصول إلى بعض الميزات بحسب الصفحة والجهاز والتقنيات المستخدمة.",
        back: "العودة إلى الرئيسية",
        contact: "الإبلاغ عن مشكلة",
        note:
          "توضح هذه السياسة أهدافنا العامة المتعلقة بإمكانية الوصول، ولا تمثل شهادة امتثال أو ضمانًا بأن جميع ميزات الموقع متوافقة بالكامل مع معايير محددة.",
        sections: "أقسام",
        calloutTitle: "تجربة أفضل للجميع",
        calloutText:
          "ملاحظاتك تساعدنا على اكتشاف العوائق وتحسين سهولة استخدام KinFeast. لا تتردد في إخبارنا إذا واجهت مشكلة.",
      }
    : {
        badge: "ACCESSIBILITY & INCLUSION",
        title: "Accessibility",
        highlight: "Matters",
        intro:
          "At KinFeast, we strive to make exploring recipes and interacting with our platform a clearer, more usable experience for everyone.",
        updated: "Last updated: October 23, 2026",
        contents: "On this page",
        commitment: "Our core commitment",
        notice:
          "We continue to improve accessibility across the platform. Access to individual features may vary depending on the page, device, and technologies used.",
        back: "Back to home",
        contact: "Report an issue",
        note:
          "This policy describes our general accessibility goals. It is not a certification or a guarantee that every website feature fully conforms to a particular standard.",
        sections: "sections",
        calloutTitle: "A Better Experience for Everyone",
        calloutText:
          "Your feedback helps us identify barriers and improve the usability of KinFeast. Please let us know if you encounter a problem.",
      };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950"
    >
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
        </div>

        <div className="page-container py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
              <Accessibility size={17} aria-hidden="true" />
              {copy.badge}
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {copy.title}{" "}
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                {copy.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {copy.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-2 dark:border-stone-700 dark:bg-stone-900/70">
                <CheckCircle2
                  size={16}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                {copy.updated}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-2 dark:border-stone-700 dark:bg-stone-900/70">
                <ShieldCheck
                  size={16}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                {sections.length} {copy.sections}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/80">
              <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-stone-900 dark:text-white">
                <Settings2
                  size={18}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                {copy.contents}
              </h2>

              <nav aria-label={copy.contents} className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm leading-6 text-stone-600 transition hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-orange-300"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-5 rounded-2xl border border-orange-200/70 bg-orange-50/80 p-5 dark:border-orange-900/50 dark:bg-orange-950/20">
              <div className="flex items-center gap-2 text-sm font-extrabold text-stone-900 dark:text-white">
                <Accessibility
                  size={19}
                  className="text-orange-600 dark:text-orange-400"
                  aria-hidden="true"
                />
                {copy.commitment}
              </div>

              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                {copy.notice}
              </p>
            </div>
          </aside>

          <article className="min-w-0 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-start gap-4 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                <Eye size={22} aria-hidden="true" />
              </div>

              <div>
                <h2 className="font-bold text-stone-900 dark:text-white">
                  {copy.calloutTitle}
                </h2>

                <p className="mt-1 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {copy.calloutText}
                </p>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/40"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {copy.contact}
                  <Arrow size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-700">
                <Keyboard
                  size={22}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-stone-900 dark:text-white">
                  {isArabic ? "التنقل بلوحة المفاتيح" : "Keyboard Navigation"}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {isArabic
                    ? "تعرّف على طرق التنقل بين العناصر التفاعلية دون استخدام الفأرة."
                    : "Learn ways to navigate interactive elements without a mouse."}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-700">
                <Type
                  size={22}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-stone-900 dark:text-white">
                  {isArabic ? "وضوح النصوص" : "Readable Content"}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {isArabic
                    ? "نسعى إلى تحسين وضوح النصوص وتنظيم المحتوى وسهولة القراءة."
                    : "We aim to improve text clarity, content structure, and readability."}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-700">
                <Monitor
                  size={22}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-stone-900 dark:text-white">
                  {isArabic ? "تجربة استخدام واضحة" : "Clear User Experience"}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {isArabic
                    ? "نعمل على تنظيم الصفحات والعناصر لتسهيل الوصول إلى المعلومات."
                    : "We work to organize pages and elements so information is easier to find."}
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 p-4 dark:border-stone-700">
                <Smartphone
                  size={22}
                  className="text-orange-500"
                  aria-hidden="true"
                />
                <h3 className="mt-3 font-bold text-stone-900 dark:text-white">
                  {isArabic ? "أجهزة متعددة" : "Multiple Devices"}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {isArabic
                    ? "نسعى إلى تحسين تجربة التصفح على الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر."
                    : "We aim to improve browsing on phones, tablets, and desktop computers."}
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="scroll-mt-8 border-b border-stone-100 pb-8 last:border-0 last:pb-0 dark:border-stone-800"
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="text-xl font-extrabold leading-8 text-stone-950 dark:text-white sm:text-2xl"
                  >
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={`${section.id}-${index}`}
                        className="text-sm leading-8 text-stone-600 dark:text-stone-300 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.id === "feedback" && (
                    <Link
                      to="/contact"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/40"
                    >
                      {copy.contact}
                      <Arrow size={17} aria-hidden="true" />
                    </Link>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800/50">
              <p className="text-xs leading-6 text-stone-500 dark:text-stone-400">
                {copy.note}
              </p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-stone-200 pt-6 dark:border-stone-800 sm:flex-row sm:items-center">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © {new Date().getFullYear()} KinFeast
          </p>

          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
          >
            <ArrowLeft
              size={17}
              aria-hidden="true"
              className={isArabic ? "" : "rotate-180"}
            />
            {copy.back}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AccessibilityPage;
