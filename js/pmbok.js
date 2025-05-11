const preguntas = [
  {
    metodologia: "PMBOK",
    pregunta: "¿Cuál de los siguientes es un grupo de procesos según el PMBOK?",
    opciones: [
      "Inicio, planificación, ejecución, monitoreo y cierre",
      "Planificación, revisión, entrega",
      "Diseño, implementación, prueba",
      "Scrum, Sprint, Release"
    ],
    respuestaCorrecta: "Inicio, planificación, ejecución, monitoreo y cierre",
    retroalimentacion: "❌ Incorrecto. Estás mezclando con metodologías ágiles. El PMBOK define grupos de procesos clásicos."
  },
  {
    metodologia: "PMBOK",
    pregunta: "¿Qué área de conocimiento incluye el control del alcance del proyecto?",
    opciones: [
      "Gestión de la integración",
      "Gestión del cronograma",
      "Gestión del alcance",
      "Gestión de la calidad"
    ],
    respuestaCorrecta: "Gestión del alcance",
    retroalimentacion: "❌ Incorrecto. El alcance debe ser controlado para evitar desviaciones del objetivo original."
  }
];

let currentQuestion = 0;

function startQuiz() {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  mostrarPregunta();
}

function mostrarPregunta() {
  const contenedor = document.getElementById("question-container");
  const q = preguntas[currentQuestion];

  contenedor.innerHTML = `
    <h2>Pregunta ${currentQuestion + 1} (${q.metodologia})</h2>
    <p class="question">${q.pregunta}</p>
    <div class="options">
      ${q.opciones.map(op => `<button onclick="verificarRespuesta('${op}')">${op}</button>`).join('')}
    </div>
    <div class="feedback" id="feedback"></div>
  `;
}

function verificarRespuesta(opcionSeleccionada) {
  const q = preguntas[currentQuestion];
  const feedbackDiv = document.getElementById("feedback");
  const isCorrect = opcionSeleccionada === q.respuestaCorrecta;

  if (isCorrect) {
    feedbackDiv.innerHTML = "✅ ¡Correcto!";
  } else {
    feedbackDiv.innerHTML = `${q.retroalimentacion}<div class="boss-angry">💢 El jefe grita: ¡Esto es inaceptable! ¡Estás despedido! 😡</div>`;
  }

  // Desactivar botones después de responder
  document.querySelectorAll('.options button').forEach(btn => btn.disabled = true);

  // Mostrar botón de siguiente pregunta
  feedbackDiv.innerHTML += `<br><button onclick="siguientePregunta()">Siguiente pregunta</button>`;
}

function siguientePregunta() {
  currentQuestion++;
  if (currentQuestion < preguntas.length) {
    mostrarPregunta();
  } else {
    document.getElementById("quiz").innerHTML = "<h2>🎉 ¡Has terminado el quiz!</h2><p>¡Gracias por participar!</p>";
  }
}

