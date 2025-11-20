/* ============================================
   EL PALACIO NACIONAL - GAME LOGIC
   ============================================ */

// ============================================
// ESTADO DEL JUEGO
// ============================================
const gameState = {
    presupuesto: 50,
    popularidad: 50,
    poder: 50,
    currentDecision: 0,
    decisions: []
};

// ============================================
// BASE DE DATOS DE DECISIONES
// ============================================
const decisionsData = [
    {
        id: 0,
        video: "assets/000.mp4",
        title: "📺 Introducción al Juego",
        meta: "Aprende las Mecánicas",
        context: [
            'Este es un tutorial que explica cómo funcionan los tres indicadores principales: <strong>Presupuesto</strong>, <strong>Popularidad</strong> y <strong>Poder</strong>.',
            'Cada decisión que tomes afectará estos indicadores de diferentes maneras. Tu objetivo es mantener un equilibrio y llegar al final del sexenio con un legado positivo.'
        ],
        prompt: "Debes elegir una opción para continuar:",
        isIntroduction: true,
        options: [
            {
                title: "Presupuesto",
                description: "Donde esté tu tesoro, allí estará también tu corazón. - Mateo 6:21",
                impacts: { presupuesto: 0, popularidad: 0, poder: 0 }
            },
            {
                title: "Popularidad",
                description: "La gloria es fugaz, pero la oscuridad es para siempre. - Napoleón Bonaparte",
                impacts: { presupuesto: 0, popularidad: 0, poder: 0 }
            },
            {
                title: "Poder",
                description: "El que domina a otros es fuerte; el que se domina a sí mismo es poderoso. - Lao-Tsé",
                impacts: { presupuesto: 0, popularidad: 0, poder: 0 }
            }
        ]
    },
    {
        id: 1,
        video: "assets/001.mp4",
        title: "🏛️ Decisión 1: La Bomba Fiscal",
        meta: "Mes 1 - Enero 2025",
        context: [
            'Tu Secretario de Hacienda, <strong>Roberto Villareal</strong>, entra a tu despacho con expresión grave. "Presidente, tenemos un problema serio. La administración anterior ocultó un déficit de <strong>$200 mil millones de pesos</strong>. No hay recursos suficientes para cumplir las promesas de campaña. Necesitamos actuar de inmediato."',
            'El país espera respuestas. Los medios ya están especulando. Tu primera decisión marcará el tono de todo tu sexenio.'
        ],
        prompt: "¿Cómo responderás a esta crisis?",
        options: [
            {
                title: "Austeridad republicana y transparencia total",
                description: "Anuncias recortes en gastos superfluos del gobierno y auditoría pública de todos los contratos. Medida responsable pero limitante.",
                impacts: { presupuesto: 10, popularidad: 5, poder: -5 }
            },
            {
                title: "Recortar programas sociales temporalmente",
                description: "Suspendes temporalmente becas y apoyos sociales para cerrar el déficit. Solución efectiva pero impopular.",
                impacts: { presupuesto: 15, popularidad: -15, poder: 0 }
            },
            {
                title: "Aumentar impuestos a grandes empresas",
                description: "Propones reforma fiscal progresiva. Popular entre ciudadanos pero genera oposición feroz del sector empresarial.",
                impacts: { presupuesto: 8, popularidad: 5, poder: -10 }
            }
        ]
    },
    {
        id: 2,
        video: "assets/002.mp4",
        title: "🌀 Decisión 2: El Huracán",
        meta: "Mes 2 - Febrero 2025",
        context: [
            'Un huracán categoría 4 amenaza la costa del Pacífico. <strong>50,000 personas</strong> están en riesgo. El Fondo de Desastres Naturales tiene $5,000 millones, pero cancelar "Jóvenes Construyendo el Futuro" liberaría otros $8,000 millones para reforzar la prevención.',
            'Tu equipo está dividido. El tiempo se agota. Las primeras lluvias ya comenzaron.'
        ],
        prompt: "¿Cómo protegerás a la población?",
        options: [
            {
                title: "Usar solo el fondo de desastres existente",
                description: "Mantener los programas sociales intactos y confiar en los recursos actuales. Riesgo de que sea insuficiente.",
                impacts: { presupuesto: -10, popularidad: 10, poder: 0 }
            },
            {
                title: "Cancelar programas temporalmente para reforzar prevención",
                description: "Suspender apoyos sociales y destinar todo al huracán. Efectivo pero genera protestas.",
                impacts: { presupuesto: 5, popularidad: -20, poder: -5 }
            },
            {
                title: "Solicitar préstamo de emergencia internacional",
                description: "Pedir $10,000 millones al FMI con intereses del 4%. Efectivo pero aumenta deuda.",
                impacts: { presupuesto: 15, popularidad: 0, poder: -10 }
            }
        ]
    },
    {
        id: 3,
        video: "assets/003.mp4",
        title: "📚 Decisión 3: El Sindicato de Maestros",
        meta: "Mes 3 - Marzo 2025",
        context: [
            'El sindicato de maestros convoca a paro nacional. Exigen <strong>15% de aumento salarial</strong> y rechazan toda evaluación de desempeño. Amenazan con paralizar el sistema educativo de 25 millones de estudiantes.',
            'Tu Secretaria de Educación advierte que ceder sentará un precedente peligroso. El líder sindical es un actor político poderoso.'
        ],
        prompt: "¿Cómo enfrentarás la crisis educativa?",
        options: [
            {
                title: "Negociar: 10% de aumento sin evaluaciones",
                description: "Compromiso intermedio que mantiene la paz pero no resuelve el problema de fondo.",
                impacts: { presupuesto: -15, popularidad: 10, poder: -5 }
            },
            {
                title: "Rechazar: No hay recursos para aumentos",
                description: "Mantener postura firme y enfrentar el paro. Riesgo de crisis prolongada pero defiende las finanzas.",
                impacts: { presupuesto: 0, popularidad: -15, poder: 10 }
            },
            {
                title: "Dar el 15% que piden",
                description: "Ceder completamente para evitar el conflicto. Costoso pero garantiza estabilidad inmediata.",
                impacts: { presupuesto: -25, popularidad: 20, poder: -10 }
            }
        ]
    },
    {
        id: 4,
        video: "assets/004.mp4",
        title: "⚖️ Decisión 4: El Escándalo de Corrupción",
        meta: "Mes 4 - Abril 2025",
        context: [
            'Los medios revelan que <strong>Roberto Villareal</strong>, tu mejor amigo y Secretario de Hacienda, adjudicó contratos a empresas de su familia por $500 millones. Él lo niega categóricamente y te llama llorando: "Sabes que soy inocente. Son mentiras de la oposición."',
            'Tu partido exige su renuncia inmediata. La oposición amenaza con juicio político. Las encuestas muestran que 68% del país cree que es culpable.'
        ],
        prompt: "¿Lealtad o institucionalidad?",
        options: [
            {
                title: "Defenderlo públicamente: Es inocente hasta que se pruebe",
                description: "Mostrar lealtad absoluta. Riesgo enorme si resulta culpable.",
                impacts: { presupuesto: 0, popularidad: -20, poder: 10 }
            },
            {
                title: "Pedir su renuncia para no entorpecer la investigación",
                description: "Sacrificarlo para salvar tu imagen. Traición que puede generar venganza.",
                impacts: { presupuesto: 0, popularidad: 15, poder: -10 }
            },
            {
                title: "Ordenar auditoría interna inmediata y transparente",
                description: "Buscar la verdad institucionalmente. Equilibrio pero consume tiempo y recursos.",
                impacts: { presupuesto: -5, popularidad: 10, poder: 5 }
            }
        ]
    },
    {
        id: 5,
        video: "assets/005.mp4",
        title: "🚨 Decisión 5: Crisis de Seguridad",
        meta: "Mes 6 - Junio 2025",
        context: [
            'La violencia se disparó <strong>35% en seis meses</strong>. Grupos criminales controlan 5 estados y desafían abiertamente al gobierno. El General Martínez propone militarización total. ONGs exigen estrategia social.',
            'Ayer masacraron a 12 policías en una emboscada. Las familias exigen justicia. Los gobernadores piden declarar estado de emergencia.'
        ],
        prompt: "¿Balas o abrazos?",
        options: [
            {
                title: "Militarización: Desplegar Guardia Nacional masivamente",
                description: "Mano dura contra el crimen organizado. Efectivo a corto plazo pero criticado internacionalmente.",
                impacts: { presupuesto: -15, popularidad: -10, poder: 25 }
            },
            {
                title: "Estrategia social: Invertir en comunidades vulnerables",
                description: "Atacar las causas de la violencia con educación y empleo. Visión a largo plazo pero resultados lentos.",
                impacts: { presupuesto: -20, popularidad: 15, poder: -15 }
            },
            {
                title: "Negociación secreta con grupos criminales",
                description: "Pactos de no agresión a cambio de reducir violencia. Peligroso y probablemente se filtre.",
                impacts: { presupuesto: 0, popularidad: 10, poder: 20 }
            }
        ]
    },
    {
        id: 6,
        video: "assets/006.mp4",
        title: "🏥 Decisión 6: Colapso del Sistema de Salud",
        meta: "Mes 8 - Agosto 2025",
        context: [
            'Los hospitales públicos están colapsados. <strong>Desabasto de medicamentos del 60%</strong>, equipo obsoleto, médicos renunciando masivamente. Una niña de 8 años murió esperando quimioterapia que nunca llegó. Su foto está en todos los periódicos.',
            'El Dr. Ramírez presenta tres opciones. Todas requieren sacrificios. El país observa.'
        ],
        prompt: "¿Cómo salvarás el sistema de salud?",
        options: [
            {
                title: "Crear nuevo Instituto Nacional de Salud unificado",
                description: "Reforma estructural profunda. Costosa y arriesgada pero puede resolver el problema de raíz.",
                impacts: { presupuesto: -25, popularidad: 20, poder: -10 }
            },
            {
                title: "Aumentar presupuesto al sistema fragmentado actual",
                description: "Inyectar dinero sin cambiar la estructura. Solución rápida pero ineficiente.",
                impacts: { presupuesto: -15, popularidad: 5, poder: 5 }
            },
            {
                title: "Alianza público-privada con hospitales privados",
                description: "Privatización parcial con seguro universal básico. Eficiente pero ideológicamente controversial.",
                impacts: { presupuesto: 10, popularidad: -15, poder: 10 }
            }
        ]
    },
    {
        id: 7,
        video: "assets/007.mp4",
        title: "🚄 Decisión 7: El Mega-Proyecto",
        meta: "Mes 10 - Octubre 2025",
        context: [
            'Propones el <strong>"Tren del Sureste"</strong> que conectará 5 estados y costará $150 mil millones. Promete desarrollo económico, empleos y turismo. Pero requiere endeudamiento masivo y hay resistencia ambiental.',
            'Tu gabinete está dividido 50-50. Roberto dice que es inviable. Carmen dice que será tu legado histórico. Decides tú.'
        ],
        prompt: "¿Visión o irresponsabilidad?",
        options: [
            {
                title: "Construir el proyecto completo",
                description: "Apuesta total por la infraestructura. Puede ser tu triunfo o tu tumba política.",
                impacts: { presupuesto: -30, popularidad: 10, poder: 15 }
            },
            {
                title: "Versión reducida: Solo tramos rentables",
                description: "Compromiso pragmático que reduce costos pero también impacto.",
                impacts: { presupuesto: -15, popularidad: 5, poder: 5 }
            },
            {
                title: "Cancelar: No es momento de mega-proyectos",
                description: "Priorizar estabilidad fiscal sobre ambición. Responsable pero poco inspirador.",
                impacts: { presupuesto: 10, popularidad: -10, poder: -15 }
            }
        ]
    },
    {
        id: 8,
        video: "assets/008.mp4",
        title: "⚖️ Decisión 8: La Encrucijada Democrática",
        meta: "Mes 12 - Diciembre 2025",
        context: [
            'La oposición tiene <strong>mayoría en el Congreso</strong> y bloquea absolutamente todas tus iniciativas. El país está paralizado. Puedes gobernar por decreto de emergencia (legal pero autoritario) o ceder a sus exigencias.',
            'Diego Herrera, líder opositor, ofrece negociar si aceptas 5 de sus 10 demandas. O puedes activar poderes ejecutivos especiales que te da la constitución.'
        ],
        prompt: "¿Democracia o eficiencia?",
        options: [
            {
                title: "Negociar: Aceptar 5 demandas de la oposición",
                description: "Ceder terreno para desbloquear el gobierno. Democrático pero pierdes control de tu agenda.",
                impacts: { presupuesto: -10, popularidad: 10, poder: -10 }
            },
            {
                title: "Gobernar por decreto presidencial",
                description: "Activar facultades constitucionales de emergencia. Efectivo pero autoritario.",
                impacts: { presupuesto: 0, popularidad: -15, poder: 25 }
            },
            {
                title: "Convocar diálogo nacional multipartidario",
                description: "Buscar consenso amplio con todos los sectores. Lento pero construye institucionalidad.",
                impacts: { presupuesto: 5, popularidad: 5, poder: -20 }
            }
        ]
    }
];

