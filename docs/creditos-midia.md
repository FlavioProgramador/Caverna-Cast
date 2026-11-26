# Créditos de mídia e código de terceiros

## Vídeos ilustrativos (`public/media/`)

| Arquivo | Origem | Licença |
|---|---|---|
| `corte-conversa.mp4` / `.webp` | Mixkit, vídeo 52193 ("A mature woman smiles and engages in a lively and animated conversation…"), recortado em 9:16 | Mixkit Stock Video Free License (uso comercial permitido, sem redistribuir o arquivo isolado) |
| `corte-entrevista.mp4` / `.webp` | Mixkit, vídeo 44028 ("Portrait of a man speaking on a podcast"), recortado em 9:16 | Mixkit Stock Video Free License |

Os dois vídeos não foram gravados no Caverna Cast. No site, eles aparecem com a legenda "Vídeos ilustrativos". Troque pelos cortes reais do estúdio assim que houver material: basta substituir os arquivos mantendo os nomes, ou editar `cutClips` em `src/data/siteData.ts`.

## Fotos

Todas as fotos do estúdio em `public/images/` são do próprio Caverna Cast. A rocha da caverna na página inicial é desenhada em SVG no código, sem foto de banco de imagens.

## Código adaptado (MIT, via 21st.dev)

- Movimento de câmera da página inicial (trilha alta, palco fixo e função `paint(progress)`): adaptado do template "Keystone Crossing" de Kedhareswer.
- Pilha de cartões inclinados ("O que tem na sala"): matemática de pose adaptada do componente "Scroll Stacking Cards" de Kedhareswer.
- Revelação de palavras no scroll (manifesto): baseada no exemplo oficial "Scroll word reveal" da Motion.
- Colagem com zoom (página Estúdio): padrão do componente "Zoom Parallax".

Licença MIT: Copyright (c) 2026 Kedhareswer Naidu. É permitido usar, copiar, modificar e distribuir, desde que este aviso de copyright e de permissão seja mantido.

## Fontes

Big Shoulders Display e Geologica, via Google Fonts (SIL Open Font License).
