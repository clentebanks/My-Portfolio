const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

function mostrarOcultarMenu(){
  const isOpen = nav.classList.toggle('responsive');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
}

function seleccionar(){
  nav.classList.remove('responsive');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

navToggle.addEventListener('click', mostrarOcultarMenu);
navLinks.forEach(link => link.addEventListener('click', seleccionar));

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.35 });

const skillsSection = document.getElementById('skills');
if(skillsSection){
  skillObserver.observe(skillsSection);
}

const sections = document.querySelectorAll('main section[id]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(section => activeObserver.observe(section));
