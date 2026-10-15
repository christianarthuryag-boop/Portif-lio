# Corte Prime — refinamento e revisão local

## Escopo entregue

Identidade principal do portfólio preservada: nenhuma alteração em `style.css` ou `inte.js` da raiz. Fundo escuro, verde, tipografia, hero e estrutura editorial permanecem como aprovados. A mesma branch local foi mantida, sem push ou publicação.

Corte Prime ganhou identidade independente em preto, grafite e bronze: marca CP e favicon próprios, hero com ilustração de ambiente, hierarquia tipográfica em serifas, cartões de serviços com valores ilustrativos, galeria ampliável, apresentação da essência, seção de agendamento demo e rodapé comercial. Menu mobile com Escape, fechamento por link/clique externo e estado ARIA. Sem avaliações, clientes, endereço, disponibilidade, calendário ou reserva fictícia.

As opções de agendamento abrem um dialog explicativo com serviços e preços; não solicitam dados, não enviam mensagens e não criam reservas. Galeria com dialog nativo, fundo inerte, foco contido pelo navegador, fechamento por Escape/botão/fundo, bloqueio de rolagem e restauração de foco. Sem JavaScript, os links dos serviços levam à explicação de agendamento e a galeria abre os SVGs diretamente; menu e conteúdo continuam acessíveis.

## Imagens e licença

Não havia fotos com licença comprovada no repositório. Foram criados três SVGs de conceito (ambiente, tesoura e navalha), leves e sem referências externas. A galeria informa claramente que são ilustrações, não fotos de trabalhos ou clientes. Não foi presumida licença de terceiros, nem adicionada licença geral ao repositório. Sem imagens geradas por IA raster, requisições a bancos de imagens ou fontes remotas.

Não há captura real verificável da Lunari no repositório do portfólio. Mantido o visual de marca, identificado como tal. Nenhum arquivo da Lunari foi lido ou alterado nesta etapa. O aviso da Lunari foi reunido num parágrafo: 4.0 local e não publicada, recursos verificados no código local e disponibilidade pública não reconfirmada. SQLite continua identificado como local. Não foram removidas essas distinções para simplificar a apresentação.

## Ajustes pontuais no portfólio

- Imagem do cartão Corte Prime atualizada para a ilustração da nova identidade; o vídeo original continua com sua capa anterior, pois registra uma versão histórica.
- Link “Abrir demo navegável” passou a botão primário no estilo verde já existente.
- Descrição da demo atualizada e avisos da Lunari simplificados.
- Contraste dos textos secundários já era adequado nos pares principais; nenhuma mudança global de cor foi necessária.

## Arquivos alterados/criados

- `demos/corte-prime/index.html`, `style.css`, `demo.js`.
- `demos/corte-prime/assets/studio.svg`, `tesoura.svg`, `navalha.svg`, `favicon.svg`.
- `index.html`: somente cartão Corte Prime e textos de aviso da Lunari.
- `scripts/browser-qa.cjs`: atualizado para menu, galeria e agendamento da demo refinada.
- `scripts/prepare-corte-comparison.sh`, `scripts/capture-corte-prime.cjs`: comparação e captura das duas versões.
- `README.md`, `docs/TESTES.md` e este relatório.
- `.local/before/` e `.local/revisao.html`: artefatos locais ignorados pelo Git; não publicar.

## Testes realmente executados

- `node --check` nos três scripts JS modificados/criados: sintaxe válida.
- `bash -n scripts/prepare-corte-comparison.sh`: sintaxe válida; execução completa do helper shell aprovada, preservando o snapshot Git anterior e gerando a página de revisão.
- `python3 scripts/check-static.py`: duas páginas aprovadas quanto a h1/main/title, idioma, IDs, âncoras, arquivos, dimensões/alt e proteção de links externos; nenhum arquivo sensível ou padrão de segredo encontrado pelo verificador básico.
- Parser XML: quatro SVGs válidos, sem script, imagens incorporadas de terceiros ou referências externas.
- Inspeção do HTML: três itens de galeria, quatro entradas de agendamento demo; sem formulário, input, select ou iframe externo na demo.
- Contraste calculado: texto/fundo 16,33:1; secundário/cartão 8,91:1; bronze/cartão de destaque 7,01:1; botão 7,83:1; aviso do modal 8,02:1; faixa demo 9,73:1. Não representa validação de todos os estados no navegador.
- Preparação da revisão com `node scripts/capture-corte-prime.cjs --prepare-only`: arquivo comparativo criado. Não gera PNG e não é um teste visual.
- `git diff --check`: sem problemas.

## Navegador e capturas: bloqueados

Tentativa real de Chromium headless via Playwright instalado: navegador terminou com `setsockopt: Operation not permitted` e SIGTRAP antes de carregar a página. Não foram alteradas flags para contornar a permissão. A tentativa de captura anterior às edições não produziu imagens; não há capturas antes/depois a apresentar como evidência nesta sessão.

Também houve erro de ambiente `spawnSync git EPERM` ao executar leitura Git como subprocesso Node. A preparação foi separada em helper shell, cuja execução completa passou: snapshot anterior lido do Git e página de revisão gerada. Esse resultado não inclui execução de navegador.

Layout em 320, 390, 768 e 1440 px, navegação real, links clicados, reprodução do vídeo, menu, modais, imagens no navegador, console e leitor de tela permanecem NÃO VERIFICADOS em execução. Media queries e acessibilidade foram revisadas no código; não declarar aprovação visual ou WCAG.

## Como revisar

```bash
cd ~/Projetos/Portif-lio
python3 -m http.server 8080 --bind 127.0.0.1
```

- Portfólio: http://127.0.0.1:8080/
- Demo: http://127.0.0.1:8080/demos/corte-prime/
- Comparação ao vivo já preparada: http://127.0.0.1:8080/.local/revisao.html

A comparação usa a versão anterior do commit `5f910d9`, sem checkout/reset. Para prepará-la novamente: `bash scripts/prepare-corte-comparison.sh`. A versão antiga é só um snapshot da demo para comparar; use a navegação do site atual para voltar ao portfólio.

No terminal Linux do host, com a instalação Playwright existente:

```bash
export PLAYWRIGHT_CORE_PATH="$HOME/.cache/ms-playwright-go/1.61.1/package"
export CHROMIUM_PATH="$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"
node scripts/browser-qa.cjs
node scripts/capture-corte-prime.cjs
```

O primeiro comando testa as duas páginas nas quatro larguras e as interações, gerando imagens em `.local/qa/`. O segundo gera oito PNGs de antes/depois e uma página comparativa em `.local/comparacao/index.html`. Só considerar executado após saída de sucesso. A existência dos scripts não comprova que os testes passaram.

Revise visualmente as capturas, navegue com Tab/Shift+Tab/Enter/Escape, amplie para 200%, confira movimento reduzido e confirme os destinos externos. Nenhum serviço foi deixado iniciado pelo agente.

## Limites mantidos

Nenhuma alteração no código-fonte da Lunari, VPS, bancos, uploads, configurações remotas ou histórico Git. Nenhum push, publicação, criação/remoção de repositório ou alteração de licença. Os materiais originais do portfólio foram preservados.
