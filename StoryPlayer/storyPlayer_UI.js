//Show transcript function:-----------------------------------------------------
function showTranscript() {
    $("Transcript").style.visibility = "visible";
}
function hideTranscript() {
    $("Transcript").style.visibility = "hidden";
}

//Show Skip Menu Function:------------------------------------------------------
function showSkip() {
    $("Skip-Menu").style.visibility = "visible";
}
function hideSkip() {
    $("Skip-Menu").style.visibility = "hidden";
}

//Hide UI Function:-------------------------------------------------------------
var UIHidden = false;

const btn_UIvis = $('UI_vis');
const userInterface = $('UI');

/**
 * Hide UI and pauses the autoplay
 */
// btn_UIvis.addEventListener('click', UIToggle);

function UIToggle() {
    console.log('UI Toggle Clicked');
    UIHidden = !UIHidden;
    if (UIHidden) {
        if (autoPlay) btn_Auto.click();
        userInterface.style.opacity = 0;
        $('Overlay').style.opacity = 0;
        $('Speaker').style.opacity = 0;
        $('Dialouge').style.opacity = 0;
    }
    else {
        userInterface.style.opacity = 1;
        $('Overlay').style.opacity = 1;
        $('Speaker').style.opacity = 1;
        $('Dialouge').style.opacity = 1;
    }

}


//Autoplay Function:------------------------------------------------------------
var autoPlay = false;
var autoSpeed = 0;
var autoInterval_Play;
var autoInterval_Text;
var autoSpeedEventListener;
const btn_Auto = $('Auto');
var arw = $('Auto_Rolling');

/**
 * Autoplay Button Implementation
 */
btn_Auto.addEventListener('click', function() {
    console.log("Auto Clicked");
    autoPlay = !autoPlay;
    autoSpeed++;
    autoSpeed = (autoSpeed > 1 ) ? 0 : autoSpeed;
    let off = $('Auto_off');
    let spd = $('Auto_Speed');

    if (autoPlay) {
        console.log("Auto On");
            clearInterval(autoInterval_Text);
            off.style.visibility = "hidden";
            spd.style.visibility = "visible";
            arw.style.visibility = "visible";
            autoInterval_Text = setInterval(animateText, 250);

            spd.textContent = "1 X";
            autoSpeed = 1;
            clearInterval(autoInterval_Play);
            autoInterval_Play = setInterval(nextFrame, 10000 / autoSpeed);

            autoSpeedEventListener = spd.addEventListener('click', function() {
                autoSpeed = (autoSpeed >= 64) ? 1 : autoSpeed * 2;
                spd.textContent = String(autoSpeed) + " X";

                console.log(autoSpeed);
                clearInterval(autoInterval_Play);
                autoInterval_Play = setInterval(nextFrame, 10000 / autoSpeed);
            })


    }
    else {
        console.log("Auto OFF");
            off.style.visibility = "visible";
            spd.style.visibility = "hidden";
            arw.style.visibility = "hidden";
            clearInterval(autoInterval_Play);

            spd.removeEventListener('click', autoSpeedEventListener);
            autoSpeed = 1;
    }
});

/**
 * Autoplay arrow player
 */
var autoText_Index = 0;
var autoArrow = "▶";
function animateText() {
    autoText_Index++;
    if (autoText_Index >= 3) {
        arw.innerHTML = "▶";
        autoText_Index = 0;
    }
    else {
        arw.innerHTML += " ▶"
    }
}
