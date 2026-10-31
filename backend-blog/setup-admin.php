<?php
declare(strict_types=1);

// Run from the GoDaddy cPanel Terminal:
// php backend-blog/setup-admin.php
// The password is entered at the terminal and never committed to Git.
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
$root = __DIR__;
$config = dirname(__DIR__, 2) . '/blog-config.php';
if (!is_file($root . '/bootstrap.php')) {
    fwrite(STDERR, "Missing backend-blog/bootstrap.php\n");
    exit(1);
}
echo "Viana Blog - administrator setup\n";
echo "Username [vianacommercialservices]: ";
$username = trim((string) fgets(STDIN));
if ($username === '') $username = 'vianacommercialservices';
if (!preg_match('/^[a-zA-Z0-9_-]{4,64}$/', $username)) {
    fwrite(STDERR, "Invalid username\n");
    exit(1);
}
echo "Enter a NEW password (input visible): ";
$password = rtrim((string) fgets(STDIN), "\r\n");
if (strlen($password) < 12) {
    fwrite(STDERR, "Password must have 12 or more characters\n");
    exit(1);
}
$hash = password_hash($password, PASSWORD_DEFAULT);
unset($password);
$body = "<?php\ndeclare(strict_types=1);\nputenv('BLOG_ADMIN_USERNAME=" . $username . "');\nputenv('BLOG_ADMIN_PASSWORD_HASH=" . $hash . "');\n";
if (file_put_contents($config, $body, LOCK_EX) === false) {
    fwrite(STDERR, "Cannot write private blog-config.php above public_html\n");
    exit(1);
}
chmod($config, 0600);
echo "Admin configuration created outside public_html.\n";
