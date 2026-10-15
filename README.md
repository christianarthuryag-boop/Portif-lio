# Christian Arthur — Portfólio

Portfólio profissional de um desenvolvedor web em início de carreira: projetos reais, serviços de frontend e contato direto. Redesign com identidade escura, verde suave e foco em legibilidade e mobile.

## Executar localmente

Requer apenas Python 3 para o servidor estático; sem instalação de dependências ou build.

```bash
cd ~/Projetos/Portif-lio
python3 -m http.server 8080 --bind 127.0.0.1
```

Abra http://127.0.0.1:8080 . A demo fica em http://127.0.0.1:8080/demos/corte-prime/ . Encerre com Ctrl+C. Também é possível abrir `index.html` diretamente no navegador.

## Estrutura

- `index.html`, `style.css`, `inte.js`: portfólio, estilos responsivos e interações.
- `assets/images/`: imagens WebP otimizadas e sem metadados pessoais.
- `assets/videos/`: gravação original do Corte Prime, carregada apenas sob demanda.
- `demos/corte-prime/`: demonstração navegável independente, sem dados privados, bibliotecas externas ou reservas.
- `github-profile/README.md`: conteúdo preparado para o futuro repositório especial do perfil.
- `docs/`: auditoria, entrega, testes e instruções de publicação.
- `imagens/`: arquivos originais preservados; não são necessários ao novo layout. Mantidos para não descartar material original sem necessidade.

## Tecnologias e acessibilidade

HTML, CSS e JavaScript nativos. Sem frameworks, fontes remotas, analytics, formulário de envio ou dependências de runtime. HTML semântico, skip links, foco visível, menu acessível, `dialog` nativo com fundo inerte, Escape e devolução de foco. Movimento reduzido respeitado. Conteúdo e navegação permanecem disponíveis sem JavaScript; interações dependentes dele ficam ocultas.

## Projetos apresentados

**Lunari:** projeto principal privado. Funcionalidades descritas foram verificadas no código local, sem copiar código ou dados. A versão 4.0 e SQLite são identificados como desenvolvimento local. O acesso ao site público não foi reconfirmado. A imagem é o visual de marca do projeto, não uma captura da produção.

**Corte Prime:** negócio fictício. A demo navegável não contém avaliações inventadas, endereço, telefone comercial ou pagamentos. O vídeo original registra a versão anterior, com dados demonstrativos, e isso é informado no modal. Sem faixa de áudio, segundo inspeção de mídia; não há narração a transcrever.

**Portfólio:** este repositório público. Contatos conservados do HTML original; WhatsApp e e-mail não tiveram titularidade ou entregabilidade reconfirmadas. LinkedIn antigo omitido até reconfirmação.

## Validação

Ver [docs/TESTES.md](docs/TESTES.md) para resultados e limitações e [docs/AUDITORIA.md](docs/AUDITORIA.md) para diagnóstico inicial. JavaScript pode ser conferido com:

```bash
node --check inte.js
node --check demos/corte-prime/demo.js
```

## Licença e publicação

O repositório original não declara licença. Nenhuma foi adicionada: escolha de licença e direitos de imagens/vídeos devem ser confirmados pelo autor antes de conceder permissão de reutilização.

Nada foi enviado ao GitHub, criado remotamente ou publicado nesta missão. O repositório já tem GitHub Pages habilitado nos metadados: um futuro push pode acionar a publicação existente. Consulte [docs/PUBLICACAO.md](docs/PUBLICACAO.md) antes de publicar.
