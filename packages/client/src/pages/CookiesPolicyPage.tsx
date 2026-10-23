
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cookie,
  Eye,
  LockKeyhole,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";

function CookiesPolicyPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("Cookies Policy");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = isArabic
    ? [
        {
          id: "what-are-cookies",
          title: "1. ما ملفات تعريف الارتباط؟",
          paragraphs: [
            "ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يمكن أن يحفظها موقع الويب على جهازك عند زيارته. تساعد هذه الملفات المواقع على تذكّر بعض المعلومات المتعلقة بزيارتك أو تفضيلاتك.",
            "توجد أيضًا تقنيات مشابهة، مثل التخزين المحلي للمتصفح، وقد تُستخدم لأغراض مماثلة. تشير هذه السياسة إلى ملفات تعريف الارتباط والتقنيات المشابهة عند الاقتضاء.",
          ],
        },
        {
          id: "why-we-use-them",
          title: "2. لماذا قد نستخدم ملفات تعريف الارتباط؟",
          paragraphs: [
            "قد تستخدم KinFeast ملفات تعريف الارتباط أو تقنيات مشابهة لتشغيل الموقع، والحفاظ على أمانه، وتذكّر تفضيلاتك، وتحسين تجربة تصفح الوصفات والمحتوى.",
            "قد تعتمد بعض الاستخدامات الإضافية، مثل التحليلات أو الإعلانات المخصصة، على الأدوات التي ندمجها فعليًا في الموقع وعلى موافقتك عندما يفرض القانون ذلك.",
          ],
        },
        {
          id: "essential",
          title: "3. ملفات تعريف الارتباط الضرورية",
          paragraphs: [
            "قد تكون بعض ملفات تعريف الارتباط أو تقنيات التخزين ضرورية لتوفير وظائف تطلبها، مثل تسجيل الدخول، أو الحفاظ على أمان الجلسة، أو تذكّر معلومات لازمة لتشغيل ميزة معينة.",
            "قد لا تعمل بعض ميزات الموقع بصورة صحيحة إذا عطّلت هذه التقنيات. وعندما تكون هذه الملفات ضرورية فعلًا، فقد لا تتطلب موافقتك المسبقة وفقًا للقانون المعمول به.",
          ],
        },
        {
          id: "preferences",
          title: "4. ملفات تعريف الارتباط الخاصة بالتفضيلات",
          paragraphs: [
            "قد تساعد تقنيات التفضيلات الموقع على تذكّر اختياراتك، مثل اللغة أو بعض إعدادات العرض، لتوفير تجربة أكثر ملاءمة عند العودة.",
            "يعتمد استخدام هذه التقنيات على طريقة تنفيذ ميزات التفضيلات في الموقع.",
          ],
        },
        {
          id: "analytics",
          title: "5. ملفات التحليلات والأداء",
          paragraphs: [
            "قد تساعد أدوات التحليلات أصحاب الموقع على فهم كيفية استخدام الزوار للصفحات، والميزات الأكثر استخدامًا، والمشكلات التي تؤثر في الأداء.",
            "لا يعني وجود هذا القسم أن KinFeast يستخدم حاليًا أداة تحليلات معينة. إذا تم تفعيل تقنيات تحليلات اختيارية، فسيتم التعامل معها وفقًا للقانون المعمول به، بما في ذلك الحصول على الموافقة عند الحاجة.",
          ],
        },
        {
          id: "advertising",
          title: "6. ملفات الإعلانات والتتبع",
          paragraphs: [
            "قد تستخدم بعض المواقع تقنيات إعلانية لقياس فعالية الحملات أو عرض إعلانات مخصصة. ولا ينبغي افتراض أن KinFeast يستخدم ملفات إعلانية أو تقنيات تتبع تابعة لجهات خارجية ما لم يتم دمجها فعليًا.",
            "إذا أضفنا خدمات إعلانية أو تتبع اختيارية مستقبلًا، فسنوضح استخدامها ونتعامل مع الموافقة والخيارات المتاحة وفقًا للمتطلبات القانونية.",
          ],
        },
        {
          id: "third-parties",
          title: "7. ملفات تعريف الارتباط التابعة لجهات خارجية",
          paragraphs: [
            "قد تضع خدمات خارجية مدمجة في الموقع تقنياتها الخاصة، إذا كانت هذه الخدمات مستخدمة بالفعل. وقد تشمل هذه الخدمات أدوات قياس الأداء أو خدمات المحتوى المضمّن.",
            "تخضع هذه التقنيات لسياسات الجهات الخارجية المعنية. ويجب مراجعة الخدمات المستخدمة فعليًا قبل تحديد الجهات التي تتلقى البيانات أو أنواع الملفات التي تحفظها.",
          ],
        },
        {
          id: "manage",
          title: "8. كيفية إدارة ملفات تعريف الارتباط",
          paragraphs: [
            "يمكنك في كثير من المتصفحات الاطلاع على ملفات تعريف الارتباط المحفوظة وحذفها أو حظر بعضها من خلال إعدادات الخصوصية والأمان.",
            "تختلف خطوات الإدارة حسب المتصفح والجهاز. وقد يؤدي حظر بعض الملفات الضرورية إلى تعطيل تسجيل الدخول أو بعض ميزات الموقع.",
            "إذا وفر الموقع أداة لإدارة الموافقة على ملفات تعريف الارتباط، فيمكنك استخدامها لتغيير اختياراتك بشأن التقنيات الاختيارية. لا تُعد هذه الصفحة بحد ذاتها أداة لتسجيل الموافقة أو تغييرها.",
          ],
        },
        {
          id: "retention",
          title: "9. مدة الاحتفاظ",
          paragraphs: [
            "قد تكون بعض ملفات تعريف الارتباط مؤقتة وتنتهي عند إغلاق المتصفح، بينما قد تبقى ملفات أخرى على جهازك لمدة أطول أو حتى تقوم بحذفها.",
            "تعتمد مدة الاحتفاظ الفعلية على الملف أو التقنية المستخدمة وإعداداتها. ينبغي توثيق المدد الفعلية للخدمات التي يستخدمها الموقع.",
          ],
        },
        {
          id: "updates",
          title: "10. التعديلات على هذه السياسة",
          paragraphs: [
            "قد نحدّث هذه السياسة عند تغيير وظائف الموقع أو التقنيات المستخدمة أو المتطلبات القانونية. سننشر النسخة المحدثة على هذه الصفحة مع تعديل تاريخ آخر تحديث.",
            "ننصحك بمراجعة هذه الصفحة من وقت لآخر للاطلاع على أي تغييرات.",
          ],
        },
        {
          id: "contact",
          title: "11. تواصل معنا",
          paragraphs: [
            "إذا كانت لديك أسئلة حول سياسة ملفات تعريف الارتباط أو ممارسات الخصوصية في KinFeast، يمكنك التواصل مع فريقنا من خلال صفحة الاتصال.",
          ],
        },
      ]
    : [
        {
          id: "what-are-cookies",
          title: "1. What Are Cookies?",
          paragraphs: [
            "Cookies are small text files that a website may store on your device when you visit. They can help a website remember information about your visit or preferences.",
            "Similar technologies, such as browser local storage, may serve related purposes. This policy refers to cookies and similar technologies where appropriate.",
          ],
        },
        {
          id: "why-we-use-them",
          title: "2. Why Might We Use Cookies?",
          paragraphs: [
            "KinFeast may use cookies or similar technologies to operate the website, maintain security, remember preferences, and improve your experience when browsing recipes and other content.",
            "Additional uses, such as analytics or personalized advertising, depend on which tools are actually integrated into the website and on your consent where required by law.",
          ],
        },
        {
          id: "essential",
          title: "3. Essential Cookies",
          paragraphs: [
            "Some cookies or storage technologies may be necessary to provide features you request, such as signing in, maintaining a secure session, or remembering information needed for a particular function.",
            "Some website features may not work correctly if these technologies are blocked. Where a cookie is genuinely necessary, applicable law may allow its use without prior consent.",
          ],
        },
        {
          id: "preferences",
          title: "4. Preference Cookies",
          paragraphs: [
            "Preference technologies may help a website remember your choices, such as language or certain display settings, to provide a more convenient experience when you return.",
            "Their actual use depends on how the website's preference features are implemented.",
          ],
        },
        {
          id: "analytics",
          title: "5. Analytics and Performance Cookies",
          paragraphs: [
            "Analytics tools can help website operators understand how visitors use pages, which features are popular, and what performance issues need attention.",
            "This section does not mean KinFeast currently uses a particular analytics service. If optional analytics technologies are enabled, they will be handled in accordance with applicable law, including obtaining consent where required.",
          ],
        },
        {
          id: "advertising",
          title: "6. Advertising and Tracking Cookies",
          paragraphs: [
            "Some websites use advertising technologies to measure campaign performance or deliver personalized advertisements. You should not assume that KinFeast uses advertising cookies or third-party tracking unless those technologies have actually been integrated.",
            "If optional advertising or tracking services are introduced, we will describe their use and handle consent and available choices in accordance with applicable requirements.",
          ],
        },
        {
          id: "third-parties",
          title: "7. Third-Party Cookies",
          paragraphs: [
            "Third-party services embedded in the website may set their own technologies if those services are actually in use. Examples can include performance measurement tools or embedded content providers.",
            "Such technologies are subject to the relevant third parties' policies. The services actually used should be audited before identifying who receives data or which cookies are stored.",
          ],
        },
        {
          id: "manage",
          title: "8. How to Manage Cookies",
          paragraphs: [
            "Most browsers allow you to view, delete, or block cookies through their privacy and security settings.",
            "The steps vary by browser and device. Blocking essential cookies may interfere with signing in or using certain website features.",
            "If the website provides a cookie consent management tool, you can use it to change your choices about optional technologies. This policy page itself does not record or change consent.",
          ],
        },
        {
          id: "retention",
          title: "9. How Long Cookies Are Stored",
          paragraphs: [
            "Some cookies are temporary and expire when you close your browser. Others may remain on your device for a longer period or until you delete them.",
            "Actual retention periods depend on the cookie or technology and its configuration. The website's real services should be documented to establish accurate retention periods.",
          ],
        },
        {
          id: "updates",
          title: "10. Changes to This Policy",
          paragraphs: [
            "We may update this policy when website features, technologies, or legal requirements change. The revised version will be published on this page with an updated last-modified date.",
            "We encourage you to review this page periodically.",
          ],
        },
        {
          id: "contact",
          title: "11. Contact Us",
          paragraphs: [
            "If you have questions about this Cookies Policy or KinFeast's privacy practices, please contact our team through the Contact Us page.",
          ],
        },
      ];

  const copy = isArabic
    ? {
        badge: "الخصوصية والبيانات",
        title: "سياسة ملفات",
        highlight: "تعريف الارتباط",
        intro:
          "نوضح هنا ماهية ملفات تعريف الارتباط، ولماذا قد نستخدمها، وكيف يمكنك التحكم فيها أثناء استخدام KinFeast.",
        updated: "آخر تحديث: 23 أكتوبر 2026",
        contents: "محتويات السياسة",
        essential: "الأساسيات أولًا",
        notice:
          "تعتمد ملفات تعريف الارتباط الفعلية على التقنيات المستخدمة في الموقع. لا يعني ذكر نوع معين هنا أنه مفعّل حاليًا.",
        back: "العودة إلى الرئيسية",
        contact: "تواصل معنا",
        note:
          "هذه السياسة نموذج عام. يجب التحقق من ملفات تعريف الارتباط والتخزين المحلي والخدمات الخارجية المستخدمة فعليًا قبل النشر، ومراجعة المتطلبات القانونية المنطبقة.",
        sections: "قسم",
      }
    : {
        badge: "PRIVACY & DATA",
        title: "Cookies",
        highlight: "Policy",
        intro:
          "Learn what cookies are, why KinFeast may use them, and how you can manage them while browsing our platform.",
        updated: "Last updated: October 23, 2026",
        contents: "On this page",
        essential: "The important distinction",
        notice:
          "Actual cookies depend on the technologies used by the website. Listing a category here does not mean it is currently enabled.",
        back: "Back to home",
        contact: "Contact us",
        note:
          "This is a general template. Audit the cookies, local storage, and third-party services actually used before publication, and review applicable legal requirements.",
        sections: "sections",
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
              <Cookie size={15} />
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
                <CheckCircle2 size={16} className="text-orange-500" />
                {copy.updated}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-2 dark:border-stone-700 dark:bg-stone-900/70">
                <ShieldCheck size={16} className="text-orange-500" />
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
                <Settings2 size={18} className="text-orange-500" />
                {copy.contents}
              </h2>

              <nav aria-label={copy.contents} className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm leading-6 text-stone-600 transition hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-orange-300"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-5 rounded-2xl border border-orange-200/70 bg-orange-50/80 p-5 dark:border-orange-900/50 dark:bg-orange-950/20">
              <div className="flex items-center gap-2 text-sm font-extrabold text-stone-900 dark:text-white">
                <LockKeyhole
                  size={18}
                  className="text-orange-600 dark:text-orange-400"
                />
                {copy.essential}
              </div>

              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                {copy.notice}
              </p>
            </div>
          </aside>

          <article className="min-w-0 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-start gap-4 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                <Eye size={22} />
              </div>

              <div>
                <h2 className="font-bold text-stone-900 dark:text-white">
                  {isArabic
                    ? "خصوصيتك مهمة"
                    : "Your privacy matters"}
                </h2>

                <p className="mt-1 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {isArabic
                    ? "نهدف إلى توضيح كيفية عمل هذه التقنيات، مع التأكيد على أن الاستخدام الفعلي يعتمد على إعدادات وخدمات الموقع."
                    : "We aim to explain these technologies clearly while recognizing that actual usage depends on the website's configuration and integrated services."}
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-8 border-b border-stone-100 pb-8 last:border-0 last:pb-0 dark:border-stone-800"
                >
                  <h2 className="text-xl font-extrabold leading-8 text-stone-950 dark:text-white sm:text-2xl">
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

                  {section.id === "contact" && (
                    <Link
                      to="/contact"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/25"
                    >
                      {copy.contact}
                      <Arrow size={17} />
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
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
          >
            <ArrowLeft
              size={17}
              className={isArabic ? "" : "rotate-180"}
            />
            {copy.back}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CookiesPolicyPage;
