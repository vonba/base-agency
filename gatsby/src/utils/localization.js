import { enUS, es } from 'date-fns/locale';

const formattingLocales = { en: enUS, es };

export const getFormattingLocale = (languageCode) =>
  formattingLocales[languageCode];

export const createLocaleTextGetter = (languageCode) => {
  const languages = [languageCode, 'en']; // last language in array is default;
  const localize = (value) => {
    if (Array.isArray(value)) {
      return value.map((v) => localize(v, languages));
    }
    if (typeof value === 'object' && value !== null) {
      if (/^locale[A-Z]/.test(value._type)) {
        const language = languages.find((lang) => value[lang]);
        // If there is a className field, attach this
        if (value.className && value._type === 'localeBlock') {
          return value[language].map((v) => ({
            className: value.className,
            ...v,
          }));
        }
        return value[language];
      }

      return Object.keys(value).reduce((result, key) => {
        result[key] = localize(value[key], languages);
        return result;
      }, {});
    }
    return value;
  };

  return localize;
};
