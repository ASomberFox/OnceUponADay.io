var $ = function( id ) { return document.getElementById( id ); };

const storyButtons = $('link');

storyButtons.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const url = e.target.href;
        console.log(url);
        $('LS').style.visibility = 'visible';
        let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 2000, fill: 'forwards'});
        anim.finished.then(() => {
            window.location.href = url;
        })
    });
});

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