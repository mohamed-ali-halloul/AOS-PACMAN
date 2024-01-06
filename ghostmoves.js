import { DIRECTIONS, OBJECT_TYPE, DIRECTIONS_2 } from './setup';

// Fonction de mouvement aléatoire primitive
export function randomMovement(position, direction, objectExist) {
    // Initialiser les variables avec la direction actuelle et la prochaine position de déplacement
    let dir = direction;
    let nextMovePos = position + dir.movement;

    // Créer un tableau à partir des clés de l'objet de directions
    const keys = Object.keys(DIRECTIONS);

    // Boucler jusqu'à ce qu'une prochaine position de déplacement valide soit trouvée
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        // Obtenir une clé aléatoire à partir du tableau des clés de direction
        const key = keys[Math.floor(Math.random() * keys.length)];
        //La prochaine position (nextMovePos) est recalculée en utilisant la nouvelle direction.
        // Obtenir une clé aléatoire à partir du tableau des clés de direction
        dir = DIRECTIONS[key];

        // Définir la prochaine position de déplacement en utilisant la nouvelle direction
        nextMovePos = position + dir.movement;
    }

    // Renvoyer un objet avec la prochaine position de déplacement mise à jour et la direction
    return { nextMovePos, direction: dir };
}