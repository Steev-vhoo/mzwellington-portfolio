# MzWellington — Portfolio

Personal portfolio for **MzWellington**: digital & growth marketer, data analyst, biostatistician, SEO strategist and content strategist.

Static site (HTML, CSS, vanilla JS) with no build step, ready for Vercel.

## Structure

```
index.html              All page sections
assets/css/styles.css   Theme + layout (colors are CSS variables at the top)
assets/js/main.js       Menu, typing effect, scroll animations, portfolio filter, contact form
assets/img/             Photos (portrait = hero, cta = CTA section, contact = Contact section, intro-poster = video thumbnail)
assets/video/intro.mp4  Video introduction (About section)
assets/favicon.svg
vercel.json
```

## Content to replace before launch

Search `index.html` for these:

- **Email**: `patienceotobia23@gmail.com` (also `CONTACT_EMAIL` in `assets/js/main.js`). Done.
- **Social links**: LinkedIn is done (`/in/patiencewellington`). Instagram is done (`patience_wellington`). X, Medium and GitHub URLs are still placeholders.
- **Location**: Accra, Ghana. Done.
- **Stats**: years, projects, clients (`data-count` values)
- **Portfolio**: the six case studies and their KPI numbers are samples. Replace them with real projects.
- **Resume**: job titles, organisations, dates, degrees, universities, certifications
- **Skill percentages**
- **CV**: done. "Download CV" uses the Google Doc's PDF export link (`.../export?format=pdf`), so it downloads the latest version of the doc. The doc must stay shared as "Anyone with the link can view".

## Contact form

The form opens the visitor's email app with the message filled in. To get messages delivered straight to your inbox instead,
create a free form at [formspree.io](https://formspree.io) and paste its endpoint into `FORM_ENDPOINT` in `assets/js/main.js`.

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Deploy.
