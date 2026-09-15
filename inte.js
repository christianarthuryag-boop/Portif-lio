// Tira o modo no-js pra ativar animações
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const topo = document.getElementById('topo');

function fecharMenu() {
  menu.classList.remove('active');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
  toggle.setAttribute('aria-label', 'Abrir menu');
}

toggle.addEventListener('click', () => {
  const aberto = menu.classList.toggle('active');
  document.body.classList.toggle('menu-open', aberto);
  toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  toggle.textContent = aberto ? '✕' : '☰';
  toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em qualquer link
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', fecharMenu);
});

// Sombra no header ao rolar
window.addEventListener('scroll', () => {
  topo.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      // Anima as barras de habilidade
      entry.target.querySelectorAll('.progress').forEach(bar => {
        bar.style.width = bar.dataset.width || '60%';
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Ano automático no footer
document.getElementById('ano').textContent = new Date().getFullYear();

// ===== Projeto demonstrativo Corte Prime (preview estilo YouTube + modal) =====
// CONFIGURAR: URL pública onde a demonstração estiver hospedada.
// Enquanto estiver vazia, o botão "Visitar demonstração" fica desabilitado.
const DEMO_URL = '';

(function () {
  const card = document.querySelector('[data-demo="corte-prime"]');
  const modal = document.getElementById('demo-modal');
  if (!card || !modal) return;

  const openers = card.querySelectorAll('[data-open-modal]');
  const previewBtn = card.querySelector('.projeto-preview');
  const previewVideo = card.querySelector('[data-preview]');
  const modalVideo = modal.querySelector('[data-modal-video]');
  const closeBtn = modal.querySelector('[data-close-modal]');
  const demoLink = modal.querySelector('[data-demo-link]');
  let lastFocus = null;

  // Só usa hover em dispositivos com mouse e sem preferência por movimento reduzido.
  // No touch/teclado, o preview continua acessível: o clique abre o modal.
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function stopPreview() {
    if (!previewVideo) return;
    previewVideo.pause();
    try { previewVideo.currentTime = 0; } catch (e) { /* vídeo ainda não carregado */ }
    if (previewBtn) previewBtn.classList.remove('is-playing');
  }

  if (previewVideo && previewBtn && canHover && !reducedMotion) {
    // Mostra o vídeo somente quando ele realmente começa a tocar;
    // se o arquivo ainda não existir, a capa mock continua visível.
    previewVideo.addEventListener('playing', () => previewBtn.classList.add('is-playing'));
    previewVideo.addEventListener('error', stopPreview);
    previewBtn.addEventListener('mouseenter', () => {
      previewVideo.play().catch(() => { /* mantém a capa se falhar */ });
    });
    previewBtn.addEventListener('mouseleave', stopPreview);
  }

  function openModal() {
    stopPreview();
    lastFocus = document.activeElement;

    // Botão "Visitar demonstração": usa a URL configurada ou fica desabilitado.
    if (DEMO_URL) {
      demoLink.href = DEMO_URL;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener';
      demoLink.classList.remove('is-disabled');
      demoLink.removeAttribute('aria-disabled');
      demoLink.removeAttribute('title');
    } else {
      demoLink.href = '#';
      demoLink.removeAttribute('target');
      demoLink.classList.add('is-disabled');
      demoLink.setAttribute('aria-disabled', 'true');
      demoLink.title = 'URL da demonstração ainda não configurada (DEMO_URL em inte.js)';
    }

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalVideo.play().catch(() => { /* usuário dá play manualmente */ });
    closeBtn.focus();
  }

  function closeModal() {
    // Impede que o vídeo continue tocando depois de fechar.
    modalVideo.pause();
    try { modalVideo.currentTime = 0; } catch (e) { /* vídeo ainda não carregado */ }
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  openers.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  // Clicar fora do conteúdo fecha; clicar dentro, não.
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
  demoLink.addEventListener('click', (e) => {
    if (!DEMO_URL) e.preventDefault();
  });
})();
