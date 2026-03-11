# ARKIVE.SU - Deployment & CMS Guide

This document explains how to update the live website, whether you are using the new visual CMS Panel or doing it manually via code.

## The Environments

1. **Local Environment** (Your PC) — Where you write content, run the CMS, and test changes.
2. **Production Server** (arkive.su) — Linux server (ISPmanager) that ONLY serves the `_site/` directory.

---

## 🛠️ Method 1: Using the CMS Panel (Recommended)

We built a local CMS panel specifically to make adding articles in 5 languages easy, without touching Terminal commands or Markdown files.

### Step 1: Start the CMS (On your computer)
1. Open the `ARKIVE.SU — AG` folder in VS Code or Terminal.
2. Run:
   ```bash
   npm run cms
   ```
3. Open `http://localhost:3000` in your web browser.

### Step 2: Create Content
1. Fill out the forms for all 5 languages (English, Russian, Spanish, Chinese, Arabic).
2. The `Slug` is auto-generated based on the English title.
3. Select an image for the article.

### Step 3: Deploy
1. Click the **"Сохранить, Собрать и Запушить"** (Save, Build & Push) button.
2. The CMS will automatically:
   - Save your image to `src/assets/images/`
   - Create 5 Markdown files in their respective folders (`src/{lang}/articles/`)
   - Run `npm run build` to generate the new HTML
   - Commit and `git push` everything to GitHub!

### Step 4: Update the Live Server
Log into your live Linux server (via SSH or ISPmanager terminal) and run:
```bash
cd /var/www/www-root/data/www/arkive.su
git pull
```
**That's it! The site is updated instantly.**

---

## 💻 Method 2: Manual Developer Workflow

If you are changing CSS, JS, or Nunjucks templates, you must do it manually:

### 1. Work Locally
1. Make your code changes in the `src/` directory.
2. Run `npm start` to preview locally at `http://localhost:8080`.

### 2. Build the Site
Generate the final HTML files:
```bash
npm run build
```
*(This creates/updates the `_site/` folder)*

### 3. Push to GitHub
```bash
git add .
git commit -m "feat: updated design elements"
git push
```

### 4. Update the Server
Log into your live Linux server and pull the changes:
```bash
cd /var/www/www-root/data/www/arkive.su
git pull
```

---

## 🤖 Instructions for AI Agents

If you are an AI assistant managing this repo:
1. **CMS Panel:** Found in `cms/`. It uses Express and Multer. Do not alter its core functionality unless explicitly requested.
2. **SEO:** Rely on the `base.njk` layout logic for Meta/OG tags. If adding a new page, make sure to add `seoTitle` and `seoDesc` frontmatter, and update the locale JSONs.
3. **Articles:** Always write articles in **Markdown** (`.md`) inside `src/{lang}/articles/`. Use YAML frontmatter: `title`, `date`, `excerpt`, `image`.
4. **Builds:** The production server only serves the pre-built `_site/` folder. Always commit the `_site/` folder after running a build locally.
5. **Windows Issues:** In PowerShell, `npm run build` might fail. Use `cmd.exe /c "npm run build"` or the CMS api (`/api/build`) to wrap spawned processes.

---

## ⚠️ Troubleshooting

**Q: The server says `Forbidden` or `404 Not Found` after a git pull.**
A: Check your ISPmanager / web server settings. The "Document Root" MUST point accurately to:
`/var/www/www-root/data/www/arkive.su/_site`

**Q: Git pull on the server says `fatal: detected dubious ownership`.**
A: Since you use the `root` user to pull files owned by `www-root`, git gets suspicious. Run this once on the server:
`git config --global --add safe.directory /var/www/www-root/data/www/arkive.su`
