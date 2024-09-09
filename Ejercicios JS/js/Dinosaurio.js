let time = new Date();  // Variable que guarda el tiempo actual
let deltaTime = 0;  // Variable que guarda el tiempo transcurrido entre cada frame

// Iniciar el juego cuando el documento esté completamente cargado
if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);  // Si la página ya está cargada, inicia el juego de inmediato
}else{
    document.addEventListener("DOMContentLoaded", Init);  // Si la página no está cargada, espera al evento DOMContentLoaded
}

// Inicialización del juego
function Init() {
    time = new Date();  // Actualiza la variable de tiempo con el tiempo actual
    Start();  // Llama la función Start para inicializar variables y elementos del juego
    Loop();   // Comienza el bucle principal del juego
}

// Función que controla el bucle principal del juego, actualizándose en cada frame
function Loop() {
    deltaTime = (new Date() - time) / 1000;  // Calcula el tiempo transcurrido entre frames (en segundos)
    time = new Date();  // Actualiza el tiempo actual
    Update();  // Llama la función Update para realizar las actualizaciones del juego
    requestAnimationFrame(Loop);  // Vuelve a llamar a Loop en el siguiente frame
}

// Variables relacionadas con el juego
let sueloY = 22;  // Altura del suelo en el juego
let velY = 0;  // Velocidad vertical del dinosaurio
let impulso = 900;  // Impulso que recibe el dinosaurio cuando salta
let gravedad = 2500;  // Valor de la gravedad que afecta al dinosaurio

let dinoPosX = 42;  // Posición X del dinosaurio
let dinoPosY = sueloY;  // Posición Y inicial del dinosaurio, coincide con el suelo

let sueloX = 0;  // Posición X del suelo, para crear el desplazamiento visual
let velEscenario = 1280/3;  // Velocidad a la que se mueve el escenario
let gameVel = 1;  // Velocidad inicial del juego
let score = 0;  // Puntaje del jugador

let parado = false;  // Booleano para controlar si el juego está en pausa o si ha terminado
let saltando = false;  // Booleano para indicar si el dinosaurio está en el aire

// Variables relacionadas con la generación de obstáculos
let tiempoHastaObstaculo = 2;  // Tiempo que falta hasta el próximo obstáculo
let tiempoObstaculoMin = 0.7;  // Tiempo mínimo entre obstáculos
let tiempoObstaculoMax = 1.8;  // Tiempo máximo entre obstáculos
let obstaculoPosY = 16;  // Posición Y de los obstáculos
let obstaculos = [];  // Array que almacena todos los obstáculos en el juego

// Variables relacionadas con la generación de nubes
let tiempoHastaNube = 0.5;  // Tiempo que falta hasta la próxima nube
let tiempoNubeMin = 0.7;  // Tiempo mínimo entre nubes
let tiempoNubeMax = 2.7;  // Tiempo máximo entre nubes
let maxNubeY = 270;  // Altura máxima donde puede aparecer una nube
let minNubeY = 100;  // Altura mínima donde puede aparecer una nube
let nubes = [];  // Array que almacena todas las nubes en el juego
let velNube = 0.5;  // Velocidad a la que se mueven las nubes

// Variables de los elementos del DOM
let contenedor;
let dino;
let textoScore;
let suelo;
let gameOver;

// Función de inicialización: asigna los elementos del DOM y define eventos
function Start() {
    gameOver = document.querySelector(".game-over");  // Elemento del DOM para el mensaje de fin del juego
    suelo = document.querySelector(".suelo");  // Elemento del suelo
    contenedor = document.querySelector(".contenedor");  // Contenedor del juego
    textoScore = document.querySelector(".score");  // Elemento que muestra el puntaje
    dino = document.querySelector(".dino");  // Elemento del dinosaurio
    document.addEventListener("keydown", HandleKeyDown);  // Agrega un listener para detectar el salto cuando se presiona una tecla
}

