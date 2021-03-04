import { Swiper, Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
Swiper.use([Autoplay, Navigation, EffectFade, Pagination]);
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


let itIsMobile, resizeTimer;
const instances = [];
const elements = Array.from(document.querySelectorAll('.js-full-small-slider'));

export default function FullSliderItems () {
  let speed = 700;
  
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
  let slider;

  slider = new Swiper(container, {
    updateOnWindowResize: true,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
   	slidesPerView: 'auto',
   	grabCursor: true
  });

  return slider;
}

function createSwiperDesktop (container, element) {
  const wrapper = element.querySelector('.swiper-wrapper');

  const slider = new Swiper(container, {
    updateOnWindowResize: true,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
   	slidesPerView: 'auto',
   	grabCursor: true
  });

  if (window.matchMedia(`(max-width: ${767}px)`).matches) return;
	
	let autoplayIsEnabled = false,
	    timer = 0;

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

	  slider.params.speed = 700;
	  slider.params.allowTouchMove = true;

	  wrapper.classList.remove('swiper-wrapper--autoplay');
	  slider.autoplay.stop();
	  slider.update(true);

	  autoplayIsEnabled = false;
	}

  return slider;
}