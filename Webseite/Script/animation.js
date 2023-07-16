// declare variables
const FPS = 30;
var ballSize = 20;
var ballX, ballY;
var xv, yv;
var canvas = document.getElementById("ball");
var context = canvas.getContext('2d');

// set up interval (game loop)
setInterval(update, 1000 / FPS);

// ball starting position
ballX = canvas.width / 2;
ballY = canvas.height / 2;

// random ball starting speed (between 25 and 100 pps(Pixel Per Seconds))
xv = Math.floor(Math.random() * 76 + 25) / FPS;
yv = Math.floor(Math.random() * 76 + 25) / FPS;

// random ball direction
if (Math.floor(Math.random() * 2) == 0) {
    xv = -xv;
}
if (Math.floor(Math.random() * 2) == 0) {
    yv = -yv;
}

// update function
function update() {
    // move the ball
    ballX += xv;
    ballY += yv;
    
    // bounce the ball off each wall
    if (ballX - ballSize / 2 < 0 && xv < 0) {
        xv = -xv;
    }
    if (ballX + ballSize / 2 > canvas.width && xv > 0) {
        xv = -xv;
    }
    if (ballY - ballSize / 2 < 0 && yv < 0) {
        yv = -yv;
    }
    if (ballY + ballSize / 2 > canvas.height && yv > 0) {
        yv = -yv;
    }
    
    // draw background and ball
    context.clearRect(0, 0, 10000, 300);
    context.fillStyle = "#4ff9a3";
    //context.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
    context.beginPath();
    context.arc(ballX, ballY, ballSize * 0.3, 0, Math.PI * 2);
    context.fill();
    
}