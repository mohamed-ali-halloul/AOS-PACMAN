import { OBJECT_TYPE, DIRECTIONS } from './setup';


class Pacman {
    // Constructeur de Pacman
    constructor(vitesse, positionInitiale) {
        this.pos = positionInitiale; // Position initiale
        this.vitesse = vitesse; // Vitesse de Pacman
        this.dir = null; // Direction du déplacement
        this.timer = 0; // Minuterie pour le déplacement
        this.powerPill = false; // Indicateur indiquant si Pacman a une pilule de puissance
        this.rotation = true; // Indicateur indiquant si la rotation est activée
    }

    // Méthode pour vérifier si Pacman doit se déplacer
    shouldMove() {
        // Ne pas se déplacer avant qu'une touche ne soit pressée
        if (!this.dir) return;

        if (this.timer === this.vitesse) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    // Méthode pour obtenir le prochain déplacement de Pacman
    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        // Vérifier la collision avec un mur ou la cachette des fantômes
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

        // Retourner un objet avec les classes à supprimer et les classes à ajouter
        return { classesToRemove, classesToAdd };
    }

    // Méthode pour définir la nouvelle position de Pacman
    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    // Méthode pour gérer l'entrée au clavier pour Pacman
    handleKeyInput = (e, objectExist) => {
        let dir;

        // Vérifier si la touche pressée est une touche de flèche
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            dir = DIRECTIONS[e.key];
        } else {
            return; // Ne rien faire si une touche autre que les flèches est pressée
        }

        // Calculer la prochaine position de déplacement
        const nextMovePos = this.pos + dir.movement;

        // Vérifier si le prochain déplacement entre en collision avec un mur
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;

        // Définir la direction pour Pacman
        this.dir = dir;
    };
}

// Exporter la classe Pacman
export default Pacman;
