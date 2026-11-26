import { useRef } from "react";
import { BookButton } from "../BookButton";
import { Icon } from "../Icon";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  STUDIO_ADDRESS,
  STUDIO_MAPS_URL,
  navigation,
} from "../../data/siteData";
import { easeOut, seg, useScrollScene } from "../../lib/motion";

const WORD = "CAVERNA".split("");

export function Footer() {
  const markRef = useRef<HTMLDivElement>(null);

  // Letters climb out of the floor one after another as the footer comes into view.
  useScrollScene(
    markRef,
    (p, reduced) => {
      const letters = markRef.current?.querySelectorAll<HTMLElement>(".footer-mark__word span");
      letters?.forEach((letter, index) => {
        const t = reduced ? 1 : easeOut(seg(p, 0.05 + index * 0.07, 0.5 + index * 0.07));
        letter.style.transform = `translate3d(0, ${((1 - t) * 70).toFixed(2)}%, 0) rotate(${((1 - t) * (index % 2 ? 6 : -6)).toFixed(2)}deg)`;
      });
    },
    { mode: "enter" },
  );

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <p className="footer-lead">Histórias, ideias e conexões gravadas em São Gonçalo.</p>
          <BookButton label="Agendar pelo WhatsApp" />
        </div>
        <div className="footer-col">
          <h2 className="footer-h">Páginas</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-h">Contato</h2>
          <ul>
            <li>
              <a href={PHONE_TEL}>
                <Icon name="phone" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Icon name="instagram" /> {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={STUDIO_MAPS_URL} target="_blank" rel="noreferrer">
                <Icon name="map-pin" /> Ver no mapa
              </a>
            </li>
          </ul>
          <address className="footer-address">{STUDIO_ADDRESS}</address>
        </div>
      </div>

      <div className="footer-mark" ref={markRef} aria-hidden="true">
        <div className="footer-mark__word">
          {WORD.map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Caverna Cast</span>
        <span>Uma produção da Caverna Mestra Produções</span>
        <a href="#inicio-da-pagina">Voltar ao topo</a>
      </div>
    </footer>
  );
}
