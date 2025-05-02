const preguntas = [
  {
    metodologia: "Kanban",
    pregunta: "¿Cuál es el objetivo principal de usar un tablero Kanban?",
    opciones: [
      "Asignar tareas a personas específicas",
      "Visualizar y gestionar el flujo de trabajo",
      "Determinar estimaciones precisas",
      "Definir roles estrictos"
    ],
    respuestaCorrecta: "Visualizar y gestionar el flujo de trabajo",
    retroalimentacion: "❌ Incorrecto. Kanban se enfoca en visualizar y optimizar el flujo de trabajo, no en asignaciones rígidas."
  },
  {
    metodologia: "Kanban",
    pregunta: "¿Qué significa 'WIP Limit' en Kanban?",
    opciones: [
      "El número de sprints que se pueden hacer",
      "La cantidad máxima de trabajo en progreso permitido",
      "El número de miembros del equipo",
      "La duración máxima de una tarea"
    ],
    respuestaCorrecta: "La cantidad máxima de trabajo en progreso permitido",
    retroalimentacion: "❌ Incorrecto. WIP Limit ayuda a prevenir cuellos de botella y mejorar el flujo de trabajo."
  },
  {
    metodologia: "Kanban",
    pregunta: "¿Cuál de los siguientes es un principio clave de Kanban?",
    opciones: [
      "Sprints fijos",
      "Roles definidos como Product Owner",
      "Visualizar el flujo de trabajo",
      "Estimación con puntos de historia"
    ],
    respuestaCorrecta: "Visualizar el flujo de trabajo",
    retroalimentacion: "❌ Incorrecto. Kanban no se basa en sprints ni roles fijos, sino en visualizar y mejorar continuamente el flujo."
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
    feedbackDiv.innerHTML = q.retroalimentacion;
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
