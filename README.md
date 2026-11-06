# MzWellington — Portfolio

Personal portfolio for **MzWellington**: digital & growth marketer, data analyst, biostatistician, SEO strategist and content strategist.

Static site (HTML, CSS, vanilla JS) with no build step, ready for Vercel.

## Structure

```
index.html              All page sections
assets/css/styles.css   Theme + layout (colors are CSS variables at the top)
assets/js/main.js       Menu, typing effect, scroll animations, portfolio filter, contact form
assets/img/             Photos (hero, about, cta, headshot)
assets/favicon.svg
vercel.json
```

## Content to replace before launch

Search `index.html` for these:

- **Email**: `hello@mzwellington.com` (also `CONTACT_EMAIL` in `assets/js/main.js`)
- **Social links**: LinkedIn, X, Instagram, Medium and GitHub URLs
- **Location**: "Accra, Ghana"
- **Stats**: years, projects, clients (`data-count` values)
- **Portfolio**: the six case studies and their KPI numbers are samples. Replace them with real projects.
- **Resume**: job titles, organisations, dates, degrees, universities, certifications
- **Skill percentages**
- **CV**: add the PDF as `assets/MzWellington-CV.pdf` (the "Download CV" button points there)

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
