const preguntas = [
  {
    metodologia: "Ágil",
    pregunta: "¿Cuál de los siguientes principios pertenece al Manifiesto Ágil?",
    opciones: [
      "Seguir el plan ante todo",
      "La documentación es más importante que el software funcional",
      "Responder al cambio sobre seguir un plan",
      "El proceso es más importante que el cliente"
    ],
    respuestaCorrecta: "Responder al cambio sobre seguir un plan",
    retroalimentacion: "❌ Incorrecto. Tu equipo siguió el plan rígidamente y no pudo adaptarse. El cliente canceló el contrato."
  },
  {
    metodologia: "Ágil",
    pregunta: "En un entorno ágil, ¿cuál es la mejor manera de asegurar que el producto cumple las expectativas del cliente?",
    opciones: [
      "Revisar todo al final del proyecto",
      "Tener reuniones constantes con el cliente",
      "Evitar los cambios de requerimientos",
      "Entregarlo todo de una sola vez"
    ],
    respuestaCorrecta: "Tener reuniones constantes con el cliente",
    retroalimentacion: "❌ Incorrecto. No involucraste al cliente durante el desarrollo. El producto no cumplió sus expectativas y se solicitó una reingeniería completa."
  },
  {
    metodologia: "Ágil",
    pregunta: "¿Cuál es la unidad de trabajo típica utilizada para medir progreso en Ágil?",
    opciones: [
      "Línea de código",
      "Casos de uso",
      "Historias de usuario",
      "Horas facturadas"
    ],
    respuestaCorrecta: "Historias de usuario",
    retroalimentacion: "❌ Incorrecto. Tu equipo se enfocó en líneas de código en lugar de valor entregado. El cliente no entendió el progreso real."
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
