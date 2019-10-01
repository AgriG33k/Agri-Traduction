/**
 * Ce script centralise les actions relatives à la gestion des propositions
 * - Ecoute de l'évènement "click" sur le bouton "Proposition" => affichage de la modale
 * - Ecoute de l'évènement sur la validation de la modale pour envoie du formulaire
 */


// Quand la page est chargée
$(document).ready(function() {

    // Ecoute du bouton Proposer
    var propositionBtn = document.querySelector('#proposer');
    propositionBtn.addEventListener('click', function (e) {
        // Stop !!!
        e.preventDefault();
        // Nettoyage du formulaire
        document.querySelector('#propositionForm').reset();
        document.getElementById("propositionModalAlert").style.display = 'none';

       // Ouverture de la modal
        $('#propositionModal').modal();
    
    }); // Fin de la gestion du click sur Proposer / Proposition

    // Ecoute du bouton
    var valider = document.querySelector('button.propositionModal');
    valider.addEventListener('click', function (e) {
        // Stop !
        const inputAuteur = document.querySelector('#auteur');
        const inputEmail = document.getElementById('email');
        const inputTexte = document.getElementById('texte');
        // const inputTraductions = document.getElementById('traductions');
        const divAlert = document.getElementById("propositionModalAlert");
        const form = document.querySelector('#propositionForm');
            
        e.preventDefault();
        
        // Validation du formulaire (s'occupe du message d'erreur)
        if(formulairePropositionValide(divAlert, inputAuteur, inputEmail, inputTexte)) {

            // Création des données
            const data = {};
            for (let index = 0; index < form.elements.length; index++) {
                const element = form.elements[index];
                data[element.name] = element.value;
            }
    
            // Valide. Donc soumission à l'API !
            window.fetch(API_URL_PROPOSITION, {
                method: 'POST',
                body: JSON.stringify(data)
            }).then((response) => {
                // Dépend de la réponse ...
                if(response.status === 201) {
                    // Voilà !
                    $('#propositionModal').modal('hide');
                    alert('MERCI !!!');
                    return;
                } 

                // Bon ...
                response.json().then((data) => {
                    console.log(data);
                    let error = "";
                    for(var key in data) { error += `${key} : ${data[key]} <br/>`; }
                    divAlert.style.display = 'block';
                    divAlert.innerHTML = error;
                });
                
            }).catch((error) => {
                console.error(error);
            });
            
        }
    });

});

/**
 * Valide qu'un formulaire est valide et affiche un message au besoin
 * TODO: séparer les deux actions
 */
function formulairePropositionValide(divAlert, inputAuteur, inputEmail, inputTexte) {

    
    let erreur = "";
    
    // console.log(email.validity);
    if (!inputAuteur.validity.valid) { erreur += " Auteur obligatoire <br/> "; }
    if (inputEmail.value && !inputEmail.validity.valid) { erreur += " Email invalide <br/>"; }
    if (!inputTexte.validity.valid) { erreur += " Texte obligatoire <br/>"; }

    // console.log(erreur);

    if(erreur.length > 0) {
        divAlert.style.display = 'block';
        divAlert.innerHTML = erreur;
        return false;
    } else {
        divAlert.style.display = 'none';
        return true;
    }

} // /formulairePropositionValide