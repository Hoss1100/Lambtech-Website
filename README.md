# Lambtech LLC Website

The Lambtech LLC landing page — a static site (plain HTML/CSS/JS, no build step) hosted on GitHub Pages at [lambtech.org](https://lambtech.org).

## Structure

- `index.html` — the landing page
- `privacy.html` / `terms.html` — legal pages, linked in the footer
- `assets/css/style.css` — all styling
- `assets/js/script.js` — mobile nav + contact form handling
- `assets/img/` — logo, favicon, headshot, social preview image
- `CNAME` — tells GitHub Pages this site should serve on the lambtech.org custom domain

## Making changes

Since this is a plain static site, you can edit `index.html` directly to change text, then upload the changed file to GitHub the same way the site was first set up (Add file → Upload files on the repository page). No build tools or command line required.

## Contact form

The contact form uses [Web3Forms](https://web3forms.com) (free) to deliver submissions by email. The access key lives in `index.html` in the hidden `access_key` field.
