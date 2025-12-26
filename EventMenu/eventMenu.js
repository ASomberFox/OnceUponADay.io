var $ = function( id ) { return document.getElementById( id ); };

var background = $('background');
var currency = $('currency');
var currencyAmount = $('currencyAmount');
var store = $('store');
var goals = $('goals');
var stages = $('stages');
var extra = $('extra');
var medals = $('medals');
var newOps = $('newOps');
var inspect = $('inspect');
var trust = $('trust');

function loadMenu(input) {
    let script_path = './' + input + '/menu.json';
    let toPath = './' + input;
    fetch(script_path)
        .then(response => response.json())
        .then(data => {
            console.log("Event Menu Data: " + data);
            document.title = data.title;
            background.src = toPath + data.background.path;

            banner.src = toPath + data.banner.path;
            banner.style.left += data.banner.x_location;
            banner.style.bottom += data.banner.y_location;

            currency.src = toPath + data.currency.path;
            currency.style.left += data.currency.x_location;
            currency.style.bottom += data.currency.y_location;

            currencyAmount.textContent = data.currency_amount.amount;
            currencyAmount.style.left += data.currency_amount.x_location;
            currencyAmount.style.bottom += data.currency_amount.y_location;

            store.src = toPath + data.store.path;
            store.style.left += data.store.x_location;
            store.style.bottom += data.store.y_location;
            goals.src = toPath + data.goals.path;
            goals.style.left += data.goals.x_location;
            goals.style.bottom += data.goals.y_location;
            stages.src = toPath + data.stages.path;
            stages.style.left += data.stages.x_location;
            stages.style.bottom += data.stages.y_location;
            extra.src = toPath + data.extra.path;
            extra.style.left += data.extra.x_location;
            extra.style.bottom += data.extra.y_location;
            medals.src = toPath + data.medals.path;
            medals.style.left += data.medals.x_location;
            medals.style.bottom += data.medals.y_location;
            newOps.src = toPath + data.newOps.path;
            newOps.style.left += data.newOps.x_location;
            newOps.style.bottom += data.newOps.y_location;

            inspect.style.left += data.inspect.x_location;
            inspect.style.bottom += data.inspect.y_location;
            trust.textContent = data.trust.text;
            trust.style.left += data.trust.x_location;
            trust.style.bottom += data.trust.y_location;

        })
        .then(() => {
            let anim = $('LS').animate([{opacity: 1}, {opacity: 0}],{duration: 500, fill: 'forwards'});
            anim.finished.then(() => {
                $('LS').style.visibility = 'hidden';
            })
        });
};

function eventTo(element) {
    const url = element.dataset.url;
    const target = element.dataset.target;
    localStorage.setItem("target", target);
    console.log(`Navigating to ${url} with target ${target}`);
    $('LS').style.visibility = 'visible';
    let anim = $('LS').animate([{opacity: 0}, {opacity: 1}],{duration: 500, fill: 'forwards'});
    anim.finished.then(() => {
        if (target === '_blank') {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    })
}

$('Back').addEventListener('click', eventTo.bind(this, $('Back')));
$('store').addEventListener('click', eventTo.bind(this, $('store')));
$('goals').addEventListener('click', eventTo.bind(this, $('goals')));
$('stages').addEventListener('click', eventTo.bind(this, $('stages')));
$('extra').addEventListener('click', eventTo.bind(this, $('extra')));
$('medals').addEventListener('click', eventTo.bind(this, $('medals')));
$('newOps').addEventListener('click', eventTo.bind(this, $('newOps')));

var input = localStorage.getItem('target');
var input = "Relight"

loadMenu(input);