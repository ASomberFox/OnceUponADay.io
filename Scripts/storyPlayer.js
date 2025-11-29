// Show loading screen



/**
 * Load Story Data
 */
// Player and asset targets
var player = $('story-box');
var bg = $('background');

var frameIndex = 0;     // The current story frame.
var storyFrames = [];   // Story data for each frame.
var preloadList = [];   // List of all assets to preload.
var storyAssets = new Map();   // List of all story assets.
var characterSet = new Set();   // List of all unique characters in this story.

// Load Story Data
var loadQueue = [];
loadQueue.push(loadTxt('Story/testStory1.tsv'));
loadQueue.push(loadTxt('Story/testStory1_Preload.tsv'));

// Preloads and preps all story data and assets
Promise.all(loadQueue)  // Ensure all data is loaded
    .then(([frames, assets]) => {
        storyFrames = frames;
        console.log("Story frames: " + frames);

        preloadList = assets;
        console.log("Story assets: " + assets);

        preloadList.forEach((obj) => {
            let ele = loadData(obj);
            if (ele.className == 'character') {
                characterSet.add(ele.id);
            }
            storyAssets.set(ele.alt, ele);
        });

        console.log("All loaded Character Assets: " + Array.from(characterSet).join(' '));

        characterSet.forEach((value) => {
            let tmp = loadData("character\t"+value+"\tneutral\t/imgs/char/missing.png\t visibility: hidden;");
            console.log("Character: " + value + " Added");
            //bg.after(tmp);
            $('Character_Container').appendChild(tmp);
        });

        console.log("Loading Complete!");

        // Load first frame
        nextFrame();
    });

function nextFrame() {
    console.log("Setting up Frame: " + frameIndex);
    endVoice();
    var param = storyFrames[frameIndex].split('\t');
    console.log(param);

    storyFunctions.get(param[0])(...param.slice(1));

    console.log("Displaying Frame: " + frameIndex);
    frameIndex++;

    // If complete bring up loading screen
    return true;
}

// Enables play by spacebar
window.addEventListener('keydown', function(event) {
    if (event.key == ' ') {
        nextFrame();
    }
})


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

document.getElementById('Dialouge').addEventListener('click', function() {
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
                this.querySelector('Dialouge').textContent = currentText;
            } else {
                showTextSlowly(this.querySelector('Dialouge'), nextText);
                if (counter < dialogueLines.length) counter++;
            }
        });
});