document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper.images", {
        effect: "cards",
        grabCursor: true,
        loop: true,
        rotate: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        mousewheel: {
            invert: false,
        }
    });
});