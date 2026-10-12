# Netraa.ai: launch playbook

A practical checklist to take this from website to business. Work through it roughly in order.

## 1. Before the site goes public (week 1–2)

- [ ] **Domain**: register `netraa.ai` (and `netraa.in` / `netraa.com` if available). Point it at GitHub Pages (see README).
- [ ] **Leads**: set up Formspree (or HubSpot's free CRM) and paste the endpoint into `js/data.js`.
- [ ] **WhatsApp Business**: get a dedicated number and put it in `js/data.js`. Many international patients will message you here first.
- [ ] **Email**: set up `care@netraa.ai` with Google Workspace or Zoho Mail.
- [ ] **Replace the indicative prices** in `js/data.js` with real written quotes from partner hospitals. The calculator is the heart of the site, so it has to be accurate.
- [ ] **Legal review** of `legal.html`: GDPR for UK/EU visitors, India's DPDP Act 2023, and a clear medical disclaimer.

## 2. Company & compliance

- [ ] Register the company in India (Pvt Ltd or LLP), with GST registration. Facilitation fees are taxable services.
- [ ] Look into **NABH accreditation for Medical Value Travel Facilitators (MVTF)**. It builds a lot of trust with patients and hospitals.
- [ ] Register on the Government of India's **"Heal in India"** platform for medical value travel.
- [ ] Get professional indemnity insurance.
- [ ] Write a standard **facilitator agreement** for hospitals covering commission, international-patient pricing, how complications are handled and data sharing.
- [ ] Store medical records securely: encrypted storage and access only for the coordinators who need them. Don't keep reports in personal email or WhatsApp chats long-term.

## 3. Partners (supply side)

- [ ] **Hospitals**: start with 2–3 JCI/NABH hospitals per metro (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad). Most large chains have an *International Patient Services* desk, so contact that team directly.
- [ ] **Hotels**: 2–3 per hospital cluster across Comfort, Premium and Luxury tiers. Negotiate long-stay rates and check step-free access.
- [ ] **On-ground**: drivers, interpreters (English, Spanish, French, Italian, Arabic) and personal care companions. These people deliver the Atithi Devo Bhava experience.
- [ ] **Home-country partners (phase 2)**: transport to the airport, home nursing and physiotherapy in the US, UK, Canada and the UAE. The partner waitlist form on the site collects interested providers.

## 4. How you make money

| Stream | Typical range | Notes |
|---|---|---|
| Patient package fee | $399 – $1,999 | Shown on the site. Transparent and builds trust. |
| Hospital referral fee | Negotiated, often a % of the bill | Must **not** increase what the patient pays. The site promises this. |
| Hotel commission | Often 10–15% | Or a negotiated long-stay rate. |
| Add-ons | Varies | Airport lounge, sightseeing, Ayurveda recovery, extra nights. |

Rough maths: one knee replacement patient on the *Signature* package can bring in about $899 (package) + a hospital referral fee + hotel commission. Ten patients a month is a real business.

> Keep it honest. Medical-tourism trust is fragile. Never take a fee that raises the patient's bill without telling them, and never push a patient towards a hospital because it pays a higher commission.

## 5. Getting patients (demand side)

Target markets and the reasons are in [MARKETS.md](MARKETS.md). In short: **UK and Canada first**, then the USA, Australia, Ireland and NZ, then Singapore and the Gulf, then Spain, Italy and France.

- **Google Ads on search terms people use while waiting**: "knee replacement waiting list UK", "hip surgery wait time Ontario", "lista de espera operación rodilla", "liste d'attente prothèse genou". Link ads straight to the right language with `?lang=es` and similar.
- **SEO pages**: one page per treatment and country, e.g. "Knee replacement: NHS wait vs India cost". The calculator data already supports this.
- **Waiting-list communities**: Facebook groups, Reddit (r/NHS, r/ontario, r/CanadaHealthcare) and patient forums. Be helpful, not spammy.
- **Employers and insurers**: US self-insured employers and international health insurers increasingly pay for treatment abroad.
- **Social proof**: once you have real patients, collect written consent and add genuine video stories. Don't publish testimonials until they're real.

## 6. Roadmap ideas for the site

- [ ] Upload reports securely (rather than sending them by email or WhatsApp).
- [ ] Individual hospital and doctor profile pages, with permission from partners.
- [ ] Booking and payment for the package fee (Stripe or Razorpay).
- [ ] Arabic (right-to-left) for Gulf patients; German if expanding into IVF, dental and cosmetic treatments.
- [ ] Patient dashboard: itinerary, documents, care companion contact.
- [ ] Home-country care partner portal.
