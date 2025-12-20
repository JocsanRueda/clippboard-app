import { LANGUAGES } from "@/constants/constant";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export type Lang= (typeof LANGUAGES)[keyof typeof LANGUAGES];

async function loadLanguage(lang: Lang) {

  const translation = await import(`../locales/${lang}.json`);

  return translation.default;
}

export async function  initLanguage(defaultLang: Lang= LANGUAGES.default) {

  const initialTranslation= await loadLanguage(defaultLang);

  const fallbackTranslation=  defaultLang === LANGUAGES.ENGLISH
    ? initialTranslation: await loadLanguage(LANGUAGES.ENGLISH);

  await i18next
    .use(initReactI18next)
    .init({
      lng: defaultLang,
      fallbackLng:LANGUAGES.ENGLISH,
      resources: {
        [defaultLang]: {
          translation: initialTranslation
        },
        [LANGUAGES.ENGLISH]: {
          translation: fallbackTranslation
        }
      },
      interpolation: {
        escapeValue: false
      }
    }
    );
}

export async function changeLanguage(lang: Lang) {

  if (!i18next.hasResourceBundle(lang, "translation")) {
    const translation= await loadLanguage(lang);
    i18next.addResourceBundle(lang, "translation", translation,true,true);

  }

  await i18next.changeLanguage(lang);
}

export default i18next;
