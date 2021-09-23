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

    // Validacion
    if ( tweet.value === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; // Evita que se ejecuten mas lineas de código.
    } 
    tweets.push(tweet.value);
    // Se limpia el valor del formulario
    tweet.value = '';
    // Se sobre-escribe el LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    mostrarTweets();
}

function mostrarError(error) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 1500);
}
function limpiarErrores() {
    const errores = document.querySelectorAll('.error');
    errores.forEach(e => {
        e.remove();
    })
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

