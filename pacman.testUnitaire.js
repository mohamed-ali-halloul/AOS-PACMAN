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

    // on peut ajouter d'autres méthodes pour être à 100% de nos tests @jo

    test('makeMove returns the correct classes to add and remove', () => {
        const pacman = new Pacman(1, 0);
        const result = pacman.makeMove();
    
        expect(result.classesToRemove).toEqual([OBJECT_TYPE.PACMAN]);
        expect(result.classesToAdd).toEqual([OBJECT_TYPE.PACMAN]);
    });
    
    test('shouldMove returns false when direction is null', () => {
        const pacman = new Pacman(1, 0);
        pacman.dir = null;
    
        expect(pacman.shouldMove()).toBe(false);
    });
    
    test('shouldMove returns false when timer is less than speed', () => {
        const pacman = new Pacman(2, 0); // Adjust the speed for the test
        pacman.dir = { movement: 1 };
        pacman.timer = 1; // Set the timer less than speed
    
        expect(pacman.shouldMove()).toBe(false);
    });
    
    test('shouldMove returns true when timer equals speed', () => {
        const pacman = new Pacman(2, 0); // Adjust the speed for the test
        pacman.dir = { movement: 1 };
        pacman.timer = 2; // Set the timer equal to speed
    
        expect(pacman.shouldMove()).toBe(true);
    });
    
    test('shouldMove resets timer to 0 after reaching speed', () => {
        const pacman = new Pacman(2, 0); // Adjust the speed for the test
        pacman.dir = { movement: 1 };
        pacman.timer = 2; // Set the timer equal to speed
    
        expect(pacman.shouldMove()).toBe(true);
        expect(pacman.timer).toBe(0);
    });
    
// Test de la méthode handleKeyInput
test('handleKeyInput sets the correct direction when arrow key is pressed', () => {
    const pacman = new Pacman(1, 0);
    const mockObjectExist = jest.fn(() => false); // Fonction objectExist simulée

    // Appeler la méthode handleKeyInput avec un événement de touche flèche vers la droite
    pacman.handleKeyInput({ keyCode: 39, key: 'ArrowRight' }, mockObjectExist);

    // Vérifier que la direction a été correctement définie
    expect(pacman.dir).toEqual(DIRECTIONS['ArrowRight']);
});

test('handleKeyInput does nothing when a non-arrow key is pressed', () => {
    const pacman = new Pacman(1, 0);
    const mockObjectExist = jest.fn(() => false); // Fonction objectExist simulée

    // Appeler la méthode handleKeyInput avec un événement de touche non flèche
    pacman.handleKeyInput({ keyCode: 65, key: 'A' }, mockObjectExist);

    // Vérifier que la direction n'a pas été définie
    expect(pacman.dir).toBeNull();
});

test('handleKeyInput does nothing when collision with wall', () => {
    const pacman = new Pacman(1, 0);
    const mockObjectExist = jest.fn(() => true); // Fonction objectExist simulée

    // Appeler la méthode handleKeyInput avec un événement de touche flèche vers la droite
    pacman.handleKeyInput({ keyCode: 39, key: 'ArrowRight' }, mockObjectExist);

    // Vérifier que la direction n'a pas été définie en raison d'une collision avec un mur
    expect(pacman.dir).toBeNull();
});

