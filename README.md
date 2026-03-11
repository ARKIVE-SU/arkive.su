# 🏛️ Knowledge Ark Initiative — ARKIVE.SU

**A decentralised initiative to preserve humanity's most important knowledge across multiple storage media and locations — on Earth and in space.**

Every previous civilisation believed its knowledge was safe — until libraries burned and media degraded. We are the first generation with the technical means to break this cycle.

## The Formula

**Content + Permanent Storage Media + Preservation Infrastructure**

Multi-redundancy across media types, geographic locations, and formats — analogue and digital, Earth and space.

## Technologies

- **Cerabyte** — Ceramic storage, 5,000+ year lifespan, Munich, Germany
- **SPhotonix** — 5D crystal storage, billions of years, United Kingdom
- **Lonestar Data Holdings** — Lunar data centres, Florida, USA

---

## 🏗️ Architecture & Tech Stack

This project is built for **maximum speed, SEO performance, and durability**:
- **[Eleventy (11ty)](https://11ty.dev/)** — Static Site Generator pre-rendering all HTML pages.
- **Pure CSS/JS** — No heavy client-side frameworks, ensuring blazing fast load times.
- **Node.js (Express)** — Used exclusively for the local CMS Panel.
- **i18n (Internationalisation)** — 5 fully translated languages (English, Russian, Spanish, Chinese, Arabic) generated physically as static HTML files.

## 🗂️ Project Structure

```
├── src/
│   ├── index.njk               Landing redirect page
│   ├── en/                     English version (Markdown articles)
│   ├── ru/, es/, zh/, ar/      Other localized versions
│   ├── _includes/              Nunjucks templates (base, header, article layout)
│   ├── _data/                  Global data (locales JSON, environment variables)
│   └── assets/
│       ├── css/main.css        Dark cosmic theme & styling
│       ├── js/                 Frontend interactive scripts (components, i18n)
│       ├── images/             Media files
│       └── locales/            JSON language dictionaries for UI
├── cms/
│   ├── public/                 CMS Frontend (HTML, CSS, JS)
│   ├── server.js               Express backend for CMS API
│   └── ИНСТРУКЦИЯ.md           CMS User Guide (in Russian)
├── eleventy.config.js          SSG Config
├── package.json                NPM scripts & dependencies
└── DEPLOYMENT.md               Guide for deploying to the live server
```

## 📝 The CMS Panel (Local Content Management)

To make adding articles and translating content easier without needing Git or coding knowledge, this project includes a **Local CMS Panel**.

Instead of manually creating Markdown files, you can use the CMS to write articles, upload images, and deploy the site in one click.

### How to use the CMS:
1. Run `npm install` (first time only)
2. Run `npm run cms`
3. Open `http://localhost:3000` in your browser.
4. Fill in the article details across all 5 languages.
5. Upload a cover image.
6. Click **"Save, Build & Push"** — the CMS will generate the `.md` files, run the Eleventy build process, and push to GitHub.

*(Detailed instructions are available in `cms/ИНСТРУКЦИЯ.md`)*

---

## 💻 Development & Deployment

To run the site locally and preview changes live (without the CMS):
```bash
npm install
npm start
```
The site will be available at `http://localhost:8080`

To build for production manually:
```bash
npm run build
```

**For detailed instructions on how the production server works and how to pull updates, please read the [Deployment Guide (DEPLOYMENT.md)](DEPLOYMENT.md).**

## 🌐 SEO & Performance Features
- Fully localized dynamic Meta Tags (`<title>`, `<meta description>`)
- OpenGraph & Twitter Cards
- Schema.org Structured Data (`Article`, `FAQPage`, `BreadcrumbList`)
- Dynamic XML Sitemap (`/sitemap.xml`)
- Zero Cumulative Layout Shift (CLS) and optimized font-loading.

## 🤝 Contributing

This is a non-commercial, charitable initiative. If you represent a library, archive, technology developer, or infrastructure provider and want to participate — visit [arkive.su](https://arkive.su) or submit an Expression of Interest.

## 📄 License

This project is open source. The Knowledge Ark Initiative is non-commercial and decentralised.
