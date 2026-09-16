(function initMarketChart() {
  const canvas = document.getElementById("market-canvas");
  const panel = document.getElementById("market-panel");
  const readout = document.getElementById("market-readout");
  if (!canvas || !panel || !window.PORTFOLIO) return;

  const cfg = PORTFOLIO.marketAnalysis || {};
  const volumes = PORTFOLIO.performance3d || [];
  const weeks = cfg.weeks || [];
  const trend = cfg.trend || [];
  if (!trend.length) return;

  const pairEl = document.getElementById("market-pair");
  const periodEl = document.getElementById("market-period");
  if (pairEl) pairEl.textContent = cfg.pair || "PERFORMANCE";
  if (periodEl) periodEl.textContent = cfg.period || "";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d");

  const pad = { top: 14, right: 12, bottom: 36, left: 36 };
  const volH = 0.22;

  let progress = reduced ? 1 : 0;
  let active = false;
  let hover = null;

  const accent = "#6ecbff";
  const up = "#5ee1a2";
  const grid = "rgba(244, 239, 230, 0.08)";
  const gridBold = "rgba(244, 239, 230, 0.14)";
  const text = "rgba(244, 239, 230, 0.55)";
  const textBright = "#f4efe6";

  function chartArea(w, h) {
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const volTop = pad.top + ch * (1 - volH);
    const lineH = ch * (1 - volH) - 8;
    return { cw, ch, volTop, lineH, lineBottom: volTop - 4 };
  }

  function yScale(val, min, max, lineTop, lineBottom) {
    const t = (val - min) / (max - min || 1);
    return lineBottom - t * (lineBottom - lineTop);
  }

  function xAt(i, n, left, cw) {
    if (n <= 1) return left + cw / 2;
    return left + (i / (n - 1)) * cw;
  }

  function draw(progressT) {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || panel.clientWidth;
    const h = rect.height || 168;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    const { cw, volTop, lineH, lineBottom } = chartArea(w, h);
    const left = pad.left;
    const minV = Math.min(...trend) * 0.92;
    const maxV = Math.max(...trend) * 1.06;
    const lineTop = lineBottom - lineH;
    const n = trend.length;
    const lastIdx = n - 1;
    const showIdx = Math.min(lastIdx, Math.floor(progressT * lastIdx));

    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    for (let g = 0; g <= 3; g++) {
      const y = lineTop + (lineH * g) / 3;
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(left + cw, y);
      ctx.stroke();
      const val = maxV - ((maxV - minV) * g) / 3;
      ctx.fillStyle = text;
      ctx.font = "9px Instrument Sans, system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(String(Math.round(val)), left - 8, y);
    }

    ctx.strokeStyle = gridBold;
    ctx.beginPath();
    ctx.moveTo(left, lineBottom);
    ctx.lineTo(left + cw, lineBottom);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left, volTop);
    ctx.lineTo(left + cw, volTop);
    ctx.stroke();

    const volMax = Math.max(...volumes.map((v) => v.value), 1);
    const barGap = 8;
    const barW = (cw - barGap * (volumes.length + 1)) / volumes.length;

    volumes.forEach((v, i) => {
      const bx = left + barGap + i * (barW + barGap);
      const bh = ((v.value / volMax) * (h - volTop - pad.bottom + 8)) * progressT;
      const by = h - pad.bottom - bh;
      ctx.fillStyle = v.color;
      ctx.globalAlpha = 0.55;
      ctx.fillRect(bx, by, barW, bh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = text;
      ctx.font = "9px Instrument Sans, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const short = v.label.split(" ").slice(0, 2).join(" ");
      ctx.fillText(short, bx + barW / 2, h - pad.bottom + 6);
    });

    ctx.fillStyle = text;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    weeks.forEach((label, i) => {
      if (i % 2 !== 0 && weeks.length > 8) return;
      const x = xAt(i, n, left, cw);
      ctx.fillText(label, x, lineBottom + 6);
    });

    const points = trend.map((val, i) => ({
      x: xAt(i, n, left, cw),
      y: yScale(val, minV, maxV, lineTop, lineBottom),
      val,
    }));

    const grad = ctx.createLinearGradient(0, lineTop, 0, lineBottom);
    grad.addColorStop(0, "rgba(110, 203, 255, 0.35)");
    grad.addColorStop(1, "rgba(110, 203, 255, 0)");

    ctx.beginPath();
    points.forEach((p, i) => {
      if (i > showIdx) return;
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    const endP = points[showIdx];
    ctx.lineTo(endP.x, lineBottom);
    ctx.lineTo(points[0].x, lineBottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    points.forEach((p, i) => {
      if (i > showIdx) return;
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    const hi = hover != null ? points[hover] : points[showIdx];
    if (hi) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(244, 239, 230, 0.25)";
      ctx.beginPath();
      ctx.moveTo(hi.x, lineTop);
      ctx.lineTo(hi.x, h - pad.bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(hi.x, hi.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = textBright;
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (readout) {
        readout.innerHTML = `<strong>${hi.val}</strong> <span>${weeks[hover != null ? hover : showIdx] || ""} · ${cfg.trendLabel || "volume"}</span>`;
      }
    }

    const last = points[lastIdx];
    if (progressT >= 0.98 && last) {
      const tag = ` ${trend[lastIdx]} `;
      ctx.font = "600 11px Instrument Sans, system-ui, sans-serif";
      const tw = ctx.measureText(tag).width + 16;
      const tx = Math.min(last.x + 8, left + cw - tw);
      const ty = last.y - 22;
      ctx.fillStyle = up;
      ctx.globalAlpha = 0.2;
      ctx.fillRect(tx, ty, tw, 20);
      ctx.globalAlpha = 1;
      ctx.fillStyle = up;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(tag.trim(), tx + 8, ty + 10);
    }
  }

  function pointerIndex(clientX) {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const { cw } = chartArea(w, h);
    const left = pad.left;
    const x = clientX - rect.left;
    const n = trend.length;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < n; i++) {
      const px = xAt(i, n, left, cw);
      const d = Math.abs(px - x);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best;
  }

  canvas.addEventListener("pointermove", (e) => {
    hover = pointerIndex(e.clientX);
    draw(progress);
  });
  canvas.addEventListener("pointerleave", () => {
    hover = null;
    draw(progress);
  });

  function tick() {
    if (active && progress < 1) {
      progress = Math.min(1, progress + (reduced ? 1 : 0.028));
      draw(progress);
    }
  }

  const obs = new IntersectionObserver(
    (entries) => {
      active = entries[0]?.isIntersecting ?? false;
      if (active && reduced) {
        progress = 1;
        draw(progress);
      }
    },
    { threshold: 0.2 }
  );
  obs.observe(panel);

  window.addEventListener("resize", () => draw(progress));
  draw(progress);
  if (!reduced) {
    const loop = () => {
      tick();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();
