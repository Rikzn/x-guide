import { Swiper, Autoplay, Navigation } from 'swiper';
Swiper.use([Autoplay, Navigation]);
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function TeamSlider () {
  const elements = Array.from(document.querySelectorAll('.js-team-slider'));

  let speed = 700;

  elements.forEach(element => {
  
    if (window.matchMedia(`(max-width: ${767}px)`).matches) {
      createSliderMobile(element);
    } else {
      createSliderDesktop(element);
    }
    
  });

  function createSliderMobile (element) {
    const container = element.querySelector('.swiper-container');
    const prevArrow = element.querySelector('.slider__nav-button--prev');
    const nextArrow = element.querySelector('.slider__nav-button--next');

    const slider = new Swiper(container, {
      updateOnWindowResize: true,
      speed: speed,
      slidesPerView: 'auto',
      //centeredSlides: true,
      watchOverflow: true,
    });
  }

  function createSliderDesktop (element) {
    const container = element.querySelector('.swiper-container');
    const wrapper = element.querySelector('.swiper-wrapper');
    const prevArrow = element.querySelector('.slider__nav-button--prev');
    const nextArrow = element.querySelector('.slider__nav-button--next');

    const slider = new Swiper(container, {
      updateOnWindowResize: true,
      speed: speed,
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      watchOverflow: true,
      navigation: {
        prevEl: prevArrow,
        nextEl: nextArrow,
      },
    });

    if (window.matchMedia(`(max-width: ${767}px)`).matches) return;

    let autoplayIsEnabled = false,
        timer = 0;

    prevArrow.addEventListener('click', ()=> {
      arrowClickHandler(()=>{
        slider.slideToLoop(slider.realIndex - 1, speed);
      });
    });
    nextArrow.addEventListener('click', ()=> {
      arrowClickHandler(()=>{
        slider.slideToLoop(slider.realIndex + 1, speed);
      });
    });

    ScrollTrigger.create({
      trigger: container,
      start: `top bottom-=${container.clientHeight}`,
      end: `top top-=${container.clientHeight / 2}`,
      onEnter: autoplayEnable,
      onEnterBack: autoplayEnable,
      onLeave: autoplayDisable,
      onLeaveBack: autoplayDisable,
    });

    function arrowClickHandler (changeSlide) {
      window.clearTimeout(timer);
      timer = window.setTimeout(autoplayEnable, 3000);
      if (!autoplayIsEnabled) return;
      changeSlide();
      autoplayDisable();
    }

    function autoplayEnable () {
      if (autoplayIsEnabled) return;

      slider.params.autoplay.delay = 0;
      slider.params.autoplay.disableOnInteraction = false;

      slider.params.speed = 3500;
      slider.params.allowTouchMove = false;

      wrapper.classList.add('swiper-wrapper--autoplay');
      slider.autoplay.start();
      slider.update(true);

      autoplayIsEnabled = true;
    }

    function autoplayDisable () {
      if (!autoplayIsEnabled) return;
  
      slider.params.speed = speed;
      slider.params.allowTouchMove = true;

      wrapper.classList.remove('swiper-wrapper--autoplay');
      slider.autoplay.stop();
      slider.update(true);
  
      autoplayIsEnabled = false;
    }
  }
}