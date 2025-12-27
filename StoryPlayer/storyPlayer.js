// Show loading screen



/**
 * Load Story Data
 */
var frameIndex = 0;     // The current story frame.
var preloadList = [];   // List of all assets to preload.
var summaryData = [];
var storyFrames = [];   // Story data for each frame.
var storyAssets = new Map();   // List of all story assets.
var characterList = []; // List of all character elements in the story.
var layerList = [];
var isTyping = false;
var blocked = false;
var backPage = localStorage.getItem('backPage');

function loadStory(script_path) {
    fetch(script_path)  // Fetch the script path.
        .then(response => response.json())  // Extract the data from the JSON file.
        .then(data => {

            console.log("Story frames: " + data.storyFrames);
            document.title = data.summary.Episode;  // Set the document title.

            preloadList = data.preload;         // Store the preload file data.
            console.log("Story assets: " + data.preload);

            let charCount = 0;
            let layerCount = 0;
            preloadList.forEach((obj) => {      // Load the data of each preload file.
                let ele = loadData(obj);
                if (ele.className == 'character') {     // Add any assets marked as characters for a set to make target elements.
                    let genericChar = loadData({"type" : "character",
                                    "name" : "character" + charCount,
                                    "state": "neutral",
                                    "path" : "./imgs/char/missing.png",
                                    "transformation" : "translate(-50%, -50%)"});
                    $('Container').appendChild(genericChar);
                    characterList.push(genericChar);
                    charCount += 1;
                }
                if (ele.className == 'layer') {     // Add any assets marked as characters for a set to make target elements.
                    let genericLayer = loadData({"type" : "layer",
                                    "name" : "layer" + layerCount,
                                    "state": "neutral",
                                    "path" : "./imgs/char/missing.png",
                                    "transformation" : "translate(-50%, -50%)"});
                    $('Items').appendChild(genericLayer);
                    layerList.push(genericLayer);
                    layerCount += 1;
                }
                storyAssets.set(ele.alt, ele);
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
            let anim = $('LS').animate([{opacity: 1}, {opacity: 0}],{duration: 500, fill: 'forwards'});
            anim.finished.then(() => {
                $('LS').style.visibility = 'hidden';
            })
        })
        .then(() => {    
            return new Promise((resolve) => {setTimeout(() => {resolve();}, 1500);
        });})
        .then(() => {(nextFrame())});
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
                endStory();
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
loadStory(localStorage.getItem('script_path'));
