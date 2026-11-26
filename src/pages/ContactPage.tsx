import { BookButton } from "../components/BookButton";
import { Icon } from "../components/Icon";
import { Location } from "../components/sections/Location";
import { PageHero } from "../components/sections/PageHero";
import { WhatsAppLink } from "../components/WhatsAppLink";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, generalMessage } from "../data/siteData";

const channels = [
  { label: "WhatsApp", value: "Mandar mensagem", icon: "whatsapp" as const, kind: "whatsapp" as const },
  { label: "Telefone", value: PHONE_DISPLAY, icon: "phone" as const, href: PHONE_TEL },
  { label: "Instagram", value: INSTAGRAM_HANDLE, icon: "instagram" as const, href: INSTAGRAM_URL, external: true },
];

export function ContactPage() {
  return (
    <>
      <PageHero
        id="contact-title"
        lines={["Vamos", "gravar?"]}
        lead="Chame no WhatsApp para consultar horários, escolher o pacote e alinhar o formato do seu programa."
      >
        <BookButton label="Conversar no WhatsApp" />
      </PageHero>
      <section className="section channels" aria-label="Canais de contato">
        <ul className="shell channels__list">
          {channels.map((channel) => {
            const inner = (
              <>
                <span className="channels__label">
                  <Icon name={channel.icon} /> {channel.label}
                </span>
                <span className="channels__value">{channel.value}</span>
              </>
            );
            return (
              <li key={channel.label}>
                {channel.kind === "whatsapp" ? (
                  <WhatsAppLink className="channels__row" message={generalMessage}>
                    {inner}
                  </WhatsAppLink>
                ) : (
                  <a
                    className="channels__row"
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <Location title="Como chegar" />
    </>
  );
}
