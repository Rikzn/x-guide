import Swiper from 'swiper';

export default {
  init,
  destroy
};

function destroy() {
  instances.forEach(instance => instance.slider.destroy());
  instances = [];
}

function init() {
  const toursSliders = document.querySelector('.js-tours-slider');

  const prev = toursSliders.querySelector('.slider__nav-button--prev');
  const next = toursSliders.querySelector('.slider__nav-button--next');
  const container = toursSliders.querySelector('.swiper-container');

  const slider = new Swiper(container, {
    //loop: true,
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    speed: 700,
    //centeredSlides: true,
    //loopedSlides: 10,
    spaceBetween: 20,
    watchOverflow: true,
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    on: {
      progress: function(swiper, progress) {
        debugger

        let slides = swiper.slides,
          activeSlide;

        slides.forEach((slide) =>{
          slide.classList.remove('active');
          if (slide.progress > 0) {
            slide.classList.add('hidden');
          } else {
            slide.classList.remove('hidden');
            if (!activeSlide) {
              activeSlide = slide;
            }
          }
        });

        activeSlide.classList.add('active');
        activeSlide = null;
      },
      setTranslate: function(swiper, translate) {
        //debugger
      },
    }
  });

  window.MySlider = slider;

  
}