/* ==========================================================================
   Netraa.ai — editable business data
   --------------------------------------------------------------------------
   Every price on the site comes from this file. All figures are INDICATIVE
   self-pay estimates in USD and must be refreshed with real partner-hospital
   quotes before launch (see LAUNCH.md). Market research: see MARKETS.md.
   ========================================================================== */

window.NETRAA = {
  /* Where quote requests are sent. Create a free form at https://formspree.io
     and paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
     Leave empty to run the form in demo mode. */
  formEndpoint: "",

  /* WhatsApp Business number, international format, digits only. */
  whatsapp: "910000000000",
  email: "care@netraa.ai",

  /* Site languages. Translations live in js/i18n.js. */
  languages: [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" }
  ],

  /* us = typical US self-pay price, in = India base price (Bengaluru tier).
     nights = typical total stay in India incl. recovery before flying home.
     Names are translated in js/i18n.js under "t.<id>". */
  treatments: [
    { id: "knee",      cat: "ortho",    us: 40000,  in: 5500,  nights: 14 },
    { id: "hip",       cat: "ortho",    us: 42000,  in: 6500,  nights: 14 },
    { id: "spine",     cat: "ortho",    us: 110000, in: 8000,  nights: 18 },
    { id: "cabg",      cat: "cardiac",  us: 123000, in: 6500,  nights: 21 },
    { id: "angio",     cat: "cardiac",  us: 32000,  in: 4000,  nights: 7  },
    { id: "valve",     cat: "cardiac",  us: 150000, in: 8500,  nights: 21 },
    { id: "ivf",       cat: "fertility",us: 18000,  in: 3200,  nights: 21 },
    { id: "liver",     cat: "transplant",us: 550000,in: 35000, nights: 60 },
    { id: "kidney",    cat: "transplant",us: 300000,in: 15000, nights: 45 },
    { id: "prostate",  cat: "onco",     us: 45000,  in: 9000,  nights: 14 },
    { id: "cataract",  cat: "eye",      us: 5000,   in: 900,   nights: 5  },
    { id: "lasik",     cat: "eye",      us: 4500,   in: 1100,  nights: 4  },
    { id: "implant",   cat: "dental",   us: 4500,   in: 750,   nights: 7  },
    { id: "fullmouth", cat: "dental",   us: 45000,  in: 7000,  nights: 14 },
    { id: "sleeve",    cat: "bariatric",us: 22000,  in: 5000,  nights: 10 },
    { id: "rhino",     cat: "cosmetic", us: 9000,   in: 2500,  nights: 10 },
    { id: "checkup",   cat: "wellness", us: 3500,   in: 300,   nights: 3  }
  ],

  /* Target markets, in priority order (see MARKETS.md).
     tier 1 = long waits or high costs + strong middle class + English-speaking.
     factor = private self-pay price relative to the US.
     fx = units of local currency per 1 USD (approximate — update before launch).
     flight = typical economy return fare to India, USD.
     stat/unit + wait text (js/i18n.js "wait.<code>") explain why patients travel.
     Country names are localised automatically by the browser. */
  countries: [
    { code: "GB", tier: 1, cur: "GBP", fx: 0.76, factor: 0.45, flight: 800,  stat: "7.3M",  unit: "",      src: { name: "NHS England RTT data, 2026", url: "https://www.bma.org.uk/advice-and-support/nhs-delivery-and-workforce/pressures/nhs-backlog-data-analysis" } },
    { code: "CA", tier: 1, cur: "CAD", fx: 1.38, factor: 0.60, flight: 1400, stat: "28.6",  unit: "weeks", src: { name: "Fraser Institute, 2025", url: "https://www.fraserinstitute.org/studies/waiting-your-turn-wait-times-for-health-care-in-canada-2025" } },
    { code: "US", tier: 1, cur: "USD", fx: 1,    factor: 1.00, flight: 1300, stat: "25%",   unit: "",      src: { name: "Commonwealth Fund survey", url: "https://www.healthcarefinancenews.com/news/almost-quarter-americans-underinsured-survey-finds" } },
    { code: "AU", tier: 1, cur: "AUD", fx: 1.52, factor: 0.60, flight: 1100, stat: "~8",    unit: "months",src: { name: "AIHW elective surgery data", url: "https://www.aihw.gov.au/hospitals/topics/elective-surgery/waiting-times-by-patient-characteristics" } },
    { code: "IE", tier: 1, cur: "EUR", fx: 0.90, factor: 0.45, flight: 850,  stat: "620k+", unit: "",      src: { name: "NTPF, 2025", url: "https://www.ntpf.ie" } },
    { code: "NZ", tier: 1, cur: "NZD", fx: 1.68, factor: 0.55, flight: 1300, stat: "35%",   unit: "",      src: { name: "NZ Government targets, 2026", url: "https://www.dpmc.govt.nz/sites/default/files/2026-06/gt-factsheet-target-2-mar26.pdf" } },
    { code: "SG", tier: 2, cur: "SGD", fx: 1.30, factor: 0.60, flight: 450,  stat: "35",    unit: "days",  src: { name: "Singapore MOH", url: "https://www.moh.gov.sg/newsroom/wait-time-for-primary-c/" } },
    { code: "AE", tier: 2, cur: "AED", fx: 3.67, factor: 0.50, flight: 350,  stat: "3–4",   unit: "flight", wait: "GULF" },
    { code: "SA", tier: 2, cur: "SAR", fx: 3.75, factor: 0.45, flight: 450,  stat: "4–5",   unit: "flight", wait: "GULF" },
    { code: "QA", tier: 2, cur: "QAR", fx: 3.64, factor: 0.50, flight: 400,  stat: "4",     unit: "flight", wait: "GULF" },
    { code: "KW", tier: 2, cur: "KWD", fx: 0.31, factor: 0.45, flight: 400,  stat: "4",     unit: "flight", wait: "GULF" },
    { code: "OM", tier: 2, cur: "OMR", fx: 0.385,factor: 0.40, flight: 300,  stat: "3",     unit: "flight", wait: "GULF" },
    { code: "ES", tier: 3, cur: "EUR", fx: 0.90, factor: 0.35, flight: 800,  stat: "121",   unit: "days",  src: { name: "Ministerio de Sanidad, 2025", url: "https://es.euronews.com/salud/2026/04/16/un-nuevo-record-mas-de-853000-personas-esperan-una-operacion-en-espana" } },
    { code: "IT", tier: 3, cur: "EUR", fx: 0.90, factor: 0.40, flight: 750,  stat: "87",    unit: "days",  src: { name: "Facile.it survey, 2025", url: "https://www.9colonne.it/588873/italy-s-public-healthcare-in-crisis" } },
    { code: "FR", tier: 3, cur: "EUR", fx: 0.90, factor: 0.40, flight: 800,  stat: "40%+",  unit: "",      src: { name: "OECD Health at a Glance 2025", url: "https://www.euronews.com/health/2026/06/03/waiting-times-for-healthcare-in-europe-the-worst-countries-ranked" } }
  ],

  /* Price multiplier for each Indian metro, relative to the base price.
     Notes are translated under "city.<id>". */
  cities: [
    { id: "delhi",     name: "Delhi NCR", factor: 1.10 },
    { id: "mumbai",    name: "Mumbai",    factor: 1.18 },
    { id: "bengaluru", name: "Bengaluru", factor: 1.00 },
    { id: "chennai",   name: "Chennai",   factor: 0.93 },
    { id: "hyderabad", name: "Hyderabad", factor: 0.90 }
  ],

  /* Hotel tiers near partner hospitals, USD per night. */
  hotels: [
    { id: "comfort", night: 40 },
    { id: "premium", night: 85 },
    { id: "luxury",  night: 180 }
  ],

  /* Netraa care packages: this is the service fee shown to the patient.
     Names and perks are translated under "pkg.<id>". */
  packages: [
    { id: "essential", fee: 399 },
    { id: "signature", fee: 899, featured: true },
    { id: "royal",     fee: 1999 }
  ],

  /* Other trip costs, USD. */
  visaPerPerson: 80,
  localPerPersonPerNight: 20
};
