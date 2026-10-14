// All copy and data for the site lives here, in English and Spanish. Edit this file to update the CV website.

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export const CONTACT = {
  name: "Gerónimo Díaz De Rosa",
  role: "Head of Marketing & Sales",
  email: "gerodiazdr@gmail.com",
  phone: "+54 11 4190 3865",
  phoneHref: "tel:+541141903865",
  linkedin: "linkedin.com/in/geronimo-diaz-de-rosa",
  linkedinHref: "https://www.linkedin.com/in/geronimo-diaz-de-rosa",
} as const;

export const MAILTO = `mailto:${CONTACT.email}`;

// Downloadable CVs. Files live in /public/cv — names must match exactly (Vercel is case-sensitive).
export const CV_FILES: Record<Lang, string> = {
  en: "/cv/Geronimo-Diaz-De-Rosa-CV-EN.pdf",
  es: "/cv/Geronimo-Diaz-De-Rosa-CV-ES.pdf",
};

export type ShapeKind = "diamond" | "quarter" | "tri" | "sq" | "circ";
export type StageId = "position" | "create" | "grow" | "build" | "automate";

export type Stage = {
  id: StageId;
  n: string;
  verb: string;
  name: string;
  shape: ShapeKind;
  desc: string;
  tools: string[];
};

export type Role = {
  id: string;
  company: string;
  role: string;
  dates: string;
  year: string;
  stages: StageId[];
  bullets: string[];
};

export type Milestone = { from: number; to: number; suffix: string; text: string; source: string };

export type UIStrings = {
  langName: string;
  nav: {
    system: string;
    experience: string;
    contact: string;
    download: string;
  };
  hero: {
    pill: string;
    lead: string;
    email: string;
    download: string;
    kicker: string;
    inner1: string;
    inner2: string;
    cue: string;
  };
  statement: {
    label: string;
    system: string;
  };
  story: {
    title: string;
    usedAt: string;
    tools: string;
  };
  milestones: {
    title: string;
  };
  experience: {
    title: string;
    earlier: string;
  };
  contact: {
    title: string;
    label: string;
    copy: string;
    copied: string;
    copyFail: string;
    copiedSr: string;
    email: string;
    download: string;
    altCv: string;
    location: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    contact: string;
    cv: string;
    cvEn: string;
    cvEs: string;
    top: string;
    language: string;
    rights: string;
  };
};

export type Content = {
  lang: Lang;
  ui: UIStrings;
  statement: string;
  stages: Stage[];
  roles: Role[];
  milestones: Milestone[];
};

