/**
 * Script de Adaptabilidad Universal (Responsive Total)
 * Funciona para PC, Tablets y Dispositivos Móviles (iOS y Android).
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Corrección inteligente de la altura de la ventana en móviles (evita que las barras del navegador corten contenido)
    const ajustarAlturaMovil = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', ajustarAlturaMovil);
    window.addEventListener('orientationchange', ajustarAlturaMovil);
    ajustarAlturaMovil();

    // 2. Soporte táctil avanzado (Swipe / Deslizamiento con el dedo) para el carrusel de fotos
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
                if (typeof moveSlide === 'function') moveSlide(1); // Siguiente imagen
            }
            if (xFinal > xInicial + 40) {
                if (typeof moveSlide === 'function') moveSlide(-1); // Imagen anterior
            }
        }, { passive: true });
    }

    // 3. Prevención de zoom automático molesto en iPhone/Safari al escribir en formularios
    const camposFormulario = document.querySelectorAll('input, select, textarea');
    camposFormulario.forEach(campo => {
        campo.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                campo.style.fontSize = '16px';
            }
        });
    });

    // 4. Contenedor con scroll horizontal automático para tablas en pantallas muy estrechas
    const tablas = document.querySelectorAll('table');
    tablas.forEach(tabla => {
        if (!tabla.parentElement.classList.contains('tabla-responsiva-wrapper')) {
            const envoltura = document.createElement('div');
            envoltura.style.width = '100%';
            envoltura.style.overflowX = 'auto';
            envoltura.style.webkitOverflowScrolling = 'touch';
            tabla.parentNode.insertBefore(envoltura, tabla);
            envoltura.appendChild(tabla);
        }
    });

    // 5. Ajuste automático para contenedores pesados (iframes, videos, PDFs) en pantallas pequeñas
    const elementosMultimedia = document.querySelectorAll('iframe, video, .pdf-viewer-container');
    elementosMultimedia.forEach(elemento => {
        elemento.style.maxWidth = '100%';
    });

});