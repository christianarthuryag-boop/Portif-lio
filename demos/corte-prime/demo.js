'use strict';

// Progressive enhancement: all sections and image links also work without JS.
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

// Native dialogs keep the rest of the page inert and contain keyboard focus.
function prepareDialog(dialog) {
  let opener;
  if (typeof dialog.showModal !== 'function') return null;

  dialog.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    )) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    opener?.focus();
  });
  return trigger => {
    opener = trigger;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.close').focus();
  };
}

const openService = prepareDialog(document.querySelector('#service-dialog'));
if (openService) {
  document.querySelectorAll('[data-service]').forEach(trigger => {
    trigger.hidden = false;
    trigger.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('#service-title').textContent = trigger.dataset.service;
      openService(trigger);
    });
  });
}

const openGallery = prepareDialog(document.querySelector('#gallery-dialog'));
if (openGallery) {
  document.querySelectorAll('[data-gallery]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      const source = trigger.querySelector('img');
      const image = document.querySelector('#gallery-image');
      image.src = trigger.getAttribute('href');
      image.alt = source.alt;
      image.width = Number(source.getAttribute('width'));
      image.height = Number(source.getAttribute('height'));
      openGallery(trigger);
    });
  });
}
