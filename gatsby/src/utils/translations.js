const defaultLocale = 'en';

const strings = {
  titles: {
    pastProjects: { en: 'Past Projects', es: 'Proyectos pasados' },
  },
  cta: {
    send: { en: 'send', es: 'enviar' },
    sending: { en: 'sending...', es: 'enviando...' },
  },
};

export const tr = (type, key, locale) => {
  if (!strings[type]) {
    console.log(`String type not found in translations: ${type}`);
    return key;
  }
  if (!strings[type][key]) {
    console.log(`Word/phrase not found in translations: ${key}`);
    return key;
  }
  return strings[type][key][locale || defaultLocale];
}
