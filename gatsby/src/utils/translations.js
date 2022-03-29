const defaultLocale = 'en';

const strings = {
  titles: {
    services: { en: 'Services', es: 'Servicios' },
    projects: { en: 'Projects', es: 'Proyectos' },
    whatsOn: { en: "What's On", es: 'Eventos' },
    getInTouch: { en: 'Get In Touch', es: 'Contáctanos' },
  },
  cta: {
    connectWithUs: { en: 'Connect with us', es: 'Contáctanos' },
    seePastProjects: { en: 'See Past Projects', es: 'Ver proyectos pasados' },
  },
  lists: {
    services: {
      es: ["relaciones públicas", "estrategia de medios", "consultoría de comunicación", "marketing de influencers", "experiencia y recorrido del cliente ", "roducción de eventos", "marketing digital", "estrategia de redes sociales", "gestión de comunidades", "creación de contenidos", "coolhunting", "branding", "diseño web", "expansión de mercados", "alianzas estratégicas", "scent branding" - "ventas y estrategia"],
      en: ["public relations", "media strategy", "communications consulting", "influencer marketing", "customer journey and experience", "event production", "digital marketing", "social media strategy", "community management", "content creation", "coolhunting", "branding", "web design", "market expansion", "strategic alliances", "scent branding", "sales and strategy"]
    }
  },
  messages: {
    errorNotFound: {en: "Sorry! We couldn't find that page.", es: "Lo sentimos! No se pudo encontrar esa página."}
  }
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
