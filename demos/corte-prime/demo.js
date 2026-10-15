'use strict';
const dialog = document.querySelector('dialog');
let opener;
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-service]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      opener = button;
      document.querySelector('#service-title').textContent = button.dataset.service;
      dialog.showModal();
      dialog.querySelector('.close').focus();
    });
  });
  dialog.querySelectorAll('.close').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => opener?.focus());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
}
