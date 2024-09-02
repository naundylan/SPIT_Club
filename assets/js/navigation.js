window.addEventListener('scroll', function () {
    var menu = document.querySelector('.menu');
    var menuWrapper = document.querySelector('.menu-wrapper');
    var menuHeight = menuWrapper.offsetHeight;
    var scrollPosition = window.scrollY || window.pageYOffset;
    var navigation = document.getElementById("navigation");

    if (scrollPosition > menuHeight) {
        if (!navigation.classList.contains("show")) {
            menu.classList.add('fixed');
        } else {
            menu.classList.remove('fixed');
        }
    } else {
        menu.classList.remove('fixed');
    }
});

document.getElementById("showNavigation").addEventListener("click", function () {
    var navigation = document.getElementById("navigation");
    var overlay = document.getElementById("navigationOverlay");

    if (!navigation.classList.contains("show")) {
        navigation.classList.add("show");
        overlay.classList.add("show");

        document.getElementById("bottomButton").style.visibility = "hidden";
        document.getElementById("bottomButton").style.opacity = "0";
        document.getElementById("topButton").style.visibility = "hidden";
        document.getElementById("topButton").style.opacity = "0";

        document.getElementById("showNavigation").classList.add("hide");
        document.getElementById("menuLogo").classList.add("hide");

        navigation.classList.remove("swipeOutRight");
        navigation.classList.add("swipeInRight");

        overlay.classList.remove("hide");
        overlay.classList.add("show");

        document.querySelector('.menu').classList.remove('fixed');
    }
});

document.getElementById("hideNavigation").addEventListener("click", function () {
    var navigation = document.getElementById("navigation");
    var overlay = document.getElementById("navigationOverlay");

    if (navigation.classList.contains("show")) {
        navigation.classList.remove("swipeInRight");
        navigation.classList.add("swipeOutRight");
        overlay.classList.add("hide");

        document.getElementById("bottomButton").style.visibility = "visible";
        document.getElementById("bottomButton").style.opacity = "1";
        document.getElementById("topButton").style.visibility = "visible";
        document.getElementById("topButton").style.opacity = "1";

        document.getElementById("showNavigation").classList.remove("hide");
        document.getElementById("menuLogo").classList.remove("hide");

        setTimeout(function () {
            navigation.classList.remove("show");
            overlay.classList.remove("show");

            var scrollPosition = window.scrollY || window.pageYOffset;
            var menuWrapper = document.querySelector('.menu-wrapper');
            var menuHeight = menuWrapper.offsetHeight;

            if (scrollPosition > menuHeight) {
                document.querySelector('.menu').classList.add('fixed');
            }
        }, 500);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.navigation-item');

    navItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const targetUrl = this.getAttribute('href');

            this.classList.add('hovered');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
});