// ============================================
// BASE DE DATOS DE FINALES
// ============================================
const endings = {
    estadista: {
        title: "El Estadista Transformador",
        subtitle: "Un legado de equilibrio y progreso",
        icon: "👑",
        description: "Dejaste México mejor de lo que lo encontraste. Mantuviste el equilibrio entre eficiencia y democracia, entre desarrollo y responsabilidad fiscal. Las generaciones futuras estudiarán tu sexenio como ejemplo de liderazgo transformador. Tu nombre ingresa al panteón de los grandes presidentes mexicanos.",
        condition: (s) => s.popularidad > 60 && s.presupuesto > 50
    },
    autoritario: {
        title: "El Autoritario Eficiente",
        subtitle: "Progreso a costa de la democracia",
        icon: "⚔️",
        description: "México avanzó bajo tu gobierno... pero a qué costo. Construiste infraestructura imponente sobre una montaña de libertades suprimidas. Los trenes funcionan, pero las voces críticas fueron silenciadas. La historia te recordará con ambigüedad: ¿visionario necesario o tirano eficiente?",
        condition: (s) => s.poder > 70 && s.popularidad < 40
    },
    populista: {
        title: "El Populista Querido",
        subtitle: "Amado pero ineficiente",
        icon: "❤️",
        description: "Te amaron... pero no pudiste gobernar efectivamente. Dejaste las arcas vacías y las instituciones debilitadas, pero tu carisma conquistó corazones. México te dice adiós con lágrimas, sin saber si son de amor o de lástima por las oportunidades perdidas.",
        condition: (s) => s.popularidad > 60 && s.presupuesto < 30
    },
    tecnocrata: {
        title: "El Tecnócrata Invisible",
        subtitle: "Números fríos, país desconectado",
        icon: "📊",
        description: "Los indicadores económicos mejoraron. La gente no. Dejaste un país próspero en estadísticas pero desconectado en emociones, donde el PIB creció pero la esperanza se marchitó. Los economistas te aplauden. La ciudadanía apenas te recuerda.",
        condition: (s) => s.presupuesto > 60 && s.popularidad < 40 && s.poder < 60
    },
    colapso: {
        title: "El Colapso Institucional",
        subtitle: "Cuando todo se derrumbó",
        icon: "💥",
        description: "Todo se vino abajo. El Congreso inició juicio político. Las calles arden en protesta. El peso se desplomó. Entraste prometiendo transformación y dejaste ruinas. La pregunta histórica será: ¿eras incompetente o fuiste saboteado? Ambas respuestas te condenan.",
        condition: (s) => s.poder < 30 && s.presupuesto < 30 && s.popularidad < 30
    },
    equilibrista: {
        title: "El Equilibrista Mediocre",
        subtitle: "Ni malo ni bueno, solo olvidable",
        icon: "⚖️",
        description: "No fuiste el peor... tampoco el mejor. Cruzaste la meta sin gloria ni desastre. Navegaste el sexenio evitando catástrofes pero sin crear grandeza. En 10 años, cuando alguien pregunte '¿Quién gobernó de 2024 a 2030?', nadie recordará tu nombre. El castigo del olvido.",
        condition: (s) => s.presupuesto >= 40 && s.presupuesto <= 60 && s.popularidad >= 40 && s.popularidad <= 60 && s.poder >= 40 && s.poder <= 60
    }
};