// Spanish copy keeps "brand" and "growth" in English on purpose (industry vocabulary).
const UI: Record<Lang, UIStrings> = {
  "en": {
    "langName": "English",
    "nav": {
      "system": "System",
      "experience": "Experience",
      "contact": "Contact",
      "download": "Download CV"
    },
    "hero": {
      "pill": "Head of Marketing & Sales · Brand & Growth",
      "lead": "I position B2B brands, give them a place in the market and build the system that makes them grow.",
      "email": "Email me",
      "download": "Download CV",
      "kicker": "Position · Create · Grow · Build · Automate",
      "inner1": "From brand to growth.",
      "inner2": "One system.",
      "cue": "Scroll to enter"
    },
    "statement": {
      "label": "What I do",
      "system": "The system"
    },
    "story": {
      "title": "From brand to growth",
      "usedAt": "Used at",
      "tools": "tools"
    },
    "milestones": {
      "title": "Milestones"
    },
    "experience": {
      "title": "Experience",
      "earlier": "Earlier"
    },
    "contact": {
      "title": "Let’s build your next launch.",
      "label": "Get in touch",
      "copy": "Copy email",
      "copied": "Copied",
      "copyFail": "Select to copy",
      "copiedSr": "Email copied to clipboard",
      "email": "Email me",
      "download": "Download CV",
      "altCv": "CV en español (PDF)",
      "location": "Buenos Aires · Remote"
    },
    "footer": {
      "tagline": "Brand, content and growth, built as one system.",
      "navigate": "Navigate",
      "contact": "Contact",
      "cv": "CV",
      "cvEn": "English (PDF)",
      "cvEs": "Español (PDF)",
      "top": "Back to top",
      "language": "Language",
      "rights": "Built in Buenos Aires."
    }
  },
  "es": {
    "langName": "Español",
    "nav": {
      "system": "Sistema",
      "experience": "Experiencia",
      "contact": "Contacto",
      "download": "Descargar CV"
    },
    "hero": {
      "pill": "Head of Marketing & Sales · Brand & Growth",
      "lead": "Posiciono brands B2B, les doy un lugar en el mercado y construyo el sistema de growth que las impulsa.",
      "email": "Escribime",
      "download": "Descargar CV",
      "kicker": "Posicionamiento · Contenido · Growth · Producto · Automatización",
      "inner1": "De brand a growth.",
      "inner2": "Un solo sistema.",
      "cue": "Deslizá para entrar"
    },
    "statement": {
      "label": "Qué hago",
      "system": "El sistema"
    },
    "story": {
      "title": "De brand a growth",
      "usedAt": "Lo apliqué en",
      "tools": "herramientas"
    },
    "milestones": {
      "title": "Hitos"
    },
    "experience": {
      "title": "Experiencia",
      "earlier": "Anteriores"
    },
    "contact": {
      "title": "Construyamos tu próximo lanzamiento.",
      "label": "Contacto",
      "copy": "Copiar email",
      "copied": "Copiado",
      "copyFail": "Seleccioná para copiar",
      "copiedSr": "Email copiado al portapapeles",
      "email": "Escribime",
      "download": "Descargar CV",
      "altCv": "CV in English (PDF)",
      "location": "Buenos Aires · Remoto"
    },
    "footer": {
      "tagline": "Brand, contenido y growth, construidos como un solo sistema.",
      "navigate": "Navegar",
      "contact": "Contacto",
      "cv": "CV",
      "cvEn": "English (PDF)",
      "cvEs": "Español (PDF)",
      "top": "Volver arriba",
      "language": "Idioma",
      "rights": "Hecho en Buenos Aires."
    }
  }
};

const STAGES: Record<Lang, Stage[]> = {
  en: [
  {
    "id": "position",
    "n": "01",
    "verb": "Position",
    "name": "Brand & Positioning",
    "shape": "diamond",
    "desc": "Define what the brand stands for and the space it owns in the market.",
    "tools": [
      "Brand strategy",
      "Positioning & messaging",
      "Market & competitor research",
      "Value proposition",
      "Brand identity (Figma, Adobe)"
    ]
  },
  {
    "id": "create",
    "n": "02",
    "verb": "Create",
    "name": "Content & Storytelling",
    "shape": "quarter",
    "desc": "Create the content that earns attention and keeps the brand in the conversation.",
    "tools": [
      "Content strategy",
      "Social media & community",
      "Copywriting & storytelling",
      "Editorial calendar",
      "SEO content"
    ]
  },
  {
    "id": "grow",
    "n": "03",
    "verb": "Grow",
    "name": "Growth & GTM",
    "shape": "tri",
    "desc": "Take the product to market, open channels and fill the pipeline.",
    "tools": [
      "GTM strategy & launches",
      "Paid search & social",
      "SEO / AEO",
      "CRO & A/B testing",
      "Outbound & partnerships"
    ]
  },
  {
    "id": "build",
    "n": "04",
    "verb": "Build",
    "name": "Web & Product",
    "shape": "sq",
    "desc": "Design and ship the web products the funnel runs on.",
    "tools": [
      "Web app design (UX/UI)",
      "React · Next.js",
      "Supabase",
      "Figma",
      "Landing pages"
    ]
  },
  {
    "id": "automate",
    "n": "05",
    "verb": "Automate",
    "name": "AI, Data & CRM",
    "shape": "circ",
    "desc": "Automate repetitive work with AI and measure what actually moves revenue.",
    "tools": [
      "AI agents & N8N workflows",
      "LLM APIs · Claude Code",
      "HubSpot · Apollo · Zoho",
      "Python · SQL · Power BI",
      "CAC / LTV dashboards"
    ]
  }
],
  es: [
  {
    "id": "position",
    "n": "01",
    "verb": "Posicionamiento",
    "name": "Brand y posicionamiento",
    "shape": "diamond",
    "desc": "Definir qué representa el brand y el espacio que ocupa en el mercado.",
    "tools": [
      "Brand strategy",
      "Posicionamiento y mensajes",
      "Investigación de mercado y competencia",
      "Propuesta de valor",
      "Brand identity (Figma, Adobe)"
    ]
  },
  {
    "id": "create",
    "n": "02",
    "verb": "Contenido",
    "name": "Contenido y storytelling",
    "shape": "quarter",
    "desc": "Crear el contenido que gana atención y mantiene al brand en la conversación.",
    "tools": [
      "Estrategia de contenido",
      "Redes sociales y comunidad",
      "Copywriting y storytelling",
      "Calendario editorial",
      "Contenido SEO"
    ]
  },
  {
    "id": "grow",
    "n": "03",
    "verb": "Growth",
    "name": "Growth y GTM",
    "shape": "tri",
    "desc": "Llevar el producto al mercado, abrir canales y llenar el pipeline.",
    "tools": [
      "Estrategia GTM y lanzamientos",
      "Paid search y social",
      "SEO / AEO",
      "CRO y A/B testing",
      "Outbound y alianzas"
    ]
  },
  {
    "id": "build",
    "n": "04",
    "verb": "Producto",
    "name": "Web y producto",
    "shape": "sq",
    "desc": "Diseñar y lanzar los productos web sobre los que corre el funnel.",
    "tools": [
      "Diseño de web apps (UX/UI)",
      "React · Next.js",
      "Supabase",
      "Figma",
      "Landing pages"
    ]
  },
  {
    "id": "automate",
    "n": "05",
    "verb": "Automatización",
    "name": "IA, datos y CRM",
    "shape": "circ",
    "desc": "Automatizar el trabajo repetitivo con IA y medir lo que realmente mueve los ingresos.",
    "tools": [
      "Agentes de IA y workflows en N8N",
      "APIs de LLM · Claude Code",
      "HubSpot · Apollo · Zoho",
      "Python · SQL · Power BI",
      "Dashboards de CAC / LTV"
    ]
  }
],
};

