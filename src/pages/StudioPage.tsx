import { BookButton } from "../components/BookButton";
import { Icon } from "../components/Icon";
import { Gallery } from "../components/sections/Gallery";
import { Location } from "../components/sections/Location";
import { PageHero } from "../components/sections/PageHero";
import { ZoomCollage } from "../components/sections/ZoomCollage";
import { studioFeatures } from "../data/siteData";

const featureIcons = ["monitor", "mic", "camera", "sparkles", "layers", "sliders", "play"] as const;

export function StudioPage() {
  return (
    <>
      <PageHero
        id="studio-title"
        lines={["Por dentro", "da Caverna"]}
        lead="Uma sala no Pacheco, em São Gonçalo, montada para gravar conversas: mesa para até 4 pessoas, câmeras em 4K e as cortinas azuis que viram o cenário do seu programa."
      >
        <BookButton label="Agendar uma visita" message="Olá! Gostaria de conhecer o estúdio do Caverna Cast antes de agendar uma gravação." />
      </PageHero>
      <ZoomCollage />
      <section className="section spec" aria-labelledby="spec-title">
        <div className="shell spec__grid">
          <h2 id="spec-title" className="h-section spec__title">
            O que a sala oferece
          </h2>
          <ul className="spec__list">
            {studioFeatures.map((feature, index) => (
              <li key={feature}>
                <Icon name={featureIcons[index % featureIcons.length]} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Gallery />
      <Location />
    </>
  );
}
