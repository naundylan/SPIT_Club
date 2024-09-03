// Hàm để hiển thị alert và bắt đầu tất cả các thanh tiến trình
function showAlert(alertElement) {
    // Vô hiệu hóa tất cả các nút mở alert
    document.querySelectorAll('.alert-trigger').forEach(trigger => {
        trigger.classList.add('disabled'); // Thêm lớp 'disabled' để vô hiệu hóa
    });

    // Đảm bảo alert được hiển thị với hiệu ứng vào
    alertElement.classList.remove('mybounceOutRight'); // Xóa hiệu ứng ra nếu có
    alertElement.classList.add('mybounceInRight'); // Thêm hiệu ứng vào
    alertElement.classList.add('active');

    // Đợi một chút để trình duyệt áp dụng class 'active'
        // Chọn tất cả các thanh tiến trình trong alert này
        const progressBars = alertElement.querySelectorAll('.progress-bar');

        // Reset width và transition trước khi bắt đầu
        progressBars.forEach(progressBar => {
            progressBar.style.transition = 'none'; // Tắt transition
            progressBar.style.width = '100%'; // Đặt lại thanh tiến trình về 100%
        });

        // Bắt đầu chạy thanh tiến trình
        setTimeout(() => {
            progressBars.forEach(progressBar => {
                progressBar.style.transition = 'width 3s linear'; // Thêm transition để thanh tiến trình mượt mà
                progressBar.style.width = '0%'; // Thanh tiến trình chạy từ 100% về 0%
            });

            // Sau khi thanh tiến trình kết thúc, ẩn alert
            setTimeout(() => {
                hideAlert(alertElement);
            }, 3000); // Ẩn sau 3 giây, trùng với thời gian thanh tiến trình
        }, 10); // Đảm bảo trình duyệt nhận biết width = 100% trước khi transition
}

// Hàm để ẩn alert
function hideAlert(alertElement) {
    alertElement.classList.remove('mybounceInRight'); // Xóa hiệu ứng vào
    alertElement.classList.add('mybounceOutRight'); // Thêm hiệu ứng ra

    // Xóa lớp 'active' và hiệu ứng ra sau khi hoàn tất
    setTimeout(() => {
        alertElement.classList.remove('mybounceOutRight'); // Xóa hiệu ứng ra sau khi hoàn tất
        alertElement.classList.remove('active');
        setTimeout(() => {
            document.querySelectorAll('.alert-trigger').forEach(trigger => {
                trigger.classList.remove('disabled'); // Xóa lớp 'disabled' để kích hoạt lại
            });
        }, 1000);
    }, 1000); // Thời gian hiệu ứng ra

}

function resetProgressBars(progressBars) {
    progressBars.forEach(progressBar => {
        progressBar.style.transition = 'width 1s linear'; // Thêm transition để thanh tiến trình mượt mà
        progressBar.style.width = '100%'; // Đặt lại thanh tiến trình về 100%
    });
}

// Đóng alert khi nhấn vào nút đóng
document.querySelectorAll('.alert-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        const alertElement = this.parentElement;
        hideAlert(alertElement);

        // Reset các progress bars trong alert
        const progressBars = alertElement.querySelectorAll('.progress-bar');
        resetProgressBars(progressBars);
    });
});