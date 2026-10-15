/* ===== GAMI: new pages (About, How we work, 404), showcase, route helpers =====
   Injected into the bundle at module scope. Uses bundle identifiers:
   f (jsx runtime), E (React), sn (Link), Vg (Header), Xg (Footer), Kg (Inquiry section),
   gt (arrow-up-right), yu (arrow-down), rr (check), hS/SS/CS (feature icons), lr (products array) */

const GAMI_SITE = "https://gamicorp-indonesia.com";
const GAMI_LINKEDIN_COMPANY = "https://www.linkedin.com/company/gami-corporation/";
/* TODO: replace with Rezza's personal LinkedIn profile URL */
const GAMI_LINKEDIN_FOUNDER = GAMI_LINKEDIN_COMPANY;

const GAMI_META = {
  "/": { t: "GAMI Corporation Indonesia | Export from the source", d: "GAMI Corporation connects Indonesian coconut and botanical supply with international buyers through clear specification and a practical export path." },
  "/products": { t: "Products | GAMI Corporation Indonesia", d: "Seven selected export products from Indonesia: coconut and botanical ingredients, specified per buyer inquiry." },
  "/about": { t: "About GAMI | GAMI Corporation Indonesia", d: "GAMI Corporation is the export trading brand of PT Gami Marine Indonesia, a three-person team in Pontianak, West Kalimantan. Company details and who you will deal with." },
  "/how-we-work": { t: "How we work | GAMI Corporation Indonesia", d: "From first message to loading plan: the six steps GAMI follows to source, specify, check, document and ship Indonesian coconut and botanical products." }
};
let gamiFirstRoute = true;
function gamiOnRoute(path) {
  const m = GAMI_META[path];
  if (m) {
    document.title = m.t;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", m.d);
    const c = document.querySelector('link[rel="canonical"]');
    if (c) c.setAttribute("href", GAMI_SITE + path);
  }
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
    }, 80);
  } else if (!gamiFirstRoute) {
    window.scrollTo(0, 0);
  }
  gamiFirstRoute = false;
}

/* helper: jsx without boilerplate; omits children for void elements */
const h = (t, p, ...c) => {
  const pr = Object.assign({}, p || {});
  if (c.length === 0) return f.jsx(t, pr);
  if (c.length === 1) { pr.children = c[0]; return f.jsx(t, pr); }
  pr.children = c; return f.jsxs(t, pr);
};

function GamiPage({ children }) {
  return h("div", { id: "top", className: "bg-[hsl(var(--background))]" },
    h(Vg, {}),
    h("main", null, children, h(Kg, {})),
    h(Xg, {}));
}

function GamiHero(o) {
  return h("section", { className: "catalogue-hero grain" },
    h("div", { className: "wrap catalogue-hero-grid" },
      h("div", { className: "catalogue-hero-copy motion-rise" },
        h("p", { className: "eyebrow eyebrow-light" }, o.eyebrow),
        h("h1", { "data-testid": o.testid }, o.t1, h("br"), h("em", null, o.t2)),
        h("p", null, o.lede),
        h("div", { className: "mt-8 flex items-center gap-6" },
          h("a", { href: "#inquiry", className: "button button-mint" }, o.cta, " ", h(yu, { size: 16 })),
          h(sn, { href: o.secHref, className: "text-link-light" }, o.secLabel, " ", h(gt, { size: 15 })))),
      h("div", { className: "catalogue-hero-visual motion-rise delay-2" },
        h("img", { src: o.image, alt: o.alt }),
        h("div", { className: "catalogue-note-card" }, h("span", null, o.noteLabel), h("strong", null, o.note1, h("br"), o.note2)),
        h("div", { className: "catalogue-number" }, o.num, h("br"), h("span", null, o.numA, h("br"), o.numB)))),
    h("div", { className: "wrap catalogue-hero-meta" },
      h("span", null, o.meta[0]), h("i"), h("span", null, o.meta[1]), h("i"), h("span", null, o.meta[2]),
      h("span", { className: "ml-auto hidden sm:inline" }, o.metaRight)));
}

