const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [{x: 10 * box, y: 10 * box}];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;

document.addEventListener('keydown', setDirection);
document.getElementById('up').addEventListener('click', () => direction = direction !== 'DOWN' ? 'UP' : 'DOWN');
document.getElementById('left').addEventListener('click', () => direction = direction !== 'RIGHT' ? 'LEFT' : 'RIGHT');
document.getElementById('down').addEventListener('click', () => direction = direction !== 'UP' ? 'DOWN' : 'UP');
document.getElementById('right').addEventListener('click', () => direction = direction !== 'LEFT' ? 'RIGHT' : 'LEFT');

function setDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'lime' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Old snake head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move snake in the current direction
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        score++;
    } else {
        snake.pop(); // Remove the tail
    }

    // Add new head
    let newHead = {x: snakeX, y: snakeY};

    // Check collision with walls or self
    if (
        snakeX < 0 || snakeX >= canvas.width || 
        snakeY < 0 || snakeY >= canvas.height || 
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
    }

    snake.unshift(newHead);
}

function collision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(drawGame, 100);