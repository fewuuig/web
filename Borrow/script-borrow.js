// --- SCRIPT QUẢN LÝ MƯỢN/TRẢ SÁCH VỚI LOCALSTORAGE ---

/**
 * Lấy danh sách các sách đã mượn từ localStorage.
 * Trả về một mảng (array) các tiêu đề sách.
 */
function getBorrowedBooks() {
    const books = localStorage.getItem('borrowedBooks');
    // Nếu chưa có gì trong storage, trả về mảng rỗng
    return books ? JSON.parse(books) : [];
}

/**
 * Lưu danh sách sách đã mượn vào localStorage.
 * @param {string[]} booksArray - Mảng các tiêu đề sách cần lưu.
 */
function saveBorrowedBooks(booksArray) {
    localStorage.setItem('borrowedBooks', JSON.stringify(booksArray));
}

/**
 * Cập nhật giao diện (ẩn/hiện nút) cho một thẻ sách cụ thể.
 * @param {HTMLElement} cardElement - Thẻ .card của cuốn sách.
 * @param {boolean} isBorrowed - Trạng thái sách (true = đã mượn, false = chưa mượn).
 */
function updateCardUI(cardElement, isBorrowed) {
    const borrowBtn = cardElement.querySelector('.borrow');
    const returnBtn = cardElement.querySelector('.return');

    if (isBorrowed) {
        // Nếu đã mượn: Ẩn nút "Mượn", Hiện nút "Trả"
        borrowBtn.style.display = 'none';
        returnBtn.style.display = 'inline-block';
    } else {
        // Nếu chưa mượn: Hiện nút "Mượn", Ẩn nút "Trả"
        borrowBtn.style.display = 'inline-block';
        returnBtn.style.display = 'none';
    }
}

/**
 * Lấy tiêu đề (ID) của sách từ thẻ .card.
 * Chúng ta sẽ dùng thuộc tính 'title' trên thẻ <img> làm ID.
 */
function getBookTitle(cardElement) {
    const img = cardElement.querySelector('img');
    // Một số thẻ .card của bạn có title ở div, một số ở img, nên ta kiểm tra cả hai
    return cardElement.title || (img ? img.title : null);
}


// --- HÀM CHÍNH: CHẠY KHI TẢI XONG TRANG ---

document.addEventListener("DOMContentLoaded", function() {

    const borrowedBooks = getBorrowedBooks();
    const allCards = document.querySelectorAll('.card');

    // 1. KIỂM TRA TRẠNG THÁI KHI TẢI TRANG
    // Duyệt qua tất cả các thẻ .card trên trang
    allCards.forEach(card => {
        const title = getBookTitle(card);
        if (!title) return; // Bỏ qua nếu sách không có title

        // Kiểm tra xem sách này có trong danh sách đã mượn không
        if (borrowedBooks.includes(title)) {
            updateCardUI(card, true); // Đã mượn
        } else {
            updateCardUI(card, false); // Chưa mượn (đây là trạng thái mặc định)
        }
    });

    // 2. GẮN SỰ KIỆN CHO CÁC NÚT "MƯỢN"
    document.querySelectorAll(".borrow").forEach(btn => {
        btn.addEventListener("click", function() {
            const card = this.closest('.card');
            const title = getBookTitle(card);

            if (title) {
                // Lấy danh sách, thêm sách mới vào, và lưu lại
                let currentBooks = getBorrowedBooks();
                if (!currentBooks.includes(title)) {
                    currentBooks.push(title);
                    saveBorrowedBooks(currentBooks);
                }

                // Cập nhật giao diện và thông báo
                updateCardUI(card, true);
                alert(`Bạn đã mượn sách "${title}" thành công!`);
            }
        });
    });

    // 3. GẮN SỰ KIỆN CHO CÁC NÚT "TRẢ"
    document.querySelectorAll(".return").forEach(btn => {
        btn.addEventListener("click", function() {
            const card = this.closest('.card');
            const title = getBookTitle(card);

            if (title) {
                // Lấy danh sách, lọc bỏ sách này ra, và lưu lại
                let currentBooks = getBorrowedBooks();
                const updatedBooks = currentBooks.filter(bookTitle => bookTitle !== title);
                saveBorrowedBooks(updatedBooks);

                // Cập nhật giao diện và thông báo
                updateCardUI(card, false);
                alert(`Bạn đã trả sách "${title}" thành công!`);
            }
        });
    });

});