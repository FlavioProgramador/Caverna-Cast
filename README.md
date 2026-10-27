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

`VITE_SITE_ORIGIN` deve conter apenas a origem HTTPS, sem caminho, query ou fragmento. O build adiciona canonical e `og:url` quando essa variável está configurada. O comando `seo:sitemap` gera `public/sitemap.xml` para as cinco páginas públicas e falha explicitamente quando o domínio não foi definido. `public/robots.txt` permite rastreamento geral; publique o sitemap e sua referência no `robots.txt` apenas após configurar a origem real.

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

- `src/components/`: componentes compartilhados (`Icon`, `WhatsAppLink`).
- `src/pages/`: composição das páginas públicas e seções.
- `src/data/`: conteúdo estático, pacotes, navegação e dados da galeria.
- `src/lib/`: integrações e utilitários, incluindo analytics opcional.
- `src/styles/`: estilos globais e responsivos.
- `src/test/`: configuração dos testes unitários.
- `tests/e2e/`: testes de ponta a ponta com Playwright.
- `scripts/`: auditoria de assets, geração de sitemap e geração de variantes responsivas.
- `public/images/`: imagens publicadas e variantes WebP responsivas.
- `assets-originals/`: imagens originais mantidas fora da pasta pública.

## Imagens responsivas

A galeria usa `srcSet` e `sizes` para permitir que o navegador escolha variantes WebP conforme a largura da tela. Para regenerar as variantes, instale Python e Pillow e execute `python scripts/generate-responsive-images.py`. Revise o resultado visual antes de substituir assets em produção.

## Publicação

1. Configure a origem pública real.
2. Gere o sitemap e confirme os metadados canonical.
3. Execute `npm run test`, `npm run test:e2e`, `npm run assets:audit` e `npm run build`.
4. Revise o diff e publique os commits de forma independente.
