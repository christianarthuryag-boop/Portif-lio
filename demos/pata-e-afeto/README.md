# Pata & Afeto

Landing page demonstrativa de um pet shop fictício, criada como projeto de portfólio de Christian Arthur. Identidade própria: creme, verde-menta, coral e amarelo, tipografia arredondada de sistema e formas orgânicas.

## Visualizar

Na raiz do repositório: `python3 -m http.server 8080 --bind 127.0.0.1`. Abra http://127.0.0.1:8080/demos/pata-e-afeto/ . Não exige npm, build ou backend. Também funciona abrindo o HTML diretamente.

## Experiência

- Hero com dupla de cão e gato, serviços e CTAs.
- Quatro serviços: banho, tosa, higiene/cuidados e produtos/acessórios.
- Diferenciais propostos para o negócio fictício, sem certificações ou qualificação profissional alegada.
- Galeria com ampliação e dicas de preparação para a visita, sem depoimentos inventados.
- Jornada demonstrativa e agendamento que permite selecionar um serviço, com feedback local acessível.
- Menu mobile, navegação por âncoras, foco visível, dialogs nativos com Escape, restauração de foco e respeito a movimento reduzido.
- Sem JavaScript, navegação e imagens continuam acessíveis; o botão dependente de JS fica oculto e os links de serviço levam à explicação de contato.

Nenhum dado pessoal é solicitado, persistido ou transmitido. Não há número comercial, atendimento, reserva, pagamento, formulário ou requisição a terceiros. O link de volta ao portfólio é relativo, compatível com o subcaminho GitHub Pages.

## Origem dos recursos

`assets/amigos.svg`, `cachorro.svg`, `gato.svg`, `dupla.svg` e `patinha.svg` foram desenhados em SVG especificamente para este projeto nesta implementação. São ilustrações originais de conceito, não fotos de clientes. Não usam imagens, fontes, símbolos de marca ou scripts de terceiros. Nenhuma imagem externa foi baixada e nenhuma licença de terceiros foi presumida. A licença geral de reutilização permanece a decidir pelo proprietário, como no restante do repositório.

## Arquivos

- `index.html`: conteúdo semântico e dialogs.
- `style.css`: identidade e responsividade próprias.
- `app.js`: menu, galeria e seleção de serviço em memória.
- `assets/`: ilustrações e favicon.

A página usa `noindex` para distinguir uma demonstração de um negócio real nos mecanismos de busca. Resultados de QA e limites do ambiente: [documentação de entrega](../../docs/PATA-E-AFETO-E-PAGES.md).
