import { Swiper, Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
Swiper.use([Autoplay, Navigation, EffectFade, Pagination]);

let itIsMobile,
    resizeTimer;
const instances = [];
const elements = Array.from(document.querySelectorAll('.js-blog-slider-items'));

export default function ReviewsSlider () {
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
  return itIsMobile ? destroyAllSwipers() : createSwiperDesktop(container, element);
}

function createSwiperDesktop (container, element) {
  let settings = {
    updateOnWindowResize: true,
    speed: 700,
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    watchOverflow: true,
    navigation: {
      nextEl: element.querySelector('.slider__nav-button--next'),
      prevEl: element.querySelector('.slider__nav-button--prev'),
    }
  };

  return new Swiper(container, settings);
}