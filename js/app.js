const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListeners();

document.addEventListener('DOMContentLoaded', () => {
    // Toma los valores del local storage y los guarda en una variable que podamos leer y mostrar en el DOM

    const almacenados = localStorage.getItem('tweets');
    tweets = almacenados ? [...JSON.parse(almacenados)] : tweets;
    mostrarTweets();
})

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}



function agregarTweet(e) {
    e.preventDefault();
    // Text area donde el usuario escribe
    const tweetElement = document.querySelector('#tweet');
    const tweet = tweetElement.value

    // Validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; // Evita que se ejecuten mas lineas de código.
    }

    const tweetObj = {
        id: Date.now(),
        tweet,
    }
    tweets = [...tweets, tweetObj];
    
    // Se sobre-escribe el LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    mostrarTweets();

    // Se limpia el valor del formulario
    tweetElement.value = '';
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
    }, 2000);
}

function mostrarTweets() {

    limpiarTweets();

    tweets.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.tweet;
        listaTweets.appendChild(li);
    })
}

function limpiarTweets() {
    while (listaTweets.hasChildNodes()) {
        listaTweets.firstChild.remove();
    }
}

