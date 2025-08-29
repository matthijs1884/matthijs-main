const DEMO_USER = { username: 'Viewer', password: 'admin' };
const AUTH_KEY = 'demo_auth_v1';

function isAuthed() {
  try { return localStorage.getItem(AUTH_KEY) === 'true'; } catch { return false; }
}

function login(username, password) {
  const ok = username === DEMO_USER.username && password === DEMO_USER.password;
  if (ok) {
    try { localStorage.setItem(AUTH_KEY, 'true'); } catch {}
  }
  return ok;
}

function logout() {
  try { localStorage.removeItem(AUTH_KEY); } catch {}
  window.location.href = 'index.html';
}

// Run auth check on all pages except login
if (!window.location.pathname.endsWith('index.html')) {
  if (!isAuthed()) {
    window.location.href = 'index.html';
  }
}

// Attach login form logic only on index.html
window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#login-form');
  const err = document.querySelector('#login-error');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.querySelector('#username').value.trim();
      const p = document.querySelector('#password').value;
      if (login(u, p)) {
        window.location.href = 'main.html';
      } else {
        err.textContent = 'Incorrect username or password.';
      }
    });
  }
});
