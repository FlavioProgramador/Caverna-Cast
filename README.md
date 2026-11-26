# Caverna Cast

Site institucional do estúdio Caverna Cast, desenvolvido com React, TypeScript e Vite. O site é multipágina e mantém entradas HTML estáticas para início, estúdio, serviços, pacotes e contato.

## Requisitos

- Node.js compatível com a versão do Vite definida no `package-lock.json`.
- npm.

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Build e preview

```bash
npm run build
npm run preview
```

## Qualidade e testes

```bash
npm run test          # testes unitários (Vitest)
npm run test:watch    # modo interativo dos testes unitários
npm run test:e2e      # testes de navegador (Playwright)
npm run assets:audit  # verifica referências a imagens locais e arquivos ausentes
```

Na primeira execução dos testes de navegador, instale o Chromium com `npx playwright install chromium`. Os testes E2E cobrem as cinco páginas, navegação mobile, CTA de pacote/WhatsApp, FAQ, filtros da galeria e overflow horizontal entre 320 e 1440 px.

## SEO e domínio público

A origem pública ainda precisa ser definida no ambiente de publicação. Não use domínio de exemplo em produção.

PowerShell:

```powershell
$env:VITE_SITE_ORIGIN = "https://SEU-DOMINIO-REAL"
npm run seo:sitemap
npm run build
```

`VITE_SITE_ORIGIN` deve conter apenas a origem HTTPS, sem caminho, query ou fragmento. O build adiciona canonical e `og:url` quando essa variável está configurada. O comando `seo:sitemap` gera `public/sitemap.xml` para as cinco páginas públicas e adiciona a referência correspondente a `public/robots.txt`; ele falha explicitamente quando o domínio não foi definido. Não gere nem publique o sitemap antes de configurar a origem real.

Os HTMLs incluem metadados Open Graph e schema JSON-LD `LocalBusiness` baseado nos dados de contato e endereço já fornecidos pelo site. Revise os dados estruturados caso endereço, telefone ou perfil social mudem.

## Analytics opcional

A instrumentação usa eventos compatíveis com Plausible e fica desativada por padrão. Nenhum script externo é inserido nem evento enviado sem `VITE_PLAUSIBLE_DOMAIN`.

PowerShell:

```powershell
$env:VITE_PLAUSIBLE_DOMAIN = "SEU-DOMINIO-REAL"
# Opcional: use uma URL de script customizada ou proxy
$env:VITE_PLAUSIBLE_SRC = "https://plausible.io/js/script.js"
npm run build
```

Os links de WhatsApp emitem o evento `whatsapp_click` quando a integração está ativa. Não inclua mensagens, telefones, e-mails ou outros dados pessoais em propriedades de eventos. Revise privacidade, consentimento e obrigações legais antes de ativar analytics.

## Estrutura do código

- `src/pages/`: `App.tsx` (escolhe a página pelo caminho) e uma página por arquivo (`HomePage`, `StudioPage`, `ServicesPage`, `PackagesPage`, `ContactPage`).
- `src/components/layout/`: cabeçalho, rodapé e rolagem suave (Lenis).
- `src/components/home/`: cenas da página inicial (entrada da caverna, manifesto, pilha de fotos, celular com cortes, chamada final).
- `src/components/sections/`: seções das páginas internas (galeria, FAQ, mapa, serviços, escada do processo, seletor de cortes).
- `src/components/`: peças compartilhadas (`BookButton`, `PackageTickets`, `Waveform`, `RollText`, `Icon`, `WhatsAppLink`).
- `src/lib/motion.ts`: utilitários de animação ligada à rolagem (`useScrollScene`, `useRevealOnce`).
- `src/data/`: conteúdo, pacotes, navegação e galeria.
- `src/styles/`: `global.css` (cores, tipografia, botões, cabeçalho e rodapé), `home.css` e `pages.css`.
- `public/media/`: vídeos ilustrativos dos cortes (veja `docs/creditos-midia.md`).
- `docs/`: referências de design e créditos de mídia.

## Sistema visual

As cores vêm do logo (preto da caverna, marrom da rocha, ocre do botão de play) e do estúdio real (cortina azul, parede azul-clara). Todas estão como variáveis no topo de `src/styles/global.css`. As fontes são Big Shoulders Display (títulos) e Geologica (texto). Todas as animações respeitam `prefers-reduced-motion`.

## Imagens responsivas

A galeria usa `srcSet` e `sizes` para permitir que o navegador escolha variantes WebP conforme a largura da tela. Para regenerar as variantes, instale Python e Pillow e execute `python scripts/generate-responsive-images.py`. Revise o resultado visual antes de substituir assets em produção.

## Publicação

1. Configure a origem pública real.
2. Gere o sitemap e confirme os metadados canonical.
3. Execute `npm run test`, `npm run test:e2e`, `npm run assets:audit` e `npm run build`.
4. Revise o diff e publique os commits de forma independente.
