// Smooth scroll + scrollspy
const header = document.querySelector('header');
const links = document.querySelectorAll('nav a[href^="#"]');

function smoothTo(id){
  const el = document.querySelector(id);
  if(!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - (header?.offsetHeight || 0) - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}
links.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    smoothTo(a.getAttribute('href'));
  });
});

// Marcar link activo según scroll
const sections = [...links].map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScrollSpy(){
  const y = window.scrollY + (header?.offsetHeight || 0) + 16;
  let current = sections[0]?.id;
  sections.forEach(sec=>{
    if(sec.offsetTop <= y) current = sec.id;
  });
  links.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+current));
}
window.addEventListener('scroll', onScrollSpy);
onScrollSpy();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{ threshold: .12 });

document.querySelectorAll('section, .card, .grid img, .team > div, .hero img, video')
  .forEach(el=>{
    el.classList.add('reveal');
    io.observe(el);
  });


/* Mobile menu toggle */
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-nav');
toggleBtn?.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', open);
});

/* Enable tap for Ecosystem popup (works without hover) */
(function(){
  const pop = document.getElementById('eco-pop');
  if(!pop) return;
  document.querySelectorAll('.eco-tile').forEach(tile=>{
    tile.addEventListener('click', (e)=>{
      const r = tile.getBoundingClientRect();
      pop.querySelector('h4').textContent = tile.dataset.title || '';
      pop.querySelector('p').textContent  = tile.dataset.desc  || '';
      pop.style.left = (r.left + r.width/2 - pop.offsetWidth/2) + 'px';
      pop.style.top  = (window.scrollY + r.bottom + 8) + 'px';
      pop.style.display = 'block';
      e.stopPropagation();
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.eco-tile,#eco-pop')) pop.style.display='none';
  });
})();

