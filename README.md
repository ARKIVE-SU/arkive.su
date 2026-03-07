# 🏛️ Knowledge Ark Initiative — ARKIVE.SU

**A decentralised initiative to preserve humanity's most important knowledge across multiple storage media and locations — on Earth and in space.**

Every previous civilisation believed its knowledge was safe — until libraries burned and media degraded. We are the first generation with the technical means to break this cycle.

## The Formula

**Content + Permanent Storage Media + Preservation Infrastructure**

Multi-redundancy across media types, geographic locations, and formats — analogue and digital, Earth and space.

## Three Pillars

| Pillar | Description |
|--------|-------------|
| 📚 **Knowledge Holders** | National libraries, internet archives, museums, digital repositories |
| 🔮 **Storage Technology** | Ceramic media (Cerabyte), 5D crystals (SPhotonix), and other ultra-durable formats |
| 🚀 **Infrastructure** | Lunar data centres (Lonestar), deep mountain bunkers, salt mine vaults |

## Technologies

- **Cerabyte** — Ceramic storage, 5,000+ year lifespan, Munich, Germany
- **SPhotonix** — 5D crystal storage, billions of years, United Kingdom
- **Lonestar Data Holdings** — Lunar data centres, Florida, USA

## Website Structure

```
├── src/
│   ├── index.njk               Landing redirect page
│   ├── en/                     English version (generated physically)
│   │   └── articles/           Markdown articles here
│   ├── ru/                     Russian version
│   ├── _includes/              Nunjucks templates (base, header, footer)
│   ├── _data/                  Global data (locales JSON)
│   └── assets/
│       ├── css/main.css        Dark cosmic theme
│       ├── js/main.js          Navigation, forms
│       └── locales/            JSON language dictionaries
├── package.json                NPM scripts
└── eleventy.config.js          SSG Config
```

## Internationalisation (i18n) & SEO

The website was migrated to the **Eleventy (11ty)** Static Site Generator to solve SEO limitations. 
It now physically generates language-specific HTML files for every page (`/en/index.html`, `/ru/index.html`).
Locales are managed via JSON files in `src/assets/locales/` and injected during the build.

## Adding an Article (Markdown)

Articles are now written in pure **Markdown** and fully localized!
1. Create a markdown file in the relevant language folder, e.g., `src/en/articles/my-post.md`
2. Add Frontmatter at the top:
   ```yaml
   ---
   title: "My New Article"
   date: 2026-03-07
   ---
   ```
3. Run `npm run build` or push to GitHub (if CI/CD is configured) to generate the page.

## Tech Stack

- **Eleventy (11ty)** Static Site Generator for pre-rendering HTML and serving Markdown.
- Pure CSS/JS for the frontend.
- No heavy client-side frameworks, ensuring maximum speed.

## Development & Deployment

To run locally and preview changes live:
```bash
npm install
npm start
```
The site will be available at `http://localhost:8080`

To build for production:
```bash
npm run build
```
This generates the final static HTML files in the `_site/` directory, which you can deploy to any static hosting or web server.

**Forms and Email**
The project uses `send_mail.php` to handle form submissions (contact form, newsletter, Expression of Interest). Form data is sent to `hello@arkive.su`. **Note:** For the forms to work, your server must have PHP installed and configured to send email (e.g., via `sendmail` or an SMTP relay).

## Contributing

This is a non-commercial, charitable initiative. If you represent a library, archive, technology developer, or infrastructure provider and want to participate — visit [arkive.su](http://arkive.su) or submit an Expression of Interest.

## License

This project is open source. The Knowledge Ark Initiative is non-commercial and decentralised.
