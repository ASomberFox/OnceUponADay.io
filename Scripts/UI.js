
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

const box = document.querySelector('.story-selector');
box.addEventListener('click', function() {
    let cube = document.querySelector('.story-box');
    if (cube.style.visibility === "hidden") {
        cube.style.visibility = "visible";
    }
    else {
        cube.style.visibility = "hidden";
    }
});