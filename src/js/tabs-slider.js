import Swiper from 'swiper';

export default function TabsSlider () {
  /*tabs nav slider*/
  const TabsSliders = document.querySelectorAll('.js-tabs-slider');

  TabsSliders.forEach(TabsSlider => {
    const TabsSliderContainer = TabsSlider.querySelector('.swiper-container');
    const PrevButton = TabsSlider.querySelector('.slider__nav-button--prev');
    const NextButton = TabsSlider.querySelector('.slider__nav-button--next');

    let tabsNavSwiper = new Swiper(TabsSliderContainer, {
      speed: 400,
      slidesPerView: 'auto',
      watchOverflow: true,
      watchSlidesProgress: true,
      updateOnWindowResize: true,
      navigation: {
        nextEl: NextButton,
        prevEl: PrevButton,
      },
    });
  });
}