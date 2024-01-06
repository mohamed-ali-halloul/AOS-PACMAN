import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup';

class GameBoard {
     // Nombre initial de points, grille et référence à la grille du DOM
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
    }

// Méthode pour afficher l'état du jeu (victoire ou fin de partie) à l'écran
    showGameStatus(gameWin) {
        // Créer une div pour l'état du jeu
        const div = document.createElement('div');
        // Ajouter la classe appropriée en fonction du résultat du jeu (victoire ou fin de partie)
        div.classList.add('game-status');
        // Définir le contenu interne de la div en fonction du résultat du jeu
        div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`;
         // Ajouter la div d'état du jeu à la grille du DOM
        this.DOMGrid.appendChild(div);
    }
    // Méthode pour créer la grille de jeu en fonction du niveau fourni
    createGrid(level, gridSize = GRID_SIZE) {
        // Réinitialiser le nombre de points et la grille
        this.dotCount = 0;
        this.grid = [];
        // Effacer le contenu existant de la grille du DOM
        this.DOMGrid.innerHTML = '';
        // Définir le nombre correct de colonnes en fonction de GRID_SIZE et CELL_SIZE
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${gridSize}, ${CELL_SIZE}px);`;

        // Parcourir chaque carré dans le niveau
        level.forEach((square) => {
            // Créer une div pour chaque carré
            const div = document.createElement('div');
            // Ajouter des classes à la div en fonction du type de carré
            div.classList.add('square', CLASS_LIST[square]);
            // Définir la largeur et la hauteur de la div en fonction de CELL_SIZE
            div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
            // Ajouter la div à la grille du DOM
            this.DOMGrid.appendChild(div);
            // Ajouter la div au tableau de la grille
            this.grid.push(div);

            // Si le carré représente un point, incrémenter le nombre de points
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
        });
    }
         // Méthode pour ajouter des classes à une position spécifique dans la grille
    addObject(pos, classes) {
        this.grid[pos].classList.add(...classes);
    }
         // Méthode pour supprimer des classes d'une position spécifique dans la grille
    removeObject(pos, classes) {
            this.grid[pos].classList.remove(...classes);
        }
         // Méthode pour vérifier si un objet spécifique existe à une position donnée dans la grille
    objectExist(pos, object) {
        return this.grid[pos].classList.contains(object);
    };
         // Méthode pour faire pivoter une div à une position spécifique dans la grille
    rotateDiv(pos, deg) {
        this.grid[pos].style.transform = `rotate(${deg}deg)`;
    }

    // Méthode pour déplacer un personnage sur la grille
    moveCharacter(character) {
        // Vérifier si le personnage doit se déplacer en fonction de sa minuterie
        if (character.shouldMove()) {
        // Obtenir la prochaine position de déplacement et la direction
            const { nextMovePos, direction } = character.getNextMove(
                this.objectExist.bind(this)
            );
            // Obtenir les classes à supprimer et à ajouter pour le déplacement du personnage
            const { classesToRemove, classesToAdd } = character.makeMove();
            // Si la rotation est activée et que la prochaine position de déplacement est différente de la position actuelle
            if (character.rotation && nextMovePos !== character.pos) {
                // Faire pivoter la div à la prochaine position de déplacement
                this.rotateDiv(nextMovePos, character.dir.rotation);
                // Faire pivoter la div précédente à sa rotation d'origine
                this.rotateDiv(character.pos, 0);
            }
            // Supprimer les classes de la position actuelle du personnage
            this.removeObject(character.pos, classesToRemove);
            // Ajouter les classes à la prochaine position de déplacement du personnage
            this.addObject(nextMovePos, classesToAdd);

            // Définir la nouvelle position et direction du personnage
            character.setNewPos(nextMovePos, direction);
        }
    }

    resetPacmanPosition(pacman) {
        this.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
        pacman.setNewPos(287); // Définit la position initiale ou toute position souhaitée
        this.addObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
    }

    // Méthode statique pour créer une instance de GameBoard et l'initialiser avec un niveau
    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid);
        board.createGrid(level);
        return board;
    }
}
// Exporter la classe GameBoard
export default GameBoard;