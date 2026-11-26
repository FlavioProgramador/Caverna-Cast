import { useEffect, useRef, useState } from "react";
import { cutClips, cutPackages } from "../../data/siteData";

const formats = [
  { name: "Reels", body: "Os momentos mais fortes da conversa no formato vertical do Instagram." },
  { name: "YouTube Shorts", body: "Trechos curtos que levam quem assiste até o episódio completo no seu canal." },
  { name: "TikTok", body: "Cortes com ritmo de feed, para chegar a quem ainda não conhece o programa." },
  { name: "Vídeos para Stories", body: "Chamadas rápidas para avisar que tem episódio novo no ar." },
  { name: "Cortes de entrevistas", body: "O melhor de cada convidado, pronto para ele compartilhar também." },
];

/*
 * A sticky phone plays vertical cuts while the list of formats scrolls past.
 * Structure follows the sticky record + track list from the Overtone music school template.
 */
export function CutsPhone() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const first = cutPackages[0];
  const last = cutPackages[cutPackages.length - 1];

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".cuts-phone__item");
    if (!items || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Only the visible clip plays, and only while the section is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onScreen = false;
    const sync = () => {
      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        const shouldPlay = onScreen && !reduced && index === active % cutClips.length;
        if (shouldPlay) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(section);
    sync();
    return () => observer.disconnect();
  }, [active]);

  const clipIndex = active % cutClips.length;

  return (
    <section className="cuts-phone" ref={sectionRef} aria-labelledby="cuts-phone-title">
      <div className="shell cuts-phone__grid">
        <div className="cuts-phone__sticky">
          <div className="phone" aria-hidden="true">
            <div className="phone__screen">
              {cutClips.map((clip, index) => (
                <video
                  key={clip.src}
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  className={"phone__video" + (index === clipIndex ? " is-active" : "")}
                  src={clip.src}
                  poster={clip.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ))}
              <div className="phone__ui">
                <div className="phone__bars">
                  {formats.map((format, index) => (
                    <span key={format.name} className={index < active ? "is-done" : index === active ? "is-now" : ""} />
                  ))}
                </div>
                <div className="phone__profile">
                  <img src="/caverna-cast-logo.png" alt="" width="200" height="200" />
                  <span>_cavernacast</span>
                </div>
                <p className="phone__caption" key={active}>
                  Corte para {formats[active].name}
                </p>
              </div>
            </div>
          </div>
          <p className="cuts-phone__note">Vídeos ilustrativos</p>
        </div>

        <div className="cuts-phone__content">
          <div className="cuts-phone__intro">
            <h2 id="cuts-phone-title" className="h-section">
              Uma conversa rende a semana inteira de posts.
            </h2>
            <p className="lead">
              Depois da gravação, a gente separa os melhores trechos e entrega cada corte no formato da rede em que ele vai
              ser publicado.
            </p>
          </div>
          <ol className="cuts-phone__list">
            {formats.map((format, index) => (
              <li
                key={format.name}
                className={"cuts-phone__item" + (index === active ? " is-active" : "")}
                data-index={index}
              >
                <h3>{format.name}</h3>
                <p>{format.body}</p>
              </li>
            ))}
          </ol>
          <p className="cuts-phone__price">
            Pacotes de {first.quantity} a {last.quantity} cortes, de {first.price} a {last.price}.{" "}
            <a className="text-link" href="./pacotes.html#cortes">
              Ver preços dos cortes
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
