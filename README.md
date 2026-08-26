# Vortexa Digital

Página web corporativa ficticia para **Vortexa Digital**, un estudio de desarrollo de software con sede en Bogotá, Colombia.

## Estructura del proyecto

```text
vortexa-digital/
├── index.html
├── README.md
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Tecnología

Construida únicamente con **HTML5, CSS3 y JavaScript puro** (sin frameworks ni librerías como React, Vue, Bootstrap, Tailwind o jQuery).

## Estilo visual

- Fondo cálido en tono crema, con acentos en coral, naranja y azul marino profundo, y detalles en amarillo suave.
- Tipografías: **Fraunces** (titulares, con personalidad editorial) y **Space Grotesk** (texto e interfaz).
- Composiciones geométricas en SVG y CSS, sin iconografía genérica ni tarjetas repetitivas.
- Cursor personalizado que reacciona al pasar sobre botones y tarjetas (solo escritorio).
- Parallax sutil en la composición del hero al mover el mouse.
- Cinta marquesina infinita con los seis servicios.
- Números animados ("cuentan hacia arriba") en la sección de estadísticas.
- Menú móvil a pantalla completa, con tipografía grande.
- Números fantasma grandes detrás de cada proyecto y wordmark gigante en el footer.
- Diseño responsive: escritorio, tablet y celular.

## Funcionalidad JavaScript (`js/main.js`)

1. Cursor personalizado que crece sobre elementos interactivos.
2. Parallax del hero según la posición del mouse.
3. Menú hamburguesa para móviles (abre, cierra y se cierra al elegir una sección).
4. Header que cambia de apariencia al hacer scroll.
5. Resaltado automático del enlace de navegación activo según la sección visible (scrollspy).
6. Animaciones de aparición por sección mediante `IntersectionObserver`.
7. Conteo animado de las estadísticas al entrar en pantalla.
8. Año actual automático en el pie de página.
9. Validación básica del formulario de contacto (nombre, correo y mensaje) con mensajes en español.
10. Mensaje de confirmación tras enviar el formulario (funciona como demostración, sin backend).

## Cómo verla

Abre `index.html` directamente en el navegador. No requiere servidor, instalación ni conexión a internet salvo para cargar las tipografías de Google Fonts.
