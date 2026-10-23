import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Cookie,
  Database,
  Eye,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useLanguage } from "../hooks/useLanguage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useEffect } from "react";

const sections = {
  en: [
    {
      id: "information",
      icon: UserRound,
      title: "1. Information We Collect",
      paragraphs: [
        "Depending on how you use KinFeast, we may collect information you provide when creating an account, including your name, email address, account role, profile details, and profile image.",
        "We may also process content and activity associated with your use of the platform, such as recipes, uploaded images, reviews, ratings, favorites, follows, and interactions with recipes or chefs.",
        "If you contact us, we may receive the information you include in your message. During registration, we may also collect your answer to how you discovered KinFeast to understand our outreach efforts.",
      ],
    },
    {
      id: "usage",
      icon: Eye,
      title: "2. How We Use Your Information",
      paragraphs: [
        "We use information to create and manage accounts, provide recipe discovery and community features, display profiles and published content, support platform functionality, respond to messages, and maintain security.",
        "Registration-source information may be used to understand how people discover KinFeast and evaluate our marketing efforts.",
        "We may use relevant platform activity to improve usability, troubleshoot problems, and understand how our features are used. We do not claim to perform analytics that have not actually been implemented.",
      ],
    },
    {
      id: "content",
      icon: FileText,
      title: "3. Public Profiles and Shared Content",
      paragraphs: [
        "Information or content you choose to publish, such as your public profile, recipes, recipe images, or reviews, may be visible to other visitors and users.",
        "Please avoid including sensitive personal information in public profiles, recipe descriptions, comments, or uploaded images. Consider carefully what you choose to share.",
        "If you need to correct or remove published content, contact us using the details below. We will review your request and explain any limitations that apply.",
      ],
    },
    {
      id: "sharing",
      icon: Database,
      title: "4. Service Providers and Sharing",
      paragraphs: [
        "KinFeast relies on technical infrastructure to operate its services. Depending on the features in use, information may be processed by hosting, database, image-storage, or other service providers.",
        "For example, uploaded images may be handled by our configured image-hosting provider. Such providers should process information only as needed to deliver their services and subject to applicable arrangements.",
        "We do not sell your personal information. We may disclose information where reasonably necessary to protect the platform, address security incidents, comply with legal obligations, or respond to lawful requests.",
      ],
    },
    {
      id: "security",
      icon: LockKeyhole,
      title: "5. Data Security and Retention",
      paragraphs: [
        "We use reasonable technical and organizational measures intended to protect information. No internet-based service can guarantee absolute security.",
        "We retain information for as long as reasonably necessary to provide the service, maintain legitimate records, resolve disputes, enforce our agreements, and meet applicable legal obligations.",
        "Retention periods depend on the type of information and how it is used. We do not promise automatic deletion or a particular retention period unless that process has been implemented and verified.",
      ],
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "6. Cookies and Similar Technologies",
      paragraphs: [
        "KinFeast may use browser storage, cookies, or similar technologies where needed for essential functionality, such as remembering preferences or supporting account sessions.",
        "The technologies actually used depend on the current implementation and any integrated third-party services. This policy does not imply that optional analytics or advertising cookies are enabled.",
        "If we introduce technologies that require consent, we will provide appropriate information and choices before using them where required by applicable law.",
      ],
    },
    {
      id: "rights",
      icon: ShieldCheck,
      title: "7. Your Choices and Privacy Rights",
      paragraphs: [
        "You can choose what information you provide and what content you publish. Some information is necessary to create an account or use particular features.",
        "Depending on the laws applicable to you, you may have rights to request access to, correction of, deletion of, or a copy of your personal information, or to object to or restrict certain processing.",
        "To submit a privacy request, contact us at hello@kinfeast.com. We may need to verify your identity before responding. Some information may need to be retained where the law permits or requires it.",
      ],
    },
    {
      id: "children",
      icon: UserRound,
      title: "8. Children's Privacy",
      paragraphs: [
        "KinFeast is not intended to knowingly collect personal information from children in circumstances where parental consent or other safeguards are required. If you believe a child has provided personal information improperly, contact us so we can review the situation.",
      ],
    },
    {
      id: "changes",
      icon: CalendarDays,
      title: "9. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy when our services, practices, or legal obligations change. The revised version will be published on this page with an updated revision date.",
        "Please review this page periodically to stay informed about our privacy practices.",
      ],
    },
  ],
  ar: [
    {
      id: "information",
      icon: UserRound,
      title: "١. المعلومات التي نجمعها",
      paragraphs: [
        "بحسب طريقة استخدامك لـ KinFeast، قد نجمع المعلومات التي تقدمها عند إنشاء حساب، مثل الاسم والبريد الإلكتروني ونوع الحساب وتفاصيل الملف الشخصي وصورته.",
        "قد نعالج أيضًا المحتوى والأنشطة المرتبطة باستخدامك للمنصة، مثل الوصفات والصور المرفوعة والتقييمات والمراجعات والمفضلة والمتابعات والتفاعلات مع الوصفات والطهاة.",
        "إذا تواصلت معنا، فقد نتلقى المعلومات التي تضمنتها رسالتك. وقد نجمع أيضًا إجابتك عن كيفية معرفتك بـ KinFeast لفهم جهودنا التسويقية.",
      ],
    },
    {
      id: "usage",
      icon: Eye,
      title: "٢. كيف نستخدم معلوماتك",
      paragraphs: [
        "نستخدم المعلومات لإنشاء الحسابات وإدارتها، وتوفير اكتشاف الوصفات وميزات المجتمع، وعرض الملفات الشخصية والمحتوى المنشور، وتشغيل المنصة، والرد على الرسائل، وتعزيز الأمان.",
        "قد نستخدم معلومات مصدر التسجيل لفهم كيفية اكتشاف الأشخاص لـ KinFeast وتقييم جهودنا التسويقية.",
        "قد نستخدم أنشطة المنصة ذات الصلة لتحسين سهولة الاستخدام ومعالجة المشكلات وفهم استخدام الميزات. ولا نزعم إجراء تحليلات لم يتم تنفيذها فعليًا.",
      ],
    },
    {
      id: "content",
      icon: FileText,
      title: "٣. الملفات الشخصية والمحتوى المنشور",
      paragraphs: [
        "قد تكون المعلومات والمحتويات التي تختار نشرها، مثل ملفك الشخصي العام والوصفات وصورها والمراجعات، مرئية للزوار والمستخدمين الآخرين.",
        "يرجى تجنب تضمين معلومات شخصية حساسة في الملفات العامة أو أوصاف الوصفات أو التعليقات أو الصور المرفوعة. فكّر جيدًا قبل مشاركة أي محتوى.",
        "إذا أردت تصحيح محتوى منشور أو إزالته، فتواصل معنا عبر التفاصيل أدناه. سنراجع طلبك ونوضح أي قيود تنطبق عليه.",
      ],
    },
    {
      id: "sharing",
      icon: Database,
      title: "٤. مزودو الخدمات ومشاركة المعلومات",
      paragraphs: [
        "تعتمد KinFeast على بنية تقنية لتشغيل خدماتها. وبحسب الميزات المستخدمة، قد تتم معالجة المعلومات لدى مزودي الاستضافة وقواعد البيانات وتخزين الصور وغيرهم من مزودي الخدمات.",
        "على سبيل المثال، قد تتم معالجة الصور المرفوعة لدى مزود استضافة الصور الذي تم إعداده للمنصة. وينبغي أن تقتصر معالجة هؤلاء المزودين على ما يلزم لتقديم خدماتهم ووفق الاتفاقات المعمول بها.",
        "لا نبيع معلوماتك الشخصية. وقد نكشف عن المعلومات عند الضرورة المعقولة لحماية المنصة أو معالجة الحوادث الأمنية أو الامتثال للالتزامات القانونية أو الاستجابة للطلبات القانونية.",
      ],
    },
    {
      id: "security",
      icon: LockKeyhole,
      title: "٥. أمان البيانات والاحتفاظ بها",
      paragraphs: [
        "نستخدم تدابير تقنية وتنظيمية معقولة تهدف إلى حماية المعلومات، لكن لا يمكن لأي خدمة عبر الإنترنت ضمان الأمان المطلق.",
        "نحتفظ بالمعلومات للمدة اللازمة بصورة معقولة لتقديم الخدمة والاحتفاظ بالسجلات المشروعة وحل النزاعات وتطبيق اتفاقاتنا والوفاء بالالتزامات القانونية.",
        "تختلف مدة الاحتفاظ بحسب نوع المعلومات وطريقة استخدامها. ولا نعد بالحذف التلقائي أو بمدة احتفاظ محددة ما لم تكن هذه العملية مطبقة وتم التحقق منها.",
      ],
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "٦. ملفات تعريف الارتباط والتقنيات المشابهة",
      paragraphs: [
        "قد تستخدم KinFeast مساحة تخزين المتصفح أو ملفات تعريف الارتباط أو تقنيات مشابهة عند الحاجة إلى وظائف أساسية، مثل تذكر التفضيلات أو دعم جلسات الحساب.",
        "تعتمد التقنيات المستخدمة فعليًا على التنفيذ الحالي والخدمات الخارجية المتكاملة. ولا تعني هذه السياسة أن ملفات التحليلات أو الإعلانات الاختيارية مفعّلة.",
        "إذا أضفنا تقنيات تتطلب الموافقة، فسنقدم المعلومات والخيارات المناسبة قبل استخدامها حيثما يقتضي القانون ذلك.",
      ],
    },
    {
      id: "rights",
      icon: ShieldCheck,
      title: "٧. خياراتك وحقوق الخصوصية",
      paragraphs: [
        "يمكنك اختيار المعلومات التي تقدمها والمحتوى الذي تنشره. وقد تكون بعض المعلومات ضرورية لإنشاء الحساب أو استخدام ميزات معينة.",
        "بحسب القوانين المنطبقة عليك، قد يحق لك طلب الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها أو الحصول على نسخة منها، أو الاعتراض على بعض عمليات المعالجة أو تقييدها.",
        "لتقديم طلب متعلق بالخصوصية، راسلنا على hello@kinfeast.com. قد نحتاج إلى التحقق من هويتك قبل الرد، وقد يلزم الاحتفاظ ببعض المعلومات حيث يسمح القانون بذلك أو يفرضه.",
      ],
    },
    {
      id: "children",
      icon: UserRound,
      title: "٨. خصوصية الأطفال",
      paragraphs: [
        "لا تهدف KinFeast إلى جمع معلومات شخصية عن الأطفال عن علم في الحالات التي تتطلب موافقة الوالدين أو ضمانات أخرى. إذا كنت تعتقد أن طفلًا قدم معلومات شخصية على نحو غير مناسب، فتواصل معنا لمراجعة الأمر.",
      ],
    },
    {
      id: "changes",
      icon: CalendarDays,
      title: "٩. التغييرات على هذه السياسة",
      paragraphs: [
        "قد نحدّث سياسة الخصوصية عندما تتغير خدماتنا أو ممارساتنا أو التزاماتنا القانونية. وسننشر النسخة المعدلة في هذه الصفحة مع تحديث تاريخ المراجعة.",
        "يرجى مراجعة هذه الصفحة دوريًا للاطلاع على ممارسات الخصوصية لدينا.",
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const content = sections[language];
  const title = isArabic ? "سياسة الخصوصية" : "Privacy Policy";

  useDocumentTitle("Privacy Policy");

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-200"
    >
      <section className="relative overflow-hidden border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="absolute -end-24 -top-28 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="page-container relative py-16 sm:py-20 lg:py-24">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-400"
          >
            {isArabic ? (
              <ArrowRight size={16} />
            ) : (
              <ArrowLeft size={16} />
            )}
            {isArabic ? "العودة إلى الرئيسية" : "Back to home"}
          </Link>

          <div className="flex max-w-3xl items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <ShieldCheck size={29} />
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-600 dark:text-orange-400">
                KINFEAST · {isArabic ? "الخصوصية والثقة" : "PRIVACY & TRUST"}
              </p>

              <h1 className="text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl">
                {title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-400 sm:text-lg">
                {isArabic
                  ? "نؤمن بأهمية التعامل الواضح والمسؤول مع المعلومات التي تشاركها معنا أثناء اكتشاف الوصفات والتواصل مع مجتمع KinFeast."
                  : "We believe in handling the information you share with us clearly and responsibly as you discover recipes and connect with the KinFeast community."}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-medium text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
                <CalendarDays size={14} />
                {isArabic
                  ? "آخر تحديث: ٢٣ أكتوبر ٢٠٢٦"
                  : "Last updated: October 23, 2026"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400">
            {isArabic ? "في هذه الصفحة" : "ON THIS PAGE"}
          </p>

          <nav aria-label={isArabic ? "أقسام سياسة الخصوصية" : "Privacy policy sections"}>
            <ul className="space-y-1">
              {content.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2.5 text-sm text-stone-600 transition-colors hover:bg-orange-50 hover:text-orange-700 dark:text-stone-400 dark:hover:bg-orange-400/10 dark:hover:text-orange-300"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0">
          <div className="mb-8 rounded-2xl border border-orange-200/70 bg-orange-50/70 p-5 dark:border-orange-400/20 dark:bg-orange-400/5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" size={21} />
              <div>
                <h2 className="font-bold text-stone-900 dark:text-white">
                  {isArabic ? "الشفافية مهمة" : "Transparency matters"}
                </h2>
                <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">
                  {isArabic
                    ? "توضح هذه الصفحة ممارسات الخصوصية المقصودة. يجب على فريق KinFeast مراجعتها ومطابقتها مع الخدمات والإعدادات الفعلية قبل اعتمادها رسميًا."
                    : "This page describes intended privacy practices. The KinFeast team should review it against the actual services and configurations before adopting it as the official policy."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {content.map((section) => {
              const Icon = section.icon;

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 dark:border-stone-800 dark:bg-stone-900"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      <Icon size={20} />
                    </div>

                    <h2 className="text-lg font-bold text-stone-950 dark:text-white sm:text-xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-8 text-stone-600 dark:text-stone-400 sm:text-[15px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="mt-6 rounded-2xl bg-stone-900 p-6 text-white dark:bg-stone-800 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Mail size={21} />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {isArabic ? "هل لديك سؤال عن الخصوصية؟" : "Questions about privacy?"}
                </h2>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  {isArabic
                    ? "تواصل معنا بشأن بياناتك أو أي استفسار متعلق بهذه السياسة."
                    : "Contact us about your information or any question related to this policy."}
                </p>
                <a
                  href="mailto:hello@kinfeast.com"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
                >
                  hello@kinfeast.com
                  {isArabic ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </a>
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link
              to="/terms"
              className="font-semibold text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-400"
            >
              {isArabic ? "شروط الخدمة" : "Terms of Service"}
            </Link>
            <Link
              to="/cookies"
              className="font-semibold text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-400"
            >
              {isArabic ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
            </Link>
            <Link
              to="/contact"
              className="font-semibold text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-400"
            >
              {isArabic ? "تواصل معنا" : "Contact us"}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
