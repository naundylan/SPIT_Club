document.addEventListener("DOMContentLoaded", function () {
    var autoLoad;

    function startAutoLoad() {
        if (autoLoad) {
            clearInterval(autoLoad);
        }

        autoLoad = setInterval(function () {
            var currentSlide = document.querySelector('.slide.active');
            if (!currentSlide) return;

            var nextSlide = currentSlide.nextElementSibling;
            var positionNow = Array.from(document.querySelectorAll('.slide-button ul li')).indexOf(document.querySelector('.button-active')) + 1;

            if (nextSlide) {
                currentSlide.classList.add('out-left');
                currentSlide.addEventListener('animationend', function () {
                    currentSlide.classList.remove('out-left', 'active');
                }, { once: true });

                nextSlide.classList.add('active', 'in-right');
                nextSlide.addEventListener('animationend', function () {
                    nextSlide.classList.remove('in-right');
                }, { once: true });

                document.querySelectorAll('.slide-button ul li').forEach(function (li) {
                    li.classList.remove('button-active');
                });
                var nextButton = document.querySelector('.slide-button ul li:nth-child(' + (positionNow + 1) + ')');
                if (nextButton) {
                    nextButton.classList.add('button-active');
                }
            } else {
                currentSlide.classList.add('out-left');
                currentSlide.addEventListener('animationend', function () {
                    currentSlide.classList.remove('out-left', 'active');
                }, { once: true });

                var firstSlide = document.querySelector('.slide:first-child');
                if (firstSlide) {
                    firstSlide.classList.add('active', 'in-right');
                    firstSlide.addEventListener('animationend', function () {
                        firstSlide.classList.remove('in-right');
                    }, { once: true });
                }

                document.querySelectorAll('.slide-button ul li').forEach(function (li) {
                    li.classList.remove('button-active');
                });
                var firstButton = document.querySelector('.slide-button ul li:first-child');
                if (firstButton) {
                    firstButton.classList.add('button-active');
                }
            }
        }, 3000);
    }

    function resetAutoLoad() {
        clearInterval(autoLoad);
        setTimeout(startAutoLoad, 7000);
    }

    function handleNextClick(event) {
        resetAutoLoad();
        var currentSlide = document.querySelector('.slide.active');
        if (!currentSlide) return;
        var nextSlide = currentSlide.nextElementSibling;
        var positionNow = Array.from(document.querySelectorAll('.slide-button ul li')).indexOf(document.querySelector('.button-active')) + 1;

        if (nextSlide) {
            currentSlide.classList.add('out-left');
            currentSlide.addEventListener('animationend', function () {
                currentSlide.classList.remove('out-left', 'active');
            }, { once: true });

            nextSlide.classList.add('active', 'in-right');
            nextSlide.addEventListener('animationend', function () {
                nextSlide.classList.remove('in-right');
            }, { once: true });

            document.querySelectorAll('.slide-button ul li').forEach(function (li) {
                li.classList.remove('button-active');
            });
            var nextButton = document.querySelector('.slide-button ul li:nth-child(' + (positionNow + 1) + ')');
            if (nextButton) {
                nextButton.classList.add('button-active');
            }
        } else {
            currentSlide.classList.add('out-left');
            currentSlide.addEventListener('animationend', function () {
                currentSlide.classList.remove('out-left', 'active');
            }, { once: true });

            var firstSlide = document.querySelector('.slide:first-child');
            if (firstSlide) {
                firstSlide.classList.add('active', 'in-right');
                firstSlide.addEventListener('animationend', function () {
                    firstSlide.classList.remove('in-right');
                }, { once: true });
            }

            document.querySelectorAll('.slide-button ul li').forEach(function (li) {
                li.classList.remove('button-active');
            });
            var firstButton = document.querySelector('.slide-button ul li:first-child');
            if (firstButton) {
                firstButton.classList.add('button-active');
            }
        }
    }

    function handlePreviousClick(event) {
        resetAutoLoad();
        var currentSlide = document.querySelector('.slide.active');
        if (!currentSlide) return;
        var previousSlide = currentSlide.previousElementSibling;
        var positionNow = Array.from(document.querySelectorAll('.slide-button ul li')).indexOf(document.querySelector('.button-active')) + 1;

        if (previousSlide) {
            currentSlide.classList.add('out-right');
            currentSlide.addEventListener('animationend', function () {
                currentSlide.classList.remove('out-right', 'active');
            }, { once: true });

            previousSlide.classList.add('active', 'in-left');
            previousSlide.addEventListener('animationend', function () {
                previousSlide.classList.remove('in-left');
            }, { once: true });

            document.querySelectorAll('.slide-button ul li').forEach(function (li) {
                li.classList.remove('button-active');
            });
            var previousButton = document.querySelector('.slide-button ul li:nth-child(' + (positionNow - 1) + ')');
            if (previousButton) {
                previousButton.classList.add('button-active');
            }
        } else {
            currentSlide.classList.add('out-right');
            currentSlide.addEventListener('animationend', function () {
                currentSlide.classList.remove('out-right', 'active');
            }, { once: true });

            var lastSlide = document.querySelector('.slide:last-child');
            if (lastSlide) {
                lastSlide.classList.add('active', 'in-left');
                lastSlide.addEventListener('animationend', function () {
                    lastSlide.classList.remove('in-left');
                }, { once: true });
            }

            document.querySelectorAll('.slide-button ul li').forEach(function (li) {
                li.classList.remove('button-active');
            });
            var lastButton = document.querySelector('.slide-button ul li:last-child');
            if (lastButton) {
                lastButton.classList.add('button-active');
            }
        }
    }

    function handleButtonClick(event) {
        resetAutoLoad();
        var positionNow = Array.from(document.querySelectorAll('.slide-button ul li')).indexOf(document.querySelector('.button-active')) + 1;
        var positionClick = Array.from(document.querySelectorAll('.slide-button ul li')).indexOf(event.target) + 1;

        document.querySelectorAll('.slide-button ul li').forEach(function (li) {
            li.classList.remove('button-active');
        });
        event.target.classList.add('button-active');

        var currentSlide = document.querySelector('.slide.active');
        if (!currentSlide) return;
        var clickedSlide = document.querySelector('.slide:nth-child(' + positionClick + ')');
        if (!clickedSlide) return;

        if (positionClick > positionNow) {
            currentSlide.classList.add('out-left');
            currentSlide.addEventListener('animationend', function () {
                currentSlide.classList.remove('out-left', 'active');
            }, { once: true });

            clickedSlide.classList.add('active', 'in-right');
            clickedSlide.addEventListener('animationend', function () {
                clickedSlide.classList.remove('in-right');
            }, { once: true });
        } else if (positionClick < positionNow) {
            currentSlide.classList.add('out-right');
            currentSlide.addEventListener('animationend', function () {
                currentSlide.classList.remove('out-right', 'active');
            }, { once: true });

            clickedSlide.classList.add('active', 'in-left');
            clickedSlide.addEventListener('animationend', function () {
                clickedSlide.classList.remove('in-left');
            }, { once: true });
        }
    }

    startAutoLoad();

    var nextButton = document.getElementById('next');
    if (nextButton) {
        nextButton.addEventListener('click', handleNextClick);
    }

    var previousButton = document.getElementById('previous');
    if (previousButton) {
        previousButton.addEventListener('click', handlePreviousClick);
    }

    document.querySelectorAll('.slide-button ul li').forEach(function (li) {
        li.addEventListener('click', handleButtonClick);
    });
});