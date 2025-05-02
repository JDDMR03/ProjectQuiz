const preguntas = [
  {
    metodologia: "SCRUM",
    pregunta: "¿Cuál es el rol responsable de maximizar el valor del producto?",
    opciones: [
      "Scrum Master",
      "Desarrollador",
      "Product Owner",
      "Stakeholder"
    ],
    respuestaCorrecta: "Product Owner",
    retroalimentacion: "❌ Incorrecto. El Product Owner se encarga de priorizar el Product Backlog y maximizar el valor entregado."
  },
  {
    metodologia: "SCRUM",
    pregunta: "¿Con qué frecuencia se realiza la Daily Scrum?",
    opciones: [
      "Una vez a la semana",
      "Al inicio del Sprint",
      "Diariamente",
      "Al finalizar el Sprint"
    ],
    respuestaCorrecta: "Diariamente",
    retroalimentacion: "❌ Incorrecto. La reunión diaria es clave para sincronizar al equipo y detectar obstáculos temprano."
  },
  {
    metodologia: "SCRUM",
    pregunta: "¿Qué artefacto contiene la lista priorizada de requisitos del producto?",
    opciones: [
      "Sprint Backlog",
      "Product Backlog",
      "Incremento",
      "Roadmap"
    ],
    respuestaCorrecta: "Product Backlog",
    retroalimentacion: "❌ Incorrecto. El Product Backlog es la fuente de trabajo para el equipo Scrum."
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
