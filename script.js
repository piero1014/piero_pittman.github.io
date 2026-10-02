/**
 * ==========================================================================
 * PORTAFOLIO PROFESIONAL - PIERO PITTMAN
 * script.js - Interactividad, Navegación, Lightbox y Formulario
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c⚡ Piero Pittman | Portafolio Profesional Cargado con Éxito ⚡',
    'color: #00f0ff; background: #070d16; font-size: 13px; font-weight: bold; padding: 6px 10px; border: 1px solid #00f0ff; border-radius: 4px;'
  );

  // --------------------------------------------------------------------------
  // 1. NAVEGACIÓN MÓVIL Y MENÚ HAMBURGUESA
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
  const navbar = document.getElementById('navbar');

  if (menuToggle && mobileMenu) {
    const toggleMenu = (forceClose = false) => {
      const isCurrentlyOpen = mobileMenu.classList.contains('active');
      const shouldOpen = forceClose ? false : !isCurrentlyOpen;

      if (shouldOpen) {
        mobileMenu.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.innerHTML = '&times;';
        menuToggle.style.color = '#ff7300';
      } else {
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '&#9776;';
        menuToggle.style.color = '';
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar al pulsar cualquier enlace del menú móvil
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        toggleMenu(true);
      }
    });

    // Cerrar al redimensionar a pantalla de escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        toggleMenu(true);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. EFECTO SCROLL NAVBAR & ENLACES ACTIVOS (SCROLL SPY)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');

  const onScrollHandler = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sombra y estilo dinámico para la barra de navegación
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.7)';
        navbar.style.borderBottomColor = 'rgba(0, 240, 255, 0.35)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'rgba(43, 84, 131, 0.35)';
      }
    }

    // Scroll Spy para resaltar la sección actual
    let currentSectionId = '';
    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 140;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScrollHandler, { passive: true });
  onScrollHandler(); // Ejecutar al cargar la página

  // --------------------------------------------------------------------------
  // 3. VISOR LIGHTBOX PARA IMÁGENES EN ALTA RESOLUCIÓN
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const previewItems = document.querySelectorAll('[data-preview]');

  const openLightbox = (imgSrc, imgTitle) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgTitle || 'Detalle del Proyecto';
    if (lightboxCaption) {
      lightboxCaption.textContent = imgTitle || '';
    }
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    // Limpiar imagen después de la transición
    setTimeout(() => {
      if (!lightboxModal.classList.contains('active') && lightboxImg) {
        lightboxImg.src = '';
      }
    }, 250);
  };

  previewItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-preview');
      const title = item.getAttribute('data-title') || item.querySelector('img')?.alt || '';
      if (src) {
        openLightbox(src, title);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --------------------------------------------------------------------------
  // 4. FORMULARIO DE CONTACTO INTERACTIVO
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const subjectInput = document.getElementById('formSubject');
      const messageInput = document.getElementById('formMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Contacto desde Portafolio';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.style.color = '#ff4b4b';
          formStatus.textContent = '⚠ Por favor completa todos los campos requeridos.';
        }
        return;
      }

      // Feedback visual tecnológico
      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.style.color = '#00f0ff';
        formStatus.innerHTML = `⚡ Preparando mensaje... Redirigiendo a tu gestor de correo para enviar a Piero Pittman.`;
      }

      const mailBody = `Hola Piero,\n\nMi nombre es: ${name}\nCorreo de contacto: ${email}\n\nMensaje:\n${message}\n\n---\nEnviado desde tu portafolio web`;
      const mailtoUrl = `mailto:piero.pittman@gmail.com?subject=${encodeURIComponent(
        `[Portafolio] ${subject} - ${name}`
      )}&body=${encodeURIComponent(mailBody)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // --------------------------------------------------------------------------
  // 5. MICROINTERACCIONES & TARJETAS
  // --------------------------------------------------------------------------
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s ease';
    });
  });
});

