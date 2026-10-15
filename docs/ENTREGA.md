# Entrega local

Branch: `redesign/apresentacao-profissional`. Nada enviado ao GitHub. Histórico original preservado. Lunari somente lida, sem execução, escrita, acesso à VPS, banco ou uploads.

## Arquivos e mudanças

- `index.html`: conteúdo completo atualizado, hero comercial, projetos, sobre, tecnologias, serviços e contato; SEO e semântica; apresentação da Lunari com distinção local/público; modal nativo para vídeo.
- `style.css`: redesign integral, carvão/verde, tipografia de sistema sem requisições externas, layouts responsivos, foco e reduced motion.
- `inte.js`: menu, ano e ciclo do modal, sem autoplay, pausa/restauração de foco.
- `assets/images/{christian,corte-prime,lunari}.webp` e `assets/favicon.svg`: materiais otimizados e identidade visual. Lunari usa somente imagem de apresentação da marca, não código nem captura da produção. Originais do portfólio preservados.
- `demos/corte-prime/{index.html,style.css,demo.js}`: demo própria e independente. Conteúdo comercial fictício identificado; sem telefone/endereço inventados, depoimentos, reservas ou formulário falso.
- `.gitignore`: proteção contra credenciais, dados, uploads e saídas de QA.
- `README.md`: execução, tecnologias, estrutura, projetos, limites e licença não presumida.
- `github-profile/README.md`: apresentação pronta para futuro repositório especial do perfil; nenhum repositório criado remotamente.
- `scripts/check-static.py` e `scripts/browser-qa.cjs`: verificações estáticas e roteiro executável de QA/capturas.
- `docs/{AUDITORIA,TESTES,PUBLICACAO,ENTREGA}.md`: diagnóstico, evidências, pendências e preparação de publicação.

## Lunari

Destaque principal com visual de marca e descrição da plataforma de leitura/comunidade. Catálogo, leitores, biblioteca, perfis, comentários e administração descritos como verificados no código local. Desafios de formatos, API e permissões. Código privado. SQLite explicitamente local; versão 4.0 ainda não publicada. O site público permanece como link, sem alegação de disponibilidade atual ou de funcionalidades exclusivas da 4.0 em produção. Não foram copiados documentos internos, fontes, bancos ou uploads.

## Verificação e pendências

Sintaxe JS, links/âncoras/recursos locais, semântica básica, imagens, vídeo e revisão estática de segredos aprovados. Detalhes em TESTES.md. Navegador e capturas bloqueados por permissão do ambiente; roteiro pronto para execução no host. Contatos mantidos do original, mas titularidade/entrega e disponibilidade externa não reconfirmadas.

## Visualização

`python3 -m http.server 8080 --bind 127.0.0.1` na pasta do projeto; abrir http://127.0.0.1:8080 . Nenhum serviço fica iniciado pelo agente.

## Aprovação para publicação

Exige autorização explícita: push/merge, publicação Pages, criação do repositório especial público e alterações na bio/configurações/descrições/topics. Pages já consta habilitado: um push pode disparar publicação existente. Confirmar contatos e direitos dos materiais antes disso. Nenhum nome de repositório ou licença foi alterado.
