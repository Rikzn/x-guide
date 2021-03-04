import { Swiper, Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
Swiper.use([Autoplay, Navigation, EffectFade, Pagination]);

let itIsMobile, resizeTimer;
const instances = [];
const elements = Array.from(document.querySelectorAll('.js-full-slider'));

export default function FullSlider () {
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
  	swiper.main.destroy();
    swiper.small.destroy();
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
  let sliders = {
  	main: null,
  	small: null
  };

  sliders.main = new Swiper(container, {
    updateOnWindowResize: true,
    speed: 700,
    effect: 'fade',
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  sliders.small =  new Swiper(element.querySelector('.swiper-container-in'), {});
  return sliders;
}

function createSwiperDesktop (container, element) {
  let sliders = {
  	main: null,
  	small: null
  };

  sliders.main = new Swiper(container, {
    updateOnWindowResize: true,
    speed: 700,
    effect: 'fade',
    slidesPerView: 1,
    navigation: {
      nextEl: element.querySelector('.slider__nav-button--next'),
      prevEl: element.querySelector('.slider__nav-button--prev'),
    },
  });

  sliders.small =  new Swiper(element.querySelector('.swiper-container-in'), {
	  slidesPerView: 9,
    spaceBetween: 6,
    grabCursor: true
  });

  element.querySelectorAll('.article__slider-preview').forEach(item => {
  	item.addEventListener('click', function (e) {
	  let el = e.target;

	  sliders.main.slideTo(el.dataset.num);
	});
  });

  return sliders;
}