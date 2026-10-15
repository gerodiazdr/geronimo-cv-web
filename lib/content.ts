// All copy and data for the site lives here, in English and Spanish. Edit this file to update the CV website.
// Spanish copy keeps "brand" and "growth" in English on purpose (industry vocabulary).

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export const CONTACT = {
  name: "Gerónimo Díaz De Rosa",
  shortName: "Gerónimo",
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

export type Stage = { id: StageId; n: string; verb: string; name: string; shape: ShapeKind; desc: string; tools: string[] };
export type Role = { id: string; company: string; role: string; dates: string; year: string; stages: StageId[]; bullets: string[] };
export type Fact = { label: string; value: string };
export type Metric = { value: number; prefix: string; suffix: string; text: string; source: string };
export type CaseStudy = {
  id: string;
  visual: "timeline" | "web";
  tag: string;
  title: string;
  one: string;
  context: string;
  did: string[];
  results: string[];
  labels: Record<string, string>;
};
export type AiFlow = { nodes: [string, string, string][]; log: string[] };

export type UIStrings = {
  nav: {
    system: string;
    work: string;
    experience: string;
    contact: string;
    download: string;
    language: string;
  };
  hero: {
    pill: string;
    lead: string;
    email: string;
    download: string;
    orCopy: string;
    kicker: string;
    inner1: string;
    inner2: string;
    cue: string;
  };
  statement: {
    label: string;
  };
  story: {
    title: string;
    usedAt: string;
    tools: string;
  };
  results: {
    title: string;
    sub: string;
    layers: string;
  };
  work: {
    title: string;
    sub: string;
    read: string;
    close: string;
    context: string;
    did: string;
    results: string;
    dialog: string;
  };
  ai: {
    title: string;
    sub: string;
    logLabel: string;
  };
  experience: {
    title: string;
    sub: string;
    group: string;
    lanesProducts: string;
    lanesServices: string;
    earlier: string;
  };
  exit: {
    kicker: string;
    title: string;
    copy: string;
    copied: string;
    copyFail: string;
    email: string;
    download: string;
    altCv: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    contact: string;
    colophon: string;
    built: string;
    type: string;
    legal: string;
  };
};

export type Content = {
  lang: Lang;
  ui: UIStrings;
  statement: string;
  facts: Fact[];
  stages: Stage[];
  roles: Role[];
  metrics: Metric[];
  cases: CaseStudy[];
  ai: AiFlow;
};

const UI: Record<Lang, UIStrings> = {
  "en": {
    "nav": {
      "system": "System",
      "work": "Work",
      "experience": "Experience",
      "contact": "Contact",
      "download": "Download CV",
      "language": "Language"
    },
    "hero": {
      "pill": "Head of Marketing & Sales · Brand & Growth",
      "lead": "I position B2B brands, give them a place in the market and build the system that makes them grow.",
      "email": "Email me",
      "download": "Download CV",
      "orCopy": "or copy",
      "kicker": "Position · Create · Grow · Build · Automate",
      "inner1": "From brand to growth.",
      "inner2": "One system.",
      "cue": "Scroll to enter"
    },
    "statement": {
      "label": "What I do"
    },
    "story": {
      "title": "From brand to growth",
      "usedAt": "Used at",
      "tools": "tools"
    },
    "results": {
      "title": "From first touch to revenue",
      "sub": "Every stage of the system filters and compounds. This is where it shows up in numbers.",
      "layers": "Brand|Content|Leads|Pipeline|Revenue"
    },
    "work": {
      "title": "Selected work",
      "sub": "Two projects, end to end.",
      "read": "Read the case",
      "close": "Close",
      "context": "Context",
      "did": "What I did",
      "results": "Results",
      "dialog": "Case study"
    },
    "ai": {
      "title": "AI that does the GTM grunt work",
      "sub": "An example of the workflows I build with N8N, LLM APIs and Claude. Scroll to run it.",
      "logLabel": "Run log · illustrative example"
    },
    "experience": {
      "title": "Experience",
      "sub": "Two lanes, one group: Ingenii builds products, Tekne delivers services.",
      "group": "Same group · since 2025",
      "lanesProducts": "products",
      "lanesServices": "services",
      "earlier": "Earlier"
    },
    "exit": {
      "kicker": "Exit through the portal",
      "title": "Let’s build your next launch.",
      "copy": "Copy email",
      "copied": "Copied",
      "copyFail": "Select to copy",
      "email": "Email me",
      "download": "Download CV",
      "altCv": "CV en español (PDF)"
    },
    "footer": {
      "tagline": "Brand, content and growth, built as one system.",
      "navigate": "Navigate",
      "contact": "Contact",
      "colophon": "Colophon",
      "built": "Built with Next.js, Claude Code and Vercel.",
      "type": "Set in Bricolage Grotesque, Geist and DM Mono.",
      "legal": "Buenos Aires"
    }
  },
  "es": {
    "nav": {
      "system": "Sistema",
      "work": "Trabajo",
      "experience": "Experiencia",
      "contact": "Contacto",
      "download": "Descargar CV",
      "language": "Idioma"
    },
    "hero": {
      "pill": "Head of Marketing & Sales · Brand & Growth",
      "lead": "Posiciono brands B2B, les doy un lugar en el mercado y construyo el sistema de growth que las impulsa.",
      "email": "Escribime",
      "download": "Descargar CV",
      "orCopy": "o copiá",
      "kicker": "Posicionamiento · Contenido · Growth · Producto · Automatización",
      "inner1": "De brand a growth.",
      "inner2": "Un solo sistema.",
      "cue": "Deslizá para entrar"
    },
    "statement": {
      "label": "Qué hago"
    },
    "story": {
      "title": "De brand a growth",
      "usedAt": "Lo apliqué en",
      "tools": "herramientas"
    },
    "results": {
      "title": "Del primer contacto a los ingresos",
      "sub": "Cada etapa del sistema filtra y potencia la siguiente. Acá se ve en números.",
      "layers": "Brand|Contenido|Leads|Pipeline|Ingresos"
    },
    "work": {
      "title": "Trabajo seleccionado",
      "sub": "Dos proyectos, de punta a punta.",
      "read": "Ver el caso",
      "close": "Cerrar",
      "context": "Contexto",
      "did": "Qué hice",
      "results": "Resultados",
      "dialog": "Caso"
    },
    "ai": {
      "title": "IA que hace el trabajo pesado del GTM",
      "sub": "Un ejemplo de los workflows que armo con N8N, APIs de LLM y Claude. Deslizá para correrlo.",
      "logLabel": "Registro · ejemplo ilustrativo"
    },
    "experience": {
      "title": "Experiencia",
      "sub": "Dos carriles, un mismo grupo: Ingenii desarrolla productos y Tekne brinda servicios.",
      "group": "Mismo grupo · desde 2025",
      "lanesProducts": "productos",
      "lanesServices": "servicios",
      "earlier": "Anteriores"
    },
    "exit": {
      "kicker": "Salida por el portal",
      "title": "Construyamos tu próximo lanzamiento.",
      "copy": "Copiar email",
      "copied": "Copiado",
      "copyFail": "Seleccioná para copiar",
      "email": "Escribime",
      "download": "Descargar CV",
      "altCv": "CV in English (PDF)"
    },
    "footer": {
      "tagline": "Brand, contenido y growth, construidos como un solo sistema.",
      "navigate": "Navegar",
      "contact": "Contacto",
      "colophon": "Colofón",
      "built": "Hecho con Next.js, Claude Code y Vercel.",
      "type": "Tipografías: Bricolage Grotesque, Geist y DM Mono.",
      "legal": "Buenos Aires"
    }
  }
};

const FACTS: Record<Lang, Fact[]> = {
  "en": [
    {
      "label": "Based",
      "value": "Buenos Aires · UTC−3, overlaps US Eastern"
    },
    {
      "label": "Languages",
      "value": "English C1–C2 · Spanish native"
    },
    {
      "label": "Open to",
      "value": "Head of Marketing / Growth · Remote"
    }
  ],
  "es": [
    {
      "label": "Base",
      "value": "Buenos Aires · UTC−3, superpuesto con el este de EE.UU."
    },
    {
      "label": "Idiomas",
      "value": "Inglés C1–C2 · Español nativo"
    },
    {
      "label": "Abierto a",
      "value": "Head of Marketing / Growth · Remoto"
    }
  ]
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
      "SEO / GEO",
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
      "SEO / GEO",
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
      "Own revenue and pipeline targets across Meta, LinkedIn, Google and email campaigns, driving +20 sales meetings a week.",
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
      "Designed and built web products: the bootcamp platform (Mercado Pago payments, +50 paying students) and the corporate site redesign."
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
      "Responsable de los objetivos de revenue y pipeline con campañas en Meta, LinkedIn, Google y email: +20 reuniones de ventas por semana.",
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
      "Diseñé y desarrollé productos web: la plataforma del bootcamp (pagos con Mercado Pago, +50 alumnos pagos) y el rediseño del sitio corporativo."
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

// Metrics shown in the "From first touch to revenue" funnel. Keep them defensible: you will be asked how each was measured.
const METRICS: Record<Lang, Metric[]> = {
  "en": [
    {
      "value": 200,
      "prefix": "+$",
      "suffix": "K",
      "text": "Pipeline generated across the group",
      "source": "Ingenii + Tekne · since 2025"
    },
    {
      "value": 35,
      "prefix": "−",
      "suffix": "%",
      "text": "CAC reduction through A/B-tested campaigns",
      "source": "Ingenii"
    },
    {
      "value": 20,
      "prefix": "+",
      "suffix": "",
      "text": "Sales meetings booked per week",
      "source": "Ingenii"
    },
    {
      "value": 4,
      "prefix": "",
      "suffix": "",
      "text": "Products launched to market from zero",
      "source": "Ingenii"
    },
    {
      "value": 50,
      "prefix": "+",
      "suffix": "",
      "text": "Paying students at the bootcamp launch",
      "source": "Tekne"
    },
    {
      "value": 40,
      "prefix": "",
      "suffix": "K+",
      "text": "Organic community built with content",
      "source": "Hilton Pilar"
    }
  ],
  "es": [
    {
      "value": 200,
      "prefix": "+$",
      "suffix": "K",
      "text": "Pipeline generado en el grupo",
      "source": "Ingenii + Tekne · desde 2025"
    },
    {
      "value": 35,
      "prefix": "−",
      "suffix": "%",
      "text": "Reducción de CAC con campañas testeadas A/B",
      "source": "Ingenii"
    },
    {
      "value": 20,
      "prefix": "+",
      "suffix": "",
      "text": "Reuniones de ventas por semana",
      "source": "Ingenii"
    },
    {
      "value": 4,
      "prefix": "",
      "suffix": "",
      "text": "Productos lanzados al mercado desde cero",
      "source": "Ingenii"
    },
    {
      "value": 50,
      "prefix": "+",
      "suffix": "",
      "text": "Alumnos pagos en el lanzamiento del bootcamp",
      "source": "Tekne"
    },
    {
      "value": 40,
      "prefix": "",
      "suffix": "K+",
      "text": "Comunidad orgánica construida con contenido",
      "source": "Hilton Pilar"
    }
  ]
};

const CASES: Record<Lang, CaseStudy[]> = {
  "en": [
    {
      "id": "products",
      "visual": "timeline",
      "tag": "Ingenii · Position + Grow",
      "title": "Taking 4 products from zero to market",
      "one": "Positioning, launch campaigns and fast iteration for the group's product company. +20 sales meetings a week.",
      "context": "Ingenii is the product company of the group: it builds software products and takes them to market. Each launch needed a position, a message and a pipeline from day one.",
      "did": [
        "Defined positioning and messaging for each product",
        "Ran paid media on Meta, LinkedIn and Google, plus email",
        "A/B tested messages, audiences and landing pages",
        "Iterated fast on 2 products to fit industry needs",
        "Built AI workflows for research, outreach and enrichment"
      ],
      "results": [
        "4 products taken from zero to market",
        "2 products iterated fast to fit their industry",
        "+20 sales meetings booked per week",
        "−35% CAC through continuous A/B testing"
      ],
      "labels": {
        "axis": "0|MVP|Launch|Market",
        "product": "Product",
        "iterate": "↻ iterate"
      }
    },
    {
      "id": "platforms",
      "visual": "web",
      "tag": "Tekne · Build + Automate",
      "title": "A bootcamp platform and a site built to be found",
      "one": "Bootcamp platform with Mercado Pago payments and a corporate site rebuilt for SEO and GEO.",
      "context": "Tekne is the group's consultancy. It needed a platform to sell and run its data bootcamp, and a corporate site that search engines and AI assistants can find.",
      "did": [
        "Designed and built the bootcamp platform (Next.js)",
        "Integrated Mercado Pago for payments",
        "Restructured navigation and indexation for SEO and GEO",
        "Built an optimized workflow to publish blog content"
      ],
      "results": [
        "Bootcamp launched with payments: +50 paying students",
        "Better navigation and site indexation for SEO and GEO",
        "A repeatable content workflow for the blog"
      ],
      "labels": {
        "appUrl": "bootcamp · platform",
        "siteUrl": "corporate site",
        "pay": "Pay with Mercado Pago",
        "students": "+50 students",
        "geo": "Indexed · cited in AI answers"
      }
    }
  ],
  "es": [
    {
      "id": "products",
      "visual": "timeline",
      "tag": "Ingenii · Posicionamiento + Growth",
      "title": "Llevar 4 productos de cero al mercado",
      "one": "Posicionamiento, campañas de lanzamiento e iteración rápida para la empresa de productos del grupo. +20 reuniones de ventas por semana.",
      "context": "Ingenii es la empresa de productos del grupo: desarrolla software y lo lleva al mercado. Cada lanzamiento necesitaba un posicionamiento, un mensaje y un pipeline desde el día uno.",
      "did": [
        "Definí el posicionamiento y los mensajes de cada producto",
        "Corrí paid media en Meta, LinkedIn y Google, más email",
        "Testeé A/B mensajes, audiencias y landing pages",
        "Iteré rápido 2 productos para ajustarlos a su industria",
        "Armé workflows con IA para research, outreach y enriquecimiento"
      ],
      "results": [
        "4 productos llevados de cero al mercado",
        "2 productos iterados para ajustarse a su industria",
        "+20 reuniones de ventas por semana",
        "−35% de CAC con A/B testing continuo"
      ],
      "labels": {
        "axis": "0|MVP|Lanzamiento|Mercado",
        "product": "Producto",
        "iterate": "↻ iterar"
      }
    },
    {
      "id": "platforms",
      "visual": "web",
      "tag": "Tekne · Producto + Automatización",
      "title": "Una plataforma de bootcamp y un sitio hecho para ser encontrado",
      "one": "Plataforma de bootcamp con pagos por Mercado Pago y un sitio corporativo rehecho para SEO y GEO.",
      "context": "Tekne es la consultora del grupo. Necesitaba una plataforma para vender y dictar su bootcamp de datos, y un sitio corporativo que encuentren tanto los buscadores como los asistentes de IA.",
      "did": [
        "Diseñé y desarrollé la plataforma del bootcamp (Next.js)",
        "Integré Mercado Pago para los pagos",
        "Reestructuré la navegación y la indexación para SEO y GEO",
        "Armé un workflow optimizado para publicar contenido en el blog"
      ],
      "results": [
        "Bootcamp lanzado con pagos: +50 alumnos pagos",
        "Mejor navegación e indexación del sitio para SEO y GEO",
        "Un workflow repetible de contenido para el blog"
      ],
      "labels": {
        "appUrl": "bootcamp · plataforma",
        "siteUrl": "sitio corporativo",
        "pay": "Pagar con Mercado Pago",
        "students": "+50 alumnos",
        "geo": "Indexado · citado en respuestas de IA"
      }
    }
  ]
};

// Illustrative example of an AI GTM workflow (labelled as such on the page).
const AI: Record<Lang, AiFlow> = {
  "en": {
    "nodes": [
      [
        "Trigger",
        "New target account",
        "HubSpot list"
      ],
      [
        "Research",
        "Company + buying signals",
        "LLM · web"
      ],
      [
        "Enrich",
        "Contacts and firmographics",
        "Apollo"
      ],
      [
        "Personalize",
        "Hook and angle per account",
        "Claude"
      ],
      [
        "Outreach",
        "Email + LinkedIn sequence",
        "N8N"
      ],
      [
        "Learn",
        "Deal, notes and next step",
        "HubSpot"
      ]
    ],
    "log": [
      "→ Acme Data · 120 employees · Series A · reporting stack in Excel",
      "→ Signal: hiring 2 data analysts · new VP Finance",
      "→ 3 contacts found · VP Finance, Head of Data, CFO",
      "→ Hook: “Your board deck in 3 clicks, not 3 days”",
      "→ Sequence queued: email day 1 · LinkedIn day 3 · email day 6",
      "→ Deal created in HubSpot · next step: discovery call"
    ]
  },
  "es": {
    "nodes": [
      [
        "Disparador",
        "Nueva cuenta objetivo",
        "Lista de HubSpot"
      ],
      [
        "Research",
        "Empresa y señales de compra",
        "LLM · web"
      ],
      [
        "Enriquecer",
        "Contactos y firmografía",
        "Apollo"
      ],
      [
        "Personalizar",
        "Gancho y ángulo por cuenta",
        "Claude"
      ],
      [
        "Outreach",
        "Secuencia de email + LinkedIn",
        "N8N"
      ],
      [
        "Aprender",
        "Deal, notas y próximo paso",
        "HubSpot"
      ]
    ],
    "log": [
      "→ Acme Data · 120 empleados · Serie A · reporting en Excel",
      "→ Señal: busca 2 data analysts · nuevo VP de Finanzas",
      "→ 3 contactos encontrados · VP de Finanzas, Head of Data, CFO",
      "→ Gancho: “Tu reporte de directorio en 3 clics, no en 3 días”",
      "→ Secuencia programada: email día 1 · LinkedIn día 3 · email día 6",
      "→ Deal creado en HubSpot · próximo paso: llamada de discovery"
    ]
  }
};

export function getContent(lang: Lang): Content {
  return {
    lang,
    ui: UI[lang],
    statement: STATEMENT[lang],
    facts: FACTS[lang],
    stages: STAGES[lang],
    roles: ROLES[lang],
    metrics: METRICS[lang],
    cases: CASES[lang],
    ai: AI[lang],
  };
}

export function companiesForStage(content: Content, id: StageId): string[] {
  return content.roles.filter((r) => r.stages.includes(id)).map((r) => r.company);
}
