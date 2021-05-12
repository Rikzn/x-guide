import { Swiper, Autoplay, Navigation } from 'swiper';
Swiper.use([Autoplay, Navigation]);

let itIsMobile,
    resizeTimer;
const instances = [];
const elements = Array.from(document.querySelectorAll('.js-s-reviews-slider'));

export default function SReviewsSlider () {
  itIsMobile = detectDevice();

  createAllSwipers();

  window.addEventListener('resize', resizeHandler);
}

function resizeHandler () {
  window.clearTimeout(resizeTimer);
  window.setTimeout(checkDeviceWidth,100);
}

function checkDeviceWidth () {
  let newItIsMobile = detectDevice();
  if (itIsMobile === newItIsMobile) return;

  itIsMobile = newItIsMobile;
  
  destroyAllSwipers();

  window.setTimeout(createAllSwipers,2000);
}

function detectDevice () {
  return window.matchMedia('(max-width: 767px)').matches;
}

function destroyAllSwipers () {
  instances.forEach(swiper => {
    swiper.destroy();
  });
  instances.length = 0;
}

function createAllSwipers () {
  elements.forEach(element => {
    const container = element.querySelector('.swiper-container');

    instances.push(createSwiper(container, element));
  });
}

function createSwiper (container, element) {
  return itIsMobile ? createSwiperMobile(container, element) : createSwiperDesktop(container, element);
}

function createSwiperMobile (container, element) {
  return new Swiper(container, {
    updateOnWindowResize: true,
    speed: 700,
    loop: true,
    loopedSlides: 3,
    watchSlidesVisibility: true,
    slidesPerView: 'auto'
  });
}

function createSwiperDesktop (container, element) {
  return new Swiper(container, {
    updateOnWindowResize: true,
    speed: 700,
    loop: true,
    loopedSlides: 3,
    
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    navigation: {
      nextEl: element.querySelector('.slider__nav-button--next'),
      prevEl: element.querySelector('.slider__nav-button--prev'),
    },
  });
}