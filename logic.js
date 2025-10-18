

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById('perguntas');
const choiceElements = document.querySelectorAll('.texto-escolha');
const choiceContainers = document.querySelectorAll('.container-escolha');
const usernameInput = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScoreElement = document.getElementById('finalScore');

const questions = [
    {
        question: "Qual linguagem é usada para estilizar páginas web?",
        choices: ["HTML", "CSS", "JavaScript", "Python", "PHP"],
        correct: 1
    },
    {
        question: "Qual tag HTML é usada para criar um parágrafo?",
        choices: ["<p>", "<para>", "<text>", "<div>", "<span>"],
        correct: 0
    },
    {
        question: "Qual propriedade CSS é usada para alterar a cor do texto?",
        choices: ["text-color", "font-color", "color", "text-style", "font-style"],
        correct: 2
    },
    {
        question: "Qual método JavaScript é usado para selecionar um elemento pelo ID?",
        choices: ["querySelector", "getElementById", "selectElement", "findElement", "getElement"],
        correct: 1
    },
    {
        question: "Qual tag HTML é usada para criar um link?",
        choices: ["<link>", "<a>", "<href>", "<url>", "<navigation>"],
        correct: 1
    },
    {
        question: "Qual propriedade CSS é usada para criar espaço entre as bordas de um elemento e seu conteúdo?",
        choices: ["margin", "spacing", "padding", "border-space", "gap"],
        correct: 2
    },
    {
        question: "Qual destes NÃO é um tipo de dado primitivo em JavaScript?",
        choices: ["String", "Boolean", "Number", "Array", "Undefined"],
        correct: 3
    },
    {
        question: "Qual tag HTML é usada para incluir JavaScript em uma página?",
        choices: ["<javascript>", "<script>", "<js>", "<code>", "<program>"],
        correct: 1
    },
    {
        question: "Qual propriedade CSS é usada para alterar o tipo de fonte?",
        choices: ["font-style", "font-family", "text-font", "font-type", "text-family"],
        correct: 1
    },
    {
        question: "Qual método JavaScript é usado para adicionar um elemento ao final de um array?",
        choices: ["push()", "append()", "addToEnd()", "insertLast()", "add()"],
        correct: 0
    },
    {
        question: "Qual tag HTML é usada para criar uma lista ordenada?",
        choices: ["<ul>", "<ol>", "<li>", "<list>", "<ordered>"],
        correct: 1
    },
    {
        question: "Qual propriedade CSS é usada para tornar um elemento invisível?",
        choices: ["visibility: hidden", "display: none", "opacity: 0", "hidden: true", "Todas as anteriores"],
        correct: 4
    },
    {
        question: "Qual destes operadores JavaScript é de comparação de igualdade estrita?",
        choices: ["==", "===", "=", "!=", "!=="],
        correct: 1
    },
    {
        question: "Qual tag HTML é usada para criar um campo de entrada de texto?",
        choices: ["<input>", "<textfield>", "<text>", "<textbox>", "<field>"],
        correct: 0
    },
    {
        question: "Qual propriedade CSS é usada para controlar o layout de elementos em uma página?",
        choices: ["layout", "display", "position", "float", "Todas as anteriores"],
        correct: 1
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    
    choiceContainers.forEach((container, index) => {
        container.addEventListener('click', () => selectChoice(index));
    });


});

function showScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar tela solicitada
    document.getElementById(screenId).classList.add('active');
    
    // Inicializar tela do jogo se necessário
    if (screenId === 'jogo') {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        loadQuestion();
    }
}

// Carregar questão
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }
    
    const question = questions[currentQuestion];
    
    // Atualizar texto da pergunta
    questionElement.textContent = `${currentQuestion + 1}. ${question.question}`;
    
    // Atualizar opções
    choiceElements.forEach((choice, index) => {
        if (index < question.choices.length) {
            choice.textContent = question.choices[index];
            choice.parentElement.style.display = 'flex';
        } else {
            choice.parentElement.style.display = 'none';
        }
    });
    
    // Resetar seleção visual
    resetChoiceSelection();
}

// Selecionar escolha
function selectChoice(choiceIndex) {
    // Resetar seleção visual de todas as opções
    resetChoiceSelection();
    
    // Adicionar classe de seleção à opção clicada
    choiceContainers[choiceIndex].classList.add('selected');
    
    // Armazenar resposta do usuário
    userAnswers[currentQuestion] = choiceIndex;
    
    // Aguardar um pouco e avançar para próxima questão
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 125);
}

// Resetar seleção visual
function resetChoiceSelection() {
    choiceContainers.forEach(container => {
        container.classList.remove('selected', 'correct', 'incorrect');
    });
}

// Mostrar resultados
function showResults() {
    // Calcular pontuação
    score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    
    // Atualizar elementos de resultado
    document.getElementById('correct-answers').textContent = score;
    document.getElementById('wrong-answers').textContent = questions.length - score;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
    // Mostrar mensagem de desempenho
    const performanceMessage = document.getElementById('performance-message');
    performanceMessage.textContent = getPerformanceMessage(percentage);
    performanceMessage.className = `performance-message ${getPerformanceClass(percentage)}`;
    
    // Mostrar tela de resultados
    showScreen('resultados');
}

// Obter mensagem de desempenho
function getPerformanceMessage(percentage) {
    if (percentage >= 90) {
        return "Excelente!";
    } else if (percentage >= 75) {
        return "Boa taxa de acertos"
    } else if (percentage >= 60) {
        return "Passou";
    } else {
        return "Precisa melhorar!";
    }
}

// Obter classe de desempenho
function getPerformanceClass(percentage) {
    if (percentage >= 90) {
        return "excellent";
    }
      else if (percentage >= 75) {
        return "great";
    } else if (percentage >= 60) {
        return "good";
    } else {
        return "poor";
    }
}

// Reiniciar quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    if (usernameInput) {
        usernameInput.value = "";
        saveScoreBtn.disabled = true;
    }
    showScreen('jogo');
}