const darkLightSwitch = document.getElementById('dark-light-switch');
let darkModeOn = false;

darkLightSwitch.addEventListener('click', darkMode);
function darkMode() {
    const main = document.getElementById('main');
    const h1 = document.querySelectorAll('h1');
    const h2 = document.querySelectorAll('h2');
    const titleTxt = document.querySelectorAll('.quiz-title-txt');
    const darkModeSun = document.getElementById('darkModeSun');
    const darkModeMoon = document.getElementById('darkModeMoon');
    const buttons = document.querySelectorAll('button');
    const question = document.querySelector('p');
    const progressBar = document.getElementById('progress-bar');
    const scoreCard = document.getElementById('score-card');
    const score = document.getElementById('score');
    if (!darkModeOn) {
        //dark mode settings
        darkModeOn = true;
        darkLightSwitch.style.alignItems = 'flex-end';
        main.style.backgroundColor = '#313E51';
        function updateBackgroundImage() {
            if (window.innerWidth > 1200) {
                main.style.backgroundImage = "url('../assets/images/pattern-background-desktop-dark.svg')";
            } else if (window.innerWidth > 700) {
                main.style.backgroundImage = "url('../assets/images/pattern-background-tablet-dark.svg')";
            } else {
                main.style.backgroundImage = "url('../assets/images/pattern-background-mobile-dark.svg')";
            }
        }
        window.addEventListener('resize', updateBackgroundImage);
        updateBackgroundImage();

        darkModeSun.src = 'assets/images/icon-sun-light.svg';
        darkModeMoon.src = 'assets/images/icon-moon-light.svg';
        //////////////////
        h1.forEach(h => {
            h.style.color = "white";
        });
        h2.forEach(h => {
            h.style.color = "#ABC1E1";
        });
        for (let button of buttons) {
            if (!button.classList.contains('purple')) {
                button.style.backgroundColor = "#3B4D66";
                button.style.color = "white";
                button.style.boxShadow = '0px 16px 40px rgba(59, 77, 102, 0.14)';
            }
        }
        titleTxt.forEach(title => {title.classList.add('whiteTxt')});
        question.classList.add('whiteTxt');
        progressBar.style.backgroundColor = '#3B4D66';

        scoreCard.style.backgroundColor = '#3B4D66';
        score.classList.add('whiteTxt');
        
    } else {
        //light mode settings
        darkModeOn = false;
        darkLightSwitch.style.alignItems = 'flex-start';
        main.style.backgroundColor = '#F4F6FA';
        function updateBackgroundImage() {
            if (window.innerWidth > 1200) {
                main.style.backgroundImage = "url('../assets/images/pattern-background-desktop-light.svg')";
            } else if (window.innerWidth > 700) {
                main.style.backgroundImage = "url('../assets/images/pattern-background-tablet-light.svg')";
            } else {
                main.style.backgroundImage = "url('../assets/images/pattern-background-mobile-light.svg')";
            }
        }
        window.addEventListener('resize', updateBackgroundImage);
        updateBackgroundImage();
        darkModeSun.src = 'assets/images/icon-sun-dark.svg';
        darkModeMoon.src = 'assets/images/icon-moon-dark.svg';
        /////////////////////////

        h1.forEach(h => { h.style.color = "#313E51"; });
        h2.forEach(h => { h.style.color = "#626C7F"; });

        for (let button of buttons) {
            if (!button.classList.contains('purple')) {
                button.style.backgroundColor = "white";
                button.style.color = "#313E51";
                button.style.boxShadow = '0px 16px 40px rgba(49, 62, 81, 0.14)';
            }
        }

        titleTxt.forEach(title => {title.classList.remove('whiteTxt')});
        question.classList.remove('whiteTxt');
        progressBar.style.backgroundColor = 'white';

        scoreCard.style.backgroundColor = 'white';
        score.classList.remove('whiteTxt');
    }
}