function AI() {
    if ((paddle2Y + centerPaddleHeight) > ballY) {
        paddle2Y -= aiSpeed;
    } else {
        paddle2Y += aiSpeed;
    }
}