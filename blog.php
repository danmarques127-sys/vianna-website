<?php
require __DIR__ . '/backend-blog/bootstrap.php';
$all = posts(false);
?>
<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Commercial Cleaning Blog | Vianna Commercial Services</title>
<meta name="description" content="Commercial cleaning insights, janitorial guidance, facility care and company news from Vianna Commercial Services in Marlborough, MA.">
<link rel="canonical" href="https://vianacommercialservices.com/blog.php">
<meta property="og:type" content="website">
<meta property="og:title" content="Commercial Cleaning Blog | Vianna Commercial Services">
<meta property="og:url" content="https://vianacommercialservices.com/blog.php">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/blog-php.css">
<link rel="stylesheet" href="/assets/css/header.css">
<link rel="stylesheet" href="/assets/css/pages.css">
<link rel="stylesheet" href="/assets/css/footer.css">
<link rel="stylesheet" href="/assets/css/viana-brand.css">
<link rel="stylesheet" href="/assets/css/viana-logo-final.css?v=4">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png?v=2">
<style>
/* Blog-only correction: legacy blog CSS must not affect the shared header. */
.blog-page .site-header {
  display: block;
  padding: 0;
  justify-content: initial;
  align-items: initial;
  background: #122b40;
}
.blog-page .site-header a { margin-right: 0; }
.blog-page .site-header .header-container {
  width: min(calc(100% - (var(--container-padding) * 2)), var(--container-width));
  margin-left: auto;
  margin-right: auto;
}
.blog-header-divider {
  display: block;
  height: 3px;
  background: linear-gradient(90deg, #c8102e 0%, #c8102e 19%, #e4e9ee 19%, #e4e9ee 100%);
}
</style>
</head>
<body class="blog-page">
<header class="site-header" id="site-header">
<div class="header-container">
<!-- =================================================
                 5. BRAND
            ================================================== -->
<a aria-label="Vianna Commercial Services home" class="brand" href="index.html">
<img class="viana-official-logo" src="/assets/images/viana-logo-white.png" alt="Viana Commercial Services Inc">
</a>
<!-- =================================================
                 6. DESKTOP NAVIGATION
            ================================================== -->
<nav aria-label="Primary navigation" class="desktop-navigation">
<a class="navigation-link" href="index.html">
                    Home
                </a>
<a class="navigation-link" href="services.html">
                    Services
                </a>
<a class="navigation-link" href="about.html">
                    About
                </a>
<a class="navigation-link" href="projects.html">
                    Projects
                </a><a href="/blog.php" class="navigation-link active" aria-current="page">Blog</a>

<a class="navigation-link" href="contact.html">
                    Contact
                </a>
</nav>
<!-- =================================================
                 7. DESKTOP CALL TO ACTION
            ================================================== -->
<a class="header-cta" href="request-quote.html">
<span>
                    Request a Quote
                </span>
<svg aria-hidden="true" focusable="false" viewbox="0 0 24 24">
<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
</svg>
</a>
<!-- =================================================
                 8. MOBILE MENU BUTTON
            ================================================== -->
<button aria-controls="mobile-menu" aria-expanded="false" aria-label="Open navigation menu" class="menu-toggle" id="menu-toggle" type="button">
<span aria-hidden="true" class="menu-toggle-box">
<span class="menu-toggle-line"></span>
<span class="menu-toggle-line"></span>
<span class="menu-toggle-line"></span>
</span>
</button>
</div>
<!-- =====================================================
             9. MOBILE NAVIGATION
        ====================================================== -->
<div aria-hidden="true" class="mobile-menu" id="mobile-menu">
<button aria-label="Close navigation menu" class="mobile-menu-backdrop" data-menu-close="" type="button"></button>
<div aria-label="Mobile navigation" aria-modal="true" class="mobile-menu-panel" role="dialog" tabindex="-1">
<div class="mobile-menu-heading">
<span>
                        Navigation
                    </span>
<span class="mobile-menu-heading-line"></span>
</div>
<nav aria-label="Mobile primary navigation" class="mobile-navigation">
<a class="mobile-navigation-link" href="index.html">
<span>Home</span>
<span class="mobile-navigation-number">01</span>
</a>
<a class="mobile-navigation-link" href="services.html">
<span>Services</span>
<span class="mobile-navigation-number">02</span>
</a>
<a class="mobile-navigation-link" href="about.html">
<span>About</span>
<span class="mobile-navigation-number">03</span>
</a>
<a class="mobile-navigation-link" href="projects.html">
<span>Projects</span>
<span class="mobile-navigation-number">04</span>
</a><a href="/blog.php" class="mobile-navigation-link active" aria-current="page"><span>Blog</span><span class="mobile-navigation-number">05</span></a>

<a class="mobile-navigation-link" href="contact.html">
<span>Contact</span>
<span class="mobile-navigation-number">06</span>
</a>
</nav>
<div class="mobile-menu-cta-wrapper">
<a class="mobile-menu-cta" href="request-quote.html">
<span>
                            Request a Custom Quote
                        </span>
<svg aria-hidden="true" focusable="false" viewbox="0 0 24 24">
<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path>
</svg>
</a>
</div>
<div class="mobile-menu-contact">
<span>
                        Serving Marlborough, Massachusetts
                    </span>
<span>
                        and surrounding communities
                    </span>
</div>
</div>
</div>
</header>
<div class="blog-header-divider" aria-hidden="true"></div>
<main class="vn-main" id="main-content">
<section class="vn-hero">
<nav class="vn-breadcrumb" aria-label="Breadcrumb"><a href="/index.html">Home</a> / Blog</nav>
<div class="vn-eyebrow">Vianna Commercial Services</div>
<h1>Insights for cleaner commercial spaces.</h1>
<p>Practical perspectives on commercial cleaning, janitorial services, and professional facility care.</p>
<div class="vn-actions"><a class="vn-btn" href="/request-quote.html">Request a Custom Quote →</a><a class="vn-btn secondary" href="/services.html">Explore Services</a></div>
</section>
<section class="wrap" aria-label="Blog articles">
<div class="cards">
<?php foreach ($all as $p): ?>
<article>
<a href="/backend-blog/post.php?slug=<?=rawurlencode($p['slug'])?>">
<?php if (!empty($p['image'])): ?><img src="<?=h($p['image'])?>" alt=""><?php endif; ?>
<h2><?=h($p['title'])?></h2>
</a>
<p><?=h($p['summary'])?></p>
<a href="/backend-blog/post.php?slug=<?=rawurlencode($p['slug'])?>">Read article →</a>
</article>
<?php endforeach; ?>
</div>
<?php if (!$all): ?><p>New articles coming soon.</p><?php endif; ?>
</section>
</main>
<script src="/assets/js/header.js" defer></script>
</body>
</html>
