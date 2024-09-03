const closePopsUp = document.querySelector(".inner-close");
const openPopsUp = document.querySelector(".inner-play");
const videoPopsUp = document.querySelector(".video-popsup");
const video = document.querySelector(".video-popsup video");
const videoHeader = document.querySelector(".header .header-video video");
const imageHeader = document.querySelector(".header .header-video img");

openPopsUp.addEventListener("click", () => {
    openPopsUp.style.display = "none";
    videoHeader.style.display = "none";
    videoHeader.pause();
    videoPopsUp.style.display = "flex";
    video.play();
    imageHeader.style.display = "block";
});

closePopsUp.addEventListener("click", () => {
    openPopsUp.style.display = "flex";
    videoHeader.style.display = "block"
    imageHeader.style.display = "none";
    videoPopsUp.style.display = "none";
    video.pause();
    videoHeader.play();
});