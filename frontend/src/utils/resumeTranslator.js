const exactEnAr = {
  "frontend developer": "مطور واجهات أمامية",
  "front end developer": "مطور واجهات أمامية",
  "backend developer": "مطور خلفيات برمجية",
  "back end developer": "مطور خلفيات برمجية",
  "full stack developer": "مطور متكامل",
  "software engineer": "مهندس برمجيات",
  "software developer": "مطور برمجيات",
  "web developer": "مطور ويب",
  "ui designer": "مصمم واجهات مستخدم",
  "ux designer": "مصمم تجربة مستخدم",
  "ui/ux designer": "مصمم واجهات وتجربة مستخدم",
  "graphic designer": "مصمم جرافيك",
  "project manager": "مدير مشاريع",
  "product manager": "مدير منتج",
  accountant: "محاسب",
  "sales manager": "مدير مبيعات",
  "sales representative": "مندوب مبيعات",
  "marketing manager": "مدير تسويق",
  "digital marketing specialist": "أخصائي تسويق رقمي",
  "human resources manager": "مدير موارد بشرية",
  "hr manager": "مدير موارد بشرية",
  "customer service representative": "ممثل خدمة عملاء",
  "data analyst": "محلل بيانات",
  "business analyst": "محلل أعمال",
  "data scientist": "عالم بيانات",
  teacher: "مدرس",
  "civil engineer": "مهندس مدني",
  "mechanical engineer": "مهندس ميكانيك",
  "electrical engineer": "مهندس كهرباء",
  architect: "مهندس معماري",
  "operations manager": "مدير عمليات",
  "office manager": "مدير مكتب",
  "administrative assistant": "مساعد إداري",
  "content writer": "كاتب محتوى",
  "social media manager": "مدير وسائل التواصل الاجتماعي",
  "bachelor of science": "بكالوريوس علوم",
  "bachelor of arts": "بكالوريوس آداب",
  "bachelor degree": "درجة البكالوريوس",
  "master degree": "درجة الماجستير",
  "high school diploma": "شهادة الثانوية العامة",
  present: "حتى الآن",
  current: "حالي",
  fluent: "بطلاقة",
  native: "اللغة الأم",
  professional: "احترافي",
  intermediate: "متوسط",
  beginner: "مبتدئ",
  advanced: "متقدم",
};

const exactArEn = Object.fromEntries(
  Object.entries(exactEnAr).map(([k, v]) => [
    v,
    k.replace(/\b\w/g, (c) => c.toUpperCase()),
  ]),
);

const skillMap = {
  javascript: "جافاسكربت",
  typescript: "تايب سكربت",
  "vue.js": "Vue.js",
  vue: "Vue.js",
  react: "React",
  "react.js": "React",
  "node.js": "Node.js",
  node: "Node.js",
  html: "HTML",
  css: "CSS",
  sass: "Sass",
  git: "Git",
  github: "GitHub",
  "rest api": "واجهات REST API",
  "rest apis": "واجهات REST API",
  "responsive design": "التصميم المتجاوب",
  figma: "Figma",
  photoshop: "Photoshop",
  illustrator: "Illustrator",
  excel: "Excel",
  "microsoft excel": "Microsoft Excel",
  "power bi": "Power BI",
  sql: "SQL",
  python: "Python",
  java: "Java",
  "c#": "C#",
  communication: "التواصل",
  leadership: "القيادة",
  teamwork: "العمل الجماعي",
  "problem solving": "حل المشكلات",
  "project management": "إدارة المشاريع",
  "time management": "إدارة الوقت",
  "customer service": "خدمة العملاء",
  sales: "المبيعات",
  marketing: "التسويق",
  "digital marketing": "التسويق الرقمي",
  seo: "SEO",
  accounting: "المحاسبة",
  "financial reporting": "التقارير المالية",
  "data analysis": "تحليل البيانات",
  "microsoft office": "Microsoft Office",
};
const skillMapArEn = Object.fromEntries(
  Object.entries(skillMap).map(([k, v]) => [
    v,
    k.replace(/\b\w/g, (c) => c.toUpperCase()),
  ]),
);

