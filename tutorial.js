/* ============================================
   TUTORIAL - EL PALACIO NACIONAL
   ============================================ */

// ============================================
// ESTADO DEL TUTORIAL
// ============================================
const tutorialState = {
    presupuesto: 50,
    popularidad: 50,
    poder: 50,
    currentStep: 0,
    completed: false
};

// ============================================
// PASOS DEL TUTORIAL
// ============================================
const tutorialSteps = [
    { // 0
        id: 'welcome',
        instruction: 'Lee el mensaje de bienvenida',
        tooltipId: null,
        highlightSelector: null,
        stepText: 'Paso 1 de 6'
    },
    { // 1
        id: 'indicators',
        instruction: 'Observa los indicadores en la parte superior',
        tooltipId: 'tooltipIndicators',
        highlightSelector: '.indicators-bar', // Usamos selector de clase
        stepText: 'Paso 2 de 6'
    },
    { // 2
        id: 'video',
        instruction: 'Mira el video cinemático (o sáltalo con ESPACIO)',
        tooltipId: null,
        highlightSelector: null,
        stepText: 'Paso 3 de 6'
    },
    { // 3
        id: 'context',
        instruction: 'Lee el contexto de la situación',
        tooltipId: 'tooltipContext',
        highlightSelector: '#contextSection',
        stepText: 'Paso 4 de 6'
    },
    { // 4
        id: 'options',
        instruction: 'Analiza tus opciones y elige una',
        tooltipId: 'tooltipOptions',
        highlightSelector: '#optionsContainer',
        stepText: 'Paso 5 de 6'
    },
    { // 5
        id: 'impact',
        instruction: 'Revisa las consecuencias de tu decisión',
        tooltipId: 'tooltipImpact',
        highlightSelector: '#impactModal', 
        stepText: 'Paso 6 de 6'
    },
    { // 6
        id: 'end',
        instruction: '¡Tutorial completado!',
        tooltipId: null,
        highlightSelector: null,
        stepText: 'Completado'
    }
];

// ============================================
// DECISIÓN DEL TUTORIAL (Completada)
// ============================================
const tutorialDecision = {
    id: 1,
    video: "assets/001.mp4", // Asegúrate que esta ruta sea correcta
    title: "🏛️ Decisión Tutorial: La Bomba Fiscal",
    meta: "Tutorial - Tu Primera Crisis",
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
};

// ============================================
// REFERENCIAS AL DOM (se asignarán en 'init')
// ============================================
let dom = {};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Asignar referencias del DOM
    dom = {
        tutorialOverlay: document.getElementById('tutorialOverlay'),
        tutorialIndicator: document.getElementById('tutorialIndicator'),
        stepNumber: document.getElementById('stepNumber'),
        stepText: document.getElementById('stepText'),
        tutorialInstruction: document.getElementById('tutorialInstruction'),
        
        indicatorsBar: document.querySelector('.indicators-bar'), // Corregido
        barPresupuesto: document.getElementById('barPresupuesto'),
        valuePresupuesto: document.getElementById('valuePresupuesto'),
        barPopularidad: document.getElementById('barPopularidad'),
        valuePopularidad: document.getElementById('valuePopularidad'),
        barPoder: document.getElementById('barPoder'),
        valuePoder: document.getElementById('valuePoder'),

        tooltips: document.querySelectorAll('.tutorial-tooltip'),
        
        cinematicScreen: document.getElementById('cinematicScreen'),
        cinematicVideo: document.getElementById('cinematicVideo'),
        videoHint: document.getElementById('videoHint'),
        videoProgress: document.getElementById('videoProgress'),

        gameContainer: document.getElementById('gameContainer'),
        contextSection: document.getElementById('contextSection'),
        contextTitle: document.getElementById('contextTitle'),
        contextMeta: document.getElementById('contextMeta'),
        contextText: document.getElementById('contextText'),
        
        decisionSection: document.getElementById('decisionSection'),
        decisionPrompt: document.getElementById('decisionPrompt'),
        optionsContainer: document.getElementById('optionsContainer'),

        impactModal: document.getElementById('impactModal'),
        impactStats: document.getElementById('impactStats'),
        continueButton: document.getElementById('continueButton'),

        tutorialEndScreen: document.getElementById('tutorialEndScreen'),
        finalPresupuesto: document.getElementById('finalPresupuesto'),
        finalPopularidad: document.getElementById('finalPopularidad'),
        finalPoder: document.getElementById('finalPoder')
    };

    // --- ESTADO INICIAL ---
    // Ocultar todos los paneles principales que no sean el overlay
    dom.gameContainer.style.display = 'none';
    dom.cinematicScreen.style.display = 'none';
    dom.tutorialEndScreen.style.display = 'none';
    dom.tutorialIndicator.classList.remove('active');
    // El modal de impacto ya está oculto por CSS, pero lo aseguramos
    dom.impactModal.style.display = 'none'; 
    // El overlay es visible por defecto

    // Adjuntar listeners de teclado para saltar video
    document.addEventListener('keydown', handleKeyPress);
    // Adjuntar listeners de video
    dom.cinematicVideo.addEventListener('timeupdate', updateVideoProgress);
    dom.cinematicVideo.addEventListener('ended', skipVideo);

    // Iniciar en el paso 0 (bienvenida)
    goToStep(0);
    // Actualizar indicadores a su estado inicial (50)
    updateIndicators();
});

