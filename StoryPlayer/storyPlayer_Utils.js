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

function Voice(text, filter="") {
    console.log("Voicing: " + text);
    logText(" ", text);
    $('Overlay').style.opacity = 0;
    $('Text').style.opacity = 0;
    $('Container').style.opacity = 0;
    let retu = showTextSlowly($('Voice'), text);
    return Promise.resolve();
}


function Narration(speaker='', text='', filter="") {
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
    return Promise.resolve();
}

function Character(focus=null, fadetime=0, chaining=true, ...characters) {
    $('Container').style.opacity = 1;
    blocked = chaining;
    let promises = [];
    let charCount = characters.length;
    characterList.forEach((target) => {
        target.style.opacity = 0;
        target.style.filter = 'brightness(0.75)';
    });
    for (let i = 0; i < characterList.length && i < charCount; i++) {
        let char = characterList[i];
        char.src = characters[i];
        char.style.filter = 'brightness(1)';
        char.style.visibility = 'visible';
        let xPos = (100 / (charCount + 1)) * (i + 1);
        char.style.left = `${xPos}%`;
        if (fadetime > 0) {
            let anim = char.animate([{opacity: 0}, {opacity: 1}],{duration: fadetime, fill: 'forwards'});
            promises.push(anim.finished);
        }
        else {
            char.style.opacity = 1;
        }        
    };

    if (focus != null) {
        for (let i = 0; i < characterList.length; i++) {
            if (i != focus) {
                characterList[i].style.filter = 'brightness(0.75)';
            }
        }
    }

    if (chaining) {
        return Promise.all(promises).then(()=>{blocked = false});
    }
    else {
        return Promise.resolve().then(()=>{blocked = false});
    }
}

function FadeOut(focus=0, fadetime=0, chaining=true) {
    let retu = Promise.resolve();
    blocked = chaining;
    if (focus >= 0) {
        let char = characterList[focus];
        char.style.filter = 'brightness(1)';
        char.style.visibility = 'visible';
        if (fadetime > 0) {
            let anim = char.animate([{opacity: 1}, {opacity: 0}],{duration: fadetime, fill: 'forwards'});
            retu = anim.finished;
        }
        else {
            char.style.opacity = 0;
        }
    }
    return retu.then(()=>{blocked = false});
}

function Blocker(a=0, r=0, g=0, b=0, afrom=255, rfrom=0, gfrom=0, bfrom=0, fadetime=0, chaining=true) {
    let blocker = $('Blocker');
    blocked = chaining;
    blocker.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    let anim = blocker.animate([{backgroundColor: `rgba(${rfrom}, ${gfrom}, ${bfrom}, ${afrom})`}, {backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`}],{duration: fadetime, fill: 'forwards'});
    if (chaining) {
        return anim.finished.then(()=>{blocked = false});
    }
    else {
        return Promise.resolve().then(()=>{blocked = false});
    }
}

function CameraShake(duration=1000, xstrength=5, ystrength=5, vibrato=10, randomness=90, fadeout=true, chaining=true) {
    let items = $('Items');
    blocked = chaining;
    let keyframes = [];
    let numberOfShakes = Math.floor(duration / (1000 / vibrato));
    for (let i = 0; i < numberOfShakes; i++) {
        let xOffset = (Math.random() * 2 - 1) * xstrength;
        let yOffset = (Math.random() * 2 - 1) * ystrength;
        keyframes.push({transform: `translate(${xOffset}%, ${yOffset}%)`});
    }
    if (fadeout) {
        keyframes.push({transform: 'translate(0%, 0%)'});
    }
    let anim = items.animate(keyframes, {duration: duration, fill: 'none'});
    if (chaining) {
        return anim.finished.then(()=>{blocked = false});
    }
    else {
        return Promise.resolve().then(()=>{blocked = false});
    }
}

function Delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function Stall() {
    return Promise.resolve(console.log("Stalling..."))
}

var storyFunctions = new Map();

storyFunctions.set('Scene', Scene);
storyFunctions.set('Voice', Voice);
storyFunctions.set('Narration', Narration);
storyFunctions.set('ResetBox', ResetBox);
storyFunctions.set('Character', Character);
storyFunctions.set('FadeOut', FadeOut);
storyFunctions.set('Blocker', Blocker);
storyFunctions.set('CameraShake', CameraShake);
storyFunctions.set('Delay', Delay);
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

function logText(speaker, text, filter="") {
    
    let line = document.createElement('div');
    line.className = "logLine";

    let speakerBox = document.createElement('span');
    speakerBox.className = "logSpeaker";
    speakerBox.textContent = speaker;

    let textBox = document.createElement('span');
    textBox.className = "logDialouge";
    textBox.textContent = text;

    let pointer = $('Current_Text');

    line.appendChild(speakerBox);
    line.appendChild(pointer);
    line.appendChild(textBox);

    $('Story_Text').appendChild(line);
    $('Current_Text').style.opacity = 1;

    $('Transcript').scrollTo(0, $('Transcript').scrollHeight);
    return;
}

function endStory() {
    // Get Story screen position

    // Get Story menu screen
    const url = "vignetteMenu.html"; // Get URL of main menu
    console.log(url);
    $('LS').style.visibility = 'visible';
    let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 500, fill: 'forwards'});
    anim.finished.then(() => {
        window.location.href = url;
    })
}