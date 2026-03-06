/* ============================================
   Reusable components: header & footer
   Include via <script src="assets/js/components.js"></script>
   before main.js
   ============================================ */

function renderHeader(activePage) {
  const nav = `
  <header class="header">
    <nav class="nav">
      <a href="index.html" class="nav-logo">
        <img src="assets/images/logo-placeholder.png" alt="Knowledge Ark Logo" id="site-logo">
      </a>
      <ul class="nav-links">
        <li><a href="index.html" ${activePage === 'home' ? 'class="active"' : ''} data-i18n="nav.home">Home</a></li>
        <li><a href="mission.html" ${activePage === 'mission' ? 'class="active"' : ''} data-i18n="nav.mission">Mission</a></li>
        <li><a href="technologies.html" ${activePage === 'technologies' ? 'class="active"' : ''} data-i18n="nav.technologies">Technologies</a></li>
        <li><a href="network.html" ${activePage === 'network' ? 'class="active"' : ''} data-i18n="nav.network">Network</a></li>
        <li><a href="participate.html" ${activePage === 'participate' ? 'class="active"' : ''} data-i18n="nav.participate">Participate</a></li>
        <li><a href="faq.html" ${activePage === 'faq' ? 'class="active"' : ''} data-i18n="nav.faq">FAQ</a></li>
        <li><a href="contact.html" ${activePage === 'contact' ? 'class="active"' : ''} data-i18n="nav.contact">Contact</a></li>
      </ul>
      
      <div class="lang-switcher">
        <select id="lang-selector" class="lang-select" onchange="switchLanguage(this.value)">
          <option value="en">En</option>
          <option value="ru">Ru</option>
          <option value="es">Es</option>
          <option value="zh">Zh</option>
          <option value="ar">Ar</option>
        </select>
      </div>

      <button class="nav-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>`;
  document.getElementById('site-header').innerHTML = nav;
  
  if (window.i18n && Object.keys(window.i18n.translations).length > 0) {
    window.i18n.updateSwitcherUI();
    window.i18n.translatePage();
  }
}

function renderFooter() {
  const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="nav-logo" style="margin-bottom:0.5rem"><span>&#9670;</span> Knowledge Ark</div>
          <p data-i18n="footer.about">A decentralised initiative to preserve humanity's most important knowledge across multiple storage media and locations — on Earth and in space.</p>
        </div>
        <div>
          <h4 data-i18n="footer.navigate">Navigate</h4>
          <ul class="footer-links">
            <li><a href="mission.html" data-i18n="nav.mission">Mission</a></li>
            <li><a href="technologies.html" data-i18n="nav.technologies">Technologies</a></li>
            <li><a href="participate.html" data-i18n="nav.participate">Participate</a></li>
            <li><a href="faq.html" data-i18n="nav.faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 data-i18n="footer.connect">Connect</h4>
          <ul class="footer-links">
            <li><a href="contact.html" data-i18n="nav.contact">Contact Us</a></li>
            <li><a href="news.html" data-i18n="nav.news">News &amp; Updates</a></li>
            <li><a href="participate.html#eoi-form" data-i18n="footer.eoi">Expression of Interest</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} <span data-i18n="footer.copyright">Knowledge Ark Initiative. Non-commercial, open, decentralised.</span>
      </div>
    </div>
  </footer>`;
  document.getElementById('site-footer').innerHTML = footer;
  
  if (window.i18n && Object.keys(window.i18n.translations).length > 0) {
    window.i18n.translatePage();
  }
}
