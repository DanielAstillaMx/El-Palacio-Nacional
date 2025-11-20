# 🏛️ El Palacio Nacional

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**Un juego narrativo político donde tus decisiones determinan el destino de México**

[🎮 Jugar Demo](#instalación) • [📖 Documentación](#características) • [🎬 Videos](#assets-de-video) • [🤝 Contribuir](#contribución)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Demo](#-demo)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Gameplay](#-gameplay)
- [Assets de Video](#-assets-de-video)
- [Tecnologías](#-tecnologías)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Créditos](#-créditos)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**El Palacio Nacional** es un juego narrativo de decisiones políticas ambientado en México. Asumes el rol del Presidente de la República y debes tomar 8 decisiones cruciales durante tu primer año en el cargo, equilibrando tres indicadores vitales:

- 💰 **Presupuesto** - La salud financiera del país
- ❤️ **Popularidad** - El apoyo del pueblo mexicano
- ⚡ **Poder** - Tu influencia política e institucional

Cada decisión tiene consecuencias reales que afectan estos tres pilares. Al final del juego, tu estilo de gobierno determinará uno de **6 finales diferentes**, desde "El Estadista Transformador" hasta "El Colapso Institucional".

---

## ✨ Características

### 🎮 Gameplay

- **8 decisiones políticas complejas** basadas en escenarios reales mexicanos
- **Sistema dinámico de indicadores** que reaccionan a tus elecciones
- **6 finales únicos** determinados por tus estadísticas finales
- **Videos cinemáticos** para cada decisión (MVP incluido)
- **Tutorial interactivo** que enseña las mecánicas del juego
- **Interfaz responsive** - Juega en desktop, tablet o móvil

### 🎨 Diseño

- Estética cinematográfica oscura con acentos dorados
- Animaciones suaves y transiciones elegantes
- Diseño inspirado en "House of Cards" y "The Crown"
- UI/UX intuitiva con feedback visual inmediato

### 🎬 Experiencia Narrativa

- **Introducción cinemática** de 40 segundos (5 escenas épicas)
- Contexto histórico y político para cada decisión
- Dilemas morales sin respuestas "correctas"
- Narración que refleja la complejidad de gobernar México

---

## 🎮 Demo

![Screenshot del juego](https://via.placeholder.com/800x450.png?text=El+Palacio+Nacional+Gameplay)

> **Nota:** La demo incluye la primera decisión completa con video cinemático.

---

## 🚀 Instalación

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desarrollo)

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/el-palacio-nacional.git

# Navegar al directorio
cd el-palacio-nacional

# Abrir index.html en tu navegador
# O usar un servidor local:
python -m http.server 8000
# Luego visita http://localhost:8000
```

### Para Desarrollo

```bash
# Si usas VS Code con Live Server
code .
# Click derecho en index.html > Open with Live Server
```

---

## 📁 Estructura del Proyecto

```
el-palacio-nacional/
│
├── index.html              # Menú principal
├── intro.html             # Introducción cinemática (Star Wars style)
├── tutorial.html          # Tutorial interactivo
├── game.html              # Juego completo (8 decisiones)
│
├── game.css               # Estilos principales del juego
├── tutorial.css           # Estilos específicos del tutorial
│
├── game.js                # Lógica principal del juego
├── tutorial.js            # Lógica del tutorial
│
├── assets/
│   ├── 000.mp4           # Video de introducción (5 escenas)
│   ├── 001.mp4           # Decisión 1: La Bomba Fiscal
│   ├── 002.mp4           # Decisión 2: El Huracán
│   ├── 003.mp4           # Decisión 3: Sindicato de Maestros
│   ├── 004.mp4           # Decisión 4: Escándalo de Corrupción
│   ├── 005.mp4           # Decisión 5: Crisis de Seguridad
│   ├── 006.mp4           # Decisión 6: Colapso del Sistema de Salud
│   ├── 007.mp4           # Decisión 7: El Mega-Proyecto
│   └── 008.mp4           # Decisión 8: Encrucijada Democrática
│
├── README.md              # Este archivo
├── LICENSE                # Licencia del proyecto
└── .gitignore            # Archivos ignorados por Git
```

---

## 🎲 Gameplay

### Las 8 Decisiones

1. **🏛️ La Bomba Fiscal** - Crisis de déficit oculto
2. **🌀 El Huracán** - Desastre natural inminente
3. **📚 El Sindicato de Maestros** - Paro nacional educativo
4. **⚖️ El Escándalo de Corrupción** - Lealtad vs institucionalidad
5. **🚨 Crisis de Seguridad** - Violencia descontrolada
6. **🏥 Colapso del Sistema de Salud** - Hospitales colapsados
7. **🚄 El Mega-Proyecto** - Tren del Sureste controversial
8. **⚖️ La Encrucijada Democrática** - Oposición bloqueando el gobierno

### Los 6 Finales

| Final | Condición | Descripción |
|-------|-----------|-------------|
| 👑 **El Estadista Transformador** | Popularidad > 60 && Presupuesto > 50 | Legado de equilibrio y progreso |
| ⚔️ **El Autoritario Eficiente** | Poder > 70 && Popularidad < 40 | Progreso a costa de la democracia |
| ❤️ **El Populista Querido** | Popularidad > 60 && Presupuesto < 30 | Amado pero ineficiente |
| 📊 **El Tecnócrata Invisible** | Presupuesto > 60 && Popularidad < 40 | Números fríos, país desconectado |
| 💥 **El Colapso Institucional** | Todos < 30 | Cuando todo se derrumbó |
| ⚖️ **El Equilibrista Mediocre** | Todos entre 40-60 | Ni malo ni bueno, solo olvidable |

### Sistema de Indicadores

Cada indicador puede variar entre **0 y 100**:

- **< 30**: Zona de peligro crítico
- **30-60**: Rango moderado
- **> 60**: Zona de estabilidad

**Importante:** Si cualquier indicador llega a 0 o 100, pueden activarse eventos especiales.

---

## 🎬 Assets de Video

### Generación de Videos Cinemáticos

Los videos del juego fueron generados con IA usando los siguientes prompts:

#### Video de Introducción (000.mp4 - 5 escenas)

Ver [PROMPTS_VIDEO.md](./docs/PROMPTS_VIDEO.md) para los prompts completos de las 5 escenas:

1. **El Amanecer del Poder** - Palacio Nacional al alba
2. **El Poder y la Carga** - Interior del despacho presidencial
3. **La Encrucijada** - Montaje de los 3 indicadores
4. **El Peso de una Nación** - Rostros de 133 millones de mexicanos
5. **El Llamado a la Acción** - POV caminando hacia el poder

#### Videos de Decisiones (001-008.mp4)

Cada decisión tiene su propio video cinemático que establece el contexto visual de la situación.

**Herramientas recomendadas:**
- Runway Gen-3 Alpha
- Pika Labs
- Kling AI
- Leonardo Motion

---

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con animaciones
  - CSS Grid & Flexbox
  - Custom Properties (variables CSS)
  - Animaciones y transiciones suaves
- **JavaScript (ES6+)** - Lógica del juego
  - Async/Await para videos
  - Event Listeners
  - DOM Manipulation
  - Estado del juego reactivo

**Sin dependencias externas** - Juego 100% vanilla

---

## 🗺️ Roadmap

### Versión 1.0 (MVP) ✅
- [x] 8 decisiones completas
- [x] Sistema de indicadores
- [x] 6 finales diferentes
- [x] Tutorial interactivo
- [x] Videos cinemáticos

### Versión 1.1 (Próximamente)
- [ ] Sistema de guardado local (localStorage)
- [ ] Música de fondo y efectos de sonido
- [ ] Estadísticas detalladas al final
- [ ] Logros desbloqueables
- [ ] Modo "Histórico" con decisiones reales

### Versión 2.0 (Futuro)
- [ ] Expansión: Segundo año presidencial (8 decisiones más)
- [ ] Eventos aleatorios
- [ ] Sistema de consejeros
- [ ] Multijugador comparativo
- [ ] Internacionalización (EN, FR, PT)

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Este proyecto es educativo y de código abierto.

### Cómo Contribuir

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Áreas donde puedes ayudar

- 🎨 Mejoras de diseño UI/UX
- 🎬 Creación de nuevos videos cinemáticos
- 📝 Nuevas decisiones políticas
- 🌍 Traducciones a otros idiomas
- 🐛 Reporte de bugs
- 📖 Mejoras en la documentación

### Código de Conducta

Este proyecto sigue el [Contributor Covenant](https://www.contributor-covenant.org/). Se espera un comportamiento respetuoso de todos los contribuidores.

---

## 👥 Créditos

### Desarrollo
- **Concepto y Diseño:** [Tu Nombre](https://github.com/tu-usuario)
- **Programación:** [Tu Nombre](https://github.com/tu-usuario)
- **Narrativa:** Basado en escenarios políticos reales de México

### Inspiración
- **Juegos:** Reigns, Papers Please, The Political Machine
- **Series:** House of Cards, The Crown, Designated Survivor
- **Documentales:** Política mexicana contemporánea

### Assets
- **Videos:** Generados con IA (Runway, Pika Labs)
- **Iconos:** Emojis nativos del sistema
- **Fuentes:** Segoe UI (sistema)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 [Tu Nombre]

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para 
utilizar el Software sin restricción, incluyendo sin limitación los derechos 
a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o 
vender copias del Software...
```

---

## 🎓 Propósito Educativo

Este juego fue creado con propósitos educativos para:

- Enseñar sobre la complejidad de la toma de decisiones políticas
- Mostrar las interconexiones entre economía, popularidad y poder
- Fomentar el pensamiento crítico sobre política mexicana
- Demostrar que no existen soluciones perfectas en gobierno

**Nota:** Este juego es una simulación ficticia y no representa la posición política de los creadores.

---

## 📞 Contacto

¿Preguntas? ¿Sugerencias? ¿Bugs?

- **GitHub Issues:** [Reportar un problema](https://github.com/tu-usuario/el-palacio-nacional/issues)
- **Email:** tu-email@ejemplo.com
- **Twitter:** [@tuusuario](https://twitter.com/tuusuario)

---

## ⭐ Apoyo

Si te gusta este proyecto, considera:

- Darle una ⭐ en GitHub
- Compartirlo en redes sociales
- Contribuir con código o ideas
- [Invitarme un café ☕](https://ko-fi.com/tuusuario)

---

<div align="center">

**Hecho con ❤️ para México 🇲🇽**

[⬆ Volver arriba](#-el-palacio-nacional)

</div>
