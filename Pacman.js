// Importing constants from setup.js
import { OBJECT_TYPE, DIRECTIONS, } from './setup';

// Pacman class definition
class Pacman {
    // Constructor for Pacman
    constructor(speed, startPos, lives = 3) {
        this.pos = startPos; // Initial position
        this.speed = speed; // Speed of Pacman
        this.dir = null; // Direction of movement
        this.timer = 0; // Timer for movement
        this.powerPill = false; // Flag indicating if Pacman has power pill
        this.rotation = true; // Flag indicating if rotation is enabled
        this.lives = lives;
    }

    // Method to check if Pacman should move
    shouldMove() {
        if (!this.dir) return false;

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }


    // Method to get the next move of Pacman
    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        // Check for collision with a wall or ghost lair
        if (
            objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            nextMovePos = this.pos; // Reset position if collision
        }

        // Return an object with the updated next move position and direction
        return { nextMovePos, direction: this.dir };
    }

    // Method to define Pacman's move
    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        // Return an object with classes to remove and classes to add
        return { classesToRemove, classesToAdd };
    }

    // Method to set the new position of Pacman
    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    // Method to handle keyboard input for Pacman
    handleKeyInput(e, objectExist) {
        let dir;

        // Check if the key pressed is an arrow key
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            dir = DIRECTIONS[e.key];
        } else {
            return; // Do nothing if a non-arrow key is pressed
        }

        // Calculate the next move position
        const nextMovePos = this.pos + dir.movement;

        // Check if the next move collides with a wall
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;

        // Set the direction for Pacman
        this.dir = dir;
    }
    handleCollision(gameBoard, gameOver) {
        console.log('Handling collision. Lives before:', this.lives);
        this.lives--;

        if (this.lives <= 0) {
            // Trigger game over logic here
            console.log('Game over!');
            gameOver(this, gameBoard);
        } else {
            // Reset Pacman's position
            console.log('Resetting position.');
            gameBoard.resetPacmanPosition(this);
        }

        console.log('Lives after:', this.lives);
    }
}

// Test 1: Pac-Man creation test
const testPacmanCreation = () => {
    const pacman = new Pacman(1, 0); // Adjust the initial properties as needed
    console.log('Test 1: Pac-Man creation test');
    console.log('Pacman object:', pacman);
};

// Test 2: Testing the shouldMove method
const testShouldMoveMethod = () => {
    const pacman = new Pacman(1, 0); // Adjust the initial properties as needed
    console.log('Test 2: Testing the shouldMove method');

    // Case 1: direction is null
    pacman.dir = null;
    console.log('Case 1 - ShouldMove:', pacman.shouldMove()); // Expected: false

    // Case 2: timer reaches speed
    pacman.dir = { movement: 1 }; // Set a direction for testing
    pacman.timer = pacman.speed;
    console.log('Case 2 - ShouldMove:', pacman.shouldMove()); // Expected: true
};

// Test 3: Testing the getNextMove method
const testGetNextMoveMethod = () => {
    const pacman = new Pacman(1, 0); // Adjust the initial properties as needed
    console.log('Test 3: Testing the getNextMove method');

    // Case 1: next move is not blocked
    pacman.dir = { movement: 1 }; // Set a direction for testing
    const result1 = pacman.getNextMove(() => false); // Mock objectExist function
    console.log('Case 1 - Next Move Result:', result1);

    // Case 2: next move is blocked
    const result2 = pacman.getNextMove(() => true); // Mock objectExist function
    console.log('Case 2 - Next Move Result:', result2);
};

// Add more test functions for the remaining methods...

// Run the tests
testPacmanCreation();
testShouldMoveMethod();
testGetNextMoveMethod();
// Call other test functions...

// Export the Pacman class
export default Pacman;