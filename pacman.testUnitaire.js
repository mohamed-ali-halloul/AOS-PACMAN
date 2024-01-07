import Pacman from './Pacman';
import { OBJECT_TYPE, DIRECTIONS } from './setup';

describe('Pacman Tests', () => {
    
    //Vérifie que l'instance de la class Pacman est correctement avec les propriétés initiales attendues  
    test('Pac-Man is correctly created with initial properties', () => {
        const pacman = new Pacman(1, 0); 

        expect(pacman.pos).toBe(0); //vérifie que la position de Pacman est à 0 après la création
        expect(pacman.speed).toBe(1); // vérifie que la vitesse de Pacman est à 1 après la création
        expect(pacman.dir).toBeNull();// vérifie que la direction de Pacman est initialement nulle
        
    });

    // test de la méthode shouldMove 
    test('shouldMove returns false when direction is null', () => {
        const pacman = new Pacman(1, 0); //Vitesse = 1 et position initiale = 0
        pacman.dir = null; // direction définie à null 

        expect(pacman.shouldMove()).toBe(false); //vérifie que l'appel à shouldMove avec une direction nulle renvoie false
    });
    
    

});

