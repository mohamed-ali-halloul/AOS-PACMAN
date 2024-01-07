import Pacman from './Pacman';
import { OBJECT_TYPE, DIRECTIONS } from './setup';

describe('Pacman Tests', () => {
    // creation de test Pacman
    test('Pac-Man is correctly created with initial properties', () => {
        const pacman = new Pacman(1, 0); 

        expect(pacman.pos).toBe(0);
        expect(pacman.speed).toBe(1);
        expect(pacman.dir).toBeNull();
        
    });

    // test de la méthode shouldMove 
    test('shouldMove returns false when direction is null', () => {
        const pacman = new Pacman(1, 0); 
        pacman.dir = null;

        expect(pacman.shouldMove()).toBe(false);
    });
    //ajout d'autres méthodesde teste
});
