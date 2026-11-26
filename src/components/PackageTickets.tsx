import type { CSSProperties } from "react";
import { BookButton } from "./BookButton";
import { Icon } from "./Icon";
import { Waveform } from "./Waveform";
import { recordingPackages } from "../data/siteData";

/**
 * Recording packages printed as session tickets: a stub with the price, a perforated tear,
 * and the body with what is included. Tickets slide out of a slot when they enter the screen.
 */
export function PackageTickets({ detailed = true }: { detailed?: boolean }) {
  return (
    <div className={"tickets" + (detailed ? "" : " tickets--compact")}>
      {recordingPackages.map((item, index) => {
        const hours = index === 0 ? "1 hora" : "3 horas";
        const features = detailed ? item.features : item.features.slice(0, 4);
        return (
          <div className="ticket-slot" data-reveal="print" style={{ "--i": index } as CSSProperties} key={item.id}>
          <article
            className={"ticket" + (index === 1 ? " ticket--featured" : "")}
            aria-labelledby={`ticket-${item.id}`}
          >
            <div className="ticket__stub">
              <div className="ticket__top">
                <span>{item.eyebrow}</span>
                {index === 1 && <span className="ticket__badge">Mais completo</span>}
              </div>
              <h3 id={`ticket-${item.id}`} className="ticket__title">
                {item.title}
              </h3>
              <p className="ticket__price">{item.price}</p>
              <p className="ticket__description">{item.description}</p>
            </div>
            <div className="ticket__tear" aria-hidden="true">
              <span />
            </div>
            <div className="ticket__body">
              <ul className="ticket__list">
                {features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" /> <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {detailed && item.note && <p className="ticket__note">{item.note}</p>}
              <Waveform bars={46} seed={index + 2} className="ticket__wave" />
              <div className="ticket__actions">
                <BookButton label={"Escolher " + hours} message={item.message} variant={index === 1 ? "ocre" : "light"} />
                {!detailed && (
                  <a className="text-link" href="./pacotes.html">
                    Ver tudo que inclui
                  </a>
                )}
              </div>
            </div>
          </article>
          </div>
        );
      })}
    </div>
  );
}
