
var frameIndex = 0;



// Show loading screen



/**
 * Load Story Data
 */
// Read Story CSV file
var csv_story = File('Story/testStory1.csv');
csv_story.open('r');
csv_story.encoding = 'UTF-8';
var story_data = csv_story.read().split('/\r\n|\n|\r/');
csv_story.close();
for (var row in story_data) {
    story_data[row].split('\t'); // Split each row into columns;
}

// Preload images
var elements_story = new Map();
var csv_preload = File('Story/testStory1_Preload.csv');
csv_preload.open('r');
csv_preload.encoding = 'UTF-8';
var preload_data = csv_preload.read().split('/\r\n|\n|\r/');
csv_preload.close();
for (var row in preload_data) {
    var cols = preload_data[row].split('\t'); // Split each row into columns;

    let img = new Image();
    //img.??? = cols[0];
    img.id = cols[1];
    img.className = cols[2];
    img.src = cols[3];
    img.transform = cols[4];
    elements_story.set(cols[1], img);

}

// Setup story player

function nextFrame() {
    frameIndex++;
    console.log("Displaying Frame: " + frameIndex);
    return true;
}

// Setup story player functions



// Load first frame



// Hide loading screen



// Play story



// Loading screen


/**
 * Image grabber. Grabs image based on name. Assumes image names are in the format folder_subfolder_filename
 * @param {*} name 
 * @returns 
 */
function getImage(name) {
    var parts = name.split('_');
    var img_path = parts[0] + '/' + parts[1] + '/' + parts[2] + '.png';
    return img_path;
}


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