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
    decisions: [],
    randomizedOrder: [] // Orden aleatorizado de decisiones (excluyendo la introducción)
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
        title: "🏛️ Decisión: La Bomba Fiscal",
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
        title: "🌀 Decisión: El Huracán",
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
        title: "📚 Decisión: El Sindicato de Maestros",
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
        title: "⚖️ Decisión: El Escándalo de Corrupción",
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
        title: "🚨 Decisión: Crisis de Seguridad",
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
        title: "🏥 Decisión: Colapso del Sistema de Salud",
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
        title: "🚄 Decisión: El Mega-Proyecto",
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
        title: "⚖️ Decisión: La Encrucijada Democrática",
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
    },
    {
        id: 9,
        video: "assets/009.mp4",
        title: "⚖️ Decisión: Reforma Judicial",
        meta: "Mes 13 - Enero 2026",
        context: [
            'Se propone elegir jueces y magistrados por voto popular. El país se divide: unos lo ven como democratización, otros como riesgo a la independencia judicial.',
            'Los expertos constitucionales advierten sobre las implicaciones. Los partidos políticos toman posiciones encontradas. La decisión marcará el futuro del sistema judicial mexicano.'
        ],
        prompt: "¿Cómo enfrentarás la reforma judicial?",
        options: [
            {
                title: "Impulsar la reforma completa",
                description: "Democratizar la justicia mediante elección popular de jueces. Popular pero arriesgado para la independencia judicial.",
                impacts: { presupuesto: -10, popularidad: 15, poder: -10 }
            },
            {
                title: "Negociar versión moderada",
                description: "Buscar un punto medio que satisfaga a ambas partes. Equilibrio pero puede no contentar a nadie.",
                impacts: { presupuesto: -5, popularidad: 5, poder: 0 }
            },
            {
                title: "Rechazarla por inestabilidad institucional",
                description: "Mantener el sistema actual para preservar la independencia judicial. Conservador pero estable.",
                impacts: { presupuesto: 10, popularidad: -10, poder: 15 }
            }
        ]
    },
    {
        id: 10,
        video: "assets/010.mp4",
        title: "📱 Decisión: Influencers en Palacio",
        meta: "Mes 14 - Febrero 2026",
        context: [
            'Tu equipo de comunicación propone invitar a influencers para transmitir desde Palacio Nacional y mejorar tu imagen con los jóvenes.',
            'Algunos ven esto como modernización necesaria. Otros lo consideran una banalización de la institución presidencial. Las redes sociales ya están especulando.'
        ],
        prompt: "¿Permitirás influencers en Palacio Nacional?",
        options: [
            {
                title: "Aceptar la colaboración mediática",
                description: "Abrir las puertas a influencers para conectar con las nuevas generaciones. Moderno pero controvertido.",
                impacts: { presupuesto: -5, popularidad: 15, poder: -5 }
            },
            {
                title: "Solo permitir difusión institucional",
                description: "Permitir transmisiones pero con control gubernamental del contenido. Equilibrio entre modernidad y seriedad.",
                impacts: { presupuesto: 0, popularidad: 5, poder: 5 }
            },
            {
                title: "Prohibir totalmente influencers",
                description: "Mantener la solemnidad institucional sin concesiones. Tradicional pero desconectado de la juventud.",
                impacts: { presupuesto: 5, popularidad: -10, poder: 10 }
            }
        ]
    },
    {
        id: 11,
        video: "assets/011.mp4",
        title: "🌡️ Decisión: Crisis Ambiental",
        meta: "Mes 15 - Marzo 2026",
        context: [
            'Una ola de calor extremo afecta varias regiones del país. La población exige declarar emergencia ambiental.',
            'Los hospitales reportan casos de deshidratación masiva. Los agricultores pierden cosechas. El país observa tu respuesta ante esta crisis climática.'
        ],
        prompt: "¿Cómo responderás a la emergencia climática?",
        options: [
            {
                title: "Declarar emergencia nacional",
                description: "Activar todos los recursos del estado para enfrentar la crisis. Costoso pero muestra compromiso real.",
                impacts: { presupuesto: -15, popularidad: 15, poder: -5 }
            },
            {
                title: "Apoyar con subsidios eléctricos",
                description: "Ayudar a la población con costos de energía sin declarar emergencia. Solución intermedia y pragmática.",
                impacts: { presupuesto: -10, popularidad: 10, poder: 0 }
            },
            {
                title: "Minimizar la situación",
                description: "Tratar el tema como un fenómeno temporal sin medidas extraordinarias. Ahorra recursos pero genera descontento.",
                impacts: { presupuesto: 5, popularidad: -20, poder: 10 }
            }
        ]
    },
    {
        id: 12,
        video: "assets/012.mp4",
        title: "💻 Decisión: Escándalo de Corrupción Tecnológica",
        meta: "Mes 16 - Abril 2026",
        context: [
            'Una filtración revela que funcionarios usaron contratos con una empresa de software fantasma para comprar equipos a sobreprecio.',
            'Los medios exigen transparencia. La oposición habla de corrupción sistémica. Tu gabinete está dividido sobre cómo manejar la crisis.'
        ],
        prompt: "¿Cómo manejarás el escándalo tecnológico?",
        options: [
            {
                title: "Abrir investigación pública",
                description: "Transparencia total y rendición de cuentas. Democrático pero puede exponer más casos.",
                impacts: { presupuesto: -5, popularidad: 15, poder: -10 }
            },
            {
                title: "Sancionar discretamente a los implicados",
                description: "Resolver el problema internamente sin escándalo público. Eficiente pero poco transparente.",
                impacts: { presupuesto: 0, popularidad: 5, poder: 0 }
            },
            {
                title: "Encubrir para evitar crisis política",
                description: "Negar y minimizar para proteger la imagen del gobierno. Peligroso si se descubre la verdad.",
                impacts: { presupuesto: 5, popularidad: -15, poder: 10 }
            }
        ]
    },
    {
        id: 13,
        video: "assets/013.mp4",
        title: "🤖 Decisión: IA y Empleo",
        meta: "Mes 17 - Mayo 2026",
        context: [
            'Empresas tecnológicas comienzan a reemplazar trabajadores con inteligencia artificial. Sindicatos piden intervención del gobierno.',
            'El debate divide al país: ¿progreso tecnológico o protección laboral? Las empresas amenazan con desinversión si se regula demasiado.'
        ],
        prompt: "¿Cómo regularás la inteligencia artificial?",
        options: [
            {
                title: "Regular la IA y proteger empleos",
                description: "Establecer límites a la automatización para preservar trabajos. Popular entre trabajadores pero impopular con empresarios.",
                impacts: { presupuesto: -15, popularidad: 20, poder: -5 }
            },
            {
                title: "Fomentar la automatización",
                description: "Acelerar la adopción de IA para aumentar competitividad. Eficiente económicamente pero genera desempleo.",
                impacts: { presupuesto: 10, popularidad: -10, poder: 10 }
            },
            {
                title: "Crear un impuesto a robots",
                description: "Gravar la automatización para financiar programas de reconversión laboral. Solución innovadora pero compleja.",
                impacts: { presupuesto: 5, popularidad: 5, poder: -10 }
            }
        ]
    },
    {
        id: 14,
        video: "assets/014.mp4",
        title: "⛽ Decisión: Gasolinazo 2.0",
        meta: "Mes 18 - Junio 2026",
        context: [
            'El precio internacional del petróleo se dispara y Hacienda propone aumentar el costo del combustible. El país amenaza con protestas.',
            'Recuerdas el "gasolinazo" de administraciones anteriores. Las calles podrían incendiarse. Pero las finanzas públicas lo requieren.'
        ],
        prompt: "¿Cómo manejarás el aumento del precio de la gasolina?",
        options: [
            {
                title: "Subir el precio gradualmente",
                description: "Aumento controlado para no impactar de golpe. Responsable fiscalmente pero impopular.",
                impacts: { presupuesto: 15, popularidad: -10, poder: 0 }
            },
            {
                title: "Congelar precios temporalmente",
                description: "Absorber el costo con subsidios gubernamentales. Popular pero insostenible a largo plazo.",
                impacts: { presupuesto: -10, popularidad: 10, poder: -5 }
            },
            {
                title: "Culpar a la administración anterior",
                description: "Desviar responsabilidad política. Estratégico pero poco honesto.",
                impacts: { presupuesto: 0, popularidad: -5, poder: 10 }
            }
        ]
    },
    {
        id: 15,
        video: "assets/015.mp4",
        title: "📺 Decisión: Reality Show Presidencial",
        meta: "Mes 19 - Julio 2026",
        context: [
            'Una televisora propone grabar un reality show sobre tu vida diaria en Los Pinos. Dicen que humanizará tu figura ante el público.',
            'Tu equipo de comunicación está dividido. Algunos ven oportunidad de conexión, otros ven riesgo de frivolización del cargo.'
        ],
        prompt: "¿Aceptarás el reality show presidencial?",
        options: [
            {
                title: "Aceptar y mostrar transparencia",
                description: "Abrir completamente las puertas para mostrar el día a día. Muy popular pero arriesgado.",
                impacts: { presupuesto: -5, popularidad: 20, poder: -10 }
            },
            {
                title: "Negociar edición controlada",
                description: "Permitir el programa pero con supervisión del contenido. Equilibrio entre exposición y control.",
                impacts: { presupuesto: 0, popularidad: 10, poder: 0 }
            },
            {
                title: "Rechazar por dignidad institucional",
                description: "Mantener la seriedad del cargo sin concesiones mediáticas. Tradicional pero puede parecer distante.",
                impacts: { presupuesto: 0, popularidad: -10, poder: 10 }
            }
        ]
    },
    {
        id: 16,
        video: "assets/016.mp4",
        title: "🔐 Decisión: Ciberataque al SAT",
        meta: "Mes 20 - Agosto 2026",
        context: [
            'Un grupo de hackers filtra datos de millones de contribuyentes. La ciudadanía exige explicaciones por la vulnerabilidad del sistema.',
            'Los datos personales y financieros están expuestos. Los expertos en ciberseguridad advierten sobre el riesgo de fraude masivo. El país observa tu respuesta.'
        ],
        prompt: "¿Cómo responderás al ciberataque?",
        options: [
            {
                title: "Pagar rescate digital para recuperar datos",
                description: "Negociar con los hackers para proteger la información ciudadana. Rápido pero peligroso y costoso.",
                impacts: { presupuesto: -20, popularidad: -5, poder: 5 }
            },
            {
                title: "Negociar con los hackers anónimamente",
                description: "Buscar solución discreta sin reconocer públicamente el pago. Pragmático pero éticamente cuestionable.",
                impacts: { presupuesto: -10, popularidad: 0, poder: -5 }
            },
            {
                title: "Negarse y reconstruir el sistema",
                description: "Rechazar cualquier negociación y reconstruir desde cero. Costoso y lento pero muestra firmeza.",
                impacts: { presupuesto: -25, popularidad: 15, poder: -10 }
            }
        ]
    },
    {
        id: 17,
        video: "assets/017.mp4",
        title: "🚜 Decisión: Paro de Agricultores",
        meta: "Mes 21 - Septiembre 2026",
        context: [
            'Productores agrícolas bloquean carreteras federales en varios estados. Reclaman precios justos para sus cosechas y subsidios atrasados. La protesta amenaza con desabastecer alimentos básicos en todo el país.',
            'Las ciudades comienzan a sentir el desabasto. Los supermercados reportan escasez. El tiempo se agota antes de que la crisis alimentaria se vuelva crítica.'
        ],
        prompt: "¿Cómo resolverás el conflicto agrícola?",
        options: [
            {
                title: "Negociar subsidios de emergencia",
                description: "Ceder a las demandas para desbloquear las carreteras rápidamente. Popular pero costoso.",
                impacts: { presupuesto: -15, popularidad: 15, poder: -5 }
            },
            {
                title: "Enviar fuerzas de seguridad para liberar carreteras",
                description: "Usar la fuerza para desbloquear las vías. Efectivo pero genera confrontación y descontento social.",
                impacts: { presupuesto: -5, popularidad: -20, poder: 15 }
            },
            {
                title: "Convocar diálogo público con líderes campesinos",
                description: "Buscar solución negociada con transparencia total. Democrático pero puede tomar tiempo.",
                impacts: { presupuesto: -10, popularidad: 10, poder: 0 }
            }
        ]
    },
    {
        id: 18,
        video: "assets/018.mp4",
        title: "🔮 Decisión: El Chamán del Palacio",
        meta: "Mes 22 - Octubre 2026",
        context: [
            'Un chamán realiza una ceremonia de "limpia energética" dentro del Palacio Nacional. El evento se viraliza y divide a la opinión pública entre quienes lo ven como una tradición cultural y quienes lo consideran una falta de seriedad institucional.',
            'Los memes circulan en redes sociales. La prensa internacional pregunta sobre el evento. Tu gabinete está dividido sobre cómo manejar la situación.'
        ],
        prompt: "¿Cómo manejarás el escándalo del chamán?",
        options: [
            {
                title: "Promoverlo como acto cultural nacional",
                description: "Defender la ceremonia como parte de las tradiciones mexicanas. Popular entre ciertos sectores pero criticado por otros.",
                impacts: { presupuesto: 0, popularidad: 15, poder: -10 }
            },
            {
                title: "Minimizar el hecho y mantener discreción",
                description: "No hacer declaraciones y dejar que pase el escándalo. Neutral pero puede interpretarse como evasión.",
                impacts: { presupuesto: 0, popularidad: 0, poder: 5 }
            },
            {
                title: "Prohibir expresamente rituales en el Palacio",
                description: "Establecer reglas claras sobre el uso del espacio institucional. Serio pero puede parecer intransigente.",
                impacts: { presupuesto: 0, popularidad: -10, poder: 10 }
            }
        ]
    },
    {
        id: 19,
        video: "assets/019.mp4",
        title: "🔫 Decisión: Asesinato de Funcionario Municipal",
        meta: "Mes 23 - Noviembre 2026",
        context: [
            'Un funcionario municipal es asesinado en circunstancias sospechosas. La prensa exige respuestas y la oposición culpa a la falta de seguridad nacional.',
            'Las especulaciones sobre el motivo del crimen circulan. ¿Fue un ajuste de cuentas? ¿Un mensaje político? El país espera una respuesta firme.'
        ],
        prompt: "¿Cómo responderás al asesinato?",
        options: [
            {
                title: "Enviar refuerzos y asumir control del municipio",
                description: "Intervención federal directa para garantizar seguridad. Muestra firmeza pero puede interpretarse como autoritario.",
                impacts: { presupuesto: -10, popularidad: 5, poder: 10 }
            },
            {
                title: "Dejar que las autoridades locales investiguen",
                description: "Respetar la autonomía municipal y no intervenir. Federalista pero puede parecer indiferente.",
                impacts: { presupuesto: 0, popularidad: -10, poder: 0 }
            },
            {
                title: "Ordenar una investigación federal pública",
                description: "Crear comisión especial con transparencia total. Democrático pero consume recursos y tiempo.",
                impacts: { presupuesto: -5, popularidad: 10, poder: -5 }
            }
        ]
    },
    {
        id: 20,
        video: "assets/020.mp4",
        title: "💥 Decisión: Explosión de Gas LP",
        meta: "Mes 24 - Diciembre 2026",
        context: [
            'Una pipa de gas LP explota en una zona habitada. Hay decenas de heridos y daños materiales graves. La población exige regular a las empresas distribuidoras.',
            'Las familias de las víctimas piden justicia. Los medios cuestionan la falta de regulación. El país observa si actuarás o minimizarás la tragedia.'
        ],
        prompt: "¿Cómo responderás a la tragedia del gas LP?",
        options: [
            {
                title: "Implementar nueva ley de seguridad energética",
                description: "Crear regulación estricta para prevenir futuros accidentes. Costoso pero muestra compromiso real con la seguridad ciudadana.",
                impacts: { presupuesto: -15, popularidad: 20, poder: -5 }
            },
            {
                title: "Culpar a la empresa privada y sancionarla",
                description: "Responsabilizar a la empresa sin crear nueva regulación. Rápido y popular pero no previene futuros casos.",
                impacts: { presupuesto: 5, popularidad: 5, poder: 0 }
            },
            {
                title: "Negar responsabilidad del gobierno",
                description: "Argumentar que es responsabilidad de la empresa privada. Ahorra recursos pero genera descontento social.",
                impacts: { presupuesto: 0, popularidad: -15, poder: 10 }
            }
        ]
    },
    {
        id: 21,
        video: "assets/021.mp4",
        title: "🏛️ Decisión: Ataque al Palacio Municipal",
        meta: "Mes 25 - Enero 2027",
        context: [
            'Manifestantes enfurecidos irrumpen con violencia en el palacio de gobierno de un municipio tras acusar corrupción y desvío de recursos. El país observa con preocupación la escalada del descontento.',
            'Las imágenes del ataque circulan en redes sociales. Algunos lo celebran como justicia popular, otros lo condenan como vandalismo. Tu respuesta marcará el precedente.'
        ],
        prompt: "¿Cómo responderás al ataque al palacio municipal?",
        options: [
            {
                title: "Enviar Guardia Nacional para restablecer el orden",
                description: "Usar la fuerza para recuperar el control del edificio. Muestra autoridad pero puede generar más violencia.",
                impacts: { presupuesto: -10, popularidad: -15, poder: 20 }
            },
            {
                title: "Destituir al alcalde y convocar elecciones locales",
                description: "Ceder a las demandas de los manifestantes mediante cambio político. Democrático pero puede sentar precedente peligroso.",
                impacts: { presupuesto: -5, popularidad: 10, poder: -5 }
            },
            {
                title: "Intervenir mediáticamente para apaciguar tensiones",
                description: "Buscar solución diplomática sin usar fuerza ni ceder completamente. Equilibrio pero puede no satisfacer a nadie.",
                impacts: { presupuesto: 0, popularidad: 5, poder: 0 }
            }
        ]
    },
    {
        id: 22,
        video: "assets/022.mp4",
        title: "🌿 Decisión: Activista Desaparecido",
        meta: "Mes 26 - Febrero 2027",
        context: [
            'Un activista ambiental desaparece tras denunciar intereses privados en un área natural protegida. La comunidad internacional exige una respuesta firme del gobierno.',
            'Las organizaciones de derechos humanos presionan. Los medios internacionales cubren el caso. Tu respuesta afectará la imagen de México en el mundo.'
        ],
        prompt: "¿Cómo responderás a la desaparición del activista?",
        options: [
            {
                title: "Crear una comisión especial de búsqueda",
                description: "Destinar recursos significativos para encontrar al activista. Muestra compromiso pero costoso y puede no tener resultados.",
                impacts: { presupuesto: -10, popularidad: 20, poder: -5 }
            },
            {
                title: "Declarar apoyo simbólico sin comprometer recursos",
                description: "Mostrar preocupación públicamente sin acciones concretas. Barato pero puede parecer insuficiente.",
                impacts: { presupuesto: 0, popularidad: 5, poder: 0 }
            },
            {
                title: "Ignorar el caso por falta de pruebas",
                description: "No actuar hasta tener más información. Ahorra recursos pero genera crítica internacional y descontento.",
                impacts: { presupuesto: 0, popularidad: -15, poder: 10 }
            }
        ]
    },
    {
        id: 23,
        video: "assets/023.mp4",
        title: "🗑️ Decisión: Crisis de Basura",
        meta: "Mes 27 - Marzo 2027",
        context: [
            'Varias ciudades del país colapsan por la acumulación de basura debido a un paro de trabajadores de limpieza. Las calles se llenan de desechos y las enfermedades aumentan.',
            'La crisis sanitaria se agrava día a día. Los hospitales reportan aumento de casos de enfermedades gastrointestinales. El país exige una solución inmediata.'
        ],
        prompt: "¿Cómo resolverás la crisis de basura?",
        options: [
            {
                title: "Ofrecer aumentos y resolver el conflicto laboral",
                description: "Negociar con los trabajadores para que regresen a sus labores. Popular pero costoso a largo plazo.",
                impacts: { presupuesto: -15, popularidad: 15, poder: -5 }
            },
            {
                title: "Llevar al ejército a limpiar las calles",
                description: "Usar fuerzas militares para resolver la emergencia sanitaria. Efectivo pero puede generar críticas por militarización.",
                impacts: { presupuesto: -5, popularidad: -10, poder: 15 }
            },
            {
                title: "Contratar empresas privadas de emergencia",
                description: "Subcontratar servicios de limpieza mientras se resuelve el conflicto. Rápido pero costoso y puede debilitar a los trabajadores públicos.",
                impacts: { presupuesto: 10, popularidad: -5, poder: 5 }
            }
        ]
    }
];

