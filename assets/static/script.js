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
if (bgImages.length > 0) {
  let currentBg = 0;

  setInterval(() => {
    bgImages[currentBg].classList.remove('active');
    currentBg = (currentBg + 1) % bgImages.length;
    bgImages[currentBg].classList.add('active');
  }, 4000);
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

//slider hero homepage
const sliderImages = [
  'assets/image/slider1.png',
  'assets/image/slider2.png',
  'assets/image/slider3.png'
];

let currentSlide = 0
const heroImg = document.getElementById('heroSlider');

if (heroImg) {
  setInterval(() => {
    heroImg.classList.add('fade-out');

    setTimeout( () => {
      currentSlide = (currentSlide + 1) % sliderImages.length;
      heroImg.src = sliderImages[currentSlide];

      heroImg.classList.remove('fade-out');
    }, 600);
  }, 3000);
}

const faces = [
  'assets/image/notion_smile.png',
  'assets/image/notion_smiley.png',
];

let currentFace = 0;

document.getElementById('navLogo').addEventListener('mouseover', () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * faces.length);
  } while (newIndex === currentFace);

  currentFace = newIndex;
  document.getElementById('navFace').src = faces[currentFace];

document.getElementById('navLogo').addEventListener('mouseleave', () => {
  document.getElementById('navFace').src = faces[0];
  currentFace = 0;
});

});

