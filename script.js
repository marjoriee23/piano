const questions = [
  {
    question: "Quelle touche blanche se trouve juste avant un groupe de deux touches noires ?",
    choices: ["Ré", "Do", "Fa", "Sol"],
    answer: 1,
    explication: "La touche blanche juste avant un groupe de deux touches noires est toujours un Do."
  },
  {
    question: "Qui a inventé le piano et vers quelle année ?",
    choices: ["Erard, vers 1750", "Steinway, vers 1800", "Bartolomeo Cristofori, vers 1700", "Bach, vers 1720"],
    answer: 2,
    explication: "Bartolomeo Cristofori a inventé le piano vers 1700 et l'a nommé « gravicembalo col piano e forte »."
  },
  {
    question: "Comment peut-on appeler la touche noire entre Do et Ré ?",
    choices: ["Mi bémol ou Fa dièse", "Do dièse ou Ré bémol", "Ré dièse ou Mi bémol", "Si dièse ou Do bémol"],
    answer: 1,
    explication: "La touche noire entre Do et Ré s'appelle Do dièse (#) ou Ré bémol (b) selon le contexte musical."
  },
  {
    question: "Quelle clé est utilisée pour la main gauche sur une partition de piano ?",
    choices: ["Clé de sol", "Clé d'ut", "Clé de fa", "Clé de ré"],
    answer: 2,
    explication: "La main gauche utilise la clé de fa (portée du bas), la main droite utilise la clé de sol."
  },
  {
    question: "Que signifie la mesure 4/4 sur une partition ?",
    choices: ["4 notes par portée", "4 temps par mesure", "Jouer à 4 doigts", "La pièce dure 4 minutes"],
    answer: 1,
    explication: "La mesure 4/4 indique qu'il y a 4 temps par mesure, c'est l'une des plus courantes en musique."
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  const q = questions[currentIndex];

  document.getElementById('question-num').textContent =
    `Question ${currentIndex + 1} / ${questions.length}`;
  document.getElementById('question').textContent = q.question;

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => selectAnswer(i));
    choicesDiv.appendChild(btn);
  });

  document.getElementById('feedback').className = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(chosen) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = document.querySelectorAll('#choices button');
  buttons.forEach(btn => btn.disabled = true);

  buttons[q.answer].classList.add('correct');

  const feedback = document.getElementById('feedback');
  if (chosen === q.answer) {
    score++;
    feedback.className = 'ok';
    feedback.textContent = '✓ Correct ! ' + q.explication;
  } else {
    buttons[chosen].classList.add('wrong');
    feedback.className = 'ko';
    feedback.textContent = '✗ Incorrect. ' + q.explication;
  }

  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'inline-block';
  nextBtn.textContent = currentIndex === questions.length - 1
    ? 'Voir le résultat'
    : 'Question suivante';
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  const container = document.getElementById('quiz-container');

  container.innerHTML = `
    <div id="score-box">
      <h2>Résultat du quiz</h2>
      <div class="score-num">${score}/${questions.length}</div>
      <button id="restart-btn" onclick="location.reload()">Recommencer</button>
    </div>
  `;
}
loadQuestion();




