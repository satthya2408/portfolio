"use client";

type SiteHeaderProps = {
  navOpen: boolean;
  onToggleNav: () => void;
  onNavClick: () => void;
};

export default function SiteHeader({ navOpen, onToggleNav, onNavClick }: SiteHeaderProps) {
  return (
    <header className="site-header" id="top">
      <div className="wrap header-inner">
        <a className="logo" href="#top">SATTHYA JEEVAA</a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          onClick={onToggleNav}
        >
          <span className="nav-toggle-bar" />
          <span className="sr-only">Menu</span>
        </button>
        <nav className={`site-nav${navOpen ? " is-open" : ""}`} id="site-nav" aria-label="Primary">
          <a href="#work" onClick={onNavClick}>Work</a>
          <a href="#data-3d" onClick={onNavClick}>Results</a>
          <a href="#about" onClick={onNavClick}>About</a>
          <a href="#contact" onClick={onNavClick}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
