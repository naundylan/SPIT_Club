// // Ngăn sử dụng chuột phải
// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// });


document.addEventListener('copy', function (e) {
        e.preventDefault();
});

// Ngăn chặn sự kiện cut
document.addEventListener('cut', function (e) {
    e.preventDefault();
});
