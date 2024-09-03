document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            const pathname = location.pathname.replace(/^\//, '');
            const hostname = location.hostname;
            if (pathname === this.pathname.replace(/^\//, '') && hostname === this.hostname) {
                let target = null;

                if (this.hash) {
                    target = document.querySelector(this.hash);
                    target = target || document.querySelector('[name=' + this.hash.slice(1) + ']');
                }

                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
