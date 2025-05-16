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
      question: "El Product Owner llega con 50 nuevas funcionalidades que quiere para el próximo sprint. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Aceptas todo porque el cliente siempre tiene la razón",
        "Priorizas con el PO en una reunión de refinamiento",
        "Le dices al equipo que trabajen horas extras",
        "Ignoras al PO y sigues con el plan original"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Buena decisión!",
          text: "Priorizar con el Product Owner es clave. Recuerda que en Ágil, el trabajo se planifica según capacidad y valor.",
          image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ups! No fue la mejor opción",
          text: "En Ágil, debemos balancear las necesidades del cliente con la capacidad del equipo. Aceptar todo sin priorizar lleva al caos.",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo lleva 3 días bloqueado en un problema técnico. ¿Cómo actúas?",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Organizas un taller de resolución con todo el equipo",
        "Les das más tiempo para que lo resuelvan solos",
        "Contratas a un consultor externo inmediatamente",
        "Eliminas la funcionalidad del sprint"
      ],
      correctAnswer: 0,
      feedback: {
        correct: {
          title: "¡Colaboración Ágil!",
          text: "Excelente. Fomentar la colaboración y el trabajo en equipo es clave en metodologías ágiles.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Podría ser mejor",
          text: "En Ágil, los problemas se resuelven colaborativamente. Aislar al equipo o tomar decisiones unilaterales no suele ser efectivo.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El sprint review muestra que solo completaron el 40% de lo planeado. ¿Cuál es tu acción?",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Cancelas las vacaciones del equipo hasta que se pongan al día",
        "Analizas con el equipo las causas en la retrospectiva",
        "Ocultas los números al cliente para evitar problemas",
        "Duplicas la duración del próximo sprint"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Enfoque Ágil correcto!",
          text: "Las retrospectivas son para aprender y mejorar. Identificar las causas raíz es mejor que buscar culpables.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Eso no es muy Ágil...",
          text: "Castigar al equipo u ocultar información va contra los valores ágiles. La transparencia y la mejora continua son clave.",
          image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El cliente quiere cambiar un requisito a mitad del sprint. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Rechazas el cambio porque rompe el contrato",
        "Aceptas el cambio y ajustas el sprint actual",
        "Discutes el impacto y lo planificas para el próximo sprint",
        "Le dices al equipo que lo haga sin decirle al PO"
      ],
      correctAnswer: 2,
      feedback: {
        correct: {
          title: "¡Manejo ágil de cambios!",
          text: "Los cambios son bienvenidos en Ágil, pero deben gestionarse adecuadamente considerando el impacto.",
          image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Cuidado con los cambios!",
          text: "En Ágil aceptamos cambios, pero no caóticamente. Hay que evaluar impacto y planificar adecuadamente.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "¿Cuál de estas NO es una reunión típica de Scrum?",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Daily Standup",
        "Retrospectiva",
        "Sprint Planning",
        "Reunión de crisis"
      ],
      correctAnswer: 3,
      feedback: {
        correct: {
          title: "¡Correcto!",
          text: "Las reuniones de crisis no son parte de Scrum. Los eventos oficiales son Sprint Planning, Daily Standup, Sprint Review y Retrospectiva.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Ups! Esa no es la respuesta",
          text: "Scrum tiene eventos definidos: Sprint Planning, Daily Standup, Sprint Review y Retrospectiva. Las reuniones de crisis no son parte del framework.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo discute mucho en la Daily Standup. ¿Cómo intervienes?",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Dejas que discutan todo lo que necesiten",
        "Recuerdas que la Daily es para sincronización, no para resolver problemas",
        "Cancelas las Dailys porque no funcionan",
        "Limitas a cada persona a 30 segundos"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Buen manejo de la Daily!",
          text: "La Daily Standup debe ser breve (15 mins max) y enfocada en 3 preguntas: ¿Qué hice ayer? ¿Qué haré hoy? ¿Hay impedimentos?",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Daily no tan ágil...",
          text: "La Daily Standup tiene un propósito específico. Si se convierte en una reunión larga de resolución de problemas, pierde su efectividad.",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El burndown chart muestra que el equipo no alcanzará el objetivo del sprint. ¿Qué haces?",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Esperas a ver si se recuperan al final",
        "Revisas con el equipo si necesitan ayuda o deben ajustar el scope",
        "Informas al cliente que no cumplirán",
        "Extiendes el sprint una semana más"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Acción ágil correcta!",
          text: "Como Scrum Master, debes facilitar que el equipo identifique problemas temprano y ajuste el plan si es necesario.",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "No es la mejor opción",
          text: "En Ágil, debemos ser proactivos. Esperar pasivamente o hacer cambios radicales sin consultar al equipo no es recomendable.",
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
          text: "Scrum tiene solo 3 artefactos oficiales: Product Backlog, Sprint Backlog e Incremento. Los diagramas de Gantt son de métodos tradicionales.",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El equipo sugiere probar pair programming. ¿Cómo respondes?",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Lo rechazas porque reduce la productividad a la mitad",
        "Sugieres probarlo en un sprint y evaluar resultados",
        "Obligas a todo el equipo a usarlo siempre",
        "Dices que es solo para equipos junior"
      ],
      correctAnswer: 1,
      feedback: {
        correct: {
          title: "¡Mentalidad ágil!",
          text: "Experimentar, inspeccionar y adaptar es clave en Ágil. Probar nuevas prácticas y evaluar su efectividad es excelente.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "¡Eso no es muy ágil!",
          text: "En Ágil, el equipo debe tener autonomía para probar mejoras. Rechazar ideas sin experimentar va contra los principios ágiles.",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
      }
    },
    {
      question: "El cliente está descontento con el progreso. ¿Cuál es tu primer acción?",
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      options: [
        "Organizas una reunión con el cliente para entender sus preocupaciones",
        "Le aseguras que todo está bajo control",
        "Culpas al equipo de desarrollo",
        "Pides más tiempo y presupuesto"
      ],
      correctAnswer: 0,
      feedback: {
        correct: {
          title: "¡Excelente enfoque!",
          text: "Escuchar activamente al cliente y entender sus necesidades es fundamental en metodologías ágiles.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        incorrect: {
          title: "Podrías manejar mejor la situación",
          text: "En Ágil, la transparencia y la colaboración con el cliente son clave. Evitar el problema o echar culpas no ayuda.",
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
      title = "¡Proyecto salvado! Eres un héroe Ágil";
      description = "El proyecto 'SuperApp' es un éxito total. El equipo está motivado, el cliente feliz y la calidad excelente. ¡Eres un Scrum Master excepcional!";
      image = "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 60) {
      title = "Proyecto en recuperación";
      description = "El proyecto 'SuperApp' tiene algunos problemas pero se puede salvar. Necesitas trabajar más en algunos conceptos ágiles clave.";
      image = "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else if (percentage >= 40) {
      title = "Proyecto en problemas";
      description = "El proyecto 'SuperApp' está en serios aprietos. El equipo está desmotivado y el cliente molesto. Necesitas repasar urgentemente metodologías ágiles.";
      image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    } else {
      title = "¡Desastre total!";
      description = "El proyecto 'SuperApp' ha fracasado completamente. El equipo está desmoralizado y el cliente ha cancelado el contrato. ¡Necesitas estudiar Ágil desde cero!";
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