// kiểm tra username có thỏa mãn không 
function validateUsername(username) {
    usernameRegex = /^[A-Za-z0-9_]{5,}$/;
    return usernameRegex.test(username);
}
//kiểm tra Họ Tên có hợp lẹ không 
function validateHoTen(hoten) {
    hotenRegex = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
    return hotenRegex.test(hoten);
}
// kiểm tra email 
function validateEmail(email) {
    emailRegex = /^[A-Za-z0-9_]+@gmail\.com$/;
    return emailRegex.test(email);
}
// kieemr tra SDT 
function validateSDT(sdt) {
    sdtRegex = /^[0-9]{10}$/;
    return sdtRegex.test(sdt);
}
// kiểm tra căn cước công dân 
function validateCCCD(cccd) {
    cccdRegex = /^[0-9]{12}$/;
    return cccdRegex.test(cccd);
}
// kiểm tra rỗng 
function empty(txt) {
    if (txt.length == 0) return true;
    else return false;
}
// hàm tổng kiểm tra form
function validateForm(event) {
    event.preventDefault(); // chặn làm mới form

    var hoten = document.getElementById("hoten").value.trim();
    var email = document.getElementById("email").value.trim();
    var sdt = document.getElementById("sdt").value.trim();
    var imginput = document.getElementById("imginput");

    if (empty(hoten) == true) {
        alert("Họ tên không được bỏ trống!");
        document.getElementById("hoten").focus();
        return;
    }
    if (validateHoTen(hoten) == false) {
        alert("Tên chỉ chứa ký tự chữ cái");
        document.getElementById("hoten").focus();
        return;
    }

    if (empty(email) == true) {
        alert("Email không được bỏ trống!");
        document.getElementById("email").focus();
        return;
    } else if (validateEmail(email) == false) {
        alert("Email phải đúng định dạng @gmail.com !");
        document.getElementById("email").focus();
        return;
    }

    if (sdt.length > 10) {
        alert("sdt quá 10 số!");
        document.getElementById("sdt").focus();
        return;
    }
    if (empty(sdt)) {
        alert("sdt không được bỏ trống!");
        document.getElementById("sdt").focus();
    } else if (validateSDT(sdt) == false) {
        alert("So diem thoai khong hợp lệ!");
        document.getElementById("sdt").focus();
    }
    if (isNaN(sdt)) {
        alert("sdt phải là số!");
        document.getElementById("sdt").focus();
    }
    if (imginput.files.length === 0) {
        alert("Chon ảnh 3x3");
        return;
    }

    window.location.href = "payment.html"; // chuyển sang trang thanh toán

}

document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector("form");
    form.addEventListener("submit", validateForm);
});