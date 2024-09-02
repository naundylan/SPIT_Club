document.addEventListener("DOMContentLoaded", function () {
  function addAnimationClass() {
    const elements = document.querySelectorAll(".main-activities .box-wrapper");

    elements.forEach(function (element, index) {
      const boxContent = element.querySelector('.activities-box .box-content');
      const boxImage = element.querySelector('.activities-box .box-image img');

      const isOdd = (index + 1) % 2 !== 0;

      if (window.innerWidth < 767.98 && window.innerWidth > 575.98) {
        element.classList.remove("animate__fadeInRightBig", "animate__fadeInLeftBig");
        element.classList.add("animate__animated", "animate__fadeInUpBig");
      } else if (window.innerWidth <= 575.98) {
        element.classList.remove("animate__fadeInRightBig", "animate__fadeInLeftBig", "animate__fadeInUpBig");

        if (boxContent) {
          boxContent.classList.remove("animate__fadeInLeftBig", "animate__fadeInRightBig");
          boxContent.classList.add(isOdd ? "animate__fadeInLeftBig" : "animate__fadeInRightBig");
        }
        if (boxImage) {
          boxImage.classList.remove("animate__fadeInLeftBig", "animate__fadeInRightBig");
          boxImage.classList.add(isOdd ? "animate__fadeInRightBig" : "animate__fadeInLeftBig");
        }
      } else {
        element.classList.remove("animate__fadeInUpBig");

        if (boxContent) {
          boxContent.classList.remove("animate__animated", "animate__fadeInLeftBig", "animate__fadeInRightBig");
        }
        if (boxImage) {
          boxImage.classList.remove("animate__animated", "animate__fadeInLeftBig", "animate__fadeInRightBig");
        }
      }
    });
  }

  addAnimationClass();
  window.addEventListener("resize", addAnimationClass);
});