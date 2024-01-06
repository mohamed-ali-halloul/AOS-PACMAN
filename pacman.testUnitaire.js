import Pacman from './Pacman';
import { OBJECT_TYPE, DIRECTIONS } from './setup';

describe('Pacman Tests', () => {
    // Pac-Man creation test
    test('Pac-Man is correctly created with initial properties', () => {
        const pacman = new Pacman(1, 0); // Adjust the initial properties as needed

        expect(pacman.pos).toBe(0);
        expect(pacman.speed).toBe(1);
        expect(pacman.dir).toBeNull();
        // Add more checks for other properties
    });

    // Testing the shouldMove method
    test('shouldMove returns false when direction is null', () => {
        const pacman = new Pacman(1, 0); // Adjust the initial properties as needed
        pacman.dir = null;

        expect(pacman.shouldMove()).toBe(false);
    });
    //ajout d'autres méthodesde teste
});