// ============================================
// REFERENCIAS A ELEMENTOS DEL DOM
// ============================================
const DOM = {
    // Indicadores
    barPresupuesto: null,
    barPopularidad: null,
    barPoder: null,
    valuePresupuesto: null,
    valuePopularidad: null,
    valuePoder: null,
    progressText: null,

    // Pantalla cinemática
    cinematicScreen: null,
    cinematicVideo: null,
    skipHint: null,

    // Contenedor del juego
    gameContainer: null,
    contextSection: null,
    contextTitle: null,
    contextMeta: null,
    contextText: null,
    decisionPrompt: null,
    optionsContainer: null,

    // Modal de impacto
    impactModal: null,
    impactStats: null,
    continueButton: null,

    // Pantalla de final
    endingScreen: null,
    endingContent: null
};

// ============================================
// INICIALIZACIÓN
// ============================================
function initGame() {
    // Obtener referencias a elementos del DOM
    DOM.barPresupuesto = document.getElementById('barPresupuesto');
    DOM.barPopularidad = document.getElementById('barPopularidad');
    DOM.barPoder = document.getElementById('barPoder');
    DOM.valuePresupuesto = document.getElementById('valuePresupuesto');
    DOM.valuePopularidad = document.getElementById('valuePopularidad');
    DOM.valuePoder = document.getElementById('valuePoder');
    DOM.progressText = document.getElementById('progressText');

    DOM.cinematicScreen = document.getElementById('cinematicScreen');
    DOM.cinematicVideo = document.getElementById('cinematicVideo');
    DOM.skipHint = document.getElementById('skipHint');

    DOM.gameContainer = document.getElementById('gameContainer');
    DOM.contextTitle = document.getElementById('contextTitle');
    DOM.contextMeta = document.getElementById('contextMeta');
    DOM.contextText = document.getElementById('contextText');
    DOM.decisionPrompt = document.getElementById('decisionPrompt');
    DOM.optionsContainer = document.getElementById('optionsContainer');

    DOM.impactModal = document.getElementById('impactModal');
    DOM.impactStats = document.getElementById('impactStats');
    DOM.continueButton = document.getElementById('continueButton');

    DOM.endingScreen = document.getElementById('endingScreen');
    DOM.endingContent = document.getElementById('endingContent');

    // Event listeners
    DOM.continueButton.addEventListener('click', continueGame);
    
    // Event listener para saltar video con ESPACIO
    document.addEventListener('keydown', handleKeyPress);

    // Inicializar indicadores
    updateIndicators();

    // Cargar primera decisión
    loadDecision();
}

