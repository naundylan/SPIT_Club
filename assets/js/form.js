document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    allowTouchMove: false,
    spaceBetween: 1500,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var form = document.getElementById('formWrapper');

  // Lấy tất cả các nút mở form
  var openFormButtons = document.querySelectorAll('#openForm');

  // Lấy nội dung thời gian từ phần tử HTML
  var dateTimeElement = document.getElementById('dateTime');
  var dateText = dateTimeElement.innerText; // Lấy nội dung văn bản từ <p>

  // Phân tích nội dung để lấy ngày bắt đầu và kết thúc
  var matches = dateText.match(/(\d{2}\/\d{2}\/\d{4}) - (\d{2}\/\d{2}\/\d{4})/);

  if (matches) {
    var startDateStr = matches[1];
    var endDateStr = matches[2];

    // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
    var startDate = new Date(startDateStr.split('/').reverse().join('-')); // Chuyển đổi từ dd/mm/yyyy sang yyyy-mm-dd
    var endDate = new Date(endDateStr.split('/').reverse().join('-')); // Chuyển đổi từ dd/mm/yyyy sang yyyy-mm-dd
    console.log(startDate)
    console.log(endDate)
    // Lấy thời gian hiện tại
    var now = new Date();

    // Thêm sự kiện click cho tất cả các nút mở form
    openFormButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (now >= startDate && now <= endDate) {
          form.classList.add('active');

          // Khởi tạo Swiper chỉ khi form được mở
          var background = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            effect: "fade",
            loop: true,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          });
        } else {
          var cannotGetFormWrapper = document.querySelector(".cannot-getform-wrapper")
          var cannotGetForm = document.querySelector(".cannot-getform")
          cannotGetFormWrapper.style.display = 'block';
          cannotGetForm.classList.add('myflipInX');
        }
      });
    });
  } else {
    console.error("Không thể phân tích thời gian từ nội dung HTML.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('#formWrapper form');

  // Lấy thông tin đã gửi trước đó từ localStorage
  let storedFormData = JSON.parse(localStorage.getItem('formData'));
  if (!Array.isArray(storedFormData)) {
    storedFormData = []; // Nếu không phải mảng, khởi tạo thành mảng rỗng
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn hành động gửi form mặc định

    var formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());

    console.log('Stored Form Data:', storedFormData);
    console.log('Current Form Data:', formObject);

    // Kiểm tra xem dữ liệu hiện tại có trùng với bất kỳ dữ liệu nào đã lưu không
    const isDuplicate = storedFormData.some(storedData =>
      JSON.stringify(storedData) === JSON.stringify(formObject)
    );

    if (isDuplicate) {
      // Hiển thị cảnh báo nếu thông tin đã được gửi trước đó
      const duplicateAlert = document.querySelector('.send-form.alert-duplicate');
      if (duplicateAlert) {
        showAlert(duplicateAlert);
        
        // Gán sự kiện click cho nút đóng bên trong cảnh báo
        const closeBtn = duplicateAlert.querySelector('.alert-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', function () {
            const alertElement = this.closest('.alert');
            if (alertElement) {
              hideAlert(alertElement);
              // Xóa timeout nếu có
              if (alertElement.dataset.timeoutId) {
                clearTimeout(alertElement.dataset.timeoutId);
                delete alertElement.dataset.timeoutId;
              }
            }
          });
        }
      }
      return;
    }

    fetch('https://formspree.io/f/mvgpyood', {  // Thay đổi URL endpoint với mã của bạn
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        const successAlert = document.querySelector('.send-form.alert-success');
        if (successAlert) {
          showAlert(successAlert);
        }

        // Lưu thông tin đã gửi vào localStorage
        storedFormData.push(formObject);
        localStorage.setItem('formData', JSON.stringify(storedFormData));

        setTimeout(() => {
          window.location.reload();
        }, 4250); // Thay đổi thời gian nếu cần
      })
      .catch((error) => {
        console.error('Error:', error);
        const failAlert = document.querySelector('.send-form.alert-fail');
        if (failAlert) {
          showAlert(failAlert);

          setTimeout(() => {
            window.location.reload();
          }, 4250); // Thay đổi thời gian nếu cần
        }
      });
  });
});