document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('confettiCanvas');
    var ctx = canvas.getContext('2d');
    var confettis = [];
    var colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']; // Confetti colors

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    function Confetti() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * (15 - 5) + 5;
        this.speed = Math.random() * (5 - 1) + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
    }

    Confetti.prototype.update = function () {
        this.y += this.speed;
        this.angle += this.spin;
    };

    function generateConfetti() {
        if (confettis.length < 300) {
            confettis.push(new Confetti());
        }
    }

    function renderConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettis.forEach(function (confetti, index) {
            ctx.beginPath();
            ctx.arc(confetti.x, confetti.y, confetti.size, 0, 2 * Math.PI);
            ctx.fillStyle = confetti.color;
            ctx.fill();
            ctx.closePath();

            confetti.update();

            if (confetti.y > canvas.height) {
                confettis.splice(index, 1);
            }
        });
    }

    document.getElementById('celebrateButton').addEventListener('click', function () {
        setInterval(generateConfetti, 200);
    });

    function animate() {
        renderConfetti();
        requestAnimationFrame(animate);
    }

    animate();
});