// ============================================
// FUNCIONES GLOBALES (llamadas desde onclick)
// ============================================

/**
 * Inicia el tutorial después del modal de bienvenida.
 */
function startTutorial() {
    dom.tutorialOverlay.style.display = 'none'; // Oculta el modal
    dom.tutorialIndicator.classList.add('active'); // Muestra la barra de pasos
    goToStep(1); // Ir al paso 1 (indicadores)
}

/**
 * Avanza al siguiente paso del tutorial.
 * Llamado por los botones "Entendido" en los tooltips.
 */
function nextTooltip() {
    goToStep(tutorialState.currentStep + 1);
}

/**
 * Inicia el juego completo (simulado).
 */
function startFullGame() {
    alert("Iniciando juego completo...");
    // window.location.href = 'game.html'; 
}

/**
 * Vuelve al menú principal (simulado).
 */
function goToMenu() {
    alert("Volviendo al menú principal...");
    // window.location.href = 'index.html'; 
}

// ============================================
// LÓGICA DEL TUTORIAL
// ============================================

/**
 * Motor principal del tutorial. Avanza al paso especificado.
 * @param {number} stepIndex - El índice del paso en tutorialSteps.
 */
function goToStep(stepIndex) {
    tutorialState.currentStep = stepIndex;
    const step = tutorialSteps[stepIndex];

    if (!step) return; // No hay más pasos

    // 1. Ocultar todos los paneles y elementos
    hideAllPanels();
    hideAllTooltips();
    removeHighlights();

    // 2. Actualizar indicador inferior
    dom.stepNumber.textContent = stepIndex > 0 ? stepIndex : 1;
    dom.stepText.textContent = step.stepText;
    dom.tutorialInstruction.textContent = step.instruction;

    // 3. Mostrar tooltip y resaltado del paso
    showTooltip(step.tooltipId);
    addHighlight(step.highlightSelector);
    
    // 4. Lógica específica del paso (mostrar el panel correcto)
    switch (step.id) {
        case 'welcome':
            dom.tutorialOverlay.style.display = 'flex';
            break;
        case 'indicators':
            // No se muestra ningún panel, solo el tooltip
            break;
        case 'video':
            dom.cinematicScreen.style.display = 'flex'; // Mostrar video
            playCinematic();
            break;
        case 'context':
            dom.gameContainer.style.display = 'block'; // Mostrar juego
            loadTutorialDecision(); // Cargar la decisión en la UI
            break;
        case 'options':
            dom.gameContainer.style.display = 'block'; // Mantener juego visible
            break;
        case 'impact':
            // Este paso se activa después de 'selectOption'
            // El modal se muestra con 'showImpactModal()'
            // Asignar el botón de continuar del modal
            dom.continueButton.onclick = () => {
                 dom.impactModal.style.display = 'none'; // Ocultar modal
                 goToStep(tutorialState.currentStep + 1); // Ir al paso 'end'
            };
            break;
        case 'end':
            dom.tutorialIndicator.classList.remove('active');
            showEndScreen();
            break;
    }
}