// ============================================
// FUNCIONES AUXILIARES PARA VERIFICAR DECISIONES
// ============================================
function hasNegotiatedWithCrime() {
    // Verificar si se eligió la opción de negociación con grupos criminales (decisión ID 5, opción 2)
    return gameState.decisions.some(d => {
        if (d.decisionId === 5) {
            const decision = decisionsData.find(dd => dd.id === 5);
            if (decision && d.optionIndex === 2) { // Opción 2 es "Negociación secreta con grupos criminales"
                return true;
            }
        }
        return false;
    });
}

function hasAcceptedInfluencers() {
    // Verificar si se aceptaron influencers (decisión ID 10, opción 0 o 1)
    return gameState.decisions.some(d => {
        if (d.decisionId === 10) {
            const decision = decisionsData.find(dd => dd.id === 10);
            if (decision && (d.optionIndex === 0 || d.optionIndex === 1)) {
                return true;
            }
        }
        return false;
    });
}

function hasCorruptDecisions() {
    // Verificar decisiones corruptas (proteger corruptos, encubrir escándalos, etc.)
    return gameState.decisions.some(d => {
        // Decisión 4: Proteger al Secretario corrupto (opción 0)
        if (d.decisionId === 4 && d.optionIndex === 0) {
            return true;
        }
        // Decisión 12: Encubrir escándalo tecnológico (opción 2)
        if (d.decisionId === 12 && d.optionIndex === 2) {
            return true;
        }
        // Se pueden agregar más verificaciones de decisiones corruptas según se necesite
        return false;
    });
}

