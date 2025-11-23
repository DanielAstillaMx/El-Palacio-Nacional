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