/**
 * Oculta todos los paneles principales.
 */
function hideAllPanels() {
    dom.tutorialOverlay.style.display = 'none';
    dom.gameContainer.style.display = 'none';
    dom.cinematicScreen.style.display = 'none';
    dom.tutorialEndScreen.style.display = 'none';
    dom.impactModal.style.display = 'none';
}

/**
 * Oculta todos los tooltips.
 */
function hideAllTooltips() {
    dom.tooltips.forEach(t => t.classList.remove('active'));
}

/**
 * Quita todos los resaltados.
 */
function removeHighlights() {
    document.querySelectorAll('.tutorial-highlight').forEach(h => h.classList.remove('tutorial-highlight'));
}

/**
 * Muestra un tooltip por su ID.
 * @param {string} tooltipId - El ID del elemento tooltip.
 */
function showTooltip(tooltipId) {
    if (tooltipId) {
        document.getElementById(tooltipId).classList.add('active');
    }
}

/**
 * Añade la clase de resaltado a un elemento por su selector.
 * @param {string} selector - El selector CSS del elemento a resaltar.
 */
function addHighlight(selector) {
    if (selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('tutorial-highlight');
        }
    }
}

// ============================================
// LÓGICA DE VIDEO
// ============================================

function playCinematic() {
    dom.cinematicVideo.src = tutorialDecision.video;
    dom.cinematicVideo.play().catch(e => {
        console.warn("Reproducción automática bloqueada. Se requiere interacción.");
    });
}

function updateVideoProgress() {
    if (dom.cinematicVideo.duration) {
        const percent = (dom.cinematicVideo.currentTime / dom.cinematicVideo.duration) * 100;
        dom.videoProgress.style.width = `${percent}%`;
    }
}

function skipVideo() {
    dom.cinematicVideo.pause();
    if (tutorialState.currentStep === 2) { 
        goToStep(3); // Avanzar al paso 'context'
    }
}

function handleKeyPress(e) {
    if (e.code === 'Space' && tutorialState.currentStep === 2) {
        e.preventDefault(); 
        skipVideo();
    }
}

// ============================================
// LÓGICA DE DECISIÓN
// ============================================

function loadTutorialDecision() {
    dom.contextTitle.innerHTML = tutorialDecision.title;
    dom.contextMeta.innerHTML = tutorialDecision.meta;
    dom.contextText.innerHTML = tutorialDecision.context.map(p => `<p>${p}</p>`).join('');
    dom.decisionPrompt.innerHTML = tutorialDecision.prompt;

    dom.optionsContainer.innerHTML = ''; // Limpiar opciones
    tutorialDecision.options.forEach((option, index) => {
        dom.optionsContainer.innerHTML += createOptionHTML(option, index);
    });
}

