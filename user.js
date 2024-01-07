import UserService from "./users/services"; // Assurez-vous d'avoir le chemin correct

document.getElementById('submitBtn').addEventListener('click', function () {
    // Récupérez la valeur du champ de saisie
    var nomValue = document.getElementById('nom').value;

    // Appelez le service d'API pour effectuer une requête POST
    UserService.login({ nom: nomValue })
        .then(response => {
            // Gérez la réponse de votre API ici
            console.log('API Response:', response.data);

            // Exemple : Afficher la réponse sur la page
           
        })
        .catch(error => {
            // Gérez les erreurs de la requête ici
            console.error('Error:', error);

            // Exemple : Afficher l'erreur sur la page
            alert('Error: ' + error.message);
        });
});
