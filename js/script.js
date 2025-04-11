const preguntas = [
  {
    metodologia: "SCRUM",
    pregunta: "¿Cuál es el rol principal que representa al cliente en SCRUM?",
    opciones: ["Scrum Master", "Product Owner", "Development Team", "Stakeholder"],
    respuestaCorrecta: "Product Owner",
    retroalimentacion: "Elegir otro rol puede hacer que los requerimientos del cliente no sean claros, causando retrabajo o malentendidos."
  },
  {
    metodologia: "SCRUM",
    pregunta: "¿Cuánto tiempo suele durar un Sprint en SCRUM?",
    opciones: ["1 día", "1 semana", "2-4 semanas", "3 meses"],
    respuestaCorrecta: "2-4 semanas",
    retroalimentacion: "Sprints muy largos pueden perder el foco y los objetivos a corto plazo. Sprints muy cortos pueden ser ineficientes."
  },
  {
    metodologia: "SCRUM",
    pregunta: "¿Qué evento diario permite al equipo sincronizarse y planificar su trabajo del día?",
    opciones: ["Sprint Review", "Daily Scrum", "Sprint Planning", "Retrospective"],
    respuestaCorrecta: "Daily Scrum",
    retroalimentacion: "Sin una reunión diaria, el equipo podría desalinearse y aumentar los bloqueos sin visibilidad."
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

  if (opcionSeleccionada === q.respuestaCorrecta) {
    feedbackDiv.innerHTML = "✅ ¡Correcto!";
  } else {
    feedbackDiv.innerHTML = `❌ Incorrecto. ${q.retroalimentacion}`;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < preguntas.length) {
      mostrarPregunta();
    } else {
      document.getElementById("quiz").innerHTML = "<h2>🎉 ¡Has terminado el quiz!</h2><p>¡Gracias por participar!</p>";
    }
  }, 2500);
}
