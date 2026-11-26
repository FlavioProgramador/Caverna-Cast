import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { services } from "../../data/siteData";

/*
 * Services as a large index (after the Norte Atelier project list): each row opens to show what is
 * included, and on pointer devices a photo of the service follows the cursor over the list.
 */
export function ServicesIndex() {
  const [open, setOpen] = useState<string | null>(services[0].id);
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      float.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) rotate(${((x - cx) * 0.04).toFixed(2)}deg)`;
      frame = requestAnimationFrame(loop);
    };
    const move = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    };
    list.addEventListener("pointermove", move);
    frame = requestAnimationFrame(loop);
    return () => {
      list.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section services" aria-labelledby="services-title">
      <div className="shell">
        <h2 id="services-title" className="visually-hidden">
          Serviços do Caverna Cast
        </h2>
        <div className="services__list" ref={listRef}>
          <div className={"services__float" + (hovered !== null ? " is-visible" : "")} ref={floatRef} aria-hidden="true">
            {services.map((service, index) => (
              <img key={service.id} src={service.image} alt="" className={index === hovered ? "is-active" : ""} />
            ))}
          </div>
          {services.map((service, index) => {
            const isOpen = open === service.id;
            return (
              <article className={"service" + (isOpen ? " is-open" : "")} key={service.id}>
                <h3>
                  <button
                    type="button"
                    className="service__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`service-${service.id}`}
                    onClick={() => {
                      setOpen(isOpen ? null : service.id);
                      setHovered(null);
                    }}
                    onPointerEnter={() => setHovered(isOpen ? null : index)}
                    onPointerLeave={() => setHovered(null)}
                  >
                    <span className="service__title">{service.title}</span>
                    <span className="service__plus" aria-hidden="true">
                      <Icon name="plus" />
                    </span>
                  </button>
                </h3>
                <div className="service__panel" id={`service-${service.id}`} role="region" aria-label={service.title}>
                  <div className="service__inner">
                    <img className="service__image" src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                    <div>
                      <p className="service__summary">{service.summary}</p>
                      <ul className="service__items">
                        {service.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <a className="text-link" href={service.href}>
                        {service.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
