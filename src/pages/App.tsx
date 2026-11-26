import type { ComponentType } from "react";
import { BookButton } from "../components/BookButton";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import type { PageKey } from "../components/layout/Header";
import { SmoothScroll } from "../components/layout/SmoothScroll";
import { useRevealOnce } from "../lib/motion";
import { ContactPage } from "./ContactPage";
import { HomePage } from "./HomePage";
import { PackagesPage } from "./PackagesPage";
import { ServicesPage } from "./ServicesPage";
import { StudioPage } from "./StudioPage";

function currentPage(): PageKey {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith("/estudio.html")) return "studio";
  if (path.endsWith("/servicos.html")) return "services";
  if (path.endsWith("/pacotes.html")) return "packages";
  if (path.endsWith("/contato.html")) return "contact";
  return "home";
}

const pages: Record<PageKey, ComponentType> = {
  home: HomePage,
  studio: StudioPage,
  services: ServicesPage,
  packages: PackagesPage,
  contact: ContactPage,
};

export default function App() {
  const page = currentPage();
  const Page = pages[page];
  useRevealOnce();

  return (
    <>
      <span id="inicio-da-pagina" />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SmoothScroll />
      <Header page={page} />
      <main id="conteudo" className={"page page--" + page}>
        <Page />
      </main>
      <Footer />
      {page !== "contact" && (
        <BookButton label="Agendar" className="mobile-book" aria-label="Agendar gravação pelo WhatsApp" />
      )}
    </>
  );
}
