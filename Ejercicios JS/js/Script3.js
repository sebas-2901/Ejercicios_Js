let numeroSecreto = Math.floor(Math.random() * 100) + 1;
// Genera un número secreto aleatorio entre 1 y 100 y lo asigna a la variable numeroSecreto.

let intentos = 0;
//Se Inicializa el contador de intentos en 0.

function adivinar() {
    // Función que se ejecuta al intentar adivinar el número secreto.

    let intento = document.getElementById("numero").value;
    // se Obtiene el valor ingresado por el usuario desde un campo de entrada con el ID "numero".


    intentos++;
    // Incrementa el contador de intentos en 1 cada vez que se llama a la función.

    if (intento == numeroSecreto) {
        // Si el valor ingresado por el usuario es igual al número secreto,

        document.getElementById("resultado").innerText = "¡Correcto! Adivinaste en " + intentos + " intentos.";
        // Actualiza el contenido del elemento con el ID "resultado" para mostrar el número de intentos.
    } else if (intento < numeroSecreto) {
        // Si el valor ingresado es menor que el número secreto,

        document.getElementById("resultado").innerText = "El número es mayor. Inténtalo de nuevo.";
        // Actualiza el contenido del elemento con el ID "resultado" con la sugerencia correspondiente.
    } else {
        // Si el valor ingresado es mayor que el número secreto,
        document.getElementById("resultado").innerText = "El número es menor. Inténtalo de nuevo.";
        // Actualiza el contenido del elemento con el ID "resultado" con la sugerencia correspondiente.
    }
}