const ROLES: Record<Lang, Role[]> = {
  en: [
  {
    "id": "ingenii",
    "company": "Ingenii",
    "role": "Head of Sales & Marketing",
    "dates": "May 2025 — Present",
    "year": "2025",
    "stages": [
      "position",
      "grow",
      "build",
      "automate"
    ],
    "bullets": [
      "Led positioning and GTM for 4 products launched from zero, as the main owner of strategy and execution.",
      "Own revenue and pipeline targets across LinkedIn, Google and email campaigns.",
      "Opened new acquisition channels through strategic commercial partnerships.",
      "Build AI workflows that automate research, outreach and data enrichment across the GTM."
    ]
  },
  {
    "id": "tekne",
    "company": "Tekne",
    "role": "Head of Marketing & Growth",
    "dates": "Jan 2025 — Present",
    "year": "2025",
    "stages": [
      "grow",
      "build",
      "automate"
    ],
    "bullets": [
      "Lead full-funnel B2B growth for a U.S.-based data company: paid acquisition, A/B testing and CRO.",
      "Implemented CRM automations and dashboards tracking CAC, LTV and conversion by stage.",
      "Designed and built web products: the bootcamp platform and the corporate site redesign."
    ]
  },
  {
    "id": "rockindev",
    "company": "RockinDev",
    "role": "Head of Marketing",
    "dates": "Jul 2024 — Jan 2025",
    "year": "2024",
    "stages": [
      "create",
      "grow",
      "automate"
    ],
    "bullets": [
      "Built the marketing function from scratch: SEO, SEM, content and lead generation.",
      "Automated B2B outbound workflows that cut prospecting time and scaled sales output.",
      "Opened new verticals through partnerships with agencies and tech companies."
    ]
  },
  {
    "id": "trovatrip",
    "company": "TrovaTrip",
    "role": "Business Development",
    "dates": "Mar — Jul 2024",
    "year": "2024",
    "stages": [
      "grow",
      "automate"
    ],
    "bullets": [
      "Scaled the outbound pipeline with new outreach strategies and HubSpot CRM optimization.",
      "Built automated prospecting flows with custom scraping logic to grow qualified lead volume."
    ]
  },
  {
    "id": "sumate",
    "company": "Súmate Marketing Digital",
    "role": "Product Owner",
    "dates": "Sep 2022 — Oct 2023",
    "year": "2022",
    "stages": [
      "build",
      "automate"
    ],
    "bullets": [
      "Defined the product roadmap from customer feedback and usage analytics.",
      "Ran cross-functional sprints across design, engineering and marketing."
    ]
  },
  {
    "id": "orange",
    "company": "Orange Social",
    "role": "Growth / B2B Marketing Manager",
    "dates": "Aug 2021 — Sep 2022",
    "year": "2021",
    "stages": [
      "create",
      "grow",
      "automate"
    ],
    "bullets": [
      "Led an integrated growth team across design, paid media and account management.",
      "Built industry- and persona-based prospecting flows, unifying marketing and sales.",
      "Set up data-driven reporting for real-time campaign optimization."
    ]
  },
  {
    "id": "sm",
    "company": "SM Agency for Brands",
    "role": "Founder / Director",
    "dates": "Jun 2020 — Feb 2022",
    "year": "2020",
    "stages": [
      "create",
      "grow"
    ],
    "bullets": [
      "Founded and led a growth-focused digital agency with a diverse client portfolio.",
      "Ran Google and Meta performance campaigns focused on pipeline and ROAS."
    ]
  },
  {
    "id": "hilton",
    "company": "Hilton Pilar",
    "role": "Marketing Coordinator",
    "dates": "Jun 2018 — Jul 2021",
    "year": "2018",
    "stages": [
      "position",
      "create",
      "grow"
    ],
    "bullets": [
      "Led the hotel's launch from the ground up across digital acquisition and organic growth.",
      "Grew the community from zero to 40K+ organic followers in 3 years through strategic content.",
      "Built co-branding partnerships, events and activations with local brands."
    ]
  }
],
  es: [
  {
    "id": "ingenii",
    "company": "Ingenii",
    "role": "Head of Sales & Marketing",
    "dates": "May 2025 — Actual",
    "year": "2025",
    "stages": [
      "position",
      "grow",
      "build",
      "automate"
    ],
    "bullets": [
      "Lideré el posicionamiento y el GTM de 4 productos lanzados desde cero, como responsable de estrategia y ejecución.",
      "Responsable de los objetivos de revenue y pipeline con campañas en LinkedIn, Google y email.",
      "Abrí nuevos canales de adquisición mediante alianzas comerciales estratégicas.",
      "Construyo workflows con IA que automatizan research, outreach y enriquecimiento de datos en todo el GTM."
    ]
  },
  {
    "id": "tekne",
    "company": "Tekne",
    "role": "Head of Marketing & Growth",
    "dates": "Ene 2025 — Actual",
    "year": "2025",
    "stages": [
      "grow",
      "build",
      "automate"
    ],
    "bullets": [
      "Lidero el growth B2B full-funnel de una empresa de datos de EE.UU.: adquisición paga, A/B testing y CRO.",
      "Implementé automatizaciones de CRM y dashboards de CAC, LTV y conversión por etapa.",
      "Diseñé y desarrollé productos web: la plataforma del bootcamp y el rediseño del sitio corporativo."
    ]
  },
  {
    "id": "rockindev",
    "company": "RockinDev",
    "role": "Head of Marketing",
    "dates": "Jul 2024 — Ene 2025",
    "year": "2024",
    "stages": [
      "create",
      "grow",
      "automate"
    ],
    "bullets": [
      "Armé el área de marketing desde cero en una software factory: SEO, SEM, contenido y generación de leads.",
      "Automaticé workflows de outbound B2B que redujeron el tiempo de prospección y escalaron las ventas.",
      "Abrí nuevas verticales con alianzas con agencias y empresas tecnológicas."
    ]
  },
  {
    "id": "trovatrip",
    "company": "TrovaTrip",
    "role": "Business Development",
    "dates": "Mar — Jul 2024",
    "year": "2024",
    "stages": [
      "grow",
      "automate"
    ],
    "bullets": [
      "Escalé el pipeline outbound con nuevas estrategias de outreach y optimización de HubSpot.",
      "Construí flujos de prospección automatizados con scraping a medida para sumar leads calificados."
    ]
  },
  {
    "id": "sumate",
    "company": "Súmate Marketing Digital",
    "role": "Product Owner",
    "dates": "Sep 2022 — Oct 2023",
    "year": "2022",
    "stages": [
      "build",
      "automate"
    ],
    "bullets": [
      "Definí el roadmap de producto a partir del feedback de clientes y los datos de uso.",
      "Coordiné sprints entre diseño, desarrollo y marketing."
    ]
  },
  {
    "id": "orange",
    "company": "Orange Social",
    "role": "Growth / B2B Marketing Manager",
    "dates": "Ago 2021 — Sep 2022",
    "year": "2021",
    "stages": [
      "create",
      "grow",
      "automate"
    ],
    "bullets": [
      "Lideré un equipo de growth integrado: diseño, paid media y gestión de cuentas.",
      "Armé flujos de prospección por industria y buyer persona, unificando marketing y ventas.",
      "Implementé reportes basados en datos para optimizar campañas en tiempo real."
    ]
  },
  {
    "id": "sm",
    "company": "SM Agency for Brands",
    "role": "Fundador / Director",
    "dates": "Jun 2020 — Feb 2022",
    "year": "2020",
    "stages": [
      "create",
      "grow"
    ],
    "bullets": [
      "Fundé y dirigí una agencia digital enfocada en growth, con una cartera de clientes diversa.",
      "Campañas de performance en Google y Meta enfocadas en pipeline y ROAS."
    ]
  },
  {
    "id": "hilton",
    "company": "Hilton Pilar",
    "role": "Coordinador de Marketing",
    "dates": "Jun 2018 — Jul 2021",
    "year": "2018",
    "stages": [
      "position",
      "create",
      "grow"
    ],
    "bullets": [
      "Lideré el lanzamiento del hotel desde cero: adquisición digital y growth orgánico.",
      "Llevé la comunidad de 0 a 40K+ seguidores orgánicos en 3 años con contenido estratégico.",
      "Armé alianzas de co-branding, eventos y activaciones con brands locales."
    ]
  }
],
};

