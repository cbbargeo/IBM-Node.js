let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
// Define o texto de teste
document.getElementById("inputText").value = testText;

// Redefine a entrada e saída do usuário
let userInput = document.getElementById("userInput");
userInput.value = "";
userInput.readOnly = false;
userInput.focus();

document.getElementById("output").innerHTML = "";

// Inicia o cronômetro
startTime = new Date().getTime();
}

 function endTest() {
    endTime = new Date().getTime();

    // Desabilita a entrada do usuário
    document.getElementById("userInput").readOnly = true;

    // Calcula o tempo decorrido e palavras por minuto (WPM)
    var timeElapsed = (endTime - startTime) / 1000; // em segundos
    var userTypedText = document.getElementById("userInput").value;

    // Divide o texto usando regex para contar as palavras corretamente
    var typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    }).length;

    var wpm = 0; // Valor padrão

    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }

    // Exibe os resultados
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Resultados do Teste de Digitação:</h2>" +
        "<p>Palavras Digitadas: " + typedWords + "</p>" +
        "<p>Tempo Decorrido: " + timeElapsed.toFixed(2) + " segundos</p>" +
        "<p>Palavras Por Minuto (WPM): " + wpm + "</p>";
}

