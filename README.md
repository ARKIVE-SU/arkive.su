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
├── articles/
│   ├── index.json          Article index (add entry → appears in feed)
│   ├── TEMPLATE.html       Template for new articles
│   └── *.html              Individual articles
└── assets/
    ├── css/main.css        Dark cosmic theme
    └── js/
        ├── components.js   Shared header & footer
        └── main.js         Navigation, FAQ accordion, forms
```

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

## Contributing

This is a non-commercial, charitable initiative. If you represent a library, archive, technology developer, or infrastructure provider and want to participate — visit [arkive.su](http://arkive.su) or submit an Expression of Interest.

## License

This project is open source. The Knowledge Ark Initiative is non-commercial and decentralised.
