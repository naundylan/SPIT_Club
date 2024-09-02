function shareOnFacebook() {
    const currentFileName = window.location.pathname.split("/").pop();

    let facebookArticleURL = '';


    if (currentFileName === '19-08-2024.html') {
        facebookArticleURL = 'https://www.facebook.com/61551553431734/posts/518275437232094/?substory_index=518275437232094&mibextid=rS40aB7S9Ucbxw6v'
    }

    if (currentFileName === '05-08-2024.html') {
        facebookArticleURL = 'https://www.facebook.com/61551553431734/posts/122154995612051781/?mibextid=rS40aB7S9Ucbxw6v'
    }

    if (currentFileName === '14-07-2024.html') {
        facebookArticleURL = 'https://www.facebook.com/61551553431734/posts/122152468202051781/?mibextid=rS40aB7S9Ucbxw6v';
    }

    if (currentFileName === '12-07-2024.html') {
        facebookArticleURL = 'https://www.facebook.com/61551553431734/posts/122152254968051781/?mibextid=rS40aB7S9Ucbxw6v';
    }

    if (facebookArticleURL) {
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(facebookArticleURL)}`;

        window.open(facebookShareURL);
    } else {
        console.log('Không tìm thấy bài viết tương ứng!');
    }
}

function sendEmail() {
    const currentFileName = window.location.pathname.split("/").pop().replace('.html', '').replaceAll('-', '/');
    const emailSubject = `Phản hồi về bài viết ${currentFileName}`;
    const emailBody = `Xin chào Club Hỗ trợ Lập Trình, Trường Đại Học Khoa Học, Đại Học Huế,\n\nTôi muốn gửi phản hồi về bài viết ${currentFileName}.\n\n[Your Content]\n\nTrân trọng,\n[Your Name]`;

    const mailtoLink = `mailto:clbhtlt.ithusc@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
}

function saveArticle() {
    const currentFileName = window.location.pathname.split("/").pop();

    // Lấy danh sách các bài viết đã lưu từ localStorage
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

    let alertElement;

    // Kiểm tra nếu bài viết đã được lưu trước đó
    if (!savedArticles.includes(currentFileName)) {
        // Thêm bài viết vào danh sách lưu trữ
        savedArticles.push(currentFileName);
        localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

        // Hiển thị alert thông báo bài viết đã được lưu
        alertElement = document.querySelector('.save-details.alert-information');
    } else {
        // Hiển thị alert thông báo bài viết đã được lưu trước đó
        alertElement = document.querySelector('.save-details.alert-warning');
    }

    // Gọi hàm showAlert để hiển thị alert tương ứng
    showAlert(alertElement);
}

function copyLinkToClipboard() {
    const url = window.location.href;

    // Sử dụng Clipboard API để sao chép đường dẫn vào clipboard
    navigator.clipboard.writeText(url)
        .then(() => {
            // Sau khi sao chép thành công, hiển thị thông báo
            const alertElement = document.querySelector('.alert.copy-details');
            showAlert(alertElement);
        })
        .catch(err => {
            console.error('Không thể sao chép đường dẫn: ', err);
            // Xử lý lỗi sao chép nếu cần
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const openSavedArticleBtns = document.querySelectorAll('.openSavedArticle');
    const savedArticleOverlay = document.querySelector('.savedarticle');
    const closeButton = document.querySelector('.savedarticle .close-button');
    const innerBody = document.querySelector('.savedarticle .inner-body');
    const noArticle = document.querySelector('.savedarticle .no-article');
    const savedArticleTitleContainer = document.querySelector('.savedartitle-container');

    // Hiển thị giao diện bài viết đã lưu khi nhấp vào biểu tượng lưu
    openSavedArticleBtns.forEach(button => {
        button.addEventListener('click', function () {
            // Hiển thị giao diện bài viết đã lưu
            savedArticleOverlay.style.display = 'flex';

            // Áp dụng hiệu ứng xuất hiện
            savedArticleTitleContainer.classList.remove('hidden');
            savedArticleTitleContainer.classList.add('visible');

            // Xóa các bài viết đã lưu trước đó (nếu có) để tránh trùng lặp
            innerBody.querySelectorAll('.saved').forEach(element => element.remove());

            // Lấy danh sách các bài viết đã lưu từ localStorage
            let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

            // Nếu không có bài viết nào được lưu, hiển thị khối no-article
            if (savedArticles.length === 0) {
                noArticle.style.display = 'flex';
            } else {
                noArticle.style.display = 'none';

                // Tạo các phần tử bài viết đã lưu
                savedArticles.forEach(fileName => {
                    const savedDiv = document.createElement('div');
                    savedDiv.className = 'saved';

                    // Tạo liên kết đến bài viết
                    const link = document.createElement('a');
                    link.href = fileName; // Liên kết đến bài viết
                    link.textContent = `Bài viết ngày ${formatDate(fileName)}`;
                    link.className = 'saved-link';

                    const trashIcon = document.createElement('i');
                    trashIcon.className = 'fa-solid fa-trash';
                    trashIcon.addEventListener('click', function () {
                        deleteArticle(fileName);
                    });

                    savedDiv.appendChild(link);
                    savedDiv.appendChild(trashIcon);

                    innerBody.appendChild(savedDiv);
                });
            }
        });

        // Ẩn giao diện khi nhấp vào nút đóng
        closeButton.addEventListener('click', function () {
            // Áp dụng hiệu ứng biến mất
            savedArticleTitleContainer.classList.remove('visible');
            savedArticleTitleContainer.classList.add('hidden');

            // Ẩn overlay sau khi hiệu ứng kết thúc
            setTimeout(() => {
                savedArticleOverlay.style.display = 'none';
            }, 500); // Thời gian phải khớp với thời gian của hiệu ứng CSS
        });
    });

    function formatDate(fileName) {
        const [day, month, year] = fileName.split('-');
        return `${day} tháng ${month} năm ${year.split('.')[0]}`;
    }

    // Hàm xóa bài viết khỏi danh sách đã lưu
    function deleteArticle(fileName) {
        let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
        savedArticles = savedArticles.filter(article => article !== fileName);
        localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

        // Tải lại giao diện bài viết đã lưu
        document.querySelector('.openSavedArticle').click();
    }
});

