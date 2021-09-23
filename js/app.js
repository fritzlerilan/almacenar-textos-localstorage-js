const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListeners();

document.addEventListener('DOMContentLoaded', () => {
    // Toma los valores del local storage y los guarda en una variable que podamos leer y mostrar en el DOM
    
    const almacenados = localStorage.getItem('tweets');
    tweets = almacenados ? JSON.parse(almacenados) : [];
    mostrarTweets();
})

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}



function agregarTweet(e) {
    e.preventDefault();
    // Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet');
    tweets.push(tweet.value);
    // Se limpia el valor del formulario
    tweet.value = '';
    // Se sobre-escribe el LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    mostrarTweets();
}

function mostrarTweets() {

    limpiarTweets();

    tweets.forEach(t => {
        const newTweet = document.createElement('div');
        newTweet.textContent = t;
        listaTweets.appendChild(newTweet);
    })
}

function limpiarTweets() {
    while (listaTweets.hasChildNodes()) {
        listaTweets.firstChild.remove();
    }
}

