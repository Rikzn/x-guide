import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTextFadeout () {
  const AboutDescriptionContainer = document.querySelector('.about__description-container');

  if (!AboutDescriptionContainer)
    return;
  
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function() {
      let tl = gsap.timeline({scrollTrigger: {
        trigger: AboutDescriptionContainer,
        start: 'top 80%',
      }});

      tl.to('.about__header',
      { autoAlpha: 1,
        duration: 0.25 })
      .to(['.about__text', '.about__link'],
      { autoAlpha: 1,
        duration: 2, },);
    },
  });
}