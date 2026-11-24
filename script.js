
let tiempo = 60;
let contador;

let preguntas = [
    {
        pregunta: "¿Cuál es la capital de Colombia?",
        opciones: ["Bogotá", "Cali", "Medellín"],
        correcta: "Bogotá"
    },
    {
        pregunta: "¿Cuánto es 5 + 5?",
        opciones: ["8", "10", "15"],
        correcta: "10"
    },
    {
        pregunta: "¿Cuál es el planeta rojo?",
        opciones: ["Tierra", "Marte", "Venus"],
        correcta: "Marte"
    },
    {
        pregunta: "¿Cuál es el océano más grande del mundo?",
        opciones: ["Atlántico", "Índico", "Pacífico"],
        correcta: "Pacífico"
    },
    {
        pregunta: "¿Cuál es el animal terrestre más rápido?",
        opciones: ["León", "Guepardo", "Tigre"],
        correcta: "Guepardo"
    },
    {
        pregunta: "¿Cuál es el río más largo del mundo?",
        opciones: ["Nilo", "Amazonas", "Yangtsé"],
        correcta: "Amazonas"
    },
    {
        pregunta: "¿Cuál es el país más grande del mundo?",
        opciones: ["Estados Unidos", "Rusia", "China"],
        correcta: "Rusia"
    },
    {
        pregunta: "¿Cuál es la montaña más alta del mundo?",
        opciones: ["K2", "Everest", "Kangchenjunga"],
        correcta: "Everest"
    },
    {
        pregunta: "¿Cuál es el océano más profundo del mundo?",
        opciones: ["Atlántico", "Índico", "Pacífico"],
        correcta: "Pacífico"
    },
    {
        pregunta: "¿Cuál es el continente más grande del mundo?",
        opciones: ["Asia", "África", "América"],
        correcta: "Asia"
    }
];

let numero = 0;
let puntos = 0;

// Comenzar examen
function comenzar() {

    document.getElementById("inicio").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    mostrarPregunta();

}

// Mostrar preguntas
function mostrarPregunta() {

    document.getElementById("pregunta").textContent =
        preguntas[numero].pregunta;

    document.getElementById("mensaje").textContent = "";

    document.getElementById("siguiente").style.display = "none";

    let opciones = document.getElementById("opciones");

    opciones.innerHTML = "";

    preguntas[numero].opciones.forEach(function(opcion) {

        let boton = document.createElement("button");

        boton.textContent = opcion;

        boton.onclick = function() {
            responder(opcion, boton);
        };

        opciones.appendChild(boton);

    });

    // Iniciar contador
    tiempo = 60;

    document.getElementById("tiempo").textContent = tiempo;

    clearInterval(contador);

    contador = setInterval(function() {

        tiempo--;

        document.getElementById("tiempo").textContent = tiempo;

        if (tiempo == 0) {

            clearInterval(contador);

            document.getElementById("mensaje").textContent =
                "¡Se acabó el tiempo!";

            let botones = document.querySelectorAll("#opciones button");

            botones.forEach(function(b) {

                b.disabled = true;

                if (b.textContent == preguntas[numero].correcta) {
                    b.classList.add("correcta");
                }

            });

            document.getElementById("mensaje").textContent +=
                " La respuesta era " + preguntas[numero].correcta;

            document.getElementById("siguiente").style.display = "block";

        }

    }, 1000);

}

// Revisar respuesta
function responder(respuesta, boton) {

    clearInterval(contador);

    let correcta = preguntas[numero].correcta;

    let botones = document.querySelectorAll("#opciones button");

    botones.forEach(function(b) {

        b.disabled = true;

        if (b.textContent == correcta) {
            b.classList.add("correcta");
        }

    });

    if (respuesta == correcta) {

        puntos++;

        document.getElementById("mensaje").textContent = "¡Correcto!";

    } else {

        boton.classList.add("incorrecta");

        document.getElementById("mensaje").textContent =
            "Incorrecto. La respuesta era " + correcta;

    }

    document.getElementById("siguiente").style.display = "block";

}

// Siguiente pregunta
function siguiente() {

    clearInterval(contador);

    numero++;

    if (numero < preguntas.length) {

        mostrarPregunta();

    } else {

        mostrarResultado();

    }

}

// Mostrar resultado final
function mostrarResultado() {

    clearInterval(contador);

    document.getElementById("quiz").style.display = "none";

    document.getElementById("final").style.display = "block";

    document.getElementById("resultado").textContent =
        "Tu puntaje es: " + puntos + " de " + preguntas.length;

}
