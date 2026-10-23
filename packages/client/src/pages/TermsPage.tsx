import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Utensils,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";

function TermsPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("Terms of Use");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = isArabic
    ? [
        {
          id: "acceptance",
          title: "1. الموافقة على الشروط",
          content: [
            "باستخدامك منصة KinFeast أو تصفحها أو إنشاء حساب عليها، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا لم توافق على هذه الشروط، يُرجى عدم استخدام المنصة.",
            "قد نقوم بتحديث هذه الشروط من وقت لآخر. وسيتم نشر النسخة المحدثة على هذه الصفحة مع تعديل تاريخ آخر تحديث.",
          ],
        },
        {
          id: "eligibility",
          title: "2. الأهلية والحسابات",
          content: [
            "يجب عليك تقديم معلومات دقيقة عند إنشاء حسابك والمحافظة على تحديثها. أنت مسؤول عن حماية بيانات تسجيل الدخول وعن الأنشطة التي تتم من خلال حسابك.",
            "لا يجوز لك انتحال شخصية أي شخص، أو تقديم معلومات مضللة، أو استخدام حساب شخص آخر دون إذنه. إذا اشتبهت في استخدام غير مصرح به لحسابك، فتواصل معنا.",
          ],
        },
        {
          id: "platform",
          title: "3. خدمات المنصة",
          content: [
            "توفر KinFeast منصة لاكتشاف الوصفات ومشاركتها، والتعرف على الطهاة، واستكشاف المكونات، والتفاعل مع مجتمع محبي الطعام.",
            "قد تتغير بعض الميزات أو تتوقف أو تصبح غير متاحة مؤقتًا. ولا نضمن أن تكون المنصة متاحة دون انقطاع أو خالية من الأخطاء في جميع الأوقات.",
          ],
        },
        {
          id: "content",
          title: "4. المحتوى والوصفات",
          content: [
            "قد تنشر المنصة وصفات وصورًا ومعلومات عن المكونات وتعليمات الطهي ومحتوى آخر يقدمه المستخدمون أو الطهاة.",
            "تظل مسؤولًا عن المحتوى الذي تنشره، ويجب أن تمتلك الحقوق اللازمة لنشره. لا تنشر محتوى منسوخًا أو مضللًا أو غير قانوني أو ينتهك حقوق الآخرين.",
            "عند نشر المحتوى، تمنح KinFeast إذنًا غير حصري وعالميًا وخاليًا من رسوم الترخيص لاستضافة هذا المحتوى وعرضه وتنسيقه وتوزيعه بالقدر اللازم لتشغيل المنصة والترويج لها. ويظل هذا الإذن خاضعًا لحقوقك القانونية وحقوق الأطراف الأخرى.",
            "يجوز لنا إزالة المحتوى الذي يخالف هذه الشروط أو إرشادات المجتمع أو يشكل خطرًا على المستخدمين.",
          ],
        },
        {
          id: "chefs",
          title: "5. الطهاة والمساهمون",
          content: [
            "يجب على الطهاة والمساهمين تقديم معلومات صادقة عن أنفسهم وعن وصفاتهم وخبراتهم. لا يجوز تقديم ادعاءات مضللة بشأن المؤهلات أو المكونات أو النتائج المتوقعة.",
            "ظهور وصفة أو ملف طاهٍ على المنصة لا يعني بالضرورة أن KinFeast قد تحقق من جميع المعلومات الواردة فيه أو صادقت عليها.",
          ],
        },
        {
          id: "reviews",
          title: "6. التقييمات والتفاعلات",
          content: [
            "يجب أن تعكس التقييمات والمراجعات تجربتك الحقيقية وأن تكون محترمة ومرتبطة بالمحتوى. يُمنع نشر التقييمات المزيفة أو التلاعب بالتقييمات أو مضايقة المستخدمين.",
            "يجوز لنا مراجعة التفاعلات أو إزالة المحتوى الذي يخالف هذه القواعد.",
          ],
        },
        {
          id: "safety",
          title: "7. سلامة الطعام والمعلومات",
          content: [
            "تُقدَّم الوصفات والمعلومات الغذائية وإرشادات الطهي لأغراض المعلومات العامة فقط. وهي ليست بديلًا عن المشورة الطبية أو الغذائية أو المهنية المتخصصة.",
            "قد تختلف المكونات وطرق التحضير وأوقات الطهي والأجهزة والنتائج. تحقّق دائمًا من سلامة المكونات ودرجة نضج الطعام ودرجات الحرارة المناسبة، واتبع إرشادات السلامة الغذائية المعتمدة.",
            "أنت مسؤول عن مراعاة الحساسية الغذائية والقيود الغذائية والتلوث المتبادل. لا تفترض أن أي وصفة خالية من مسببات الحساسية ما لم يتم التحقق من ذلك بصورة مستقلة.",
          ],
        },
        {
          id: "prohibited",
          title: "8. الاستخدامات المحظورة",
          content: [
            "لا يجوز استخدام المنصة لأي غرض غير قانوني، أو محاولة الوصول غير المصرح به إلى الحسابات أو الأنظمة، أو تعطيل خدمات المنصة.",
            "يُحظر تحميل البرمجيات الضارة، أو إرسال الرسائل المزعجة، أو جمع بيانات المستخدمين دون إذن، أو انتهاك حقوق الملكية الفكرية، أو نشر التهديدات أو المضايقات أو المحتوى الاحتيالي.",
            "لا يجوز استخدام أدوات آلية للوصول إلى المنصة أو استخراج محتواها بطريقة تؤثر في الخدمة أو تخالف القانون أو هذه الشروط.",
          ],
        },
        {
          id: "intellectual-property",
          title: "9. الملكية الفكرية",
          content: [
            "تعود حقوق KinFeast في اسمها وشعارها وتصميمها وبرمجياتها وعناصرها الأصلية إلى أصحاب الحقوق المعنيين، وتحميها القوانين المعمول بها.",
            "لا يجوز نسخ أو إعادة توزيع أو استغلال عناصر المنصة المحمية دون إذن مسبق، باستثناء ما يسمح به القانون.",
            "قد يحتوي المحتوى المنشور على المنصة على مواد مملوكة لأطراف أخرى. احترم حقوق أصحابها.",
          ],
        },
        {
          id: "third-party",
          title: "10. الروابط والخدمات الخارجية",
          content: [
            "قد تتضمن المنصة روابط إلى مواقع أو خدمات تابعة لأطراف خارجية. تُقدَّم هذه الروابط للتسهيل فقط، ولا نتحكم بالضرورة في محتوى تلك الخدمات أو ممارساتها.",
            "يخضع استخدام الخدمات الخارجية لشروطها وسياسات الخصوصية الخاصة بها.",
          ],
        },
        {
          id: "disclaimer",
          title: "11. إخلاء المسؤولية وحدودها",
          content: [
            "تُقدَّم المنصة ومحتوياتها على أساس «كما هي» و«حسب التوافر»، بالقدر الذي يسمح به القانون.",
            "لا نضمن دقة كل وصفة أو اكتمالها أو ملاءمتها لغرض معين، ولا نضمن أن استخدام المنصة سيحقق نتائج محددة.",
            "إلى الحد الذي يسمح به القانون، لا تتحمل KinFeast المسؤولية عن الأضرار غير المباشرة أو التبعية الناتجة عن استخدام المنصة. ولا تستبعد هذه الشروط أي مسؤولية لا يجوز استبعادها قانونًا.",
          ],
        },
        {
          id: "termination",
          title: "12. تعليق الحسابات وإنهاؤها",
          content: [
            "يجوز لنا تقييد الوصول إلى الحساب أو تعليقه أو إنهاؤه عند انتهاك هذه الشروط أو القانون أو عند وجود مخاطر أمنية أو إساءة استخدام، مع مراعاة المتطلبات القانونية المعمول بها.",
            "يمكنك التوقف عن استخدام المنصة في أي وقت. وقد تبقى بعض البيانات أو المحتويات محفوظة عندما يكون ذلك مطلوبًا أو مسموحًا به قانونًا.",
          ],
        },
        {
          id: "changes",
          title: "13. التعديلات على الشروط",
          content: [
            "قد نحدّث هذه الشروط لتوضيح خدماتنا أو عكس التغييرات التشغيلية أو القانونية. ويُعد نشر النسخة المحدثة على هذه الصفحة وسيلة لإبلاغ المستخدمين بالتغييرات.",
            "استمرارك في استخدام المنصة بعد سريان التعديلات يعني استخدامك لها وفق الشروط المحدثة، بالقدر الذي يسمح به القانون.",
          ],
        },
        {
          id: "law",
          title: "14. القانون المعمول به",
          content: [
            "تخضع هذه الشروط للقوانين المعمول بها في الاختصاص القضائي ذي الصلة، دون الانتقاص من أي حقوق إلزامية يتمتع بها المستخدم بموجب القانون.",
            "إذا تعذر تنفيذ أي بند من هذه الشروط قانونًا، تظل البنود الأخرى سارية بالقدر الذي يسمح به القانون.",
          ],
        },
        {
          id: "contact",
          title: "15. التواصل معنا",
          content: [
            "إذا كانت لديك أسئلة حول شروط الاستخدام هذه، فيمكنك التواصل مع فريق KinFeast من خلال صفحة الاتصال.",
          ],
        },
      ]
    : [
        {
          id: "acceptance",
          title: "1. Acceptance of These Terms",
          content: [
            "By accessing, browsing, or creating an account on KinFeast, you agree to these Terms of Use. If you do not agree, please do not use the platform.",
            "We may update these terms from time to time. Updated terms will be published on this page with a revised last-updated date.",
          ],
        },
        {
          id: "eligibility",
          title: "2. Eligibility and Accounts",
          content: [
            "You must provide accurate information when creating an account and keep it reasonably up to date. You are responsible for safeguarding your login credentials and activity conducted through your account.",
            "Do not impersonate another person, provide misleading information, or use another person's account without permission. Contact us if you suspect unauthorized access to your account.",
          ],
        },
        {
          id: "platform",
          title: "3. The KinFeast Platform",
          content: [
            "KinFeast provides a platform for discovering and sharing recipes, exploring ingredients, learning about chefs, and engaging with a food-loving community.",
            "Features may change, be suspended, or become temporarily unavailable. We do not guarantee uninterrupted or error-free availability.",
          ],
        },
        {
          id: "content",
          title: "4. Recipes and User Content",
          content: [
            "The platform may contain recipes, photographs, ingredient information, cooking instructions, reviews, and other content submitted by users or chefs.",
            "You are responsible for the content you submit and must have the rights needed to share it. Do not post copied, deceptive, unlawful, or infringing material.",
            "By submitting content, you grant KinFeast a non-exclusive, worldwide, royalty-free license to host, display, format, reproduce, and distribute that content as reasonably necessary to operate and promote the platform. This license remains subject to your legal rights and the rights of other parties.",
            "We may remove content that violates these terms, our community guidelines, or applicable law, or that presents a risk to users.",
          ],
        },
        {
          id: "chefs",
          title: "5. Chefs and Contributors",
          content: [
            "Chefs and contributors must provide honest information about themselves, their recipes, and their experience. Misleading claims about qualifications, ingredients, or expected results are not permitted.",
            "The appearance of a recipe or chef profile on KinFeast does not necessarily mean that we have independently verified or endorsed every statement it contains.",
          ],
        },
        {
          id: "reviews",
          title: "6. Reviews and Community Interaction",
          content: [
            "Ratings and reviews should reflect genuine experiences and remain relevant and respectful. Fake reviews, rating manipulation, harassment, and abusive behavior are prohibited.",
            "We may review or remove interactions that violate these rules.",
          ],
        },
        {
          id: "safety",
          title: "7. Food Safety and Informational Disclaimer",
          content: [
            "Recipes, nutritional information, and cooking guidance are provided for general informational purposes only. They are not a substitute for professional medical, dietary, or other expert advice.",
            "Ingredients, preparation methods, cooking times, equipment, and results can vary. Always verify ingredient safety, proper doneness, and appropriate cooking temperatures, and follow recognized food-safety guidance.",
            "You are responsible for considering food allergies, dietary restrictions, and cross-contact risks. Do not assume a recipe is free from allergens unless you have independently verified this.",
          ],
        },
        {
          id: "prohibited",
          title: "8. Prohibited Uses",
          content: [
            "You may not use KinFeast for unlawful purposes, attempt unauthorized access to accounts or systems, or interfere with the operation or security of the platform.",
            "Prohibited conduct includes uploading malicious code, sending spam, collecting user data without permission, infringing intellectual property, threatening or harassing others, and publishing fraudulent content.",
            "You may not use automated tools to access or extract platform content in a manner that disrupts the service or violates applicable law or these terms.",
          ],
        },
        {
          id: "intellectual-property",
          title: "9. Intellectual Property",
          content: [
            "Rights in the KinFeast name, logo, design, software, and original platform elements belong to their respective rights holders and are protected by applicable law.",
            "You may not copy, redistribute, or commercially exploit protected platform materials without prior permission, except where the law allows.",
            "Content on the platform may include material owned by third parties. You must respect their rights.",
          ],
        },
        {
          id: "third-party",
          title: "10. Third-Party Links and Services",
          content: [
            "KinFeast may link to third-party websites or services for convenience. We do not necessarily control or endorse their content, policies, or practices.",
            "Your use of third-party services is governed by their own terms and privacy policies.",
          ],
        },
        {
          id: "disclaimer",
          title: "11. Disclaimers and Limitation of Liability",
          content: [
            "To the extent permitted by law, the platform and its content are provided on an “as is” and “as available” basis.",
            "We do not guarantee that every recipe is accurate, complete, suitable for a particular purpose, or capable of producing a specific result.",
            "To the extent permitted by law, KinFeast will not be liable for indirect or consequential losses arising from use of the platform. Nothing in these terms excludes liability that cannot legally be excluded.",
          ],
        },
        {
          id: "termination",
          title: "12. Account Suspension and Termination",
          content: [
            "We may restrict, suspend, or terminate access to an account if these terms or applicable law are violated, or where security risks or abuse require action, subject to applicable legal requirements.",
            "You may stop using the platform at any time. Certain information or content may be retained where required or permitted by law.",
          ],
        },
        {
          id: "changes",
          title: "13. Changes to These Terms",
          content: [
            "We may revise these terms to clarify our services or reflect operational or legal changes. Publishing the revised terms on this page is one way we notify users.",
            "Where permitted by law, continued use of the platform after revised terms take effect constitutes use under the updated terms.",
          ],
        },
        {
          id: "law",
          title: "14. Governing Law and Severability",
          content: [
            "These terms are subject to the laws applicable in the relevant jurisdiction, without limiting any mandatory rights you may have under applicable law.",
            "If any provision is found unenforceable, the remaining provisions will continue to apply to the extent permitted by law.",
          ],
        },
        {
          id: "contact",
          title: "15. Contact Us",
          content: [
            "If you have questions about these Terms of Use, please contact the KinFeast team through our Contact Us page.",
          ],
        },
      ];

  const pageText = isArabic
    ? {
        badge: "المعلومات القانونية",
        title: "شروط",
        highlight: "الاستخدام",
        intro:
          "يرجى قراءة هذه الشروط بعناية لفهم القواعد التي تنظم استخدامك لمنصة KinFeast.",
        updated: "آخر تحديث: 23 أكتوبر 2026",
        contents: "محتويات الصفحة",
        important: "مهم أن تعرف",
        safety:
          "الوصفات والمعلومات الغذائية لأغراض عامة فقط. تحقّق دائمًا من سلامة الطعام ومسببات الحساسية ودرجات الطهي المناسبة.",
        back: "العودة إلى الصفحة الرئيسية",
        contact: "تواصل معنا",
        note: "هذه الشروط نموذج عام وليست استشارة قانونية. ينبغي مراجعتها بما يتوافق مع نشاط المنصة والقانون المطبق قبل النشر.",
      }
    : {
        badge: "LEGAL INFORMATION",
        title: "Terms of",
        highlight: "Use",
        intro:
          "Please read these terms carefully to understand the rules that apply when you use KinFeast.",
        updated: "Last updated: October 23, 2026",
        contents: "On this page",
        important: "A quick but important note",
        safety:
          "Recipes and nutrition information are general guidance only. Always check food safety, allergens, and appropriate cooking temperatures.",
        back: "Back to home",
        contact: "Contact us",
        note: "These terms are a general template, not legal advice. Review them against your actual platform operations and applicable law before publication.",
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
              <FileText size={15} />
              {pageText.badge}
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {pageText.title}{" "}
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                {pageText.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {pageText.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-2 dark:border-stone-700 dark:bg-stone-900/70">
                <CheckCircle2 size={16} className="text-orange-500" />
                {pageText.updated}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-2 dark:border-stone-700 dark:bg-stone-900/70">
                <BookOpen size={16} className="text-orange-500" />
                {sections.length} {isArabic ? "قسمًا" : "sections"}
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
                <BookOpen size={18} className="text-orange-500" />
                {pageText.contents}
              </h2>

              <nav aria-label={pageText.contents} className="space-y-1">
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
                <ShieldAlert size={18} className="text-orange-600 dark:text-orange-400" />
                {pageText.important}
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                {pageText.safety}
              </p>
            </div>
          </aside>

          <article className="min-w-0 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-start gap-4 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                <Utensils size={22} />
              </div>
              <div>
                <h2 className="font-bold text-stone-900 dark:text-white">
                  {isArabic
                    ? "مرحبًا بك في KinFeast"
                    : "Welcome to KinFeast"}
                </h2>
                <p className="mt-1 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {isArabic
                    ? "هدفنا هو جعل اكتشاف الوصفات ومشاركتها تجربة ممتعة ومسؤولة للجميع."
                    : "Our goal is to make discovering and sharing recipes an enjoyable and responsible experience for everyone."}
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
                    {section.content.map((paragraph, index) => (
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
                      {pageText.contact}
                      <Arrow size={17} />
                    </Link>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800/50">
              <p className="text-xs leading-6 text-stone-500 dark:text-stone-400">
                {pageText.note}
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
            {pageText.back}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default TermsPage;