// Función de actualización del juego: llamada en cada frame
function Update() {
    if(parado) return;  // Si el juego está detenido, no hacer nada
    
    MoverDinosaurio();  // Actualiza la posición del dinosaurio
    MoverSuelo();  // Mueve el suelo para simular desplazamiento
    DecidirCrearObstaculos();  // Decide si es momento de crear un nuevo obstáculo
    DecidirCrearNubes();  // Decide si es momento de crear una nueva nube
    MoverObstaculos();  // Mueve los obstáculos hacia la izquierda
    MoverNubes();  // Mueve las nubes hacia la izquierda
    DetectarColision();  // Verifica si el dinosaurio ha chocado con algún obstáculo

    velY -= gravedad * deltaTime;  // Aplica gravedad al dinosaurio en cada frame
}

// Función para manejar el salto al presionar la barra espaciadora
function HandleKeyDown(ev){
    if(ev.keyCode == 32){  // Si se presiona la tecla espacio
        Saltar();  // Llama a la función de salto
    }
}

// Función que ejecuta el salto del dinosaurio
function Saltar(){
    if(dinoPosY === sueloY){  // Solo se permite saltar si el dinosaurio está en el suelo
        saltando = true;
        velY = impulso;  // Aplica el impulso para que el dinosaurio suba
        dino.classList.remove("dino-corriendo");  // Cambia la animación del dinosaurio
    }
}

// Mueve el dinosaurio según la velocidad vertical
function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;  // Actualiza la posición Y del dinosaurio
    if(dinoPosY < sueloY){  // Si el dinosaurio ha tocado el suelo
        TocarSuelo();  // Restablece su posición al nivel del suelo
    }
    dino.style.bottom = dinoPosY + "px";  // Actualiza la posición en el DOM
}

// Restablece la posición del dinosaurio en el suelo
function TocarSuelo() {
    dinoPosY = sueloY;  // Establece la posición Y del dinosaurio en el suelo
    velY = 0;  // Detiene su velocidad vertical
    if(saltando){
        dino.classList.add("dino-corriendo");  // Restablece la animación de correr
    }
    saltando = false;  // Indica que ya no está saltando
}

// Mueve el suelo para crear el efecto de desplazamiento
function MoverSuelo() {
    sueloX += CalcularDesplazamiento();  // Desplaza el suelo
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";  // Actualiza la posición en el DOM
}

// Calcula el desplazamiento basado en la velocidad del escenario
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;  // Desplazamiento en píxeles por frame
}

// Detiene el juego cuando el dinosaurio se estrella
function Estrellarse() {
    dino.classList.remove("dino-corriendo");  // Elimina la animación de correr
    dino.classList.add("dino-estrellado");  // Agrega la animación de estrellarse
    parado = true;  // Detiene el juego
}

// Decide si se debe crear un nuevo obstáculo
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;  // Disminuye el tiempo hasta el próximo obstáculo
    if(tiempoHastaObstaculo <= 0) {
        CrearObstaculo();  // Crea un nuevo obstáculo si es tiempo
    }
}

// Decide si se debe crear una nueva nube
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;  // Disminuye el tiempo hasta la próxima nube
    if(tiempoHastaNube <= 0) {
        CrearNube();  // Crea una nueva nube si es tiempo
    }
}

// Crea un nuevo obstáculo y lo agrega al DOM
function CrearObstaculo() {
    let obstaculo = document.createElement("div");  // Crea un nuevo elemento div
    contenedor.appendChild(obstaculo);  // Lo agrega al contenedor
    obstaculo.classList.add("cactus");  // Agrega la clase cactus para los obstáculos
    if(Math.random() > 0.5) obstaculo.classList.add("cactus2");  // Algunos obstáculos tienen una variante
    obstaculo.posX = contenedor.clientWidth;  // Posición inicial del obstáculo (a la derecha)
    obstaculo.style.left = contenedor.clientWidth + "px";  // Lo posiciona en el DOM

    obstaculos.push(obstaculo);  // Lo agrega al array de obstáculos
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;  // Calcula el tiempo hasta el próximo obstáculo
}

