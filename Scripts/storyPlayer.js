const dialogues = document.querySelector('.story-box');

var typingInterval = null;
var isTyping = false;
var currentText = '';

var counter = 0;

function showTextSlowly(element, text, speed = 30) {
    let i = 0;
    isTyping = true;
    currentText = text;
    element.textContent = '';
    typingInterval = setInterval(() => {
        element.textContent = text.slice(0, ++i);
        if (i >= text.length) {
            clearInterval(typingInterval);
            typingInterval = null;
            isTyping = false;
        }
    }, speed);
}

dialogues.addEventListener('click', function() {
    fetch('Text.txt')
        .then(response => response.text())
        .then(text => {
            const dialogueLines = text.split('\n').filter(line => line.trim() !== '');
            let nextText = '';
            if (dialogueLines.length > 0 && counter < dialogueLines.length) {
                nextText = dialogueLines[counter];
            } else {
                nextText = "End of dialogues.";
            }

            // If currently typing, finish instantly
            if (isTyping) {
                clearInterval(typingInterval);
                typingInterval = null;
                isTyping = false;
                this.querySelector('.dialouge').textContent = currentText;
            } else {
                showTextSlowly(this.querySelector('.dialouge'), nextText);
                if (counter < dialogueLines.length) counter++;
            }
        });
});

// const storyBox = document.querySelector('.story-box');

// function loadStory(element, frame) {
//     let img = new Image();
//     img.src = 'imgs/bg/test_1.png';
//     img.classList.add('bg');
//     element.appendChild(img);

//     let char1 = new Image();
//     char1.src = 'imgs/char/Kezia/happy.png';
//     char1.classList.add('character');
//     char1.style="transform: scaleX(-1); left: -5%; bottom: -30%;";
//     element.appendChild(char1);

//     let char2 = new Image();
//     char2.src = 'imgs/char/Andra/happy.png';
//     char2.classList.add('character');
//     char2.style="transform: scaleX(1); right: -5%; bottom: -30%;";
//     element.appendChild(char2);

//     let overlay = document.createElement('div');
//     overlay.classList.add('overlay');
//     element.appendChild(overlay);

//     let speaker = document.createElement('p');
//     speaker.classList.add('speaker');
//     speaker.textContent = "Kezia";
//     element.appendChild(speaker);

//     let dialouge = document.createElement('p');
//     dialouge.classList.add('dialouge');
//     dialouge.textContent = "text";
//     element.appendChild(dialouge);
// }