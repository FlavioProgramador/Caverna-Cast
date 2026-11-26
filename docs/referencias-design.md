# Referências de design — Caverna Cast

Análise de 6 sites usados como referência visual e de movimento para o site do Caverna Cast (estúdio de podcast/videocast no RJ). Cada referência traz **o que ela faz**, **como foi feita** (inspecionado no navegador) e **como adaptar ao Caverna**, sem copiar marca, fotos ou textos.

> Regra geral: pegar *padrões* (ritmo, movimento, composição), nunca assets. Todas as animações precisam de fallback com `prefers-reduced-motion` e `@supports`.

---

## 1. Overtone — escola de música (referência principal)

`music-school-website-template-for-claude-code-free-v1.21st.app`

É a referência mais próxima do Caverna: fala de **som, gravação, microfone, fone, palco** e transforma esses objetos em linguagem visual. Quase toda a animação é **CSS puro com scroll-driven animations** (`animation-timeline: view()` e timelines nomeadas), sem GSAP nem Lenis.

### 1.1 Sistema visual

| Token | Valor | Uso |
|---|---|---|
| Fonte display | **Funnel Display** 400, `letter-spacing: -0.03em`, `line-height: 1` | H1/H2 ~53px, H3 24px |
| Fonte texto | **Host Grotesk** 16px / 1.55 | corpo, botões, labels |
| Tinta | `#131313` | texto e card escuro do hero |
| Papel | `#FFFFFF` + creme `#E5DCD2` | fundo; creme marca seções “de jornada” e cards destacados |
| Destaque CTA | amarelo pálido `#F4F0A1` | botões pill principais |
| Acento | laranja `#FF5714` | estrelas/losangos, aro do disco, ícones |
| Raios | `999px` (pills), `30px` (cards grandes), `18px` (cards), `10px` | |
| Easing padrão | `cubic-bezier(0.2, 0.7, 0.2, 1)` | todas as transições (0.3–0.9s) |
| Easing “pop” | `linear()` com overshoot até ~1.13 | losangos/estrelas que giram e crescem |

Princípios: paleta mínima (preto, branco, creme + 1 acento), bordas finas de 1px preto, muito espaço em branco, títulos grandes em peso 400 (não bold), numeração editorial (1, 2, 3 / Step 1…).

### 1.2 Seções e padrões de movimento

1. **Hero “eco”** — card escuro com 3 camadas cinzas deslocadas para cima/esquerda, como um *eco de som*. Entram em sequência (`opening-step` 0.9s). Dentro: título, 2 CTAs, lista numerada “Hear it / Play it back / Make it yours” e foto vertical com moldura dupla de linhas finas.
2. **Cards em leque (Programs)** — seção com stage `position: sticky`. Os 5 cards começam empilhados e rotacionados no centro e se abrem em linha conforme o scroll (`programs-card-translate/rotate`, cada card com `animation-range` próprio na timeline `--programs-t1`). Card alternado em creme.
3. **Mentores com eco** — fotos circulares em escala de cinza que surgem com rastro (`motion-echo`: translate + opacidade defasados).
4. **Ingresso (Masterclasses)** — card em formato de **ticket**: foto, host, título, linha de datas, horário grande, canhoto picotado com desconto, preço riscado e código de barras. Os textos entram um a um ligados ao scroll; os tickets seguintes aparecem esmaecidos atrás.
5. **Disco de vinil sticky (Covers)** — à esquerda um disco circular com aro laranja e furo central fica *sticky*; à direita, a lista de faixas. Cada item da lista tem sua própria `view-timeline` (`--covers-t1..t5`) que dispara um `clip-path` revelando a próxima arte dentro do disco. **É o padrão mais “áudio” de todos.**
6. **Escada (Path)** — fundo creme, 4 cards em diagonal descendente; um losango marcador desce pela escada e “acende” (fundo preto) o passo atual.
7. **Palco (Stage)** — foto larga com camadas de eco atrás e card branco sobreposto com CTA.
8. **Avaliações** — 5 losangos laranja que giram/acendem em sequência no scroll, citação grande e cards menores.
9. **Preços** — 3 cards ligados por conectores em “gravata-borboleta” pretos; o do meio em creme com selo `−15%`.
10. **FAQ** — intro sticky à esquerda, acordeão à direita.
11. **Rodapé** — wordmark gigante ocupando a largura toda + 5 colunas de links.

