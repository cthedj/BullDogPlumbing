# Bulldog Plumbing website

Production-ready static website for Bulldog Plumbing, Cape Town.

## What is included

- Fast, dependency-free HTML, CSS and JavaScript
- Dedicated pages for the main plumbing services
- Genuine location pages for Dreyersdal and the Southern Suburbs
- Correct click-to-call and WhatsApp quote paths using `+27 72 455 8877`
- Unique titles, descriptions, canonicals and social metadata
- `Plumber`, `LocalBusiness`, `Service`, `FAQPage` and breadcrumb structured data
- XML sitemap, robots file, privacy notice and accessible 404 page
- Mobile navigation and persistent mobile call/WhatsApp actions
- A WhatsApp quote form that does not require a form backend
- A local validation script and GitHub Actions quality check

No ecommerce or airgun catalogue has been added.

## Build and check

The generated HTML is committed so GitHub Pages can serve the repository root directly.

```sh
npm run build
npm test
```

There are no runtime or build dependencies beyond Node.js 20 or newer.

## Deployment

GitHub Pages is currently enabled for this repository. It can serve the `main` branch from the repository root at:

`https://cthedj.github.io/BullDogPlumbing/`

All internal paths are relative, so the same files work at the GitHub project URL and at the production domain.

The canonical URLs and sitemap intentionally point to `https://bulldogplumbing.co.za/`. Before moving the domain from GoDaddy, verify the GitHub Pages build, add `bulldogplumbing.co.za` as the custom domain in the repository Pages settings, update DNS, enforce HTTPS, and test both the apex and `www` hostnames. Add a `CNAME` file only during that cutover so the preview URL remains usable beforehand.

## Content updates

Page copy and service data live in `scripts/build.mjs`. Shared presentation and interaction live in `assets/css/styles.css` and `assets/js/site.js`. After editing the source, run the build and validation commands and commit both the source and generated pages.

The service URLs are stable. A future ecommerce build can add a separate `/shop/` area without changing or diluting the plumbing-service architecture.