function hasTechDecisions() {
    // Verificar decisiones tecnológicas/pro-IA/mega-proyectos aprobados
    return gameState.decisions.some(d => {
        // Decisión 7: Mega-Proyecto (Tren del Sureste) - aprobado si opción 0 o 1
        if (d.decisionId === 7 && (d.optionIndex === 0 || d.optionIndex === 1)) {
            return true;
        }
        // Verificar otras decisiones tecnológicas por título/contexto
        const decision = decisionsData.find(dd => dd.id === d.decisionId);
        if (decision) {
            const title = decision.title.toLowerCase();
            const context = decision.context.join(' ').toLowerCase();
            // Solo contar si se aprobó (no canceló) una decisión tecnológica
            const isTechRelated = title.includes('tecnolog') || title.includes('ia') || 
                                 title.includes('inteligencia artificial') || 
                                 title.includes('automatiz') ||
                                 context.includes('tecnolog') || context.includes('automatiz');
            // Si es relacionada con tecnología y no es la opción de cancelar (última opción)
            if (isTechRelated && d.optionIndex < decision.options.length - 1) {
                return true;
            }
        }
        return false;
    });
}

function hasLowCorruption() {
    // Verificar si se tomaron decisiones transparentes (opuesto a corruptas)
    // Pedir renuncia de corruptos, auditorías transparentes, investigaciones públicas, etc.
    return gameState.decisions.some(d => {
        // Decisión 4: Pedir renuncia (opción 1) o auditoría transparente (opción 2)
        if (d.decisionId === 4 && (d.optionIndex === 1 || d.optionIndex === 2)) {
            return true;
        }
        // Decisión 12: Investigación pública del escándalo tecnológico (opción 0)
        if (d.decisionId === 12 && d.optionIndex === 0) {
            return true;
        }
        return false;
    });
}

