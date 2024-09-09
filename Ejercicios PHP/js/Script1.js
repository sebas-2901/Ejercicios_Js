var contador = 1;
var temporizador;

// Función para iniciar el pase automático de imágenes
function iniciar() {
  if (!temporizador) {  // Verifica si ya hay un temporizador corriendo, para evitar múltiples instancias
    console.log('Rotación de imágenes iniciada');
    temporizador = setInterval(rotarImagenes, 3000);  // Inicia la rotación cada 3 segundos
  }
}

// Función para detener el pase automático de imágenes
function detener() {
  if (temporizador) {  // Solo detiene si el temporizador está activo
    console.log('Rotación de imágenes detenida');
    clearInterval(temporizador);  // Detiene la rotación de las imágenes
    temporizador = null;  // Resetea el temporizador para evitar que se reinicie accidentalmente
  }
}

function rotarImagenes() {
  if (contador >= 10) {
    contador = 0;  // Reinicia el contador cuando llega a 10 (asumiendo que hay 10 imágenes)
  }

  var img = document.getElementById('imgSlide');
  img.src = './images/img' + ++contador + '.jpg';  // Cambia la imagen
  console.log('Imagen cambiada a: ' + img.src);  // Muestra la nueva imagen en la consola
}
//Lo comentado en las funciones iniciar y continuar fue totalmente corregido debido a que no funcionaban,y solo continuaba solo quedando en un bucle sin poder parar.