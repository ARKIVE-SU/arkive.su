/* ============================================
   ARKIVE.SU — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Event Delegation for Mobile Nav & Header --- */
  document.body.addEventListener('click', (e) => {
    // Mobile Nav Toggle
    const toggle = e.target.closest('.nav-toggle');
    if (toggle) {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('open');
      }
      return;
    }

    // Close mobile nav on link click
    if (e.target.closest('.nav-links a')) {
      const navLinks = document.querySelector('.nav-links');
      const toggleBtn = document.querySelector('.nav-toggle');
      if (navLinks && toggleBtn) {
        navLinks.classList.remove('open');
        toggleBtn.classList.remove('open');
      }
    }
  });

  /* --- Header scroll effect --- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* --- Active nav link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Newsletter form --- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      if (email) {
        // Replace with actual endpoint later
        alert('Thank you for subscribing! We will keep you updated.');
        form.reset();
      }
    });
  });

  /* --- EOI Form --- */
  const eoiForm = document.getElementById('eoi-form');
  if (eoiForm) {
    eoiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Replace with actual endpoint (Formspree, etc.)
      alert('Thank you for your interest! We will be in touch.');
      eoiForm.reset();
    });
  }

  /* --- Contact form --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent. Thank you!');
      contactForm.reset();
    });
  }

  /* --- Member directory filter --- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.card[data-category]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });
});

/* --- Canvas Particle Network Background --- */
class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.colors = ['rgba(229, 169, 61, 0.7)', 'rgba(96, 165, 250, 0.5)', 'rgba(255, 255, 255, 0.3)'];
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  init() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';
    this.resize();
  }

  initParticles() {
    this.particles = [];
    let numberOfParticles = (this.canvas.width * this.canvas.height) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
      let radius = (Math.random() * 2) + 1;
      let x = Math.random() * (innerWidth - radius * 2) + radius;
      let y = Math.random() * (innerHeight - radius * 2) + radius;
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.particles.push(new Particle(this, x, y, directionX, directionY, radius, color));
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
    this.connect();
  }

  connect() {
    let opacityValue = 1;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        let distance = ((this.particles[a].x - this.particles[b].x) * (this.particles[a].x - this.particles[b].x)) + 
                       ((this.particles[a].y - this.particles[b].y) * (this.particles[a].y - this.particles[b].y));
        if (distance < (this.canvas.width/7) * (this.canvas.height/7)) {
          opacityValue = 1 - (distance / 20000);
          this.ctx.strokeStyle = `rgba(139, 148, 167, ${opacityValue * 0.2})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(network, x, y, directionX, directionY, radius, color) {
    this.network = network;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    this.network.ctx.beginPath();
    this.network.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.network.ctx.fillStyle = this.color;
    this.network.ctx.fill();
    // Glow effect
    this.network.ctx.shadowBlur = 10;
    this.network.ctx.shadowColor = this.color;
  }

  update() {
    if (this.x > innerWidth || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > innerHeight || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Collision detection with mouse
    let dx = this.network.mouse.x - this.x;
    let dy = this.network.mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < this.network.mouse.radius + this.radius) {
      if (this.network.mouse.x < this.x && this.x < innerWidth - this.radius * 10) {
        this.x += 2;
        this.directionX = -this.directionX;
      }
      if (this.network.mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 2;
        this.directionX = -this.directionX;
      }
      if (this.network.mouse.y < this.y && this.y < innerHeight - this.radius * 10) {
        this.y += 2;
        this.directionY = -this.directionY;
      }
      if (this.network.mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 2;
        this.directionY = -this.directionY;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// Initialize Particle Network if canvas exists
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('nodes-canvas');
    if (canvas) {
        new ParticleNetwork(canvas);
    }
});
