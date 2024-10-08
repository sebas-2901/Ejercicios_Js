function calcular() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operacion = document.getElementById("operacion").value;
    let resultado;
  
    // Verificar que ambos números hayan sido ingresados
    if (isNaN(num1) || isNaN(num2)) {
      // Mostrar un mensaje si falta un número
      document.getElementById("resultado").innerText = "Por favor, ingresa ambos números.";
      return;  // Salir de la función si faltan números
    }
  
    // Realizar la operación seleccionada
    switch (operacion) {
      case "+":
        resultado = num1 + num2;
        break;
      case "-":
        resultado = num1 - num2;
        break;
      case "*":
        resultado = num1 * num2;
        break;
      case "/":
        // Validar que no se esté dividiendo por cero
        if (num2 === 0) {
          document.getElementById("resultado").innerText = "No se puede dividir por 0.";
          return;
        }
        resultado = num1 / num2;
        break;
      default:
        resultado = "Operación no válida";
    }
  
    // Mostrar el resultado
    document.getElementById("resultado").innerText = "Resultado: " + resultado;
  }
  /*Se ha corregido el código para verificar si los valores num1 o num2 son válidos (si no son números) usando isNaN(). 
  Si no se han ingresado números, se muestra un mensaje en el párrafo resultado y no se procede con el 
  cálcul, tambien he agregado en la división, he agregado una validación adicional para evitar que el divisor (num2) 
  sea cero, ya que esto generaría un error matemático y por ultimo en lugar de mostrar "NaN" en caso de errores, 
  ahora se da un mensaje claro cuando faltan valores o se intenta dividir por cero.*/
  