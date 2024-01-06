import { OBJECT_TYPE, DIRECTIONS } from './setup';

// Définition de la classe Pacman
class Pacman {
    // Constructeur pour Pacman
    constructor(speed, startPos, lives = 3) {
        this.pos = startPos; // Position initiale
        this.speed = speed; // Vitesse de Pacman
        this.dir = null; // Direction du déplacement
        this.timer = 0; // Minuterie pour le déplacement
        this.powerPill = false; // Indicateur si Pacman a une pilule de puissance
        this.rotation = true; // Indicateur si la rotation est activée
        this.lives = lives;
    }

    // Méthode pour vérifier si Pacman doit se déplacer
    shouldMove() {
        if (!this.dir) return false;

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }


    // Méthode pour obtenir le prochain déplacement de Pacman
    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        // Vérifier la collision avec un mur ou la tanière des fantômes
        if (
            objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            nextMovePos = this.pos; // Réinitialiser la position en cas de collision
        }

        // Retourner un objet avec la nouvelle position de déplacement mise à jour et la direction
        return { nextMovePos, direction: this.dir };
    }

    // Méthode pour définir le déplacement de Pacman
    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        // Return an object with classes to remove and classes to add
        return { classesToRemove, classesToAdd };
    }

    // Retourner un objet avec les classes à supprimer et les classes à ajouter
    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    // Méthode pour définir la nouvelle position de Pacman
    handleKeyInput(e, objectExist) {
        let dir;

        // Vérifier si la touche pressée est une flèche
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            dir = DIRECTIONS[e.key];
        } else {
            return; // Ne rien faire si une touche autre qu'une flèche est pressée
        }

        // Calculer le prochain déplacement
        const nextMovePos = this.pos + dir.movement;

        // Vérifier si le prochain déplacement entre en collision avec un mur
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;

        // Définir la direction pour Pacman
        this.dir = dir;
    }
    // Méthode pour gérer la collision avec les fantômes
    handleCollision(gameBoard, gameOver) {
        console.log('Handling collision. Lives before:', this.lives);
        this.lives--;

        if (this.lives <= 0) {
            // Méthode pour gérer la collision avec les fantômes
            console.log('Game over!');
            gameOver(this, gameBoard);
        } else {
            // Réinitialiser la position de Pacman
            console.log('Resetting position.');
            gameBoard.resetPacmanPosition(this);
        }

        console.log('Lives after:', this.lives);
    }
}

// Test 1 : Test de création de Pac-Man
const testPacmanCreation = () => {
    const pacman = new Pacman(1, 0); // Adjust the initial properties as needed
    console.log('Test 1: Pac-Man creation test');
    console.log('Pacman object:', pacman);
};

// Test 2 : Test de la méthode shouldMove
const testShouldMoveMethod = () => {
    const pacman = new Pacman(1, 0); // Ajuster les propriétés initiales au besoin
    console.log('Test 2: Testing the shouldMove method');

    // Cas 1 : la direction est nulle
    pacman.dir = null;
    console.log('Case 1 - ShouldMove:', pacman.shouldMove()); // Expected: false

    // Cas 2 : la minuterie atteint la vitesse
    pacman.dir = { movement: 1 }; // Définir une direction pour les tests
    pacman.timer = pacman.speed;
    console.log('Case 2 - ShouldMove:', pacman.shouldMove()); // Expected: true
};

// Test 3 : Test de la méthode getNextMove
const testGetNextMoveMethod = () => {
    const pacman = new Pacman(1, 0); // Ajuster les propriétés initiales au besoin
    console.log('Test 3: Testing the getNextMove method');

    // Cas 1 : le prochain déplacement n'est pas bloqué
    pacman.dir = { movement: 1 }; // Définir une direction pour les tests
    const result1 = pacman.getNextMove(() => false); // Fonction mock pour objectExist
    console.log('Case 1 - Next Move Result:', result1);

    // Cas 2 : le prochain déplacement est bloqué
    const result2 = pacman.getNextMove(() => true); // Fonction mock pour objectExist
    console.log('Case 2 - Next Move Result:', result2);
};



// Exécuter les tests
testPacmanCreation();
testShouldMoveMethod();
testGetNextMoveMethod();

// Exporter la classe Pacman
export default Pacman;
