// Importation des modules et ressources nécessaires
import { LEVEL, LEVEL_2, OBJECT_TYPE, GRID_SIZE_2, DIRECTIONS_2 } from './setup';
import { randomMovement } from './ghostmoves';
// Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
// Sons
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';
// Éléments DOM
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');
const nextLevelButton = document.querySelector('#next-level-button');
// Constantes du jeu
const POWER_PILL_TIME = 10000; // Durée d'activation de la pilule de puissance en ms
const GLOBAL_SPEED = 80; // Vitesse globale du jeu en ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);
const TOTAL_LEVELS = 2; // le nombre total de niveaux 

let currentLevel = 1; // Initialiser le niveau actuel
// Configuration initiale
let score = 0; // Score du joueur
let timer = null; // Minuterie de la boucle de jeu
let gameWin = false; // Indicateur de victoire du jeu
let powerPillActive = false; // Indicateur de l'activation de la pilule de puissance
let powerPillTimer = null; // Minuterie de la pilule de puissance
let lives = 2; // Nombre de vies initiales du joueur

// --- AUDIO --- //
//Définit une fonction pour jouer des effets sonores dans le jeu
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

    // Décrémenter le nombre de vies
    lives--;

    updateVisualLives(lives);

    // Vérifier si le jeu est terminé
    if (lives <= 0) {
        // Déclencher la logique de fin de jeu ici
        console.log('Game over!');
        // Vous pouvez ajouter une logique de fin de jeu supplémentaire ici si nécessaire
    } else {
        // Réinitialiser la position de Pacman
        console.log('Réinitialisation de la position.');
        gameBoard.resetPacmanPosition(pacman);
        // Afficher le bouton de démarrage
        startButton.classList.remove('hide');
    }

    // Mettre à jour l'affichage des vies
    // updateLivesDisplay(lives);
    // Afficher le bouton de démarrage
    startButton.classList.remove('hide');
}

function updateVisualLives(lives) {
    const lifeDivs = document.querySelectorAll('.life');
    console.log('Mise à jour visuelle des vies. Vies :', lives);
    lifeDivs.forEach((lifeDiv, index) => {
        if (index < lives) {
            // Afficher la division pour les vies restantes
            lifeDiv.classList.remove('hidden');
        } else {
            // Masquer la division pour les vies perdues
            lifeDiv.classList.add('hidden');
        }
    });
}


function checkCollision(pacman, ghosts, updateVisualLives) {
    // Vérifier si Pacman entre en collision avec des fantômes
    const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);
    // updateLivesDisplay(lives);

    if (collidedGhost) {
        if (pacman.powerPill) {
            // Si Pacman a une pilule de puissance => manger le fantôme
            playAudio(soundGhost);
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collidedGhost.name
            ]);
            collidedGhost.pos = collidedGhost.startPos;
            score += 100;
        } else {
            // Si Pacman n'a pas de pilule de puissance, c'est la fin du jeu
            pacman.handleCollision(gameBoard, gameOver, updateVisualLives);

            // Ajouter une classe à life1 lorsque pacman.pos est égale à ghost.pos
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

    // 1. Déplacer Pacman
    gameBoard.moveCharacter(pacman);
    // 2. Vérifier la collision des fantômes aux anciennes positions
    checkCollision(pacman, ghosts);
    // 3. Déplacer les fantômes
    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
    // 4. Effectuer une nouvelle vérification de collision des fantômes aux nouvelles positions
    checkCollision(pacman, ghosts);
    // 5. Vérifier si Pacman mange un point
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        // Retirer un point
        gameBoard.dotCount--;
        // Ajouter des points au score
        score += 10;
    }
    // 6. Vérifier si Pacman mange une pilule de puissance
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
    // 7. Changer le mode de peur des fantômes en fonction de la pilule de puissance
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
    }
    // 8. Vérifier si tous les points ont été mangés
    if (gameBoard.dotCount === 0) {
        if (currentLevel === TOTAL_LEVELS) {
            // S'il s'agit du dernier niveau, déclencher la victoire
            gameWin = true;
            gameOver(pacman, gameGrid);
        } else {
            // Incrémenter le niveau actuel
            currentLevel++;

            // Afficher le bouton "Niveau suivant"
            nextLevelButton.classList.remove('hide');

            // Effacer la minuterie de la boucle de jeu
            clearInterval(timer);
        }
    }

    // 9. Afficher le nouveau score
    scoreTable.innerHTML = score;
}






// Initialiser le jeu
startButton.addEventListener('click', startGame);

function startGame() {
    // Jouer le son de début de jeu
    playAudio(soundGameStart);

    // Réinitialiser l'état du jeu
    gameWin = false;
    powerPillActive = false;
    score = 0;

    // Afficher tous les éléments de vie
    const allLifeElements = document.querySelectorAll('.life');
    allLifeElements.forEach((lifeElement) => {
        lifeElement.classList.remove('hidden');
        lifeElement.classList.add('showing-live');
    });
    // Masquer le bouton de démarrage
    startButton.classList.add('hide');

    // Créer la grille de jeu
    gameBoard.createGrid(LEVEL);

    // Initialiser Pacman
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    // Écouter l'entrée clavier pour contrôler Pacman
    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    // Initialiser les fantômes
    const ghosts = [
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];
    // updateLivesDisplay(lives);
    // Boucle de jeu
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

function nextLevel() {
    // Mettre à jour la taille de la grille et créer le nouveau plateau de jeu
    gameBoard.createGrid(currentLevel === 1 ? LEVEL_2 : LEVEL_2, currentLevel === 1 ? GRID_SIZE_2 : GRID_SIZE_2);
    // Réinitialiser d'autres variables liées au jeu si nécessaire
    score = 0;
    gameWin = false;
    powerPillActive = false;

    // Créer Pacman et les fantômes pour le nouveau niveau
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

    // Démarrer la boucle de jeu pour le nouveau niveau
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}




// Initialiser le jeu
startButton.addEventListener('click', startGame);





// décommenter plus tard
nextLevelButton.addEventListener('click', () => {
    // Masquer le bouton "Niveau suivant"
    nextLevelButton.classList.add('hide');
    // Passer au niveau suivant
    nextLevel();
});