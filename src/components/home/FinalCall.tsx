import { useRef } from "react";
import { BookButton, PlayMark } from "../BookButton";
import { Icon } from "../Icon";
import { PHONE_DISPLAY, PHONE_TEL } from "../../data/siteData";
import { easeOut, mix, useScrollScene } from "../../lib/motion";

/** Closing call to action; the logo's play triangle turns into place as the section arrives. */
export function FinalCall({ title = "Sua próxima conversa pode sair daqui." }: { title?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollScene(
    sectionRef,
    (p, reduced) => {
      const mark = sectionRef.current?.querySelector<HTMLElement>(".final-call__mark");
      if (!mark) return;
      const t = reduced ? 1 : easeOut(p);
      mark.style.transform = `translate3d(${mix(18, 0, t).toFixed(2)}%, 0, 0) rotate(${mix(-38, 0, t).toFixed(2)}deg) scale(${mix(0.7, 1, t).toFixed(3)})`;
    },
    { mode: "enter" },
  );

  return (
    <section className="final-call" ref={sectionRef} aria-labelledby="final-call-title">
      <div className="final-call__mark" aria-hidden="true">
        <PlayMark />
      </div>
      <div className="shell final-call__inner">
        <h2 id="final-call-title" className="final-call__title">
          {title}
        </h2>
        <div className="final-call__actions">
          <BookButton label="Agendar pelo WhatsApp" variant="blue" />
          <a className="final-call__phone" href={PHONE_TEL}>
            <Icon name="phone" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
