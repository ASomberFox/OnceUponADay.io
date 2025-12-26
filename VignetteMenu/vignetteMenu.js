var $ = function( id ) { return document.getElementById( id ); };

var preloadList = [];   // List of all assets to preload.
var vignettes = [];   // Story data for each frame.
var locked = [];
var storyAssets = new Map();   // List of all story assets.
var input = localStorage.getItem('target');
var toPath = './' + input;

function loadMenu(input) {
    let script_path = './' + input + '/storyList.json';
    fetch(script_path)
        .then(response => response.json())
        .then(data => {
            console.log("Vignettes frames: " + data.stories);
            document.title = data.title;  // Set the document title.

            $('bgOverlay').style.backgroundColor = data.bg_color;   // Set the background color of the menu.
            $('banner').src = "./" + input + data.banner.path;  // Set the banner image of the menu.

            vignettes = data.stories;         // Store the preload file data.
            console.log("Story assets: " + data.stories);

            vignettes.forEach((obj) => {      // Load the data of each vignette file.
                let ele = makeVignette(obj);
                storyAssets.set(ele.id, ele);
            });

            locked = data.locked;         // Store the preload file data.
            console.log("Story assets: " + data.locked);

            locked.forEach((obj) => {      // Setup the locked vignettes.
                let ele = makeLockedVignette(obj);
                storyAssets.set(ele.id, ele);
            });

            console.log("All loaded Assets: " + Array.from(storyAssets).join(' '));
        })
        .then(() => {
            let anim = $('LS').animate([{opacity: 1}, {opacity: 0}],{duration: 500, fill: 'forwards'});
            anim.finished.then(() => {
                $('LS').style.visibility = 'hidden';
            })
        });
}

function makeVignette(vignetteData) {
    let vignette = document.createElement('div');
    vignette.className = 'vignette';
    vignette.id = vignetteData.title;
    vignette.href = toPath + vignetteData.path;

    let upper = document.createElement('div');
    upper.className = 'vignette-upper';


    let bg = document.createElement('img');
    bg.src = vignetteData.background;
    bg.className = 'vignette-bg';
    upper.appendChild(bg);

    let item = document.createElement('img');
    item.src = vignetteData.item;
    item.className = 'vignette-item';
    upper.appendChild(item);

    let mask = document.createElement('img');
    mask.src = "./VignetteMenu/imgs/locked_mask.png";
    mask.className = 'vignette-mask';
    upper.appendChild(mask);

    vignette.appendChild(upper);

    let lower = document.createElement('div');
    lower.className = 'vignette-lower';
    lower.style.backgroundImage = `url(./VignetteMenu/imgs/image_judge_dialog_bkg.png)`;

    let title = document.createElement('p');
    title.className = 'vignette-title';
    title.textContent = vignetteData.title;
    lower.appendChild(title);

    let btn = document.createElement('img');
    btn.src = "./VignetteMenu/imgs/mini_play_btn.png";
    btn.className = 'vignette-btn';
    lower.appendChild(btn);

    vignette.appendChild(lower);

    $('stories').appendChild(vignette);

    vignette.addEventListener('mouseover', function() {
        let level = 'brightness(0.75)';
        this.querySelector('.vignette-upper').style.filter = level;
        this.querySelector('.vignette-lower').style.filter = 'brightness(1.1)';
        this.querySelector('.vignette-btn').style.filter = level;
    });

    vignette.addEventListener('mouseleave', function() {
        let level = 'brightness(1)';
        this.querySelector('.vignette-upper').style.filter = level;
        this.querySelector('.vignette-lower').style.filter = level;
        this.querySelector('.vignette-btn').style.filter = level;
    });

    vignette.addEventListener('click', function() {
        const url = './storyPlayer.html'; // Get URL of main menu
        localStorage.setItem('script_path', this.href);
        localStorage.setItem('backPage', 'Relight.json');
        console.log(url);
        $('LS').style.visibility = 'visible';
        let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 100, fill: 'forwards'});
        anim.finished.then(() => {
            window.location.href = url;
        })
    });

    return vignette;
}

function makeLockedVignette(vignetteData) {
    let vignette = document.createElement('div');
    vignette.className = 'vignette';
    vignette.id = vignetteData.id;
    vignette.href = toPath + vignetteData.path;

    let upper = document.createElement('div');
    upper.className = 'vignette-upper';


    let bg = document.createElement('img');
    bg.src = vignetteData.background;
    bg.className = 'vignette-bg';
    bg.style.filter = 'brightness(0.75)';
    upper.appendChild(bg);

    let item = document.createElement('img');
    item.src = vignetteData.item;
    item.className = 'vignette-item';
    item.style.filter = 'brightness(0)';
    upper.appendChild(item);

    let overlay = document.createElement('img');
    overlay.src = "./VignetteMenu/imgs/confidential_mini.png";
    overlay.className = 'vignette-confidential';
    upper.appendChild(overlay);

    let mask = document.createElement('img');
    mask.src = "./VignetteMenu/imgs/locked_mask.png";
    mask.className = 'vignette-mask';
    upper.appendChild(mask);

    vignette.appendChild(upper);

    let lower = document.createElement('div');
    lower.className = 'vignette-lower';

    let title = document.createElement('p');
    title.className = 'vignette-title';
    title.textContent = vignetteData.title + "\n (W.I.P)";
    title.style.color = 'rgba(235, 235, 235, 1)';
    lower.appendChild(title);

    let arrow = document.createElement('img');
    arrow.src = "./VignetteMenu/imgs/unlock_btn.png";
    arrow.className = 'vignette-locked';
    lower.appendChild(arrow);

    vignette.appendChild(lower);

    $('stories').appendChild(vignette);

    return vignette;
}

$('Back').addEventListener('click', function() {
    const url = 'eventMenu.html'; // Get URL of main menu
    localStorage.setItem('target', 'Relight');
    console.log(url);
    $('LS').style.visibility = 'visible';
    let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 500, fill: 'forwards'});
    anim.finished.then(() => {
        window.location.href = url;
    })
});

$('Home').addEventListener('click', function() {
    const url = 'index.html'; // Get URL of main menu
    localStorage.setItem('target', 'Relight');
    console.log(url);
    $('LS').style.visibility = 'visible';
    let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 500, fill: 'forwards'});
    anim.finished.then(() => {
        window.location.href = url;
    })
});

loadMenu(input);