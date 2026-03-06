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
├── index.html              Landing page
├── mission.html            Mission & philosophy
├── technologies.html       Storage technologies
├── participate.html        How to join + EOI form
├── network.html            Network members directory
├── faq.html                Frequently asked questions
├── news.html               News feed (from JSON index)
├── contact.html            Contact form & info
├── send_mail.php           PHP script for handling form submissions
├── articles/
│   ├── index.json          Article index (add entry → appears in feed)
│   ├── TEMPLATE.html       Template for new articles
│   └── *.html              Individual articles
└── assets/
    ├── css/main.css        Dark cosmic theme
    ├── locales/            JSON language dictionaries (en, ru, es, zh, ar)
    └── js/
        ├── components.js   Shared header & footer
        ├── i18n.js         Client-side translation engine
        └── main.js         Navigation, FAQ accordion, forms
```

## Internationalisation (i18n)

The website uses a custom, lightweight, pure-JavaScript translation engine (`assets/js/i18n.js`).
It relies on JSON dictionaries located in `assets/locales/`.

**To add a new language or edit text:**
1. Open the relevant file in `assets/locales/` (e.g. `en.json`).
2. Update the values next to the keys.
3. If adding a completely new language (e.g. `fr.json`), add it to the `SUPPORTED_LANGS` array in `i18n.js` and add an `<option>` to the `#lang-selector` in `components.js`.

The site automatically detects the user's browser language on their first visit, saves the preference to `localStorage`, and instantly updates the DOM via JavaScript without reloading the page. It fully supports Right-to-Left (RTL) layouts for Arabic.

## Adding an Article

1. Copy `articles/TEMPLATE.html` → `articles/your-article.html`
2. Add an entry to `articles/index.json`
3. Commit & push → article appears on the News page

## Tech Stack

Pure HTML/CSS/JS. No frameworks, no build step, no dependencies. Designed for:
- Maximum simplicity and longevity
- Easy AI-assisted editing (all files are plain text)
- Instant deployment via `git pull`

## Deployment

```bash
# Clone to server
git clone https://github.com/ARKIVE-SU/arkive.su.git /var/www/arkive.su

# Update
cd /var/www/arkive.su && git pull
```

**Forms and Email**
The project uses `send_mail.php` to handle form submissions (contact form, newsletter, Expression of Interest). Form data is sent to `hello@arkive.su`. **Note:** For the forms to work, your server must have PHP installed and configured to send email (e.g., via `sendmail` or an SMTP relay).

## Contributing

This is a non-commercial, charitable initiative. If you represent a library, archive, technology developer, or infrastructure provider and want to participate — visit [arkive.su](http://arkive.su) or submit an Expression of Interest.

## License

This project is open source. The Knowledge Ark Initiative is non-commercial and decentralised.
