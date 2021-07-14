// import { lockScroll, unlockScroll } from "./scrollBlocker";

// let menuIsOpen = false;
// const Modal = document.querySelector('.page-header__nav');
// const Buttons = document.querySelectorAll('.js-menu-button');

// export default function Menu () {
//   Buttons.forEach(button => {
//     button.addEventListener('click', toggleMenu);
//   });

//   window.addEventListener('resize', resizeHandler);
// }

// function toggleMenu () {
//   menuIsOpen = !menuIsOpen;

//   document.documentElement.classList.toggle('menu-open');
//   //document.documentElement.classList.toggle('no-scroll-with-scrollbar');
//   menuIsOpen
//     ? lockScroll(Modal)
//     : unlockScroll(Modal);
// }

// function resizeHandler () {
//   if (!menuIsOpen) return;

//   if (window.matchMedia('(min-width: 768px)').matches) {
//     toggleMenu();
//   }
// }

import { lockScroll, unlockScroll } from './scrollBlocker';

export default function Menu() {
    const menu = document.querySelector('.page-header__nav');
    const btns = Array.from(document.querySelectorAll('.js-menu-button'));

    let menuOpen = false;

    const openMenu = () => {
        if (menuOpen) return;
        lockScroll(menu);
        document.documentElement.classList.add('menu-open');
        document.documentElement.classList.add('no-scroll-with-scrollbar');
        menuOpen = true;
    };
    const closeMenu = () => {
        if (!menuOpen) return;
        unlockScroll();
        document.documentElement.classList.remove('menu-open');
        document.documentElement.classList.remove('no-scroll-with-scrollbar');
        menuOpen = false;
    };

    btns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();

            if (menuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    });

    if (window.matchMedia('(max-width: 767px)').matches) return;

    const navDropdowns = Array.from(document.querySelectorAll('.js-nav-dropdown'));
    const logo = document.querySelector('.page-header__logo');

   

    navDropdowns.forEach(dropdown => {
        if (!logo) return;
        dropdown.addEventListener('mouseleave', event => {
            console.log('Mouseleave target', event.relatedTarget);
            if (!event.relatedTarget.closest('.page-header__nav')) {
                navDropdowns.forEach(item => item.classList.remove('dropdown-shown'));
                menu.classList.remove('with-open-dropdown');
                document.body.classList.remove('dropdown-menu-shown')
                unlockScroll();
            }
        });

        dropdown.addEventListener('mouseenter', () => {
            navDropdowns.forEach(item => item.classList.remove('dropdown-shown'));
            dropdown.classList.add('dropdown-shown');
            menu.classList.add('with-open-dropdown');
            lockScroll(dropdown);
            document.body.classList.add('dropdown-menu-shown')
        });
       
    });

    logo.addEventListener('mouseenter', () => {
        navDropdowns.forEach(item => item.classList.remove('dropdown-shown'));
        menu.classList.remove('with-open-dropdown');
        document.body.classList.remove('dropdown-menu-shown')
    });
}