// ============================================
// MANEJO DE TECLADO
// ============================================
function handleKeyPress(e) {
    if (e.code === 'Space' && DOM.cinematicScreen.classList.contains('active')) {
        e.preventDefault();
        skipCinematic();
    }
}

// ============================================
// SISTEMA DE CINEMÁTICAS
// ============================================
function playCinematic(videoSrc) {
    return new Promise((resolve) => {
        // Configurar video
        DOM.cinematicVideo.src = videoSrc;
        
        // Mostrar pantalla cinemática
        DOM.cinematicScreen.classList.add('active');
        DOM.gameContainer.classList.remove('active');

        // Reproducir video
        DOM.cinematicVideo.play();

        // Mostrar hint después de 2 segundos
        setTimeout(() => {
            DOM.skipHint.classList.add('visible');
        }, 2000);

        // Cuando termine el video
        DOM.cinematicVideo.addEventListener('ended', function onEnded() {
            DOM.cinematicVideo.removeEventListener('ended', onEnded);
            endCinematic(resolve);
        });

        // Guardar resolve para poder usarlo en skip
        DOM.cinematicScreen.cinematicResolve = resolve;
    });
}

function skipCinematic() {
    if (DOM.cinematicScreen.cinematicResolve) {
        DOM.cinematicVideo.pause();
        endCinematic(DOM.cinematicScreen.cinematicResolve);
    }
}

