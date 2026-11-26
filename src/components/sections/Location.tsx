import { Icon } from "../Icon";
import { STUDIO_ADDRESS, STUDIO_DIRECTIONS_URL, STUDIO_MAP_EMBED_URL, STUDIO_MAPS_URL } from "../../data/siteData";

export function Location({ title = "Onde fica a Caverna" }: { title?: string }) {
  return (
    <section className="section location" id="localizacao" aria-labelledby="location-title">
      <div className="shell location__grid">
        <div className="location__copy">
          <h2 id="location-title" className="h-section">
            {title}
          </h2>
          <address className="location__address">
            <Icon name="map-pin" />
            <span>{STUDIO_ADDRESS}</span>
          </address>
          <div className="location__actions">
            <a className="btn btn--blue" href={STUDIO_DIRECTIONS_URL} target="_blank" rel="noreferrer">
              <span className="btn__icon">
                <Icon name="route" />
              </span>
              Traçar rota
            </a>
            <a className="text-link" href={STUDIO_MAPS_URL} target="_blank" rel="noreferrer">
              Abrir no Google Maps
            </a>
          </div>
        </div>
        <div className="location__map">
          <iframe
            title="Mapa com a localização do Caverna Cast"
            src={STUDIO_MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
