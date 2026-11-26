import { CutsSelector } from "../components/sections/CutsSelector";
import { Faq } from "../components/sections/Faq";
import { PageHero } from "../components/sections/PageHero";
import { PackageTickets } from "../components/PackageTickets";

export function PackagesPage() {
  return (
    <>
      <PageHero
        id="packages-title"
        lines={["Escolha", "seu tempo"]}
        lead="Uma hora para uma gravação objetiva ou três horas para produzir episódios e cortes na mesma sessão. O agendamento é feito pelo WhatsApp."
      />
      <section className="section packages" aria-label="Pacotes de gravação">
        <div className="shell">
          <PackageTickets />
        </div>
      </section>
      <CutsSelector />
      <Faq />
    </>
  );
}
