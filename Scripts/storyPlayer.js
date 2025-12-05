// Show loading screen



/**
 * Load Story Data
 */
// Player and asset targets
var player = $('Story-box');
var bg = $('Background');

var frameIndex = 0;     // The current story frame.
var storyFrames = [];   // Story data for each frame.
var preloadList = [];   // List of all assets to preload.
var storyAssets = new Map();   // List of all story assets.
var characterSet = new Set();   // List of all unique characters in this story.
var isTyping = false;
var blocked = false;

// Load Story Data
var loadQueue = [];
loadQueue.push(loadTxt('Story/testStory1.tsv'));
loadQueue.push(loadTxt('Story/testStory1_Preload.tsv'));
/**
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
    if (!isTyping) {
        console.log("Setting up Frame: " + frameIndex);
        endVoice();
        var param = storyFrames[frameIndex].split('\t');
        console.log(param);

        storyFunctions.get(param[0])(...param.slice(1));

        console.log("Displaying Frame: " + frameIndex);
        frameIndex++;

        // If complete bring up loading screen
        // This is temp:
        if (frameIndex >= storyFrames.length) {
            frameIndex = 0;
            ResetBox();
        }
        console.log("Next Index: " + frameIndex);
    }
    else {
        isTyping = false;
    }
    return true;
}
*/

fetch('Story/testStory2.json')
    .then(response => response.json())
    .then(data => {
        storyFrames = data.storyFrames;
        console.log("Story frames: " + data.storyFrames);

        preloadList = data.preload;
        console.log("Story assets: " + data.preload);

        preloadList.forEach((obj) => {
            let ele = loadData(obj);
            if (ele.className == 'character') {
                characterSet.add(ele.id);
            }
            storyAssets.set(ele.alt, ele);
        });

        console.log("All loaded Character Assets: " + Array.from(characterSet).join(' '));

        characterSet.forEach((value) => {
            let tmp = loadData( {"type" : "character",
                                "name" : value,
                                "state": "neutral",
                                "path" : "/imgs/char/Kezia/neutral.png",
                                "transformation" : "translate(-50%, -50%)"});
            console.log("Character: " + value + " Added");
            //bg.after(tmp);
            $('Character_Container').appendChild(tmp);
        });

        console.log("Loading Complete!");

        // Load first frame
        nextFrame();
    })

function nextFrame() {
    if (!blocked) {
        if (!isTyping) {
            console.log("Playing Frame: " + frameIndex);
            
            let target = storyFrames[frameIndex];

            // For each element in array, draw the frame then pass the next element into .then
            target.operations.reduce((a, c) => a
                                            .then(() => 
                                                storyFunctions.get(c.function)(...c.param)), Promise.resolve())
                                            //Drawframe or storyFunctions should all return a Promise

            console.log("Displaying Frame: " + frameIndex);
            frameIndex++;

            // If complete bring up loading screen
            // This is temp:
            if (frameIndex >= storyFrames.length) {
                frameIndex = 0;
                ResetBox();
            }
            console.log("Next Index: " + frameIndex);
        }
        else {
            isTyping = false;
        }
        return true;
    }
}

// Enables play by spacebar
window.addEventListener('keydown', function(event) {
    if (event.key == ' ') {
        nextFrame();
    }
})



// document.getElementById('Dialouge').addEventListener('click', function() {
//     fetch('Text.txt')
//         .then(response => response.text())
//         .then(text => {
//             const dialogueLines = text.split('\n').filter(line => line.trim() !== '');
//             let nextText = '';
//             if (dialogueLines.length > 0 && counter < dialogueLines.length) {
//                 nextText = dialogueLines[counter];
//             } else {
//                 nextText = "End of dialogues.";
//             }

//             // If currently typing, finish instantly
//             if (isTyping) {
//                 clearInterval(typingInterval);
//                 typingInterval = null;
//                 isTyping = false;
//                 this.querySelector('Dialouge').textContent = currentText;
//             } else {
//                 showTextSlowly(this.querySelector('Dialouge'), nextText);
//                 if (counter < dialogueLines.length) counter++;
//             }
//         });
// });