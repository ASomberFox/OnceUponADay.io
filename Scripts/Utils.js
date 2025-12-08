// Element s should be controlled with opacity.
// Visibility shall be used to disable interactions.

var $ = function( id ) { return document.getElementById( id ); };
// Story Option Functions

function Scene(bg_img, state, animation, filter="", sound="", bg_Music="", chaining=true) {
    //document.getElementsByClassName('background')[0].replaceWith(storyAssets.get(bg_img + "_" + state));

    $('Background').src = storyAssets.get(bg_img + "_" + state).src;
    //append animation to target
    let retu = null;
    if (chaining) {
        retu = storyAnimations.get(animation)('Background', 1000, true);
    }
    else {
        retu = Promise.resolve();
    }
    //set sound to make -----
    //set new bg music -----
    return retu;
}

function Show(target, state, animation="", filter="", transformation="", chaining=true) {
    $('Character_Container').style.opacity = 1;
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
    $('Overlay').style.opacity = 0;
    $('Text').style.opacity = 0;
    $('Character_Container').style.opacity = 0;
    let retu = showTextSlowly($('Voice'), text);
    return Promise.resolve();
}


function Narration(speaker, text, filter="") {
    console.log("Narrating: " + text);
    $('Overlay').style.opacity = 1;
    $('Text').style.opacity = 1;
    $('Speaker').innerHTML = speaker;
    let retu = showTextSlowly($('Dialouge'), text);
    return Promise.resolve();
}

function ResetBox() {
    $('Background').src = "/imgs/bg/empty.jpg";
    $('Character_Container').style.opacity = 0;
    Array.from($('Character_Container').children).forEach((char) => { char.style.opacity = 0;});
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
 * File grabber
 * @param {*} target 
 * @returns 
 */
async function loadTxt(target) {
    var retu = await fetch(target)
        .then(response => response.text())
        .then(text => { 
            var output = text.split('\n');
            return output;
        })
    return retu;
}

/**
 * Image grabber. Grabs image based on name. Assumes image names are in the format folder_subfolder_filename
 * @param {*} name The name of the image
 * @returns The path to the image
 */
function getImage(name) {
    var parts = name.split('_');
    var img_path = parts[0] + '/' + parts[1] + '/' + parts[2] + '.png';
    return img_path;
}

/**
 * Takes in the String data in the defined format and outputs the repective constructed element.
 * @param {*} data The listed parts of the target data in String form.
 * @returns A created element from the inut data.
 */
// function loadData(data) {
//     let params = data.split('\t');
//     console.log(params);
//     let retu = new Image();
//     retu.className = params[0];
//     retu.id = params[1];
//     retu.alt = params[1] + "_" + params[2];
//     retu.src = params[3];
//     retu.style = params[4];
//     return retu;
// }

function loadData(data) {
    console.log(data);
    let retu = new Image();
    retu.className = data.type;
    retu.id = data.name;
    retu.alt = data.name + "_" + data.state;
    retu.src = data.path;
    retu.style.transform = data.transformation;
    return retu;
}