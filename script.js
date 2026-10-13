/**
 * Script de Adaptabilidad Universal (Responsive Total y Menú Hamburguesa)
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Control del Menú Hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar menú automáticamente al hacer clic en un enlace de navegación
        const enlacesNav = navLinks.querySelectorAll('a');
        enlacesNav.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Corrección de altura en dispositivos móviles
    const ajustarAlturaMovil = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', ajustarAlturaMovil);
    window.addEventListener('orientationchange', ajustarAlturaMovil);
    ajustarAlturaMovil();

    // 3. Soporte táctil (Swipe) para el carrusel de fotos
    const contenedorCarrusel = document.querySelector('.carousel-container');
    if (contenedorCarrusel) {
        let xInicial = 0;
        let xFinal = 0;

        contenedorCarrusel.addEventListener('touchstart', (e) => {
            xInicial = e.changedTouches[0].screenX;
        }, { passive: true });

        contenedorCarrusel.addEventListener('touchend', (e) => {
            xFinal = e.changedTouches[0].screenX;
            if (xFinal < xInicial - 40) {
                if (typeof moveSlide === 'function') moveSlide(1);
            }
            if (xFinal > xInicial + 40) {
                if (typeof moveSlide === 'function') moveSlide(-1);
            }
        }, { passive: true });
    }

    // 4. Prevención de zoom automático en iPhone/Safari al enfocar formularios
    const camposFormulario = document.querySelectorAll('input, select, textarea');
    camposFormulario.forEach(campo => {
        campo.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                campo.style.fontSize = '16px';
            }
        });
    });

    // 5. Protección de desbordamiento multimedia
    const elementosMultimedia = document.querySelectorAll('iframe, video, .pdf-viewer-wrapper');
    elementosMultimedia.forEach(elemento => {
        elemento.style.maxWidth = '100%';
    });

});