Navbar: pill branca flutuante com borda preta, traços horizontais separando grupos, CTA amarelo à direita.

---

## 2. Norte Atelier — arquitetura

`norte-atelier.vercel.app` (Webflow + Interactions, fonte Neue Montreal 500)

- **Tipografia cinética gigante** (~150px) com palavras desalinhadas em escada (“Espaços / que / perduram”); imagens de projetos passam por trás do texto em parallax.
- **Preenchimento de palavras no scroll**: frases como “Movidos por contexto. Feitos com intenção.” começam cinza e escurecem palavra a palavra.
- Lista de serviços e processo (01 ESCUTA, 02 CONCEITO…) em que só o item ativo fica nítido; os outros ficam quase transparentes.
- Lista de projetos com linha fina + seta `→` (estilo índice), números grandes (18 anos, 120+ projetos).
- Header com `MENU` em texto, preto ↔ branco conforme o fundo.

**Para o Caverna:** a frase manifesto (“Grave. Conte. Conecte.”) e a seção “Por que o Caverna” ficam ótimas com preenchimento palavra a palavra. O processo de gravação (agendar → gravar → editar → publicar) pode usar o “só o passo ativo nítido”.

## 3. Alto Coffee — e-commerce narrativo

`kedhar-components.pages.dev/#alto-coffee-template` (Archivo + Jost)

- Hero com **título enorme sobre a foto** e camadas de nuvem em parallax; “SCROLL TO DESCEND”.
- **Régua vertical lateral** com marcações e um número (altitude) que muda com o scroll: 3.760 m → 1.562 m. O número gigante conta enquanto a imagem troca.
- Mapa-mundi escuro em que o scroll “voa a rota” e acende o país; seletor de anos à direita.
- Carrossel horizontal de etapas (“Picked ripe”, “Floated”…) com métrica em caixa alta embaixo.
- Seletor de produto em pills (Dark / Mild / Decaf) que troca ilustração e barra de intensidade.

**Para o Caverna:** trocar a régua de altitude por um **medidor de VU/dB** lateral que sobe com o scroll — indicador de progresso com cara de estúdio. O seletor em pills serve para escolher pacotes (Áudio / Vídeo / Videocast + cortes) mostrando o que inclui.

## 4. Overstory (Understory) — estúdio de design, tema outono

`kedhar-components.pages.dev/#overstory-studio-landing/autumn` (Inter Display + Bodoni Moda itálico)

- Hero com **foto de baixo para cima** (copas das árvores) e scroll que “sobe acima das árvores” (camadas em canvas).
- Título com **palavra rotativa** (“Seed” ↔ “Series A”) e mistura sans + serifa itálica.
- Badge de status com ponto verde (“Two seats left for the winter cohort”).
- Linha de números (38, $324M, 5 wks, 3.9/5) e títulos que entram **linha por linha com máscara**.
- Serviços em **acordeão numerado** (01 Brand & Identity · 2 to 3 weeks · `+`).
- Carrossel de cases com contador `01 / 05` e barra de progresso.

**Para o Caverna:** o badge “ao vivo” já existe (`live-dot`) — dá para usar como “Agenda aberta: 3 horários esta semana”. A palavra rotativa encaixa no H1 (“Sua ideia merece ser *ouvida / vista / lembrada*”). Os cases viram “Podcasts gravados aqui”.

## 5. Keystone Crossing — portfólio “ponte”

`stone-bridge-scroll-portfolio-landing-page-v1.21st.app` (fontes próprias serif + sans)

- Uma única cena: o nome em serifa enorme sobre o céu; ao rolar, a câmera **atravessa o arco da ponte** (zoom com `transform-origin` no vão) e chega à cidade.
- Cards de vidro (`backdrop-filter`) aparecem sobre a paisagem no final.
- Navegação que marca a “parada” atual (Intro / Bridge / Town / Work).

