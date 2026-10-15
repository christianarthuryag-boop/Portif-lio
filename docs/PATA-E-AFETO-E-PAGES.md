# Pata & Afeto e preparação para GitHub Pages

## Entrega local

Branch: `redesign/apresentacao-profissional`. Pata & Afeto é uma landing page de pet shop fictício, com identidade própria em creme, verde-menta, coral e amarelo. Ilustrações SVG originais de cães e gatos, tipografia arredondada de sistema, cartões suaves e formas orgânicas.

Conteúdo: hero, quatro serviços, diferenciais apresentados como proposta fictícia, galeria ampliável, jornada demonstrativa, dicas para organizar a visita, contato demonstrativo e rodapé. Sem avaliações inventadas, certificações, endereço, telefone comercial, backend, reservas ou pagamentos.

Interações: âncoras, menu por toque/teclado, seleção de serviço com feedback `aria-live`, galeria e dialogs nativos com Escape, botão/fundo e restauração de foco. Sem coleta, persistência ou envio de dados. Movimento reduzido respeitado. Sem JS, navegação e imagens continuam acessíveis; CTAs de serviço levam à explicação de contato.

No portfólio, a ordem é Lunari → Corte Prime → Pata & Afeto → Este Portfólio. Novo cartão com imagem própria e link relativo funcional. `style.css`, `inte.js` e todos os arquivos de Corte Prime permaneceram intactos. Nenhum arquivo da Lunari foi acessado ou modificado nesta etapa.

## Arquivos novos

- `demos/pata-e-afeto/index.html`, `style.css`, `app.js`, `README.md`.
- `demos/pata-e-afeto/assets/{amigos,cachorro,gato,dupla,patinha}.svg`.
- `scripts/site-files.json`, `build-pages.py`, `check-pages.py`.
- `.github/workflows/pages.yml` e este documento.

Alterados: `index.html`, `README.md`, `github-profile/README.md`, `.gitignore`, `scripts/check-static.py`, `scripts/browser-qa.cjs`, `docs/PUBLICACAO.md` e `docs/TESTES.md`.

Origem e direitos dos recursos estão documentados em `demos/pata-e-afeto/README.md`: ilustrações criadas para o projeto, sem material de terceiros ou licença externa presumida. Nenhuma licença geral foi adicionada.

## Testes executados

- Sintaxe Node: `inte.js`, `demos/corte-prime/demo.js`, `demos/pata-e-afeto/app.js` e `scripts/browser-qa.cjs` aprovados.
- `python3 scripts/check-static.py`: três páginas, h1/main/title, idioma, IDs, âncoras, recursos, dimensões/alt e proteção dos links externos aprovados.
- `python3 scripts/build-pages.py`: artefato local montado com lista explícita de 23 arquivos + `.nojekyll`.
- `python3 scripts/check-static.py --root dist`: três páginas do artefato aprovadas.
- `python3 scripts/check-pages.py`: inventário exato e 88 referências locais válidas sob `/Portif-lio/`; XML/SVGs sem código ativo ou referências externas.
- Ordem dos quatro projetos validada no HTML.
- Inspeção: nenhuma coleta de dados, form, input, select ou iframe no pet shop; sem telefone comercial.
- YAML parseado com PyYAML: somente `workflow_dispatch`, confirmação false por padrão, upload de `dist/`. Não executado no GitHub.
- Contraste calculado: texto/creme 9,28:1; secundário/contato 4,97:1; secundário/coral 5,11:1; secundário/amarelo 5,42:1; secundário/lilás 5,24:1; botão 6,38:1; foco/menta 4,59:1. Não cobre todos os estados renderizados.
- Performance estática: pet shop com aproximadamente 43,5 KB em oito arquivos de runtime, sem dependências, fontes remotas ou imagens raster pesadas. Hero com prioridade e dimensões; galeria lazy. Pacote completo cerca de 7,85 MB, em grande parte o vídeo original com `preload=none`, sem autoplay. Não houve medição de Lighthouse, Core Web Vitals ou tráfego real.
- `git diff --check`: aprovado.

