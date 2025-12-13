
function fadeIn(element, duration, blocking) {
    console.log('Animation Started');
    blocked = blocking;
    let anim = $(element).animate([{opacity: 0}, {opacity: 1}],{duration: duration, fill: 'forwards'});
    return anim.finished.then(()=>{blocked = false});
}

function fadeOut(element, duration, blocking) {
    console.log('Animation Started');
    blocked = blocking;
    let anim = $(element).animate([{opacity: 1}, {opacity: 0}],{duration: duration, fill: 'forwards'});
    return anim.finished.then(()=>{blocked = false});
}

function none(element) {
    console.log('Flat Display');
    $(element).style.opacity = 1;
    return Promise.resolve();
}

var currentText = '';
var typingInterval = null;
function showTextSlowly(element, text, speed = 60) {
    let i = 0;
    isTyping = true;
    currentText = text;
    element.textContent = '';

    // BEWARE of the RACE CONDITION!!!!
    // An empty string still takes 1 interval to die. 1 interval of time is enough for another
    // showTextSlowly function call to complete, overriding the typingInterval ID with the new one
    // and thus leaving the empty interval in limbo. The Empty Interval will thus clear the overridden
    // interval's ID and for any new intervals' IDs into limbo as it constantly sets typingInterval to
    // null.
    if (text.length > 0) {
        typingInterval = setInterval(() => {
            element.textContent = text.slice(0, ++i);
            if (i >= text.length || !isTyping) {
                clearInterval(typingInterval);
                typingInterval = null;
                isTyping = false;
                element.textContent = currentText;
            }
        }, speed);
    }
}

var storyAnimations = new Map();

storyAnimations.set('fadeIn', fadeIn);
storyAnimations.set('fadeOut', fadeOut);
storyAnimations.set('none', none);
storyAnimations.set('', Promise.resolve);