function endCinematic(resolve) {
    // Ocultar pantalla cinemática
    DOM.cinematicScreen.classList.remove('active');
    DOM.skipHint.classList.remove('visible');
    
    // Mostrar contenedor del juego
    DOM.gameContainer.classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    resolve();
}

// ============================================
// CARGAR DECISIÓN
// ============================================
async function loadDecision() {
    const decision = decisionsData[gameState.currentDecision];
    
    // Actualizar progress tracker
    DOM.progressText.textContent = `${gameState.currentDecision + 1}/8`;

    // Reproducir cinemática (obligatoria)
    await playCinematic(decision.video);

    // Cargar contexto
    DOM.contextTitle.textContent = decision.title;
    DOM.contextMeta.textContent = decision.meta;
    
    let contextHTML = '';
    decision.context.forEach(p => {
        contextHTML += `<p>${p}</p>`;
    });
    DOM.contextText.innerHTML = contextHTML;

    // Cargar prompt de decisión
    DOM.decisionPrompt.textContent = decision.prompt;

    // Cargar opciones
    renderOptions(decision.options);
}

// ============================================
// RENDERIZAR OPCIONES
// ============================================
function renderOptions(options) {
    let optionsHTML = '';

    options.forEach((option, index) => {
        const impacts = option.impacts;
        let impactsHTML = '';

        // Presupuesto
        if (impacts.presupuesto !== 0) {
            const className = impacts.presupuesto > 0 ? 'positive' : 'negative';
            const sign = impacts.presupuesto > 0 ? '+' : '';
            impactsHTML += `
                <div class="impact ${className}">
                    <span class="impact-icon">💰</span>
                    <span>${sign}${impacts.presupuesto}</span>
                </div>
            `;
        } else {
            impactsHTML += `
                <div class="impact neutral">
                    <span class="impact-icon">💰</span>
                    <span>±0</span>
                </div>
            `;
        }

        // Popularidad
        if (impacts.popularidad !== 0) {
            const className = impacts.popularidad > 0 ? 'positive' : 'negative';
            const sign = impacts.popularidad > 0 ? '+' : '';
            impactsHTML += `
                <div class="impact ${className}">
                    <span class="impact-icon">❤️</span>
                    <span>${sign}${impacts.popularidad}</span>
                </div>
            `;
        } else {
            impactsHTML += `
                <div class="impact neutral">
                    <span class="impact-icon">❤️</span>
                    <span>±0</span>
                </div>
            `;
        }

        // Poder
        if (impacts.poder !== 0) {
            const className = impacts.poder > 0 ? 'positive' : 'negative';
            const sign = impacts.poder > 0 ? '+' : '';
            impactsHTML += `
                <div class="impact ${className}">
                    <span class="impact-icon">⚡</span>
                    <span>${sign}${impacts.poder}</span>
                </div>
            `;
        } else {
            impactsHTML += `
                <div class="impact neutral">
                    <span class="impact-icon">⚡</span>
                    <span>±0</span>
                </div>
            `;
        }

        optionsHTML += `
            <button class="option-button" data-option-index="${index}">
                <div class="option-header">
                    <div class="option-number">${index + 1}</div>
                    <div class="option-text">
                        <div class="option-title">${option.title}</div>
                        <div class="option-description">${option.description}</div>
                    </div>
                </div>
                <div class="option-impacts">
                    ${impactsHTML}
                </div>
            </button>
        `;
    });

    DOM.optionsContainer.innerHTML = optionsHTML;

    // Agregar event listeners a los botones
    const optionButtons = DOM.optionsContainer.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionIndex = parseInt(this.getAttribute('data-option-index'));
            selectOption(optionIndex);
        });
    });
}

