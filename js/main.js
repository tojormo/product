document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var mobileClose = document.getElementById('mobileNavClose');

  function updateHeader() {
    if (!header) return;
    if (header.classList.contains('site-header--static')) return;
    if (window.scrollY > 40) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader);

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.add('open');
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', function () {
      mobileNav.classList.remove('open');
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }
});
