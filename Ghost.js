import { DIRECTIONS, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';

class Ghost {
    // Constructeur pour créer une instance de Ghost
    constructor(speed = 5, startPos, movement, name) {
        // Propriétés de la classe Ghost
        this.name = name;
        this.movement = movement; // Algorithme de mouvement du fantôme
        this.startPos = startPos;
        this.pos = startPos;
        this.dir = DIRECTIONS.ArrowRight; // Direction initiale (droite)
        this.speed = speed; // Vitesse de déplacement
        this.timer = 0;  // Minuteur pour contrôler la vitesse de déplacement
        this.isScared = false; // Indicateur si le fantôme a peur
        this.rotation = false; // Indicateur si le fantôme doit pivoter
    }
    // Méthode pour vérifier si le fantôme doit se déplacer en fonction du minuteur
    shouldMove() {
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }
    // Méthode pour obtenir la prochaine position de déplacement et la direction du fantôme
    getNextMove(objectExist) {
        // Appeler l'algorithme de mouvement pour déterminer le prochain déplacement
        const { nextMovePos, direction } = this.movement(
            this.pos,
            this.dir,
            objectExist
        );
        return { nextMovePos, direction };
    }
    // Méthode pour déterminer les classes à ajouter et à supprimer pour le déplacement du fantôme
    makeMove() {
        // Classes à supprimer (GHOST, SCARED, et le nom du fantôme)
        const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
        let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

        // Si le fantôme a peur, ajouter la classe SCARED aux classes à ajouter
        //quand Pac Man prend la pilule puissante, les fantômes deviennent 
        //bleus = effrayés et ensuite Pac Man peut les manger
        if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];

        return { classesToRemove, classesToAdd };
    }
    // Méthode pour définir la nouvelle position et direction du fantôme
    setNewPos(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction;
    }
}

export default Ghost;