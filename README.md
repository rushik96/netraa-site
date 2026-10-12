# Netraa.ai

World-class treatment in India, with *Atithi Devo Bhava* care.
A static, multilingual (EN · ES · FR · IT) website for a medical-tourism facilitator. It helps patients in countries with long waiting lists or high medical costs (UK, Canada, USA, Australia, Ireland, NZ, Singapore, the Gulf, Spain, Italy, France) get treated in India. See [MARKETS.md](MARKETS.md) for the research behind it.

## What's inside

```
netraa/
├── index.html        # the whole landing page
├── legal.html        # privacy & medical disclaimer (template — get it reviewed)
├── css/styles.css    # all styling
├── js/data.js        # ← ALL prices, countries, cities, hotels, packages. Edit this.
├── js/i18n.js        # translations (Spanish, French, Italian + dynamic English text)
├── MARKETS.md        # target-country research with sources
├── js/app.js         # cost calculator, rendering, forms
├── assets/logo.svg       # full logo (mark + wordmark)
├── assets/logo-mark.svg  # icon only (favicon, social)
├── LAUNCH.md         # step-by-step launch & business checklist
```

No build step and no dependencies: it's plain HTML, CSS and JS.

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Put it on GitHub

```bash
git init && git add . && git commit -m "Netraa.ai website v1"
```

```bash
gh repo create netraa-site --private --source=. --push
```

(Or create the repo on github.com and follow its "push an existing repository" instructions.)

## Go live for free (GitHub Pages)

1. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
2. Your site is live at `https://<username>.github.io/netraa-site/`. (GitHub Pages needs a **public** repo on a free account. Make the repo public on launch day, or use Netlify/Vercel, which can deploy from a private repo for free.)
3. Custom domain: add `netraa.ai` under **Settings → Pages → Custom domain**, then at your domain registrar add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<username>.github.io`
4. Tick **Enforce HTTPS**.

Netlify and Vercel also work. Just drag and drop the folder.

## Receive quote requests

1. Create a free form at https://formspree.io.
2. Paste the endpoint into `formEndpoint` in `js/data.js`.
3. Set your real `whatsapp` number and `email` in the same file.

Until you do, the forms run in **demo mode**: they show a thank-you message and log the submission to the browser console.

## Updating prices

Every price on the site comes from `js/data.js`:

- `treatments[].us`: typical US self-pay price
- `treatments[].in`: India base price (other cities are scaled by `cities[].factor`)
- `countries[].factor`: each country's private price relative to the US
- `countries[].fx`: exchange rate per 1 USD
- `hotels`, `packages`, `visaPerPerson`, `localPerPersonPerNight`

Replace these with real partner-hospital quotes before launch.

## Languages

The visitor's browser language is detected automatically, and they can switch with the globe menu. You can also link to a language directly with `?lang=es`, `?lang=fr` or `?lang=it`, which is useful for ads.

To add a language, copy the `es` block in `js/i18n.js`, translate it, and add the language to `languages` in `js/data.js`.

## Hosting on Replit

The repo includes a `.replit` file, so it's ready to import:

1. In Replit, choose **Create App → Import from GitHub** and pick `netraa-site`.
2. Press **Run** to preview it.
3. Open **Deploy → Static**, with public directory `./` and no build command, then publish.
4. Under the deployment's **Settings → Link a domain**, add `netraa.ai` and copy the DNS records Replit shows into your domain registrar.
