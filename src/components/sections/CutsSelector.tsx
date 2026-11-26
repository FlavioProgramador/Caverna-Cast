import { useState } from "react";
import type { CSSProperties } from "react";
import { BookButton } from "../BookButton";
import { cutPackages, pricePerCut } from "../../data/siteData";

/** Odometer: every digit is a vertical strip of 0-9 that rolls to the new value. */
function Odometer({ value }: { value: string }) {
  return (
    <span className="odometer" aria-hidden="true">
      {value.split("").map((char, index) =>
        /\d/.test(char) ? (
          <span className="odometer__digit" key={index} style={{ "--d": Number(char) } as CSSProperties}>
            <span className="odometer__strip">
              {Array.from({ length: 10 }, (_, digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={index} className="odometer__char">
            {char}
          </span>
        ),
      )}
    </span>
  );
}

const label = (quantity: number) => `${quantity} ${quantity === 1 ? "corte" : "cortes"}`;

export function CutsSelector() {
  const [selected, setSelected] = useState(2);
  const pack = cutPackages[selected];

  return (
    <section className="section cuts" id="cortes" aria-labelledby="cuts-title">
      <div className="shell cuts__grid">
        <div>
          <h2 id="cuts-title" className="h-section">
            Cortes para as redes
          </h2>
          <p className="lead">
            Vídeos curtos para Reels, YouTube Shorts, TikTok e Stories, feitos a partir da sua gravação. Quanto mais
            cortes no pacote, menor o preço de cada um.
          </p>
        </div>

        <div className="cuts__panel">
          <div className="cuts__options" role="group" aria-label="Quantidade de cortes">
            {cutPackages.map((item, index) => (
              <button
                key={item.quantity}
                type="button"
                className={"chip chip--big" + (index === selected ? " is-active" : "")}
                aria-pressed={index === selected}
                onClick={() => setSelected(index)}
              >
                {label(item.quantity)}
              </button>
            ))}
          </div>
          <div className="cuts__readout">
            <p className="cuts__price">
              <span className="visually-hidden" aria-live="polite">
                {label(pack.quantity)} por {pack.price}
              </span>
              <span className="cuts__currency" aria-hidden="true">
                R$
              </span>
              <Odometer value={pack.price.replace("R$ ", "")} />
            </p>
            <p className="cuts__unit">
              {pricePerCut(pack.price, pack.quantity)} por corte
            </p>
          </div>
          <BookButton
            label={"Pedir " + label(pack.quantity)}
            message={`Olá! Tenho interesse no pacote de ${label(pack.quantity)} para redes sociais do Caverna Cast, no valor de ${pack.price}. Gostaria de consultar a disponibilidade.`}
          />
        </div>
      </div>
    </section>
  );
}