// ============================================
// SELECCIONAR OPCIÓN
// ============================================
function selectOption(optionIndex) {
    const decision = decisionsData[gameState.currentDecision];
    const option = decision.options[optionIndex];
    
    // Guardar decisión
    gameState.decisions.push({
        decisionId: decision.id,
        optionIndex: optionIndex,
        timestamp: Date.now()
    });

    // Deshabilitar todos los botones
    const buttons = DOM.optionsContainer.querySelectorAll('.option-button');
    buttons.forEach(btn => btn.disabled = true);

    // Aplicar impactos al estado
    gameState.presupuesto += option.impacts.presupuesto;
    gameState.popularidad += option.impacts.popularidad;
    gameState.poder += option.impacts.poder;

    // Mostrar modal de impacto
    showImpactModal(option.impacts);
}

// ============================================
// ACTUALIZAR INDICADORES
// ============================================
function updateIndicators(animate = false) {
    const presupuesto = Math.max(0, Math.min(100, gameState.presupuesto));
    const popularidad = Math.max(0, Math.min(100, gameState.popularidad));
    const poder = Math.max(0, Math.min(100, gameState.poder));

    if (animate) {
        setTimeout(() => {
            DOM.barPresupuesto.style.width = presupuesto + '%';
            DOM.valuePresupuesto.textContent = Math.round(presupuesto);
        }, 200);

        setTimeout(() => {
            DOM.barPopularidad.style.width = popularidad + '%';
            DOM.valuePopularidad.textContent = Math.round(popularidad);
        }, 400);

        setTimeout(() => {
            DOM.barPoder.style.width = poder + '%';
            DOM.valuePoder.textContent = Math.round(poder);
        }, 600);
    } else {
        DOM.barPresupuesto.style.width = presupuesto + '%';
        DOM.barPopularidad.style.width = popularidad + '%';
        DOM.barPoder.style.width = poder + '%';

        DOM.valuePresupuesto.textContent = Math.round(presupuesto);
        DOM.valuePopularidad.textContent = Math.round(popularidad);
        DOM.valuePoder.textContent = Math.round(poder);
    }
}

