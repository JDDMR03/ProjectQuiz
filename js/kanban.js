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
  const teamMetric = document.getElementById('teamMetric');
  const clientMetric = document.getElementById('clientMetric');
  const qualityMetric = document.getElementById('qualityMetric');
  const restartQuiz = document.getElementById('restartQuiz');
  const progressBar = document.getElementById('progressBar');
  const currentQuestionSpan = document.getElementById('currentQuestion');

  // Preguntas del quiz
  const questions = [
    {
      question: "El tablero Kanban está saturado con demasiadas tareas en 'En Progreso'. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Dejas que el equipo decida cuánto trabajo puede manejar",
        "Estableces un límite WIP (Work In Progress) para cada columna",
        "Contratas más desarrolladores para manejar la carga",
        "Ignoras el problema porque el equipo es profesional"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "Establecer límites WIP es fundamental en Kanban. Ayuda a identificar cuellos de botella y mantiene el flujo de trabajo constante.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ups! No fue la mejor opción",
          text: "En Kanban, los límites WIP (Work In Progress) son esenciales para mantener un flujo saludable de trabajo y evitar la sobrecarga del equipo.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "Una tarea lleva semanas en la misma columna. ¿Cómo actúas?",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "La dejas ahí hasta que alguien la complete",
        "Organizas una reunión para analizar el bloqueo",
        "La mueves a 'Terminado' para mejorar las métricas",
        "La eliminas del tablero por antigua"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Buen manejo del bloqueo!",
          text: "Excelente. En Kanban, los bloqueos deben identificarse y resolverse rápidamente para mantener el flujo.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Podría ser mejor",
          text: "En Kanban, los elementos bloqueados requieren atención inmediata para mantener el flujo de valor. Ignorarlos o falsificar su estado empeora las cosas.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El cliente quiere añadir una nueva característica urgente. ¿Cómo la gestionas?",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "La añades al final del backlog",
        "La insertas en la columna 'En Progreso' inmediatamente",
        "La pones en la siguiente posición del backlog según prioridad",
        "Rechazas el cambio porque rompe el flujo"
      ],
      correctAnswer: 2,
      feedback: {
        correct: {
          title: "¡Manejo Kanban correcto!",
          text: "En Kanban, las nuevas tareas se añaden al backlog según su prioridad, pero no interrumpen el trabajo en curso.",
          image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Eso no es muy Kanban...",
          text: "Kanban permite cambios, pero deben gestionarse sin interrumpir el trabajo en curso. Insertar tareas a mitad del flujo crea caos.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Cuál de estos NO es un principio básico de Kanban?",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Visualizar el flujo de trabajo",
        "Limitar el trabajo en progreso",
        "Tener sprints de 2 semanas",
        "Mejorar continuamente"
      ],
      correctAnswer: 2,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "Kanban no usa sprints. Es un flujo continuo con límites WIP y mejora constante basada en métricas.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ese no es un principio de Kanban!",
          text: "Kanban se caracteriza por ser un flujo continuo sin sprints fijos. Los sprints son propios de Scrum.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo quiere medir su rendimiento. ¿Qué métrica Kanban usas?",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Velocidad (puntos por sprint)",
        "Tiempo de ciclo (cycle time)",
        "Cantidad de tareas completadas por día",
        "Horas trabajadas por semana"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Métrica Kanban correcta!",
          text: "El tiempo de ciclo (cycle time) es una métrica clave en Kanban que mide cuánto tarda una tarea en moverse por todo el tablero.",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Esa no es la mejor métrica!",
          text: "Kanban se enfoca en métricas de flujo como tiempo de ciclo (cycle time) y rendimiento (throughput), no en velocidad o horas trabajadas.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El tablero muestra muchas tareas bloqueadas. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Añades una columna 'Bloqueado' para hacerlo visible",
        "Quitas las tareas bloqueadas para no desmotivar al equipo",
        "Pones a todo el equipo a trabajar en los bloqueos",
        "Esperas a que se resuelvan solos"
      ],
      correctAnswer: 0,
      feedback: {
        correct: {
          title: "¡Buen manejo de bloqueos!",
          text: "Hacer los bloqueos visibles es el primer paso para resolverlos. Una columna 'Bloqueado' ayuda a identificarlos rápidamente.",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es la mejor solución...",
          text: "En Kanban, los problemas deben hacerse visibles para poder resolverlos. Ocultarlos o atacarlos caóticamente no ayuda.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El diagrama de flujo acumulado muestra una tendencia plana. ¿Qué significa?",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "El equipo está trabajando a buen ritmo",
        "Hay un cuello de botella que está ralentizando el flujo",
        "El proyecto está a punto de terminar",
        "El equipo no está registrando bien las tareas"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Análisis correcto!",
          text: "Una tendencia plana en el diagrama de flujo acumulado indica un cuello de botella que está impidiendo que las tareas fluyan hacia 'Terminado'.",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Interpretación incorrecta",
          text: "En Kanban, un flujo acumulado plano indica problemas en el flujo de trabajo, generalmente un cuello de botella que necesita atención.",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Qué columna debería tener el límite WIP más estricto?",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Backlog",
        "En Progreso",
        "Revisión/Testing",
        "Todas deben tener límites similares"
      ],
      correctAnswer: 2,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "La columna de Revisión/Testing suele ser el mayor cuello de botella, por lo que necesita un límite WIP más estricto.",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡No exactamente!",
          text: "En Kanban, los límites WIP suelen ser más estrictos en las columnas que son cuellos de botella comunes, como Revisión/Testing.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo sugiere añadir una columna 'En Espera de Aprobación'. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "La rechazas porque complica el tablero",
        "La añades con un límite WIP adecuado",
        "Dices que solo los managers pueden crear columnas",
        "La añades solo para este sprint"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Mejora continua!",
          text: "En Kanban, el tablero evoluciona para reflejar el proceso real. Añadir columnas para hacer visibles pasos importantes es una buena práctica.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Eso no es muy Kanban!",
          text: "Kanban promueve la mejora continua. Si un paso del proceso necesita hacerse visible, añadirlo al tablero (con límites WIP apropiados) es lo correcto.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El cliente pregunta cuándo estará listo el juego. ¿Qué le muestras?",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Un diagrama de Gantt con fechas estimadas",
        "El tablero Kanban y métricas de flujo",
        "Una lista de sprints planeados",
        "Un contrato con fechas de entrega fijas"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Transparencia Kanban!",
          text: "En Kanban, las predicciones se basan en métricas de flujo y el tablero visible muestra el estado real del trabajo.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es el enfoque Kanban",
          text: "Kanban se basa en transparencia y métricas de flujo para hacer predicciones, no en planes fijos o diagramas de Gantt.",
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
      title = "¡Juego exitoso! Eres un maestro Kanban";
      description = "El proyecto 'GameDev' es un éxito total. El flujo de trabajo es óptimo, el equipo eficiente y el juego de alta calidad. ¡Eres un líder Kanban excepcional!";
      image = "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 60) {
      title = "Proyecto en buen estado";
      description = "El proyecto 'GameDev' tiene un flujo de trabajo decente pero podría optimizarse. Revisa los conceptos Kanban para mejorar.";
      image = "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 40) {
      title = "Proyecto con problemas de flujo";
      description = "El proyecto 'GameDev' tiene varios cuellos de botella. El equipo está estresado y el juego tiene retrasos. Necesitas aplicar mejor Kanban.";
      image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else {
      title = "¡Desastre total!";
      description = "El proyecto 'GameDev' ha fracasado completamente. El equipo está desmoralizado y el juego nunca se lanzará. ¡Necesitas estudiar Kanban urgentemente!";
      image = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }

    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultImage.src = image;

    // Ajustar métricas visuales
    teamMetric.style.width = `${percentage}%`;
    clientMetric.style.width = `${Math.min(100, percentage + 10)}%`;
    qualityMetric.style.width = `${Math.min(100, percentage + 5)}%`;

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