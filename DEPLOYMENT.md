# ARKIVE.SU - Deployment Guide

This document explains how to update the live website when you add new articles or change the design.

## The Short Answer

**Yes, you must run `npm run build` on your computer every time you add an article or change the code.** 
The live server does not build the site; it only serves the finished HTML files from the `_site/` directory.

---

## 🚀 The Step-by-Step Workflow

When you want to add a new markdown article (e.g., from ChatGPT) or change some CSS:

### 1. Work Locally (On your computer)
1. Open the project folder in VS Code or your terminal.
2. Make your changes (add `.md` files to `src/ru/articles/`, edit `main.css`, etc.).
3. *(Optional)* Run `npm start` to test how it looks in your own browser at `http://localhost:8080`.

### 2. Build the Site (On your computer)
Once you are happy with the changes, you need to generate the final HTML files:
```bash
npm run build
```
*This command will read all your files in `src/` and output clean, SEO-friendly HTML files into the `_site/` folder.*

### 3. Push to GitHub (On your computer)
Now you need to send both your source code AND the generated `_site/` folder to GitHub:
```bash
git add .
git commit -m "feat: added new article"
git push
```

### 4. Update the Server
Log into your live Linux server (via SSH or ISPmanager terminal) and pull the latest changes:
```bash
cd /var/www/www-root/data/www/arkive.su
git pull
```

**That's it!**
The server will download the new `_site/` folder, and the website will update instantly. You do **not** need to run Node.js or `npm run build` on the server itself.

---

## 🤖 Instructions for AI Agents

If you are an AI assistant managing this repository, follow these rules strictly to ensure the SSG works seamlessly:

### 1. Languages and Folders
The website supports 5 languages. All articles must be written in **Markdown** (`.md`) and placed in their respective language directories:
- **English**: `src/en/articles/`
- **Russian**: `src/ru/articles/`
- **Spanish**: `src/es/articles/`
- **Chinese**: `src/zh/articles/`
- **Arabic**: `src/ar/articles/`

*(Note: The `articles.json` files in these directories automatically apply the `article.njk` layout and the `article` tag. Do not delete them).*

### 2. Markdown Frontmatter
Every article must start with YAML frontmatter containing `title` and `date`. You can optionally add an `excerpt` for the news feed.
```yaml
---
title: "The Future of Knowledge Preservation"
date: 2026-03-08
excerpt: "A short summary for the news feed."
---
```

### 3. Build & Deploy Workflow for AI
1. **Never use pure HTML** for articles unless absolutely necessary. Use standard Markdown.
2. Put images in `src/assets/images/` and reference them as `/assets/images/filename.jpg`.
3. To build the site on a Windows machine, use `cmd.exe /c "npm run build"` as `npm` scripts may fail in PowerShell due to execution policies.
4. After writing new Markdown files and building, **always commit the `_site/` directory**. The production server will simply pull the pre-built `_site/` contents, bypassing the need for Node.js build steps.

---

## 🛠 Troubleshooting

**Q: The server says `Forbidden` or `404 Not Found` after a git pull.**
A: Check your ISPmanager / web server settings. The "Document Root" (Корневая директория) MUST point to:
`/var/www/www-root/data/www/arkive.su/_site`
*(Don't forget the `_site` at the end!)*

**Q: Git pull on the server says `fatal: detected dubious ownership`.**
A: Since you use the `root` user to pull files owned by `www-root`, git gets suspicious. Run this once on the server:
`git config --global --add safe.directory /var/www/www-root/data/www/arkive.su`
