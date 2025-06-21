console.log('ready');

    var james = $('#bond');

    var right = function () {
        james.animate({ left: '5px' }, 600, left);
    };

    var left = function () {
        james.animate({ left: '0px' }, 600, right);
    };
right();

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawHeart(x, y, size, color) {
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
        ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y + size / 4);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    let hearts = [];

    function createHeart() {
        let heart = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 10,
            color: `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 0.8)`,
            speed: Math.random() * 2 + 1
        };
        hearts.push(heart);
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((heart, index) => {
            heart.y -= heart.speed;
            drawHeart(heart.x, heart.y, heart.size, heart.color);
            if (heart.y < -20) {
                hearts.splice(index, 1);
            }
        });
        requestAnimationFrame(animateHearts);
    }

    setInterval(createHeart, 500);
    animateHearts();
});
//document.addEventListener("DOMContentLoaded", function () {
//    const track = document.querySelector(".footer-track");

//    // Kích hoạt animation ngay khi trang load
//    track.style.animation = "scrollImages 20s linear infinite";

//    // Dừng animation khi rê chuột vào, chạy lại khi rời chuột khỏi
//    track.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
//    track.addEventListener("mouseleave", () => track.style.animationPlayState = "running");
//});
document.addEventListener("DOMContentLoaded", function () {

    // ✅ Xử lý hiệu ứng bánh sinh nhật
    const cake = document.getElementById("birthdayCake");
    const flame = document.getElementById("candleFlame");
    const wishMessage = document.getElementById("wishMessage");

    if (cake) {
        cake.addEventListener("click", function () {
            flame.style.opacity = "0"; // Ẩn ngọn lửa
            setTimeout(() => {
                wishMessage.classList.remove("hidden"); // Hiện lời chúc
            }, 500);
        });
    }

    // ✅ Xử lý hiệu ứng ảnh ở footer

    const track = document.querySelector(".footer-track");

    // Khi chuột vào -> Dừng animation
    track.addEventListener("mouseenter", () => {
        track.style.animationPlayState = "paused";
    });

    // Khi chuột ra -> Chạy tiếp
    track.addEventListener("mouseleave", () => {
        track.style.animationPlayState = "running";
    });

    // Đảm bảo chạy ngay khi load web
    track.style.animationDelay = "1s";
});


const cancelBtn = document.getElementById("cancelBtn");

// Với thiết bị cảm ứng (chạm vào nút)
cancelBtn.addEventListener("touchstart", moveButton);

// Với chuột (di chuyển vào nút)
cancelBtn.addEventListener("mouseenter", moveButton);
function moveButton() {
    const containerHeight = window.innerHeight;
    const containerWidth = window.innerWidth;
    const btnHeight = cancelBtn.offsetHeight;
    const btnWidth = cancelBtn.offsetWidth;

    const maxX = containerWidth - btnWidth;
    const maxY = containerHeight - btnHeight;

    const randomX = Math.random() * maxX;
    const randomBottom = Math.random() * maxY;

    cancelBtn.style.top = "unset"; // xoá nếu có
    cancelBtn.style.left = `${randomX}px`;
    cancelBtn.style.bottom = `${randomBottom}px`;
}
document.querySelectorAll(".footer-track img").forEach(img => {
    img.addEventListener("click", function (e) {
        e.stopPropagation();

        // Nếu đã có ảnh clone thì xóa trước
        const oldClone = document.getElementById("zoomed-image-clone");
        if (oldClone) oldClone.remove();

        // Clone ảnh
        const clone = img.cloneNode();
        clone.id = "zoomed-image-clone";
        clone.style.position = "fixed";
        clone.style.top = "50%";
        clone.style.left = "50%";
        clone.style.maxWidth = "80vw";
        clone.style.maxHeight = "80vh";
        clone.style.width = "auto";
        clone.style.height = "auto";
        clone.style.transform = "translate(-50%, -50%)";
        clone.style.zIndex = "9999";
        clone.style.boxShadow = "0 0 20px rgba(0,0,0,0.8)";
        clone.style.transition = "transform 0.5s ease";

        document.body.appendChild(clone);

        // Pause track
        document.querySelector(".footer-track").style.animationPlayState = "paused";
    });
});

// Click ra ngoài để remove clone & chạy lại track
document.addEventListener("click", function () {
    const oldClone = document.getElementById("zoomed-image-clone");
    if (oldClone) oldClone.remove();
    document.querySelector(".footer-track").style.animationPlayState = "running";
});