const STATEMENT: Record<Lang, string> = {
  "en": "I position brands, create the content that earns them a place in the market, and build the system that makes them grow.",
  "es": "Posiciono brands, creo el contenido que les gana un lugar en el mercado y construyo el sistema de growth que las impulsa."
};

const MILESTONES: Record<Lang, Milestone[]> = {
  "en": [
    {
      "from": 0,
      "to": 4,
      "suffix": "",
      "text": "Products launched to market from zero, as GTM lead",
      "source": "Ingenii"
    },
    {
      "from": 0,
      "to": 40,
      "suffix": "K+",
      "text": "Organic community built from zero with content, in 3 years",
      "source": "Hilton Pilar"
    },
    {
      "from": 2000,
      "to": 2020,
      "suffix": "",
      "text": "Founded and ran a growth-focused digital agency",
      "source": "SM Agency for Brands"
    }
  ],
  "es": [
    {
      "from": 0,
      "to": 4,
      "suffix": "",
      "text": "Productos lanzados al mercado desde cero, como líder de GTM",
      "source": "Ingenii"
    },
    {
      "from": 0,
      "to": 40,
      "suffix": "K+",
      "text": "Comunidad orgánica construida desde cero con contenido, en 3 años",
      "source": "Hilton Pilar"
    },
    {
      "from": 2000,
      "to": 2020,
      "suffix": "",
      "text": "Fundé y dirigí una agencia digital enfocada en growth",
      "source": "SM Agency for Brands"
    }
  ]
};

export function getContent(lang: Lang): Content {
  return {
    lang,
    ui: UI[lang],
    statement: STATEMENT[lang],
    stages: STAGES[lang],
    roles: ROLES[lang],
    milestones: MILESTONES[lang],
  };
}

export function companiesForStage(content: Content, id: StageId): string[] {
  return content.roles.filter((r) => r.stages.includes(id)).map((r) => r.company);
}
