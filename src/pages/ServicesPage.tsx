import type { CSSProperties } from "react";
import { BookButton } from "../components/BookButton";
import { FinalCall } from "../components/home/FinalCall";
import { Icon } from "../components/Icon";
import { PageHero } from "../components/sections/PageHero";
import { ProcessStair } from "../components/sections/ProcessStair";
import { ServicesIndex } from "../components/sections/ServicesIndex";
import { differentiators } from "../data/siteData";

export function ServicesPage() {
  return (
    <>
      <PageHero
        id="services-title-page"
        lines={["Do microfone", "ao post"]}
        lead="Gravação, cortes e identidade visual para o seu programa sair da Caverna pronto para publicar."
      >
        <BookButton label="Falar sobre o meu programa" />
      </PageHero>
      <ServicesIndex />
      <section className="section why" aria-labelledby="why-title">
        <div className="shell">
          <h2 id="why-title" className="h-section why__title">
            Por que gravar aqui
          </h2>
          <ul className="why__grid">
            {differentiators.map((item, index) => (
              <li key={item.title} data-reveal="rise" style={{ "--i": index } as CSSProperties}>
                <Icon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ProcessStair />
      <FinalCall title="Pronto para a primeira gravação?" />
    </>
  );
}
