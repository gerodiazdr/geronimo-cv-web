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
  visual: "timeline" | "web" | "office";
  tag: string;
  title: string;
  one: string;
  context: string;
  did: string[];
  results: string[];
  labels: Record<string, string>;
  office?: OfficeDetail;
};

// Outbound Office: the featured case, with its video, how the Content floor works and what it ships.
export type OfficeRole = { name: string; kind: "agent" | "robot" | "person"; does: string; gives: string };
export type OfficeRoom = { name: string; roles: OfficeRole[]; note?: string };
export type OfficeChannel = { name: string; type: string; searchable: boolean; format: string; traits: string[] };
export type OfficeDetail = {
  video: { loop: string; loopPoster: string; full: string; fullPoster: string };
  stats: Fact[];
  sources: string[];
  channels: string[];
  caption: string;
  lede: string;
  flow: {
    title: string;
    sub: string;
    legend: { agent: string; robot: string; gives: string; givesSample: string };
    sourcesTitle: string;
    sourceGroups: { name: string; feeds: string; items: string[] }[];
    baseline: string;
    signals: string;
    rooms: OfficeRoom[];
    rulesLabel: string;
    rules: string[];
    sales: string;
  };
  output: { title: string; sub: string; channels: OfficeChannel[]; commonLabel: string; common: string[]; note: string };
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
      "sub": "Three projects, end to end.",
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
      "sub": "Tres proyectos, de punta a punta.",
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

// Outbound Office videos, in /public/cases/outbound-office: a 15 s loop for the card and the 41 s demo for the case.
const OFFICE_VIDEO = {
  loop: "/cases/outbound-office/loop.mp4",
  loopPoster: "/cases/outbound-office/loop.jpg",
  full: "/cases/outbound-office/demo.mp4",
  fullPoster: "/cases/outbound-office/demo.jpg",
};

const CASES: Record<Lang, CaseStudy[]> = {
  "en": [
    {
      "id": "office",
      "visual": "office",
      "tag": "Tekne · Automate + Grow",
      "title": "An office of AI agents you can watch",
      "one": "AI agents with their own desks that run outbound campaigns and deliver a content brief every week. Nothing ships without a person's OK.",
      "context": "Tekne wanted AI agents on two jobs: running outbound campaigns on Apollo and researching what to talk about each week. A log tells you something failed; an office shows you who is waiting on whom.",
      "did": [
        "Designed the office as floors, Sales and Content, on one engine",
        "Split the work into 12 single-task stations: 8 AI agents and 4 robots",
        "Set the rules: every number sourced, nothing generic, a person approves",
        "Built the pixel-art scene that mirrors the real state of the database"
      ],
      "results": [
        "2 floors running: Sales and Content",
        "1 brief a week, with ideas per vertical and their sources",
        "From idea to a working office in 2 weeks"
      ],
      "labels": {
        "window": "outbound office · Content floor",
        "demo": "demo · 41 s",
        "watch": "Video · 41 s",
        "videoLabel": "Video of the Content floor at work",
        "sources": "Sources",
        "channels": "Ships to"
      },
      "office": {
        "video": OFFICE_VIDEO,
        "stats": [
          { "value": "12", "label": "stations: 8 AI agents and 4 robots" },
          { "value": "2", "label": "floors: Sales and Content" },
          { "value": "2 wks", "label": "from idea to a working office" }
        ],
        "sources": ["Search Console", "Google Trends", "Hacker News", "Reddit", "GitHub", "RSS"],
        "channels": ["Blog", "LinkedIn", "Instagram", "Newsletter"],
        "caption": "It opens with the editor-in-chief waiting for you to approve the brand map. Then the listening robots bring in 32 signals, the Radar weighs two spikes and the idea “AI agents for SMBs” moves from Strategy to Development, on its way to Review.",
        "lede": "A building where every agent has a desk, every task is a folder and no decision ships without a person's OK.",
        "flow": {
          "title": "How it works",
          "sub": "Each station does one thing and hands the folder to the next. The only way out is your desk.",
          "legend": { "agent": "AI agent", "robot": "robot: code, no language model", "gives": "what it hands to the next station", "givesSample": "→ output" },
          "sourcesTitle": "Sources · where the signals come from",
          "sourceGroups": [
            { "name": "Searches", "feeds": "→ Search tracker", "items": ["Search Console", "Google Trends", "Google and YouTube autocomplete"] },
            { "name": "Ideas and trends", "feeds": "→ Trend tracker", "items": ["Hacker News", "Reddit", "GitHub", "RSS"] }
          ],
          "baseline": "They compare the last 7 days against a 28-day baseline and flag the spikes.",
          "signals": "signals",
          "rooms": [
            {
              "name": "Listening",
              "roles": [
                { "name": "Search tracker", "kind": "robot", "does": "Runs each seed through the search sources.", "gives": "Signals" },
                { "name": "Trend tracker", "kind": "robot", "does": "Reads the trend sources and flags spikes against the baseline.", "gives": "Signals and spike alerts" }
              ],
              "note": "runs on its own, once a day"
            },
            {
              "name": "Analysis",
              "roles": [
                { "name": "Radar", "kind": "agent", "does": "Labels each trend as a wave, a current or seasonal, and spots topics that rise in English before they reach Spanish.", "gives": "Trends" },
                { "name": "Cartographer", "kind": "agent", "does": "Normalizes keywords, tags intent, audience and vertical, and groups them into clusters.", "gives": "Keywords and clusters" }
              ]
            },
            {
              "name": "Archive",
              "roles": [
                { "name": "Archivist", "kind": "robot", "does": "Keeps what was published and the memory of ideas. Flags duplicates, topics in cooldown and pages ranking 8 to 20.", "gives": "Flagged candidates" }
              ]
            },
            {
              "name": "Strategy",
              "roles": [
                { "name": "Strategist", "kind": "agent", "does": "Turns each candidate into an idea: thesis, bridge, original angle and evidence.", "gives": "Idea core" },
                { "name": "Router", "kind": "agent", "does": "Sets the channel, format and voice, and whether the idea is searchable or shareable.", "gives": "Idea with a destination" },
                { "name": "SERP researcher", "kind": "agent", "does": "Searchable ideas only: checks what ranks today and whether the search can be won.", "gives": "Feasibility verdict" }
              ]
            },
            {
              "name": "Development",
              "roles": [
                { "name": "Briefer", "kind": "agent", "does": "Writes the short development: hook, structure, anchor, CTA and spin-offs. It doesn't write the piece.", "gives": "Developed idea" }
              ]
            },
            {
              "name": "Review",
              "roles": [
                { "name": "Editorial reviewer", "kind": "agent", "does": "Runs the checklist: evidence, bridge, original angle, nothing generic and no banned topics.", "gives": "Idea ready or dropped" }
              ],
              "note": "↺ sends it back to Strategy up to 2 times; on the third, drops it with a reason"
            },
            {
              "name": "Production",
              "roles": [
                { "name": "Compiler", "kind": "robot", "does": "Builds the brief from the database, scores it and validates the evidence.", "gives": "Brief" }
              ]
            },
            {
              "name": "Editorial direction",
              "roles": [
                { "name": "Editor-in-chief", "kind": "agent", "does": "Drafts the brand map you approve and writes the brief's executive summary.", "gives": "Brand map and summary" }
              ]
            },
            {
              "name": "Your desk",
              "roles": [
                { "name": "A person on the team", "kind": "person", "does": "You approve, reject with a reason, change the channel or hand the idea to Sales.", "gives": "Decisions" }
              ]
            }
          ],
          "rulesLabel": "Rules",
          "rules": ["Every number has a source", "If another company could publish it, it goes back", "No signal, no ideas", "A person approves"],
          "sales": "The Sales floor follows the same pattern with its own stations: Research, Signals, Prospecting, Writer and Reviewer, on Apollo."
        },
        "output": {
          "title": "What ships",
          "sub": "Every week a brief ships with ideas per vertical: data, development, careers, best practices and tech trends. The Router gives each idea a channel, a format and a voice, and the idea arrives ready for that channel.",
          "channels": [
            { "name": "Blog", "type": "searchable", "searchable": true, "format": "Guide or opinion piece", "traits": ["Main and secondary keywords, with their search intent", "SERP verdict: what ranks today, what it lacks and whether it can be won", "Structure in H2s"] },
            { "name": "LinkedIn", "type": "shareable", "searchable": false, "format": "Post or carousel", "traits": ["Travels through the conversation: never marked searchable", "If it's a carousel, the structure goes in slides", "If it takes a stance, someone credible on the topic signs it, with 3 questions for the signer"] },
            { "name": "Instagram", "type": "shareable", "searchable": false, "format": "Carousel or short video", "traits": ["Carousel: the structure goes in slides", "Short video: the structure goes in moments", "Can ship as a spin-off of another idea, like a blog guide"] },
            { "name": "Newsletter", "type": "shareable", "searchable": false, "format": "Note for “Data & IA, sin ruido”", "traits": ["Travels through the community, not search", "Serves the community goal: new subscribers every month", "Ships on Substack"] }
          ],
          "commonLabel": "Every output carries",
          "common": ["Thesis", "Why now: 1 to 3 data points with source and date", "Bridge to what the company does", "Original angle", "Hook", "Structure in 3 to 5 points", "CTA by goal", "1 to 3 spin-off pieces", "Expiry date or evergreen"],
          "note": "The office ships the idea ready for its channel. Writing the full piece comes next, in the Writing room."
        }
      }
    },
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
      "id": "office",
      "visual": "office",
      "tag": "Tekne · Automatización + Growth",
      "title": "Una oficina de agentes de IA que se puede mirar",
      "one": "Agentes con escritorio propio que arman campañas de outbound y un brief de contenido por semana. Nada sale sin el OK de una persona.",
      "context": "Tekne quería sumar agentes de IA a dos trabajos: correr campañas de outbound sobre Apollo e investigar de qué hablar cada semana. Un log te dice que algo falló; una oficina te muestra quién está esperando a quién.",
      "did": [
        "Diseñé la oficina por pisos, Ventas y Contenido, sobre un mismo motor",
        "Partí el trabajo en 12 puestos de una sola tarea: 8 agentes de IA y 4 robots",
        "Definí las reglas: cada dato con fuente, nada genérico, aprueba una persona",
        "Armé la escena en pixel art que refleja el estado real de la base"
      ],
      "results": [
        "2 pisos funcionando: Ventas y Contenido",
        "1 brief por semana, con ideas por vertical y su fuente",
        "De la idea a la oficina andando en 2 semanas"
      ],
      "labels": {
        "window": "outbound office · piso Contenido",
        "demo": "demo · 41 s",
        "watch": "Video · 41 s",
        "videoLabel": "Video del piso Contenido trabajando",
        "sources": "Fuentes",
        "channels": "Sale para"
      },
      "office": {
        "video": OFFICE_VIDEO,
        "stats": [
          { "value": "12", "label": "puestos: 8 agentes de IA y 4 robots" },
          { "value": "2", "label": "pisos: Ventas y Contenido" },
          { "value": "2 sem.", "label": "de la idea a la oficina andando" }
        ],
        "sources": ["Search Console", "Google Trends", "Hacker News", "Reddit", "GitHub", "RSS"],
        "channels": ["Blog", "LinkedIn", "Instagram", "Newsletter"],
        "caption": "Arranca con la Editora en jefe esperando que apruebes el brand map. Después los robots de Escucha traen 32 señales, el Radar evalúa dos picos y la idea «agentes de IA en pymes» avanza de Estrategia a Desarrollo, rumbo a Revisión.",
        "lede": "Un edificio donde cada agente tiene escritorio, cada tarea es una carpeta y ninguna decisión sale sin el OK de una persona.",
        "flow": {
          "title": "Cómo funciona",
          "sub": "Cada puesto hace una sola cosa y le pasa la carpeta al siguiente. La única salida es tu escritorio.",
          "legend": { "agent": "agente de IA", "robot": "robot: código sin modelo de lenguaje", "gives": "lo que pasa al puesto siguiente", "givesSample": "→ entrega" },
          "sourcesTitle": "Fuentes · de dónde salen las señales",
          "sourceGroups": [
            { "name": "Búsquedas", "feeds": "→ Rastreador de búsquedas", "items": ["Search Console", "Google Trends", "Autocompletado de Google y YouTube"] },
            { "name": "Ideas y tendencias", "feeds": "→ Rastreador de tendencias", "items": ["Hacker News", "Reddit", "GitHub", "RSS"] }
          ],
          "baseline": "Comparan los últimos 7 días contra una base de 28 y marcan los picos.",
          "signals": "señales",
          "rooms": [
            {
              "name": "Escucha",
              "roles": [
                { "name": "Rastreador de búsquedas", "kind": "robot", "does": "Corre cada semilla por las fuentes de búsqueda.", "gives": "Señales" },
                { "name": "Rastreador de tendencias", "kind": "robot", "does": "Lee las fuentes de tendencias y marca los picos contra la línea de base.", "gives": "Señales y alertas de pico" }
              ],
              "note": "corre sola, 1 vez por día"
            },
            {
              "name": "Análisis",
              "roles": [
                { "name": "Radar", "kind": "agent", "does": "Clasifica cada tendencia como ola, corriente o estacional, y detecta temas que suben en inglés antes de llegar al español.", "gives": "Tendencias" },
                { "name": "Cartógrafa", "kind": "agent", "does": "Normaliza keywords, les asigna intención, audiencia y vertical, y las agrupa en clusters.", "gives": "Keywords y clusters" }
              ]
            },
            {
              "name": "Archivo",
              "roles": [
                { "name": "Archivista", "kind": "robot", "does": "Guarda lo publicado y la memoria de ideas. Marca duplicados, temas en cooldown y páginas en posición 8 a 20.", "gives": "Candidatas marcadas" }
              ]
            },
            {
              "name": "Estrategia",
              "roles": [
                { "name": "Estratega", "kind": "agent", "does": "Convierte cada candidata en una idea: tesis, puente, aporte propio y evidencia.", "gives": "Núcleo de la idea" },
                { "name": "Ruteadora", "kind": "agent", "does": "Define canal, formato, voz y si la idea es buscable o compartible.", "gives": "Idea con destino" },
                { "name": "Investigadora de SERP", "kind": "agent", "does": "Sólo en ideas buscables: mira qué rankea hoy y si la búsqueda se puede ganar.", "gives": "Veredicto de factibilidad" }
              ]
            },
            {
              "name": "Desarrollo",
              "roles": [
                { "name": "Briefista", "kind": "agent", "does": "Escribe el desarrollo breve: gancho, estructura, anclaje, CTA y derivadas. No redacta la pieza.", "gives": "Idea desarrollada" }
              ]
            },
            {
              "name": "Revisión",
              "roles": [
                { "name": "Revisor editorial", "kind": "agent", "does": "Aplica el checklist: evidencia, puente, aporte propio, que no sea genérica y que no toque temas vetados.", "gives": "Idea lista o descartada" }
              ],
              "note": "↺ devuelve a Estrategia hasta 2 veces; a la tercera, la descarta con motivo"
            },
            {
              "name": "Producción",
              "roles": [
                { "name": "Compilador", "kind": "robot", "does": "Arma el brief desde la base, calcula los puntajes y valida la evidencia.", "gives": "Brief" }
              ]
            },
            {
              "name": "Dirección editorial",
              "roles": [
                { "name": "Editora en jefe", "kind": "agent", "does": "Arma el brand map que aprobás y escribe el resumen ejecutivo del brief.", "gives": "Brand map y resumen" }
              ]
            },
            {
              "name": "Tu escritorio",
              "roles": [
                { "name": "Una persona del equipo", "kind": "person", "does": "Aprobás, rechazás con motivo, cambiás el canal o pasás la idea a Ventas.", "gives": "Decisiones" }
              ]
            }
          ],
          "rulesLabel": "Reglas",
          "rules": ["Cada dato tiene su fuente", "Si otra empresa podría publicarlo, vuelve", "Sin señal, no hay ideas", "Aprueba una persona"],
          "sales": "El piso Ventas sigue el mismo esquema con sus propios puestos: Research, Signals, Prospecting, Redactora y Revisor, sobre Apollo."
        },
        "output": {
          "title": "Qué sale",
          "sub": "Cada semana sale un brief con ideas por vertical: data, desarrollo, carrera, buenas prácticas y tendencias tech. La Ruteadora le da a cada idea un canal, un formato y una voz, y la idea llega preparada para ese canal.",
          "channels": [
            { "name": "Blog", "type": "buscable", "searchable": true, "format": "Guía o artículo de opinión", "traits": ["Keyword principal y secundarias, con su intención de búsqueda", "Veredicto de SERP: qué rankea hoy, qué le falta y si se puede ganar", "Estructura en H2"] },
            { "name": "LinkedIn", "type": "compartible", "searchable": false, "format": "Post o carrusel", "traits": ["Circula en la conversación: nunca se marca buscable", "Si es carrusel, la estructura va en slides", "Si es de postura, la firma una persona creíble en el tema y trae 3 preguntas para quien firma"] },
            { "name": "Instagram", "type": "compartible", "searchable": false, "format": "Carrusel o video corto", "traits": ["Carrusel: la estructura va en slides", "Video corto: la estructura va en momentos", "Puede salir como derivada de otra idea, por ejemplo de una guía del blog"] },
            { "name": "Newsletter", "type": "compartible", "searchable": false, "format": "Nota para «Data & IA, sin ruido»", "traits": ["Circula en la comunidad, no en el buscador", "Apunta al objetivo comunidad: sumar suscriptores todos los meses", "Sale en Substack"] }
          ],
          "commonLabel": "Toda salida lleva",
          "common": ["Tesis", "Por qué ahora: 1 a 3 datos con fuente y fecha", "Puente con lo que hace la empresa", "Aporte propio", "Gancho", "Estructura de 3 a 5 puntos", "CTA según el objetivo", "1 a 3 piezas derivadas", "Vencimiento o evergreen"],
          "note": "La oficina entrega la idea preparada para su canal. Escribir la pieza completa es lo próximo: la sala de Redacción."
        }
      }
    },
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
