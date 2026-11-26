import { CaveHero } from "../components/home/CaveHero";
import { CutsPhone } from "../components/home/CutsPhone";
import { FinalCall } from "../components/home/FinalCall";
import { Manifesto } from "../components/home/Manifesto";
import { StudioStack } from "../components/home/StudioStack";
import { PackageTickets } from "../components/PackageTickets";

export function HomePage() {
  return (
    <>
      <CaveHero />
      <Manifesto />
      <StudioStack />
      <CutsPhone />
      <section className="section home-packages" aria-labelledby="home-packages-title">
        <div className="shell">
          <div className="section-head">
            <h2 id="home-packages-title" className="h-section">
              Escolha quanto tempo de estúdio você precisa.
            </h2>
            <p className="lead">Os dois pacotes incluem gravação em 4K, cenário para até 4 pessoas e edição.</p>
          </div>
          <PackageTickets detailed={false} />
        </div>
      </section>
      <FinalCall />
    </>
  );
}
