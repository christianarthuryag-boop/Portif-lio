# Validação — 15/10/2026

## Aprovado nesta sessão

- `node --check inte.js`, `node --check demos/corte-prime/demo.js` e `node --check scripts/browser-qa.cjs`: sintaxe válida.
- `python3 scripts/check-static.py`: duas páginas, um h1/main/title por página, idioma pt-BR, IDs sem duplicatas, todas as âncoras e arquivos locais existentes, imagens com alt/dimensões, links externos protegidos e ausência de formulário sem backend.
- `git diff --check`: sem erros de whitespace.
- Contraste calculado nos pares principais: texto/fundo 16,30:1; secundário/painel 8,75:1; texto/contato 8,36:1; botão 13,53:1; texto e botão da demo 8,52:1. Isso não cobre todos os estados visuais.
- Imagens efetivamente decodificadas com Pillow: perfil 540×540 (18.046 bytes), Corte Prime 1000×563 (19.414 bytes), Lunari 1200×630 (13.804 bytes). Novos WebP sem EXIF. HTML/CSS/JS principal abaixo de 40 KB sem compressão, incluindo formatação legível.
- `ffprobe`: vídeo original válido, duração 42,435 s, apenas faixa de vídeo (sem áudio); mantido com preload none e sem autoplay.
- Inspeção estática de segurança: nenhum .env, SQLite, banco, chave privada ou padrão comum de token nos arquivos finais inspecionados. Isso não certifica todo histórico remoto nem substitui scanner completo de segredos.
- Conteúdo revisado: 18 anos e ensino médio concluído; sem senioridade, clientes, depoimentos ou métricas de domínio inventados; serviços limitados; aviso 4.0 local e SQLite local; negócio demonstrativo identificado.

## Implementado e revisado no código, mas sem confirmação em navegador

Menu com aria-expanded, Escape, fechamento por link/clique externo e foco; dialog nativo com fundo inerte, confinamento de foco, fechamento por Escape/botão/fundo e restauração; pausa e reset de vídeo; reduced motion; fallback sem JavaScript; media queries para mobile. Foco com outline de 3 px. Hierarquia semântica e textos alternativos revisados. Não declarar aprovação de leitor de tela ou conformidade WCAG completa.

## Bloqueado pelo ambiente

Chromium já instalado foi iniciado via Playwright local. Encerrou antes de abrir a página: `setsockopt: Operation not permitted`, SIGTRAP. Não houve tentativa de contornar permissões nem instalação de navegador. Assim, console real, reprodução, menu/modais, overflow e capturas em 320/390/768/1440 px permanecem PENDENTES. Nenhuma captura fictícia foi produzida.

HTTP externo por shell falhou em DNS. Web não conseguiu acessar Lunari; GitHub foi conferido via perfil público e conector. Não afirmar que links externos, WhatsApp ou e-mail estão operacionais. Não foram enviadas mensagens. Não houve servidor local nem serviço da Lunari iniciado nesta sessão.

## Executar QA e gerar oito capturas no host

`scripts/browser-qa.cjs` usa Playwright apenas para desenvolvimento; não adiciona dependências ao site. Reutilize uma instalação existente. Nesta máquina foi encontrado o módulo no caminho abaixo:

```bash
cd ~/Projetos/Portif-lio
PLAYWRIGHT_CORE_PATH="$HOME/.cache/ms-playwright-go/1.61.1/package" \
CHROMIUM_PATH="$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome" \
node scripts/browser-qa.cjs
```

Alternativamente, com `playwright` já disponível no Node: `node scripts/browser-qa.cjs`. O script abre arquivos locais, confere overflow nas quatro larguras, decodifica imagens, valida menu, Escape, foco/restauração, fechamento dos modais, vídeo pausado e ausência de erros no console, além de fallback sem JS. Gera oito PNGs em `.local/qa/`, ignorado pelo Git. Inspecione visualmente cada captura: aprovação automática de overflow não prova qualidade de composição.

Para testar por HTTP, execute o servidor descrito no README em outro terminal e use `PORTFOLIO_QA_URL=http://127.0.0.1:8080/` junto às variáveis acima.

Conferência manual complementar: navegar somente com Tab/Shift+Tab/Enter/Escape; zoom 200%; leitor de tela; conferir contraste em todos os estados; abrir contatos e site público; confirmar origem/licença das imagens e vídeo antes de publicar. Executar no host é uma pendência de validação, não um resultado aprovado nesta sessão.
