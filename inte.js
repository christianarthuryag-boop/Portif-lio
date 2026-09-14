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
