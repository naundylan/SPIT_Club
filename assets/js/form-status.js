document.addEventListener("DOMContentLoaded", function () {
    var closeCannnotGetForm = document.querySelectorAll("#closeCannotGetForm");
    var cannotGetFormWrapper = document.querySelector(".cannot-getform-wrapper");
    var cannotGetForm = document.querySelector(".cannot-getform");

    closeCannnotGetForm.forEach(closeButton => {
        closeButton.addEventListener('click', function () {
            if (cannotGetFormWrapper.style.display !== 'none') {
                // Áp dụng hiệu ứng flipOutX khi đóng
                cannotGetForm.classList.add('myflipOutX');

                // Đặt thời gian chờ cho hiệu ứng chạy xong trước khi ẩn đi
                setTimeout(function () {
                    cannotGetFormWrapper.style.display = 'none';
                    // Xóa lớp flipOutX để có thể tái sử dụng lần sau
                    cannotGetForm.classList.remove('myflipOutX');
                }, 500); // 1000ms khớp với thời gian của hiệu ứng flipOutX
            }
        });
    });
});