// Keep free-form prose intact unless we have a safe whole-phrase mapping.
// Translating connector words (and/with/for/using) creates mixed-language CV text,
// so translation is intentionally conservative until a real translation service is connected.
const phrasesEnAr = [
  ["professional summary", "الملخص المهني"],
  ["work experience", "الخبرات العملية"],
  ["professional experience", "الخبرات المهنية"],
  ["employment history", "السجل الوظيفي"],
  ["cross-functional teams", "فرق متعددة التخصصات"],
  ["quality assurance", "ضمان الجودة"],
  ["business requirements", "متطلبات العمل"],
  ["user experience", "تجربة المستخدم"],
  ["web applications", "تطبيقات الويب"],
  ["best practices", "أفضل الممارسات"],
];

const phrasesArEn = [
  ["الملخص المهني", "Professional Summary"],
  ["الخبرات العملية", "Work Experience"],
  ["الخبرات المهنية", "Professional Experience"],
  ["السجل الوظيفي", "Employment History"],
  ["فرق متعددة التخصصات", "cross-functional teams"],
  ["ضمان الجودة", "quality assurance"],
  ["متطلبات العمل", "business requirements"],
  ["تجربة المستخدم", "user experience"],
  ["تطبيقات الويب", "web applications"],
  ["أفضل الممارسات", "best practices"],
];

function preserveCaseReplacement(text, from, to) {
  return text.replace(
    new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
    to,
  );
}

function translateText(text = "", target = "ar") {
  if (!text || typeof text !== "string") return text;
  const trimmed = text.trim();
  if (!trimmed) return text;
  const lower = trimmed.toLowerCase();
  if (target === "ar" && exactEnAr[lower]) return exactEnAr[lower];
  if (target === "en" && exactArEn[trimmed]) return exactArEn[trimmed];
  if (target === "ar" && skillMap[lower]) return skillMap[lower];
  if (target === "en" && skillMapArEn[trimmed]) return skillMapArEn[trimmed];
  const pairs = target === "ar" ? phrasesEnAr : phrasesArEn;
  for (const [from, to] of pairs) {
    if (lower === from.toLowerCase()) return to;
  }
  return text;
}

function translatePeriod(period = "", target = "ar") {
  let out = period;
  if (target === "ar")
    out = out
      .replace(/present|current/gi, "حتى الآن")
      .replace(/\bto\b/gi, "إلى");
  else
    out = out.replace(/حتى الآن|حالي(?:اً)?/g, "Present").replace(/إلى/g, "to");
  return out;
}

export function translateResume(resume = {}, target = "ar") {
  const r = JSON.parse(JSON.stringify(resume || {}));
  r.language = target;
  r.personal = r.personal || {};
  r.personal.title = translateText(r.personal.title || "", target);
  r.personal.summary = translateText(r.personal.summary || "", target);
  r.experience = (r.experience || []).map((x) => ({
    ...x,
    role: translateText(x.role || "", target),
    company: x.company || "",
    period: translatePeriod(x.period || "", target),
    description: translateText(x.description || "", target),
  }));
  r.education = (r.education || []).map((x) => ({
    ...x,
    degree: translateText(x.degree || "", target),
    school: x.school || "",
    period: translatePeriod(x.period || "", target),
  }));
  r.skills = (r.skills || []).map((x) => translateText(x, target));
  r.projects = (r.projects || []).map((x) => ({
    ...x,
    name: translateText(x.name || "", target),
    description: translateText(x.description || "", target),
  }));
  r.languages = (r.languages || []).map((x) => ({
    ...x,
    name: translateText(x.name || "", target),
    level: translateText(x.level || "", target),
  }));
  return r;
}

export function detectResumeLanguage(resume = {}) {
  const text = JSON.stringify(resume);
  const ar = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const en = (text.match(/[A-Za-z]/g) || []).length;
  return ar > en * 0.35 ? "ar" : "en";
}

export function translationCoverage(original = {}, translated = {}) {
  const before = JSON.stringify(original);
  const after = JSON.stringify(translated);
  const beforeArabic = (before.match(/[\u0600-\u06FF]/g) || []).length;
  const afterArabic = (after.match(/[\u0600-\u06FF]/g) || []).length;
  if (after === before) return 0;
  if (afterArabic > beforeArabic)
    return Math.min(
      100,
      Math.round(
        40 + ((afterArabic - beforeArabic) / Math.max(1, before.length)) * 450,
      ),
    );
  return 75;
}
