import { lockScroll, unlockScroll } from "./scrollBlocker";

let infoIsOpen = false;
const Instances = [];

export default function TourInfo () {
  let infos = document.querySelectorAll('.js-tour-info');
  infos.forEach(info => {
    let modal = info.querySelector('.js-tour-info-modal'),
    buttons = info.querySelectorAll('.js-tour-info-button');

    if (!modal || !buttons)
      return;


    console.log('Hello test')

    let instance = {
      modal: modal,
      buttons: buttons,
    };
    instance.listener = toggleModal.bind(instance),

    buttons.forEach(button => {
      button.addEventListener('click', instance.listener);
    })

    Instances.push(instance);
  });
}

function toggleModal (event) {
  console.log('Toggling')
  event && event.preventDefault();

  let instance = this;
  
  instance.modal.classList.toggle('open');

  

  infoIsOpen
    ? unlockScroll(instance.modal)
    : lockScroll(instance.modal);

  infoIsOpen = !infoIsOpen;
}