function GamiAbout() {
  const facts = [
    ["Legal entity", "PT Gami Marine Indonesia"],
    ["Business ID (NIB)", "2010250118884"],
    ["Registered address", "Jl. Tabrani Ahmad Gg. Era Baru No. 36, Sungaijawi Dalam, Pontianak Barat, Kota Pontianak, Kalimantan Barat 78115, Indonesia"],
    ["Issued", "20 October 2025, electronically signed by the Ministry of Investment and Downstreaming / BKPM"],
    ["Trade access", "The NIB also serves as the company's customs access for export and import"],
    ["Contact", h("span", null, h("a", { href: "https://wa.me/6281241471095", target: "_blank", rel: "noreferrer" }, "+62 812-4147-1095"), " · ", h("a", { href: "mailto:info@gamicorp-indonesia.com" }, "info@gamicorp-indonesia.com"))]
  ];
  return h(GamiPage, null,
    h(GamiHero, {
      testid: "heading-about-hero", eyebrow: "About GAMI", t1: "The people behind", t2: "the shipment.",
      lede: "GAMI Corporation is an export trading team in Pontianak, West Kalimantan. We are three people, so whoever answers your inquiry is also the person arranging your cargo.",
      cta: "Talk to the team", secHref: "/how-we-work", secLabel: "See how we work",
      image: "/assets/products/virgin-coconut-oil.jpg", alt: "Virgin coconut oil bottles in a West Kalimantan coconut grove",
      noteLabel: "BASED IN", note1: "Pontianak,", note2: "West Kalimantan.", num: "03", numA: "PEOPLE", numB: "ONE DESK",
      meta: ["PT GAMI MARINE INDONESIA", "PONTIANAK", "COCONUT · BOTANICAL"], metaRight: "Registered Indonesian company"
    }),
    h("section", { className: "home-intro-section", id: "who-we-are" },
      h("div", { className: "wrap intro-grid" },
        h("div", null,
          h("p", { className: "eyebrow eyebrow-accent" }, "01 / Who we are"),
          h("h2", { "data-testid": "heading-about-who" }, "A trading team,", h("br"), h("em", null, "not a factory."))),
        h("div", { className: "intro-copy" },
          h("p", null, "GAMI Corporation is the export trading brand of PT Gami Marine Indonesia. We help buyers abroad source Indonesian coconut products and botanical ingredients to a clear specification."),
          h("p", null, "We work with farmers, growers and processors we know in West Kalimantan and across Indonesia. They produce. We match the supply to your brief, check the lot, prepare the documents and plan the shipment."),
          h("div", { className: "intro-stat-row" },
            h("div", null, h("strong", null, "03"), h("span", null, "people on", h("br"), "the team")),
            h("div", null, h("strong", null, "02"), h("span", null, "product", h("br"), "lines")),
            h("div", null, h("strong", null, "01"), h("span", null, "registered", h("br"), "Indonesian company")))))),
    h("section", { className: "buyer-proof-section" },
      h("div", { className: "wrap buyer-proof-grid" },
        h("div", { className: "buyer-photo" },
          h("img", { src: "/assets/noni-leaves.jpeg", alt: "Dried noni leaves in GAMI-labelled export packing" }),
          h("div", null, h("span", null, "EXPORT PACKING"), h("strong", null, "Labelled and", h("br"), "ready to ship."))),
        h("div", { className: "buyer-proof-copy" },
          h("p", { className: "eyebrow eyebrow-accent" }, "02 / How we are set up"),
          h("h2", null, "Straight about", h("br"), h("em", null, "what we are.")),
          h("p", null, "Small and direct is the point. Here is how GAMI is set up, so you know who you are dealing with before you write."),
          h("ul", null,
            h("li", null, h(hS, { size: 18 }), h("span", null, h("strong", null, "A trading company"), h("small", null, "We coordinate supply from partner farms and processors. We do not claim to own the plantation or the plant."))),
            h("li", null, h(SS, { size: 18 }), h("span", null, h("strong", null, "A team of three"), h("small", null, "You deal with the people who source, check and ship your order. No layers in between."))),
            h("li", null, h(CS, { size: 18 }), h("span", null, h("strong", null, "Specification before price"), h("small", null, "Form, grade, packing and documents are agreed first. Then we quote.")))))),
    ),
    h("section", { className: "products-section", id: "team" },
      h("div", { className: "wrap" },
        h("div", { className: "section-heading" },
          h("div", null,
            h("p", { className: "eyebrow eyebrow-accent" }, "03 / The team"),
            h("h2", null, "Who you will", h("br"), h("em", null, "talk to.")))),
        h("div", { className: "portfolio-links" },
          h("a", { className: "portfolio-link-card", href: GAMI_LINKEDIN_FOUNDER, target: "_blank", rel: "noreferrer", "data-testid": "card-team-founder" },
            h("div", null,
              h("div", { className: "portfolio-link-card-top" }, h("span", null, "FOUNDER"), h(gt, { size: 15 })),
              h("h3", null, "Rezza Primadi"),
              h("p", null, "Exports premium botanicals for cosmetics and natural products, and supplies coconut products from Pontianak.")),
            h("div", { className: "portfolio-link-card-footer" }, h("span", null, "View on LinkedIn"), h("span", null, "Pontianak, ID"))),
          h("a", { className: "portfolio-link-card", href: "#legal", "data-testid": "card-team-company" },
            h("div", null,
              h("div", { className: "portfolio-link-card-top" }, h("span", null, "REGISTERED"), h(gt, { size: 15 })),
              h("h3", null, "PT Gami Marine Indonesia"),
              h("p", null, "NIB-registered, with customs access for export. Company details are listed below.")),
            h("div", { className: "portfolio-link-card-footer" }, h("span", null, "See company details"), h("span", null, "Verifiable"))),
          h(sn, { className: "portfolio-link-card", href: "/products", "data-testid": "card-team-products" },
            h("div", null,
              h("div", { className: "portfolio-link-card-top" }, h("span", null, "RANGE"), h(gt, { size: 15 })),
              h("h3", null, "Product portfolio"),
              h("p", null, lr.length + " selected products across coconut and botanical lines.")),
            h("div", { className: "portfolio-link-card-footer" }, h("span", null, "Browse products"), h("span", null, "Buyer reference")))),
        h("div", { className: "catalog-note" }, h("span", null, "+"),
          h("p", null, "Three people work behind GAMI. ", h("a", { href: "#inquiry" }, "Write or message us"), " and you reach the team directly.")))),
    h("section", { className: "catalogue-editorial", id: "legal" },
      h("div", { className: "wrap editorial-grid" },
        h("div", null,
          h("p", { className: "eyebrow eyebrow-accent" }, "04 / Company details"),
          h("h2", null, "Verifiable,", h("br"), h("em", null, "on request."))),
        h("div", null,
          h("p", null, "GAMI Corporation trades under PT Gami Marine Indonesia, registered through Indonesia's business licensing system. A copy of the NIB and other company documents is available on request."),
          h("dl", { className: "gp-facts" }, facts.map(([k, v]) => h("div", { key: k }, h("dt", null, k), h("dd", null, v)))),
          h("p", { className: "gp-facts-cta" }, h("a", { className: "text-link-dark", href: "mailto:info@gamicorp-indonesia.com?subject=Request%20for%20company%20documents" }, "Request company documents ", h(gt, { size: 15 })))))));
}

