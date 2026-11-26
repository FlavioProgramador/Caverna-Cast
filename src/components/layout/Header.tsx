import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { BookButton } from "../BookButton";
import { RollText } from "../RollText";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, navigation } from "../../data/siteData";

export type PageKey = "home" | "studio" | "services" | "packages" | "contact";

const pageHref: Record<PageKey, string> = {
  home: "./index.html#inicio",
  studio: "./estudio.html",
  services: "./servicos.html",
  packages: "./pacotes.html",
  contact: "./contato.html",
};

export function Header({ page }: { page: PageKey }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "") + (open ? " is-open" : "")}>
      <div className="site-header__bar">
        <a className="brand" href="./index.html#inicio" aria-label="Caverna Cast, página inicial">
          <img src="/caverna-cast-logo.png" width="200" height="200" alt="" />
          <span className="brand__name">Caverna Cast</span>
        </a>

        <nav id="site-navigation" className="nav" aria-label="Navegação principal">
          <ul className="nav__list">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a
                  className="nav__link"
                  href={item.href}
                  aria-current={pageHref[page] === item.href ? "page" : undefined}
                  style={{ "--i": index } as CSSProperties}
                  onClick={() => setOpen(false)}
                >
                  <RollText>{item.label}</RollText>
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__extra">
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">{INSTAGRAM_HANDLE}</a>
          </div>
        </nav>

        {page !== "contact" && <BookButton label="Agendar" size="sm" className="header-cta" aria-label="Agendar gravação pelo WhatsApp" />}

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