// ============================================
// BASE DE DATOS DE FINALES
// ============================================
const endings = {
    presidentePueblo: {
        title: "El Presidente del Pueblo",
        subtitle: "Lograste ganarte a la gente, aunque sacrificaste eficiencia y poder político",
        icon: "🟢",
        description: "Tu administración acabó sin lujos, sin avances espectaculares y con un gobierno que muchas veces tuvo que improvisar. Pero la gente te quiere: fuiste \"el que sí escuchó\". Los informes independientes concluyen que tu mayor éxito fue haber mantenido un clima social estable. La economía terminó débil y el congreso ignoró varias de tus reformas, pero terminaste como una figura querida, recordada por sensibilidad más que por resultados.",
        condition: (s) => s.popularidad > 80 && s.presupuesto >= 40 && s.presupuesto <= 70 && s.poder < 60
    },
    reformadorEtico: {
        title: "El Reformador Ético",
        subtitle: "Rompes con las prácticas tradicionales y limpias gran parte del sistema",
        icon: "🟢",
        description: "No fue fácil. Perdiste aliados, enfrentaste campañas de desprestigio y estuviste al borde de una crisis política. Pero lograste que el país diera un giro real en temas de corrupción, transparencia y justicia. Los organismos internacionales califican tu periodo como \"el renacimiento democrático\". Aunque dejaste enemigos poderosos, lograste plantarte como un ejemplo improbable de integridad.",
        condition: (s) => s.presupuesto > 70 && s.popularidad > 60 && s.poder > 60 && hasLowCorruption(),
        video: "assets/Final Reformador Etico.mp4"
    },
    tecnocrataEficiente: {
        title: "El Tecnócrata Eficiente",
        subtitle: "La economía crece, pero el costo social y político es alto",
        icon: "🟦",
        description: "Las cifras económicas de tu administración se estudiarán en universidades durante décadas: superávit histórico, inflación controlada, inversión extranjera y un sistema fiscal más fuerte que nunca. Pero la población lo resintió: protestas, desigualdad y acusaciones de elitismo. Eres recordado como un genio frío, eficiente… pero desconectado del pueblo.",
        condition: (s) => s.presupuesto > 90 && s.popularidad < 60 && s.poder >= 40 && s.poder <= 70
    },
    presidenteAutoritario: {
        title: "El Presidente Autoritario",
        subtitle: "Controlaste al país por la fuerza política y legal, debilitando contrapesos",
        icon: "🟥",
        description: "El Congreso terminó subordinado a ti, gobernaste por decreto y controlaste a los sindicatos, gobernadores y medios. Los organismos internacionales te acusan de centralizar demasiado poder, pero tu aprobación interna está dividida: para algunos fuiste firme, para otros, represor. Tu legado se estudia como ejemplo moderno de cómo se construye un gobierno hiperconcentrado.",
        condition: (s) => s.poder > 90 && s.popularidad < 50 && s.presupuesto >= 30 && s.presupuesto <= 70,
        video: "assets/Final Autoritario.mp4"
    },
    presidenteCapturado: {
        title: "El Presidente Capturado",
        subtitle: "Pierdes el control del país, atrapado por intereses externos y grupos criminales",
        icon: "🟤",
        description: "No lograste controlar el gabinete, ni al Congreso, ni mucho menos a los grupos criminales. Terminas tu mandato prácticamente aislado, rodeado de traidores y subordinado a intereses externos. En reportes confidenciales te describen como \"un rehén del sistema\". El país terminó en crisis, y tú fuiste una figura decorativa en tu propio gobierno.",
        condition: (s) => s.poder < 40 && s.popularidad < 50 && s.presupuesto < 50 && hasCorruptDecisions(),
        video: "assets/Final Capturado2.mp4"
    },
    colapsoNacional: {
        title: "Colapso Nacional",
        subtitle: "El país entra en caos: economía rota, protestas masivas, crisis de seguridad",
        icon: "🔥",
        description: "Tu administración pasará a la historia como la peor crisis nacional del siglo. La deuda explotó, la inflación se salió de control, y los servicios públicos colapsaron. Protestas recorrieron las ciudades, la violencia aumentó y terminaste suplicando al Congreso medidas extraordinarias que nunca llegaron. No caíste por golpe de Estado… pero estuviste cerca.",
        condition: (s) => s.presupuesto < 20 && s.popularidad < 30 && s.poder < 40
    },
    golpeEstadoSuave: {
        title: "Golpe de Estado Suave",
        subtitle: "El establishment te reemplaza discretamente antes de terminar el mandato",
        icon: "🔥",
        description: "No hubo tanques en las calles ni violencia visible. Simplemente un día tu Secretario de Gobernación anunció que estabas \"en reposo por salud\". El Congreso designó un relevo \"provisional\" que terminó dirigiendo el país. Tus últimos meses los viviste recluido, fuera de cámaras, sin poder defenderte. Un final silencioso… pero devastador.",
        condition: (s) => s.poder < 30 && s.popularidad < 30 && (hasNegotiatedWithCrime() || hasCorruptDecisions())
    },
    presidenteMediatico: {
        title: "El Presidente Mediático",
        subtitle: "Gobernaste más con cámara que con políticas reales",
        icon: "🟡",
        description: "Tus entrevistas virales, TikToks desde palacio y participaciones constantes en medios lograron algo inaudito: jamás perdiste popularidad. Pero los logros reales fueron escasos. Los expertos describen tu gobierno como una \"telepresidencia\": entretenida, emocional, divertida… pero superficial. Tu figura quedó como un ícono pop más que como un líder histórico.",
        condition: (s) => s.popularidad > 80 && s.poder >= 40 && s.poder <= 60 && s.presupuesto >= 30 && s.presupuesto <= 60 && hasAcceptedInfluencers()
    },
    progresoEstabilidad: {
        title: "Progreso con Estabilidad",
        subtitle: "Nada espectacular, nada desastroso. Un gobierno funcional y estable",
        icon: "🟢",
        description: "Tu administración termina con indicadores aceptables: crecimiento moderado, estabilidad social razonable y un nivel de poder político suficiente para operar sin crisis. No fuiste héroe ni villano. No cambiaste el sistema, pero tampoco lo empeoraste. Tu legado: \"cumplió, sin brillar\".",
        condition: (s) => s.presupuesto >= 50 && s.presupuesto <= 75 && s.popularidad >= 50 && s.popularidad <= 75 && s.poder >= 50 && s.poder <= 75
    },
    mausoleoCorrupcion: {
        title: "El Mausoleo de la Corrupción",
        subtitle: "Un gobierno eficaz para robar, letal para el país",
        icon: "⚫",
        description: "Los contratos inflados, las empresas fantasma y los escándalos grabados por periodistas marcaron tu administración. La economía no colapsó, porque supiste manejar el poder… pero la sociedad quedó devastada. Al terminar tu mandato, múltiples investigaciones quedan abiertas. Tu figura se convierte en la representación perfecta del sistema podrido que querías exponer.",
        condition: (s) => s.presupuesto > 70 && s.poder > 70 && s.popularidad < 40 && hasCorruptDecisions()
    },
    industrializacionAcelerada: {
        title: "Industrialización Acelerada",
        subtitle: "Conviertes al país en una potencia tecnológica, pero a un costo social alto",
        icon: "🟣",
        description: "A fuerza de inversión extranjera, automatización y mega-infraestructura, tu administración convirtió al país en un polo mundial de tecnología. Pero cientos de miles de empleos desaparecieron, provocando una brecha social enorme. Eres recordado como el presidente que modernizó el país a una velocidad despiadada.",
        condition: (s) => s.presupuesto > 85 && s.poder > 70 && s.popularidad >= 40 && s.popularidad <= 70 && hasTechDecisions()
    },
    presidenteSilenciado: {
        title: "El Presidente Silenciado",
        subtitle: "Una filtración destruye tu gobierno en horas",
        icon: "🟤",
        description: "Un audio filtrado exhibe tus negociaciones con grupos criminales. Las protestas son inmediatas. Gobernadores te desconocen, ministros renuncian en cadena y la prensa internacional exige tu destitución. No renunciaste: te renunciaron. Termina tu historia con un mensaje claro: \"el crimen no se negocia sin consecuencias\".",
        condition: (s) => hasNegotiatedWithCrime() // Este final se activa si se negoció con crimen (50% GAME OVER)
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
// ALEATORIZAR DECISIONES
// ============================================
function randomizeDecisions() {
    // La decisión 0 (introducción) siempre va primero
    // Aleatorizar el resto de decisiones (ID 1-23)
    const decisionsToRandomize = [];
    for (let i = 1; i < decisionsData.length; i++) {
        decisionsToRandomize.push(i);
    }
    
    // Algoritmo Fisher-Yates para aleatorización
    for (let i = decisionsToRandomize.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [decisionsToRandomize[i], decisionsToRandomize[j]] = [decisionsToRandomize[j], decisionsToRandomize[i]];
    }
    
    // Guardar el orden aleatorizado (0 siempre primero, luego las aleatorizadas)
    gameState.randomizedOrder = [0, ...decisionsToRandomize];
}

// ============================================
// GENERAR META DINÁMICO
// ============================================
function generateDynamicMeta(decisionIndex) {
    // Decisión 0 es la introducción
    if (decisionIndex === 0) {
        return "Aprende las Mecánicas";
    }
    
    // Meses del año
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    // Calcular mes y año basado en el índice de decisión
    // Decisión 1 = Mes 1 (Enero 2025), Decisión 2 = Mes 2 (Febrero 2025), etc.
    // Decisión 13 = Mes 13 (Enero 2026), etc.
    const mesNumero = decisionIndex;
    const año = 2025 + Math.floor((mesNumero - 1) / 12); // Mes 1-12 = 2025, Mes 13-24 = 2026, etc.
    const mesNombre = meses[(mesNumero - 1) % 12];
    
    return `Mes ${mesNumero} - ${mesNombre} ${año}`;
}

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
    
    // Configurar volumen inicial del video
    if (DOM.cinematicVideo) {
        DOM.cinematicVideo.volume = 0.8; // 80% de volumen
        DOM.cinematicVideo.muted = false; // Permitir sonido
    }

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

    // Asegurar que el contenedor del juego esté oculto inicialmente
    DOM.gameContainer.classList.remove('active');
    DOM.cinematicScreen.classList.remove('active');

    // Aleatorizar orden de decisiones
    randomizeDecisions();

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
        // Limpiar cualquier listener anterior
        const oldResolve = DOM.cinematicScreen.cinematicResolve;
        if (oldResolve) {
            // Si hay un resolve pendiente, resolverlo primero
            oldResolve();
        }

        // Pausar y resetear el video antes de cargar uno nuevo
        DOM.cinematicVideo.pause();
        DOM.cinematicVideo.currentTime = 0;

        // Mostrar pantalla cinemática INMEDIATAMENTE
        DOM.cinematicScreen.classList.add('active');
        DOM.gameContainer.classList.remove('active');
        DOM.skipHint.classList.remove('visible');

        // Configurar video - Asegurar volumen ANTES de cargar
        DOM.cinematicVideo.volume = 0.8; // Configurar volumen al 80%
        DOM.cinematicVideo.muted = false; // Permitir sonido
        DOM.cinematicVideo.src = videoSrc;
        DOM.cinematicVideo.load(); // Forzar recarga del video
        
        // Asegurar que el volumen se mantenga después de cargar
        DOM.cinematicVideo.addEventListener('loadedmetadata', () => {
            DOM.cinematicVideo.volume = 0.8;
            DOM.cinematicVideo.muted = false;
        }, { once: true });

        // Timeout de seguridad: si el video no carga en 10 segundos, continuar
        let timeoutId = setTimeout(() => {
            console.warn('Timeout: el video no se cargó, continuando...');
            DOM.cinematicVideo.removeEventListener('canplay', handleCanPlay);
            DOM.cinematicVideo.removeEventListener('loadeddata', handleLoadedData);
            DOM.cinematicVideo.removeEventListener('error', handleError);
            DOM.cinematicVideo.removeEventListener('ended', handleEnded);
            endCinematic(resolve);
        }, 10000);

        // Función para manejar cuando el video está listo
        const handleCanPlay = () => {
            DOM.cinematicVideo.removeEventListener('canplay', handleCanPlay);
            DOM.cinematicVideo.removeEventListener('loadeddata', handleLoadedData);
            DOM.cinematicVideo.removeEventListener('error', handleError);
            
            // Limpiar timeout ya que el video se cargó
            if (timeoutId) clearTimeout(timeoutId);
            
            // Asegurar que el volumen esté configurado ANTES de intentar reproducir
            DOM.cinematicVideo.volume = 0.8;
            DOM.cinematicVideo.muted = false;
            
            // Intentar reproducir con sonido primero
            const playPromise = DOM.cinematicVideo.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Video reproducido exitosamente
                        // Asegurar que el volumen y muted estén correctamente configurados
                        DOM.cinematicVideo.volume = 0.8;
                        DOM.cinematicVideo.muted = false;
                        
                        // Verificar si realmente está reproduciéndose con sonido
                        if (DOM.cinematicVideo.muted) {
                            // Si por alguna razón está silenciado, intentar desactivarlo
                            DOM.cinematicVideo.muted = false;
                        }
                        
                        // Mostrar hint después de 2 segundos
                        setTimeout(() => {
                            DOM.skipHint.classList.add('visible');
                        }, 2000);
                    })
                    .catch(error => {
                        console.warn('No se pudo reproducir con sonido, intentando silenciado:', error);
                        // Si falla por políticas del navegador, intentar silenciado temporalmente
                        DOM.cinematicVideo.muted = true;
                        const mutedPlayPromise = DOM.cinematicVideo.play();
                        if (mutedPlayPromise !== undefined) {
                            mutedPlayPromise
                                .then(() => {
                                    // Video reproducido silenciado - intentar activar sonido después de un momento
                                    setTimeout(() => {
                                        // Intentar desactivar muted después de que el video esté reproduciéndose
                                        try {
                                            DOM.cinematicVideo.muted = false;
                                            DOM.cinematicVideo.volume = 0.8;
                                        } catch (e) {
                                            console.warn('No se pudo activar el sonido automáticamente');
                                        }
                                    }, 500);
                                    
                                    setTimeout(() => {
                                        DOM.skipHint.classList.add('visible');
                                    }, 2000);
                                })
                                .catch(mutedError => {
                                    console.error('Error al reproducir video incluso silenciado:', mutedError);
                                    setTimeout(() => {
                                        DOM.skipHint.classList.add('visible');
                                    }, 2000);
                                });
                        } else {
                            setTimeout(() => {
                                DOM.skipHint.classList.add('visible');
                            }, 2000);
                        }
                    });
            } else {
                // Si play() no retorna una promesa, el video ya está reproduciéndose
                // Asegurar que el volumen esté configurado
                DOM.cinematicVideo.volume = 0.8;
                DOM.cinematicVideo.muted = false;
                setTimeout(() => {
                    DOM.skipHint.classList.add('visible');
                }, 2000);
            }
        };

        // Función alternativa para cuando los datos están cargados
        const handleLoadedData = () => {
            // Si canplay no se dispara, intentar con loadeddata
            if (DOM.cinematicVideo.readyState >= 3) {
                handleCanPlay();
            }
        };

        // Función para manejar errores de carga
        const handleError = () => {
            DOM.cinematicVideo.removeEventListener('canplay', handleCanPlay);
            DOM.cinematicVideo.removeEventListener('loadeddata', handleLoadedData);
            DOM.cinematicVideo.removeEventListener('error', handleError);
            if (timeoutId) clearTimeout(timeoutId);
            console.error('Error al cargar video:', videoSrc);
            // Continuar aunque haya error después de un breve delay
            setTimeout(() => {
                DOM.skipHint.classList.add('visible');
                // Auto-continuar después de mostrar el hint
                setTimeout(() => {
                    endCinematic(resolve);
                }, 2000);
            }, 1000);
        };

        // Escuchar cuando el video está listo para reproducir
        DOM.cinematicVideo.addEventListener('canplay', handleCanPlay);
        DOM.cinematicVideo.addEventListener('loadeddata', handleLoadedData);
        DOM.cinematicVideo.addEventListener('error', handleError);

        // Cuando termine el video
        const handleEnded = function onEnded() {
            DOM.cinematicVideo.removeEventListener('ended', handleEnded);
            if (timeoutId) clearTimeout(timeoutId);
            endCinematic(resolve);
        };
        DOM.cinematicVideo.addEventListener('ended', handleEnded);

        // Guardar resolve y timeout para poder usarlos en skip
        DOM.cinematicScreen.cinematicResolve = resolve;
        DOM.cinematicScreen.cinematicTimeout = timeoutId;

        // Agregar listener para cuando el usuario interactúe (para activar sonido si fue necesario silenciarlo)
        const handleUserInteraction = () => {
            if (DOM.cinematicVideo.muted && DOM.cinematicVideo.readyState >= 2) {
                DOM.cinematicVideo.muted = false;
                DOM.cinematicVideo.volume = 0.8;
            }
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });

        // Si el video ya está listo (readyState >= 3), intentar reproducir inmediatamente
        if (DOM.cinematicVideo.readyState >= 3) {
            setTimeout(() => {
                handleCanPlay();
            }, 100);
        }
    });
}

