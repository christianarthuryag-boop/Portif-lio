'use strict';

// Sections and image links remain navigable if JavaScript is unavailable.
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

function prepareDialog(dialog) {
  if (typeof dialog.showModal !== 'function') return null;
  let opener;
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
    dialog.showModal(); // Native focus containment and inert page background.
    document.body.classList.add('dialog-open');
    dialog.querySelector('.close').focus();
  };
}

const booking = document.querySelector('#booking-dialog');
const feedback = booking.querySelector('.selection-feedback');
const choices = [...booking.querySelectorAll('[data-choice]')];
function selectService(service) {
  choices.forEach(choice => {
    choice.setAttribute('aria-pressed', String(choice.dataset.choice === service));
  });
  feedback.textContent = service
    ? `${service} selecionado. Em um pet shop real, o próximo passo seria conversar com a equipe. Esta demo não cria reservas.`
    : 'Escolha um serviço para explorar.';
}
const openBooking = prepareDialog(booking);
if (openBooking) {
  document.querySelectorAll('[data-service]').forEach(trigger => {
    trigger.hidden = false;
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openBooking(trigger);
      selectService(trigger.dataset.service);
    });
  });
  choices.forEach(choice => {
    choice.addEventListener('click', () => selectService(choice.dataset.choice));
  });
}

const openGallery = prepareDialog(document.querySelector('#gallery-dialog'));
if (openGallery) {
  document.querySelectorAll('[data-gallery]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      const image = document.querySelector('#gallery-image');
      image.src = trigger.getAttribute('href');
      image.alt = trigger.querySelector('img').alt;
      openGallery(trigger);
    });
  });
}