// Crea una nueva nube y la agrega al DOM
function CrearNube() {
    let nube = document.createElement("div");  // Crea un nuevo elemento div
    contenedor.appendChild(nube);  // Lo agrega al contenedor
    nube.classList.add("nube");  // Agrega la clase nube
    nube.posX = contenedor.clientWidth;  // Posición inicial de la nube
    nube.style.left = contenedor.clientWidth + "px";  // La posiciona en el DOM
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px";  // Asigna una altura aleatoria para la nube
    
    nubes.push(nube);  // La agrega al array de nubes
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel;  // Calcula el tiempo hasta la próxima nube
}

// Mueve los obstáculos hacia la izquierda
function MoverObstaculos() {
    for (let i = obstaculos.length - 1; i >= 0; i--) {  // Recorre el array de obstáculos
        if(obstaculos[i].posX < -obstaculos[i].clientWidth) {  // Si el obstáculo sale de la pantalla
            obstaculos[i].parentNode.removeChild(obstaculos[i]);  // Elimina el obstáculo del DOM
            obstaculos.splice(i, 1);  // Lo elimina del array
            GanarPuntos();  // Suma puntos
        }else{
            obstaculos[i].posX -= CalcularDesplazamiento();  // Mueve el obstáculo hacia la izquierda
            obstaculos[i].style.left = obstaculos[i].posX + "px";  // Actualiza la posición en el DOM
        }
    }
}

// Mueve las nubes hacia la izquierda
function MoverNubes() {
    for (let i = nubes.length - 1; i >= 0; i--) {  // Recorre el array de nubes
        if(nubes[i].posX < -nubes[i].clientWidth) {  // Si la nube sale de la pantalla
            nubes[i].parentNode.removeChild(nubes[i]);  // Elimina la nube del DOM
            nubes.splice(i, 1);  // La elimina del array
        }else{
            nubes[i].posX -= CalcularDesplazamiento() * velNube;  // Mueve la nube hacia la izquierda, más lento que los obstáculos
            nubes[i].style.left = nubes[i].posX + "px";  // Actualiza la posición en el DOM
        }
    }
}

// Incrementa el puntaje y ajusta la velocidad del juego
function GanarPuntos() {
    score++;  // Aumenta el puntaje
    textoScore.innerText = score;  // Actualiza el texto del puntaje en el DOM
    if(score == 5){  // Si se alcanza el puntaje 5
        gameVel = 1.5;  // Aumenta la velocidad del juego
        contenedor.classList.add("mediodia");  // Cambia la ambientación a mediodía
    }else if(score == 10) {  // Si se alcanza el puntaje 10
        gameVel = 2;  // Aumenta más la velocidad
        contenedor.classList.add("tarde");  // Cambia la ambientación a tarde
    } else if(score == 20) {  // Si se alcanza el puntaje 20
        gameVel = 3;  // Aumenta aún más la velocidad
        contenedor.classList.add("noche");  // Cambia la ambientación a noche
    }
    suelo.style.animationDuration = (3/gameVel) + "s";  // Ajusta la duración de la animación del suelo
}

// Función que se ejecuta cuando el juego ha terminado
function GameOver() {
    Estrellarse();  // Cambia la animación del dinosaurio a estrellado
    gameOver.style.display = "block";  // Muestra el mensaje de fin de juego
}

// Detecta colisiones entre el dinosaurio y los obstáculos
function DetectarColision() {
    for (let i = 0; i < obstaculos.length; i++) {  // Recorre el array de obstáculos
        if(obstaculos[i].posX > dinoPosX + dino.clientWidth) {  // Si el obstáculo está detrás del dinosaurio, no hay colisión
            break;
        }else{
            if(IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {  // Verifica si hay colisión entre el dinosaurio y el obstáculo
                GameOver();  // Termina el juego si hay colisión
            }
        }
    }
}

// Verifica si dos elementos colisionan con un margen de padding
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    let aRect = a.getBoundingClientRect();  // Obtiene el rectángulo del dinosaurio
    let bRect = b.getBoundingClientRect();  // Obtiene el rectángulo del obstáculo

    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||  // Si no hay colisión en la parte superior
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||  // Si no hay colisión en la parte inferior
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||  // Si no hay colisión a la derecha
        (aRect.left + paddingLeft > (bRect.left + bRect.width))  // Si no hay colisión a la izquierda
    );
}
