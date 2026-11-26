export const WHATSAPP_NUMBER = "5521995507294";
export const INSTAGRAM_URL = "https://www.instagram.com/_cavernacast/";
export const STUDIO_ADDRESS = "Rua Olimpio da Silva, 31 - Pacheco, São Gonçalo - RJ, 24736-610";
export const STUDIO_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STUDIO_ADDRESS)}`;
export const STUDIO_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO_ADDRESS)}`;
export const STUDIO_MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(STUDIO_ADDRESS)}&z=15&output=embed`;

export function whatsappUrl(message: string): string {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

export const generalMessage =
  "Olá! Conheci o Caverna Cast pelo site e gostaria de mais informações sobre os serviços e agendamento.";

export const navigation = [
  { label: "Início", href: "./index.html#inicio" },
  { label: "Estúdio", href: "./estudio.html" },
  { label: "Serviços", href: "./servicos.html" },
  { label: "Pacotes", href: "./pacotes.html" },
  { label: "Contato", href: "./contato.html" },
];

/** Two mirrored rows: wide, tall, tall, wide. Keep that rhythm when adding photos. */
export const gallery = [
  {
    src: "/images/studio/mesa-estudio-ia.webp",
    alt: "Mesa de gravação com microfones diante das cortinas azuis do estúdio",
    caption: "Um cenário pronto para a conversa",
    category: "Estúdio",
    srcSet: "/images/studio/mesa-estudio-ia-800.webp 800w, /images/studio/mesa-estudio-ia.webp 1538w, /images/studio/mesa-estudio-ia-2560.webp 2560w",
    sizes: "(max-width: 820px) 100vw, 34vw",
    width: 1538,
    height: 1022,
    className: "gallery-tile--wide",
    objectPosition: "center 50%",
  },
  {
    src: "/images/studio/hero-microfone-caverna.webp",
    alt: "Microfone do Caverna Cast iluminado em um cenário escuro",
    caption: "Áudio e imagem em clima de estúdio",
    category: "Equipamentos",
    srcSet: "/images/studio/hero-microfone-caverna-480.webp 480w, /images/studio/hero-microfone-caverna-800.webp 800w, /images/studio/hero-microfone-caverna.webp 1024w",
    sizes: "(max-width: 820px) 50vw, 17vw",
    width: 1024,
    height: 1536,
    className: "gallery-tile--portrait",
    objectPosition: "center 34%",
  },
  {
    src: "/images/studio/camera-estudio.webp",
    alt: "Câmera de vídeo instalada no estúdio",
    caption: "Captação de vídeo",
    category: "Equipamentos",
    srcSet: "/images/studio/camera-estudio-360.webp 360w, /images/studio/camera-estudio-540.webp 540w, /images/studio/camera-estudio.webp 663w",
    sizes: "(max-width: 820px) 50vw, 17vw",
    width: 663,
    height: 997,
    className: "gallery-tile--portrait",
    objectPosition: "center 42%",
  },
  {
    src: "/images/studio/sala-equipamentos.webp",
    alt: "Equipamentos de gravação e vídeo montados na sala do Caverna Cast",
    caption: "Estrutura de gravação",
    category: "Estúdio",
    srcSet: "/images/studio/sala-equipamentos-480.webp 480w, /images/studio/sala-equipamentos-800.webp 800w, /images/studio/sala-equipamentos-1200.webp 1200w, /images/studio/sala-equipamentos.webp 1287w",
    sizes: "(max-width: 820px) 100vw, 34vw",
    width: 1287,
    height: 855,
    className: "gallery-tile--wide",
    objectPosition: "center 50%",
  },
  {
    src: "/images/studio/microfones-mesa.webp",
    alt: "Microfones e canecas sobre a mesa de gravação",
    caption: "Cada lugar preparado para gravar",
    category: "Equipamentos",
    srcSet: "/images/studio/microfones-mesa-480.webp 480w, /images/studio/microfones-mesa-800.webp 800w, /images/studio/microfones-mesa-1200.webp 1200w, /images/studio/microfones-mesa.webp 1287w",
    sizes: "(max-width: 820px) 100vw, 34vw",
    width: 1287,
    height: 855,
    className: "gallery-tile--wide",
    objectPosition: "center 50%",
  },
  {
    src: "/images/studio/microfone-detalhe.webp",
    alt: "Microfone de estúdio sobre a mesa de madeira, com canecas da Caverna ao fundo",
    caption: "Um microfone para cada voz",
    category: "Equipamentos",
    srcSet: "/images/studio/microfone-detalhe.webp 663w",
    sizes: "(max-width: 820px) 50vw, 17vw",
    width: 663,
    height: 997,
    className: "gallery-tile--portrait",
    objectPosition: "center 40%",
  },
  {
    src: "/images/studio/caneca-caverna.webp",
    alt: "Caneca com a marca Caverna Cast sobre a mesa",
    caption: "A marca também mora nos detalhes",
    category: "Detalhes",
    srcSet: "/images/studio/caneca-caverna-360.webp 360w, /images/studio/caneca-caverna-640.webp 640w, /images/studio/caneca-caverna.webp 946w",
    sizes: "(max-width: 820px) 50vw, 17vw",
    width: 946,
    height: 1424,
    className: "gallery-tile--portrait",
    objectPosition: "center 62%",
  },
  {
    src: "/images/studio/guitarras-estudio.webp",
    alt: "Guitarras que compõem a decoração do estúdio",
    caption: "Detalhes da Caverna",
    category: "Detalhes",
    srcSet: "/images/studio/guitarras-estudio-640.webp 640w, /images/studio/guitarras-estudio-1200.webp 1200w, /images/studio/guitarras-estudio-1800.webp 1800w, /images/studio/guitarras-estudio.webp 2144w",
    sizes: "(max-width: 820px) 100vw, 34vw",
    width: 2144,
    height: 1424,
    className: "gallery-tile--wide",
    objectPosition: "center 50%",
  },
];

export const studioFeatures = [
  "Cenário para até 4 participantes",
  "Captação profissional de áudio",
  "Gravação em 4K",
  "Iluminação de estúdio",
  "Cenário preparado para entrevistas",
  "Monitoramento durante a gravação",
  "Estrutura para conteúdo digital",
];

export const recordingPackages = [
  {
    id: "one-hour",
    eyebrow: "Uma sessão objetiva",
    title: "Hora de estúdio",
    price: "R$ 200,00",
    description: "Para tirar uma ideia do papel e gravar com estrutura profissional.",
    features: [
      "1 hora de gravação",
      "Cenário para até 4 pessoas",
      "Gravação em 4K",
      "Estrutura de áudio e vídeo",
      "Edição inclusa*",
      "1 corte de brinde",
    ],
    note: "* Edição conforme o formato contratado.",
    message:
      "Olá! Tenho interesse no pacote de 1 hora de estúdio do Caverna Cast, no valor de R$ 200,00. Gostaria de consultar a disponibilidade.",
  },
  {
    id: "three-hours",
    eyebrow: "Uma sessão mais longa",
    title: "3 horas de estúdio",
    price: "R$ 450,00",
    description: "Ideal para quem deseja gravar vários conteúdos em uma única sessão.",
    features: [
      "3 horas de gravação",
      "Gravação em 4K",
      "Cenário para até 4 pessoas",
      "Estrutura de áudio e vídeo",
      "Edição conforme o formato contratado",
      "Possibilidade de produzir episódios e cortes na mesma sessão",
      "Bônus: 2 cortes para redes sociais",
      "Bônus: 1 hora de edição",
      "Bônus: miniatura do episódio",
    ],
    message:
      "Olá! Tenho interesse no pacote de 3 horas de estúdio do Caverna Cast, no valor de R$ 450,00. Gostaria de consultar a disponibilidade.",
  },
];

export const cutPackages = [
  { quantity: 1, price: "R$ 50,00" },
  { quantity: 2, price: "R$ 90,00" },
  { quantity: 3, price: "R$ 120,00" },
  { quantity: 5, price: "R$ 180,00" },
  { quantity: 10, price: "R$ 300,00" },
];

export const socialFormats = [
  "Reels",
  "YouTube Shorts",
  "TikTok",
  "Vídeos para Stories",
  "Cortes de entrevistas",
];

export const visualIdentityItems = [
  "Nome do programa",
  "Capa e thumbnail",
  "Vinheta",
  "Identidade visual",
  "GC com nome dos participantes",
  "Artes para divulgação",
  "Cortes para redes sociais",
];

export const differentiators = [
  {
    number: "01",
    title: "Qualidade",
    body: "Gravação em alta resolução e captação preparada para conteúdo profissional.",
    icon: "sparkles" as const,
  },
  {
    number: "02",
    title: "Praticidade",
    body: "Você chega, prepara o conteúdo e grava. A estrutura fica por nossa conta.",
    icon: "sliders" as const,
  },
  {
    number: "03",
    title: "Versatilidade",
    body: "Podcast, entrevista, videocast, conteúdo para redes sociais e muito mais.",
    icon: "layers" as const,
  },
  {
    number: "04",
    title: "Conteúdo",
    body: "Uma gravação pode render um episódio completo e vários conteúdos para suas redes.",
    icon: "scissors" as const,
  },
];

export const faqItems = [
  {
    question: "Como faço para agendar uma gravação?",
    answer: "Entre em contato pelo WhatsApp para consultar a disponibilidade e alinhar o pacote, o formato do conteúdo e o horário da gravação.",
  },
  {
    question: "Quais serviços o Caverna Cast oferece?",
    answer: "O site apresenta gravação de podcast e videocast, cortes para redes sociais e serviços de identidade visual para programas.",
  },
  {
    question: "Quais são os pacotes de gravação?",
    answer: "Atualmente, o site apresenta uma opção de 1 hora de estúdio e outra de 3 horas. Consulte a página de pacotes para ver preços e benefícios incluídos.",
  },
  {
    question: "É possível produzir cortes para redes sociais?",
    answer: "Sim. O Caverna Cast apresenta opções de cortes para Reels, YouTube Shorts, TikTok, Stories e entrevistas. Os detalhes podem ser alinhados pelo WhatsApp.",
  },
  {
    question: "Onde fica o estúdio?",
    answer: "O estúdio fica no bairro Pacheco, em São Gonçalo, no Rio de Janeiro. A página do estúdio disponibiliza o endereço e links para consultar o mapa e traçar a rota.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Agendamento",
    body: "Chame a gente pelo WhatsApp para consultar horários e definir o agendamento.",
  },
  {
    number: "02",
    title: "Preparação",
    body: "Definimos o formato, os participantes e as necessidades do conteúdo.",
  },
  {
    number: "03",
    title: "Gravação",
    body: "Você grava no estúdio com acompanhamento técnico.",
  },
  {
    number: "04",
    title: "Edição",
    body: "O material é preparado conforme o serviço contratado.",
  },
  {
    number: "05",
    title: "Entrega",
    body: "Você recebe o conteúdo pronto para usar nas suas plataformas.",
  },
];

export const PHONE_DISPLAY = "+55 (21) 99550-7294";
export const PHONE_TEL = "tel:+5521995507294";
export const INSTAGRAM_HANDLE = "@_cavernacast";

/** Rooms and gear shown in the home "what's in the room" stack (real studio photos). */
export const studioStack = [
  {
    title: "Mesa para até 4 pessoas",
    body: "Cenário montado para a conversa, com um microfone para cada participante.",
    image: "/images/studio/microfones-mesa.webp",
    ratio: 1287 / 855,
    alt: "Quatro microfones e canecas da Caverna sobre a mesa de madeira do estúdio",
    tags: ["Até 4 participantes", "Cenário pronto"],
  },
  {
    title: "Gravação em 4K",
    body: "Câmeras posicionadas para captar o programa em alta resolução, do plano aberto ao close.",
    image: "/images/studio/camera-estudio.webp",
    ratio: 663 / 997,
    alt: "Câmera de vídeo instalada no estúdio, apontada para a mesa",
    tags: ["4K", "Vídeo e áudio"],
  },
  {
    title: "Captação profissional de áudio",
    body: "Microfones de estúdio e monitoramento durante toda a gravação.",
    image: "/images/studio/hero-microfone-caverna.webp",
    ratio: 1024 / 1536,
    alt: "Microfone de estúdio iluminado sobre fundo escuro",
    tags: ["Monitoramento", "Som de estúdio"],
  },
  {
    title: "Luz e estrutura de estúdio",
    body: "Iluminação, monitores e computador de captura. A estrutura fica por nossa conta.",
    image: "/images/studio/sala-equipamentos.webp",
    ratio: 1287 / 855,
    alt: "Sala de equipamentos com monitores, computador e braços de microfone",
    tags: ["Iluminação", "Monitores"],
  },
  {
    title: "Um cenário com personalidade",
    body: "Cortinas azuis, madeira e as guitarras da Caverna ao fundo do seu vídeo.",
    image: "/images/studio/guitarras-estudio-1800.webp",
    ratio: 2144 / 1424,
    alt: "Prateleira com guitarras em miniatura na parede azul do estúdio",
    tags: ["Detalhes", "Identidade"],
  },
];

/** Vertical demo clips (stock, illustrative) used in the social cuts phone. */
export const cutClips = [
  { src: "/media/corte-conversa.mp4", poster: "/media/corte-conversa.webp" },
  { src: "/media/corte-entrevista.mp4", poster: "/media/corte-entrevista.webp" },
];

export const services = [
  {
    id: "gravacao",
    title: "Gravação de podcast e videocast",
    summary: "Você traz a pauta e os convidados. A gente liga câmeras, microfones e luz e acompanha a gravação.",
    items: ["Podcast em áudio e vídeo", "Videocast", "Entrevistas", "Conteúdo para redes sociais", "Edição conforme o formato contratado"],
    image: "/images/services/microfone-podcast.webp",
    alt: "Microfone de estúdio azul em ambiente escuro",
    href: "./pacotes.html",
    cta: "Ver pacotes de gravação",
  },
  {
    id: "cortes",
    title: "Cortes para redes sociais",
    summary: "Uma conversa longa rende vários vídeos curtos. Separamos os melhores momentos no formato de cada rede.",
    items: socialFormats,
    image: "/images/services/timeline-cortes.webp",
    alt: "Linha do tempo de edição com cortes de vídeo e trilhas de áudio",
    href: "./pacotes.html#cortes",
    cta: "Ver preços dos cortes",
  },
  {
    id: "identidade",
    title: "Identidade visual para programas",
    summary: "Nome, capa, vinheta e artes para o seu programa ser reconhecido logo no primeiro episódio.",
    items: visualIdentityItems,
    image: "/images/services/identidade-visual-caverna-cast.webp",
    alt: "Placa iluminada com a marca Caverna Cast em parede de pedra",
    href: "./contato.html",
    cta: "Conversar sobre identidade",
  },
];

/** Price per cut, derived from the package price, e.g. "R$ 30,00". */
export function pricePerCut(price: string, quantity: number): string {
  const value = Number(price.replace(/[^\d,]/g, "").replace(",", "."));
  return (value / quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/\u00a0/g, " ");
}
