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

    traduction.hashtags.forEach(element => {
        hashtagText += " #" + element;
        hashtagShared += element + ",";
    });

    return `
        <div class="card-item" >
            <div class="card-body">
                <p class="card-text"> ${ text }</p>
                <p class="card-text"> ${ hashtagText } </p>
                <footer>
                  <p>Partager sur  : ` 
                  + templateTraductionReseau(traduction, url, sharedText, hashtagShared)
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
function templateTraductionReseau(traduction, url, sharedText, hashtagShared) {
    let retour = "";
    // Boucle sur les réseaux
    traduction.reseaux.forEach(reseau => {
        switch (reseau) {
            case "facebook":
                retour += `<a href="https://www.facebook.com/sharer/sharer.php?u=${ url }&t=${ sharedText }" class="share facebook" data-network="facebook"> <img width='32px' src='./assets/img/facebook.png'></a>`            
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
