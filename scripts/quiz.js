//pages
const menu = document.getElementById('menu');
const quiz = document.getElementById('quiz');
const completed = document.getElementById('completed');
//sections
const question = document.querySelector('p');
const title = document.querySelectorAll('.quiz-title');
const titleTxt = document.querySelectorAll('.quiz-title-txt');
const submit = document.getElementById('submit');
const progress = document.getElementById('progress');
const topBar = document.getElementById('top-bar');
const subjects = document.querySelectorAll('.subject');
// quiz type options
const subjectIcon = document.querySelectorAll('.subject-icon');
const subjectIconImg = document.querySelectorAll('.subject-icon-img');
let score = 0;


//menu buttons
for (let subject of subjects) {
    subject.addEventListener('click', function(){
        menu.classList.add('hidden');
        quiz.classList.remove('hidden');
        title.forEach(el => el.classList.remove('hidden'));
        topBar.style.justifyContent = 'space-between';
    });
}

function loadQuiz(quizType) {
    score = 0;
    let questionIndex = 0;
    let selectedAnswer = null;
    let showingResults = false;

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const selectedQuiz = data.quizzes.find(quiz => quiz.title === quizType);
        if (!selectedQuiz) return;

        const totalQuestions = selectedQuiz.questions.length;
        const letterOptions = ['A', 'B', 'C', 'D'];

        // set header
        titleTxt.forEach(el => el.innerText = selectedQuiz.title);
        subjectIconImg.forEach(el => {
            el.className = 'subject-icon-img';
            el.src =  selectedQuiz.icon;
            el.classList.add(`${selectedQuiz.title.toLowerCase()}-icon`);
        });

        function renderQuestion() {
            const questionObj = selectedQuiz.questions[questionIndex];
            const noAnswerErr = document.getElementById('noAnswerErr');
            question.innerText = questionObj.question;
            document.getElementById('question-number').innerText = questionIndex + 1
            progress.style.width = ((questionIndex) / totalQuestions) * 100 + '%';

            selectedAnswer = null;
            showingResults = false;
            submit.innerText = 'Submit Answer';
            submit.classList.remove('submitBg');

            letterOptions.forEach((letter, i) => {
                const button = document.getElementById(letter);
                const letterDiv = button.querySelector('.letter');
                const answerSpan = button.querySelector('.answer');
                const img = button.querySelector('img');
                img.classList.add('hidden');

                button.classList.remove('selected', 'correct', 'incorrect');
                button.disabled = false;
                answerSpan.innerText = questionObj.options[i];

                button.onclick = () => {
                    submit.classList.add('submitBg');
                    letterOptions.forEach(l => {
                        const btn = document.getElementById(l);
                        btn.classList.remove('selected');
                        noAnswerErr.classList.add('hidden');
                    });
                    selectedAnswer = answerSpan.innerText;
                    button.classList.add('selected');
                };
            });

            submit.onclick = () => {
                if (!showingResults) {
                    if (!selectedAnswer) {
                        //please select answer alert
                        document.getElementById('noAnswerErr').classList.remove('hidden');
                        return;
                    }
                    const correctAnswer = questionObj.answer;
                    letterOptions.forEach(letter => {
                        const btn = document.getElementById(letter);
                        const ans = btn.querySelector('.answer').innerText;
                        const img = btn.querySelector('img');

                        if (ans === correctAnswer) {
                            img.src = './assets/images/icon-correct.svg';
                            img.classList.remove('hidden');
                        }
                        if (ans === correctAnswer && selectedAnswer === correctAnswer) {
                            score++;
                            btn.classList.add('correct');
                        }
                        if (ans === selectedAnswer && ans !== correctAnswer) {
                            btn.classList.add('incorrect');
                            img.src = './assets/images/icon-incorrect.svg';
                            img.classList.remove('hidden');
                        }
                        btn.disabled = true;
                        btn.classList.add('disabled');
                    });

                    showingResults = true;
                    submit.innerText = questionIndex + 1 < totalQuestions ? 'Next Question' : 'Finish Quiz';
                } else {
                    //next question or finish
                    questionIndex++;
                    if (questionIndex < totalQuestions) {
                        renderQuestion();
                    } else {
                        quiz.classList.add('hidden');
                        completed.classList.remove('hidden');
                        document.getElementById('score').innerText = score;
                    }
                }
            }
        } renderQuestion();
    })
    .catch(error => console.error('Error fetching data', error));
}

document.getElementById('html').addEventListener('click', () => loadQuiz('HTML'));
document.getElementById('css').addEventListener('click', () => loadQuiz('CSS'));
document.getElementById('javascript').addEventListener('click', () => loadQuiz('JavaScript'));
document.getElementById('accessibility').addEventListener('click', () => loadQuiz('Accessibility'));

document.getElementById('play-again').addEventListener('click', () => {
    score = 0;
    completed.classList.add('hidden');
    menu.classList.remove('hidden');
    topBar.style.justifyContent = 'flex-end';

    title.forEach(el => el.classList.add('hidden'));
    subjectIconImg.forEach(img => {
        img.src = '';
        img.className = 'subject-icon-img';
    })
});