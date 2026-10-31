<div align="center">

# Viana Commercial Services Inc.

**Official website · Commercial Cleaning · Massachusetts**

Commercial cleaning, facility care and specialized cleaning services in Marlborough, Massachusetts.

[**Visit Website**](https://vianacommercialservices.com/) · [**GitHub Repository**](https://github.com/danmarques127-sys/vianna-website)

</div>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="PHP" src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white">
  <img alt="Responsive design" src="https://img.shields.io/badge/Responsive-Design-087E8B?style=flat-square">
  <img alt="SEO" src="https://img.shields.io/badge/SEO-Optimized-238636?style=flat-square">
  <img alt="Apache and cPanel" src="https://img.shields.io/badge/Apache%20%2F%20cPanel-Hosting-D22128?style=flat-square&logo=apache&logoColor=white">
</p>

<p align="center">
  <img alt="Blog storage" src="https://img.shields.io/badge/Blog-JSON%20Storage-4B5563?style=flat-square">
  <img alt="Forms" src="https://img.shields.io/badge/Forms-Formspree-E5122E?style=flat-square">
</p>

---

## Overview

The website includes a commercial cleaning portfolio, company information, project photos, service-specific pages, quote-request forms and a PHP-powered editorial blog.

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Content | PHP-powered articles and content management |
| Hosting | Apache / cPanel-compatible PHP hosting |
| SEO | Semantic metadata, sitemap, responsive pages |
| Source control | Git and GitHub |

## Project Structure

- `index.html` — homepage and primary calls to action.
- `about.html`, `about/` — company story, safety, certifications and service areas.
- `services.html`, `services/` — commercial cleaning service pages.
- `projects.html`, `assets/photos/` — service and project media.
- `contact.html`, `request-quote.html` — forms and inquiries.
- `blog.php`, `backend-blog/` — public blog and protected article administration.
- `assets/css/`, `assets/js/`, `assets/images/` — frontend styles, scripts and branding.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — SEO and browser metadata.

## Tips & Insights / Blog

The blog uses PHP and server-side JSON storage, not MySQL. Publishing requires a PHP-capable server with persistent writable storage. Public posts and uploads are stored on the hosting server rather than automatically committed to GitHub. See [backend-blog/SETUP.md](backend-blog/SETUP.md) for setup guidance. Forms reference Formspree; confirm delivery on the live domain.

## Deployment

Deploy the static HTML, CSS, JavaScript and assets to a suitable web host. For the blog and admin features, use PHP 8.2+ with sessions, JSON and fileinfo, and configure writable but protected `backend-blog/storage/` and `backend-blog/uploads/`. Static-only hosting cannot execute PHP. Verify HTTPS, redirects, public routes, forms and blog publishing after deployment.

### Release Checklist

1. Back up the existing production site and persistent data.
2. Verify assets, internal links, navigation and mobile layout.
3. Test contact and quote forms with non-sensitive submissions.
4. Verify HTTPS, canonical URLs, metadata, robots.txt and sitemap.xml.
5. Test public articles and authenticated publishing on PHP-enabled hosting.
6. Check error logs, access controls and backup restoration procedures.

## Security

Keep admin configuration and password hashes outside the web root and Git. Confirm that one-time setup endpoints are disabled or inaccessible after provisioning, that upload directories cannot execute scripts, and that sessions and CSRF controls work on the production host. Rotate exposed credentials and inspect Git history when evaluating past leaks.

**Never commit passwords, secrets, private keys, live configuration files, database dumps or administrator credentials.**

## SEO & Maintenance

Maintain the canonical domain, page metadata, structured data, sitemap, accessible navigation and performance. Preserve asset paths unless dependent references are updated.

## Maintainer & Ownership

Maintained at [danmarques127-sys](https://github.com/danmarques127-sys). Branding and media remain subject to their owners' rights; public visibility does not grant unrestricted reuse.
