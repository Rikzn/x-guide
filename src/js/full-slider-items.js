import { Swiper, Autoplay, Navigation, EffectFade, Pagination } from 'swiper';
import lowSlidesAmountFix from './lowSlidesAmountFix';
Swiper.use([Autoplay, Navigation, EffectFade, Pagination]);

const elements = Array.from(document.querySelectorAll('.js-full-small-slider'));

export default function fullSmallSlider() {
    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const swiperSlides = Array.from(element.querySelectorAll('.swiper-slide'));

        lowSlidesAmountFix(swiperSlides, 768);

        const options = {
            spaceBetween: 10,
            watchOverflow: true,
            slidesPerView: 'auto',
            loop: true,
            loopedSlides: 6,
            centeredSlides: true,
            loopAdditionalSlides: 6,
            breakpoints: {
                768: {
                    spaceBetween: 20
                }
            }
        };

        if (window.matchMedia('(min-width: 768px)').matches) {
            options.speed = 3500;
            options.autoplay = {
                delay: 0,
                disableOnInteraction: true
            };

            element.classList.add('slider-with-autoplay');
        }
        const slider = new Swiper(container, options);

        if (window.matchMedia('(min-width: 768px)').matches) {
            element.addEventListener('mouseenter', () => {
                slider.autoplay.stop();
                console.log('Autoplay stopped');
            });
            element.addEventListener('mouseleave', () => {
                slider.autoplay.start();
                console.log('Autoplay started');
            });
        }
    });
}

// export default function FullSliderItems() {
//     let speed = 700;

//     itIsMobile = detectDevice();
//     createAllSwipers();

//     window.addEventListener('resize', resizeHandler);
// }

// function resizeHandler() {
//     window.clearTimeout(resizeTimer);
//     window.setTimeout(checkDeviceWidth, 100);
// }

// function checkDeviceWidth() {
//     let newItIsMobile = detectDevice();

//     if (itIsMobile === newItIsMobile) return;

//     itIsMobile = newItIsMobile;

//     destroyAllSwipers();
//     window.setTimeout(createAllSwipers, 2000);
// }

// function detectDevice() {
//     return window.matchMedia('(max-width: 767px)').matches;
// }

// function destroyAllSwipers() {
//     instances.forEach(swiper => {
//         swiper.destroy();
//     });

//     instances.length = 0;
// }

// function createAllSwipers() {
//     elements.forEach(element => {
//         const container = element.querySelector('.swiper-container');

//         instances.push(createSwiper(container, element));
//     });
// }

// function createSwiper(container, element) {
//     return itIsMobile ? createSwiperMobile(container, element) : createSwiperDesktop(container, element);
// }

// function createSwiperMobile(container, element) {
//     let slider;

//     slider = new Swiper(container, {
//         updateOnWindowResize: true,
//         spaceBetween: 10,
//         centeredSlides: true,
//         loop: true,
//         slidesPerView: 'auto',
//         grabCursor: true,
//         loopedSlides: 12,
// 		loopAdditionalSlides: 6
//     });

//     return slider;
// }

// function createSwiperDesktop(container, element) {
//     const wrapper = element.querySelector('.swiper-wrapper');

//     const slider = new Swiper(container, {
//         updateOnWindowResize: true,
//         spaceBetween: 20,
//         centeredSlides: true,
//         loopedSlides : 24,
//         loopAdditionalSlides: 12,
//         loop: true,
//         slidesPerView: 'auto',
//         grabCursor: true
//     });

//     if (window.matchMedia(`(max-width: ${767}px)`).matches) return;

// }