function createOptionHTML(option, index) {
    const impactsMap = option.impacts;
    let impactsHTML = '';
    const iconMap = {
        presupuesto: '💰',
        popularidad: '❤️',
        poder: '⚡'
    };

    Object.keys(impactsMap).forEach(key => {
        const value = impactsMap[key];
        if (value === 0) return; // No mostrar impactos nulos
        let className = value > 0 ? 'positive' : 'negative';
        
        impactsHTML += `
            <div class="impact ${className}">
                <span class="impact-icon">${iconMap[key]}</span>
                <span>${value > 0 ? '+' : ''}${value}</span>
            </div>
        `;
    });
    
    // Necesitamos replicar la estructura HTML de 'game.css' (del 'codigo base')
    // Esa estructura no está en 'tutorial.html', así que la creamos aquí
    // basado en la estructura de 'game.html' del 'codigo base'.
    // ***
    // CORRECCIÓN: 'tutorial.html' NO usa la misma estructura que 'game.html'.
    // 'tutorial.html' no tiene '.option-header', '.option-number', etc.
    // El 'game.css' linkeado NO se aplicará bien a 'optionsContainer'.
    //
    // VOY A ASUMIR que el HTML de 'game-container' en 'tutorial.html'
    // debería tener los botones creados dinámicamente.
    // La estructura de 'game.css' (en 'codigo base') espera:
    // <button class="option-button">
    //   <div class="option-header">
    //     <div class="option-number">1</div>
    //     <div class="option-text">
    //       <div class="option-title">...</div>
    //       <div class="option-description">...</div>
    //     </div>
    //   </div>
    //   <div class="option-impacts">...</div>
    // </button>
    // 
    // `tutorial.html` NO tiene esta estructura. Voy a crearla.

    return `
        <button class="option-button" onclick="selectOption(${index})">
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
}

function selectOption(optionIndex) {
    if (tutorialState.currentStep !== 4) return; 

    const option = tutorialDecision.options[optionIndex];
    
    document.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);

    tutorialState.presupuesto += option.impacts.presupuesto;
    tutorialState.popularidad += option.impacts.popularidad;
    tutorialState.poder += option.impacts.poder;

    showImpactModal(option.impacts);
    updateIndicators(true); 
    goToStep(5);
}

// ============================================
// LÓGICA DE INDICADORES Y MODAL
// ============================================

function updateIndicators(animate = false) {
    const values = {
        presupuesto: Math.max(0, Math.min(100, tutorialState.presupuesto)),
        popularidad: Math.max(0, Math.min(100, tutorialState.popularidad)),
        poder: Math.max(0, Math.min(100, tutorialState.poder))
    };

    const bars = {
        presupuesto: dom.barPresupuesto,
        popularidad: dom.barPopularidad,
        poder: dom.barPoder
    };

    const labels = {
        presupuesto: dom.valuePresupuesto,
        popularidad: dom.valuePopularidad,
        poder: dom.valuePoder
    };

    ['presupuesto', 'popularidad', 'poder'].forEach((key, index) => {
        const action = () => {
            if (bars[key]) {
                bars[key].style.width = values[key] + '%';
                labels[key].textContent = Math.round(values[key]);
            }
        };
        
        if (animate) {
            setTimeout(action, index * 200 + 200);
        } else {
            action();
        }
    });
}

function showImpactModal(impacts) {
    let html = '';
    const map = {
        presupuesto: { icon: '💰', label: 'Presupuesto' },
        popularidad: { icon: '❤️', label: 'Popularidad' },
        poder: { icon: '⚡', label: 'Poder' }
    };

    for (const key in impacts) {
        if (impacts[key] !== 0) {
            const value = impacts[key];
            const className = value > 0 ? 'positive' : 'negative';
            const sign = value > 0 ? '+' : '';
            html += `
                <div class="impact-stat">
                    <div class="impact-stat-label">
                        <span class="impact-stat-icon">${map[key].icon}</span>
                        <span>${map[key].label}</span>
                    </div>
                    <div class="impact-stat-value ${className}">
                        ${sign}${value}
                    </div>
                </div>
            `;
        }
    }
    
    dom.impactStats.innerHTML = html;
    dom.impactModal.style.display = 'flex'; // Usar flex para mostrarlo
}
        
// ============================================
// LÓGICA DE FIN DE TUTORIAL
// ============================================

function showEndScreen() {
    dom.tutorialEndScreen.style.display = 'flex';
    
    const finalP = Math.round(tutorialState.presupuesto);
    const finalO = Math.round(tutorialState.popularidad);
    const finalW = Math.round(tutorialState.poder);

    dom.finalPresupuesto.textContent = finalP;
    dom.finalPopularidad.textContent = finalO;
    dom.finalPoder.textContent = finalW;

    dom.finalPresupuesto.style.color = finalP >= 50 ? '#22c55e' : '#ef4444';
    dom.finalPopularidad.style.color = finalO >= 50 ? '#22c55e' : '#ef4444';
    dom.finalPoder.style.color = finalW >= 50 ? '#22c55e' : '#ef4444';
}