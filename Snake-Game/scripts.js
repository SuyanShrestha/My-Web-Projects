// define html elements
const board = document.querySelector('#game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// music elements
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

// define game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameStarted = false;
let gameSpeedDelay= 200;

// draw game map, snake, food
function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// create a snake or food cube/div
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// set position of snake or food
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// testing the draw function
// draw();

// draw food function
function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Generate food
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x,y};
}

// moving the snake
function move() {
    const head = {...snake[0]};

    switch(direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);            // add more boxes to the snake and increase length
    // snake.pop();                    // remove the last element from array (size increase decrease vayerw illusion of movement)

    // check if food is eaten, then only dont pop
    if(head.x===food.x && head.y===food.y){
        foodSound.play();
        food = generateFood();          // generate new food
        increaseSpeed();
        clearInterval(gameInterval);            // clear past interval
        gameInterval = setInterval(()=>{
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    }
    else{
        snake.pop();
    }
}

// test moving
// setInterval(() => {
//     move(); // move first
//     draw(); // draw new position again  
// }, 200);


// start game function 
function startGame() {
    musicSound.play();
    gameStarted = true;         // keep track of running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(()=>{
        move();
        checkCollision();
        draw();        
        }, gameSpeedDelay);
}


// keypress event listener
function handleKeyPress(event) {
    if(
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    ){
        startGame();
    }
    else{
        moveSound.play();
        switch(event.key){
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    // console.log(gameSpeedDelay);
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5;
    }
    else if (gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    }
    else if (gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    }
    else if (gameSpeedDelay > 25){
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        gameOverSound.play();
        musicSound.pause();
        resetGame();
    }

    for(let i=1; i<snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            gameOverSound.play();
            musicSound.pause();
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x:10, y:10}];
    musicSound.play();
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1 ; 
    score.textContent = currentScore.toString().padStart(3, '0');           // to keep score a triple digit number
}

function stopGame(){
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block'
}


function updateHighScore(){
    const currentScore = snake.length - 1;
    if(currentScore > highScore){
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}