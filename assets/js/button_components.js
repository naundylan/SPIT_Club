window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentHeight = document.documentElement.scrollHeight;
    var windowHeight = window.innerHeight;
    var middleOfPage = (documentHeight - windowHeight) / 2;

    if (scrollTop >= middleOfPage) {
        // Hiển thị nút "Cuộn lên" khi cuộn qua giữa trang
        document.getElementById("bottomButton").style.display = "none";
        document.getElementById("topButton").style.display = "flex";
    } else {
        // Hiển thị nút "Cuộn xuống" khi chưa đến giữa trang
        document.getElementById("bottomButton").style.display = "flex";
        document.getElementById("topButton").style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function bottomFunction() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
}