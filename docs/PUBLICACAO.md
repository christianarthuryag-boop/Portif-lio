# Publicação preparada — exige confirmação final

Nenhum push, merge, deploy, criação de repositório ou alteração de configuração remota foi executado. Branch local: `redesign/apresentacao-profissional`.

## Conteúdo proposto para publicação

O site contém, nesta ordem: Lunari (projeto privado apresentado, sem código), Corte Prime (barbearia fictícia), Pata & Afeto (pet shop fictício) e o próprio portfólio. Contatos pessoais são os já configurados no portfólio original. A versão 4.0 da Lunari e SQLite permanecem identificados como locais.

O artefato `dist/` tem somente os 23 arquivos de runtime de `scripts/site-files.json` mais `.nojekyll`: HTML, CSS, JS, SVGs, três WebP do portfólio e o vídeo original da demo Corte Prime. Não inclui `.git`, `.local`, docs, scripts, github-profile, backups, dados privados ou código da Lunari.

**O push do repositório é diferente do artefato do site.** Um push desta branch também envia commits, README, scripts, workflow, perfil preparado e documentação técnica versionada. Os relatórios técnicos das etapas anteriores permanecem no histórico; não contêm bancos, segredos ou código privado e não entram no artefato Pages. Exclusão de arquivo no último commit não remove seu conteúdo do histórico; não foi feita reescrita. Arquivos realmente internos/de revisão devem permanecer em `.local/`, ignorado pelo Git. Nunca usar `git add -f` para incluí-los.

## GitHub Pages

O workflow `.github/workflows/pages.yml` foi preparado com `workflow_dispatch`, confirmação booleana e sem gatilho automático de push. Publica somente `dist/`. Ele não foi enviado nem executado.

Após aprovação:

1. Conferir a configuração Pages atual antes de enviar/mesclar mudanças. Metadados consultados na auditoria anterior indicavam Pages habilitado; a origem atual não foi reconfirmada. Outro gatilho preexistente pode publicar após um push.
2. Enviar a branch autorizada e revisar os commits sem reescrever histórico.
3. Após aprovação para merge/publicação, disponibilizar o workflow na branch apropriada e configurar Settings → Pages → Source como GitHub Actions. Essa alteração remota precisa de autorização.
4. Executar manualmente “Publicar portfolio no GitHub Pages”, marcar a confirmação e aguardar o resultado.
5. Confirmar a URL retornada. Só então atualizar Website, canonical e metadados sociais absolutos, se desejado. URLs não foram inventadas.
6. Validar site, demos, contatos e console na publicação efetiva.

A montagem e o workflow seguem a [documentação oficial de workflows personalizados do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). A validação local de `/Portif-lio/` não equivale a publicação ou execução no ambiente GitHub.

## Perfil GitHub

`github-profile/README.md` está atualizado com Lunari, Corte Prime, Pata & Afeto e portfólio. O repositório especial não foi criado. Seus links para as demos na branch `main` são preparados para publicação e devem ser confirmados após merge, antes de publicar o perfil.

Criar o repositório `christianarthuryag-boop/christianarthuryag-boop`, publicar seu README, editar a bio ou fixar projetos são ações separadas que exigem autorização. Bio sugerida: “Desenvolvedor web em início de carreira | HTML, CSS e JavaScript | Sites responsivos | Criador da Lunari”.

Descrição sugerida do portfólio: “Projetos e desenvolvimento web de Christian Arthur. HTML, CSS e JavaScript, com demos de barbearia e pet shop.” Topics sugeridos: `portfolio`, `frontend`, `html`, `css`, `javascript`, `responsive-design`.

Sem renomeação de repositório, licença adicionada, acesso à VPS ou alteração da Lunari.