**Para o Caverna:** é a metáfora perfeita para o nome — **entrar na caverna**. Uma seção sticky em que a boca da caverna (ou o anel do microfone / a porta do estúdio) cresce até preencher a tela e revela a foto do estúdio. Ver receita 6.5.

## 6. Keel — estúdio para startups

`startup-design-studio-landing-page-v1.21st.app` (sans própria + mono)

- Hero com foto em tela cheia e título que **entra letra a letra com blur** (`kf-blur10`/`kf-blur30`), navbar que desce (`kf-drop`), CTA que “pula” (`kf-pop`).
- **Text roll no hover**: os links do menu e o botão têm o texto duplicado; no hover a cópia sobe e substitui a original.
- Serviços em blocos **foto + lista numerada** (01, 02, 03) alternando lados.
- Título em dois tons (“Proven Process” preto + resto cinza).

**Para o Caverna:** o text roll é barato e dá acabamento premium aos botões “Agendar gravação”. Blocos foto + lista servem para a página Serviços.

---

## 7. O que levar para o Caverna Cast

O site hoje: fundo `#09090d`, roxo `#8b5cf6`, DM Serif Display + DM Sans, reveal por `IntersectionObserver` (`.reveal` em `src/pages/App.tsx`). A direção abaixo **mantém a identidade escura/roxa** e soma o vocabulário sonoro da Overtone.

### 7.1 Direção visual

- **Paleta com um acento quente.** Overtone usa 1 cor de CTA + 1 acento. Sugestão: manter o roxo como cor da marca e criar um acento “luz de caverna/lâmpada de estúdio” (âmbar, ex. `#F2B544`) só para estrelas, ponto “ao vivo” e o aro do disco. CTA principal continua roxo (ou testar o creme `#EDE6DA` como pill clara sobre o fundo escuro).
- **Seção clara pontual.** Overtone quebra o ritmo com a seção creme. No Caverna, uma única seção clara (ex. processo ou pacotes) dá respiro ao site escuro.
- **Títulos em peso regular e grandes**, com `letter-spacing` negativo; serifa itálica só na palavra-chave (já existe o `<em>` no H1).
- **Linhas finas de 1px** e numeração editorial (`01 / 04`, `CC / 01` já existe) em todo lugar.
- **Rodapé com wordmark gigante** “CAVERNA CAST” ocupando a largura.

### 7.2 Mapa por página

| Página / seção atual | Padrão de referência | Ideia |
|---|---|---|
| Home — `HeroSection` | Eco (Overtone) + blur-in (Keel) + palavra rotativa (Overstory) | Foto do microfone com 3 camadas de eco atrás; H1 entra com blur; “ouvida / vista / lembrada” |
| Home — `hero__bottom-rule` | Régua (Alto) | Transformar os 28 traços em **forma de onda** que reage ao scroll |
| Home — `StudioIntro` | Preenchimento palavra a palavra (Norte) | Manifesto que “acende” conforme lê |
| Home — transição para o estúdio | Atravessar o arco (Keystone) | “Entre na caverna”: máscara circular que cresce até mostrar o estúdio |
| Estúdio — `StudioSection` | Cards em leque (Overtone) | Equipamentos (câmera, microfones, mesa, luz) abrindo em leque |
| Estúdio — `GallerySection` | Disco sticky (Overtone) | Disco/“bolacha” sticky que troca a foto conforme a lista de ambientes rola |
| Serviços — `ServicesSection` | Foto + lista numerada (Keel) / acordeão (Overstory) | Gravação, edição, cortes, identidade visual |
| Serviços — `ProcessSection` | Escada (Overtone) ou “passo ativo nítido” (Norte) | Agendar → Gravar → Editar → Publicar, com marcador descendo |
| Pacotes — `RecordingPackages` | **Ingresso** (Overtone) + conectores (Overtone) | Cada pacote como um ticket de sessão: horas, câmeras, preço, canhoto picotado com “−15%” |
| Pacotes — `CutsPackages` | Pills (Alto) | Alternar quantidade de cortes e ver o que muda |
| Pacotes — `FAQSection` | Intro sticky + acordeão (Overtone) | |
| Global | VU meter (Alto) + text roll (Keel) | Progresso de leitura lateral; hover nos botões |
| Rodapé | Wordmark gigante (Overtone) | |

