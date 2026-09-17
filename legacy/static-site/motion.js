function initPortfolioMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = () =>
    document.querySelectorAll(
      [
        ".hero-copy > *",
        ".hero-frame",
        ".section .wrap",
        ".story",
        ".tile",
        ".area",
        ".channel",
        ".tool",
        ".lib-card",
        ".contact-box",
        ".data-layout > *",
      ].join(",")
    );

  const markVisible = (el) => el.classList.add("motion-in");

  if (reduced) {
    revealTargets().forEach(markVisible);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = el.parentElement?.querySelectorAll(":scope > .motion-pending");
        if (siblings && siblings.length > 1 && el.classList.contains("motion-pending")) {
          let delay = 0;
          siblings.forEach((sib) => {
            if (sib === el || sib.classList.contains("motion-in")) return;
          });
          Array.from(siblings).forEach((sib, i) => {
            if (sib === el) delay = i * 70;
          });
          el.style.transitionDelay = `${delay}ms`;
        }
        markVisible(el);
        io.unobserve(el);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
  );

  revealTargets().forEach((el) => {
    el.classList.add("motion-pending");
    io.observe(el);
  });

  document.querySelectorAll(".tile, .hero-stats li").forEach((el, i) => {
    el.style.setProperty("--motion-i", String(i));
  });

  const heroImg = document.querySelector(".hero-frame");
  if (heroImg && !reduced) {
    window.addEventListener(
      "pointermove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        heroImg.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
      },
      { passive: true }
    );
  }

  document.querySelectorAll(".story-metrics strong").forEach((el) => {
    if (reduced) return;
    const original = el.textContent.trim();
    if (!/^\d+$/.test(original)) return;
    const end = parseInt(original, 10);
    const ioNum = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const dur = 1000;
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now - t0) / dur);
          const val = Math.floor(end * (1 - Math.pow(1 - p, 3)));
          el.textContent = String(val);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = original;
        };
        requestAnimationFrame(step);
        ioNum.disconnect();
      },
      { threshold: 0.5 }
    );
    ioNum.observe(el);
  });
}

window.initPortfolioMotion = initPortfolioMotion;