function skipCinematic() {
    if (DOM.cinematicScreen.cinematicResolve) {
        // Limpiar timeout si existe
        if (DOM.cinematicScreen.cinematicTimeout) {
            clearTimeout(DOM.cinematicScreen.cinematicTimeout);
        }
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
    // Verificar que no se haya completado el juego
    if (gameState.currentDecision >= decisionsData.length) {
        showEnding();
        return;
    }
    
    // Obtener el índice real de la decisión usando el orden aleatorizado
    const realDecisionIndex = gameState.randomizedOrder[gameState.currentDecision];
    const decision = decisionsData[realDecisionIndex];
    
    // Actualizar progress tracker
    DOM.progressText.textContent = `${gameState.currentDecision + 1}/${decisionsData.length}`;

    // Reproducir cinemática (obligatoria)
    await playCinematic(decision.video);

    // Cargar contexto
    DOM.contextTitle.textContent = decision.title;
    // Generar meta dinámico basado en el orden de aparición (no en el ID original)
    DOM.contextMeta.textContent = generateDynamicMeta(gameState.currentDecision);
    
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
    // Obtener el índice real de la decisión usando el orden aleatorizado
    const realDecisionIndex = gameState.randomizedOrder[gameState.currentDecision];
    const decision = decisionsData[realDecisionIndex];
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
    // 1. Finales especiales/catastróficos primero
    if (endings.presidenteSilenciado.condition(s)) return endings.presidenteSilenciado;
    if (endings.colapsoNacional.condition(s)) return endings.colapsoNacional;
    if (endings.golpeEstadoSuave.condition(s)) return endings.golpeEstadoSuave;
    if (endings.presidenteCapturado.condition(s)) return endings.presidenteCapturado;
    if (endings.mausoleoCorrupcion.condition(s)) return endings.mausoleoCorrupcion;
    
    // 2. Finales específicos con condiciones claras
    if (endings.reformadorEtico.condition(s)) return endings.reformadorEtico;
    if (endings.presidentePueblo.condition(s)) return endings.presidentePueblo;
    if (endings.tecnocrataEficiente.condition(s)) return endings.tecnocrataEficiente;
    if (endings.presidenteAutoritario.condition(s)) return endings.presidenteAutoritario;
    if (endings.presidenteMediatico.condition(s)) return endings.presidenteMediatico;
    if (endings.industrializacionAcelerada.condition(s)) return endings.industrializacionAcelerada;
    
    // 3. Final neutral por defecto
    if (endings.progresoEstabilidad.condition(s)) return endings.progresoEstabilidad;
    
    // 4. Si no cumple ninguna condición específica, retornar progreso con estabilidad como default
    return endings.progresoEstabilidad;
}

// ============================================
// MOSTRAR PANTALLA DE FINAL
// ============================================
function showEnding() {
    const ending = determineEnding();

    // Si el final tiene un video, reproducirlo primero
    if (ending.video) {
        playVideo(ending.video).then(() => {
            // Después de que termine el video, mostrar la pantalla de final
            displayEndingContent(ending);
        });
    } else {
        // Si no hay video, mostrar directamente la pantalla de final
        displayEndingContent(ending);
    }
}

// ============================================
// MOSTRAR CONTENIDO DEL FINAL
// ============================================
function displayEndingContent(ending) {
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