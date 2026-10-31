# Viana Commercial Services Inc. — Website

Source code for the official website of **Viana Commercial Services Inc.**, a family-operated cleaning company based in Marlborough, Massachusetts. The site focuses on commercial cleaning solutions for offices, facilities, post-construction projects and specialized environments.

**Production website:** https://vianacommercialservices.com/  
**Repository:** https://github.com/danmarques127-sys/vianna-website  
**Default branch:** `main`

## Overview

The website provides service descriptions, company information, project media, quote-request options and a PHP-powered editorial blog. Its public pages use HTML, CSS and vanilla JavaScript; the article publishing system requires a PHP-capable server and writable persistent storage.

## Website sections

- `index.html` — homepage, service highlights and main quote-request actions.
- `about.html` and `about/` — company background, family story, certifications and service areas.
- `services.html` and `services/` — cleaning service pages, including janitorial, office, medical clinic, hotel, floor care and post-construction cleaning.
- `projects.html` — project and service portfolio.
- `contact.html` and `request-quote.html` — contact and quote-request forms.
- `blog.php` — public blog index.
- `backend-blog/post.php` — individual article pages.
- `backend-blog/login.php` and `backend-blog/dashboard.php` — blog administrator authentication and editor.
- `assets/css/`, `assets/js/`, `assets/images/`, `assets/photos/` — styles, interactions, branding and media.
- `privacy-policy.html`, `terms.html`, `404.html` — legal and error pages.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — search and browser metadata.

## Technology

- HTML5 and CSS3 for responsive, semantic content and styling.
- Vanilla JavaScript for lightweight client-side interactions.
- PHP for the blog, administrator login, article publishing and uploads.
- JSON-backed article storage on the PHP server.
- Apache/cPanel-compatible hosting for PHP functionality.

There is no frontend framework or frontend build step required for the static pages.

## Deployment

### Static website

The HTML, CSS, JavaScript and media can be served by a static host. **Static-only hosting does not execute PHP**: `blog.php`, the article pages and the administrator interface require a compatible PHP runtime. A redirect to a PHP path does not make that path executable.

### Production — PHP-enabled hosting

1. Back up the current website, published articles and uploaded media before deploying.
2. Deploy the files to the intended web root, retaining directory structure.
3. Configure PHP 8.2+ and required extensions, including `fileinfo`, sessions and JSON.
4. Ensure `backend-blog/storage/` and `backend-blog/uploads/` are writable by the PHP process, but appropriately protected from direct access or script execution.
5. Keep administrator configuration and password hashes outside the public web root and outside Git.
6. Configure HTTPS and confirm host-level permissions and redirects.
7. Test public pages, navigation, mobile layouts, contact forms, the blog, article display and media uploads.
8. Verify the canonical domain, `robots.txt`, `sitemap.xml` and structured metadata.
9. Review the production error logs and validate that unpublished articles and administration endpoints are not publicly accessible.

Additional backend notes are in [backend-blog/SETUP.md](backend-blog/SETUP.md). Confirm the actual server configuration before following any older setup instruction.

## Forms and content publishing

Contact and quote forms currently reference a Formspree endpoint. Check account ownership, intended delivery recipients, form validation and confirmation behavior before production changes.

The blog includes a PHP-based editor and published-article views. Published articles and uploads are stored on the server, **not automatically committed to GitHub**. Back up server-side content before making deployment or hosting changes.

## Security and configuration

- Never commit administrator passwords, password hashes, API tokens, private keys, SMTP credentials, `.env` files or live configuration files.
- Keep sensitive configuration outside the document root when supported by hosting.
- Review and disable one-time installer endpoints after completing administrator setup.
- Verify session protections, CSRF validation, upload file restrictions and direct-access rules in the deployed environment.
- Rotate credentials if they have been disclosed outside an approved secret manager.
- Scan Git history as well as the current working tree when assessing credential exposure. `.gitignore` alone does not erase committed secrets.

The source includes a one-time blog administrator setup route. **Do not expose that route on a fresh deployment until administrative provisioning and access controls are ready.**

## SEO and maintenance

Use **Viana Commercial Services Inc.** consistently as the public-facing company name. Preserve existing `viana-*` asset references unless all dependent pages have been updated. Maintain consistent canonical URLs, Open Graph tags, structured data, sitemap paths, mobile navigation, accessibility and image optimization.

The official production domain is **https://vianacommercialservices.com/**. Test the live hosting behavior separately from source-code review.

## Ownership

This repository is maintained under [danmarques127-sys](https://github.com/danmarques127-sys). Public repository availability does not itself grant rights to reuse the company's branding, photographs or business content. Check applicable ownership and license terms before redistribution.