function GamiHowWeWork() {
  const steps = [
    ["01", "Brief", "You send the product, intended use, destination and target volume. A few lines is enough to start."],
    ["02", "Match", "We look for supply that fits your origin, season, format and quantity from the suppliers we work with in Indonesia."],
    ["03", "Specify", "We write the specification back to you: form, grade or size, moisture or processing method, packing and labelling."],
    ["04", "Quote", "Price, validity, lead time, payment terms and price basis (for example FOB or CIF), agreed per shipment."],
    ["05", "Prepare and check", "The supplier prepares the lot to the agreed specification. We check it before loading. Independent inspection or lab testing can be arranged if you require it."],
    ["06", "Document and ship", "Export documents, cargo booking by sea or air, and shipping documents sent to you. We stay your contact until the cargo arrives."]
  ];
  const faq = [
    ["Are you a producer or a trader?", "A trader. GAMI is the export trading brand of PT Gami Marine Indonesia. Our suppliers grow or process the product to the agreed specification. We coordinate sourcing, checks, documents and shipping."],
    ["What is the minimum order?", "It depends on the product and the route. A container of virgin coconut oil, bulk copra and retail pouches of dried leaves are very different orders. Tell us your target volume and we will say what is workable."],
    ["Can I get a sample?", "Often for dry and botanical products. For bulk or liquid products it depends on the destination and the courier route. Ask us per product."],
    ["How do pricing and payment work?", "Terms are agreed per order and written into the quotation, including the price basis such as FOB or CIF."],
    ["Do you export seafood?", "Seafood is handled by our Marine division. Visit marine.gamicorp-indonesia.com."],
    ["Which languages do you work in?", "English and Indonesian."]
  ];
  return h(GamiPage, null,
    h(GamiHero, {
      testid: "heading-process-hero", eyebrow: "How we work", t1: "From first message", t2: "to loading plan.",
      lede: "Six practical steps. We confirm the specification before the price, so there are fewer surprises at the port.",
      cta: "Start with your brief", secHref: "/about", secLabel: "Meet the team",
      image: "/assets/products/coconut-copra.jpg", alt: "Dried coconut copra at an Indonesian processing site",
      noteLabel: "YOUR CONTACT", note1: "The same people,", note2: "start to finish.", num: "06", numA: "STEPS", numB: "TO DISPATCH",
      meta: ["01 / BRIEF", "02 / SPECIFY", "03 / SHIP"], metaRight: "Timelines depend on product and season"
    }),
    h("section", { className: "home-process", id: "steps" },
      h("div", { className: "wrap process-home-grid" },
        h("div", { className: "process-home-copy" },
          h("p", { className: "eyebrow eyebrow-accent" }, "The path"),
          h("h2", null, "Six steps,", h("br"), h("em", null, "one contact.")),
          h("p", null, "Each step ends with something agreed in writing, so you always know what is settled and what comes next."),
          h("a", { href: "#inquiry", className: "text-link-dark" }, "Send your brief ", h(gt, { size: 15 }))),
        h("div", { className: "process-list" }, steps.map(([n, t, d], i) =>
          h("div", { className: "process-row", key: n, "data-testid": "row-howwework-" + (i + 1) },
            h("span", null, n),
            h("div", null, h("strong", null, t), h("p", null, d)),
            h("b", null, i === steps.length - 1 ? h(rr, { size: 19 }) : h(gt, { size: 18 }))))))),
    h("section", { className: "catalogue-editorial" },
      h("div", { className: "wrap editorial-grid" },
        h("div", null,
          h("p", { className: "eyebrow eyebrow-accent" }, "Your brief"),
          h("h2", null, "What helps us", h("br"), h("em", null, "move fast."))),
        h("div", null,
          h("p", null, "You do not need a formal tender. These five details are enough for a first answer."),
          h("div", { className: "editorial-checks" },
            ["Product and intended use", "Form, grade or size", "Target volume and destination", "Packing or private-label needs", "Documents your market requires"].map(t =>
              h("span", { key: t }, h(rr, { size: 15 }), " " + t)))))),
    h("section", { className: "home-intro-section", id: "documents" },
      h("div", { className: "wrap intro-grid" },
        h("div", null,
          h("p", { className: "eyebrow eyebrow-accent" }, "Documents and checks"),
          h("h2", null, "What you", h("br"), h("em", null, "receive."))),
        h("div", { className: "intro-copy" },
          h("p", null, "The exact list depends on the product and the destination country. We confirm it at the quotation stage."),
          h("div", { className: "gp-cols" },
            h("div", null, h("h3", null, "Usually included"),
              h("ul", null, ["Commercial invoice", "Packing list", "Bill of lading or air waybill"].map(t => h("li", { key: t }, t)))),
            h("div", null, h("h3", null, "Where your market requires it"),
              h("ul", null, ["Certificate of origin", "Phytosanitary or health certificate, issued by the relevant Indonesian authority", "Inspection or lab report from an independent party, arranged on request", "Labels and packaging to your private-label brief"].map(t => h("li", { key: t }, t)))))))),
    h("section", { className: "catalogue-editorial", id: "faq" },
      h("div", { className: "wrap editorial-grid" },
        h("div", null,
          h("p", { className: "eyebrow eyebrow-accent" }, "Questions buyers ask"),
          h("h2", null, "Short answers,", h("br"), h("em", null, "no surprises."))),
        h("div", { className: "gp-faq" }, faq.map(([q, a]) =>
          h("details", { key: q }, h("summary", null, q), h("p", null, a)))))));
}

