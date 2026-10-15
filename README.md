# Christian Arthur — Portfólio

Portfólio profissional de um desenvolvedor web em início de carreira: projetos reais, serviços de frontend e contato direto. Redesign com identidade escura, verde suave e foco em legibilidade e mobile.

## Executar localmente

Requer apenas Python 3 para o servidor estático; sem instalação de dependências ou build.

```bash
cd ~/Projetos/Portif-lio
python3 -m http.server 8080 --bind 127.0.0.1
```

Abra http://127.0.0.1:8080 . As demos ficam em http://127.0.0.1:8080/demos/corte-prime/ e http://127.0.0.1:8080/demos/pata-e-afeto/ . Encerre com Ctrl+C. Também é possível abrir `index.html` diretamente no navegador.

## Estrutura

- `index.html`, `style.css`, `inte.js`: portfólio, estilos responsivos e interações.
- `assets/images/`: imagens WebP otimizadas e sem metadados pessoais.
- `assets/videos/`: gravação original do Corte Prime, carregada apenas sob demanda.
- `demos/corte-prime/`: conceito de barbearia premium, preservado.
- `demos/pata-e-afeto/`: conceito de pet shop em creme, menta, coral e amarelo; ilustrações originais, serviços, galeria e interações locais sem reservas.
- `scripts/site-files.json`: lista explícita dos arquivos que podem entrar no site publicado.
- `.github/workflows/pages.yml`: workflow manual preparado, ainda não executado.
- `github-profile/README.md`: conteúdo preparado para o futuro repositório especial do perfil.
- `docs/`: auditoria, entrega, testes e instruções de publicação.
- `imagens/`: arquivos originais preservados; não são necessários ao novo layout. Mantidos para não descartar material original sem necessidade.

## Tecnologias e acessibilidade

HTML, CSS e JavaScript nativos. Sem frameworks, fontes remotas, analytics, formulário de envio ou dependências de runtime. HTML semântico, skip links, foco visível, menu acessível, `dialog` nativo com fundo inerte, Escape e devolução de foco. Movimento reduzido respeitado. Conteúdo e navegação permanecem disponíveis sem JavaScript; interações dependentes dele ficam ocultas.

## Projetos apresentados

**Lunari:** projeto principal privado. Funcionalidades descritas foram verificadas no código local, sem copiar código ou dados. A versão 4.0 e SQLite são identificados como desenvolvimento local. O acesso ao site público não foi reconfirmado. A imagem é o visual de marca do projeto, não uma captura da produção.

**Corte Prime:** conceito independente de barbearia premium em preto, grafite e bronze, com menu mobile, serviços e preços demonstrativos, galeria vetorial autoral ampliável e exploração de agendamento sem reservas. A demo navegável não contém avaliações inventadas, endereço, telefone comercial ou pagamentos. O vídeo original registra a versão anterior, com dados demonstrativos, e isso é informado no modal. Sem faixa de áudio, segundo inspeção de mídia; não há narração a transcrever.

**Pata & Afeto:** pet shop fictício com identidade acolhedora, quatro serviços, diferenciais de conceito, galeria ampliável e dicas para a visita. O visitante pode escolher um serviço no agendamento demonstrativo e receber feedback local, sem formulário, telefone comercial, envio de dados ou reserva. SVGs originais com origem documentada em [demos/pata-e-afeto/README.md](demos/pata-e-afeto/README.md).

**Portfólio:** este repositório público. Contatos conservados do HTML original; WhatsApp e e-mail não tiveram titularidade ou entregabilidade reconfirmadas. LinkedIn antigo omitido até reconfirmação.

## Validação

Ver [docs/TESTES.md](docs/TESTES.md) para resultados e limitações e [docs/AUDITORIA.md](docs/AUDITORIA.md) para diagnóstico inicial. JavaScript pode ser conferido com:

```bash
node --check inte.js
node --check demos/corte-prime/demo.js
node --check demos/pata-e-afeto/app.js
python3 scripts/check-static.py
python3 scripts/build-pages.py
python3 scripts/check-static.py --root dist
python3 scripts/check-pages.py
```

## Refinamento do Corte Prime

O design principal do portfólio foi preservado. Consulte [docs/REFINAMENTO-CORTE-PRIME.md](docs/REFINAMENTO-CORTE-PRIME.md) para mudanças, testes e limitações. A demo usa ilustrações SVG criadas para este projeto, sem fontes, fotos ou dependências externas. Não representam fotos de trabalhos ou clientes.

Para preparar a comparação local antes/depois, sem reverter commits:

```bash
bash scripts/prepare-corte-comparison.sh
```

Com o servidor local ativo, abra http://127.0.0.1:8080/.local/revisao.html . São versões navegáveis lado a lado, não capturas. Para gerar oito capturas reais usando Playwright já disponível, consulte o relatório do refinamento.

## Preparar GitHub Pages

`python3 scripts/build-pages.py` gera `dist/` apenas com os 23 arquivos listados em `scripts/site-files.json` e `.nojekyll`. Documentação, scripts, perfil preparado, arquivos de revisão e imagens antigas não utilizadas ficam fora do site. Não há build de framework nem dependência a instalar.

`python3 scripts/check-pages.py` verifica o conteúdo exato do artefato e a resolução de links sob `/Portif-lio/`. Isso é uma verificação estática, não um deploy real. As três páginas usam caminhos relativos.

O workflow preparado possui somente disparo manual e confirmação de publicação; não roda automaticamente em push. A configuração Pages já existente precisa ser conferida antes de um futuro push/merge, pois pode ter outro gatilho de publicação. Para executar o QA em CachyOS e simular o subcaminho, consulte [docs/PATA-E-AFETO-E-PAGES.md](docs/PATA-E-AFETO-E-PAGES.md).

## Licença e publicação

O repositório original não declara licença. Nenhuma foi adicionada: escolha de licença e direitos de imagens/vídeos devem ser confirmados pelo autor antes de conceder permissão de reutilização.

Nada foi enviado ao GitHub, criado remotamente ou publicado nesta missão. O repositório já tem GitHub Pages habilitado nos metadados: um futuro push pode acionar a publicação existente. Consulte [docs/PUBLICACAO.md](docs/PUBLICACAO.md) antes de publicar.
