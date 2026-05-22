// a)
function crearAcumulador(valorInicial) {
let total = valorInicial;

    return (numero) => {

        total = total + numero;
        return total;
    };
}
const hucha = crearAcumulador(10);

console.log(hucha(45));
console.log(hucha(8));
console.log(hucha(4));


// b) 
function aplicarOperacion(a, b, operacion) {
    const resultado = operacion(a,b);

    return resultado;
}

console.log(aplicarOperacion(19,2,(num1,num2) => num1+num2));

// c)
function generarMultiplicador(factor) {

    return (argumento) => argumento * factor;
}

const doble = generarMultiplicador(2);

console.log(doble(10));