### 7.3 Prioridade sugerida

1. **Rápido e alto impacto:** tokens de easing, text roll nos botões, eco no hero, wordmark no rodapé, pacotes como ingresso.
2. **Médio:** preenchimento de palavras, escada do processo, VU meter, cards em leque.
3. **Assinatura do site:** disco sticky da galeria e a cena “entre na caverna”.

---

## 8. Receitas de implementação

Colocar em um arquivo novo `src/styles/motion.css` (importado depois do `global.css`) para não inchar o CSS atual. Tudo com CSS; JS só onde indicado.

### 8.1 Tokens de movimento

```css
:root {
  --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-pop: linear(0, 0.23 5%, 0.43 10%, 0.6 15%, 0.74 20%, 0.86 25%,
                     0.95 30%, 1.05 37.5%, 1.11 45%, 1.13 55%, 1.1 65%,
                     1.06 75%, 1.02 87.5%, 1);
  --dur-fast: 0.3s;
  --dur-base: 0.6s;
  --dur-slow: 0.9s;
}
```

### 8.2 Eco do hero (Overtone)

```css
.echo { position: relative; isolation: isolate; }
.echo__layer {
  position: absolute; inset: 0; z-index: -1;
  border-radius: inherit;
  background: var(--surface-soft);
  animation: echo-step var(--dur-slow) var(--ease-out) both;
}
.echo__layer:nth-child(1) { translate: -12px -12px; opacity: .7; animation-delay: .10s; }
.echo__layer:nth-child(2) { translate: -24px -24px; opacity: .45; animation-delay: .18s; }
.echo__layer:nth-child(3) { translate: -36px -36px; opacity: .25; animation-delay: .26s; }

@keyframes echo-step { from { translate: 0 0; opacity: 0; } }
```

### 8.3 Text roll no hover (Keel)

```html
<a class="roll" href="…">
  <span class="roll__track">
    <span>Agendar gravação</span>
    <span aria-hidden="true">Agendar gravação</span>
  </span>
</a>
```

```css
.roll__track { display: inline-grid; height: 1.2em; line-height: 1.2; overflow: hidden; vertical-align: top; }
.roll__track > span { transition: translate var(--dur-base) var(--ease-out); }
.roll:hover .roll__track > span,
.roll:focus-visible .roll__track > span { translate: 0 -100%; }
```

### 8.4 Reveal ligado ao scroll (base para leque, ingresso, escada)

```css
@supports (animation-timeline: view()) {
  .fan-card {
    animation: fan-in linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 40%;
  }
  .fan-card:nth-child(1) { --x: 120%;  --r: -8deg; }
  .fan-card:nth-child(2) { --x: 60%;   --r: -4deg; }
  .fan-card:nth-child(4) { --x: -60%;  --r: 4deg; }
  .fan-card:nth-child(5) { --x: -120%; --r: 8deg; }
}
@keyframes fan-in { from { translate: var(--x, 0) 30px; rotate: var(--r, 0deg); } }
```

Sem suporte, os cards ficam no lugar final (sem animação), então ninguém perde conteúdo. O `.reveal` atual continua valendo para o resto.

### 8.5 “Entre na caverna” (Keystone)

```css
.cave { height: 300vh; }
.cave__stage { position: sticky; top: 0; height: 100vh; overflow: hidden; }

@property --r { syntax: "<length-percentage>"; inherits: false; initial-value: 12%; }

@supports (animation-timeline: view()) {
  .cave__photo {
    mask-image: radial-gradient(circle at 50% 55%, #000 var(--r), transparent calc(var(--r) + 1px));
    animation: cave-open linear both;
    animation-timeline: view();
    animation-range: contain 0% contain 70%;
  }
}
@keyframes cave-open { to { --r: 150%; } }
```

