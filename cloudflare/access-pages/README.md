# Cloudflare Access custom pages

Branded replacements for the default Cloudflare Access error pages on `*.hobroker.me`.

| File                   | Access page type | Shown when                                                   |
| ---------------------- | ---------------- | ------------------------------------------------------------ |
| `forbidden.html`       | Forbidden        | The user signed in but no Access policy allows them          |
| `identity-denied.html` | Identity Denied  | The identity provider rejected or failed to verify the login |

Both pages are self-contained (inline CSS, no external assets), follow the system light/dark theme, and fill in the requested hostname at runtime. "Use a different account" points at `/cdn-cgi/access/logout`, which clears the Access session for that app.

## Uploading

Zero Trust dashboard → **Reusable components** → **Custom pages** → **Access** → create a custom page of each type, paste the HTML, then select the pages in your Access settings (or per application).