// ============================================
// MOSTRAR MODAL DE IMPACTO
// ============================================
function showImpactModal(impacts) {
    let html = '';

    if (impacts.presupuesto !== 0) {
        const className = impacts.presupuesto > 0 ? 'positive' : 'negative';
        const sign = impacts.presupuesto > 0 ? '+' : '';
        html += `
            <div class="impact-stat">
                <div class="impact-stat-label">
                    <span class="impact-stat-icon">💰</span>
                    <span>Presupuesto</span>
                </div>
                <div class="impact-stat-value ${className}">
                    ${sign}${impacts.presupuesto}
                </div>
            </div>
        `;
    }

    if (impacts.popularidad !== 0) {
        const className = impacts.popularidad > 0 ? 'positive' : 'negative';
        const sign = impacts.popularidad > 0 ? '+' : '';
        html += `
            <div class="impact-stat">
                <div class="impact-stat-label">
                    <span class="impact-stat-icon">❤️</span>
                    <span>Popularidad</span>
                </div>
                <div class="impact-stat-value ${className}">
                    ${sign}${impacts.popularidad}
                </div>
            </div>
        `;
    }

    if (impacts.poder !== 0) {
        const className = impacts.poder > 0 ? 'positive' : 'negative';
        const sign = impacts.poder > 0 ? '+' : '';
        html += `
            <div class="impact-stat">
                <div class="impact-stat-label">
                    <span class="impact-stat-icon">⚡</span>
                    <span>Poder</span>
                </div>
                <div class="impact-stat-value ${className}">
                    ${sign}${impacts.poder}
                </div>
            </div>
        `;
    }

    DOM.impactStats.innerHTML = html;
    DOM.impactModal.classList.add('show');

    // Actualizar indicadores con animación
    updateIndicators(true);
}

