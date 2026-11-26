import { useState } from "react";
import { BookButton } from "../BookButton";
import { Icon } from "../Icon";
import { faqItems } from "../../data/siteData";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq" id="perguntas-frequentes" aria-labelledby="faq-title">
      <div className="shell faq__grid">
        <div className="faq__intro">
          <h2 id="faq-title" className="h-section">
            Perguntas antes de gravar
          </h2>
          <p className="lead">Não achou a sua? Mande no WhatsApp que a equipe responde.</p>
          <BookButton
            label="Perguntar no WhatsApp"
            variant="blue"
            message="Olá! Tenho algumas dúvidas sobre os serviços e gostaria de consultar a disponibilidade do Caverna Cast."
          />
        </div>
        <div className="faq__list">
          {faqItems.map((item, index) => {
            const isOpen = open === index;
            return (
              <div className={"faq__item" + (isOpen ? " is-open" : "")} key={item.question}>
                <h3>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <Icon name="plus" />
                    </span>
                  </button>
                </h3>
                <div className="faq__answer" id={`faq-answer-${index}`} role="region" aria-label={item.question}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
