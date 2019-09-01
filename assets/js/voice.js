// Récupération des libs
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// Initialisation des éléments
var grammar = '#JSGF V1.0; grammar phrase;';
var  recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Gestion du bouton
var testBtn = document.querySelector('#mic');
testBtn.addEventListener('click', function () {
    recognition.start();
    console.log('Ready to receive a color command.');
});

// Gestion de l'écoute
recognition.onresult = function (event) {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    console.log('Speech received: ' + speechResult + '.');

    // Recherche de la phrase dans la liste
    const selections = sources.filter(item => item.source.toLowerCase() == speechResult );
    console.log(selections);

    if(selections.length > 0) {
        // Récupération
        const item = selections[0];
        // Changement du select 2
        $('#source').val(item.code);
        $('#source').trigger('change');
        // Sélection de l'item
        selectionItem(item, "#parametres", "#traduction");
        // Lecture du son
        parler(item.traductions[0].traduction);
    }
    
}

// Fin de l'écoute
recognition.onspeechend = function () {
    recognition.stop();
}