// ============================================
// CONTINUAR JUEGO
// ============================================
function continueGame() {
    DOM.impactModal.classList.remove('show');

    // Avanzar a siguiente decisión
    gameState.currentDecision++;

    if (gameState.currentDecision >= decisionsData.length) {
        // Juego terminado - mostrar final
        showEnding();
    } else {
        // Cargar siguiente decisión
        setTimeout(() => {
            loadDecision();
        }, 300);
    }
}

// ============================================
// DETERMINAR FINAL
// ============================================
function determineEnding() {
    const s = gameState;
    
    // Verificar condiciones en orden de prioridad
    if (endings.colapso.condition(s)) return endings.colapso;
    if (endings.estadista.condition(s)) return endings.estadista;
    if (endings.autoritario.condition(s)) return endings.autoritario;
    if (endings.populista.condition(s)) return endings.populista;
    if (endings.tecnocrata.condition(s)) return endings.tecnocrata;
    
    return endings.equilibrista;
}

// ============================================
// MOSTRAR PANTALLA DE FINAL
// ============================================
function showEnding() {
    const ending = determineEnding();

    DOM.endingContent.innerHTML = `
        <h1 class="ending-title">${ending.title}</h1>
        <p class="ending-subtitle">${ending.subtitle}</p>
        
        <div class="ending-image">${ending.icon}</div>
        
        <div class="ending-description">${ending.description}</div>
        
        <div class="ending-stats-summary">
            <div class="ending-stat-item">
                <div class="ending-stat-label">💰 Presupuesto Final</div>
                <div class="ending-stat-value" style="color: #22c55e;">${Math.round(gameState.presupuesto)}</div>
            </div>
            <div class="ending-stat-item">
                <div class="ending-stat-label">❤️ Popularidad Final</div>
                <div class="ending-stat-value" style="color: #ef4444;">${Math.round(gameState.popularidad)}</div>
            </div>
            <div class="ending-stat-item">
                <div class="ending-stat-label">⚡ Poder Final</div>
                <div class="ending-stat-value" style="color: #f59e0b;">${Math.round(gameState.poder)}</div>
            </div>
        </div>

        <div>
            <button class="restart-button" onclick="restartGame()">
                🔄 Jugar de Nuevo
            </button>
            <button class="menu-button" onclick="goToMenu()">
                🏠 Menú Principal
            </button>
        </div>
    `;

    DOM.endingScreen.classList.add('show');
}

// ============================================
// REINICIAR JUEGO
// ============================================
function restartGame() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// ============================================
// VOLVER AL MENÚ
// ============================================
function goToMenu() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ============================================
// INICIAR EL JUEGO CUANDO SE CARGA LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', initGame);