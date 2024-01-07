import Pacman from './Pacman';
import { OBJECT_TYPE, DIRECTIONS } from './setup';

describe('Pacman Tests', () => {
    
    //Vérifie que l'instance de la class Pacman est correcte avec les propriétés initiales attendues  
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
    test('shouldMove returns true after the timer reaches speed', () => {
        const pacman = new Pacman(1, 0); 
        pacman.dir = { movement: 1 }; 
        pacman.timer = pacman.speed;

        expect(pacman.shouldMove()).toBe(true);
    });

    // Test de la méthode getNextMove 
    test('getNextMove returns the correct new position and direction', () => {
        const pacman = new Pacman(1, 0); 
        pacman.dir = { movement: 1 }; //simulation d'un déplacement vers la droite

        const result = pacman.getNextMove(() => false); // Fonction objectExist simulée qui retoune toujours false = pas de collision

        expect(result).toEqual({ nextMovePos: 1, direction: { movement: 1 } });
    });

    test('getNextMove handles collision with a wall', () => {
        const pacman = new Pacman(1, 0); 
        pacman.dir = { movement: 1 }; 

        const result = pacman.getNextMove(() => true); // Fonction objectExist simulée

        expect(result).toEqual({ nextMovePos: 0, direction: { movement: 1 } });
    });

    // Ici shouldMove renvoie true après que le minuteur atteint la vitesse

    test('shouldMove returns true after the timer reaches speed', () => {
        const pacman = new Pacman(1, 0); //instance avec vitesse=1 et position intialisé à 0
        pacman.dir = { movement: 1 }; // simulation d'un déplacement vers la droite
        pacman.timer = pacman.speed; // le minuteur a atteint la vitesse

        expect(pacman.shouldMove()).toBe(true);
    });

    // vérifie si la méthode getNextMove renvoie correctement la nouvelle position et la direction lorsque le prochain mouvement n'entraîne pas de collision avec un mur
    test('getNextMove returns the correct new position and direction', () => {
        const pacman = new Pacman(1, 0); 
        pacman.dir = { movement: 1 }; 

        const result = pacman.getNextMove(() => false); // Fonction objectExist simulée

        expect(result).toEqual({ nextMovePos: 1, direction: { movement: 1 } });
    });

    //ici la méthode getNextMove gère la collision avec un mur
    test('getNextMove handles collision with a wall', () => {
        const pacman = new Pacman(1, 0); 
        pacman.dir = { movement: 1 }; // Direction pour les tests : 1

        const result = pacman.getNextMove(() => true); // Fonction objectExist simulée

        expect(result).toEqual({ nextMovePos: 0, direction: { movement: 1 } });
    });

    // on peut ajouter d'autre méthodes pour êre à 100% de nos tests


