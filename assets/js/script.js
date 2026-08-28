// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form submission (Web3Forms)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

const CONTACT_EMAIL = 'MJL@lambtech.org';

function sendViaMailto(form, statusEl) {
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  const subject = `New inquiry from ${name || 'lambtech.org'}`;
  const body = `${message}\n\n—\n${name}\n${email}`;
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
  statusEl.textContent = `Opening your email app to send this to ${CONTACT_EMAIL}. If nothing opens, email us directly.`;
  statusEl.className = 'form-status success';
  form.reset();
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessKey = form.querySelector('[name="access_key"]').value;
    if (!accessKey || accessKey === 'WEB3FORMS_ACCESS_KEY') {
      sendViaMailto(form, statusEl);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await res.json();

      if (data.success) {
        statusEl.textContent = 'Thanks, your message has been sent. We\'ll be in touch soon.';
        statusEl.className = 'form-status success';
        form.reset();
      } else {
        throw new Error(data.message || 'Something went wrong.');
      }
    } catch (err) {
      sendViaMailto(form, statusEl);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
