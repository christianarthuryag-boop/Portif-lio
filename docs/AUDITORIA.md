# Auditoria — 15/10/2026

## Escopo e evidências antes da edição

Perfil público: https://github.com/christianarthuryag-boop — bio “Programador”, um repositório público visível: Portif-lio. A API de usuários ficou indisponível e a listagem inicial do conector veio vazia. Uma busca posterior do conector GitHub com `user:christianarthuryag-boop` retornou somente Portif-lio, corroborando o perfil. Esse é o único repositório público encontrado e acessível nesta auditoria. Não tratar os diretórios locais todo-list e template-negocio-local como repositórios públicos.

Metadados e árvore de Portif-lio confirmados pelo conector GitHub: main, sem licença, sem README, sem topics, homepage vazia, Pages já habilitado. Checkout local limpo, commit 13f9f2c; arquivos do topo correspondem à estrutura remota. Nenhuma configuração remota alterada.

## Problemas encontrados

- Idade 17 e situação escolar antigas; percentuais arbitrários de HTML/CSS/JS e promessa “100% responsivo”.
- Lunari ausente, serviços e explicação dos desafios técnicos insuficientes.
- HTML com parte do conteúdo fora do main; sem skip link, dimensões explícitas em imagens ou metadados sociais.
- Animações contínuas com grandes áreas desfocadas; conteúdo dependente de IntersectionObserver para aparecer. Sem tratamento completo de movimento reduzido.
- Menu sem tratamento de Escape; modal restituía foco, mas não confinava Tab nem tornava fundo inerte.
- DEMO_URL vazio: botão da demo sem destino. Vídeo existe, 42,435 segundos, cerca de 7,4 MB; não deve carregar na abertura da página.
- Imagens, telefone WhatsApp, e-mail e LinkedIn existem no HTML original. Propriedade/entregabilidade desses contatos não foram confirmadas externamente. Conservar WhatsApp/e-mail como contatos previamente configurados; omitir LinkedIn até reconfirmar.
- Demo local Corte Prime contém endereço/telefone de exemplo, avaliações e depoimentos fictícios e recursos externos. Não publicar esses dados como negócio real. Preparar demo independente, claramente identificada, sem envio ou reserva simulada.
- Nenhum README, .gitignore ou licença no portfólio. Não adicionar licença sem decisão do autor.

## Lunari: leitura apenas

Lidos AGENTS.md, índice de memória, estado, README, package.json, rotas e motor SQLite, sem executar aplicação, acessar bancos, .env ou uploads. HTML/CSS/JS sem build; Node.js/Express; SQLite no desenvolvimento local. Rotas comprovam catálogo, biblioteca, perfis, comentários e administração; páginas comprovam leitores de texto e imagens. Não copiar código, documentos internos, dados ou uploads.

Estado registra produção 3.0, confirmada anteriormente pelo proprietário. Local: package.json 4.0.0. Site remoto indisponível às ferramentas nesta sessão; não alegar que SQLite ou funcionalidades locais estão na produção. Recursos da 4.0 não serão anunciados como publicados.

## Segurança

Árvore pública original contém apenas HTML/CSS/JS, imagens e vídeo. Nenhum .env, banco ou chave no inventário versionado. Revisão adicional dos arquivos finais será registrada na entrega; inspeção não garante ausência de todo segredo no histórico remoto. Nenhum histórico reescrito. Nenhum arquivo privado da Lunari será incluído; somente um visual de marca destinado à apresentação, sem dados de usuários.
