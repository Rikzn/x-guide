import Masonry from 'masonry-layout';

let itIsMobile, resizeTimer;

const instances = [];
const elements = Array.from(document.querySelectorAll('.js-masonry'));

export default function AlbumsGriid () {
  itIsMobile = detectDevice();
  createGrids();
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
  destroyGrids();
  window.setTimeout(createAllSwipers,2000);
}

function detectDevice () {
  return window.matchMedia('(max-width: 767px)').matches;
}

function createGrids () {
  elements.forEach(element => {
    const container = element.querySelector('.masonry-grid');

    instances.push(createGrid(container, element));
  });
}

function createGrid (container, element) {
  return itIsMobile ? destroyGrids() : createGridDesktop(container, element);
}

function destroyGrids () {
  instances.forEach(grid => {
  	grid.destroy();
  });

  window.photoLayoutInstance = null;

  instances.length = 0;
}

function createGridDesktop (container, element) {
  const photoLayoutInstance = new Masonry(container, {
    itemSelector: '.js-masonry-item',
    columnWidth: '.js-masonry-item-size',
    percentPosition: true,
    gutter: 20
  });

  window.photoLayoutInstance = photoLayoutInstance;
  return photoLayoutInstance;
}