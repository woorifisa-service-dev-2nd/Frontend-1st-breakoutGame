let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2; //속도제어
let dy = -2;
var originY = dy;
var originX = dx;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let brickRowCount = 5;
let brickColumnCount = 5;
let brickWidth = 75; //블럭 크기 -> 화면 사이즈에 맞게 자동조정되도록 변경....?
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
// let lives = 3;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.querySelector("button").addEventListener("click", () => {
  draw()
  document.querySelector(".continer").style.display = "none"
  canvas.style.backgroundColor = "#eee"
})

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
  else if (e.keyCode == 32) {
    spaceHandler();
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function spaceHandler(e) {
  if (spacePressed == true) {
    dx = originX;
    dy = originY;
  }
  else {
    dx = 0;
    dy = 0;
  }
  spacePressed = !spacePressed;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    originX = dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    originY = dy;
  }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      originY = dy;
    }
    else {

      x = canvas.width / 2;
      y = canvas.height - 30;
      alert("GAME OVER");
      document.location.reload();

    }
  }


  if (!spacePressed) {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

