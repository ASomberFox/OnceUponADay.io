// Element s should be controlled with opacity.
// Visibility shall be used to disable interactions.

var $ = function( id ) { return document.getElementById( id ); };
// Story Option Functions

function Scene(bg_img, state, animation, filter="", sound="", bg_Music="", chaining=true) {
    $('Background').src = storyAssets.get(bg_img + "_" + state).src;

    let retu = null;        // Append animation to target.
    if (chaining) {     // If this animation is to be chained (in series) with other animations. Only move on OnFinish.
        retu = storyAnimations.get(animation)('Background', 1000, true);
    }
    else {      // Else, start animation and move on.
        retu = Promise.resolve();
    }
    //set sound to make -----
    //set new bg music -----
    return retu;
}

function Show(target, state, animation="", filter="", transformation="", chaining=true) {
    $('Container').style.opacity = 1;
    $(target).style.visibility = 'visible';
    $(target).src = storyAssets.get(target + "_" + state).src;
    $(target).style.filter += filter;
    $(target).style.transform += transformation;
    $('Text').style.opacity = 0;
    let retu = null;
    if (chaining) {
        retu = storyAnimations.get(animation)(target, 1000, true);
    }
    else {
        retu = Promise.resolve();
    }
    return retu.then(()=>{$('Text').style.opacity = 1;})
}

function Unshow(target) {
    $(target).style.visibility = 'hidden';
    return Promise.resolve();
}

function UnshowAllBut(targets) {

}

function Speaker(target) {
    orderCharacters(0.5);
    $(target).style.filter = 'brightness(1)';
    return Promise.resolve();
}

function Voice(text, filter="") {
    console.log("Voicing: " + text);
    logText(" ", text);
    $('Overlay').style.opacity = 0;
    $('Text').style.opacity = 0;
    $('Container').style.opacity = 0;
    let retu = showTextSlowly($('Voice'), text);
    return Promise.resolve();
}


function Narration(speaker, text, filter="") {
    console.log("Narrating: " + text);
    logText(speaker, text);
    $('Overlay').style.opacity = 1;
    $('Text').style.opacity = 1;
    $('Speaker').innerHTML = speaker;
    let retu = showTextSlowly($('Dialouge'), text);
    return Promise.resolve();
}

function ResetBox() {
    $('Background').src = "./imgs/bg/empty.jpg";
    $('Container').style.opacity = 0;
    Array.from($('Container').children).forEach((char) => {char.style.opacity = 0;});
    $('Overlay').style.opacity = 0;
    $('Text').style.opacity = 0;
    $('Speaker').innerHTML = "";
    $('Dialouge').innerHTML = "";
    $('Voice').innerHTML = "";
    return Promise.resolve()
}

function Stall() {
    return Promise.resolve(console.log("Stalling..."))
}

var storyFunctions = new Map();

storyFunctions.set('Scene', Scene);
storyFunctions.set('Show', Show);
storyFunctions.set('Unshow', Unshow);
storyFunctions.set('Speaker', Speaker);
storyFunctions.set('Voice', Voice);
storyFunctions.set('Narration', Narration);
storyFunctions.set('ResetBox', ResetBox);
storyFunctions.set('Stall', Stall);

function orderCharacters(brightness) {
    let characters = document.getElementsByClassName('character');
    Array.from(characters).forEach((char) => {char.style.filter = 'brightness(' + brightness + ')';});
}

/**
 * Takes in the String data in the defined format and outputs the repective constructed element.
 * @param {*} data The listed parts of the target data in JSON form.
 * @returns A created element from the input data.
 */
function loadData(data) {
    console.log(data);
    let retu = new Image();
    retu.className = data.type;
    retu.id = data.name;
    retu.alt = data.name + "_" + data.state;
    retu.src = data.path;
    retu.style.transform = data.transformation;
    retu.style.visibility = "hidden";
    return retu;
}

var textHeight = parseInt(getComputedStyle($('Current_Text')).top);
function logText(speaker, text, filter="") {
    
    let line = document.createElement('div');
    line.className = "logLine";

    let speakerBox = document.createElement('span');
    speakerBox.className = "logSpeaker";
    speakerBox.textContent = speaker;

    let textBox = document.createElement('span');
    textBox.className = "logDialouge";
    textBox.textContent = text;

    line.appendChild(speakerBox);
    line.appendChild(textBox);

    console.log(textHeight);

    $('Story_Text').appendChild(line);
    $('Current_Text').style.opacity = 1;
    $('Current_Text').style.top = textHeight + "px";
    textHeight = parseInt(line.clientHeight) + textHeight;

    $('Transcript').scrollTo(0, $('Transcript').scrollHeight);
    return;
}