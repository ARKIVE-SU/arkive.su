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

  /* ============================================
     Unified Form Submission via AJAX
     ============================================ */
  function submitForm(form, formType) {
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Remove any previous status message
    const oldMsg = form.querySelector('.form-status');
    if (oldMsg) oldMsg.remove();

    // Collect form data into a plain object
    const formData = { form_type: formType };
    new FormData(form).forEach((value, key) => {
      if (key !== 'form_type') formData[key] = value;
    });

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-spinner"></span>';

    fetch('/api/send_mail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      const msg = document.createElement('div');
      if (ok && data.ok) {
        msg.className = 'form-status form-success';
        msg.textContent = formType === 'newsletter'
          ? '✓ Subscribed successfully!'
          : '✓ Message sent successfully!';
        form.reset();
      } else {
        msg.className = 'form-status form-error';
        msg.textContent = data.error || 'Something went wrong. Please try again.';
      }
      form.appendChild(msg);
      setTimeout(() => msg.classList.add('visible'), 10);
    })
    .catch(() => {
      const msg = document.createElement('div');
      msg.className = 'form-status form-error';
      msg.textContent = 'Network error. Please check your connection and try again.';
      form.appendChild(msg);
      setTimeout(() => msg.classList.add('visible'), 10);
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = originalText;
    });
  }

  // Newsletter forms (homepage + contact page)
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(form, 'newsletter');
    });
  });

  // EOI form (participate page)
  const eoiForm = document.getElementById('eoi-form');
  if (eoiForm) {
    eoiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(eoiForm, 'eoi');
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitForm(contactForm, 'contact');
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
