document.addEventListener("DOMContentLoaded", function () {
    const filterIcon = document.querySelector(".fa-filter");
    const filterDropdown = document.querySelector(".filter-dropdown");
    const filterOptions = document.querySelectorAll(".filter-option");
    const searchInput = document.querySelector('.search-input');
    const newsContainer = document.querySelector("#newsContent");
    const noArticleMessage = newsContainer.querySelector('p'); // Thẻ p thông báo không có bài viết
    let items = Array.from(newsContainer.querySelectorAll("a"));
    const perPage = 7;

    function applyFilter(filterType) {
        items.forEach((item) => {
            const isNews = item.classList.contains("new");
            const isAnnouncement = item.classList.contains("announcement");

            if (
                filterType === "all" ||
                (filterType === "new" && isNews) ||
                (filterType === "announcement" && isAnnouncement)
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        initializePagination();
    }

    function initializePagination() {
        const filteredItems = items.filter(item => item.style.display !== "none");
        $("#paginationContainer").pagination({
            dataSource: filteredItems,
            pageRange: 1,
            pageSize: perPage,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function (data) {
                items.forEach(item => item.style.display = "none");
                data.forEach((item, index) => {
                    item.style.display = "block";
                    if (index === data.length - 1) {
                        item.classList.add('no-border-bottom');
                    } else {
                        item.classList.remove('no-border-bottom');
                    }
                });

                // Cập nhật hiển thị thông báo không tìm thấy bài viết
                if (filteredItems.length === 0) {
                    noArticleMessage.style.display = 'block';
                } else {
                    noArticleMessage.style.display = 'none';
                }
            },
        });
    }

    // Xử lý sự kiện cho filter icon
    filterIcon.addEventListener("click", () => {
        filterDropdown.style.display =
            filterDropdown.style.display === "block" ? "none" : "block";
    });

    // Xử lý sự kiện cho các tùy chọn filter
    filterOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
            filterDropdown.style.display = "none";
            const filterType = e.target.getAttribute("data-filter");
            applyFilter(filterType);
        });
    });

    // Xử lý sự kiện cho các liên kết ở footer
    document.querySelectorAll(".footer .footer-page .inner-body.filter a, .footer .footer-page-md .inner-body.filter a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const filterType = e.target.getAttribute("data-filter");
            applyFilter(filterType);
        });
    });

    // Xử lý sự kiện tìm kiếm
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        let hasVisibleItems = false;

        items.forEach(item => {
            const title = item.querySelector('.inner-title').textContent.toLowerCase();
            const description = item.querySelector('.inner-description').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query)) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Cập nhật hiển thị thông báo không tìm thấy bài viết
        if (hasVisibleItems) {
            noArticleMessage.style.display = 'none';
        } else {
            noArticleMessage.style.display = 'block';
        }

        initializePagination(); // Cập nhật phân trang
    });

    // Khởi tạo phân trang ban đầu
    initializePagination();
});