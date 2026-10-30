# Viana PHP blog — hosting instructions

The blog files are committed to GitHub but **will not run on Vercel's static deployment**. Use a PHP 8.1+ server with persistent writable storage and configure routing so /blog.php and /backend-blog/*.php reach that server. Do not expose the administration endpoint until HTTPS and file access controls are tested.

Environment variables on the **PHP host**, never in the repository:
- BLOG_ADMIN_USERNAME (set to the desired administrator username)
- BLOG_ADMIN_PASSWORD_HASH (create a hash with: php -r 'echo password_hash("NEW_PASSWORD", PASSWORD_DEFAULT), PHP_EOL;')

The previously shared password should be changed before going live. Do not commit credentials or a .env file.

Requires PHP fileinfo, JSON, sessions, permission to write backend-blog/storage/posts.json and backend-blog/uploads/, and PHP upload limits of at least 20 MB. Deny direct HTTP access to backend-blog/storage and prevent PHP or script execution in uploads at the web server level (the bundled .htaccess works only if Apache honors it).

Pages:
- /blog.php — public blog
- /backend-blog/login.php — admin login
- /backend-blog/dashboard.php — article editor
- /backend-blog/post.php?slug=... — public post

The editor accepts plain-text articles, image uploads and MP4/WebM videos. Files over 20 MB are rejected by the application. Test login, media access, upload authorization, and file permissions on the PHP hosting before sharing the links. Back up the JSON database and uploads; use a database and object storage when the site grows.

IMPORTANT: Posts created on a server are not automatically committed to GitHub. Data lives in server storage.
