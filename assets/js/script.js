let sources = [];
let data = [];

// Transformation de la zone en select
$(document).ready(function() {
    
    

    // Chargement du fichier JSON
    $.getJSON(API_URL, function(json) {
        // Affectation
        sources = json;
        // Construction du tableau pour le select 2
        data = sources.map(function(item) { return { "id":item.code, "text":item.source }});
        data.unshift({ "id": "-1", "text": "" });
        $('select').select2({ 
            data: data,
            allowClear: true,
            placeholder:"Select an Title"
         });
    });
      
});

window.fbAsyncInit = function() {
    // 
    FB.init({
        appId            : FACEBOOK_APP_ID,
        autoLogAppEvents : true,
        xfbml            : false,
        version          : 'v4.0',
        status           : true
      });
};

// Gestion d'un évènement sur la sélection
$('#source').on('select2:select', function (e) {
    // Récupération de la valeur
    var data = e.params.data;
    // Récupération de l'item sélectionné
    const selections = sources.filter(source => source.code == data.id);
    // Récupération
    if(selections.length > 0) {
        const message = selections[0];
        selectionItem(message, "#parametres", "#traduction");
    }
});
