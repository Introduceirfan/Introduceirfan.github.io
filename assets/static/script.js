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

//slider hero homepage
const sliderImages = [
  'assets/image/slider1.png',
  'assets/image/slider2.png',
  'assets/image/slider3.png'
];

let currentSlide = 0
const heroImg = document.getElementById('heroSlider');

setInterval(() => {
  heroImg.classList.add('fade-out');

  setTimeout( () => {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    heroImg.src = sliderImages[currentSlide];

    heroImg.classList.remove('fade-out');
  }, 600);
}, 3000);

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

fetch('data/projects.json')
  .then(res => res.json())
  .then(projects => {
    const featured = projects.filter(p => ['stock2', 'vrprouting'].includes(p.id));
    const container = document.getElementById('projectsHome');
    
    container.innerHTML = featured.map(p => `
      <div class="project-item fade-in">
        <div class="project-image">
          <img src="${p.image.replace('../', '')}" alt="${p.title}" />
        </div>
        <div class="project-info">
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <a href="pages/project-detail.html?id=${p.id}">View Project →</a>
        </div>
      </div>
    `).join('');

    container.insertAdjacentHTML('afterend', `
      <div style="text-align: center; margin-top: 5rem;">
        <a href="pages/projects.html" class="see-more">→ See all projects ←</a>
      </div>
    `);

    // fade-in observer
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });