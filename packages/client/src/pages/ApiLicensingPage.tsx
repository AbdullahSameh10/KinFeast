
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Copyright,
  FileCode2,
  Globe2,
  Handshake,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";

const content = {
  en: {
    badge: "For developers & partners",
    title: "API & Licensing",
    subtitle:
      "Build responsibly, respect creators, and help make food discovery better for everyone.",
    introTitle: "A clear path to working with KinFeast",
    intro:
      "KinFeast brings together recipes, food creators, and people who love to cook. This page explains our current approach to API access, content use, attribution, and third-party software.",
    noticeTitle: "API availability",
    notice:
      "Public API access is not currently guaranteed. Please contact our team before building an integration, collecting data automatically, or relying on KinFeast services in another application. We will confirm what access, if any, is available.",
    sections: [
      {
        icon: Code2,
        number: "01",
        title: "API access & integrations",
        description:
          "Any API or integration access must be explicitly authorized by KinFeast. Access may be subject to technical limits, authentication requirements, usage restrictions, and separate written terms.",
        points: [
          "Contact us before requesting API credentials or building an integration.",
          "Do not attempt to bypass access controls, rate limits, or security measures.",
          "Do not assume that information visible on the website is available through a public API.",
          "Permission may be modified or withdrawn where permitted by applicable terms and law.",
        ],
      },
      {
        icon: Copyright,
        number: "02",
        title: "Recipes & content licensing",
        description:
          "The website may contain recipes, photographs, written descriptions, illustrations, logos, and other material. The rights applicable to each item can differ depending on its creator, source, and any applicable license.",
        points: [
          "Do not assume that website content is free to reproduce, republish, or sell.",
          "A recipe's underlying facts and methods may be treated differently from its original written expression or photographs, depending on applicable law.",
          "Respect the rights of chefs, photographers, contributors, and other rights holders.",
          "Obtain appropriate permission before reusing protected content where permission is required.",
        ],
      },
      {
        icon: Handshake,
        number: "03",
        title: "Attribution & creator rights",
        description:
          "We value the people behind every recipe. When a specific license or written permission requires attribution, follow its conditions and identify the creator and source as requested.",
        points: [
          "Never imply that a creator endorses your product without permission.",
          "Do not remove ownership notices or required attribution.",
          "Credit alone does not replace permission when permission is legally required.",
          "Report content that you believe has been used without authorization.",
        ],
      },
      {
        icon: FileCode2,
        number: "04",
        title: "Open-source & third-party software",
        description:
          "KinFeast may use open-source packages, frameworks, fonts, or other third-party tools. Those components remain subject to their own license terms and notices.",
        points: [
          "Each dependency is governed by its applicable license.",
          "Some licenses require copyright notices, attribution, or distribution of license text.",
          "This page is a general overview, not a complete inventory of software dependencies.",
          "Consult the relevant package and its license file for exact obligations.",
        ],
      },
      {
        icon: ShieldCheck,
        number: "05",
        title: "Responsible use",
        description:
          "Any permitted use of KinFeast services must comply with applicable law, our Terms of Service, and any additional written agreement governing your access.",
        points: [
          "Do not disrupt website availability or interfere with other users.",
          "Do not misuse personal information or collect it without a lawful basis.",
          "Do not misrepresent your relationship with KinFeast.",
          "Follow any additional conditions attached to an approved integration or license.",
        ],
      },
    ],
    contactTitle: "Need a license or API access?",
    contactDescription:
      "Tell us what you want to build, which content or services you need, and whether your project is personal, educational, or commercial. Our team can review your request and clarify the applicable permissions.",
    contactButton: "Contact KinFeast",
    terms:
      "This page is an informational overview, not a grant of rights, an API availability guarantee, or legal advice. Applicable agreements, third-party licenses, and law may impose additional requirements.",
    home: "Back to home",
    footer: "Thoughtful technology. Respect for every creator.",
  },
  ar: {
    badge: "للمطورين والشركاء",
    title: "واجهات البرمجة والتراخيص",
    subtitle:
      "طوّر بمسؤولية، واحترم حقوق المبدعين، وساهم في تحسين اكتشاف الطعام للجميع.",
    introTitle: "طريق واضح للتعاون مع KinFeast",
    intro:
      "تجمع KinFeast بين الوصفات وصنّاع المحتوى ومحبي الطهي. توضح هذه الصفحة نهجنا الحالي بشأن الوصول إلى واجهات البرمجة واستخدام المحتوى ونسبه إلى أصحابه والبرمجيات الخارجية.",
    noticeTitle: "إتاحة واجهة البرمجة",
    notice:
      "لا نضمن حاليًا إتاحة واجهة برمجة تطبيقات عامة. يرجى التواصل مع فريقنا قبل إنشاء تكامل أو جمع البيانات آليًا أو الاعتماد على خدمات KinFeast داخل تطبيق آخر. سنوضح لك إمكانية الوصول المتاحة، إن وجدت.",
    sections: [
      {
        icon: Code2,
        number: "٠١",
        title: "الوصول إلى واجهات البرمجة والتكاملات",
        description:
          "يتطلب الوصول إلى واجهات البرمجة أو خدمات التكامل الحصول على تصريح صريح من KinFeast. وقد يخضع الوصول لحدود تقنية ومتطلبات مصادقة وقيود استخدام وشروط مكتوبة منفصلة.",
        points: [
          "تواصل معنا قبل طلب بيانات الوصول أو إنشاء أي تكامل.",
          "لا تحاول تجاوز ضوابط الوصول أو حدود الطلبات أو إجراءات الأمان.",
          "لا تفترض أن المعلومات الظاهرة على الموقع متاحة عبر واجهة برمجة عامة.",
          "يجوز تعديل التصريح أو سحبه وفقًا للشروط والقوانين المعمول بها.",
        ],
      },
      {
        icon: Copyright,
        number: "٠٢",
        title: "ترخيص الوصفات والمحتوى",
        description:
          "قد يتضمن الموقع وصفات وصورًا وأوصافًا مكتوبة ورسومًا وشعارات ومواد أخرى. وقد تختلف الحقوق المتعلقة بكل مادة بحسب منشئها ومصدرها والترخيص المنطبق عليها.",
        points: [
          "لا تفترض أن محتوى الموقع متاح لإعادة النشر أو النسخ أو البيع دون قيود.",
          "قد تختلف المعاملة القانونية لحقائق الوصفة وطرق إعدادها عن النصوص الأصلية أو الصور، بحسب القانون المعمول به.",
          "احترم حقوق الطهاة والمصورين والمساهمين وغيرهم من أصحاب الحقوق.",
          "احصل على التصاريح المناسبة قبل إعادة استخدام المحتوى المحمي عندما يكون التصريح مطلوبًا.",
        ],
      },
      {
        icon: Handshake,
        number: "٠٣",
        title: "نسب المحتوى إلى أصحابه وحقوق المبدعين",
        description:
          "نقدّر الأشخاص الذين يقفون وراء كل وصفة. عندما يشترط الترخيص أو التصريح المكتوب ذكر المصدر، التزم بشروطه وحدد اسم المبدع والمصدر بالطريقة المطلوبة.",
        points: [
          "لا توحِ بأن أحد المبدعين يؤيد منتجك دون إذن.",
          "لا تحذف إشعارات الملكية أو بيانات النسب المطلوبة.",
          "ذكر المصدر وحده لا يغني عن الحصول على تصريح عندما يكون مطلوبًا قانونًا.",
          "أبلغنا عن أي محتوى تعتقد أنه استُخدم دون تصريح.",
        ],
      },
      {
        icon: FileCode2,
        number: "٠٤",
        title: "البرمجيات مفتوحة المصدر والبرمجيات الخارجية",
        description:
          "قد تستخدم KinFeast حزمًا برمجية مفتوحة المصدر وأطر عمل وخطوطًا وأدوات خارجية. وتظل هذه المكونات خاضعة لشروط تراخيصها وإشعاراتها الخاصة.",
        points: [
          "يخضع كل اعتماد برمجي للترخيص المطبق عليه.",
          "قد تتطلب بعض التراخيص الاحتفاظ بإشعارات حقوق النشر أو ذكر المصدر أو إرفاق نص الترخيص.",
          "هذه الصفحة نظرة عامة وليست قائمة كاملة بجميع الاعتمادات البرمجية.",
          "راجع الحزمة المعنية وملف الترخيص الخاص بها لمعرفة الالتزامات الدقيقة.",
        ],
      },
      {
        icon: ShieldCheck,
        number: "٠٥",
        title: "الاستخدام المسؤول",
        description:
          "يجب أن يلتزم أي استخدام مسموح به لخدمات KinFeast بالقوانين المعمول بها وشروط الاستخدام وأي اتفاق مكتوب إضافي ينظم الوصول.",
        points: [
          "لا تعطل الموقع أو تتدخل في استخدام الآخرين له.",
          "لا تسيء استخدام المعلومات الشخصية أو تجمعها دون أساس قانوني.",
          "لا تقدم معلومات مضللة عن علاقتك بـ KinFeast.",
          "التزم بأي شروط إضافية مرتبطة بتكامل أو ترخيص تمت الموافقة عليه.",
        ],
      },
    ],
    contactTitle: "هل تحتاج إلى ترخيص أو وصول إلى واجهة البرمجة؟",
    contactDescription:
      "أخبرنا بما تريد تطويره، والمحتوى أو الخدمات التي تحتاج إليها، وما إذا كان مشروعك شخصيًا أو تعليميًا أو تجاريًا. يمكن لفريقنا مراجعة طلبك وتوضيح التصاريح المنطبقة.",
    contactButton: "تواصل مع KinFeast",
    terms:
      "هذه الصفحة للتوضيح العام فقط، ولا تمنح حقوقًا أو تضمن إتاحة واجهة برمجة التطبيقات ولا تُعد استشارة قانونية. قد تفرض الاتفاقيات المعمول بها وتراخيص الجهات الخارجية والقوانين متطلبات إضافية.",
    home: "العودة إلى الرئيسية",
    footer: "تقنية مسؤولة واحترام لكل مبدع.",
  },
};

export default function ApiLicensingPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const t = content[isArabic ? "ar" : "en"];
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("API & Licensing");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100"
    >
      <section className="relative isolate overflow-hidden border-b border-stone-200 dark:border-stone-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-28 left-1/4 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
        </div>

        <div className="page-container py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm dark:border-orange-900 dark:bg-stone-900/80 dark:text-orange-300">
              <Sparkles size={15} />
              {t.badge}
            </span>

            <h1 className="mt-7 text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {t.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                <Mail size={18} />
                {t.contactButton}
                <Arrow size={17} />
              </Link>
              <a
                href="#licensing-details"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white/80 px-6 py-3 font-bold text-stone-700 transition hover:border-orange-300 hover:text-orange-700 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:text-orange-300"
              >
                <BookOpen size={18} />
                {isArabic ? "استكشف التفاصيل" : "Explore the details"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                <Globe2 size={24} />
              </div>
              <h2 className="text-2xl font-extrabold">
                {t.introTitle}
              </h2>
              <p className="mt-4 leading-8 text-stone-600 dark:text-stone-300">
                {t.intro}
              </p>
            </div>

            <aside className="rounded-3xl border border-amber-200 bg-amber-50 p-7 dark:border-amber-900/60 dark:bg-amber-950/20 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                <Code2 size={24} />
              </div>
              <h2 className="text-xl font-extrabold">
                {t.noticeTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-stone-700 dark:text-stone-300">
                {t.notice}
              </p>
            </aside>
          </div>

          <div
            id="licensing-details"
            className="mt-14 scroll-mt-24 space-y-5"
          >
            {t.sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-900/70 sm:p-8"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-700 transition group-hover:bg-orange-100 dark:bg-orange-950/50 dark:text-orange-300 dark:group-hover:bg-orange-950">
                      <Icon size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black tracking-widest text-orange-600 dark:text-orange-400">
                          {section.number}
                        </span>
                        <h2 className="text-xl font-extrabold sm:text-2xl">
                          {section.title}
                        </h2>
                      </div>

                      <p className="mt-4 leading-8 text-stone-600 dark:text-stone-300">
                        {section.description}
                      </p>

                      <ul className="mt-5 space-y-3">
                        {section.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-7 text-stone-600 dark:text-stone-300"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="relative mt-12 overflow-hidden rounded-3xl bg-stone-900 p-8 text-white dark:bg-stone-900 sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl"
            />
            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
                <Handshake size={25} />
              </div>
              <h2 className="max-w-2xl text-2xl font-black sm:text-3xl">
                {t.contactTitle}
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-stone-300">
                {t.contactDescription}
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400"
              >
                <Mail size={18} />
                {t.contactButton}
                <Arrow size={17} />
              </Link>
            </div>
          </section>

          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-100/70 p-5 dark:border-stone-800 dark:bg-stone-900/60">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-1 shrink-0 text-stone-500"
              />
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                {t.terms}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-7 text-sm text-stone-500 dark:border-stone-800 sm:flex-row">
            <p>{t.footer}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-bold text-orange-700 transition hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200"
            >
              {isArabic ? <Arrow size={16} /> : <ArrowLeft size={16} />}
              {t.home}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
