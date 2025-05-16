document.addEventListener('DOMContentLoaded', function () {
  // Variables del quiz
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];

  // Elementos del DOM
  const quizContent = document.getElementById('quizContent');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizResults = document.getElementById('quizResults');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackText = document.getElementById('feedbackText');
  const feedbackImage = document.getElementById('feedbackImage');
  const nextButton = document.getElementById('nextButton');
  const finalScore = document.getElementById('finalScore');
  const resultTitle = document.getElementById('resultTitle');
  const resultDescription = document.getElementById('resultDescription');
  const resultImage = document.getElementById('resultImage');
  const scopeMetric = document.getElementById('scopeMetric');
  const timeMetric = document.getElementById('timeMetric');
  const costMetric = document.getElementById('costMetric');
  const restartQuiz = document.getElementById('restartQuiz');
  const progressBar = document.getElementById('progressBar');
  const currentQuestionSpan = document.getElementById('currentQuestion');

  // Preguntas del quiz
  const questions = [
    {
      question: "Estás iniciando el proyecto 'SmartCity'. ¿Cuál es el primer documento que debes crear según PMBOK?",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Plan de Gestión del Proyecto",
        "Acta de Constitución del Proyecto",
        "Cronograma detallado",
        "Lista de requisitos del cliente"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "El Acta de Constitución del Proyecto es el primer documento formal que autoriza el proyecto y da autoridad al Project Manager.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ups! No fue la mejor opción",
          text: "Según PMBOK, el proceso de inicio comienza con el Acta de Constitución del Proyecto, que formalmente autoriza el proyecto.",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Cuál de estos NO es un grupo de procesos según PMBOK?",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Inicio",
        "Planificación",
        "Ejecución",
        "Coordinación"
      ],
      correctAnswer: 3,
      feedback: {
        correct: {
          title: "¡Respuesta correcta!",
          text: "Los grupos de procesos según PMBOK son: Inicio, Planificación, Ejecución, Monitoreo y Control, y Cierre.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ese no es un grupo de procesos!",
          text: "PMBOK define 5 grupos de procesos: Inicio, Planificación, Ejecución, Monitoreo y Control, y Cierre. 'Coordinación' no es uno de ellos.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El cliente solicita un cambio importante en el alcance. ¿Cuál es tu primer paso según PMBOK?",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Implementar el cambio inmediatamente para satisfacer al cliente",
        "Documentar la solicitud en el Registro de Cambios",
        "Pedir al equipo que evalúe el impacto",
        "Rechazar el cambio porque altera el plan original"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Procedimiento correcto!",
          text: "Todo cambio debe ser documentado primero en el Registro de Cambios antes de ser evaluado o implementado.",
          image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡No es el enfoque PMBOK!",
          text: "PMBOK enfatiza el control de cambios formal. Todo cambio debe documentarse primero antes de evaluar o implementar.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Qué documento define CÓMO se gestionará cada aspecto del proyecto?",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Acta de Constitución",
        "Plan para la Dirección del Proyecto",
        "Enunciado del Alcance del Proyecto",
        "Registro de Riesgos"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Exacto!",
          text: "El Plan para la Dirección del Proyecto es el documento que integra todos los planes auxiliares y define cómo se gestionará el proyecto.",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Documento incorrecto!",
          text: "El Plan para la Dirección del Proyecto es el documento maestro que contiene todos los planes auxiliares de gestión.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "Estás en la fase de planificación. ¿Qué herramienta usarías para identificar a los interesados?",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Diagrama de Gantt",
        "Matriz RACI",
        "Análisis de interesados",
        "Diagrama de red"
      ],
      correctAnswer: 2,
      feedback: {
        correct: {
          title: "¡Identificación correcta!",
          text: "El análisis de interesados es la herramienta específica para identificar y analizar a todas las partes interesadas en el proyecto.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Herramienta incorrecta!",
          text: "Para identificar interesados se usa específicamente el análisis de interesados, que puede incluir matrices de poder/interés.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Cuál es el propósito principal de la Línea Base del Alcance?",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Servir como referencia para medir el desempeño del proyecto",
        "Listar todos los requisitos del cliente",
        "Documentar los riesgos potenciales",
        "Establecer el presupuesto inicial"
      ],
      correctAnswer: 0,
      feedback: {
        correct: {
          title: "¡Propósito correcto!",
          text: "La Línea Base del Alcance sirve como referencia aprobada contra la cual se mide y monitorea el desempeño del proyecto.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es el propósito principal",
          text: "La Línea Base del Alcance es principalmente el punto de referencia aprobado para medir el desempeño del proyecto.",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "Durante la ejecución, descubres un riesgo no identificado. ¿Qué haces primero?",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Implementar una solución inmediata",
        "Documentarlo en el Registro de Riesgos",
        "Informar al patrocinador del proyecto",
        "Revisar el plan de gestión de riesgos"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Procedimiento adecuado!",
          text: "Todo riesgo nuevo debe ser documentado primero en el Registro de Riesgos antes de tomar cualquier acción.",
          image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡No es el primer paso!",
          text: "Según PMBOK, el primer paso ante un nuevo riesgo es documentarlo en el Registro de Riesgos para su posterior análisis.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Qué técnica usarías para estimar la duración de las actividades?",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Análisis de valor ganado",
        "Juicio de expertos",
        "Diagrama de Pareto",
        "Matriz de probabilidad e impacto"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Técnica correcta!",
          text: "El juicio de expertos es una técnica válida para estimar duraciones, especialmente cuando hay incertidumbre.",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡No es para estimar duraciones!",
          text: "Para estimar duraciones se pueden usar técnicas como juicio de expertos, estimación análoga, paramétrica o tres puntos.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "Durante el cierre, ¿qué documento es esencial para lecciones aprendidas?",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Plan de gestión del cronograma",
        "Registro de problemas",
        "Informe de desempeño del trabajo",
        "Documento de lecciones aprendidas"
      ],
      correctAnswer: 3,
      feedback: {
        correct: {
          title: "¡Documento correcto!",
          text: "El documento de lecciones aprendidas captura el conocimiento adquirido durante el proyecto para beneficio de futuros proyectos.",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡No es el documento principal!",
          text: "El documento de lecciones aprendidas es específicamente creado para capturar y compartir conocimientos al final del proyecto.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Qué área de conocimiento se enfoca en asegurar que el proyecto incluya TODO el trabajo requerido?",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Gestión del Alcance",
        "Gestión del Tiempo",
        "Gestión de la Calidad",
        "Gestión de las Comunicaciones"
      ],
      correctAnswer: 0,
      feedback: {
        correct: {
          title: "¡Área correcta!",
          text: "La Gestión del Alcance asegura que el proyecto incluya todo el trabajo requerido, y solo el trabajo requerido.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es esta área",
          text: "La Gestión del Alcance es específicamente responsable de definir y controlar qué trabajo está incluido en el proyecto.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    }
  ];

  // Inicializar el quiz
  function initQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showQuestion();
  }

  // Mostrar pregunta actual
  function showQuestion() {
    currentQuestionSpan.textContent = currentQuestion + 1;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    const question = questions[currentQuestion];
    let optionsHtml = '';

    question.options.forEach((option, index) => {
      optionsHtml += `
        <button class="quiz-option" onclick="selectAnswer(${index})">
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span class="option-text">${option}</span>
        </button>
      `;
    });

    quizContent.innerHTML = `
      <div class="quiz-question">
        <h2><i class="fas fa-question-circle"></i> ${question.question}</h2>
        <img src="${question.image}" alt="Imagen de la pregunta" class="quiz-image">
        <div class="quiz-options">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  // Seleccionar respuesta
  window.selectAnswer = function (selectedIndex) {
    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.correctAnswer;

    if (isCorrect) {
      score++;
    }

    userAnswers.push({
      question: question.question,
      selected: question.options[selectedIndex],
      correct: question.options[question.correctAnswer],
      isCorrect: isCorrect
    });

    // Mostrar feedback
    const feedback = isCorrect ? question.feedback.correct : question.feedback.incorrect;
    feedbackTitle.textContent = feedback.title;
    feedbackText.textContent = feedback.text;
    feedbackImage.src = feedback.image;

    quizContent.style.display = 'none';
    quizFeedback.style.display = 'block';
  };

  // Siguiente pregunta o mostrar resultados
  nextButton.addEventListener('click', function () {
    quizFeedback.style.display = 'none';

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
      quizContent.style.display = 'block';
    } else {
      showResults();
    }
  });

  // Mostrar resultados finales
  function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    finalScore.textContent = percentage;

    // Establecer resultado basado en el puntaje
    let title, description, image;

    if (percentage >= 80) {
      title = "¡Proyecto exitoso! Eres un PMP en potencia";
      description = "El proyecto 'SmartCity' se ha completado con éxito, dentro del alcance, tiempo y presupuesto. ¡Tu manejo del PMBOK es excepcional!";
      image = "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 60) {
      title = "Proyecto aceptable";
      description = "El proyecto 'SmartCity' se completó con algunos desvíos menores. Revisa los conceptos PMBOK para mejorar en tu próxima gestión.";
      image = "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 40) {
      title = "Proyecto con problemas";
      description = "El proyecto 'SmartCity' tuvo importantes desvíos de alcance, tiempo y costo. Necesitas estudiar más el PMBOK para futuros proyectos.";
      image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else {
      title = "¡Fracaso del proyecto!";
      description = "El proyecto 'SmartCity' fue cancelado por graves problemas de gestión. ¡Necesitas un repaso completo del PMBOK antes de dirigir otro proyecto!";
      image = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }

    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultImage.src = image;

    // Ajustar métricas visuales
    scopeMetric.style.width = `${percentage}%`;
    timeMetric.style.width = `${Math.min(100, percentage + 5)}%`;
    costMetric.style.width = `${Math.min(100, percentage + 10)}%`;

    quizResults.style.display = 'block';
  }

  // Reiniciar quiz
  restartQuiz.addEventListener('click', function () {
    quizResults.style.display = 'none';
    quizContent.style.display = 'block';
    initQuiz();
  });

  // Iniciar el quiz al cargar la página
  initQuiz();
});