var canvas;
var canvasContext;

var paddle1Y = 50;
var paddle2Y = 50;
var paddleThick = 10;
var paddleHeight = 100;
var ballX = 50;
var ballY = 50;
var ballD = 6;

var centeredBallX = ballX - ballD/2;
var centeredBallY = ballY - ballD/2;
var centerPaddleHeight = paddleHeight / 2;

var velocityX = velocityY= 4;

var score1 = 0;
var score2 = 0;

var aiSpeed = 4;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(update, 1000/30);
    // Spec Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width, canvas.height);

    canvas.addEventListener('mousemove', function(e) {
        paddle1Y = e.clientY - centerPaddleHeight;
    });
}

function reset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    velocityX = -velocityX;
    velocityY = 3
}

function AI() {
    if ((paddle2Y + centerPaddleHeight) > ballY) {
        paddle2Y += aiSpeed; 
    } else {
        paddle2Y -= aiSpeed;
    }
}

function update() {
    // Speed of ball
    centeredBallX += velocityX;
    centeredBallY += velocityY;
    // Collision Logic - Reverse if given top/bot edge
    if ((ballY > canvas.height && velocityY > 0) || (ballY < 0 && velocityY < 0)) {
        velocityY = -velocityY;
    }
    // Left Side
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            velocityX = -velocityX;
            deltaY = ballY - (paddle1Y + centerPaddleHeight);
            velocityY = deltaY * 0.3;
        } else {
            score2++;
            reset();
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            velocityX = -velocityX;
            deltaY = ballY - (paddle2Y + centerPaddleHeight);
            velocityY = deltaY * 0.3;
        } else {
            score2++;
            reset();
        }
    }
    AI();
    // Spec Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width, canvas.height);
    // Display/Define Paddles
    canvasContext.fillStyle='blue';
    canvasContext.fillRect(0, paddle1Y, paddleThick, paddleHeight);
    canvasContext.fillRect(canvas.width-paddleThick, paddle2Y, paddleThick, paddleHeight);
    // Balls to the walls (get it?)
    canvasContext.fillRect(centeredBallX, centeredBallY, ballD, ballD)
    // Score Text to Display
    canvasContext.fillText(score1, 100, 100);
    canvasContext.fillText(score2, canvas.width - 100, 100);
}