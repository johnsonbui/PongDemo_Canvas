var canvas;
var canvasContext;

var paddle1Y = 50;
var paddle2Y = 50;
var paddleThick = 10;
var paddleHeight = 100;
var ballX = 50;
var ballY = 50;
var BallDimension = 10;

var centeredBallX = ballX - BallDimension / 2;
var centeredBallY = ballY - BallDimension / 2;
var centerPaddleHeight = paddleHeight / 2;

var velocityX = velocityY = 10;

var score1 = 0;
var score2 = 0;

var aiSpeed = 6;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    // Refresh
    setInterval(update, 1000 / 30);
    
    canvas.addEventListener('mousemove', function (e) {
        paddle1Y = e.clientY - centerPaddleHeight;
    });
}

function reset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    velocityX = -velocityX;
    velocityY = 3
}

function update() {
    // Speed of ball
    centeredBallX += velocityX;
    centeredBallY += velocityY;
    ballX += velocityX;
    ballY += velocityY;
    // Collision Logic - Reverse if given top edge
    /*if (ballY > canvas.height && velocityY > 0) {
        velocityY = -velocityY;
    }*/ // Bottom
    /*if (centeredBallY < 0 && velocityY < 0) {
        velocityY = -velocityY;
    }*/
    if (centeredBallY < 0) {
        velocityY = -velocityY;
    }
    if (centeredBallY > canvas.height) {
        velocityY = -velocityY;        
    }
    // Left Side
    if (centeredBallX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            velocityX = -velocityX;
            deltaY = ballY - (paddle1Y + centerPaddleHeight);
            velocityY = deltaY * 0.3;
        } else {
            score2++;
            reset();
        }
    }
    if (centeredBallX > canvas.width) {
        if (centeredBallY > paddle2Y && centeredBallY < paddle2Y + paddleHeight) {
            velocityX = -velocityX;
            deltaY = ballY - (paddle2Y + centerPaddleHeight);
            velocityY = deltaY * 0.3;
        } else {
            score1++;
            reset();
        }
    }
    AI();
    // Spec Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Display/Define Paddles
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, paddle1Y, paddleThick, paddleHeight);
    canvasContext.fillRect(canvas.width - paddleThick, paddle2Y, paddleThick, paddleHeight);
    
    // Balls to the walls (get it?)
    //canvasContext.fillRect(centeredBallX, centeredBallY, BallDimension, BallDimension)
    canvasContext.fillRect(ballX, ballY, BallDimension, BallDimension)
    
        // Score Text to Display
    canvasContext.fillText(score1, 100, 100);
    canvasContext.fillText(score2, canvas.width - 100, 100);
}