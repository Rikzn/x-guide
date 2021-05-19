import { lockScroll, unlockScroll } from "./scrollBlocker";

export default function VideoModal () {
  
  const Modal = document.querySelector('.video-modal');
  if (!Modal)
    return;
  const Iframe = Modal.querySelector('.video-modal__iframe');
  const Cover = document.querySelector('.video-modal__cover');
  const CoverImg = Cover.querySelector('.video-modal__cover-img');
  const Links = document.querySelectorAll('.js-video-modal-button');
  let modalIsOpen = false,
      Player,
      currentVideoId;


  Links.forEach(link => {
    link.addEventListener('click', toggleModal);
  });
  Cover.addEventListener('click', play);


  function toggleModal (e) {
    e.preventDefault();
  console.log('toggleModal');
  
    if (!Player)
      return;
  
    modalIsOpen = !modalIsOpen;
  
    document.documentElement.classList.toggle('video-modal-open');
  
    modalIsOpen
      ? openModal(e)
      : closeModal(e);
  }
  
  function openModal (e) {
    let videoId = e.currentTarget.dataset.videoId || 'XfjS6_xO0uI';
    
    console.log(Player);
    let coverImgSrc = e.currentTarget.dataset.videoImgSrc || './img/gallery__item-2.jpg';
  
  
    CoverImg.setAttribute('src', coverImgSrc);
    
    if (videoId !== currentVideoId) {
      displayCover();
      Player.loadVideoById ? Player.loadVideoById(videoId) : void 0;
      Player.stopVideo ? Player.stopVideo() : void 0;
    }
    
    lockScroll(Modal);
  
    currentVideoId = videoId;
  }
  
  function closeModal (e) {
    unlockScroll(Modal);
    Player.pauseVideo ? Player.pauseVideo() : void 0;
  }
  
  function play () {
    hideCover();
    typeof Player.playVideo === "function" && Player.playVideo();
  }
  
  function hideCover () {
    Modal.classList.add('play');
  }
  function displayCover () {
    Modal.classList.remove('play');
  }
  

  function onYouTubeIframeAPIReady () {
    console.log('onYouTubeIframeAPIReady');
    Player = new YT.Player('player', {
      // videoId: 'XfjS6_xO0uI',
      playerVars: {
        'autoplay': 0,
        'modestbranding': 1,
        'rel': 0,
        'showinfo': 0,
      },
    });
  }

  if (!Player && typeof YT !== 'undefined' && typeof YT.Player === 'function') {
    return onYouTubeIframeAPIReady();
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}