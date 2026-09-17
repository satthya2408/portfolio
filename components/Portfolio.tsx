"use client";

import { useState } from "react";
import { PORTFOLIO } from "@/data/portfolio";
import { usePortfolioRuntime } from "@/hooks/usePortfolioRuntime";
import { useProjectPanel } from "@/hooks/useProjectPanel";
import {
  MARQUEE_WORDS,
  instagramHref,
  kpiShortLabel,
  reelMedia,
} from "@/lib/portfolio-utils";
import ProjectPanel from "@/components/ProjectPanel";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Portfolio() {
  const data = PORTFOLIO;
  const year = new Date().getFullYear();
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  const { panelProject, panelOpen, openProject, closeProject } = useProjectPanel(data.projects);
  const runtime = usePortfolioRuntime(data);
  const ig = instagramHref(data.instagram || "");

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="bg-glow" aria-hidden="true" />

      <SiteHeader
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((o) => !o)}
        onNavClick={closeNav}
      />

      <main id="main">
        <section className="hero">
          <canvas ref={runtime.heroCanvasRef} id="hero-scene" className="hero-canvas" aria-hidden="true" />
          <div className="wrap hero-shell">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="kicker" id="home-kicker">{data.home.kicker}</p>
                <h1 className="hero-name" id="home-title">{data.home.title}</h1>
                <p className="hero-role" id="home-role">{data.home.roleLine}</p>
                <p className="hero-headline" id="home-headline">{data.home.headline}</p>
                <p className="hero-sub" id="home-sub">{data.home.subhead}</p>
                <ul className="hero-stats" aria-label="Highlights">
                  <li><strong>13+</strong><span>Brands</span></li>
                  <li><strong>416</strong><span>Leads (SV Plymart)</span></li>
                  <li><strong>580</strong><span>WhatsApp chats (Murali RO)</span></li>
                </ul>
                <div className="hero-actions">
                  <a className="btn btn-fill" href="#work">See the work</a>
                  <a className="btn btn-line" href="#contact">Get in touch</a>
                </div>
              </div>
              <figure className="hero-frame">
                <img
                  id="hero-img"
                  src={data.images.hero}
                  alt="Team working on a marketing plan"
                  width={640}
                  height={760}
                  decoding="async"
                />
              </figure>
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-inner" id="marquee-text">
              {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
                <span key={`${w}-${i}`}>{w}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="philosophy">
          <div className="wrap split">
            <div className="split-text">
              <p className="section-eyebrow">My approach</p>
              <h2 className="display" id="philosophy-title">{data.philosophy.title}</h2>
              <div className="prose" id="philosophy-body">
                {data.philosophy.paragraphs.map((x) => (
                  <p key={x.slice(0, 24)}>{x}</p>
                ))}
              </div>
            </div>
            <figure className="split-img">
              <img
                id="philosophy-img"
                src={data.images.philosophy}
                alt="Marketing dashboard"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="section section-alt" id="showcase">
          <div className="wrap">
            <h2 className="label">What I do</h2>
            <p className="lead" id="what-intro">{data.whatIDo.intro}</p>
            <div className="tiles" id="what-tiles">
              {data.whatIDo.items.map((t) => (
                <article className="tile" key={t.title}>
                  <img src={t.image} alt={t.title} loading="lazy" />
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </article>
              ))}
            </div>
            <div className="reels-head">
              <h3 className="label label-sm">A peek at the work</h3>
              {ig ? (
                <a
                  className="reels-ig-link"
                  id="reels-instagram-link"
                  href={ig}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Instagram
                </a>
              ) : null}
            </div>
            <div className="reels">
              <div className="reels-track" id="reels-track" ref={runtime.reelsTrackRef}>
                {(data.showcaseReels || []).map((item, i) => {
                  const media = reelMedia(item);
                  if (!media) return null;
                  if (media.type === "gif") {
                    return (
                      <figure className="reel" key={i}>
                        <img src={media.src} alt="" loading="lazy" decoding="async" />
                      </figure>
                    );
                  }
                  return (
                    <figure className="reel" key={i}>
                      <video
                        src={media.src}
                        poster={media.poster}
                        controls
                        playsInline
                        preload="metadata"
                      />
                    </figure>
                  );
                })}
              </div>
              <div className="reels-nav">
                <button
                  type="button"
                  className="round-btn"
                  id="reel-prev"
                  aria-label="Previous"
                  onClick={() => runtime.scrollReels(-1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="round-btn"
                  id="reel-next"
                  aria-label="Next"
                  onClick={() => runtime.scrollReels(1)}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="wrap">
            <h2 className="label" id="work-featured-title">{data.workSection.featuredTitle}</h2>
            <p className="lead" id="work-featured-lead">{data.workSection.featuredLead}</p>
            <div className="stories" id="project-stories">
              {data.projects.map((p, i) => (
                <article className={`story${i % 2 ? " story--flip" : ""}`} id={p.id} key={p.id}>
                  <button type="button" className="story-visual" data-project={p.id} onClick={() => openProject(p.id)}>
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <span className="story-cta">Read more</span>
                  </button>
                  <div className="story-body">
                    <p className="story-cat">{p.category} · {p.duration}</p>
                    <h3>{p.title}</h3>
                    <p className="story-role">{p.role}</p>
                    <p className="story-para">{p.summary}</p>
                    {p.metrics?.length ? (
                      <ul className="story-metrics">
                        {p.metrics.map((m) => (
                          <li key={m.label}>
                            <strong>{m.value}</strong>
                            <span>{m.label}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <button type="button" className="text-btn" data-project={p.id} onClick={() => openProject(p.id)}>
                      Full story →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="data-3d">
          <div className="wrap market-section">
            <div className="market-header">
              <h2 className="label light">Campaign analytics</h2>
              <div className="market-meta">
                <span className="market-live">Live</span>
                <span className="market-period" id="market-period" ref={runtime.marketPeriodRef} />
              </div>
            </div>
            <div className="market-panel" id="market-panel" ref={runtime.marketPanelRef}>
              <ul className="market-kpis market-kpis--strip" id="data-legend">
                {data.performance3d.map((d) => (
                  <li className="market-kpi" key={d.label}>
                    <span className="dot" style={{ background: d.color }} />
                    <span className="market-kpi-body">
                      <span className="market-kpi-label">{kpiShortLabel(d.label)}</span>
                      <span className="market-kpi-row2">
                        <strong>{d.value}</strong>
                        {d.change ? <span className="market-kpi-change">{d.change}</span> : null}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="market-toolbar">
                <span className="market-pair" id="market-pair" ref={runtime.marketPairRef} />
                <span className="market-readout" id="market-readout" ref={runtime.marketReadoutRef} aria-live="polite">
                  —
                </span>
              </div>
              <canvas
                ref={runtime.marketCanvasRef}
                id="market-canvas"
                aria-label="Campaign performance trend chart"
              />
            </div>
          </div>
        </section>

        <ProjectPanel project={panelProject} open={panelOpen} onClose={closeProject} />

        <section className="section" id="expertise">
          <div className="wrap">
            <h2 className="label">Skills</h2>
            <p className="lead" id="areas-title">{data.areasTitle}</p>
            <div className="areas" id="areas-grid">
              {data.areasOfWork.map((a) => (
                <article className="area" key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="clients">
          <div className="wrap">
            <h2 className="label">Clients</h2>
            <h3 className="subhead" id="industries-title">{data.industries.title}</h3>
            <p className="prose" id="industries-body">{data.industries.body}</p>
            <p className="prose" id="industries-clients">{data.industries.clients}</p>
            <div className="client-pills" id="client-pills">
              {data.clientsList.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section video-block" id="video">
          <img
            id="video-bg"
            className="video-bg"
            src={data.images.video}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="wrap video-content">
            <h2 className="label light" id="video-title">{data.videoPortfolio.title}</h2>
            <p className="lead light-dim" id="video-body">{data.videoPortfolio.body}</p>
          </div>
        </section>

        <section className="section" id="channels">
          <div className="wrap">
            <h2 className="label">Channels</h2>
            <div className="channels" id="channels-grid">
              {data.channels.map((ch) => (
                <article className="channel" key={ch.title}>
                  <img src={ch.image} alt={ch.title} loading="lazy" />
                  <div>
                    <h3>{ch.title}</h3>
                    <p>{ch.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="process">
          <div className="wrap">
            <h2 className="label">How I work</h2>
            <p className="lead" id="process-title">{data.processTitle}</p>
            <ol className="steps" id="process-list">
              {data.process.map((s) => (
                <li key={s.step}>
                  <span className="step-num">{s.step}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="tools">
          <div className="wrap">
            <h2 className="label" id="tools-title">{data.toolsTitle}</h2>
            <div className="tools" id="tools-grid">
              {data.toolGroups.map((g) => (
                <div className="tool" key={g.title}>
                  <h3>{g.title}</h3>
                  <p>{g.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="about">
          <div className="wrap split">
            <figure className="split-img">
              <img
                id="about-img"
                src={data.images.about}
                alt="People working together"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="split-text">
              <h2 className="label" id="about-context-title">{data.about.contextTitle}</h2>
              <div className="prose" id="about-context">
                {data.about.context.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <h2 className="label" id="about-approach-title">{data.about.approachTitle}</h2>
              <div className="prose" id="about-approach">
                {data.about.approach.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <div className="msme" id="msme-block">
                <h3>{data.msme.title}</h3>
                {data.msme.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="contact">
          <div className="wrap">
            <h2 className="label light center">Let’s talk</h2>
            <p className="lead light-dim center" id="contact-intro">{data.contact.intro}</p>
            <p className="contact-loc center" id="contact-loc">{data.location}</p>
            <a className="contact-email center" id="contact-email" href={`mailto:${data.email}`}>
              {data.email}
            </a>
            <div className="contact-duo">
              <div className="contact-box">
                <h3 id="contact-opp-title">{data.contact.opportunities.title}</h3>
                <p id="contact-opp-body">{data.contact.opportunities.body}</p>
                <a className="btn btn-fill" href={`mailto:${data.email}?subject=Opportunity`}>Email me</a>
              </div>
              <div className="contact-box">
                <h3 id="contact-proj-title">{data.contact.projects.title}</h3>
                <p id="contact-proj-body">{data.contact.projects.body}</p>
                <a className="btn btn-line light" href={`mailto:${data.email}?subject=Project`}>Start a project</a>
              </div>
            </div>
            <p className="lead light-dim center resume-note" id="resume-body">{data.resume.body}</p>
          </div>
        </section>
      </main>

      <SiteFooter data={data} year={year} />
    </>
  );
}
