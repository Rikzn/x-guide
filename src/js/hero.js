import { Swiper, Autoplay, Navigation, EffectFade, Thumbs, Controller } from 'swiper';
Swiper.use([Autoplay, Navigation, EffectFade, Thumbs, Controller]);


export default function Hero () {
  const elements = Array.from(document.querySelectorAll('.js-hero-slider'));

  elements.forEach(element => {
    let speed = 700;

    const bgSliderContainer = element.querySelector('.js-hero-bg-slider');

    const bgSlider = new Swiper(bgSliderContainer.querySelector('.swiper-container'), {
      updateOnWindowResize: true,
      speed: speed,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });

    const thumbsSliderContainer = element.querySelector('.js-hero-thumbs-slider');

    const thumbsSlider = new Swiper(thumbsSliderContainer.querySelector('.swiper-container'), {
      updateOnWindowResize: true,
      speed: speed,
      slidesPerView: 'auto',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      Autoplay: 5000
    });
    
    const mainSliderContainer = element.querySelector('.js-hero-main-slider');

    const mainSlider = new Swiper(mainSliderContainer.querySelector('.swiper-container'), {
      updateOnWindowResize: true,
      speed: speed,
      thumbs: {
        swiper: thumbsSlider
      },
      controller: {
        control: bgSlider,
      },
    });
  });
}