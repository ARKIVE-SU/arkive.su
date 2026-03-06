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
        <span>&#9670;</span> Knowledge Ark
      </a>
      <ul class="nav-links">
        <li><a href="index.html" ${activePage === 'home' ? 'class="active"' : ''}>Home</a></li>
        <li><a href="mission.html" ${activePage === 'mission' ? 'class="active"' : ''}>Mission</a></li>
        <li><a href="technologies.html" ${activePage === 'technologies' ? 'class="active"' : ''}>Technologies</a></li>
        <li><a href="network.html" ${activePage === 'network' ? 'class="active"' : ''}>Network</a></li>
        <li><a href="participate.html" ${activePage === 'participate' ? 'class="active"' : ''}>Participate</a></li>
        <li><a href="faq.html" ${activePage === 'faq' ? 'class="active"' : ''}>FAQ</a></li>
        <li><a href="news.html" ${activePage === 'news' ? 'class="active"' : ''}>News</a></li>
        <li><a href="contact.html" ${activePage === 'contact' ? 'class="active"' : ''}>Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>`;
  document.getElementById('site-header').innerHTML = nav;
}

function renderFooter() {
  const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="nav-logo" style="margin-bottom:0.5rem"><span>&#9670;</span> Knowledge Ark</div>
          <p>A decentralised initiative to preserve humanity's most important knowledge across multiple storage media and locations — on Earth and in space.</p>
        </div>
        <div>
          <h4>Navigate</h4>
          <ul class="footer-links">
            <li><a href="mission.html">Mission</a></li>
            <li><a href="technologies.html">Technologies</a></li>
            <li><a href="participate.html">Participate</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul class="footer-links">
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="news.html">News &amp; Updates</a></li>
            <li><a href="participate.html#eoi-form">Expression of Interest</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} Knowledge Ark Initiative. Non-commercial, open, decentralised.
      </div>
    </div>
  </footer>`;
  document.getElementById('site-footer').innerHTML = footer;
}
