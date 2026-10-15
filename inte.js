'use strict';

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
menuButton.hidden = false;
document.documentElement.classList.add('js');
function closeMenu(restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', String(menuButton.getAttribute('aria-expanded') !== 'true'));
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
menu.addEventListener('focusout', event => {
  if (!menu.contains(event.relatedTarget) && event.relatedTarget !== menuButton) closeMenu();
});
window.matchMedia('(min-width: 769px)').addEventListener('change', () => closeMenu());
document.querySelector('#ano').textContent = new Date().getFullYear();

// Native modal dialog provides an inert background and contains keyboard focus.
const dialog = document.querySelector('#demo-modal');
const video = dialog.querySelector('video');
const trigger = document.querySelector('.video-trigger');
if (typeof dialog.showModal === 'function') {
  trigger.hidden = false;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('.close-modal').focus();
  });
  dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    video.pause();
    video.currentTime = 0;
    document.body.classList.remove('modal-open');
    trigger.focus();
  });
}
