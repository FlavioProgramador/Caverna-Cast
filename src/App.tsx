import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Icon } from "./Icon";
import {
  cutPackages,
  differentiators,
  gallery,
  generalMessage,
  INSTAGRAM_URL,
  navigation,
  processSteps,
  recordingPackages,
  socialFormats,
  studioFeatures,
  visualIdentityItems,
  whatsappUrl,
} from "./siteData";
import { WhatsAppLink } from "./WhatsAppLink";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#inicio" aria-label="Caverna Cast — início">
          <img src="/caverna-cast-logo.png" width="200" height="200" alt="" />
          <span className="brand__name">
            Caverna <strong>Cast</strong>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        <nav
          className={"main-nav" + (menuOpen ? " main-nav--open" : "")}
          id="site-navigation"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <WhatsAppLink className="button button--small button--light nav-cta" message={generalMessage}>
            Agendar gravação <Icon name="arrow" />
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero section-anchor" id="inicio">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Estúdio de podcast <span className="eyebrow__dot">•</span> Rio de Janeiro
          </p>
          <h1>
            Sua ideia merece <em>ser ouvida.</em>
          </h1>
          <p className="hero__lead">
            Um espaço preparado para transformar conversas em conteúdo. Grave seu
            podcast, videocast ou entrevista com estrutura profissional de áudio e vídeo.
          </p>
          <div className="hero__actions">
            <WhatsAppLink className="button button--primary" message={generalMessage}>
              Agendar gravação <Icon name="arrow" />
            </WhatsAppLink>
            <a className="text-link" href="#estrutura">
              Conhecer o estúdio <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero__facts" aria-label="Estrutura do estúdio">
            <div>
              <Icon name="camera" />
              <span><strong>4K</strong> gravação</span>
            </div>
            <div>
              <Icon name="mic" />
              <span>Áudio <strong>profissional</strong></span>
            </div>
            <div>
              <Icon name="monitor" />
              <span>Até <strong>4 participantes</strong></span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            <img
              src="/images/studio/hero-microfone-caverna.webp"
              width="1024"
              height="1536"
              alt="Microfone do Caverna Cast em um cenário de gravação iluminado"
              fetchPriority="high"
            />
            <div className="hero__image-shade" />
            <div className="hero__image-caption">
              <span className="live-dot" />
              <span>Um lugar para a conversa acontecer</span>
            </div>
          </div>
          <div className="hero__orbit hero__orbit--one" aria-hidden="true" />
          <div className="hero__orbit hero__orbit--two" aria-hidden="true" />
          <div className="hero__stamp">
            <span>Grave.</span>
            <span>Conte.</span>
            <span>Conecte.</span>
          </div>
          <span className="hero__index" aria-hidden="true">CC / 01</span>
        </div>
      </div>
      <div className="hero__bottom-rule" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function StudioIntro() {
  return (
    <section className="intro section-pad" id="sobre">
      <div className="shell intro__grid">
        <div className="intro__visual reveal">
          <img
            className="intro__main-image"
            src="/images/studio/mesa-estudio.webp"
            width="1501"
            height="997"
            alt="Mesa de gravação preparada diante das cortinas azuis do estúdio"
            loading="lazy"
          />
          <div className="intro__photo-note">
            <span className="photo-note__number">01</span>
            <span>Caverna Cast · Rio de Janeiro</span>
          </div>
          <div className="intro__detail-image">
            <img
              src="/images/studio/caneca-caverna.webp"
              width="946"
              height="1424"
              alt="Caneca com a marca Caverna Cast sobre a mesa"
              loading="lazy"
            />
          </div>
          <span className="intro__visual-caption">Entre, prepare a conversa e grave.</span>
        </div>
        <div className="intro__copy reveal">
          <p className="eyebrow"><span className="eyebrow__line" /> O estúdio</p>
          <h2>Um espaço para boas conversas <em>e grandes ideias.</em></h2>
          <p>
            O Caverna Cast é o espaço da Caverna Mestra Produções dedicado à produção
            de podcasts, videocasts, entrevistas e conteúdos audiovisuais.
          </p>
          <p>
            Nossa proposta é oferecer um ambiente preparado para você se preocupar
            apenas com o mais importante: o seu conteúdo.
          </p>
          <p>
            Da chegada ao estúdio até a entrega do material, buscamos unir qualidade
            de áudio, imagem e praticidade.
          </p>
          <a className="text-link text-link--light" href="#servicos">
            Veja o que podemos produzir <Icon name="arrow" />
          </a>
          <div className="intro__signature">
            <span className="signature-mark">CM</span>
            <span>Uma produção da <strong>Caverna Mestra Produções</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioSection() {
  return (
    <section className="structure section-pad" id="estrutura">
      <div className="shell">
        <div className="section-heading section-heading--split reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> Estrutura</p>
            <h2>Seu próximo episódio <em>começa aqui.</em></h2>
          </div>
          <p className="section-heading__aside">
            Um cenário pronto para entrevistas, podcasts, bate-papos e diferentes
            formatos de conteúdo.
          </p>
        </div>

        <div className="structure__layout">
          <div className="structure__feature-list reveal">
            {studioFeatures.map((feature, index) => (
              <div className="structure-feature" key={feature}>
                <span className="structure-feature__index">0{index + 1}</span>
                <span>{feature}</span>
                <Icon name="check" />
              </div>
            ))}
          </div>
          <div className="structure__photos reveal">
            <figure className="structure-photo structure-photo--main">
              <img
                src="/images/studio/sala-equipamentos.webp"
                width="1287"
                height="855"
                alt="Câmeras e equipamentos de gravação montados na sala do estúdio"
                loading="lazy"
              />
              <figcaption>01 / Sala de gravação</figcaption>
            </figure>
            <figure className="structure-photo structure-photo--detail">
              <img
                src="/images/studio/microfone-detalhe.webp"
                width="663"
                height="997"
                alt="Microfone pronto para uma gravação no Caverna Cast"
                loading="lazy"
              />
              <figcaption>02 / Captação de áudio</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services section-pad" id="servicos">
      <div className="shell">
        <div className="section-heading reveal">
          <p className="eyebrow"><span className="eyebrow__line" /> O que fazemos</p>
          <h2>Da gravação à <em>próxima publicação.</em></h2>
        </div>
        <div className="services__list">
          <article className="service-row reveal">
            <div className="service-row__number">01</div>
            <div className="service-row__main">
              <div className="service-row__icon"><Icon name="mic" /></div>
              <div>
                <h3>Gravação de podcast</h3>
                <p>Gravação de episódios completos com estrutura de áudio e vídeo.</p>
              </div>
            </div>
            <div className="service-row__detail">
              <span>Podcasts · entrevistas · conversas · programas · YouTube · conteúdo empresarial</span>
              <WhatsAppLink
                className="round-link"
                message="Olá! Quero gravar meu podcast no Caverna Cast. Gostaria de consultar a disponibilidade."
                aria-label="Quero gravar meu podcast"
              >
                <Icon name="arrow" />
              </WhatsAppLink>
            </div>
          </article>

          <article className="service-row reveal">
            <div className="service-row__number">02</div>
            <div className="service-row__main">
              <div className="service-row__icon"><Icon name="scissors" /></div>
              <div>
                <h3>Cortes para redes</h3>
                <p>
                  Os melhores momentos da conversa podem virar vídeos curtos para
                  aproveitar o conteúdo produzido.
                </p>
              </div>
            </div>
            <div className="service-row__detail">
              <span>{socialFormats.join(" · ")}</span>
              <WhatsAppLink
                className="round-link"
                message="Olá! Tenho interesse nos pacotes de cortes para redes sociais do Caverna Cast. Gostaria de mais informações."
                aria-label="Solicitar cortes para redes sociais"
              >
                <Icon name="arrow" />
              </WhatsAppLink>
            </div>
          </article>

          <article className="service-row reveal">
            <div className="service-row__number">03</div>
            <div className="service-row__main">
              <div className="service-row__icon"><Icon name="layers" /></div>
              <div>
                <h3>Identidade visual</h3>
                <p>
                  Elementos visuais para fortalecer a apresentação e a divulgação
                  do seu programa.
                </p>
              </div>
            </div>
            <div className="service-row__detail">
              <span>{visualIdentityItems.join(" · ")}</span>
              <WhatsAppLink
                className="round-link"
                message="Olá! Gostaria de conhecer os serviços de identidade visual para podcast da Caverna Mestra Produções."
                aria-label="Consultar identidade visual para podcast"
              >
                <Icon name="arrow" />
              </WhatsAppLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function RecordingPackages() {
  return (
    <section className="packages section-pad" id="pacotes">
      <div className="shell">
        <div className="section-heading section-heading--split reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> Pacotes de gravação</p>
            <h2>Escolha o tempo. <em>A conversa é sua.</em></h2>
          </div>
          <p className="section-heading__aside">
            Pacotes e benefícios conforme o portfólio do estúdio.
          </p>
        </div>

        <div className="package-grid">
          {recordingPackages.map((item, index) => (
            <article
              className={"package" + (index === 1 ? " package--featured" : "")}
              key={item.id}
            >
              <div className="package__topline">
                <span>{item.eyebrow}</span>
                {index === 1 && <span className="package__marker">3 horas</span>}
              </div>
              <h3>{item.title}</h3>
              <div className="package__price">{item.price}</div>
              <p className="package__description">{item.description}</p>
              <ul className="check-list">
                {item.features.map((feature) => (
                  <li key={feature}><Icon name="check" /> <span>{feature}</span></li>
                ))}
              </ul>
              {item.note && <p className="package__note">{item.note}</p>}
              <WhatsAppLink className="button button--package" message={item.message}>
                Escolher {index === 0 ? "1 hora" : "3 horas"} <Icon name="arrow" />
              </WhatsAppLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CutsPackages() {
  return (
    <section className="cuts section-pad">
      <div className="shell cuts__grid">
        <div className="cuts__intro reveal">
          <p className="eyebrow"><span className="eyebrow__line" /> Conteúdo para redes</p>
          <h2>Uma conversa. <em>Vários momentos.</em></h2>
          <p>
            Transforme seu episódio em vídeos curtos para Reels, Shorts, TikTok,
            Stories e cortes de entrevistas.
          </p>
          <WhatsAppLink
            className="text-link text-link--light"
            message="Olá! Tenho interesse nos pacotes de cortes para redes sociais do Caverna Cast. Gostaria de mais informações."
          >
            Solicitar cortes <Icon name="arrow" />
          </WhatsAppLink>
        </div>
        <div className="cuts__price-list reveal">
          <div className="cuts__list-heading">
            <span>Pacotes de cortes</span>
            <span>Valor</span>
          </div>
          {cutPackages.map(({ quantity, price }) => (
            <div className="cut-price" key={quantity}>
              <span className="cut-price__quantity">
                {quantity} {quantity === 1 ? "corte" : "cortes"}
              </span>
              <strong>{price}</strong>
              <WhatsAppLink
                className="cut-price__action"
                message={"Olá! Tenho interesse no pacote de " + quantity + (quantity === 1 ? " corte" : " cortes") + " para redes sociais do Caverna Cast. Gostaria de consultar a disponibilidade."}
                aria-label={"Escolher pacote com " + quantity + (quantity === 1 ? " corte" : " cortes")}
              >
                <Icon name="arrow" />
              </WhatsAppLink>
            </div>
          ))}
          <p className="cuts__footnote">Pacote escolhido, conversa encaminhada pelo WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}

function WhyCaverna() {
  return (
    <section className="why section-pad">
      <div className="shell">
        <div className="section-heading reveal">
          <p className="eyebrow"><span className="eyebrow__line" /> Por que gravar aqui</p>
          <h2>Seu conteúdo em <em>boas mãos.</em></h2>
        </div>
        <div className="why__grid">
          {differentiators.map((item) => (
            <article className="why-item reveal" key={item.number}>
              <div className="why-item__top">
                <span>{item.number}</span>
                <Icon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="process section-pad">
      <div className="shell">
        <div className="process__header reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> Sem complicação</p>
            <h2>Como <em>funciona.</em></h2>
          </div>
          <p>Você traz a ideia. A gente acompanha cada etapa no estúdio.</p>
        </div>
        <ol className="process__steps">
          {processSteps.map((step, index) => (
            <li className="process-step reveal" key={step.number}>
              <span className="process-step__number">{step.number}</span>
              <span className="process-step__line" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {index < processSteps.length - 1 && (
                <span className="process-step__arrow" aria-hidden="true">↗</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function GallerySection() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = activeImage === null ? null : gallery[activeImage];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeImage === null) {
      if (dialog.open) dialog.close();
    } else if (!dialog.open) {
      dialog.showModal();
    }
  }, [activeImage]);

  function moveImage(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveImage((index) => index === null ? null : (index + 1) % gallery.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveImage((index) => index === null ? null : (index + gallery.length - 1) % gallery.length);
    }
  }

  return (
    <section className="gallery section-pad" id="galeria">
      <div className="shell">
        <div className="section-heading section-heading--split reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" /> Por dentro da Caverna</p>
            <h2>Um estúdio feito para <em>conversar.</em></h2>
          </div>
          <p className="section-heading__aside">
            Um olhar sobre o espaço, os equipamentos e os detalhes do Caverna Cast.
          </p>
        </div>
        <div className="gallery__grid">
          {gallery.map((image, index) => (
            <button
              className={"gallery-tile " + image.className + " reveal"}
              key={image.src}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={"Ampliar foto: " + image.alt}
            >
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                loading="lazy"
              />
              <span className="gallery-tile__caption">
                <span>{image.caption}</span>
                <span className="gallery-tile__expand" aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-label="Visualização ampliada da galeria"
        onClose={() => setActiveImage(null)}
        onKeyDown={moveImage}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActiveImage(null);
        }}
      >
        {active && (
          <div className="lightbox__content">
            <button
              className="lightbox__close"
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Fechar imagem"
            >
              <Icon name="close" />
            </button>
            <button
              className="lightbox__nav lightbox__nav--previous"
              type="button"
              onClick={() => setActiveImage((index) => index === null ? null : (index + gallery.length - 1) % gallery.length)}
              aria-label="Foto anterior"
            >
              <Icon name="chevron-left" />
            </button>
            <figure>
              <img src={active.src} width={active.width} height={active.height} alt={active.alt} />
              <figcaption>{active.caption}</figcaption>
            </figure>
            <button
              className="lightbox__nav lightbox__nav--next"
              type="button"
              onClick={() => setActiveImage((index) => index === null ? null : (index + 1) % gallery.length)}
              aria-label="Próxima foto"
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}

function FinalCallToAction() {
  return (
    <section className="final-cta">
      <div className="shell final-cta__inner reveal">
        <div className="final-cta__image">
          <img
            src="/images/studio/microfones-mesa.webp"
            width="1287"
            height="855"
            alt="Microfones prontos sobre a mesa do estúdio"
            loading="lazy"
          />
        </div>
        <div className="final-cta__copy">
          <p className="eyebrow"><span className="eyebrow__line" /> Próxima parada: gravando</p>
          <h2>Seu podcast <em>começa aqui.</em></h2>
          <p>Tenha um espaço preparado para transformar uma conversa em conteúdo.</p>
          <div className="final-cta__actions">
            <WhatsAppLink className="button button--primary" message={generalMessage}>
              Vamos agendar sua gravação? <Icon name="arrow" />
            </WhatsAppLink>
            <a
              className="text-link text-link--light"
              href={whatsappUrl(generalMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Fale conosco pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand brand--footer" href="#inicio" aria-label="Caverna Cast — início">
              <img src="/caverna-cast-logo.png" width="200" height="200" alt="" />
              <span className="brand__name">Caverna <strong>Cast</strong></span>
            </a>
            <p>Grave. Conte. Conecte.</p>
            <span className="footer-company">Uma produção da Caverna Mestra Produções</span>
          </div>
          <div className="footer-links">
            <span className="footer-label">Navegue</span>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
          <div className="footer-contact">
            <span className="footer-label">Converse com a gente</span>
            <a href="tel:+5521995507294">+55 (21) 99550-7294</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Icon name="instagram" /> @_cavernacast
            </a>
            <span>Rio de Janeiro</span>
          </div>
          <WhatsAppLink className="footer-whatsapp" message={generalMessage} aria-label="Falar com o Caverna Cast pelo WhatsApp">
            <Icon name="whatsapp" />
            <span>Chamar no WhatsApp</span>
            <Icon name="arrow" />
          </WhatsAppLink>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Caverna Cast</span>
          <a href="#inicio">Voltar ao início ↑</a>
          <span>Rio de Janeiro, Brasil</span>
        </div>
      </div>
    </footer>
  );
}

function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main>
        <HeroSection />
        <StudioIntro />
        <StudioSection />
        <ServicesSection />
        <RecordingPackages />
        <CutsPackages />
        <WhyCaverna />
        <ProcessSection />
        <GallerySection />
        <FinalCallToAction />
      </main>
      <Footer />
      <WhatsAppLink
        className="mobile-whatsapp"
        message={generalMessage}
        aria-label="Agendar gravação pelo WhatsApp"
      >
        <Icon name="whatsapp" />
        <span>Agendar pelo WhatsApp</span>
        <Icon name="arrow" />
      </WhatsAppLink>
    </>
  );
}
