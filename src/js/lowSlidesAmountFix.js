export default function lowSlidesAmountFix(swiperSlides, minWidth) {
    if (!window.matchMedia(`(min-width: ${minWidth}px)`).matches) return;

    const container = document.querySelector('.container');
    if (!container) return;

    const containerWidth = container.offsetWidth;
    if (swiperSlides.length) {
        const slidesTotalLength = swiperSlides.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.offsetWidth;
        }, 0);

        const timesToDuplicate = Math.ceil(containerWidth / slidesTotalLength);

        if (timesToDuplicate > 1) {
            // console.log('Slides total length', slidesTotalLength);
            // console.log('Container width', containerWidth);
            // console.log('Times to duplicate', timesToDuplicate);

            for (let i = 0; i < timesToDuplicate; i++) {
                // console.log('Running loop');
                swiperSlides.forEach(slide => {
                    slide.parentElement.appendChild(slide.cloneNode(true));
                });
            }
        } 
    }
}