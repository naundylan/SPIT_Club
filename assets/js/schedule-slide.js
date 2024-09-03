document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    swiper.el.addEventListener("click", function () {
        swiper.autoplay.stop();
        setTimeout(function () {
            swiper.autoplay.start();
        }, 5000);
    });
});