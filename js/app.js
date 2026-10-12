/* Netraa.ai — site behaviour. Data: js/data.js · Translations: js/i18n.js */
(function () {
  "use strict";
  const D = window.NETRAA;
  const L = window.I18N;
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const byId = (list, id) => list.find((x) => x.id === id || x.code === id);
  const LANGS = D.languages.map((l) => l.code);

  const state = {
    lang: pickLang(),
    treatment: "knee",
    country: null,
    city: "chennai",
    hotel: "comfort",
    pkg: "signature",
    companion: true
  };
  state.country = guessCountry();

  /* ---------- language ---------- */
  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  function pickLang() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(fromUrl)) return fromUrl;
    const saved = store("netraa.lang");
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "en";
  }

  function guessCountry() {
    const region = ((navigator.language || "").split("-")[1] || "").toUpperCase();
    if (byId(D.countries, region)) return region;
    const fallback = { es: "ES", fr: "FR", it: "IT" };
    return fallback[state.lang] || "US";
  }

  /* t("key", {var: value}) — current language, then English, then the key. */
  function t(key, vars) {
    let s = (L[state.lang] && L[state.lang][key]) ?? L.en[key] ?? key;
    if (vars && typeof s === "string") s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
    return s;
  }

  function countryName(code) {
    try { return new Intl.DisplayNames([state.lang], { type: "region" }).of(code); }
    catch (e) { return code; }
  }

  function flag(code) {
    return code.replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
  }

  function applyStatic() {
    document.documentElement.lang = state.lang;
    if (!applyStatic.enTitle) applyStatic.enTitle = document.title;
    document.title = (state.lang !== "en" && L[state.lang]["meta.title"]) || applyStatic.enTitle;
    $$("[data-i18n]").forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      const val = state.lang === "en" ? null : L[state.lang][el.dataset.i18n];
      el.innerHTML = val ?? el.dataset.en;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
      const val = state.lang === "en" ? null : L[state.lang][el.dataset.i18nPh];
      el.placeholder = val ?? el.dataset.enPh;
    });
  }

  /* ---------- money ---------- */
  function money(usd, code) {
    const c = byId(D.countries, code || state.country);
    const amount = usd * c.fx;
    try {
      return new Intl.NumberFormat(state.lang + "-" + c.code, { style: "currency", currency: c.cur, maximumFractionDigits: 0 }).format(amount);
    } catch (e) {
      return c.cur + " " + Math.round(amount).toLocaleString();
    }
  }

  /* ---------- core estimate ---------- */
  function estimate(s) {
    const tr = byId(D.treatments, s.treatment);
    const c = byId(D.countries, s.country);
    const city = byId(D.cities, s.city);
    const hotel = byId(D.hotels, s.hotel);
    const pkg = byId(D.packages, s.pkg);
    const people = s.companion ? 2 : 1;

    const home = tr.us * c.factor;
    const treatment = tr.in * city.factor;
    const flights = c.flight * people;
    const visas = D.visaPerPerson * people;
    const stay = hotel.night * tr.nights;
    const local = D.localPerPersonPerNight * tr.nights * people;
    const fee = pkg.fee;
    const extras = flights + visas + stay + local + fee;
    const all = treatment + extras;
    return { tr, c, city, hotel, pkg, people, home, treatment, flights, visas, stay, local, fee, extras, all, save: home - all };
  }

  /* ---------- selects & segmented controls ---------- */
  function fillSelect(el, items, value, labelFn, valueFn, groupFn) {
    el.innerHTML = "";
    let lastGroup = null, parent = el;
    items.forEach((it) => {
      const g = groupFn ? groupFn(it) : null;
      if (g && g !== lastGroup) {
        parent = document.createElement("optgroup");
        parent.label = g;
        el.appendChild(parent);
        lastGroup = g;
      }
      const o = document.createElement("option");
      o.value = valueFn(it);
      o.textContent = labelFn(it);
      parent.appendChild(o);
    });
    el.value = value;
  }

  function seg(el, items, key, labelFn) {
    el.innerHTML = "";
    items.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button";
      b.innerHTML = labelFn(it);
      b.setAttribute("aria-pressed", String(state[key] === it.id));
      b.addEventListener("click", () => { state[key] = it.id; render(); });
      el.appendChild(b);
    });
  }

  function countriesSorted() {
    return D.countries.slice().sort((a, b) => countryName(a.code).localeCompare(countryName(b.code), state.lang));
  }

  function fillSelects() {
    const treatments = D.treatments;
    const tName = (x) => t("t." + x.id);
    const tGroup = (x) => t("cat." + x.cat);
    fillSelect($("#cTreatment"), treatments, state.treatment, tName, (x) => x.id, tGroup);
    fillSelect($("#qTreatment"), treatments.concat([{ id: "other", cat: "other" }]), state.treatment,
      (x) => (x.id === "other" ? t("other.treatment") : tName(x)), (x) => x.id,
      (x) => (x.id === "other" ? t("other.country") : tGroup(x)));

    const cs = countriesSorted();
    const cLabel = (c) => (c.code === "XX" ? t("other.country") : flag(c.code) + "  " + countryName(c.code));
    fillSelect($("#cCountry"), cs, state.country, cLabel, (c) => c.code);
    fillSelect($("#qCountry"), cs.concat([{ code: "XX" }]), state.country, cLabel, (c) => c.code);
    fillSelect($("#pCountry"), cs.concat([{ code: "XX" }]), state.country, cLabel, (c) => c.code);

    const ls = $("#langSelect");
    ls.innerHTML = D.languages.map((l) => `<option value="${l.code}">${l.label}</option>`).join("");
    ls.value = state.lang;
  }

  /* ---------- calculator ---------- */
  function render() {
    const e = estimate(state);
    const cName = countryName(e.c.code);

    seg($("#cCity"), D.cities, "city", (c) => c.name);
    seg($("#cHotel"), D.hotels, "hotel", (h) => `${t("hotel." + h.id)}<small>${money(h.night)}${t("d.night")}</small>`);
    seg($("#cPackage"), D.packages, "pkg", (p) => `${t("pkg." + p.id)}<small>${money(p.fee)}</small>`);

    $("#rHomeLabel").textContent = t("d.homePrivate", { country: cName });
    $("#rHome").textContent = money(e.home);
    $("#rAll").textContent = money(e.all);

    if (e.save > 0) {
      $("#rSave").textContent = money(e.save);
      $("#rSavePct").textContent = t("d.savePct", { pct: Math.round((e.save / e.home) * 100) });
    } else {
      $("#rSave").textContent = t("d.talk");
      $("#rSavePct").textContent = t("d.noSave");
    }

    const max = Math.max(e.home, e.all);
    $("#bHome").style.width = (e.home / max) * 100 + "%";
    $("#bAll").style.width = Math.max(2, (e.all / max) * 100) + "%";

    const who = e.people === 2 ? t("d.youComp") : t("d.you");
    const rows = [
      [`${t("t." + e.tr.id)} · ${e.city.name}`, e.treatment],
      [t("d.flights", { who }), e.flights],
      [t("d.visas", { who }), e.visas],
      [t("d.stay", { hotel: t("hotel." + e.hotel.id), n: e.tr.nights }), e.stay],
      [t("d.local"), e.local],
      [t("d.pkg", { name: t("pkg." + e.pkg.id) }), e.fee]
    ];
    $("#rBreakdown").innerHTML =
      rows.map(([k, v]) => `<dt>${k}</dt><dd>${money(v)}</dd>`).join("") +
      `<dt class="total">${t("d.total")}</dt><dd class="total">${money(e.all)}</dd>`;

    $("#rWait").innerHTML = `<b>${t("d.waitHome")}</b> ${t("wait." + (e.c.wait || e.c.code))} <b>${t("d.waitIndia")}</b> ${t("d.waitIndiaText")}`;

    $("#rCities").innerHTML = D.cities.map((c) =>
      `<button type="button" class="city-row${c.id === state.city ? " active" : ""}" data-city="${c.id}">
        <b>${c.name}</b><small>${t("city." + c.id)}</small><strong>${money(e.tr.in * c.factor)}</strong></button>`
    ).join("");
    $$(".city-row").forEach((b) => b.addEventListener("click", () => { state.city = b.dataset.city; render(); }));

    // keep the other selects in sync with the calculator
    $("#cTreatment").value = state.treatment;
    $("#cCountry").value = state.country;
    $("#qTreatment").value = state.treatment;
    $("#qCountry").value = state.country;

    renderHero();
    renderMarkets();
  }

  /* ---------- hero example: knee replacement for the visitor's country ---------- */
  function renderHero() {
    const e = estimate({ treatment: "knee", country: state.country, city: "chennai", hotel: "comfort", pkg: "signature", companion: true });
    $("#hTreat").textContent = t("t.knee");
    $("#hHomeLabel").textContent = flag(e.c.code) + " " + t("d.private", { country: countryName(e.c.code) });
    $("#hHome").textContent = money(e.home);
    $("#hIndia").textContent = money(e.treatment);
    $("#hExtras").textContent = money(e.extras);
    $("#hSave").textContent = money(e.save);
    $("#hBar").style.width = Math.max(4, Math.round((e.treatment / e.home) * 100)) + "%";
  }

  /* ---------- markets: why people travel ---------- */
  function marketCards() {
    // one card per country, but the Gulf states share a single card
    const cards = [];
    D.countries.forEach((c) => {
      if (c.wait === "GULF") {
        if (!cards.some((x) => x.gulf)) cards.push({ gulf: true, code: "AE", stat: "3–5", unit: "flight" });
      } else {
        cards.push(c);
      }
    });
    // the visitor's own market goes first
    const mine = byId(D.countries, state.country);
    const idx = cards.findIndex((x) => (mine.wait === "GULF" ? x.gulf : x.code === mine.code));
    if (idx > 0) cards.unshift(cards.splice(idx, 1)[0]);
    return cards;
  }

  function renderMarkets() {
    const mine = byId(D.countries, state.country);
    $("#marketGrid").innerHTML = marketCards().map((c) => {
      const active = c.gulf ? mine.wait === "GULF" : c.code === mine.code;
      const name = c.gulf ? "🌍 " + t("gulf") : flag(c.code) + " " + countryName(c.code);
      const text = t("wait." + (c.gulf ? "GULF" : c.code));
      const src = c.src ? `<a class="src" href="${c.src.url}" target="_blank" rel="noopener">${t("d.source")}: ${c.src.name}</a>` : "";
      return `<article class="market${active ? " active" : ""}">
        <h3>${name}</h3>
        <div class="stat"><strong>${c.stat}</strong>${c.unit ? `<span>${t("unit." + c.unit)}</span>` : ""}</div>
        <p>${text}</p>
        ${src}
        <button type="button" class="link-btn" data-country="${c.code}">${t("d.seeMine")}</button>
      </article>`;
    }).join("");
    $$("#marketGrid [data-country]").forEach((b) => b.addEventListener("click", () => {
      state.country = b.dataset.country;
      render();
      $("#compare").scrollIntoView({ behavior: "smooth" });
    }));
  }

  /* ---------- treatments, hotels, packages ---------- */
  function renderTreatments() {
    $("#treatGrid").innerHTML = D.treatments.map((x) => {
      const pct = Math.round((1 - x.in / x.us) * 100);
      return `<button type="button" class="treat" data-t="${x.id}">
        <span class="cat">${t("cat." + x.cat)}</span>
        <h3>${t("t." + x.id)}</h3>
        <div class="prices">
          <div><div class="from">${t("d.from")}</div><div class="in">${money(x.in, "US")}</div><div class="us">${t("d.usPrice")} ${money(x.us, "US")}</div></div>
          <span class="pct">−${pct}%</span>
        </div></button>`;
    }).join("");
    $$(".treat").forEach((b) => b.addEventListener("click", () => {
      state.treatment = b.dataset.t;
      render();
      $("#compare").scrollIntoView({ behavior: "smooth" });
    }));
  }

  const hotelIcons = [
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><path d="M10 54V22l22-12 22 12v32z"/><path d="M24 54V38h16v16M20 28h4m16 0h4M30 28h4"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 46V18M6 34h52v12M58 34v-6a6 6 0 0 0-6-6H28v12"/><circle cx="17" cy="27" r="5"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><path d="M10 46l-4-26 14 10 12-18 12 18 14-10-4 26z"/><path d="M12 54h40"/></svg>'
  ];

  function renderHotels() {
    $("#hotelGrid").innerHTML = D.hotels.map((h, i) => `
      <article class="hotel">
        <div class="hotel-art"><span class="chip">${t("hotel." + h.id)}</span>${hotelIcons[i % 3]}</div>
        <div class="hotel-body">
          <h3>${t("d.stayTitle", { name: t("hotel." + h.id) })}</h3>
          <p>${t("hotel." + h.id + ".desc")}. ${t("d.avail")}</p>
          <div class="hotel-price">${money(h.night)} <small>${t("d.nightFrom")}</small></div>
        </div>
      </article>`).join("");
  }

  function renderPackages() {
    $("#pkgGrid").innerHTML = D.packages.map((p) => {
      const name = t("pkg." + p.id);
      return `<article class="pkg${p.featured ? " featured" : ""}">
        ${p.featured ? `<span class="badge">${t("d.most")}</span>` : ""}
        <h3>${name}</h3>
        <div class="fee">${money(p.fee)}</div>
        <div class="fee-note">${t("d.once")}</div>
        <ul>${t("pkg." + p.id + ".perks").map((x) => `<li>${x}</li>`).join("")}</ul>
        <a href="#quote" class="btn ${p.featured ? "btn-primary" : "btn-ghost"}" data-pkg="${p.id}">${t("d.choose", { name })}</a>
      </article>`;
    }).join("");
    $$("[data-pkg]").forEach((a) => a.addEventListener("click", () => { state.pkg = a.dataset.pkg; render(); }));
  }

  /* ---------- re-render everything (language or country change) ---------- */
  function renderAll() {
    applyStatic();
    fillSelects();
    renderTreatments();
    renderHotels();
    renderPackages();
    render();
  }

  /* ---------- forms ---------- */
  async function submitForm(form, kind) {
    const msg = form.querySelector(".form-msg");
    const btn = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());
    data._kind = kind;
    data._lang = state.lang;
    if (kind === "quote") data.estimate = `${$("#rAll").textContent} (${t("t." + state.treatment)}, ${byId(D.cities, state.city).name})`;

    btn.disabled = true;
    msg.style.color = "";
    try {
      if (D.formEndpoint) {
        const res = await fetch(D.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        console.info("[Netraa demo mode] Set formEndpoint in js/data.js to receive submissions.", data);
      }
      msg.textContent = "🙏 " + t(kind === "quote" ? "msg.quote" : "msg.partner");
      form.reset();
      render();
    } catch (err) {
      msg.style.color = "#D9480F";
      msg.textContent = t("msg.err", { email: D.email });
    } finally {
      btn.disabled = false;
    }
  }

  /* ---------- init ---------- */
  function init() {
    $("#cTreatment").addEventListener("change", (e) => { state.treatment = e.target.value; render(); });
    $("#cCountry").addEventListener("change", (e) => { state.country = e.target.value; renderHotels(); renderPackages(); render(); });
    $("#cCompanion").addEventListener("change", (e) => { state.companion = e.target.checked; render(); });
    $("#langSelect").addEventListener("change", (e) => { state.lang = e.target.value; store("netraa.lang", state.lang); renderAll(); });

    $("#quoteForm").addEventListener("submit", (e) => { e.preventDefault(); submitForm(e.target, "quote"); });
    $("#partnerForm").addEventListener("submit", (e) => { e.preventDefault(); submitForm(e.target, "partner"); });

    $("#waLink").href = `https://wa.me/${D.whatsapp}`;
    $("#mailLink").href = `mailto:${D.email}`;
    $("#mailLink").textContent = D.email;
    $("#year").textContent = new Date().getFullYear();

    renderAll();

    // mobile nav
    const toggle = $("#navToggle"), links = $("#navLinks");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));

    // nav border on scroll
    const nav = $(".nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // reveal on scroll
    const els = $$(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
