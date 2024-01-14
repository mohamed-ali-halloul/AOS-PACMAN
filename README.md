# Jeu Pac-Man

## Description
Le jeu Pac-Man est une implémentation simple du jeu d'arcade classique Pac-Man en utilisant React.
Il a été réalisé par 3 étudiants en Master 2 Miage spécialisé en Ingénierie Logiciel pour le Web
Ce jeu fournit des services dans l'API avec les méthodes CRUD


## Fonctionnalités
- Pac-Man peut se déplacer à travers le labyrinthe et manger de la nourriture.
- Les fantômes errent dans le labyrinthe, et Pac-Man doit les éviter.
- Les pilules de puissance donnent à Pac-Man la capacité de manger les fantômes.

## Technologies Utilisées
- Node.js, Javascript et Parceljs
- HTML, CSS

## Mise en Route
Suivez ces instructions pour obtenir une copie du projet sur votre machine locale à des fins de développement et de test.

### Prérequis
- Node.js (https://nodejs.org/en/download) et npm installés sur votre machine.

### Installation
1. Clonez le dépôt sur votre machine locale :
   
   git clone https://github.com/mohamed-ali-halloul/AOS-PACMAN/jeu-pacman.git
   #Changer de répertoire 2 fois!
   cd pacman
   cd pacman
   
   #Installez les dépendances :
   npm install
   
   #Démarrez le serveur de développement :
   npm run start
   
  Visitez http://localhost:1234 dans votre navigateur web pour jouer à Pac-Man.

2. Nos Tests unitaires sont executés avec Jest dans le fichier pacman.testUnitaire. js.  Pour executer les tests sur votre répertoire, assurez-vous que Jest est installé dans votre projet.  Si ce n'est pas le cas, vous pouvez l'installer en utilisant la commande suivante sur votre terminal :
  
  npm install --save-dev jest
  
  ### Vérifier dans votre fichier package.json dans la section "script" l'existance de la commande jest et que Jest est correctement installé 

  ### Une fois que Jest est correctement installé et configuré, vous pouvez Faire :
   npm test

  ### En cas de problème, vérifier que toutes les dépendances de tests jest sont sur votre fichier package.json.  Si tel n'est pas le cas, installé jest dans sa globalité et faire :
   npm install -g jest
  ### Sinon vérifier la dénomination de votre fichier de test et le chémin testMatch associé
  
  ### Pour run les services du backend, veuillez installer axios :
   npm install axios
   
   ### Pour vérifier la couverture de notre code 
   npx jest --coverage



  ### LICENSE
Ce projet est sous licence MIT.

