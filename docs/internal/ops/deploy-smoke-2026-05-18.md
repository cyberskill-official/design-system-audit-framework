# DSAF Deploy Smoke — 2026-05-18

**Target:** `https://audit.cyberskill.world/`
**Run scope:** every verification command in `internal/ops/deploy-runbook.md` §3, plus the HTTP→HTTPS redirect check.
**Result:** PASS for the deploy-runbook route set.

## Command Output

### Apex 200 + HSTS + CSP

```json
{
  "method": "HEAD",
  "url": "https://audit.cyberskill.world/",
  "status": 200,
  "contentType": "text/html; charset=utf-8",
  "hsts": "max-age=63072000; includeSubDomains; preload",
  "csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
}
```

### Canonical + OG metadata

```json
{
  "method": "GET",
  "url": "https://audit.cyberskill.world/",
  "status": 200,
  "contentType": "text/html; charset=utf-8",
  "sample": "<!doctype html>\\n<html lang=\"en\">\\n<head>\\n  <meta charset=\"utf-8\">\\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\\n  <title>DSAF — Design System Audit Framework</title>"
}
```

Verified in the returned HTML:

- `rel="canonical"` points at `https://audit.cyberskill.world/`.
- `og:url` points at `https://audit.cyberskill.world/`.
- `og:title` is present.

### Card route

```json
{
  "method": "HEAD",
  "url": "https://audit.cyberskill.world/card",
  "status": 200,
  "contentType": "text/html; charset=utf-8",
  "hsts": "max-age=63072000; includeSubDomains; preload",
  "csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
}
```

### security.txt

```json
{
  "method": "GET",
  "url": "https://audit.cyberskill.world/.well-known/security.txt",
  "status": 200,
  "contentType": "text/plain; charset=utf-8",
  "sample": "Contact: mailto:info@cyberskill.world\\nExpires: 2027-05-17T00:00:00Z\\nPreferred-Languages: en\\nCanonical: https://audit.cyberskill.world/.well-known/security.txt\\n"
}
```

### robots.txt

```json
{
  "method": "GET",
  "url": "https://audit.cyberskill.world/robots.txt",
  "status": 200,
  "contentType": "text/plain; charset=utf-8",
  "sample": "User-agent: *\\nAllow: /\\n\\nSitemap: https://audit.cyberskill.world/sitemap.xml\\n"
}
```

### sitemap.xml

```json
{
  "method": "GET",
  "url": "https://audit.cyberskill.world/sitemap.xml",
  "status": 200,
  "contentType": "application/xml",
  "sample": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\\n  <url>\\n    <loc>https://audit.cyberskill.world/</loc>"
}
```

### HTTP to HTTPS

```json
{
  "method": "GET",
  "url": "http://audit.cyberskill.world/",
  "status": 308,
  "contentType": "text/plain",
  "location": "https://audit.cyberskill.world/",
  "sample": "Redirecting..."
}
```

## Notes

- Pretty blog URLs `/blog/launch-2026` and `/blog/co-maintainer-announcement` returned `404` during this smoke. They are outside deploy-runbook §3 and are tracked under FR-DOCS-003 / execution task A5 because Vercel does not render markdown by default.
- Chrome visual verification was attempted after opening the target in Google Chrome, but local Computer Use permissions were still pending for Accessibility / Screen Recording after three attempts. HTTP smoke evidence is complete; browser visual evidence remains blocked by local permissions.

