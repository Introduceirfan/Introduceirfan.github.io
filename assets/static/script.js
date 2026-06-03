// fade-in animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  window.addEventListener('load', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) hero.classList.add('visible');

    document.querySelectorAll('.fade-in').forEach(el => {
      if (!el.classList.contains('hero-content')) {
        observer.observe(el);
      }
    });
  });

  // ACTIVE NAVBAR
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Home Slider
  const bgImages = document.querySelectorAll('.hero-bg img');
  let currentBg = 0;

  setInterval(() => {
    bgImages[currentBg].classList.remove('active');
    currentBg = (currentBg + 1) % bgImages.length;
    bgImages[currentBg].classList.add('active');
  }, 4000);

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // close menu
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // ✅ SMOTH SCROLL — TAMBAHAN BARU
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
