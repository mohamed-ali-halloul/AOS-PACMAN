// Importing necessary modules and assets
import { LEVEL, LEVEL_2, OBJECT_TYPE, GRID_SIZE_2, DIRECTIONS_2 } from './setup';
import { randomMovement } from './ghostmoves';
// Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
// Sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';
// Dom Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');
const nextLevelButton = document.querySelector('#next-level-button');
// Game constants
const POWER_PILL_TIME = 10000; // ms
const GLOBAL_SPEED = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);
const TOTAL_LEVELS = 2; // Set the total number of levels here

let currentLevel = 1; // Initialize the current level
// Initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;
let lives = 2;








// --- AUDIO --- //
function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}




// --- GAME CONTROLLER --- //
function gameOver(pacman, _grid) {
    playAudio(soundGameOver);

    document.removeEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    gameBoard.showGameStatus(gameWin);

    clearInterval(timer);


    // Decrement lives
    lives--;

    updateVisualLives(lives);

    // Check if the game is over
    if (lives <= 0) {
        // Trigger game over logic here
        console.log('Game over!');
        // You may want to add additional game over logic here if needed
    } else {
        // Reset Pacman's position
        console.log('Resetting position.');
        gameBoard.resetPacmanPosition(pacman);
        // Show start button
        startButton.classList.remove('hide');
    }

    // Update lives display
    // updateLivesDisplay(lives);
    // Show start button
    startButton.classList.remove('hide');
}

function updateVisualLives(lives) {
    const lifeDivs = document.querySelectorAll('.life');
    console.log('Updating visual lives. Lives:', lives);
    lifeDivs.forEach((lifeDiv, index) => {
        if (index < lives) {
            // Show the div for remaining lives
            lifeDiv.classList.remove('hidden');
        } else {
            // Hide the div for lost lives
            lifeDiv.classList.add('hidden');
        }
    });


}

function checkCollision(pacman, ghosts, updateVisualLives) {
    // Check if Pacman collides with ghosts
    const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);
    // updateLivesDisplay(lives);

    if (collidedGhost) {
        if (pacman.powerPill) {
            // If Pacman has power pill, eat ghost
            playAudio(soundGhost);
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collidedGhost.name
            ]);
            collidedGhost.pos = collidedGhost.startPos;
            score += 100;
        } else {
            // If Pacman does not have power pill, game over
            pacman.handleCollision(gameBoard, gameOver, updateVisualLives);

            // Add a class to life1 when pacman.pos is equal to ghost.pos
            if (pacman.lives === 2) {
                const lifeElement = document.querySelector('#life3');
                if (lifeElement) {
                    lifeElement.classList.add('hidden');
                }
            }

            if (pacman.lives === 1) {
                const lifeElement = document.querySelector('#life2');
                if (lifeElement) {
                    lifeElement.classList.add('hidden');
                }
            }

            if (pacman.lives === 0) {
                const lifeElement = document.querySelector('#life1');
                if (lifeElement) {
                    lifeElement.classList.add('hidden');
                }
            }

        }
    }
}

function gameLoop(pacman, ghosts) {

    // 1. Move Pacman
    gameBoard.moveCharacter(pacman);
    // 2. Check Ghost collision on the old positions
    checkCollision(pacman, ghosts);
    // 3. Move ghosts
    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
    // 4. Do a new ghost collision check on the new positions
    checkCollision(pacman, ghosts);
    // 5. Check if Pacman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        // Remove a dot
        gameBoard.dotCount--;
        // Add Score
        score += 10;
    }
    // 6. Check if Pacman eats a power pill
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

        pacman.powerPill = true;
        score += 50;

        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            POWER_PILL_TIME
        );
    }
    // 7. Change ghost scare mode depending on power pill
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
    }
    // 8. Check if all dots have been eaten
    if (gameBoard.dotCount === 0) {
        if (currentLevel === TOTAL_LEVELS) {
            // If it's the last level, trigger game win
            gameWin = true;
            gameOver(pacman, gameGrid);
        } else {
            // Increment the current level
            currentLevel++;

            // Show the "Next Level" button
            nextLevelButton.classList.remove('hide');

            // Clear the game loop timer
            clearInterval(timer);
        }
    }

    // 9. Show new score
    scoreTable.innerHTML = score;



}






// Initialize game
startButton.addEventListener('click', startGame);

function startGame() {
    // Play the game start sound
    playAudio(soundGameStart);

    // Reset game state
    gameWin = false;
    powerPillActive = false;
    score = 0;

    // Show all life elements
    const allLifeElements = document.querySelectorAll('.life');
    allLifeElements.forEach((lifeElement) => {
        lifeElement.classList.remove('hidden');
        lifeElement.classList.add('showing-live');
    });
    // Hide the start button
    startButton.classList.add('hide');

    // Create the game grid
    gameBoard.createGrid(LEVEL);

    // Initialize Pacman
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    // Listen for key input to control Pacman
    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    // Initialize Ghosts
    const ghosts = [
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];
    // updateLivesDisplay(lives);
    // Gameloop
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

function nextLevel() {
    // Update the grid size and create the new game board
    gameBoard.createGrid(currentLevel === 1 ? LEVEL_2 : LEVEL_2, currentLevel === 1 ? GRID_SIZE_2 : GRID_SIZE_2);
    // Reset other game-related variables if needed
    score = 0;
    gameWin = false;
    powerPillActive = false;

    // Create Pacman and ghosts for the new level
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', (e) => {
        const directions = currentLevel === 1 ? directions : DIRECTIONS_2;


        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard), directions)
    });

    const ghosts = [
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];

    // Start the game loop for the new level
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}




// Initialize game
startButton.addEventListener('click', startGame);





// uncomment later
nextLevelButton.addEventListener('click', () => {
    // Hide the "Next Level" button
    nextLevelButton.classList.add('hide');
    // Move to the next level
    nextLevel();
});