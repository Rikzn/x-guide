import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const introTimeline = gsap.timeline();
const Header = document.querySelector('.page-header');
const Nav = Header && Header.querySelector('.page-header__nav');
const MainSlider = Header && Header.querySelector('.hero__main-slider');
const FirstSlide = MainSlider && MainSlider.querySelector('.swiper-slide');
const SlideLink = FirstSlide && FirstSlide.querySelector('.hero__main-slider-item-link');
const ThumbsSlider = Header && Header.querySelector('.hero__thumbs-slider');  
const SearchToursForm = document.querySelector('.search-tours-form__accordion');


function init () {
  if (!Header) {
    if (window.matchMedia("(max-width: 767px)").matches) {
      introTimeline.set(document.body, {autoAlpha: 1});
      return;
    }
    
    introTimeline.to(document.body, {autoAlpha: 1, duration: 1});
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    introTimeline
    .set(
      document.body,
      { autoAlpha: 1},
    );

    SearchToursForm &&
    introTimeline
    .set(
      SearchToursForm,
      { opacity: 1},
    );
    return;
  }

  introTimeline
  .call(()=>{
    FirstSlide && FirstSlide.classList.add('slide--visible');
  })
  .to(
    document.body,
    { autoAlpha: 1,
      duration: 1 },
  )
  .fromTo(
    Nav,
    { autoAlpha: 0 },
    { autoAlpha: 1,
      duration: 1, },
    0.5
  );

  SlideLink &&
  introTimeline
  .fromTo(
    SlideLink,
    { autoAlpha: 0 },
    { autoAlpha: 1,
      duration: 1, },
      0.5
  );

  ThumbsSlider &&
  introTimeline
  .fromTo(
    ThumbsSlider,
    { autoAlpha: 0 },
    { autoAlpha: 1,
      duration: 1 },
  );

  SearchToursForm &&
  introTimeline
  .fromTo(
    SearchToursForm,
    { opacity: 0 },
    { opacity: 1,
      duration: 0.25 },
  )
  .fromTo(
    SearchToursForm,
    { yPercent: 0 },
    { yPercent: -50,
      duration: 1 },
    '<',
  );

  introTimeline
  .call(()=>{
    FirstSlide && FirstSlide.classList.remove('slide--visible');
  });
}

export default {
  init,
};