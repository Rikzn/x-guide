import { Swiper } from 'swiper';

let itIsMobile,
    resizeTimer;
const instances = [];
const elements = Array.from(document.querySelectorAll('.js-gallery-slider'));

export default function GallerySlider () {
  itIsMobile = detectDevice();

  createAllSwipers();

  window.addEventListener('resize', resizeHandler);
}

function detectDevice () {
  return window.matchMedia('(max-width: 767px)').matches;
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

  //window.setTimeout(createAllSwipers,0);
  window.requestAnimationFrame(()=>{
    window.requestAnimationFrame(createAllSwipers);
  });
}

function destroyAllSwipers () {
  instances.forEach(swiper => {
    swiper.destroy();
  });
  instances.length = 0;
}

function createAllSwipers () {
  if (!itIsMobile) 
    return;
    console.log(Date.now());
  elements.forEach(element => {
    const container = element.querySelector('.swiper-container');

    instances.push(createSwiperMobile(container, element));
  });
}

function createSwiperMobile (container, element) {
  return new Swiper(container, {
    updateOnWindowResize: true,
    speed: 700,
    slidesPerView: 'auto',
  });
}