const dictionaries = {
  en: () => import("../dictionaries/en.json").then((r) => r.default),
  hi: () => import("../dictionaries/hi.json").then((r) => r.default),
  ar: () => import("../dictionaries/ar.json").then((r) => r.default),
  ja: () => import("../dictionaries/ja.json").then((r) => r.default),
};

export const getDictionary = (lang) => {
  return dictionaries[lang]();
};
