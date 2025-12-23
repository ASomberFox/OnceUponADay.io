var $ = function( id ) { return document.getElementById( id ); };

const storyButtons = document.getElementsByClassName('btn_Stories');



const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    console.log('current class name: ' + className);
});

function loadingScreen(state) {
    if (state == 'loadingIn') {
        $('LS').style.visibility = 'visible';
        let anim = $('LS').animate([{opacity: 1}, {opacity: 0}],{duration: 500, fill: 'forwards'});
        return anim.finished.then(() => {
            $('LS').style.visibility = 'hidden';
        });
    }

    else if (state == 'loadingOut') {
        $('LS').style.visibility = 'visible';
        let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 500, fill: 'forwards'});
        return anim.finished;
    }
}

loadingScreen('loadingIn').then(() => {;
    for (const link of storyButtons) {
        link.addEventListener('click', e => {
            e.preventDefault();
            localStorage.setItem('backPage', 'Relight.json');
            const url = './vignetteMenu.html';
            console.log(url);
            loadingScreen('loadingOut').then(() => {
                window.location.href = url;
            })
        });
    };
});