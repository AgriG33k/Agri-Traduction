let sources = [];

// Transformation de la zone en select
$(document).ready(function() {

    // Chargement du fichier JSON
    $.getJSON("./assets/traductions/traductions.json", function(json) {
        // Affectation
        sources = json;
        // Construction du tableau pour le select 2
        data = sources.map(function(item) { return { "id":item.code, "text":item.source }});
        $('select').select2({ 
			data: data,
			placeholder: 'Select an option'
			
		});
    });

    
    
});


// Gestion d'un évènement sur la sélection
$('#source').on('select2:select', function (e) {
    console.log("TATAT");
    // Récupération de la valeur
    var data = e.params.data;
    // Récupération de l'item sélectionné
    const selections = sources.filter(source => source.code == data.id);
    // Récupération
    if(selections.length > 0) {
        const item = selections[0];
        selectionItem(item, "#parametres", "#traduction");
    }
});
