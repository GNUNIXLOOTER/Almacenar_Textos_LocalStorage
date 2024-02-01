// Variables
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');

// Para almacenar los tweets se inicia con arreglo vacio
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     formulario.addEventListener('submit', agregarTweet);

     // Borrar Tweets
     listaTweets.addEventListener('click', borrarTweet);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {

          // intenta buscar en localStorage los tweets y los convierte a json.parse
          // pero si marca null asignalo como arreglo vacio
          tweets = JSON.parse( localStorage.getItem('tweets') ) || []  ;
          console.log(tweets);


          crearHTML();
     });
}


// Añadir tweet del formulario
function agregarTweet(e) {
     e.preventDefault();

     // leer el valor del textarea y se usa value para acceder al valor 
     const tweet = document.querySelector('#tweet').value;
     
     // validación
     if(tweet === '') {
          mostrarError('Un mensaje no puede ir vacio');

          // El return evita que se ejecuten mas lineas de codigo
          return;
     }

     // Crear un objeto Tweet
     const tweetObj = {
          id: Date.now(),
          texto: tweet
     }

     // Añadirlo una copia a mis tweets
     tweets = [...tweets, tweetObj];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

// Funcion para mostrar el mensaje de error
function mostrarError(error) {

     const mensajeEerror = document.createElement('p');

     // textContent es para añadirle un texto a en este caso la variable error
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     // esto es para definir donde vamos a colocar ese mensaje de error, en este caso en el id (contenido)
     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeEerror);

     //setTimeout es para definir el tiempo que se va mostrrar el mensaje de error en este ejemplo en 3 segundos
     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

// esta funcion es para mostrar los tweets
function crearHTML() {
     limpiarHTML();
     
     if(tweets.length > 0 ) {

          //Este es un arrow Funtion
          tweets.forEach( tweet =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-tweet';

               //este innerText es para asignar un texto 
               botonBorrar.innerText = 'X';
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('li');

               // Añade el texto
               li.innerText = tweet.texto;

               // añade el botón de borrar al tweet
               li.appendChild(botonBorrar);

               // añade un atributo único...
               li.dataset.tweetId = tweet.id;

               // añade el tweet a la lista
               listaTweets.appendChild(li);
          });
     }

     sincronizarStorage();
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.tweetId);
     const id = e.target.parentElement.dataset.tweetId;
     tweets = tweets.filter( tweet => tweet.id != id  );
     crearHTML();
}

// Agrega tweet actualies a local storage para que al recargar la pagina no se elimine lo que ya se ha ingresado
function sincronizarStorage() {
     localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina los cursos del carrito en el DOM, osea limpiar el html
function limpiarHTML() {

     // firstChild es decir mientrar hayan elementos 
     while(listaTweets.firstChild) {

          //Remueve el primer hijo que vaya encontrando
          listaTweets.removeChild(listaTweets.firstChild);
     }
}