function C() {
  return window.PORTFOLIO;
}

function fill(id, htmlOrText, asHtml) {
  const el = document.getElementById(id);
  if (!el) return;
  if (asHtml) el.innerHTML = htmlOrText;
  else el.textContent = htmlOrText;
}

function initImageFallbacks() {
  const fallback = C().images?.fallback || "assets/images/hero.jpg";
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "1";
      img.src = fallback;
    });
  });
}

function openProject(id) {
  const p = C().projects.find((x) => x.id === id);
  if (!p) return;
  const inner = document.getElementById("panel-inner");
  inner.innerHTML = `
    <img class="panel-hero" src="${p.image}" alt="${p.title}" />
    <p class="panel-meta">${p.category} · ${p.duration}</p>
    <h2 id="panel-title">${p.title}</h2>
    ${p.role ? `<p class="panel-role">${p.role}</p>` : ""}
    ${p.paragraphs.map((para) => `<p>${para}</p>`).join("")}
    ${
      p.metrics?.length
        ? `<ul class="panel-metrics">${p.metrics
            .map((m) => `<li><strong>${m.value}</strong><span>${m.label}</span></li>`)
            .join("")}</ul>`
        : ""
    }
  `;
  document.getElementById("project-panel").classList.add("is-open");
  document.getElementById("project-panel").setAttribute("aria-hidden", "false");
  document.getElementById("panel-backdrop").hidden = false;
  document.body.classList.add("panel-open");
}

function closeProject() {
  document.getElementById("project-panel").classList.remove("is-open");
  document.getElementById("project-panel").setAttribute("aria-hidden", "true");
  document.getElementById("panel-backdrop").hidden = true;
  document.body.classList.remove("panel-open");
}

function bindProjectClicks() {
  document.querySelectorAll("[data-project]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openProject(el.getAttribute("data-project"));
    });
  });
}

function renderHome() {
  const h = C().home;
  document.getElementById("home-kicker").textContent = h.kicker;
  document.getElementById("home-title").textContent = h.title;
  document.getElementById("home-role").textContent = h.roleLine;
  document.getElementById("home-headline").textContent = h.headline;
  document.getElementById("home-sub").textContent = h.subhead;
  document.getElementById("hero-img").src = C().images.hero;
  const words = ["Ideas", "Content", "Ads", "Video", "WhatsApp", "LinkedIn", "Results"];
  document.getElementById("marquee-text").innerHTML = [...words, ...words]
    .map((w) => `<span>${w}</span>`)
    .join("");
}

function renderPhilosophy() {
  const p = C().philosophy;
  document.getElementById("philosophy-title").textContent = p.title;
  document.getElementById("philosophy-body").innerHTML = p.paragraphs.map((x) => `<p>${x}</p>`).join("");
  document.getElementById("philosophy-img").src = C().images.philosophy;
}

function renderWhat() {
  const w = C().whatIDo;
  document.getElementById("what-intro").textContent = w.intro;
  document.getElementById("what-tiles").innerHTML = w.items
    .map(
      (t) => `
    <article class="tile">
      <img src="${t.image}" alt="${t.title}" loading="lazy" />
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
    </article>
  `
    )
    .join("");
}

function renderReels() {
  const track = document.getElementById("reels-track");
  if (!track) return;

  const igLink = document.getElementById("reels-instagram-link");
  const profile = (C().instagram || "").trim();
  if (igLink) {
    if (profile) {
      igLink.href = profile.startsWith("http") ? profile : `https://www.instagram.com/${profile.replace(/^@/, "")}/`;
      igLink.hidden = false;
    } else {
      igLink.hidden = true;
    }
  }

  track.innerHTML = (C().showcaseReels || [])
    .map((item) => {
      const r = typeof item === "string" ? { src: item } : item;
      const src = (r.gif || r.video || r.src || "").trim();
      if (!src) return "";
      if (/\.gif$/i.test(src) || r.gif) {
        return `
      <figure class="reel">
        <img src="${src}" alt="" loading="lazy" decoding="async" />
      </figure>`;
      }
      const poster = r.poster || r.image;
      const posterAttr = poster ? ` poster="${poster}"` : "";
      return `
      <figure class="reel">
        <video src="${src}"${posterAttr} controls playsinline preload="metadata"></video>
      </figure>`;
    })
    .join("");

  const step = () => (track.querySelector(".reel")?.offsetWidth || 240) + 14;
  const prev = document.getElementById("reel-prev");
  const next = document.getElementById("reel-next");
  if (prev) prev.onclick = () => track.scrollBy({ left: -step(), behavior: "smooth" });
  if (next) next.onclick = () => track.scrollBy({ left: step(), behavior: "smooth" });
}

