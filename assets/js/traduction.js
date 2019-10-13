

function selectionItem(item, selectorParemetres, selectorTraductions) {

    // Recuperation des elements
    const divParametres = document.querySelector(selectorParemetres);
    const divTraduction = document.querySelector(selectorTraductions);

    // Nettoyage
    nettoyerDiv(divParametres);

     // Est-ce la traduction des a des paramètres
     if(item.parametres) {
         item.parametres.forEach(param => creerElementParametres(divParametres, divTraduction, item, param));
     }
    
    // Création des traductions
    if(item.traductions) {
        gererTraductions(divTraduction, item);
    }
    
}

/**
 * Nettoyage d'un div
 * @param {*} div
 */
function nettoyerDiv(div) {
    // Récupération du parent
    const parent = div;
    // Nettoyage
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Créer la zone de saisie pour un paramètre
 * @param {*} parent L'élément HTML parent
 * @param {*} item l'élément sélectionné
 * @param {*} param Le paramètre en cours de traitement
 */
function creerElementParametres(divParametres, divTraduction, item, param) {
    // Création d'un div
    var div = document.createElement("div");
    div.setAttribute('class', 'col-6');
    // Création de l'élement
    var input = document.createElement("input");
    input.setAttribute('class', 'form-control');
    // Affectation des paramètres
    input.setAttribute('type', param.type);
    input.setAttribute('name', param.cle);
    input.setAttribute('id', param.cle);
    input.setAttribute('value', param.defaut);
    // Ajout d'un event
    input.addEventListener('change', (e) => {
        gererTraductions(divTraduction, item);
    })
    // Label
    var label = document.createElement("label");
    label.innerText = param.libelle;
    // Ajout
    div.appendChild(label);
    div.appendChild(input);
    divParametres.appendChild(div);
}

function gererTraductions(divTraduction, item) {
    // Nettoyage
    nettoyerDiv(divTraduction);

    // Récupération des valeurs des paramètres
    const valeurs = recupererValeurs(item);

    // Pour chaque item de traduction création d'un noeud
    item.traductions.forEach(traduction => {
        // Récupération du texte traduit avec gestion des formules
        const texteTraduit = obtenirTraduction(item, valeurs, traduction);
        // Création de l'élément DOM qui va être ajouté
        creerElementsTraduit(divTraduction, traduction, texteTraduit);
    });
}

/**
 * Retourne tableau contenant les valeurs pour les paramètres
 * @param {*} item 
 */
function recupererValeurs(item) {
    // Init du tableau
    const valeurs = [];
    // Boucle sur les valeurs
    item.parametres.forEach(param => {
        const val = document.querySelector('#' + param.cle).value;
        valeurs[param.cle] = val;
    });
    // Retour
    return valeurs;
}

/**
 * Retourne le message
 * @param message le message d'orgine
 * @param valeurs les valeurs saisies par l'utilisateur
 * @param traduction la traduction qui doit être gérée
 */
function obtenirTraduction(message, valeurs, traduction) {

    // Récupération du texte qui sert de traduction et sera mis à jour si des formules sont associées
    let text = traduction.traduction;
    
    // Des formules ?
    if(traduction.formules) {
        // Oui! 
        traduction.formules.forEach(item => {
            // Stockage de la formule
            let formula = item.formule;
            // Mise à jour en fonction des paramètres 
            message.parametres.forEach(param => { formula = formula.replace(param.cle, valeurs[param.cle]); });
            // Calcul
            const res = eval(formula);
            // Mise à jour du texte
            text = text.replace('[' + item.code + ']', new Intl.NumberFormat('fr-FR', { style: 'decimal', currency: 'EUR' }).format(res));
        });
    }
    
    return text;
}

/**
 * Créer un élément enfant présentant le message "traduit"
 * @param parent l'élément dans lequel le nouveau div va être ajouté
 * @param traduction l'objet traduction à l'origine du message
 * @param texteTraduit le texte traduit
 */
function creerElementsTraduit(parent, traduction, texteTraduit) {
    // Création de l'élement
    const row = document.createElement("div");
    row.setAttribute("class", "card");
    row.innerHTML = templateTraduction(traduction, texteTraduit);
    parent.appendChild(row);

    $('a.share').click(  function(e){ ouvrirNetwork(e);  });
}

/**
 * Gere un click sur les boutons de partage et ouvre une popup
 * @param {*} e 
 */
function ouvrirNetwork(e) {
    e.preventDefault();
    var $link   = $(e.target).parent();
    var href    = $link.attr('href');
    var network = $link.attr('data-network');

    var networks = {
        facebook : { width : 600, height : 300 },
        twitter  : { width : 600, height : 254 }
    };

    var popup = function(network){
        var options = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,';
        window.open(href, '', options+'height='+networks[network].height+',width='+networks[network].width);
    }

    popup(network);
}