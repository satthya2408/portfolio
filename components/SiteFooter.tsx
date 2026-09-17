import type { PortfolioData } from "@/data/portfolio";

type SiteFooterProps = {
  data: PortfolioData;
  year: number;
};

export default function SiteFooter({ data, year }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-logo">SATTHYA JEEVAA</p>
          <p>
            Digital marketing strategist
            <br />
            Chennai, Tamil Nadu
          </p>
        </div>
        <nav className="footer-nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={`mailto:${data.email}`}>Email</a>
        </nav>
        <p className="footer-legal">
          © {year} Satthya Jeevaa. Client work belongs to the clients.
        </p>
        <p className="footer-credit" id="image-credit">{data.imageCredit || ""}</p>
      </div>
    </footer>
  );
}
