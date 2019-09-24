function parler(msg) {
    // alert(msg);
    responsiveVoice.speak(msg, "French Female");
}

/**
 * Nettoye le code des balises HTML
 * @param {*} html 
 */
function stripHtml(html){
    // Création d'un élement div
    var temporalDivElement = document.createElement("div");
    // Affectation
    temporalDivElement.innerHTML = html;
    // Suppression
    var res = temporalDivElement.textContent || temporalDivElement.innerText || "";
    // Remplacement
    return res.replace(/\'/g, " ");
}

/**
 * 
 * @param {*} traduction l'objet traduction 
 * @param {*} textTraduit le texte "traduit" 
 */
function templateTraduction(traduction, text) {
    // Calcul des variables
    const url = encodeURI('http://agri-traduction.fr');
    const sharedText = encodeURI(text);
    const speakText = stripHtml(text);
    let hashtagText = "";
    let hashtagShared = "";
    let hashTagFacebook = "";

    traduction.hashtags.forEach(element => {
        hashtagText += " #" + element;
        hashtagShared += element + ",";
        if(hashTagFacebook === "") { hashTagFacebook = hashtagText; }
    });

    return `
        <div class="card-item" >
            <div class="card-body">
                <p class="card-text"> ${ text }</p>
                <p class="card-text"> ${ hashtagText } </p>
                <footer>
                  <p>Partager sur  : ` 
                  + templateTraductionReseau(traduction, url, text, sharedText, hashtagShared, hashTagFacebook)
                  + `</p>
                  <img type="button" onclick='parler(" ${ speakText } "); ' src='./assets/img/voix1.png' width="30px" />
                </footer>
            </div> <!-- / card-body -->
        </div> <!-- / Card-item -->
    `;
}

/**
 * Gere ce qui est affiché pour un message
 * @param {*} traduction 
 * @param {*} sharedText Le texte qui partagé séparé des hastags
 * @param {*} hashtagShared
 */
function templateTraductionReseau(traduction, url, text, sharedText, hashtagShared, hashTagFacebook) {
    let retour = "";
    // Boucle sur les réseaux
    traduction.reseaux.forEach(reseau => {
        switch (reseau) {
            case "facebook":
                retour += `<a href="#" onclick='showModalFacebook("${ text }", "${hashTagFacebook}"); return false;' class="facebook" data-network="facebook"> <img width='32px' src='./assets/img/facebook.png'></a>`            
                break;
            case "twitter":
                retour += `<a href="https://twitter.com/intent/tweet?text=${ sharedText }&hashtags=${hashtagShared}" class="share twitter" data-network="twitter"><img width='66px' src='./assets/img/twitter.png'></a>`
                break;
            case "instagram":
                retour += `<a href="https://instagram.com" class="share twitter" data-network="twitter"><img src='./assets/img/instagram.png'></a>`
                break;
        }
    });
    // Fin
    return retour;

}

/**
 * Gestion de Facebook
 * @param {*} url 
 */
function showModalFacebook(text, hashTagFacebook) {
    // https://www.facebook.com/sharer/sharer.php?u=${ url }&t=${ sharedText }
    // Mise à jour du champs qui peut-être nécessaire en fonction des navigateurs
    document.querySelector("#facebookSharedText").value = text;
    // document.querySelector("#facebookHashtag").value = hashTagFacebook;

    // Création de la fonction qui va appeler FB.Ui
    var popup = function() {
        FB.ui({
            method: 'share',
            //  href: 'https://agri-traduction.fr',
            // quote: 'Le message qu on pourrait passer mais href est obligatoire !',
            hashtag: hashTagFacebook
            }, function(response){});
    } // /popup
    
    // Ouverture de la modal
    $('#facebookModal').modal();
    
    // Gestion du click sur le bouton
    $('button.facebookmodal').click( function(e) {
        e.preventDefault();
        // Fermeture de la modale
        $('#facebookModal').modal('hide');
        // Deux méthodes pour copier
        if(navigator.clipboard) {
            console.log('Passage par navigator.clipboard');
            // Retourne une promesse mais le temps que le popup se charge ... on a le temps !
            navigator.clipboard.writeText(text);
        } else {
            console.log('Passage par execCommand');
            // Passage par l'ancienne méthode
            document.querySelector("#facebookSharedText").select();
            document.execCommand( 'copy' );
        }
        // Appel pour la popup
        popup();
      
    });

} // /showModalFacebook
