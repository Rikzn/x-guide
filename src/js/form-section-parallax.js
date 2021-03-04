import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FormBGParallax () {

  const formSectionBg = document.querySelector('.form-section__bg');

  if (!formSectionBg)
    return;

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function() {
      let tl = gsap.timeline({scrollTrigger: {
        trigger: '.form-section',
        start: 'top 100%',
        end: 'top 40%',
        scrub: 1,
      }});
      tl.fromTo(
        formSectionBg,
        { yPercent: 50 },
        { yPercent: 0 },
      );
    },
  });
}