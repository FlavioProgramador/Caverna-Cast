import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { Icon } from "../Icon";
import { gallery } from "../../data/siteData";

type ViewTransitionDocument = Document & { startViewTransition?: (callback: () => void) => unknown };

/** Filterable photo wall with a keyboard-friendly lightbox. Filtering morphs tiles via View Transitions. */
export function Gallery() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const categories = ["Todos", ...new Set(gallery.map((image) => image.category))];
  const visible = activeCategory === "Todos" ? gallery : gallery.filter((image) => image.category === activeCategory);
  const active = activeImage === null ? null : (visible[activeImage] ?? null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeImage === null) {
      if (dialog.open) dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [activeImage]);

  function choose(category: string) {
    const update = () => {
      setActiveCategory(category);
      setActiveImage(null);
    };
    const doc = document as ViewTransitionDocument;
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(() => flushSync(update));
    } else {
      update();
    }
  }

  const step = (delta: number) => setActiveImage((index) => (index === null ? null : (index + delta + visible.length) % visible.length));

  function onDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  }

  return (
    <section className="section gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="section-head">
          <h2 id="gallery-title" className="h-section">
            Cada canto da sala.
          </h2>
          <p className="lead">Fotos reais do estúdio, dos equipamentos e dos detalhes que aparecem no seu vídeo.</p>
        </div>

        <div className="gallery__filters" role="group" aria-label="Filtrar fotos da galeria">
          {categories.map((category) => (
            <button
              className={"chip" + (activeCategory === category ? " is-active" : "")}
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => choose(category)}
            >
              {category}
            </button>
          ))}
          <p className="gallery__count" role="status" aria-live="polite" aria-atomic="true">
            {visible.length} {visible.length === 1 ? "foto" : "fotos"}
          </p>
        </div>

        <div className="gallery__grid">
          {visible.map((image, index) => (
            <button
              className={"gallery-tile " + image.className}
              key={image.src}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={"Ampliar foto: " + image.alt}
              style={{ viewTransitionName: "tile-" + gallery.indexOf(image) } as CSSProperties}
            >
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={image.sizes}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
              />
              <span className="gallery-tile__caption">{image.caption}</span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-label="Foto ampliada"
        onClose={() => setActiveImage(null)}
        onKeyDown={onDialogKey}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActiveImage(null);
        }}
      >
        {active && (
          <div className="lightbox__content">
            <button className="lightbox__close" type="button" onClick={() => setActiveImage(null)} aria-label="Fechar foto">
              <Icon name="close" />
            </button>
            <figure>
              <img src={active.src} width={active.width} height={active.height} alt={active.alt} />
              <figcaption>
                <span>{active.caption}</span>
                <span className="lightbox__nav">
                  <button type="button" onClick={() => step(-1)} aria-label="Foto anterior">
                    <Icon name="chevron-left" />
                  </button>
                  <span aria-hidden="true">
                    {activeImage! + 1} de {visible.length}
                  </span>
                  <button type="button" onClick={() => step(1)} aria-label="Próxima foto">
                    <Icon name="chevron-right" />
                  </button>
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </section>
  );
}
