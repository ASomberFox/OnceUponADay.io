var $ = function( id ) { return document.getElementById( id ); };
// Story Option Functions

function Talking(character, expression, animation, filter, sound, speaker, text) {
    let target = $(character);
    target = storyAssets.get(character + "_" + expression);
    //append animation to target

    target.style = parseFilter(filter);

    //set sound to sound

    pushCharacters();
    target.style.visibility = "visible";
    target.style.filter = 'brightness(1)';
    console.log(target);
    $(character).replaceWith(target);
    $('speaker').textContent = character;
    $('Dialouge').textContent = text;

    return true;
}

function Scene(bg_img, state, animation, filter, sound, bg_Music) {
    $('background').replaceWith(storyAssets.get(bg_img + "_" + state));

    //append animation to target

    //set sound to make
    //set new bg music
}

function Voice(text, filter) {
    $('Voice').innerHTML = text;
    $('overlay').style.visibility = "hidden";
    $('Text').style.visibility = "hidden";
    $('Character_Container').style.opacity = 0;

    $('Voice').style.visibility = "visible";

    //Overlay a part transparent blue
}

function endVoice() {
    $('overlay').style.visibility = "visible";
    $('Text').style.visibility = "visible";
    $('Character_Container').style.opacity = 1;

    $('Voice').style.visibility = "hidden";

    //Overlay a part transparent blue
}

function Narration(text) {
    $('speaker').innerHTML = "";
    $('Dialouge').innerHTML = text;
}

var storyFunctions = new Map();

storyFunctions.set('Scene', Scene);
storyFunctions.set('Talking', Talking);
storyFunctions.set('Voice', Voice);
storyFunctions.set('endVoice', endVoice);
storyFunctions.set('Narration', Narration);

function pushCharacters() {
    let characters = document.getElementsByClassName('character');
    Array.from(characters).forEach((char) => {char.style.filter = 'brightness(0.5)';});

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
 * Parse filter input string and outputs the expected style data in format:
 * filter1: param;
 * filter2: param;
 * ...
 */
function parseFilter(param) {
    let steps = param.split(',');
    
    let retu = "";

    if (param != "none") {
        for (var item in steps) {
            retu = item + "\n";
        }

    }

    return retu;
}

/**
 * Takes in the String data in the defined format and outputs the repective constructed element.
 * @param {*} data The listed parts of the target data in String form.
 * @returns A created element from the inut data.
 */
function loadData(data) {
    let params = data.split('\t');
    console.log(params);
    let retu = new Image();
    retu.className = params[0];
    retu.id = params[1];
    retu.alt = params[1] + "_" + params[2];
    retu.src = params[3];
    retu.style = params[4];
    return retu;
}