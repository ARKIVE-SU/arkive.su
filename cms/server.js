const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const multer = require('multer');

const app = express();
const PORT = 3000;
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(PROJECT_ROOT, 'src', 'assets', 'images');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Sanitize filename
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, '-')
      .replace(/-+/g, '-');
    cb(null, name + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

const LANGUAGES = ['en', 'ru', 'es', 'zh', 'ar'];

// ==================== API ====================

// Upload image
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const webPath = `/assets/images/${req.file.filename}`;
  res.json({ success: true, path: webPath, filename: req.file.filename });
});

// Create article
app.post('/api/create-article', (req, res) => {
  try {
    const { slug, date, image, languages } = req.body;

    if (!slug || !date || !languages) {
      return res.status(400).json({ error: 'Missing required fields: slug, date, languages' });
    }

    const results = [];

    for (const lang of LANGUAGES) {
      const langData = languages[lang];
      if (!langData || !langData.title || !langData.content) {
        results.push({ lang, status: 'skipped', reason: 'missing title or content' });
        continue;
      }

      // Build YAML frontmatter
      let frontmatter = '---\n';
      frontmatter += `title: "${langData.title.replace(/"/g, '\\"')}"\n`;
      frontmatter += `date: ${date}\n`;
      if (langData.excerpt) {
        frontmatter += `excerpt: "${langData.excerpt.replace(/"/g, '\\"')}"\n`;
      }
      if (image) {
        frontmatter += `image: "${image}"\n`;
      }
      frontmatter += '---\n\n';

      const fileContent = frontmatter + langData.content;
      const articleDir = path.join(PROJECT_ROOT, 'src', lang, 'articles');
      fs.mkdirSync(articleDir, { recursive: true });

      const filePath = path.join(articleDir, `${slug}.md`);

      if (fs.existsSync(filePath)) {
        results.push({ lang, status: 'warning', reason: 'file already exists, overwritten' });
      }

      fs.writeFileSync(filePath, fileContent, 'utf-8');
      results.push({ lang, status: 'ok', path: `src/${lang}/articles/${slug}.md` });
    }

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List existing articles
app.get('/api/articles', (req, res) => {
  try {
    const articles = {};
    for (const lang of LANGUAGES) {
      const dir = path.join(PROJECT_ROOT, 'src', lang, 'articles');
      if (fs.existsSync(dir)) {
        articles[lang] = fs.readdirSync(dir)
          .filter(f => f.endsWith('.md'))
          .map(f => {
            const content = fs.readFileSync(path.join(dir, f), 'utf-8');
            const titleMatch = content.match(/^title:\s*"?(.+?)"?\s*$/m);
            const dateMatch = content.match(/^date:\s*(.+)$/m);
            return {
              filename: f,
              slug: f.replace('.md', ''),
              title: titleMatch ? titleMatch[1] : f,
              date: dateMatch ? dateMatch[1].trim() : ''
            };
          });
      } else {
        articles[lang] = [];
      }
    }
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete article
app.delete('/api/articles/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const results = [];
    for (const lang of LANGUAGES) {
      const filePath = path.join(PROJECT_ROOT, 'src', lang, 'articles', `${slug}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        results.push({ lang, status: 'deleted' });
      } else {
        results.push({ lang, status: 'not found' });
      }
    }
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Build site
app.post('/api/build', (req, res) => {
  const isWin = process.platform === 'win32';
  const cmd = isWin ? 'cmd.exe /c "npm run build"' : 'npm run build';

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  const child = exec(cmd, { cwd: PROJECT_ROOT, maxBuffer: 10 * 1024 * 1024 });

  child.stdout.on('data', data => res.write(data));
  child.stderr.on('data', data => res.write(data));

  child.on('close', code => {
    res.write(`\n--- Build finished with code ${code} ---\n`);
    res.end();
  });

  child.on('error', err => {
    res.write(`\nError: ${err.message}\n`);
    res.end();
  });
});

// Git push
app.post('/api/push', (req, res) => {
  const { message } = req.body;
  const commitMsg = message || 'feat: new article via CMS';
  const isWin = process.platform === 'win32';

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  const commands = [
    'git add -A',
    `git commit -m "${commitMsg.replace(/"/g, '\\"')}"`,
    'git push'
  ];

  let cmdStr;
  if (isWin) {
    cmdStr = commands.join(' && ');
    cmdStr = `cmd.exe /c "${cmdStr}"`;
  } else {
    cmdStr = commands.join(' && ');
  }

  const child = exec(cmdStr, { cwd: PROJECT_ROOT, maxBuffer: 10 * 1024 * 1024 });

  child.stdout.on('data', data => res.write(data));
  child.stderr.on('data', data => res.write(data));

  child.on('close', code => {
    res.write(`\n--- Push finished with code ${code} ---\n`);
    res.end();
  });

  child.on('error', err => {
    res.write(`\nError: ${err.message}\n`);
    res.end();
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════════╗`);
  console.log(`  ║   ARKIVE.SU — CMS Panel                  ║`);
  console.log(`  ║   http://localhost:${PORT}                   ║`);
  console.log(`  ╚══════════════════════════════════════════╝\n`);
});
