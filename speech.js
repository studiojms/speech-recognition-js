(function() {
  const startBtn = document.querySelector('#start');
  const output = document.querySelector('#output');
  const languageSelect = document.querySelector('#language');

  //dispara a api webkitSpeechRecognition
  startBtn.addEventListener('click', () =>
    startSpeechRecognition(output, languageSelect.options[languageSelect.selectedIndex].value)
  );
})();

function startSpeechRecognition(outputElement, language = 'pt-BR') {
  const recognitionAPI = new webkitSpeechRecognition();
  recognitionAPI.continuous = true;
  recognitionAPI.interimResults = true;
  recognitionAPI.lang = language;
  recognitionAPI.continuous = true;
  recognitionAPI.start();

  // Evento indicanto que houve fala no microfone
  recognitionAPI.onresult = function(event) {
    for (let speech of event.results) {
      if (speech[0].confidence > 0.8) {
        console.log(speech[0].transcript);
      }
    }

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        // Captura conteúdo falado após termino da frase (isFinal)
        const content = event.results[i][0].transcript.trim();
        outputElement.textContent = content;

        if (content.match(/alert.+/gi)) {
          alert('Congratulations! You won!');
        }
      }
    }
  };
}