function renderStories() {
  const w = C().workSection;
  document.getElementById("work-featured-title").textContent = w.featuredTitle;
  document.getElementById("work-featured-lead").textContent = w.featuredLead;
  document.getElementById("project-stories").innerHTML = C()
    .projects.map((p, i) => {
      const metrics = p.metrics?.length
        ? `<ul class="story-metrics">${p.metrics
            .map((m) => `<li><strong>${m.value}</strong><span>${m.label}</span></li>`)
            .join("")}</ul>`
        : "";
      return `
      <article class="story ${i % 2 ? "story--flip" : ""}" id="${p.id}">
        <button type="button" class="story-visual" data-project="${p.id}">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <span class="story-cta">Read more</span>
        </button>
        <div class="story-body">
          <p class="story-cat">${p.category} · ${p.duration}</p>
          <h3>${p.title}</h3>
          <p class="story-role">${p.role}</p>
          <p class="story-para">${p.summary}</p>
          ${metrics}
          <button type="button" class="text-btn" data-project="${p.id}">Full story →</button>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderLegend() {
  const el = document.getElementById("data-legend");
  if (!el) return;
  el.innerHTML = C()
    .performance3d.map((d) => {
      const delta = d.change
        ? `<span class="market-kpi-change">${d.change}</span>`
        : "";
      const short = d.label.replace(/\s+(leads|chats|growth)$/i, "").trim();
      return `
    <li class="market-kpi">
      <span class="dot" style="background:${d.color}"></span>
      <span class="market-kpi-body">
        <span class="market-kpi-label">${short}</span>
        <span class="market-kpi-row2">
          <strong>${d.value}</strong>
          ${delta}
        </span>
      </span>
    </li>`;
    })
    .join("");
}

function renderAreas() {
  document.getElementById("areas-title").textContent = C().areasTitle;
  document.getElementById("areas-grid").innerHTML = C()
    .areasOfWork.map((a) => `<article class="area"><h3>${a.title}</h3><p>${a.text}</p></article>`)
    .join("");
}

function renderClients() {
  const ind = C().industries;
  document.getElementById("industries-title").textContent = ind.title;
  document.getElementById("industries-body").textContent = ind.body;
  document.getElementById("industries-clients").textContent = ind.clients;
  document.getElementById("client-pills").innerHTML = C()
    .clientsList.map((n) => `<span>${n}</span>`)
    .join("");
}

function renderVideo() {
  const v = C().videoPortfolio;
  document.getElementById("video-title").textContent = v.title;
  document.getElementById("video-body").textContent = v.body;
  document.getElementById("video-bg").src = C().images.video;
}

function renderChannels() {
  document.getElementById("channels-grid").innerHTML = C()
    .channels.map(
      (ch) => `
    <article class="channel">
      <img src="${ch.image}" alt="${ch.title}" loading="lazy" />
      <div><h3>${ch.title}</h3><p>${ch.text}</p></div>
    </article>
  `
    )
    .join("");
}

function renderProcess() {
  document.getElementById("process-title").textContent = C().processTitle;
  document.getElementById("process-list").innerHTML = C()
    .process.map(
      (s) => `
    <li><span class="step-num">${s.step}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></li>
  `
    )
    .join("");
}

function renderTools() {
  document.getElementById("tools-title").textContent = C().toolsTitle;
  document.getElementById("tools-grid").innerHTML = C()
    .toolGroups.map((g) => `<div class="tool"><h3>${g.title}</h3><p>${g.items}</p></div>`)
    .join("");
}

function renderAbout() {
  const a = C().about;
  const m = C().msme;
  document.getElementById("about-img").src = C().images.about;
  document.getElementById("about-context-title").textContent = a.contextTitle;
  document.getElementById("about-context").innerHTML = a.context.map((p) => `<p>${p}</p>`).join("");
  document.getElementById("about-approach-title").textContent = a.approachTitle;
  document.getElementById("about-approach").innerHTML = a.approach.map((p) => `<p>${p}</p>`).join("");
  document.getElementById("msme-block").innerHTML = `<h3>${m.title}</h3>${m.paragraphs
    .map((p) => `<p>${p}</p>`)
    .join("")}`;
}

function renderContact() {
  const c = C().contact;
  document.getElementById("contact-intro").textContent = c.intro;
  document.getElementById("contact-loc").textContent = C().location;
  const em = document.getElementById("contact-email");
  em.href = `mailto:${C().email}`;
  em.textContent = C().email;
  document.getElementById("contact-opp-title").textContent = c.opportunities.title;
  document.getElementById("contact-opp-body").textContent = c.opportunities.body;
  document.getElementById("contact-proj-title").textContent = c.projects.title;
  document.getElementById("contact-proj-body").textContent = c.projects.body;
  document.getElementById("resume-body").textContent = C().resume.body;
  document.getElementById("image-credit").textContent = C().imageCredit || "";
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.onclick = () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
  document.getElementById("panel-close").onclick = closeProject;
  document.getElementById("panel-backdrop").onclick = closeProject;
}

function initHeader() {
  const header = document.querySelector(".site-header");
  window.addEventListener(
    "scroll",
    () => header.classList.toggle("is-scrolled", window.scrollY > 10),
    { passive: true }
  );
}

function initApp() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  if (!window.PORTFOLIO) {
    console.error("Portfolio data did not load — check config.js");
    return;
  }

  const steps = [
    renderHome,
    renderPhilosophy,
    renderWhat,
    renderReels,
    renderStories,
    renderLegend,
    renderAreas,
    renderClients,
    renderVideo,
    renderChannels,
    renderProcess,
    renderTools,
    renderAbout,
    renderContact,
    bindProjectClicks,
    initNav,
    initHeader,
    initImageFallbacks,
  ];

  steps.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.error(fn.name || "init", err);
    }
  });

  document.querySelectorAll(".hero-copy > *").forEach((el, i) => {
    el.classList.add("motion-pending");
    el.style.setProperty("--motion-i", String(i));
    requestAnimationFrame(() => el.classList.add("motion-in"));
  });
  const frame = document.querySelector(".hero-frame");
  if (frame) {
    frame.classList.add("motion-pending");
    requestAnimationFrame(() => frame.classList.add("motion-in"));
  }

  if (typeof window.initPortfolioMotion === "function") {
    window.initPortfolioMotion();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