function GamiNotFound() {
  return h(GamiPage, null,
    h("section", { className: "catalogue-editorial" },
      h("div", { className: "wrap editorial-grid" },
        h("div", null,
          h("p", { className: "eyebrow eyebrow-accent" }, "Page not found"),
          h("h1", { "data-testid": "heading-not-found" }, "This page", h("br"), h("em", null, "does not exist."))),
        h("div", null,
          h("p", null, "The link may be old or mistyped. These pages will get you back on track."),
          h("div", { className: "mt-9 flex flex-wrap items-center gap-7" },
            h(sn, { href: "/", className: "text-link-dark" }, "Home ", h(gt, { size: 15 })),
            h(sn, { href: "/products", className: "text-link-dark" }, "Products ", h(gt, { size: 15 })),
            h(sn, { href: "/how-we-work", className: "text-link-dark" }, "How we work ", h(gt, { size: 15 })),
            h(sn, { href: "/about", className: "text-link-dark" }, "About GAMI ", h(gt, { size: 15 })))))));
}

/* Video showcase, previously injected by a script in index.html (it appeared on whichever page loaded first). */
function GamiShowcase() {
  const root = E.useRef(null), vid = E.useRef(null);
  const [muted, setMuted] = E.useState(true);
  E.useEffect(() => {
    const sec = root.current; if (!sec) return;
    try {
      const h2 = document.querySelector(".home-intro-section h2");
      if (h2) {
        const cs = getComputedStyle(h2);
        sec.style.setProperty("--g-sans", cs.fontFamily);
        sec.style.setProperty("--g-green", cs.color);
        const em = h2.querySelector("em");
        if (em) { const ce = getComputedStyle(em); sec.style.setProperty("--g-serif", ce.fontFamily); sec.style.setProperty("--g-coral", ce.color); }
      }
      const eb = document.querySelector(".eyebrow");
      if (eb) sec.style.setProperty("--g-mono", getComputedStyle(eb).fontFamily);
    } catch (e) {}
    const v = vid.current; if (!v || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(en => { if (en[0].isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause(); }, { threshold: 0.35 });
    io.observe(v); return () => io.disconnect();
  }, []);
  const toggle = () => { const v = vid.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); if (!v.muted) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } };
  return h("section", { id: "gami-showcase", className: "gami-showcase", ref: root },
    h("div", { className: "gs-wrap" },
      h("div", { className: "gs-text" },
        h("div", { className: "gs-eyebrow" }, h("span", null, h("b", null, "●"), " FIELD NOTES / NONI LEAVES")),
        h("h2", null, "Straight from the ", h("em", null, "source.")),
        h("p", { className: "gs-desc" }, "Dried noni leaves, packed and labelled for export. Thirty seconds on what you actually receive."),
        h("ul", { className: "gs-tags" }, h("li", null, "Morinda citrifolia"), h("li", null, "Dried leaves"), h("li", null, "Raw botanical")),
        h("a", { className: "gs-cta", href: "https://wa.me/6281241471095?text=Hello%20GAMI%2C%20I%20am%20interested%20in%20dried%20noni%20leaves.", target: "_blank", rel: "noopener noreferrer" }, "Ask about noni leaves ", h("span", null, "↗"))),
      h("div", { className: "gs-media" },
        h("div", { className: "gs-badge" }, h("span", null, "Export", h("br"), "ready")),
        h("div", { className: "gs-frame" },
          h("video", { ref: vid, src: "/videos/noni-leaves.mp4", poster: "/assets/noni-leaves.jpeg", autoPlay: true, muted: true, loop: true, playsInline: true, preload: "metadata", "aria-label": "Dried noni leaves packed for export" }),
          h("button", { className: "gs-sound", type: "button", onClick: toggle, "aria-label": muted ? "Turn sound on" : "Turn sound off" }, muted ? "🔇" : "🔊")),
        h("div", { className: "gs-chip" }, "From West Kalimantan", h("strong", null, "Dried noni leaves.")))));
}
