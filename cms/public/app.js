// =========================================
// ARKIVE.SU CMS Panel — Client Logic
// =========================================

const LANGUAGES = ['en', 'ru', 'es', 'zh', 'ar'];
let imagePath = '';

// ======== DOM REFS ========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const slugInput = $('#article-slug');
const dateInput = $('#article-date');
const consoleOutput = $('#console-output');

// ======== INIT ========
document.addEventListener('DOMContentLoaded', () => {
  // Set default date to today
  dateInput.value = new Date().toISOString().split('T')[0];

  // Tab switching
  $$('.lang-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.lang));
  });

  // Auto-slug from EN title
  const enTitle = $('.article-title[data-lang="en"]');
  enTitle.addEventListener('input', () => {
    if (!slugInput.dataset.manual) {
      slugInput.value = slugify(enTitle.value);
    }
  });
  slugInput.addEventListener('input', () => {
    slugInput.dataset.manual = slugInput.value ? '1' : '';
  });

  // Track filled tabs
  $$('.article-title').forEach(el => el.addEventListener('input', updateTabIndicators));
  $$('.article-content').forEach(el => el.addEventListener('input', updateTabIndicators));

  // Image upload
  $('#btn-upload-image').addEventListener('click', () => $('#article-image-file').click());
  $('#article-image-file').addEventListener('change', handleImageUpload);

  // Actions
  $('#btn-create-article').addEventListener('click', createArticle);
  $('#btn-build').addEventListener('click', buildSite);
  $('#btn-push').addEventListener('click', pushToGit);
  $('#btn-clear-console').addEventListener('click', () => { consoleOutput.textContent = ''; });

  // Articles list
  $('#btn-list-articles').addEventListener('click', showArticlesList);
  $('#btn-close-modal').addEventListener('click', () => { $('#modal-articles').style.display = 'none'; });
  $('#modal-articles').addEventListener('click', (e) => {
    if (e.target === $('#modal-articles')) $('#modal-articles').style.display = 'none';
  });
});

// ======== TABS ========
function switchTab(lang) {
  $$('.lang-tab').forEach(t => t.classList.toggle('active', t.dataset.lang === lang));
  $$('.lang-panel').forEach(p => p.classList.toggle('active', p.dataset.lang === lang));
}

function updateTabIndicators() {
  LANGUAGES.forEach(lang => {
    const title = $(`.article-title[data-lang="${lang}"]`).value.trim();
    const content = $(`.article-content[data-lang="${lang}"]`).value.trim();
    const tab = $(`.lang-tab[data-lang="${lang}"]`);
    tab.classList.toggle('filled', title.length > 0 && content.length > 0);
  });
}

// ======== SLUG ========
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

// ======== IMAGE UPLOAD ========
async function handleImageUpload() {
  const file = $('#article-image-file').files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  log('⬆️  Загрузка изображения: ' + file.name + '...');

  try {
    const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.success) {
      imagePath = data.path;
      $('#image-path-display').textContent = data.path;
      log('✅ Изображение загружено: ' + data.path);
      toast('Изображение загружено', 'success');
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    log('❌ Ошибка загрузки: ' + err.message);
    toast('Ошибка загрузки: ' + err.message, 'error');
  }
}

