// Show loading screen



/**
 * Load Story Data
 */
var frameIndex = 0;     // The current story frame.
var preloadList = [];   // List of all assets to preload.
var summaryData = [];
var storyFrames = [];   // Story data for each frame.
var storyAssets = new Map();   // List of all story assets.
var characterSet = new Set();   // List of all unique characters in this story.
var isTyping = false;
var blocked = false;

function loadStory(script_path) {
    fetch(script_path)  // Fetch the script path.
            .then(response => response.json())  // Extract the data from the JSON file.
            .then(data => {

                console.log("Story frames: " + data.storyFrames);

                preloadList = data.preload;         // Store the preload file data.
                console.log("Story assets: " + data.preload);

                preloadList.forEach((obj) => {      // Load the data of each preload file.
                    let ele = loadData(obj);
                    if (ele.className == 'character') {     // Add any assets marked as characters for a set to make target elements.
                        characterSet.add(ele.id);
                    }
                    storyAssets.set(ele.alt, ele);
                });

                console.log("All loaded Character Assets: " + Array.from(characterSet).join(' '));

                characterSet.forEach((value) => {       // Make a unique element for each unique character to act as targets.
                    let tmp = loadData( {"type" : "character",
                                        "name" : value,
                                        "state": "neutral",
                                        "path" : "./imgs/char/missing.png",
                                        "transformation" : "translate(-50%, -50%)"});
                    console.log("Character: " + value + " Added");

                    $('Container').appendChild(tmp);        // Assign each unique character target to character container.
                });
                

                summaryData = data.summary;
                $('Chapter').textContent = summaryData.Chapter;
                $('Episode').textContent = summaryData.Episode;
                $('Series').textContent = summaryData.Series;
                $('Summary-Text').textContent = summaryData.Summary;

                storyFrames = data.storyFrames;     // Store the story frames.

                console.log("Loading Complete!");
                // Load first frame
                //nextFrame();
            })
            .then(() => {
                let anim = $('LS').animate([{opacity: 1}, {opacity: 0}],{duration: 2500, fill: 'forwards'});
                anim.finished.then(() => {
                    $('LS').style.visibility = 'hidden';
                })
            });
}

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
        }
        else {
            isTyping = false;
        }
    }
}

// Enables play by spacebar
window.addEventListener('keydown', function(event) {
    if (event.key == ' ') {
        nextFrame();
    }
})

// Run Scritps
loadStory('Story/testStory2.json');