A `view()` precisa estar no `.cave` (o elemento alto); se a máscara estiver dentro do sticky, use timeline nomeada: `.cave { view-timeline: --cave; }` e `animation-timeline: --cave` na foto. Fallback: foto já aberta (`--r: 150%`).

### 8.6 Disco sticky da galeria (Overtone)

```css
.disc-section { timeline-scope: --t1, --t2, --t3, --t4; display: grid; grid-template-columns: 1fr 1fr; }
.disc { position: sticky; top: 15vh; aspect-ratio: 1; border-radius: 50%;
        outline: 14px solid var(--accent); overflow: hidden; }
.disc img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.disc::after { content: ""; position: absolute; inset: 44%; border-radius: 50%; background: var(--ink); }

.disc-list li:nth-child(1) { view-timeline: --t1 block; }
.disc-list li:nth-child(2) { view-timeline: --t2 block; }
/* … */

@supports (animation-timeline: view()) {
  .disc img:nth-child(2) { animation: wipe linear both; animation-timeline: --t1; animation-range: cover 35% cover 55%; }
  .disc img:nth-child(3) { animation: wipe linear both; animation-timeline: --t2; animation-range: cover 35% cover 55%; }
  .disc { animation: spin linear both; animation-timeline: scroll(root); }
}
@keyframes wipe { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(75% at 50% 50%); } }
@keyframes spin { to { rotate: 1turn; } }
```

No mobile: disco no topo, menor, lista embaixo (sem sticky lado a lado).

### 8.7 Ingresso de pacote (Overtone)

```css
.ticket { display: grid; grid-template-columns: 1fr auto; border: 1px solid var(--line-strong); border-radius: 18px; }
.ticket__stub {
  border-left: 1px dashed var(--line-strong);
  padding: 24px;
  /* recortes semicirculares em cima e embaixo do picote */
  mask: radial-gradient(circle 10px at 0 0, #0000 98%, #000) top left / 100% 51% no-repeat,
        radial-gradient(circle 10px at 0 100%, #0000 98%, #000) bottom left / 100% 51% no-repeat;
}
```

Conteúdo sugerido: nome do pacote, “2h de gravação · 3 câmeras · até 4 pessoas”, horário/duração grande, canhoto com preço e selo de desconto, e uma “forma de onda” no lugar do código de barras.

### 8.8 VU meter de progresso (Alto)

```css
.vu { position: fixed; right: 16px; top: 50%; translate: 0 -50%; width: 6px; height: 160px;
      background: var(--line); border-radius: 3px; }
.vu__fill { position: absolute; inset: 0; border-radius: inherit; transform-origin: bottom;
            background: linear-gradient(to top, var(--purple) 70%, #F2B544 90%, #ff5a4f); }
@supports (animation-timeline: scroll()) {
  .vu__fill { animation: vu linear both; animation-timeline: scroll(root); }
}
@keyframes vu { from { scale: 1 0; } }
```

Esconder abaixo de 820px para não brigar com o botão flutuante do WhatsApp.

### 8.9 Preenchimento palavra a palavra (Norte)

Quebrar o texto em `<span>` por palavra (no JSX, `text.split(" ")`) e:

```css
@supports (animation-timeline: view()) {
  .fill-words span { animation: word-on linear both; animation-timeline: view(); animation-range: cover 20% cover 45%; }
}
@keyframes word-on { from { opacity: .18; } }
```

### 8.10 Acessibilidade e performance

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: .01ms !important; }
  .cave__photo { mask-image: none; }
}
```

- Animar só `transform`/`translate`/`scale`/`rotate`/`opacity`/`clip-path`; nada de `top/left/width`.
- Scroll-driven animations (`animation-timeline`) rodam fora da main thread em Chrome/Edge; confirme o suporte do Safari/Firefox na época da implementação e mantenha o `@supports` — sem ele, o conteúdo deve aparecer no estado final.
- Os testes E2E já verificam overflow horizontal de 320 a 1440px; leques e máscaras precisam de `overflow: clip` no container para não quebrar esse teste.
- Fontes: se adotar uma display nova (ex. Funnel Display), carregar só o peso 400 com `font-display: swap`.
