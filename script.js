// Combined script.js (menu toggle, fade-up, active nav highlighting, copy link, modals, zoom image)

// Toggle mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.classList.toggle('menu-open');
  });
}

// Fade-up animation for elements with .fade-up
const fadeUpElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });
fadeUpElements.forEach(el => fadeObserver.observe(el));

// Active link highlighting while scrolling
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const linkObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });
sections.forEach(section => linkObserver.observe(section));

// Smooth scroll behavior for anchor links (in case browser doesn't support)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu on link click
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuBtn.classList.remove('menu-open');
      }
    }
  });
});

// Copy link automatically (from heading.html)
const copyLink = document.getElementById('copyLink');
if (copyLink) {
  copyLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('LBCGENE4');
      copyLink.classList.add('copied');
      setTimeout(() => copyLink.classList.remove('copied'), 900);
    } catch(err) { console.error(err); }
  });
}

// Modal helpers (from profile.html)
function openModal(id) {
  const modal = document.getElementById(id);
  const content = modal.querySelector('.modal-content');
  modal.classList.add('active');
  // trigger fly-in animation
  if (content) {
    content.classList.remove('fly-in');
    void content.offsetWidth;
    content.classList.add('fly-in');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Zoom image modal
function zoomImage(src) {
  const modal = document.getElementById('zoomModal');
  const img = document.getElementById('zoomedImage');
  if (img) img.src = src;
  if (modal) modal.classList.add('active');
}

function closeZoom() {
  const modal = document.getElementById('zoomModal');
  if (modal) modal.classList.remove('active');
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(mod => mod.classList.remove('active'));
  }
});
