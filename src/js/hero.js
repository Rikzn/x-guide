import { Swiper, Autoplay, Navigation, EffectFade, Thumbs, Controller } from 'swiper';
Swiper.use([Autoplay, Navigation, EffectFade, Thumbs, Controller]);

import gsap from 'gsap';

export default function Hero() {
    const elements = Array.from(document.querySelectorAll('.js-hero-slider'));

    elements.forEach(element => {
        let speed = 700;
        const progressBullets = Array.from(element.querySelectorAll('.hero__thumbs-slider-item'));
        const bgSliderContainer = element.querySelector('.js-hero-bg-slider');

        const bgSlider = new Swiper(bgSliderContainer.querySelector('.swiper-container'), {
            updateOnWindowResize: true,
            speed: speed,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });

        const thumbsSliderContainer = element.querySelector('.js-hero-thumbs-slider .swiper-container');

        const thumbsSlider = new Swiper(thumbsSliderContainer, {
            updateOnWindowResize: true,
            speed: speed,
            slidesPerView: 5,
            spaceBetween: 6,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            threshold: 10,
            breakpoints: {
                577: {
                    slidesPerView: 'auto',
                    spaceBetween: 0
                }
            }
        });

        const mainSliderContainer = element.querySelector('.js-hero-main-slider');

        const mainSlider = new Swiper(mainSliderContainer.querySelector('.swiper-container'), {
            updateOnWindowResize: true,
            speed: speed,
            thumbs: {
                swiper: thumbsSlider
            },

            controller: {
                control: bgSlider
            },
            on: {
                slideChange: swiper => {
                    autoplay(swiper.realIndex);
                }
            }
        });

        function autoplay(startIndex) {
            progressBullets.forEach(bullet => {
                gsap.set(bullet, {
                    '--slider-progress': 0
                });
                gsap.killTweensOf(bullet);
            });

            if (window.matchMedia('(max-width: 576px)').matches) {
                progressBullets.forEach((bullet, bulletIndex) => {
                    if (bulletIndex < startIndex) {
                        gsap.set(bullet, {
                            '--slider-progress': 1
                        });
                    }
                });
            }

            gsap.fromTo(
                progressBullets[startIndex],
                { '--slider-progress': 0 },
                {
                    '--slider-progress': 1,
                    duration: 5,
                    ease: 'linear',
                    onComplete: () => {
                        if (progressBullets[startIndex + 1]) {
                            mainSlider.slideNext();
                        } else {
                            mainSlider.slideTo(0);
                        }
                    }
                }
            );
        }

        autoplay(0);
    });
}
