// Navegación suave entre secciones
document.addEventListener('DOMContentLoaded', () => {
  // Navegación suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      window.scrollTo({
        top: targetElement.offsetTop - 40, // Ajustado para el header más pequeño
        behavior: 'smooth'
      });
    });
  });
  
  // Destacar la sección activa en la navegación
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');
  
  if (sections.length && navLinks.length) {
    function highlightCurrentSection() {
      let index = sections.length;
      
      while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
      
      navLinks.forEach((link) => link.classList.remove('active'));
      if (navLinks[index]) {
        navLinks[index].classList.add('active');
      }
    }
    
    // Verificar en la primera carga
    highlightCurrentSection();
    
    // Verificar al hacer scroll
    window.addEventListener('scroll', highlightCurrentSection);
  }
  
  // Configurar animaciones de aparición para las barras de habilidades
  const skillElements = document.querySelectorAll('.skill-progress');
  if (skillElements.length) {
    skillElements.forEach(skill => {
      const width = skill.style.width;
      if (width) {
        skill.style.setProperty('--skill-level', width);
        skill.style.width = '0';
      }
    });
  }
  
  // Revelar elementos durante el scroll
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if (revealElements.length) {
    function checkReveal() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('visible');
        }
      });
    }
    
    // Verificar en la primera carga
    checkReveal();
    
    // Verificar al hacer scroll
    window.addEventListener('scroll', checkReveal);
  }
});