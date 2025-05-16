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
  const productMetric = document.getElementById('productMetric');
  const qualityMetric = document.getElementById('qualityMetric');
  const restartQuiz = document.getElementById('restartQuiz');
  const progressBar = document.getElementById('progressBar');
  const currentQuestionSpan = document.getElementById('currentQuestion');

  // Preguntas del quiz
  const questions = [
    {
      question: "El Product Owner llega con 50 nuevas funcionalidades para el próximo sprint. ¿Qué haces como Scrum Master?",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Aceptas todo porque el PO tiene la última palabra",
        "Facilitas una sesión de refinamiento para priorizar",
        "Le dices al equipo que trabajen horas extras",
        "Rechazas todas las nuevas funcionalidades"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "El Scrum Master facilita el refinamiento del backlog para ayudar al PO a priorizar y al equipo a entender el trabajo.",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ups! No fue la mejor opción",
          text: "El Scrum Master no decide el trabajo, pero debe facilitar la colaboración entre PO y equipo para priorizar efectivamente.",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "Un miembro del equipo lleva 3 días bloqueado en un problema. ¿Cómo actúas?",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Le das más tiempo para resolverlo solo",
        "Organizas un taller de resolución con el equipo",
        "Le asignas la tarea a otro miembro del equipo",
        "Quitas la tarea del sprint backlog"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Buen trabajo Scrum Master!",
          text: "El Scrum Master debe ayudar al equipo a colaborar para resolver impedimentos, no resolverlos directamente.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Podría ser mejor",
          text: "En Scrum, los problemas se resuelven colaborativamente. El Scrum Master debe fomentar el trabajo en equipo.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El sprint review muestra que solo completaron el 40% del sprint goal. ¿Qué haces en la retrospectiva?",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Culpas al equipo por no trabajar lo suficiente",
        "Analizas con el equipo las causas y buscan mejoras",
        "Extiendes el sprint una semana más",
        "Ignoras el problema y pasas al siguiente sprint"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Enfoque Scrum correcto!",
          text: "La retrospectiva es para inspeccionar y adaptar. Buscar causas raíz y mejoras es clave en Scrum.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Eso no es muy Scrum...",
          text: "Scrum se basa en transparencia e inspección/adaptación. Culpar o ignorar problemas va contra sus valores.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Cuál de estos NO es un evento de Scrum?",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Sprint Planning",
        "Daily Scrum",
        "Sprint Review",
        "Reunión de estado semanal"
      ],
      correctAnswer: 3,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "Scrum solo tiene 4 eventos oficiales: Sprint Planning, Daily Scrum, Sprint Review y Sprint Retrospective.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ese no es un evento de Scrum!",
          text: "Scrum tiene eventos específicos con propósitos definidos. Las reuniones de estado semanales no son parte del framework.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo quiere saltarse la Daily porque están muy ocupados. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Aceptas porque el equipo sabe lo que hace",
        "Recuerdas el propósito de la Daily y la mantienes corta",
        "La conviertes en una reunión semanal",
        "Permites que cada uno envíe un email con su estado"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Buen manejo de la Daily!",
          text: "La Daily es sagrada en Scrum. Debe ser breve (15 mins) y enfocada en las 3 preguntas clave para sincronizar al equipo.",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Daily no tan ágil...",
          text: "La Daily Standup es esencial para la sincronización diaria del equipo. Saltársela o modificarla demasiado reduce su efectividad.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El burndown chart muestra que el equipo no alcanzará el sprint goal. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Esperas a ver si se recuperan al final",
        "Revisas con el equipo si necesitan ayuda o ajustar el scope",
        "Informas al cliente que no cumplirán",
        "Modificas el chart para que parezca que van bien"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Acción Scrum correcta!",
          text: "Como Scrum Master, debes facilitar que el equipo identifique problemas temprano y ajuste el plan si es necesario.",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es la mejor opción",
          text: "Scrum valora la transparencia. Esperar pasivamente o falsificar información va contra sus principios.",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Cuál de estos NO es un artefacto de Scrum?",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Product Backlog",
        "Sprint Backlog",
        "Incremento",
        "Diagrama de Gantt"
      ],
      correctAnswer: 3,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "Los artefactos de Scrum son Product Backlog, Sprint Backlog e Incremento. Los diagramas de Gantt son de métodos tradicionales.",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ese no es un artefacto de Scrum!",
          text: "Scrum tiene solo 3 artefactos oficiales que promueven transparencia e inspección.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo sugiere probar pair programming. ¿Cómo respondes?",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Lo rechazas porque no es parte de Scrum",
        "Sugieres probarlo en un sprint y evaluar resultados",
        "Obligas a todo el equipo a usarlo siempre",
        "Dices que es solo para equipos junior"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Mentalidad ágil!",
          text: "Scrum es un marco, no un método prescriptivo. El equipo puede adoptar prácticas técnicas que consideren útiles.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Eso no es muy Scrum!",
          text: "Scrum no prohíbe prácticas técnicas. El equipo es autónomo para elegir cómo hacer el trabajo.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El cliente quiere cambiar un requisito a mitad del sprint. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Rechazas el cambio porque rompe el sprint goal",
        "Aceptas el cambio y ajustas el sprint actual",
        "Discutes el impacto y lo planificas para el próximo sprint",
        "Le dices al equipo que lo haga sin decirle al PO"
      ],
      correctAnswer: 2,
      feedback: {
        correct: {
          title: "¡Manejo ágil de cambios!",
          text: "En Scrum, los cambios importantes deben esperar al próximo sprint para mantener el foco en el sprint goal actual.",
          image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Cuidado con los cambios!",
          text: "Scrum permite cambios pero protege al equipo durante el sprint. Los cambios importantes deben esperar al próximo planning.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El sprint review está lleno de stakeholders. ¿Cuál es tu rol como SM?",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Presentar todo el trabajo tú mismo",
        "Facilitar la reunión y asegurar la participación",
        "Tomar notas detalladas de todos los comentarios",
        "Limitar el tiempo de cada stakeholder a 2 minutos"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Rol correcto del SM!",
          text: "El Scrum Master facilita el evento pero el equipo es quien presenta el trabajo y el PO quien prioriza el feedback.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es el rol del Scrum Master",
          text: "En la review, el SM facilita pero el equipo muestra el trabajo y el PO gestiona el feedback. No es una presentación formal.",
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
      title = "¡Proyecto exitoso! Eres un Scrum Master experto";
      description = "El proyecto 'EduTech' es un éxito total. El equipo es altamente efectivo, entrega valor constantemente y sigue fielmente los principios Scrum. ¡Excelente trabajo!";
      image = "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 60) {
      title = "Proyecto en buen camino";
      description = "El proyecto 'EduTech' avanza bien pero podría mejorar. El equipo aplica Scrum con algunos desvíos menores. Revisa los conceptos clave para perfeccionar tu práctica.";
      image = "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 40) {
      title = "Proyecto con dificultades";
      description = "El proyecto 'EduTech' tiene varios problemas. El equipo no está aplicando bien Scrum y hay fricciones. Necesitas estudiar más el marco Scrum y sus principios.";
      image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else {
      title = "¡Fracaso del proyecto!";
      description = "El proyecto 'EduTech' ha sido cancelado. El equipo no entendía Scrum y el producto no progresaba. ¡Necesitas un repaso completo del marco Scrum antes de intentarlo de nuevo!";
      image = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }

    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultImage.src = image;

    // Ajustar métricas visuales
    teamMetric.style.width = `${percentage}%`;
    productMetric.style.width = `${Math.min(100, percentage + 10)}%`;
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