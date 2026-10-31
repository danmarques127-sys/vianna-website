# Viana Commercial Services Inc. — Website

Official website source for **Viana Commercial Services Inc.**, a family-operated cleaning company based in Marlborough, Massachusetts. The public website focuses on **commercial cleaning**, including office, janitorial, post-construction, facility and specialized cleaning.

**Official production domain:** https://vianacommercialservices.com/  
**Homepage:** https://vianacommercialservices.com/index.html  
**GitHub repository:** danmarques127-sys/vianna-website  
**Default branch:** main

> Branding: use **Viana Commercial Services Inc.** as the public-facing company name. Asset filenames may still use `viana-*`, and legacy paths must not be renamed without checking references.

## Project structure

- `index.html`: home, service highlights and primary quote CTA.
- `about.html`: company overview, approach, values and links to the family story.
- `about/our-story.html`: family history supplied by the business; includes a quote request form.
- `services.html` and `services/`: commercial cleaning offerings and supporting pages.
- `projects.html`: examples of project/service categories.
- `contact.html`: contact form and contact information.
- `request-quote.html`: quote request form.
- `blog.php`: **the only blog landing page**, using PHP to load posts into responsive article cards (3 columns on desktop, 2 on tablets, 1 on mobile). Links to `backend-blog/post.php`.
- `backend-blog/`: PHP blog administration and article functionality; requires PHP-capable hosting and backend setup.
- `privacy-policy.html`, `terms.html`: legal content; verify business details before production.
- `404.html`: error page; must be returned with HTTP 404 by host.
- `assets/css/`, `assets/js/`, `assets/images/`, `assets/photos/`: styles, interaction scripts, branding and images.
- `site.webmanifest`: app metadata.
- `robots.txt`, `sitemap.xml`: crawling directives and canonical page discovery.

## Technical stack and hosting

The public HTML pages use static HTML, CSS and JavaScript, with responsive header/mobile navigation and SEO metadata. The repository documentation identifies **Vercel static deployment** as the intended delivery for HTML pages (root directory, Framework Preset: Other, no build command). **Vercel static hosting does not execute the PHP blog backend**; `blog.php`, `backend-blog/` and dynamic publishing require a PHP-capable host or migration to a supported backend. All blog navigation now points to `blog.php`. The legacy `/blog.html` route is configured for a permanent redirect to `/blog.php` (`vercel.json` and Apache `.htaccess`). On a static Vercel deployment the redirect alone does not make PHP executable; the PHP blog requires PHP-capable hosting or a suitable runtime.

## Forms

Forms use **Formspree** endpoint `https://formspree.io/f/mgavrvda`. The endpoint is configured in the contact and quote pages, including the family-story quote form. Before going live, verify the Formspree account's email recipient, submit a test entry from each form and check confirmation, spam handling, consent/privacy and error states. Avoid committing secret keys or credentials.

## SEO, indexing and domain

The intended canonical origin is **https://vianacommercialservices.com** (not the prior `vianaservices.com`). Main HTML pages include SEO descriptions and/or canonical URLs and structured data where available; the homepage includes commercial-focused `CleaningService` JSON-LD. `robots.txt` references the root `sitemap.xml`, which lists the principal public HTML pages. Keep links, Open Graph URLs, canonical tags, JSON-LD identifiers and sitemap URLs on the same verified production origin. Confirm www/non-www redirects and HTTPS at the host level. Submit the sitemap to Google Search Console only after deployment.

## Navigation, design and content

Header/menu and footer provide navigation between Home, Services, About, Projects, Blog, Contact and quote request. The footer Company section places **Blog immediately below Contact**. The website emphasizes commercial cleaning; the family story mentions commercial and residential cleaning as provided by the business, without changing the main commercial website positioning. Use the business-provided family narrative as the source of truth.

## Deployment checklist

1. Confirm official name, domain DNS and SSL certificate.
2. Deploy from `main` and check homepage plus all internal routes.
3. Check CSS, JS, logo/favicons and images on desktop and mobile.
4. Test header/footer links, internal routes, active states and mobile menu.
5. Submit both contact and quote forms and confirm delivery in Formspree.
6. Check `/robots.txt`, `/sitemap.xml`, page canonical tags and structured data from production.
7. Provision PHP-compatible hosting for the sole `blog.php` page, validate article publishing and confirm the `/blog.html` 301 redirect.
8. Verify legal pages, 404 status, accessibility and page speed.

**Security:** keep credentials, SMTP credentials, PHP admin secrets and API tokens out of Git; configure them in secure host environment settings.

## GoDaddy installation — blog administrator

Upload the **entire repository** to `public_html`, including `backend-blog/bootstrap.php` and `backend-blog/setup-admin.php`. Use PHP 8.2+ in cPanel. The administrator credentials are not committed to Git.

On cPanel Terminal from `public_html`, run:

```bash
php backend-blog/setup-admin.php
```

The setup asks for an administrator username (default `vianacommercialservices`) and a new password. It generates `blog-config.php` **outside** `public_html` with a password hash; the existing login automatically reads that private file. This setup script cannot be accessed by a browser. Then log in at `https://vianacommercialservices.com/backend-blog/login.php`. Ensure `backend-blog/storage` and `backend-blog/uploads` are writable by PHP, and their access-denying `.htaccess` files remain in place.

If the server returns HTTP 500, inspect the cPanel PHP error log. A private GitHub repo does not protect a password copied into a public website deployment; do not commit passwords or their verifier hashes to the repository.