// ======== CREATE ARTICLE ========
async function createArticle() {
  const slug = slugInput.value.trim();
  const date = dateInput.value;

  if (!slug) return toast('Введите slug (URL-имя) статьи', 'error');
  if (!date) return toast('Выберите дату публикации', 'error');

  // Collect per-language data
  const languages = {};
  let filledCount = 0;

  LANGUAGES.forEach(lang => {
    const title = $(`.article-title[data-lang="${lang}"]`).value.trim();
    const excerpt = $(`.article-excerpt[data-lang="${lang}"]`).value.trim();
    const content = $(`.article-content[data-lang="${lang}"]`).value.trim();

    if (title && content) {
      languages[lang] = { title, excerpt, content };
      filledCount++;
    }
  });

  if (filledCount === 0) {
    return toast('Заполните заголовок и контент хотя бы для одного языка', 'error');
  }

  const btn = $('#btn-create-article');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Создание...';

  log('\n🟢 Создание статьи "' + slug + '" на ' + filledCount + ' языках...');

  try {
    const res = await fetch('/api/create-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, date, image: imagePath, languages })
    });

    const data = await res.json();

    if (data.success) {
      data.results.forEach(r => {
        const icon = r.status === 'ok' ? '✅' : r.status === 'warning' ? '⚠️' : '⏭️';
        log(`  ${icon} [${r.lang}] ${r.status}${r.path ? ' → ' + r.path : ''}${r.reason ? ' (' + r.reason + ')' : ''}`);
      });
      log('✅ Статья создана! Теперь нажмите «Собрать сайт».');
      toast('Статья создана на ' + filledCount + ' языках!', 'success');
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    log('❌ Ошибка: ' + err.message);
    toast('Ошибка: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🟢 Создать статью';
  }
}

// ======== BUILD ========
async function buildSite() {
  const btn = $('#btn-build');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Сборка...';

  log('\n🔨 Запуск Eleventy build...');

  try {
    const res = await fetch('/api/build', { method: 'POST' });
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      log(decoder.decode(value, { stream: true }));
    }
    toast('Сборка завершена!', 'success');
  } catch (err) {
    log('❌ Ошибка сборки: ' + err.message);
    toast('Ошибка сборки', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🔨 Собрать сайт';
  }
}

// ======== GIT PUSH ========
async function pushToGit() {
  const message = $('#commit-message').value.trim();
  if (!message) return toast('Введите название коммита', 'error');

  const btn = $('#btn-push');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Пуш...';

  log('\n🚀 Git push: "' + message + '"...');

  try {
    const res = await fetch('/api/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      log(decoder.decode(value, { stream: true }));
    }
    toast('Запушено на GitHub!', 'success');
  } catch (err) {
    log('❌ Ошибка push: ' + err.message);
    toast('Ошибка push', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '🚀 Запушить';
  }
}

// ======== ARTICLES LIST ========
async function showArticlesList() {
  const modal = $('#modal-articles');
  const body = $('#articles-list-body');
  modal.style.display = 'flex';
  body.innerHTML = '<p style="color:var(--text-muted)">Загрузка...</p>';

  try {
    const res = await fetch('/api/articles');
    const data = await res.json();

    // Collect unique slugs
    const slugs = new Set();
    Object.values(data).forEach(list => list.forEach(a => slugs.add(a.slug)));

    if (slugs.size === 0) {
      body.innerHTML = '<p style="color:var(--text-muted)">Статей пока нет.</p>';
      return;
    }

    let html = '<table class="articles-table"><thead><tr>';
    html += '<th>Slug</th><th>Заголовок (EN)</th><th>Дата</th><th>Языки</th><th></th>';
    html += '</tr></thead><tbody>';

    for (const slug of [...slugs].sort()) {
      const enArticle = (data.en || []).find(a => a.slug === slug);
      const title = enArticle ? enArticle.title : slug;
      const date = enArticle ? enArticle.date : '';
      const langs = LANGUAGES.filter(l => (data[l] || []).some(a => a.slug === slug));

      html += `<tr>`;
      html += `<td class="slug-cell">${slug}</td>`;
      html += `<td>${title}</td>`;
      html += `<td>${date}</td>`;
      html += `<td>${langs.join(', ')}</td>`;
      html += `<td><button class="btn btn-danger btn-sm" onclick="deleteArticle('${slug}')">🗑️</button></td>`;
      html += `</tr>`;
    }

    html += '</tbody></table>';
    body.innerHTML = html;
  } catch (err) {
    body.innerHTML = '<p style="color:var(--danger)">Ошибка: ' + err.message + '</p>';
  }
}

async function deleteArticle(slug) {
  if (!confirm(`Удалить статью "${slug}" на всех языках?`)) return;

  try {
    const res = await fetch(`/api/articles/${slug}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      log('🗑️  Статья "' + slug + '" удалена.');
      toast('Статья удалена', 'success');
      showArticlesList(); // refresh
    }
  } catch (err) {
    toast('Ошибка удаления: ' + err.message, 'error');
  }
}

// ======== UTILITIES ========
function log(text) {
  consoleOutput.textContent += text;
  if (!text.endsWith('\n')) consoleOutput.textContent += '\n';
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function toast(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = '0.3s ease';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}