## Testes bloqueados e limites

A tentativa real de Chromium headless/Playwright terminou antes de abrir a página: `setsockopt: Operation not permitted`, SIGTRAP. A tentativa de servidor HTTP local também foi impedida por `PermissionError: Operation not permitted` no bind. Sem alteração de flags para contornar permissões e sem serviço deixado em execução.

Portanto, layouts em 320/390/768/1440, navegação/interações reais, menu por teclado/toque, console, imagens renderizadas, capturas e leitor de tela continuam pendentes de execução no CachyOS. Os scripts estão preparados, mas não foram declarados aprovados. A validação de subcaminho foi estática; comportamento no GitHub Pages real não foi executado porque não houve publicação.

Links externos foram inventariados; não foram contatados WhatsApp/e-mail nem reconfirmada a disponibilidade da Lunari. O scanner básico não encontrou arquivos sensíveis ou padrões de segredos nas fontes revisadas; isso não é certificação exaustiva de todo histórico Git.

## Revisão no CachyOS

```bash
cd ~/Projetos/Portif-lio
python3 -m http.server 8080 --bind 127.0.0.1
```

Abra http://127.0.0.1:8080/demos/pata-e-afeto/ ou o portfólio em http://127.0.0.1:8080/ . Encerre com Ctrl+C.

Com a instalação Playwright já existente, em outro terminal:

```bash
cd ~/Projetos/Portif-lio
export PLAYWRIGHT_CORE_PATH="$HOME/.cache/ms-playwright-go/1.61.1/package"
export CHROMIUM_PATH="$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome"
PORTFOLIO_QA_URL=http://127.0.0.1:8080/ node scripts/browser-qa.cjs
```

O roteiro cobre as três páginas nas quatro larguras, imagens, overflow, menu, modais, foco, feedback, console e fallback sem JS. Gera doze capturas em `.local/qa/`. Sem instalação de dependências no site. Se a instalação local tiver mudado, ajuste os caminhos ou use um Playwright já disponível no Node.

## Simular o subcaminho Pages no host

Depois de encerrar o servidor anterior:

```bash
python3 scripts/build-pages.py
python3 scripts/check-static.py --root dist
python3 scripts/check-pages.py
mkdir -p .local/pages-preview/Portif-lio
cp -R dist/. .local/pages-preview/Portif-lio/
python3 -m http.server 8080 --bind 127.0.0.1 --directory .local/pages-preview
```

Abra http://127.0.0.1:8080/Portif-lio/ . Em outro terminal, com as variáveis Playwright acima:

```bash
PORTFOLIO_QA_URL=http://127.0.0.1:8080/Portif-lio/ node scripts/browser-qa.cjs
```

Essa simulação serve somente o pacote público e testa URLs relativas. Não substitui a validação no Pages após publicação. Revise capturas, navegue por Tab/Shift+Tab/Enter/Escape e confira zoom a 200% e preferência de movimento reduzido.

## Conteúdo para autorização final

O site preparado inclui portfólio aprovado, demo Corte Prime preservada, nova demo Pata & Afeto e recursos permitidos. Push da branch também leva fontes, scripts, workflow, README/perfil preparado, documentação técnica e histórico. `.local`, dist e backups são ignorados. Relatórios técnicos já versionados permanecem no histórico, sem dados privados; não são enviados ao artefato Pages.

O workflow só possui disparo manual, mas a configuração Pages preexistente deve ser conferida antes de push/merge: pode haver outra origem automática. Nenhuma configuração remota foi alterada. Push, merge, configuração/publicação Pages e criação do repositório especial do perfil exigem confirmação explícita. Procedimento detalhado: [PUBLICACAO.md](PUBLICACAO.md).
