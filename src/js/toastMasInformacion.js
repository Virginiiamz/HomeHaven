document.addEventListener("DOMContentLoaded", function () {
    var masInformacionBtns = document.querySelectorAll(".masInformacionBtn");
    var masInformacionToast = document.getElementById("masInformacion");
    var toast = new bootstrap.Toast(masInformacionToast);

    masInformacionBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            toast.show();
        });
    });
});